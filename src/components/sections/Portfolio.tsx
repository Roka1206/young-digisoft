import Image from "next/image";
import { portfolioSection } from "@/content/home";
import { portfolio } from "@/content/portfolio";
import { getPublishedCases } from "@/lib/portfolio";
import { portfolioJsonLd } from "@/lib/structured-data";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section } from "@/components/ui/Section";

export function Portfolio() {
  const cases = getPublishedCases(portfolio);
  if (!cases.length) return null;

  return (
    <Section title={portfolioSection.title} description={portfolioSection.description}>
      <JsonLd data={portfolioJsonLd(cases)} />
      <div className="grid gap-6 md:grid-cols-2">
        {cases.map((item) => (
          <Card key={item.name} className="flex flex-col gap-3">
            {item.image && (
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={960}
                height={600}
                className="mb-2 rounded-lg border border-border"
              />
            )}
            <p className="font-mono text-[13px]/5 text-muted">{item.sector}</p>
            <h3 className="text-lg font-medium text-foreground">
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-action underline">
                  {item.name}
                </a>
              ) : (
                item.name
              )}
            </h3>
            <p className="leading-relaxed text-muted">{item.summary}</p>
            {item.result && <p className="text-foreground">{item.result}</p>}
          </Card>
        ))}
      </div>
    </Section>
  );
}
