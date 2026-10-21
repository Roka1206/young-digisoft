import { formatPrice } from "@/lib/pricing";
import type { FaqItem } from "./faq";
import { prices, type PlanId } from "./pricing";

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
  headline?: string;
  sectors?: string[];
  highlights?: { title: string; items: { title: string; description: string }[] };
  faq?: FaqItem[];
};

const webPlans: Plan[] = [
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
];

export const services: Service[] = [
  {
    slug: "web",
    name: "Diseño web",
    headline: "Diseño web para pymes y autónomos",
    summary:
      "Te hacemos una web profesional y rápida, y configuramos tu ficha de Google para que los clientes de tu zona te encuentren y te escriban.",
    audience: "Negocios que quieren aparecer en Google y recibir contactos desde su web.",
    plans: webPlans,
    excludes: [
      "El coste del dominio y del hosting: van a tu nombre y los pagas al proveedor",
      "La redacción de textos y la sesión de fotos: los aportas tú y te ayudamos a ordenarlos",
      "Tienda online y pagos",
      "Versiones en otros idiomas",
      "El mantenimiento tras la entrega, que es un servicio aparte",
    ],
    revisionRounds: "2 rondas de cambios incluidas antes de publicar. Los cambios extra se presupuestan aparte.",
    sectors: [
      "Peluquerías y centros de estética",
      "Clínicas de fisioterapia, dentistas y psicólogos",
      "Talleres",
      "Restaurantes y cafeterías",
      "Academias",
      "Reformas y oficios",
    ],
    highlights: {
      title: "Cómo te ayudamos a aparecer en Google",
      items: [
        {
          title: "Tu ficha de Google, completa",
          description:
            "Configuramos tu perfil de Google Business Profile con horario, teléfono, fotos y zona de servicio, para que aparezcas en Google Maps.",
        },
        {
          title: "Una web que Google entiende",
          description: "Cada página dice claramente qué haces y dónde, y carga rápido en el móvil.",
        },
        {
          title: "Contacto en un toque",
          description: "Botón de WhatsApp y formulario, para que quien te encuentre te escriba en el momento.",
        },
      ],
    },
    faq: [
      {
        question: "¿Cuánto cuesta una página web?",
        answer: [
          `La Web Esencial + Google cuesta ${formatPrice(prices.webEssential.launch, "oneOff")} y la Web Pro ${formatPrice(prices.webPro.launch, "oneOff")}, con precio de lanzamiento para los primeros clientes.`,
          "Antes de empezar te damos un precio cerrado por escrito.",
        ],
      },
      {
        question: "¿Me garantizáis salir el primero en Google?",
        answer: [
          "No: nadie puede garantizarlo. Lo que sí hacemos es que Google tenga toda la información correcta de tu negocio y que tu web y tu ficha estén bien preparadas para las búsquedas de tu zona.",
        ],
      },
      {
        question: "¿Cuánto tarda una web?",
        answer: [
          ...webPlans.map((plan) => `${plan.name}: ${plan.timeline}.`),
          "Te confirmamos el plazo exacto en la propuesta.",
        ],
      },
    ],
  },
  {
    slug: "automatizacion",
    name: "Automatización exprés",
    headline: "Automatización de tareas para pymes",
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
    excludes: [
      "Las licencias de herramientas de terceros, como el CRM o WhatsApp Business",
      "Más de una automatización",
      "El mantenimiento tras la entrega",
    ],
    revisionRounds: "1 ronda de ajustes tras ponerla en marcha.",
  },
  {
    slug: "mantenimiento",
    name: "Mantenimiento mensual",
    headline: "Mantenimiento web mensual para pymes",
    summary:
      "Nos ocupamos de que tu web siga funcionando y al día: alojamiento, copias de seguridad, monitorización, actualizaciones y pequeños cambios cada mes.",
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
    excludes: [
      "Secciones o funciones nuevas, que se presupuestan aparte",
      "Los cambios que superen la bolsa mensual",
      "El coste del dominio",
    ],
  },
  {
    slug: "diagnostico-digital",
    name: "Diagnóstico digital",
    headline: "Diagnóstico digital para tu negocio",
    summary:
      "En una sesión de 60 minutos revisamos tu web, tu presencia en Google, tus procesos y tus herramientas, y te damos una lista priorizada de qué mejorar.",
    audience: "Negocios que no saben qué herramientas necesitan ni por dónde empezar.",
    plans: [
      {
        id: "diagnosis",
        name: "Diagnóstico digital",
        includes: [
          "Sesión de 60 minutos",
          "Resumen escrito con recomendaciones priorizadas sobre web, Google, procesos, herramientas y seguridad",
        ],
        timeline: "Sesión de 60 minutos y recomendaciones en pocos días",
      },
    ],
    excludes: [
      "La puesta en marcha de las recomendaciones, que se presupuesta aparte",
      "Un informe detallado, que se presupuesta aparte",
    ],
    note: "Se descuenta si después contratas una web o una automatización.",
  },
];

export const servicePageText = {
  audience: "Para quién es",
  plans: "Qué incluye y cuánto cuesta",
  excludes: "Qué no incluye",
  revisionRounds: "Rondas de revisión",
  sectors: "Para qué negocios es",
  faq: "Preguntas frecuentes",
  breadcrumbHome: "Inicio",
};
