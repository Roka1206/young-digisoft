import { describe, expect, it } from "vitest";
import type { PortfolioCase } from "@/content/portfolio";
import { getPublishedCases } from "./portfolio";

const baseCase: PortfolioCase = {
  name: "Cliente",
  sector: "Peluquería",
  summary: "Web nueva",
  technologies: ["Next.js"],
  result: "Más reservas",
  publishPermission: true,
};

describe("getPublishedCases", () => {
  it("keeps only cases with publish permission", () => {
    const hidden = { ...baseCase, name: "Sin permiso", publishPermission: false };
    expect(getPublishedCases([baseCase, hidden])).toEqual([baseCase]);
  });

  it("returns an empty list when there are no cases", () => {
    expect(getPublishedCases([])).toEqual([]);
  });

  it("puts cases with a screenshot first and keeps the order of the rest", () => {
    const image = { src: "/images/portfolio/a.webp", alt: "Captura" };
    const [first, second, third] = ["Primero", "Con captura", "Tercero"].map((name) => ({ ...baseCase, name }));
    const ordered = getPublishedCases([first, { ...second, image }, third]);
    expect(ordered.map((item) => item.name)).toEqual(["Con captura", "Primero", "Tercero"]);
  });
});
