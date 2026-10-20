import Link from "next/link";
import { contact, navLinks, site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { CookieSettingsButton } from "./CookieSettingsButton";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-10 py-12 lg:grid-cols-[2fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Logo className="self-start" />
          <p className="max-w-sm text-sm text-muted">{site.descriptor}</p>
          <SocialLinks />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-sm uppercase tracking-wide text-foreground">
            Navegación
          </h3>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-action"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-sm uppercase tracking-wide text-foreground">
            Contacto
          </h3>
          <a href={contact.phoneHref} className="text-sm text-muted transition-colors hover:text-action">
            {contact.phone}
          </a>
          <a href={contact.emailHref} className="text-sm text-muted transition-colors hover:text-action">
            {contact.email}
          </a>
          <p className="text-sm text-muted">{contact.zone}</p>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/aviso-legal" className="transition-colors hover:text-action">
              Aviso legal
            </Link>
            <Link href="/privacidad" className="transition-colors hover:text-action">
              Privacidad
            </Link>
            <Link href="/cookies" className="transition-colors hover:text-action">
              Cookies
            </Link>
            <CookieSettingsButton />
          </div>
        </Container>
      </div>
    </footer>
  );
}
