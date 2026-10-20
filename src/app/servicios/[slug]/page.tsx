import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Card } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { PriceCard } from "@/components/ui/PriceCard";
import { Section } from "@/components/ui/Section";
import { servicePageText, services } from "@/content/services";
import { findService } from "@/lib/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const service = findService(services, (await params).slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/servicios/${service.slug}` },
  };
}

export default async function ServicePage({ params }: PageProps<"/servicios/[slug]">) {
  const service = findService(services, (await params).slug);
  if (!service) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero title={service.name} description={service.summary}>
          <p className="leading-relaxed">
            <strong className="font-medium text-action">{servicePageText.audience}:</strong> {service.audience}
          </p>
        </PageHero>

        <Section title={servicePageText.plans}>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {service.plans.map((plan) => (
              <PriceCard key={plan.id} plan={plan}>
                {service.note && <p className="text-sm text-muted">{service.note}</p>}
              </PriceCard>
            ))}
          </div>
          <div className="mx-auto mt-6 grid max-w-4xl gap-6 md:grid-cols-2">
            <Card className="flex flex-col gap-3">
              <h3 className="text-lg font-medium text-foreground">{servicePageText.excludes}</h3>
              <ul className="list-disc pl-5 leading-relaxed text-muted">
                {service.excludes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
            {service.revisionRounds && (
              <Card className="flex flex-col gap-3">
                <h3 className="text-lg font-medium text-foreground">{servicePageText.revisionRounds}</h3>
                <p className="leading-relaxed text-muted">{service.revisionRounds}</p>
              </Card>
            )}
          </div>
        </Section>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
