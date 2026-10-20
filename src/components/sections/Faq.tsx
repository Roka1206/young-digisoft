import { faq } from "@/content/faq";
import { faqSection } from "@/content/home";
import { FaqItem } from "@/components/ui/FaqItem";
import { Section } from "@/components/ui/Section";

export function Faq() {
  return (
    <Section id="preguntas" title={faqSection.title}>
      <div className="mx-auto flex max-w-3xl flex-col gap-3">
        {faq.map((item) => (
          <FaqItem key={item.question} item={item} />
        ))}
      </div>
    </Section>
  );
}
