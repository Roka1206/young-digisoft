import { describe, expect, it } from "vitest";
import { whatsappUrl } from "./whatsapp";

describe("whatsappUrl", () => {
  it("builds a wa.me link with the phone number", () => {
    expect(whatsappUrl("34600000000", "Hola")).toBe("https://wa.me/34600000000?text=Hola");
  });

  it("encodes spaces, accents and punctuation in the message", () => {
    expect(whatsappUrl("34600000000", "¿Diagnóstico? Sí")).toBe(
      "https://wa.me/34600000000?text=%C2%BFDiagn%C3%B3stico%3F%20S%C3%AD"
    );
  });
});
