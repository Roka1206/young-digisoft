import { aboutPage } from "@/content/about";
import type { FaqItem } from "@/content/faq";
import type { Guide } from "@/content/guides";
import { prices } from "@/content/pricing";
import { servicePageText, type Service } from "@/content/services";
import { address, contact, expertise, founder, openingHours, site, socialLinks } from "@/content/site";
import { guideImagePath } from "./guides";
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
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: openingHours.opens,
      closes: openingHours.closes,
    },
    areaServed: spain,
    knowsAbout: expertise,
    founder: { "@type": "Person", name: founder.name, jobTitle: founder.jobTitle, sameAs: [founder.linkedin] },
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
    mainEntity: {
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.jobTitle,
      image: `${siteUrl}${aboutPage.photo.src}`,
      sameAs: [founder.linkedin],
      worksFor: { "@id": businessId },
    },
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
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    url: `${siteUrl}/guias/${guide.slug}`,
    image: `${siteUrl}${guideImagePath(guide.slug)}`,
    inLanguage: "es-ES",
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author: { "@type": "Person", name: founder.name, jobTitle: founder.jobTitle, sameAs: [founder.linkedin] },
    publisher: { "@id": businessId },
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
