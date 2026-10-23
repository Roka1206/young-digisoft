// Single source for every amount shown on the site (CLAUDE.md, section 2).
export type PlanId = "webEssential" | "webPro" | "automation" | "maintenance" | "socialMedia" | "diagnosis";

type PriceRange = { from: number; to?: number };

export type Price = {
  unit: "oneOff" | "monthly" | "hourly";
  launch: PriceRange;
  regular: PriceRange;
};

export const prices: Record<PlanId, Price> = {
  webEssential: { unit: "oneOff", launch: { from: 590 }, regular: { from: 990 } },
  webPro: { unit: "oneOff", launch: { from: 990 }, regular: { from: 1400, to: 1800 } },
  automation: { unit: "oneOff", launch: { from: 400, to: 600 }, regular: { from: 600, to: 1200 } },
  maintenance: { unit: "monthly", launch: { from: 39, to: 49 }, regular: { from: 59, to: 89 } },
  socialMedia: { unit: "monthly", launch: { from: 79 }, regular: { from: 139 } },
  diagnosis: { unit: "hourly", launch: { from: 60 }, regular: { from: 60 } },
};

export const launchOffer = {
  audience: "para los primeros 3 a 5 clientes",
  endsOn: "el 31 de enero de 2027",
  conditions: [
    "un testimonio verificable con tu nombre",
    "permiso para mostrar el trabajo en nuestro portfolio",
  ],
};

export const priceText = {
  from: "desde",
  units: { oneOff: "", monthly: "/mes", hourly: "/hora" },
  launch: "Precio de lanzamiento",
  regular: "Precio normal",
  vatIncluded: "IVA incluido",
  until: "Hasta",
  timeline: "Plazo estimado",
};
