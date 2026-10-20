import { closing, hero } from "@/content/home";
import { contact } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBanner() {
  return (
    <section className="py-20">
      <Container>
        <Reveal className="flex flex-col items-center gap-6 rounded-3xl bg-brand px-6 py-12 text-center text-ink sm:px-12">
          <h2 className="text-2xl/8 font-bold sm:text-[1.75rem]/9">{closing.title}</h2>
          <p className="max-w-xl leading-relaxed">{closing.description}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href="/contacto" size="lg" className="bg-ink text-brand-fg hover:bg-ink/90">
              {hero.primaryCta}
            </Button>
            <Button
              href={contact.whatsappHref}
              variant="secondary"
              size="lg"
              className="border-ink text-ink hover:bg-ink/10"
            >
              {closing.whatsappCta}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
