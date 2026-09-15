import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { contact } from "@/content/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

const infoItems = [
  { icon: MessageCircle, label: "WhatsApp", value: contact.phone, href: contact.whatsappHref },
  { icon: Phone, label: "Teléfono", value: contact.phone, href: contact.phoneHref },
  { icon: Mail, label: "Email", value: contact.email, href: contact.emailHref },
  { icon: MapPin, label: "Zona", value: contact.zone, href: undefined },
];

export function Contact() {
  return (
    <section id="contacto" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl text-foreground sm:text-4xl">
          ¿Hablamos de tu negocio?
        </h2>
        <p className="mt-4 text-muted">
          Cuéntanos qué necesitas y te respondemos con una propuesta adaptada a tu presupuesto.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-6">
          {infoItems.map(({ icon: Icon, label, value, href }) => {
            const content = (
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
                  <p className="text-sm font-medium text-foreground">{value}</p>
                </div>
              </div>
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
    </section>
  );
}
