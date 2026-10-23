import { whatsappUrl } from "@/lib/whatsapp";

export const site = {
  name: "Young Digisoft",
  slogan: "Tecnología que trabaja para tu negocio.",
  descriptor: "Desarrollo web y automatización para pymes y autónomos",
  homeTitle: "Diseño web y automatización en A Coruña — Young Digisoft",
  description:
    "Webs, automatización, redes sociales y consultoría para pymes y autónomos. Precio cerrado, plazo claro y trato directo. Desde Sada (A Coruña), para toda España.",
  foundingDate: "2026-06-23",
};

export const address = {
  street: "Rúa Linares Rivas 9 bajo",
  postalCode: "15160",
  locality: "Sada",
  region: "A Coruña",
};

export const fullAddress = `${address.street}, ${address.postalCode} ${address.locality} (${address.region})`;

export const openingHours = { opens: "09:00", closes: "21:00", label: "Todos los días, de 9:00 a 21:00" };

// Founder data for structured data; the legal texts take the owner name from here.
export const founder = {
  name: "Ronald Fonseca",
  jobTitle: "Ingeniero de software",
  linkedin: "https://www.linkedin.com/in/rfonsecah92",
};

export const expertise = [
  "Diseño web",
  "Desarrollo web con Next.js y TypeScript",
  "SEO local",
  "Google Business Profile",
  "Automatización de procesos",
  "Gestión de redes sociales",
  "Consultoría tecnológica para pymes",
];

export const navLinks = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Cómo trabajamos", href: "/#como-trabajamos" },
  { label: "Preguntas", href: "/#preguntas" },
  { label: "Guías", href: "/guias" },
  { label: "Sobre nosotros", href: "/sobre-nosotros" },
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
  zone: "Toda España, desde Sada (A Coruña)",
};

export const socialLinks = [
  { name: "WhatsApp", href: contact.whatsappHref },
  { name: "Instagram", href: "https://www.instagram.com/youngdigisoft/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/youngdigisoft" },
] as const;
