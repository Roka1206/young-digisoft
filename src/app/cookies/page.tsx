import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { cookiesSections, legalUpdatedAt } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

const title = "Política de cookies";

export const metadata = pageMetadata({
  title,
  description:
    "Qué cookies y almacenamiento usa la web de Young Digisoft, incluida Google Analytics, y cómo aceptarlas, rechazarlas o retirar tu consentimiento.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: title, path: "/cookies" }])} />
      <Header />
      <main id="contenido" className="flex-1">
        <Container className="max-w-3xl py-20">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-muted">{legalUpdatedAt}</p>
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
