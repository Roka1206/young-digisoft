import type { Guide } from "@/content/guides";
import { llmsText } from "@/content/llms";
import { prices } from "@/content/pricing";
import type { Service } from "@/content/services";
import { contact, site } from "@/content/site";
import { formatPrice } from "./pricing";

// Follows the llms.txt proposal (llmstxt.org): title, summary quote, then linked sections.
export function buildLlmsTxt(baseUrl: string, services: Service[], guides: Guide[]) {
  const serviceLines = services.map(({ slug, headline, name, summary, plans }) => {
    const planPrices = plans.map(({ id, name }) => `${name} ${formatPrice(prices[id].launch, prices[id].unit)}`);
    return `- [${headline ?? name}](${baseUrl}/servicios/${slug}): ${summary} ${llmsText.plans}: ${planPrices.join("; ")}.`;
  });

  return [
    `# ${site.name}`,
    `> ${site.descriptor}. ${site.description}`,
    `${contact.zone}. ${llmsText.launchNote}`,
    `## ${llmsText.services}`,
    serviceLines.join("\n"),
    `## ${llmsText.guides}`,
    guides.map(({ slug, title, description }) => `- [${title}](${baseUrl}/guias/${slug}): ${description}`).join("\n"),
    `## ${llmsText.contact}`,
    [
      `- ${llmsText.email}: ${contact.email}`,
      `- ${llmsText.phone}: ${contact.phone}`,
      `- [${llmsText.form}](${baseUrl}/contacto)`,
    ].join("\n"),
    `## ${llmsText.optional}`,
    llmsText.legal.map(({ name, path }) => `- [${name}](${baseUrl}${path})`).join("\n"),
  ].join("\n\n");
}
