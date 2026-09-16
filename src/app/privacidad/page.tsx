import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { privacidadSections } from "@/content/legal";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo trata Young Digisoft los datos personales recogidos en el formulario de contacto: finalidad, conservación y derechos del usuario.",
  alternates: {
    canonical: "/privacidad",
  },
};

export default function PrivacidadPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl text-foreground sm:text-4xl">
            Política de privacidad
          </h1>
          <div className="mt-10 flex flex-col gap-8">
            {privacidadSections.map((section) => (
              <section key={section.title}>
                <h2 className="font-heading text-lg text-foreground">{section.title}</h2>
                <div className="mt-2 flex flex-col gap-2">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
