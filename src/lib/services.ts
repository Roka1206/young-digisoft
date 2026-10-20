import type { Service } from "@/content/services";

export function findService(services: Service[], slug: string) {
  return services.find((service) => service.slug === slug);
}
