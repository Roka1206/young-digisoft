import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Container className="flex max-w-2xl flex-col items-center gap-6 py-24 text-center">
          <span className="font-mono text-7xl font-bold text-action">404</span>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">No hemos encontrado esta página</h1>
          <p className="text-sm text-muted">
            Puede que el enlace esté roto o que la página se haya movido. Vuelve al inicio o contacta con nosotros si
            necesitas ayuda.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="/">Volver al inicio</Button>
            <Button href="/contacto" variant="secondary">
              Contactar
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
