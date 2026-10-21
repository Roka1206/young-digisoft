import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { cookiesSections } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Política de cookies",
  description:
    "Qué cookies y tecnologías de almacenamiento usa el sitio web de Young Digisoft, incluida Google Analytics, y cómo aceptarlas, rechazarlas o retirar el consentimiento.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Container className="max-w-3xl py-20">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Política de cookies</h1>
          <div className="mt-10 flex flex-col gap-8">
            {cookiesSections.map((section) => (
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
