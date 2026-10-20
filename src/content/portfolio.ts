// Real cases only, added with the client's written permission (CLAUDE.md, golden rule 1).
export type PortfolioCase = {
  name: string;
  sector: string;
  summary: string;
  technologies: string[];
  result: string;
  url?: string;
  publishPermission: boolean;
};

export const portfolio: PortfolioCase[] = [];
