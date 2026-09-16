import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6 lg:px-8">
          <span className="font-heading text-7xl text-brand">404</span>
          <h1 className="font-heading text-2xl text-foreground sm:text-3xl">
            No hemos encontrado esta página
          </h1>
          <p className="text-sm text-muted">
            Puede que el enlace esté roto o que la página se haya movido. Vuelve al inicio o
            contacta con nosotros si necesitas ayuda.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="/">Volver al inicio</Button>
            <Button href="/#contacto" variant="secondary">
              Contactar
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
