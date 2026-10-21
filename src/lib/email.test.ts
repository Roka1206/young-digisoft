import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendContactEmail } from "./email";

const send = vi.hoisted(() => vi.fn());

vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

const from = "Young Digisoft <info@youngdigisoft.es>";
const to = "info@youngdigisoft.es";

const values = {
  name: "Ana",
  email: "ana@example.com",
  message: "Quiero una web para mi negocio.",
  consent: true as const,
};

describe("sendContactEmail", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_FROM_EMAIL", from);
    vi.stubEnv("CONTACT_TO_EMAIL", to);
    send.mockResolvedValue({ data: { id: "1" }, error: null });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    send.mockReset();
  });

  it("sends from and to the configured addresses with the visitor as reply-to", async () => {
    await sendContactEmail(values);
    expect(send).toHaveBeenCalledWith({
      from,
      to,
      replyTo: values.email,
      subject: "Nuevo contacto de Ana",
      text: `Nombre: Ana\nEmail: ana@example.com\n\n${values.message}`,
    });
  });

  it("includes the optional phone and service when given", async () => {
    await sendContactEmail({ ...values, phone: "655087321", service: "Web profesional" });
    const { text } = send.mock.calls[0][0];
    expect(text).toContain("Teléfono: 655087321");
    expect(text).toContain("Servicio de interés: Web profesional");
  });

  it("throws when Resend reports an error", async () => {
    send.mockResolvedValue({ data: null, error: { message: "domain not verified" } });
    await expect(sendContactEmail(values)).rejects.toThrow("domain not verified");
  });

  it.each(["RESEND_API_KEY", "CONTACT_FROM_EMAIL", "CONTACT_TO_EMAIL"])(
    "throws without sending when %s is missing",
    async (name) => {
      vi.stubEnv(name, "");
      await expect(sendContactEmail(values)).rejects.toThrow(name);
      expect(send).not.toHaveBeenCalled();
    },
  );
});
