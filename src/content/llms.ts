import { launchOffer } from "./pricing";

// Headings and fixed lines of /llms.txt, the plain-text summary for AI assistants.
export const llmsText = {
  services: "Servicios",
  plans: "Planes",
  launchNote: `Precios de lanzamiento ${launchOffer.audience}, hasta ${launchOffer.endsOn}. Antes de empezar se confirma un precio cerrado por escrito.`,
  contact: "Contacto",
  email: "Email",
  phone: "Teléfono y WhatsApp",
  form: "Formulario de contacto",
  optional: "Optional",
  legal: [
    { name: "Aviso legal", path: "/aviso-legal" },
    { name: "Política de privacidad", path: "/privacidad" },
    { name: "Política de cookies", path: "/cookies" },
  ],
};
