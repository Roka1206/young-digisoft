import { Code2, Compass, Handshake, MapPin, Receipt, Repeat, Search, type LucideIcon } from "lucide-react";

type Feature = { title: string; description: string; icon: LucideIcon };

export const hero = {
  badge: ">_ Webs · Automatización · Consultoría",
  primaryCta: "Hablemos de tu negocio",
  secondaryCta: "Reserva un diagnóstico",
};

export const problems: { title: string; description: string; items: Feature[] } = {
  title: "Problemas que resolvemos",
  description: "Si te suena alguno, podemos ayudarte.",
  items: [
    {
      title: "«No me encuentran en Google»",
      description:
        "Si tu negocio no aparece cuando alguien busca lo que vendes, ese cliente acaba en la competencia. Te hacemos una web rápida y tu ficha de Google para que te encuentren.",
      icon: Search,
    },
    {
      title: "«Pierdo tiempo con tareas repetitivas»",
      description:
        "Copiar datos, contestar siempre lo mismo, preparar presupuestos a mano… Automatizamos esas tareas para que dediques ese tiempo a tu negocio.",
      icon: Repeat,
    },
    {
      title: "«No sé qué herramientas necesito»",
      description:
        "En una sesión revisamos cómo trabajas y te damos una lista clara de qué mejorar primero y con qué herramientas.",
      icon: Compass,
    },
  ],
};

export const offers = {
  title: "Qué hacemos y cuánto cuesta",
  description: "Precios cerrados: antes de empezar te confirmamos por escrito el importe exacto de tu proyecto.",
  launchNote: "a cambio de",
  detailsLink: "Ver detalles",
};

export const howWeWork = {
  title: "Cómo trabajamos",
  description: "Cuatro pasos, sin letra pequeña.",
  steps: [
    {
      title: "Hablamos",
      description: "Nos cuentas qué necesitas por WhatsApp, por teléfono o en persona. Sin compromiso.",
    },
    {
      title: "Te enviamos una propuesta",
      description: "Por escrito, con precio cerrado, plazo y todo lo que incluye.",
    },
    {
      title: "Lo construimos y lo revisas",
      description: "Te enseñamos los avances y ajustamos lo necesario antes de publicar.",
    },
    {
      title: "Lo publicamos y seguimos contigo",
      description: "Lo ponemos en marcha y te explicamos cómo usarlo. El soporte posterior queda por escrito en el contrato.",
    },
  ],
};

export const whyUs: { title: string; items: Feature[] } = {
  title: "Por qué Young Digisoft",
  items: [
    {
      title: "Ingeniería de software real",
      description: "Hacemos tu web con código propio, a medida, sin plantillas pesadas que la vuelven lenta.",
      icon: Code2,
    },
    {
      title: "Precio cerrado",
      description: "Sabes lo que vas a pagar antes de empezar. Sin sorpresas en la factura.",
      icon: Receipt,
    },
    {
      title: "Trato directo",
      description: "Hablas siempre con quien hace el trabajo, sin intermediarios.",
      icon: Handshake,
    },
    {
      title: "En toda España",
      description: "Tenemos la sede en A Coruña y trabajamos con negocios de toda España.",
      icon: MapPin,
    },
  ],
};

export const portfolioSection = {
  title: "Trabajos realizados",
  description: "Proyectos reales, publicados con permiso de cada cliente.",
};

export const faqSection = {
  title: "Preguntas frecuentes",
};

export const closing = {
  title: "¿Empezamos?",
  description: "Cuéntanos tu idea y te preparamos una propuesta con precio cerrado, sin compromiso.",
  whatsappCta: "Escríbenos por WhatsApp",
};
