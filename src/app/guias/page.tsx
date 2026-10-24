import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { guides, guidesPageText } from "@/content/guides";
import { formatGuideDate, newestFirst } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: guidesPageText.metaTitle,
  description: guidesPageText.description,
  path: "/guias",
});

export default function GuidesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: guidesPageText.breadcrumb, path: "/guias" }])} />
      <Header />
      <main id="contenido" className="flex-1">
        <PageHero title={guidesPageText.title} description={guidesPageText.description} />
        <Container className="max-w-3xl py-20">
          <ul className="flex flex-col gap-6">
            {newestFirst(guides).map((guide) => (
              <li key={guide.slug}>
                <Card className="flex flex-col gap-3">
                  <h2 className="text-xl/7 font-bold text-foreground">
                    <Link href={`/guias/${guide.slug}`} className="hover:text-action">
                      {guide.title}
                    </Link>
                  </h2>
                  <p className="leading-relaxed text-muted">{guide.description}</p>
                  <p className="text-sm text-muted">
                    {guidesPageText.updated} <time dateTime={guide.updatedAt}>{formatGuideDate(guide.updatedAt)}</time>
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
