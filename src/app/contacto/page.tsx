import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { contactPage } from "@/content/contact";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: contactPage.metaTitle,
  description: contactPage.metaDescription,
  path: "/contacto",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: contactPage.breadcrumb, path: "/contacto" }])} />
      <Header />
      <main className="flex-1">
        <PageHero title={contactPage.title} description={contactPage.description} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
