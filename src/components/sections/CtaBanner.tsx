import { contact } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBanner({
  heading,
  description,
  ctaLabel = "Hablemos de tu negocio",
}: {
  heading: string;
  description: string;
  ctaLabel?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Reveal className="flex flex-col items-center gap-6 rounded-3xl bg-brand px-6 py-12 text-center text-brand-foreground sm:px-12">
        <h2 className="font-heading text-2xl sm:text-3xl">{heading}</h2>
        <p className="max-w-xl text-brand-foreground/90">{description}</p>
        <Button
          href={contact.whatsappHref}
          size="lg"
          className="bg-brand-foreground text-brand hover:brightness-95"
        >
          {ctaLabel}
        </Button>
      </Reveal>
    </section>
  );
}
