import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { aboutPage } from "@/content/about";
import Body from "@/content/about.mdx";
import { pageMetadata } from "@/lib/metadata";
import { aboutPageJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: aboutPage.label,
  description: aboutPage.metaDescription,
  path: aboutPage.path,
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPageJsonLd()} />
      <JsonLd data={breadcrumbJsonLd([{ name: aboutPage.label, path: aboutPage.path }])} />
      <Header />
      <main id="contenido" className="flex-1">
        <PageHero title={aboutPage.title} description={aboutPage.description}>
          <Image
            src={aboutPage.photo.src}
            alt={aboutPage.photo.alt}
            width={160}
            height={160}
            priority
            className="size-32 rounded-full border-4 border-brand sm:size-40"
          />
        </PageHero>
        <Container className="max-w-3xl py-16">
          <article>
            <Body />
          </article>
        </Container>
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
