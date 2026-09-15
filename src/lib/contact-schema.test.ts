import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact-schema";

const validPayload = {
  name: "Ana",
  email: "ana@example.com",
  phone: "+34 655 08 73 21",
  service: "Creación de páginas web",
  message: "Necesito una web nueva para mi negocio, ¿me pueden ayudar?",
};

describe("contactSchema", () => {
  it("accepts a fully valid payload", () => {
    expect(contactSchema.safeParse(validPayload).success).toBe(true);
  });

  it("accepts a payload without the optional fields", () => {
    const required = {
      name: validPayload.name,
      email: validPayload.email,
      message: validPayload.message,
    };
    expect(contactSchema.safeParse(required).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = contactSchema.safeParse({ ...validPayload, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a message that is too short", () => {
    const result = contactSchema.safeParse({ ...validPayload, message: "Hola" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid phone format", () => {
    const result = contactSchema.safeParse({ ...validPayload, phone: "abc" });
    expect(result.success).toBe(false);
  });
});
