import { services } from "@/content/services";
import { contact, whatsappMessages } from "@/content/site";
import { findService } from "./services";
import { whatsappUrl } from "./whatsapp";

export function serviceWhatsappHref(serviceName: string) {
  return whatsappUrl(contact.whatsappNumber, whatsappMessages.service.replace("{service}", serviceName));
}

export function whatsappHrefForPath(pathname: string) {
  const slug = pathname.match(/^\/servicios\/([^/]+)/)?.[1];
  const service = slug ? findService(services, slug) : undefined;
  return service ? serviceWhatsappHref(service.name) : contact.whatsappHref;
}
