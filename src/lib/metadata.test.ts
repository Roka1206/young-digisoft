import { describe, expect, it } from "vitest";
import { pageMetadata } from "./metadata";

describe("pageMetadata", () => {
  const metadata = pageMetadata({ title: "Contacto", description: "Escríbenos.", path: "/contacto" });

  it("sets the page title, description and canonical path", () => {
    expect(metadata).toMatchObject({
      title: "Contacto",
      description: "Escríbenos.",
      alternates: { canonical: "/contacto" },
    });
  });

  it("gives the page its own Open Graph preview with the shared site fields", () => {
    expect(metadata.openGraph).toMatchObject({
      siteName: "Young Digisoft",
      locale: "es_ES",
      type: "website",
      title: "Contacto — Young Digisoft",
      description: "Escríbenos.",
      url: "/contacto",
    });
  });

  it("gives the page its own Twitter card", () => {
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Contacto — Young Digisoft",
      description: "Escríbenos.",
    });
  });

  it("includes the brand image in both previews", () => {
    const image = { url: "/opengraph-image", width: 1200, height: 630 };
    expect(metadata.openGraph?.images).toEqual([expect.objectContaining(image)]);
    expect(metadata.twitter?.images).toEqual([expect.objectContaining(image)]);
  });
});
