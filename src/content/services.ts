import type { PlanId } from "./pricing";

export type Plan = {
  id: PlanId;
  name: string;
  includes: string[];
  timeline?: string;
};

export type Service = {
  slug: string;
  name: string;
  audience: string;
  plans: Plan[];
  excludes: string[];
  revisionRounds?: string;
  note?: string;
};

const pending = "[PENDIENTE]";

export const services: Service[] = [
  {
    slug: "web",
    name: "Web profesional",
    audience: "Negocios que quieren aparecer en Google y recibir contactos desde su web.",
    plans: [
      {
        id: "webEssential",
        name: "Web Esencial + Google",
        includes: [
          "Web de 1 a 5 secciones",
          "SEO local básico",
          "Ficha de Google Business Profile",
          "Formulario de contacto y botón de WhatsApp",
          "Textos legales",
        ],
        timeline: "1 a 2 semanas",
      },
      {
        id: "webPro",
        name: "Web Pro",
        includes: ["Web de 5 a 8 secciones", "Blog", "Más personalización"],
        timeline: "2 a 4 semanas",
      },
    ],
    excludes: [pending],
    revisionRounds: pending,
  },
  {
    slug: "automatizacion",
    name: "Automatización exprés",
    audience: "Negocios que pierden tiempo con tareas repetitivas.",
    plans: [
      {
        id: "automation",
        name: "Automatización exprés",
        includes: [
          "Diagnóstico gratuito de 30 minutos",
          "Una automatización concreta: del formulario a tu CRM u hoja de cálculo con aviso por WhatsApp o email, citas, presupuestos o facturas",
        ],
        timeline: "1 a 2 semanas desde el diagnóstico",
      },
    ],
    excludes: [pending],
    revisionRounds: pending,
  },
  {
    slug: "mantenimiento",
    name: "Mantenimiento mensual",
    audience: "Negocios que quieren olvidarse de la parte técnica de su web.",
    plans: [
      {
        id: "maintenance",
        name: "Mantenimiento mensual",
        includes: [
          "Hosting y despliegues",
          "Copias de seguridad",
          "Monitorización",
          "Actualizaciones",
          "Bolsa pequeña de cambios",
        ],
      },
    ],
    excludes: [pending],
  },
  {
    slug: "diagnostico-digital",
    name: "Diagnóstico digital",
    audience: "Negocios que no saben qué herramientas necesitan ni por dónde empezar.",
    plans: [
      {
        id: "diagnosis",
        name: "Diagnóstico digital",
        includes: [
          "Sesión de 60 minutos",
          "Recomendaciones priorizadas sobre web, Google, procesos, herramientas y seguridad",
        ],
        timeline: "Sesión de 60 minutos y recomendaciones en pocos días",
      },
    ],
    excludes: [pending],
    note: "Se descuenta si después contratas una web o una automatización.",
  },
];
