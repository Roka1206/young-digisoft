// Each guide's body lives in src/content/guides/<slug>.mdx; dates are ISO (YYYY-MM-DD).
export type Guide = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  serviceSlug: string;
};

export const guides: Guide[] = [
  {
    slug: "cuanto-cuesta-una-pagina-web",
    title: "¿Cuánto cuesta una página web para un pequeño negocio?",
    description:
      "Qué hace subir o bajar el precio de una web, qué debería incluir, qué se paga aparte y qué preguntar antes de contratar, con nuestros precios como referencia.",
    publishedAt: "2026-10-21",
    updatedAt: "2026-10-21",
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
};
