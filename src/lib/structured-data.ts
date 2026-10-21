import type { FaqItem } from "@/content/faq";
import { prices } from "@/content/pricing";
import type { Service } from "@/content/services";
import { contact, site, socialLinks } from "@/content/site";
import { siteUrl } from "./site-url";

const businessId = `${siteUrl}/#business`;
const spain = { "@type": "Country", name: "España" };
const unitCodes = { oneOff: undefined, monthly: "MON", hourly: "HUR" };

export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": businessId,
    name: site.name,
    description: site.description,
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    image: `${siteUrl}/opengraph-image`,
    telephone: contact.phoneHref.replace("tel:", ""),
    email: contact.email,
    address: { "@type": "PostalAddress", addressRegion: "A Coruña", addressCountry: "ES" },
    areaServed: spain,
    sameAs: socialLinks.map((link) => link.href).filter((href) => !href.startsWith("https://wa.me")),
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    url: `${siteUrl}/servicios/${service.slug}`,
    provider: { "@id": businessId },
    areaServed: spain,
    offers: service.plans.map((plan) => {
      const { unit, launch } = prices[plan.id];
      return {
        "@type": "Offer",
        name: plan.name,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          minPrice: launch.from,
          priceCurrency: "EUR",
          unitCode: unitCodes[unit],
        },
      };
    }),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer.join(" ") },
    })),
  };
}

// Escapes "<" so content can never close the <script> tag (Next.js JSON-LD guide).
export const serializeJsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");
