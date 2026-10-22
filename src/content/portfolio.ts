// Real cases only, added with the client's written permission (CLAUDE.md, golden rule 1).
// result is optional: only a verifiable outcome, never an invented figure.
export type PortfolioCase = {
  name: string;
  sector: string;
  summary: string;
  technologies: string[];
  result?: string;
  url?: string;
  publishPermission: boolean;
};

export const portfolio: PortfolioCase[] = [
  {
    name: "Vibework",
    sector: "Comercio electrónico B2B",
    summary:
      "Tienda online de ropa, implementos y accesorios para empresas de todos los sectores. La creamos desde cero: la web y sus redes sociales.",
    technologies: [],
    // url pending: the site is down; add https://vibework.es once it is back online.
    publishPermission: true,
  },
  {
    name: "Young Energy Sada",
    sector: "Tienda de snacks y golosinas · negocio familiar",
    summary:
      "Web de la tienda en Sada: categorías de productos, galería de fotos, horario y cómo llegar con Google Maps. Hecha con WordPress. Además, gestionamos sus redes sociales.",
    technologies: ["WordPress"],
    url: "https://youngenergysada.es/",
    publishPermission: true,
  },
  {
    name: "Pedidos por WhatsApp con stock automático",
    sector: "Taller mecánico, tienda de ropa y restaurante · clientes anónimos",
    summary:
      "Antes, los pedidos llegaban por teléfono y había que apuntarlos a mano. Ahora llegan por WhatsApp y, con IA y una integración programada a medida, entran solos en el stock del negocio.",
    technologies: ["WhatsApp", "IA"],
    publishPermission: true,
  },
];
