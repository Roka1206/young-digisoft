import { describe, expect, it } from "vitest";
import { formatPrice } from "@/lib/pricing";
import { prices } from "./pricing";
import { services } from "./services";

const web = services.find((service) => service.slug === "web")!;
const answerTo = (question: string) => web.faq!.find((item) => item.question === question)!.answer.join(" ");

describe("web design FAQ", () => {
  it("quotes the launch price of every web plan from the pricing file", () => {
    const answer = answerTo("¿Cuánto cuesta una página web?");
    for (const plan of web.plans) expect(answer).toContain(formatPrice(prices[plan.id].launch, "oneOff"));
  });

  it("lists the timeline of every web plan", () => {
    const answer = answerTo("¿Cuánto tarda una web?");
    for (const plan of web.plans) expect(answer).toContain(`${plan.name}: ${plan.timeline}.`);
  });
});

describe("service titles for Google", () => {
  it("keeps every title, brand included, within 60 characters", () => {
    for (const { metaTitle, headline, name } of services) {
      expect(`${metaTitle ?? headline ?? name} — Young Digisoft`.length).toBeLessThanOrEqual(60);
    }
  });
});
