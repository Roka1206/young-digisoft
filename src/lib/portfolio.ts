import type { PortfolioCase } from "@/content/portfolio";

export function getPublishedCases(cases: PortfolioCase[]) {
  return cases.filter((item) => item.publishPermission);
}
