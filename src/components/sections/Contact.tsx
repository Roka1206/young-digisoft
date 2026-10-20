import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { contactSection } from "@/content/home";
import { contact } from "@/content/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const infoItems = [
  { icon: MessageCircle, label: "WhatsApp", value: contact.phone, href: contact.whatsappHref },
  { icon: Phone, label: "Teléfono", value: contact.phone, href: contact.phoneHref },
  { icon: Mail, label: "Email", value: contact.email, href: contact.emailHref },
  { icon: MapPin, label: "Zona", value: contact.zone, href: undefined },
];

export function Contact() {
  return (
    <Section
      id="contacto"
      title={contactSection.title}
      description={contactSection.description}
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-6">
          {infoItems.map(({ icon: Icon, label, value, href }) => {
            const content = (
              <Card className="flex items-center gap-4 p-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-action/10 text-action">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
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

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
