import { describe, expect, it } from "vitest";
import { services } from "@/content/services";
import { findService, plansByBilling } from "./services";

describe("findService", () => {
  it("returns the service that matches the slug", () => {
    expect(findService(services, "mantenimiento")?.name).toBe("Mantenimiento mensual");
  });

  it("returns undefined for an unknown slug", () => {
    expect(findService(services, "no-existe")).toBeUndefined();
  });
});

describe("plansByBilling", () => {
  it("separates one-off projects from monthly and hourly plans, in their original order", () => {
    const { oneOff, recurring } = plansByBilling(services);
    expect(oneOff.map(({ plan }) => plan.id)).toEqual(["webEssential", "webPro", "automation"]);
    expect(recurring.map(({ plan }) => plan.id)).toEqual(["maintenance", "socialMedia", "diagnosis"]);
  });

  it("keeps each plan with the service it belongs to", () => {
    const { recurring } = plansByBilling(services);
    expect(recurring.map(({ service }) => service.slug)).toEqual([
      "mantenimiento",
      "redes-sociales",
      "diagnostico-digital",
    ]);
  });
});
