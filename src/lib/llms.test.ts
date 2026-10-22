import { describe, expect, it } from "vitest";
import { guides } from "@/content/guides";
import { services } from "@/content/services";
import { buildLlmsTxt } from "./llms";

const baseUrl = "https://youngdigisoft.es";
const text = buildLlmsTxt(baseUrl, services, guides);

describe("buildLlmsTxt", () => {
  it("starts with the site name as the only top-level heading, then a summary quote", () => {
    const [title, summary] = text.split("\n\n");
    expect(title).toBe("# Young Digisoft");
    expect(summary).toMatch(/^> Desarrollo web y automatización para pymes y autónomos\./);
    expect(text.match(/^# /gm)).toHaveLength(1);
  });

  it("links every service page with its launch prices from pricing.ts", () => {
    for (const { slug } of services) expect(text).toContain(`(${baseUrl}/servicios/${slug})`);
    expect(text).toMatch(/Web Esencial \+ Google desde 590\s€/);
    expect(text).toMatch(/Mantenimiento mensual desde 39\s€\/mes/);
    expect(text).toMatch(/Diagnóstico digital 60\s€\/hora/);
  });

  it("links every guide with its description", () => {
    for (const { slug, description } of guides) expect(text).toContain(`(${baseUrl}/guias/${slug}): ${description}`);
  });

  it("links the about page with its summary", () => {
    expect(text).toContain(`## Sobre nosotros

- [Quién está detrás de Young Digisoft](${baseUrl}/sobre-nosotros): Conoce a Ronald Fonseca`);
  });

  it("includes the contact details and the contact page", () => {
    expect(text).toContain("info@youngdigisoft.es");
    expect(text).toContain("655 08 73 21");
    expect(text).toContain(`(${baseUrl}/contacto)`);
  });

  it("puts the legal pages in the Optional section", () => {
    expect(text.split("## Optional")[1]).toContain(`(${baseUrl}/aviso-legal)`);
  });
});
