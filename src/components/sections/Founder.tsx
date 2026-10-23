import Image from "next/image";
import Link from "next/link";
import { aboutPage } from "@/content/about";
import { founderSection } from "@/content/home";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function Founder() {
  return (
    <Section title={founderSection.title}>
      <Reveal>
        <Card className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          <Image
            src={aboutPage.photo.src}
            alt={aboutPage.photo.alt}
            width={128}
            height={128}
            className="size-28 shrink-0 rounded-full border-4 border-brand sm:size-32"
          />
          <div className="flex flex-col gap-3">
            <p className="leading-relaxed text-foreground">{founderSection.text}</p>
            <Link href={aboutPage.path} className="font-medium text-action underline hover:text-action-hover">
              {founderSection.link}
            </Link>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
