import { describe, expect, it } from "vitest";
import { formatPrice, hasLaunchDiscount } from "./pricing";

const nbsp = " ";

describe("formatPrice", () => {
  it("prefixes one-off prices with 'desde'", () => {
    expect(formatPrice({ from: 590 }, "oneOff")).toBe(`desde 590${nbsp}€`);
  });

  it("groups thousands with a dot", () => {
    expect(formatPrice({ from: 1400, to: 1800 }, "oneOff")).toBe(`desde 1.400${nbsp}€`);
  });

  it("appends the monthly unit", () => {
    expect(formatPrice({ from: 39, to: 49 }, "monthly")).toBe(`desde 39${nbsp}€/mes`);
  });

  it("shows hourly rates without 'desde'", () => {
    expect(formatPrice({ from: 60 }, "hourly")).toBe(`60${nbsp}€/hora`);
  });
});

describe("hasLaunchDiscount", () => {
  it("is true when the launch price is lower", () => {
    expect(hasLaunchDiscount({ unit: "oneOff", launch: { from: 590 }, regular: { from: 990 } })).toBe(true);
  });

  it("is false when both prices match", () => {
    expect(hasLaunchDiscount({ unit: "hourly", launch: { from: 60 }, regular: { from: 60 } })).toBe(false);
  });
});
