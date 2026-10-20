import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { contact } from "@/content/site";
import { sendContactEmail } from "./email";

const send = vi.hoisted(() => vi.fn());

vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

const values = {
  name: "Ana",
  email: "ana@example.com",
  message: "Quiero una web para mi negocio.",
  consent: true as const,
};

describe("sendContactEmail", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_TO_EMAIL", "");
    vi.stubEnv("CONTACT_FROM_EMAIL", "");
    send.mockResolvedValue({ data: { id: "1" }, error: null });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    send.mockReset();
  });

  it("sends the message to the public email with the visitor as reply-to", async () => {
    await sendContactEmail(values);
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: contact.email,
        replyTo: values.email,
        subject: "Nuevo contacto de Ana",
        text: `Nombre: Ana\nEmail: ana@example.com\n\n${values.message}`,
      })
    );
  });

  it("includes the optional phone and service when given", async () => {
    await sendContactEmail({ ...values, phone: "655087321", service: "Web profesional" });
    const { text } = send.mock.calls[0][0];
    expect(text).toContain("Teléfono: 655087321");
    expect(text).toContain("Servicio de interés: Web profesional");
  });

  it("uses the sender and recipient from the environment when set", async () => {
    vi.stubEnv("CONTACT_TO_EMAIL", "to@example.com");
    vi.stubEnv("CONTACT_FROM_EMAIL", "Web <web@example.com>");
    await sendContactEmail(values);
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({ to: "to@example.com", from: "Web <web@example.com>" })
    );
  });

  it("throws when Resend reports an error", async () => {
    send.mockResolvedValue({ data: null, error: { message: "domain not verified" } });
    await expect(sendContactEmail(values)).rejects.toThrow("domain not verified");
  });

  it("throws when the API key is missing", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    await expect(sendContactEmail(values)).rejects.toThrow("RESEND_API_KEY");
    expect(send).not.toHaveBeenCalled();
  });
});
