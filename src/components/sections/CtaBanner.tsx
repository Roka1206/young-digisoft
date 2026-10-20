import { contact } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
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
    <section>
      <Container>
        <Reveal className="flex flex-col items-center gap-6 rounded-3xl bg-brand px-6 py-12 text-center text-ink sm:px-12">
          <h2 className="text-2xl/8 font-bold sm:text-[1.75rem]/9">{heading}</h2>
          <p className="max-w-xl">{description}</p>
          <Button href={contact.whatsappHref} size="lg" className="bg-ink text-brand-fg hover:bg-ink/90">
            {ctaLabel}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
