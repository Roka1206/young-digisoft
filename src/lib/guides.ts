import type { Guide } from "@/content/guides";

const longDate = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export const findGuide = (guides: Guide[], slug: string) => guides.find((guide) => guide.slug === slug);

export const formatGuideDate = (isoDate: string) => longDate.format(new Date(isoDate));

export const newestFirst = (guides: Guide[]) => [...guides].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

export const guidesForService = (guides: Guide[], serviceSlug: string) =>
  newestFirst(guides.filter((guide) => guide.serviceSlug === serviceSlug));
