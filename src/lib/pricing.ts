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
