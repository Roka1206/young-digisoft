import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { avisoLegalSections, legalUpdatedAt } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Aviso legal",
  description:
    "Aviso legal de Young Digisoft: datos identificativos, condiciones de uso y propiedad intelectual del sitio web.",
  path: "/aviso-legal",
});

export default function AvisoLegalPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Container className="max-w-3xl py-20">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Aviso legal</h1>
          <p className="mt-3 text-sm text-muted">{legalUpdatedAt}</p>
          <div className="mt-10 flex flex-col gap-8">
            {avisoLegalSections.map((section) => (
              <section key={section.title}>
                <h2 className="text-lg font-bold text-foreground">{section.title}</h2>
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
        </Container>
      </main>
      <Footer />
    </>
  );
}
