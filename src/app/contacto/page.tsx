import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { PageHero } from "@/components/ui/PageHero";
import { contactPage } from "@/content/contact";

export const metadata: Metadata = {
  title: contactPage.metaTitle,
  description: contactPage.description,
  alternates: { canonical: "/contacto" },
};

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
