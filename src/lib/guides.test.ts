import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { type Guide, guides } from "@/content/guides";
import { services } from "@/content/services";
import { findGuide, formatGuideDate, guidesForService, newestFirst } from "./guides";

const guide = (slug: string, updatedAt: string): Guide => ({
  slug,
  title: slug,
  description: slug,
  publishedAt: "2026-01-01",
  updatedAt,
  serviceSlug: "web",
});

describe("guides content", () => {
  it("has unique slugs, each with its MDX file", () => {
    expect(new Set(guides.map((g) => g.slug)).size).toBe(guides.length);
    for (const { slug } of guides) {
      expect(existsSync(path.join(import.meta.dirname, "../content/guides", `${slug}.mdx`))).toBe(true);
    }
  });

  it("uses real ISO dates and is never updated before it was published", () => {
    for (const { publishedAt, updatedAt } of guides) {
      expect(publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(updatedAt))).toBe(false);
      expect(updatedAt >= publishedAt).toBe(true);
    }
  });

  it("links each guide to an existing service", () => {
    for (const { serviceSlug } of guides) expect(services.map((s) => s.slug)).toContain(serviceSlug);
  });
});

describe("guide helpers", () => {
  it("finds a guide by slug and returns undefined for an unknown one", () => {
    const list = [guide("a", "2026-01-01")];
    expect(findGuide(list, "a")).toBe(list[0]);
    expect(findGuide(list, "missing")).toBeUndefined();
  });

  it("formats dates in Spanish without shifting the day", () => {
    expect(formatGuideDate("2026-10-21")).toBe("21 de octubre de 2026");
  });

  it("sorts by last update, newest first, without changing the original list", () => {
    const list = [guide("old", "2026-01-01"), guide("new", "2026-05-01")];
    expect(newestFirst(list).map((g) => g.slug)).toEqual(["new", "old"]);
    expect(list[0].slug).toBe("old");
  });

  it("returns only the guides of a service, newest first, and none for a service without guides", () => {
    const list = [
      guide("web-old", "2026-01-01"),
      { ...guide("other", "2026-03-01"), serviceSlug: "mantenimiento" },
      guide("web-new", "2026-05-01"),
    ];
    expect(guidesForService(list, "web").map((g) => g.slug)).toEqual(["web-new", "web-old"]);
    expect(guidesForService(list, "diagnostico-digital")).toEqual([]);
  });
});
