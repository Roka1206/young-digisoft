import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { uiText } from "@/content/ui";

const { notFound } = uiText;

export const metadata: Metadata = {
  title: notFound.metaTitle,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="contenido" className="flex-1">
        <Container className="flex max-w-2xl flex-col items-center gap-6 py-24 text-center">
          <span className="font-mono text-7xl font-bold text-action">404</span>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{notFound.title}</h1>
          <p className="text-sm text-muted">{notFound.description}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="/">{notFound.home}</Button>
            <Button href="/contacto" variant="secondary">
              {notFound.contact}
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
