import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { contactPage } from "@/content/contact";
import { contact, openingHours } from "@/content/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const infoItems = [
  { icon: MessageCircle, label: contactPage.labels.whatsapp, value: contact.phone, href: contact.whatsappHref },
  { icon: Phone, label: contactPage.labels.phone, value: contact.phone, href: contact.phoneHref },
  { icon: Mail, label: contactPage.labels.email, value: contact.email, href: contact.emailHref },
  { icon: Clock, label: contactPage.labels.hours, value: openingHours.label, href: undefined },
  { icon: MapPin, label: contactPage.labels.zone, value: contact.zone, href: undefined },
];

export function Contact() {
  return (
    <section id="contacto">
      <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-6">
          {infoItems.map(({ icon: Icon, label, value, href }) => {
            const content = (
              <Card className="flex items-center gap-4 p-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-action/10 text-action">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="text-xs tracking-wide text-muted uppercase">{label}</p>
                  <p className="text-sm font-medium text-foreground">{value}</p>
                </div>
              </Card>
            );
            return href ? (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="transition-transform hover:-translate-y-0.5"
              >
                {content}
              </a>
            ) : (
              <div key={label}>{content}</div>
            );
          })}
        </Reveal>

        <Reveal>
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
