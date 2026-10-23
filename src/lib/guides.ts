import type { Guide } from "@/content/guides";

const longDate = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export const guideImagePath = (slug: string) => `/guias/${slug}/opengraph-image`;

export const findGuide = (guides: Guide[], slug: string) => guides.find((guide) => guide.slug === slug);

export const formatGuideDate = (isoDate: string) => longDate.format(new Date(isoDate));

export const newestFirst = (guides: Guide[]) => [...guides].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

// Other guides of the same service first, then the rest, newest first within each group.
export const relatedGuides = (guides: Guide[], current: Guide, limit = 2) =>
  newestFirst(guides.filter((guide) => guide.slug !== current.slug))
    .sort((a, b) => Number(b.serviceSlug === current.serviceSlug) - Number(a.serviceSlug === current.serviceSlug))
    .slice(0, limit);

export const guidesForService = (guides: Guide[], serviceSlug: string) =>
  newestFirst(guides.filter((guide) => guide.serviceSlug === serviceSlug));
