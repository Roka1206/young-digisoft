import { describe, expect, it } from "vitest";
import { services } from "@/content/services";
import { findService } from "./services";

describe("findService", () => {
  it("returns the service that matches the slug", () => {
    expect(findService(services, "mantenimiento")?.name).toBe("Mantenimiento mensual");
  });

  it("returns undefined for an unknown slug", () => {
    expect(findService(services, "no-existe")).toBeUndefined();
  });
});
