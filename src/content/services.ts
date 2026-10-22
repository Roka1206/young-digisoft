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

const automationPlan: Plan = {
  id: "automation",
  name: "Automatización exprés",
  includes: [
    "Diagnóstico gratuito de 30 minutos",
    "Una automatización concreta: del formulario a tu CRM u hoja de cálculo con aviso por WhatsApp o email, citas, presupuestos o facturas",
  ],
  timeline: "1 a 2 semanas desde el diagnóstico",
};

const launchPrice = (id: PlanId) => formatPrice(prices[id].launch, prices[id].unit);

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
    plans: [automationPlan],
    excludes: [
      "Las licencias de herramientas de terceros, como el CRM o WhatsApp Business",
      "Más de una automatización",
      "El mantenimiento tras la entrega",
    ],
    revisionRounds: "1 ronda de ajustes tras ponerla en marcha.",
    highlights: {
      title: "Ejemplos de lo que podemos automatizar",
      items: [
        {
          title: "Contactos que no se pierden",
          description:
            "Cada mensaje de tu formulario se guarda solo en tu hoja de cálculo o tu CRM, y te llega un aviso por WhatsApp o email para que respondas rápido.",
        },
        {
          title: "Citas sin llamadas de ida y vuelta",
          description:
            "Tus clientes piden cita por su cuenta y la reserva aparece en tu agenda, sin apuntarla a mano ni cuadrar horarios por teléfono.",
        },
        {
          title: "Presupuestos y facturas en menos tiempo",
          description:
            "Los datos que ya tienes rellenan el documento por ti, así copias y pegas menos y cometes menos errores.",
        },
      ],
    },
    faq: [
      {
        question: "¿Cuánto cuesta automatizar una tarea?",
        answer: [
          `La Automatización exprés cuesta ${launchPrice("automation")}, con precio de lanzamiento para los primeros clientes. El precio final depende de la tarea y de las herramientas que uses.`,
          "Después del diagnóstico gratuito te damos un precio cerrado por escrito.",
        ],
      },
      {
        question: "¿Qué pasa en el diagnóstico gratuito de 30 minutos?",
        answer: [
          "Nos cuentas qué tarea te quita más tiempo y cómo la haces hoy. Vemos si merece la pena automatizarla y, si es así, te decimos cómo lo haríamos y cuánto costaría.",
          "Es gratis y no te obliga a contratar nada.",
        ],
      },
      {
        question: "¿Tengo que cambiar las herramientas que uso?",
        answer: [
          "Siempre que sea posible, partimos de las que ya usas, como tu email, tu hoja de cálculo o WhatsApp. Si hace falta alguna nueva, te lo decimos antes y te explicamos su coste.",
        ],
      },
      {
        question: "¿Cuánto tarda?",
        answer: [`${automationPlan.timeline}. Te confirmamos el plazo exacto en la propuesta.`],
      },
    ],
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
          "Hasta 1 hora al mes de cambios pequeños",
        ],
      },
    ],
    excludes: [
      "Secciones o funciones nuevas, que se presupuestan aparte",
      "Los cambios que superen la hora mensual incluida",
      "El coste del dominio",
    ],
    highlights: {
      title: "Qué hacemos por tu web cada mes",
      items: [
        {
          title: "Copias de seguridad",
          description: "Guardamos copias de tu web para poder recuperarla si algo sale mal.",
        },
        {
          title: "Vigilancia",
          description: "Si tu web deja de responder, nos llega un aviso y nos ponemos a revisarla.",
        },
        {
          title: "Al día y con pequeños cambios",
          description:
            "Aplicamos las actualizaciones y hacemos los cambios pequeños que nos pidas, como un horario, un precio o una foto nueva, hasta 1 hora al mes.",
        },
      ],
    },
    faq: [
      {
        question: "¿Cuánto cuesta el mantenimiento de una web?",
        answer: [
          `El Mantenimiento mensual cuesta ${launchPrice("maintenance")}, con precio de lanzamiento para los primeros clientes.`,
        ],
      },
      {
        question: "¿Necesito mantenimiento para mi web?",
        answer: [
          "Si tu web te trae clientes y no quieres ocuparte de la parte técnica, sí te conviene. Una web sin revisar puede dejar de funcionar o quedarse desactualizada sin que te des cuenta.",
        ],
      },
      {
        question: "¿Qué pasa si mi web se cae?",
        answer: [
          "La vigilancia nos avisa y lo revisamos. Si hace falta, la recuperamos a partir de una copia de seguridad.",
        ],
      },
      {
        question: "¿Cuántos cambios entran cada mes?",
        answer: [
          "Hasta 1 hora al mes de cambios pequeños, como actualizar un horario, un precio, un texto o una foto. Las horas que no uses no se acumulan.",
          "Si necesitas algo más grande, como una sección nueva, te lo presupuestamos aparte antes de hacerlo.",
        ],
      },
      {
        question: "¿Hay permanencia?",
        answer: [
          "No. Se paga mes a mes y puedes darlo de baja cuando quieras: deja de cobrarse a partir del mes siguiente.",
        ],
      },
      {
        question: "¿Podéis mantener una web que no habéis hecho vosotros?",
        answer: [
          "Sí. Antes la revisamos para ver en qué estado está. Si necesita arreglos para poder mantenerla bien, te los presupuestamos aparte.",
        ],
      },
      {
        question: "¿El dominio está incluido?",
        answer: ["No. El dominio va a tu nombre y lo pagas directamente al proveedor, para que siempre sea tuyo."],
      },
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
    highlights: {
      title: "Cómo es el diagnóstico",
      items: [
        {
          title: "Revisamos lo que tienes",
          description: "Tu web, tu ficha de Google, las herramientas que usas y cómo trabajas en el día a día.",
        },
        {
          title: "Te decimos qué mejorar primero",
          description:
            "Ordenamos las mejoras por impacto y esfuerzo, para que sepas por dónde empezar aunque no contrates nada más.",
        },
        {
          title: "Te lo dejamos por escrito",
          description: "Recibes un resumen con las recomendaciones priorizadas, para consultarlo cuando quieras.",
        },
      ],
    },
    faq: [
      {
        question: "¿Cuánto cuesta el diagnóstico digital?",
        answer: [
          `Cuesta ${launchPrice("diagnosis")} y la sesión dura 60 minutos. Si después contratas una web o una automatización, te lo descontamos.`,
        ],
      },
      {
        question: "¿En qué se diferencia del diagnóstico gratuito de la automatización?",
        answer: [
          "El diagnóstico gratuito de 30 minutos se centra en una sola tarea que quieres automatizar. El diagnóstico digital revisa todo tu negocio: web, Google, procesos, herramientas y seguridad.",
        ],
      },
      {
        question: "¿Tengo que contratar algo después?",
        answer: [
          "No. Las recomendaciones son tuyas y puedes ponerlas en marcha por tu cuenta o con quien quieras. Si prefieres que lo hagamos nosotros, te lo presupuestamos aparte.",
        ],
      },
      {
        question: "¿Qué recibo después de la sesión?",
        answer: [
          "Un resumen escrito con las recomendaciones priorizadas. Si necesitas un informe detallado, te lo presupuestamos aparte.",
        ],
      },
    ],
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
