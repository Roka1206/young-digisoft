import { socialLinks } from "@/content/site";
import { cn } from "@/lib/cn";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./BrandIcons";

const icons = {
  WhatsApp: WhatsAppIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
} as const;

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {socialLinks.map((social) => {
        const Icon = icons[social.name];
        return (
          <li key={social.name}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-brand hover:text-brand"
            >
              <Icon className="size-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
