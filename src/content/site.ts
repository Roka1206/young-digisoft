import { whatsappUrl } from "@/lib/whatsapp";

export const site = {
  name: "Young Digisoft",
  slogan: "Tecnología que trabaja para tu negocio.",
  descriptor: "Desarrollo web y automatización para pymes y autónomos",
  description:
    "Webs, automatización y consultoría para pymes y autónomos. Precio cerrado, plazo claro y trato directo. Desde A Coruña, para toda España.",
};

export const navLinks = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Cómo trabajamos", href: "/#como-trabajamos" },
  { label: "Preguntas", href: "/#preguntas" },
  { label: "Contacto", href: "/contacto" },
] as const;

const whatsappNumber = "34655087321";

export const whatsappMessages = {
  general: "Hola, quiero más información sobre los servicios de Young Digisoft.",
  diagnosis: "Hola, quiero reservar un Diagnóstico digital.",
  service: "Hola, quiero información sobre el servicio «{service}».",
};

export const contact = {
  phone: "655 08 73 21",
  phoneHref: "tel:+34655087321",
  whatsappNumber,
  whatsappHref: whatsappUrl(whatsappNumber, whatsappMessages.general),
  diagnosisHref: whatsappUrl(whatsappNumber, whatsappMessages.diagnosis),
  email: "info@youngdigisoft.es",
  emailHref: "mailto:info@youngdigisoft.es",
  zone: "Toda España, con sede en A Coruña",
};

export const socialLinks = [
  { name: "WhatsApp", href: contact.whatsappHref },
  { name: "Instagram", href: "https://www.instagram.com/youngdigisoft/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/youngdigisoft" },
] as const;
