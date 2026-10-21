import { describe, expect, it } from "vitest";
import { contact } from "@/content/site";
import { serviceWhatsappHref, whatsappHrefForPath } from "./whatsapp-links";

const messageOf = (href: string) => new URL(href).searchParams.get("text");

describe("serviceWhatsappHref", () => {
  it("names the service in the prefilled message", () => {
    expect(messageOf(serviceWhatsappHref("Web profesional"))).toBe(
      "Hola, quiero información sobre el servicio «Web profesional».",
    );
  });
});

describe("whatsappHrefForPath", () => {
  it("uses the service message on a service page", () => {
    expect(whatsappHrefForPath("/servicios/automatizacion")).toBe(serviceWhatsappHref("Automatización exprés"));
  });

  it.each(["/", "/contacto", "/privacidad", "/servicios/no-existe"])("uses the general message on %s", (pathname) => {
    expect(whatsappHrefForPath(pathname)).toBe(contact.whatsappHref);
  });
});
