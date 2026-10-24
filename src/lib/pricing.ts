import { priceText, type Price } from "@/content/pricing";

const euros = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
  useGrouping: "always",
});

export function formatPrice({ from }: Price["launch"], unit: Price["unit"]) {
  const prefix = unit === "hourly" ? "" : `${priceText.from} `;
  return `${prefix}${euros.format(from)}${priceText.units[unit]}`;
}

export function hasLaunchDiscount({ launch, regular }: Price) {
  return launch.from < regular.from;
}

// Short summary for schema.org priceRange: the cheapest monthly plan and the cheapest project, at launch prices.
export function priceRangeSummary(prices: Price[]) {
  const cheapest = (unit: Price["unit"]) =>
    Math.min(...prices.filter((p) => p.unit === unit).map((p) => p.launch.from));
  const monthly = formatPrice({ from: cheapest("monthly") }, "monthly");
  const project = formatPrice({ from: cheapest("oneOff") }, "oneOff");
  return `${monthly} · ${project} ${priceText.perProject} (${priceText.vatIncluded})`;
}
