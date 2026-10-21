import { describe, expect, it } from "vitest";
import { contactSchema, serviceOptions } from "./contact-schema";

const validPayload = {
  name: "Ana",
  email: "ana@example.com",
  phone: "+34 655 08 73 21",
  service: serviceOptions[0],
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

  it("accepts a name of 100 characters and rejects one of 101", () => {
    expect(isValid({ ...validPayload, name: "a".repeat(100) })).toBe(true);
    expect(isValid({ ...validPayload, name: "a".repeat(101) })).toBe(false);
  });

  it("rejects a name with a line break", () => {
    expect(isValid({ ...validPayload, name: "Ana\nBcc: spam@example.com" })).toBe(false);
  });

  it("rejects an email longer than 254 characters", () => {
    expect(isValid({ ...validPayload, email: `${"a".repeat(250)}@example.com` })).toBe(false);
  });

  it("accepts a message of 5000 characters and rejects one of 5001", () => {
    expect(isValid({ ...validPayload, message: "a".repeat(5000) })).toBe(true);
    expect(isValid({ ...validPayload, message: "a".repeat(5001) })).toBe(false);
  });

  it("accepts an empty service and rejects one that is not in the list", () => {
    expect(isValid({ ...validPayload, service: "" })).toBe(true);
    expect(isValid({ ...validPayload, service: "Hackeo" })).toBe(false);
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
