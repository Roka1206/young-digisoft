import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact-schema";

const validPayload = {
  name: "Ana",
  email: "ana@example.com",
  phone: "+34 655 08 73 21",
  service: "Web profesional",
  message: "Necesito una web nueva para mi negocio, ¿me pueden ayudar?",
  consent: true,
};

const isValid = (payload: object) => contactSchema.safeParse(payload).success;

describe("contactSchema", () => {
  it("accepts a fully valid payload", () => {
    expect(isValid(validPayload)).toBe(true);
  });

  it("accepts a payload without the optional fields", () => {
    const { name, email, message, consent } = validPayload;
    expect(isValid({ name, email, message, consent })).toBe(true);
  });

  it("rejects a name that is too short", () => {
    expect(isValid({ ...validPayload, name: "A" })).toBe(false);
  });

  it("rejects an invalid email", () => {
    expect(isValid({ ...validPayload, email: "not-an-email" })).toBe(false);
  });

  it("rejects a message that is too short", () => {
    expect(isValid({ ...validPayload, message: "Hola" })).toBe(false);
  });

  it("rejects an invalid phone format", () => {
    expect(isValid({ ...validPayload, phone: "abc" })).toBe(false);
  });

  it("rejects an unchecked consent", () => {
    expect(isValid({ ...validPayload, consent: false })).toBe(false);
  });

  it("rejects a missing consent", () => {
    expect(isValid({ ...validPayload, consent: undefined })).toBe(false);
  });

  it("keeps a filled honeypot so the route can drop the message", () => {
    const result = contactSchema.safeParse({ ...validPayload, website: "spam.example" });
    expect(result.data?.website).toBe("spam.example");
  });
});
