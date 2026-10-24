import Link from "next/link";
import { services } from "@/content/services";
import { contact, navLinks, site } from "@/content/site";
import { uiText } from "@/content/ui";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { CookieSettingsButton } from "./CookieSettingsButton";

// min-h-11 gives each legal link a 44 px touch target.
const legalLink = "inline-flex min-h-11 items-center transition-colors hover:text-action";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Logo className="self-start" />
          <p className="max-w-sm text-sm text-muted">{site.descriptor}</p>
          <SocialLinks />
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-medium tracking-wide text-foreground uppercase">{uiText.footer.navigation}</h2>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted transition-colors hover:text-action">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-medium tracking-wide text-foreground uppercase">{uiText.footer.services}</h2>
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/servicios/${service.slug}`}
              className="text-sm text-muted transition-colors hover:text-action"
            >
              {service.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-medium tracking-wide text-foreground uppercase">{uiText.footer.contact}</h2>
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
        <Container className="flex flex-col gap-2 py-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {uiText.footer.rights}
          </p>
          <div className="flex flex-wrap gap-x-6">
            {uiText.footer.legal.map((link) => (
              <Link key={link.href} href={link.href} className={legalLink}>
                {link.label}
              </Link>
            ))}
            <CookieSettingsButton className={legalLink} />
          </div>
        </Container>
      </div>
    </footer>
  );
}
