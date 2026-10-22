import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { guides, guidesPageText } from "@/content/guides";
import { servicePageText, services } from "@/content/services";
import { findGuide, formatGuideDate } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";
import { findService } from "@/lib/services";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/guias/[slug]">): Promise<Metadata> {
  const guide = findGuide(guides, (await params).slug);
  if (!guide) return {};
  return pageMetadata({ title: guide.title, description: guide.description, path: `/guias/${guide.slug}` });
}

export default async function GuidePage({ params }: PageProps<"/guias/[slug]">) {
  const guide = findGuide(guides, (await params).slug);
  if (!guide) notFound();
  const { default: Body } = await import(`@/content/guides/${guide.slug}.mdx`);
  const service = findService(services, guide.serviceSlug);

  return (
    <>
      <JsonLd data={articleJsonLd(guide)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: servicePageText.breadcrumbHome, path: "/" },
          { name: guidesPageText.breadcrumb, path: "/guias" },
          { name: guide.title, path: `/guias/${guide.slug}` },
        ])}
      />
      <Header />
      <main className="flex-1">
        <PageHero title={guide.title} description={guide.description}>
          <p className="text-sm text-muted">
            {guidesPageText.updated} <time dateTime={guide.updatedAt}>{formatGuideDate(guide.updatedAt)}</time>
          </p>
        </PageHero>
        <Container className="max-w-3xl py-16">
          <article>
            <Body />
          </article>
          {service && (
            <Card className="mt-12 flex flex-col gap-2">
              <p className="text-sm text-muted">{guidesPageText.relatedService}</p>
              <Link href={`/servicios/${service.slug}`} className="text-lg font-bold text-action hover:underline">
                {service.headline ?? service.name}
              </Link>
            </Card>
          )}
        </Container>
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
