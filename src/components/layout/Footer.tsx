import Image from "next/image";
import { contact, navLinks, site } from "@/content/site";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[2fr_1fr_1fr] lg:px-8">
        <div className="flex flex-col gap-4">
          <Image src="/logo.png" alt={site.name} width={135} height={42} className="h-9 w-auto" />
          <p className="max-w-sm text-sm text-muted">{site.tagline}</p>
          <SocialLinks />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-sm uppercase tracking-wide text-foreground">
            Navegación
          </h3>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-sm uppercase tracking-wide text-foreground">
            Contacto
          </h3>
          <a href={contact.phoneHref} className="text-sm text-muted transition-colors hover:text-brand">
            {contact.phone}
          </a>
          <a href={contact.emailHref} className="text-sm text-muted transition-colors hover:text-brand">
            {contact.email}
          </a>
          <p className="text-sm text-muted">{contact.zone}</p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} {site.name}. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <a href="#" className="transition-colors hover:text-brand">
              Aviso legal
            </a>
            <a href="#" className="transition-colors hover:text-brand">
              Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
