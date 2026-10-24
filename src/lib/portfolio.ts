import type { PortfolioCase } from "@/content/portfolio";

// Cases with a screenshot go first, since the page shows them full width; the rest keep their order.
export function getPublishedCases(cases: PortfolioCase[]) {
  return cases.filter((item) => item.publishPermission).sort((a, b) => Number(!!b.image) - Number(!!a.image));
}
