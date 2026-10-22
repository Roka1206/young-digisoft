import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { PriceCard } from "@/components/ui/PriceCard";
import { Section } from "@/components/ui/Section";
import { guides } from "@/content/guides";
import { servicePageText, services } from "@/content/services";
import { guidesForService } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/cn";
import { findService } from "@/lib/services";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/structured-data";
import { serviceWhatsappHref } from "@/lib/whatsapp-links";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const service = findService(services, (await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: service.headline ?? service.name,
    description: service.summary,
    path: `/servicios/${service.slug}`,
  });
}

export default async function ServicePage({ params }: PageProps<"/servicios/[slug]">) {
  const service = findService(services, (await params).slug);
  if (!service) notFound();
  const columns = service.plans.length > 1 ? "max-w-4xl md:grid-cols-2" : "max-w-xl";
  const relatedGuides = guidesForService(guides, service.slug);

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: servicePageText.breadcrumbHome, path: "/" },
          { name: service.name, path: `/servicios/${service.slug}` },
        ])}
      />
      <Header />
      <main className="flex-1">
        <PageHero title={service.headline ?? service.name} description={service.summary}>
          <p className="leading-relaxed">
            <strong className="font-medium text-action">{servicePageText.audience}:</strong> {service.audience}
          </p>
        </PageHero>

        {service.sectors && (
          <Section title={servicePageText.sectors} className="bg-surface">
            <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {service.sectors.map((sector) => (
                <li key={sector}>
                  <Card className="p-4 font-medium text-foreground">{sector}</Card>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section title={servicePageText.plans}>
          <div className={cn("mx-auto grid gap-6", columns)}>
            {service.plans.map((plan) => (
              <PriceCard key={plan.id} plan={plan}>
                {service.note && <p className="text-sm text-muted">{service.note}</p>}
              </PriceCard>
            ))}
          </div>
          <div className={cn("mx-auto mt-6 grid gap-6", columns)}>
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

        {service.highlights && (
          <Section title={service.highlights.title} className="bg-surface">
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {service.highlights.items.map(({ title, description }) => (
                <Card key={title} className="flex flex-col gap-3">
                  <h3 className="text-lg font-medium text-foreground">{title}</h3>
                  <p className="leading-relaxed text-muted">{description}</p>
                </Card>
              ))}
            </div>
          </Section>
        )}

        {service.faq && <Faq items={service.faq} title={servicePageText.faq} />}

        {relatedGuides.length > 0 && (
          <Section title={servicePageText.relatedGuides} className="bg-surface">
            <ul className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {relatedGuides.map((guide) => (
                <li key={guide.slug}>
                  <Card className="flex h-full flex-col gap-3">
                    <h3 className="text-lg font-medium text-foreground">
                      <Link href={`/guias/${guide.slug}`} className="hover:text-action">
                        {guide.title}
                      </Link>
                    </h3>
                    <p className="leading-relaxed text-muted">{guide.description}</p>
                  </Card>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <CtaBanner whatsappHref={serviceWhatsappHref(service.name)} />
      </main>
      <Footer />
    </>
  );
}
