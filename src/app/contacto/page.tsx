import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { PageHero } from "@/components/ui/PageHero";
import { contactPage } from "@/content/contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: contactPage.metaTitle,
  description: contactPage.metaDescription,
  path: "/contacto",
});

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero title={contactPage.title} description={contactPage.description} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
