import { prices } from "@/content/pricing";
import type { Plan, Service } from "@/content/services";

export function findService(services: Service[], slug: string) {
  return services.find((service) => service.slug === slug);
}

// Splits every plan into one-off projects and the rest (monthly fees and hourly consulting), keeping their order.
export function plansByBilling(services: Service[]) {
  const plans = services.flatMap((service) => service.plans.map((plan) => ({ service, plan })));
  const isOneOff = ({ plan }: { plan: Plan }) => prices[plan.id].unit === "oneOff";
  return { oneOff: plans.filter(isOneOff), recurring: plans.filter((entry) => !isOneOff(entry)) };
}
