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
  summary: string;
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
    summary:
      "Te hacemos una web profesional y rápida, y configuramos tu ficha de Google para que los clientes de tu zona te encuentren y te escriban.",
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
    summary:
      "Elegimos contigo una tarea que hoy haces a mano y la automatizamos: menos copiar y pegar, menos olvidos y más tiempo para tu negocio.",
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
    summary:
      "Nos ocupamos de que tu web siga funcionando: alojamiento, copias de seguridad, actualizaciones y pequeños cambios cada mes.",
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
    summary:
      "En una sesión de 60 minutos revisamos tu web, tu presencia en Google, tus procesos y tus herramientas, y te damos una lista priorizada de qué mejorar.",
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

export const servicePageText = {
  audience: "Para quién es",
  plans: "Qué incluye y cuánto cuesta",
  excludes: "Qué no incluye",
  revisionRounds: "Rondas de revisión",
};
