import { aboutPage } from "@/content/about";
import type { FaqItem } from "@/content/faq";
import type { Guide } from "@/content/guides";
import { prices } from "@/content/pricing";
import type { PortfolioCase } from "@/content/portfolio";
import { servicePageText, type Service } from "@/content/services";
import { address, contact, expertise, founder, fullAddress, openingHours, site, socialLinks } from "@/content/site";
import { guideImagePath } from "./guides";
import { priceRangeSummary } from "./pricing";
import { siteUrl } from "./site-url";

const businessId = `${siteUrl}/#business`;
// One Person entity for the founder, shared by the business, the about page and every guide.
const founderPerson = {
  "@type": "Person",
  "@id": `${siteUrl}${aboutPage.path}#founder`,
  name: founder.name,
  jobTitle: founder.jobTitle,
  sameAs: [founder.linkedin],
};
const spain = { "@type": "Country", name: "España" };
const unitCodes = { oneOff: undefined, monthly: "MON", hourly: "HUR" };

export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": businessId,
    name: site.name,
    slogan: site.slogan,
    description: site.description,
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    image: `${siteUrl}/opengraph-image`,
    telephone: contact.phoneHref.replace("tel:", ""),
    email: contact.email,
    foundingDate: site.foundingDate,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      postalCode: address.postalCode,
      addressLocality: address.locality,
      addressRegion: address.region,
      addressCountry: "ES",
    },
    priceRange: priceRangeSummary(Object.values(prices)),
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: openingHours.opens,
      closes: openingHours.closes,
    },
    areaServed: [spain, { "@type": "AdministrativeArea", name: address.region }],
    knowsAbout: expertise,
    founder: founderPerson,
    sameAs: socialLinks.map((link) => link.href).filter((href) => !href.startsWith("https://wa.me")),
  };
}

// Google takes the site name shown in results from this, on the home page.
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: site.name,
    url: siteUrl,
    inLanguage: "es-ES",
    publisher: { "@id": businessId },
  };
}

export function aboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${siteUrl}${aboutPage.path}`,
    name: aboutPage.title,
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: { ...founderPerson, image: `${siteUrl}${aboutPage.photo.src}`, worksFor: { "@id": businessId } },
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
          valueAddedTaxIncluded: true,
          unitCode: unitCodes[unit],
        },
      };
    }),
  };
}

export function articleJsonLd(guide: Guide) {
  const url = `${siteUrl}/guias/${guide.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    url,
    mainEntityOfPage: url,
    image: `${siteUrl}${guideImagePath(guide.slug)}`,
    inLanguage: "es-ES",
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author: founderPerson,
    publisher: { "@id": businessId },
  };
}

// Published portfolio cases as works made by the business.
export function portfolioJsonLd(cases: PortfolioCase[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: cases.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: item.name,
        description: item.summary,
        genre: item.sector,
        url: item.url,
        image: item.image && `${siteUrl}${item.image.src}`,
        creator: { "@id": businessId },
      },
    })),
  };
}

// Every trail starts at the home page, so callers pass only the steps after it.
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: servicePageText.breadcrumbHome, path: "/" }, ...items].map((item, index) => ({
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
