import { describe, expect, it } from "vitest";
import { faq } from "@/content/faq";
import { guides } from "@/content/guides";
import { services } from "@/content/services";
import {
  aboutPageJsonLd,
  articleJsonLd,
  breadcrumbJsonLd,
  businessJsonLd,
  faqJsonLd,
  serializeJsonLd,
  serviceJsonLd,
  websiteJsonLd,
} from "./structured-data";

const [webService] = services;
const maintenance = services.find((service) => service.slug === "mantenimiento")!;

describe("businessJsonLd", () => {
  const business = businessJsonLd();

  it("describes a professional service serving all of Spain", () => {
    expect(business).toMatchObject({
      "@type": "ProfessionalService",
      name: "Young Digisoft",
      url: "https://youngdigisoft.es",
      telephone: "+34655087321",
      email: "info@youngdigisoft.es",
      areaServed: { "@type": "Country", name: "España" },
    });
  });

  it("gives the full address, founding date and daily opening hours", () => {
    expect(business).toMatchObject({
      foundingDate: "2026-06-23",
      address: { streetAddress: "Rúa Linares Rivas 9 bajo", postalCode: "15160", addressLocality: "Sada" },
      openingHoursSpecification: { opens: "09:00", closes: "21:00" },
    });
    expect(business.openingHoursSpecification.dayOfWeek).toHaveLength(7);
  });

  it("names the founder with his LinkedIn profile, the slogan and the areas of expertise", () => {
    expect(business).toMatchObject({
      slogan: "Tecnología que trabaja para tu negocio.",
      founder: {
        "@type": "Person",
        name: "Ronald Fonseca",
        jobTitle: "Ingeniero de software",
        sameAs: ["https://www.linkedin.com/in/rfonsecah92"],
      },
    });
    expect(business.knowsAbout).toContain("Automatización de procesos");
  });

  it("lists only social profiles, not the WhatsApp chat link", () => {
    expect(business.sameAs).toEqual([
      "https://www.instagram.com/youngdigisoft/",
      "https://www.linkedin.com/company/youngdigisoft",
    ]);
  });
});

describe("websiteJsonLd", () => {
  it("names the site Young Digisoft on its own domain, published by the business", () => {
    expect(websiteJsonLd()).toMatchObject({
      "@type": "WebSite",
      name: "Young Digisoft",
      url: "https://youngdigisoft.es",
      publisher: { "@id": "https://youngdigisoft.es/#business" },
    });
  });
});

describe("aboutPageJsonLd", () => {
  it("presents the founder with his photo, LinkedIn and the business he runs", () => {
    expect(aboutPageJsonLd()).toMatchObject({
      "@type": "AboutPage",
      url: "https://youngdigisoft.es/sobre-nosotros",
      mainEntity: {
        "@type": "Person",
        name: "Ronald Fonseca",
        image: "https://youngdigisoft.es/images/ronald.jpg",
        sameAs: ["https://www.linkedin.com/in/rfonsecah92"],
        worksFor: { "@id": "https://youngdigisoft.es/#business" },
      },
    });
  });
});

describe("serviceJsonLd", () => {
  it("links the service to the business and its own page", () => {
    expect(serviceJsonLd(webService)).toMatchObject({
      "@type": "Service",
      name: webService.name,
      url: "https://youngdigisoft.es/servicios/web",
      provider: { "@id": "https://youngdigisoft.es/#business" },
    });
  });

  it("publishes one 'from' price per plan, matching the pricing file", () => {
    expect(serviceJsonLd(webService).offers.map((offer) => offer.priceSpecification.minPrice)).toEqual([590, 990]);
  });

  it("states that prices include VAT", () => {
    expect(serviceJsonLd(webService).offers.every((offer) => offer.priceSpecification.valueAddedTaxIncluded)).toBe(
      true,
    );
  });

  it("marks recurring prices with their unit", () => {
    expect(serviceJsonLd(maintenance).offers[0].priceSpecification.unitCode).toBe("MON");
  });
});

describe("articleJsonLd", () => {
  it("credits the founder as author and the business as publisher, with real dates", () => {
    const [guide] = guides;
    expect(articleJsonLd(guide)).toMatchObject({
      "@type": "Article",
      headline: guide.title,
      image: `https://youngdigisoft.es/guias/${guide.slug}/opengraph-image`,
      url: `https://youngdigisoft.es/guias/${guide.slug}`,
      datePublished: guide.publishedAt,
      dateModified: guide.updatedAt,
      author: { "@type": "Person", name: "Ronald Fonseca" },
      publisher: { "@id": "https://youngdigisoft.es/#business" },
    });
  });
});

describe("breadcrumbJsonLd", () => {
  it("starts at the home page, numbers each step from 1 and turns paths into absolute URLs", () => {
    expect(breadcrumbJsonLd([{ name: "Diseño web", path: "/servicios/web" }])).toEqual({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://youngdigisoft.es/" },
        { "@type": "ListItem", position: 2, name: "Diseño web", item: "https://youngdigisoft.es/servicios/web" },
      ],
    });
  });
});

describe("faqJsonLd", () => {
  it("turns every question into a question with its full answer", () => {
    const { mainEntity } = faqJsonLd(faq);
    expect(mainEntity).toHaveLength(faq.length);
    expect(mainEntity[0]).toEqual({
      "@type": "Question",
      name: faq[0].question,
      acceptedAnswer: { "@type": "Answer", text: faq[0].answer.join(" ") },
    });
  });
});

describe("serializeJsonLd", () => {
  it("escapes '<' so the data cannot close the script tag", () => {
    expect(serializeJsonLd({ text: "</script><script>alert(1)" })).not.toContain("<");
  });
});
