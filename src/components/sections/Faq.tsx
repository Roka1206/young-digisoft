import { faq, type FaqItem as FaqEntry } from "@/content/faq";
import { faqSection } from "@/content/home";
import { faqJsonLd } from "@/lib/structured-data";
import { FaqItem } from "@/components/ui/FaqItem";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section } from "@/components/ui/Section";

export function Faq({ items = faq, title = faqSection.title }: { items?: FaqEntry[]; title?: string }) {
  return (
    <Section id="preguntas" title={title}>
      <JsonLd data={faqJsonLd(items)} />
      <div className="mx-auto flex max-w-3xl flex-col gap-3">
        {items.map((item) => (
          <FaqItem key={item.question} item={item} />
        ))}
      </div>
    </Section>
  );
}
