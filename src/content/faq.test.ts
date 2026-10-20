import { describe, expect, it } from "vitest";
import { faq } from "./faq";
import { services } from "./services";

describe("faq timeline answer", () => {
  const answer = faq.find((item) => item.question === "¿Cuánto tarda?")!.answer;
  const plans = services.flatMap((service) => service.plans);

  it("lists every plan that has a timeline", () => {
    for (const plan of plans.filter((plan) => plan.timeline)) {
      expect(answer).toContain(`${plan.name}: ${plan.timeline}.`);
    }
  });

  it("skips plans without a timeline", () => {
    for (const plan of plans.filter((plan) => !plan.timeline)) {
      expect(answer.some((line) => line.startsWith(`${plan.name}:`))).toBe(false);
    }
  });
});
