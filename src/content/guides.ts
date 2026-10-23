// Each guide's body lives in src/content/guides/<slug>.mdx; dates are ISO (YYYY-MM-DD).
export type Guide = {
  slug: string;
  title: string;
  // Shorter title for Google: with the brand suffix it must fit in 60 characters.
  metaTitle: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  serviceSlug: string;
};

export const guides: Guide[] = [
  {
    slug: "citas-automaticas-por-whatsapp",
    title: "Cómo automatizar las citas de tu negocio con WhatsApp",
    metaTitle: "Citas automáticas por WhatsApp, paso a paso",
    description:
      "Reserva online, confirmación y recordatorio sin mensajes de ida y vuelta: qué puedes hacer gratis con WhatsApp Business, cuándo hace falta la API y cómo empezar.",
    publishedAt: "2026-10-23",
    updatedAt: "2026-10-23",
    serviceSlug: "automatizacion",
  },
  {
    slug: "como-conseguir-resenas-en-google",
    title: "Cómo conseguir reseñas en Google sin saltarte las normas",
    metaTitle: "Cómo conseguir reseñas en Google",
    description:
      "Cuándo y cómo pedir reseñas a tus clientes, cómo responder a las buenas y a las malas, qué prohíbe Google y cómo conseguir que pedirlas no dependa de tu memoria.",
    publishedAt: "2026-10-23",
    updatedAt: "2026-10-23",
    serviceSlug: "web",
  },
  {
    slug: "redes-sociales-para-pequenos-negocios",
    title: "Redes sociales para un pequeño negocio: qué publicar y cada cuánto",
    metaTitle: "Redes sociales para un pequeño negocio",
    description:
      "Para qué sirven las redes en un negocio local, en cuáles estar, qué publicar, cada cuánto y qué errores evitar, con ideas que puedes aplicar desde esta semana.",
    publishedAt: "2026-10-22",
    updatedAt: "2026-10-22",
    serviceSlug: "redes-sociales",
  },
  {
    slug: "web-a-medida-wordpress-o-wix",
    title: "Web a medida, WordPress o Wix: qué le conviene a tu negocio",
    metaTitle: "Web a medida, WordPress o Wix",
    description:
      "Ventajas e inconvenientes de hacer tu web con un constructor como Wix, con WordPress o programada a medida, y cuatro preguntas para elegir sin equivocarte.",
    publishedAt: "2026-10-22",
    updatedAt: "2026-10-22",
    serviceSlug: "web",
  },
  {
    slug: "que-incluye-el-mantenimiento-web",
    title: "Qué incluye el mantenimiento de una web y cuándo lo necesitas",
    metaTitle: "Mantenimiento web: precio y qué incluye",
    description:
      "Qué incluye el mantenimiento de una web, qué no, cuánto cuesta mantenerla al año, cuándo te conviene y qué preguntar antes de contratarlo.",
    publishedAt: "2026-10-22",
    updatedAt: "2026-10-23",
    serviceSlug: "mantenimiento",
  },
  {
    slug: "como-aparecer-en-google-maps",
    title: "Cómo aparecer en Google Maps con tu negocio, paso a paso",
    metaTitle: "Cómo aparecer en Google Maps, paso a paso",
    description:
      "Crea y completa tu ficha de Google Business Profile: categoría, zona, verificación, fotos y reseñas, sin trucos que te puedan costar la ficha y sin pagar nada.",
    publishedAt: "2026-10-22",
    updatedAt: "2026-10-22",
    serviceSlug: "web",
  },
  {
    slug: "tareas-que-puede-automatizar-un-pequeno-negocio",
    title: "5 tareas que un pequeño negocio puede automatizar",
    metaTitle: "5 tareas que tu negocio puede automatizar",
    description:
      "Contactos, citas, presupuestos, facturas y reseñas: cinco tareas que puedes dejar de hacer a mano, cómo elegir por cuál empezar y qué tener en cuenta antes.",
    publishedAt: "2026-10-22",
    updatedAt: "2026-10-22",
    serviceSlug: "automatizacion",
  },
  {
    slug: "cuanto-cuesta-una-pagina-web",
    title: "¿Cuánto cuesta una página web para un pequeño negocio?",
    metaTitle: "¿Cuánto cuesta una web para un negocio?",
    description:
      "Qué hace subir o bajar el precio de una web, qué debería incluir, qué se paga aparte y qué preguntar antes de contratar, con nuestros precios como referencia.",
    publishedAt: "2026-10-21",
    updatedAt: "2026-10-23",
    serviceSlug: "web",
  },
];

export const guidesPageText = {
  metaTitle: "Guías para pymes y autónomos",
  title: "Guías para tu negocio",
  description:
    "Respuestas claras a las dudas más habituales sobre webs, Google y automatización, para que decidas con información y sin letra pequeña.",
  breadcrumb: "Guías",
  updated: "Actualizada el",
  readGuide: "Leer la guía",
  relatedService: "Servicio relacionado",
  by: "Por",
  relatedGuides: "Sigue leyendo",
};
