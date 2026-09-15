import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <Image
        src="/logo.png"
        alt="Young Digisoft"
        width={270}
        height={84}
        priority
      />
      <h1 className="max-w-xl font-heading text-3xl text-foreground sm:text-4xl">
        Landing en construcción
      </h1>
      <p className="max-w-md text-foreground/70">
        Estamos preparando el sitio. Vuelve pronto.
      </p>
    </main>
  );
}
