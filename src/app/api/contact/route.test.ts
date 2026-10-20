import { afterEach, describe, expect, it, vi } from "vitest";
import { sendContactEmail } from "@/lib/email";
import { POST } from "./route";

vi.mock("@/lib/email", () => ({ sendContactEmail: vi.fn() }));

const validPayload = {
  name: "Ana",
  email: "ana@example.com",
  message: "Quiero una web para mi negocio.",
  consent: true,
};

let ipCounter = 0;
const post = (body: unknown, ip = `10.0.0.${++ipCounter}`) =>
  POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "x-forwarded-for": ip },
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
  );

describe("POST /api/contact", () => {
  afterEach(() => {
    vi.mocked(sendContactEmail).mockReset();
  });

  it("sends the email and answers ok for a valid payload", async () => {
    const response = await post(validPayload);
    expect(response.status).toBe(200);
    expect(sendContactEmail).toHaveBeenCalledWith(validPayload);
  });

  it("rejects invalid fields without sending", async () => {
    const response = await post({ ...validPayload, email: "not-an-email" });
    expect(response.status).toBe(400);
    expect((await response.json()).issues.email).toBeDefined();
    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it("rejects a body that is not JSON", async () => {
    expect((await post("{not json")).status).toBe(400);
  });

  it("rejects a payload without consent", async () => {
    const response = await post({ ...validPayload, consent: false });
    expect(response.status).toBe(400);
    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it("answers ok but sends nothing when the honeypot is filled", async () => {
    const response = await post({ ...validPayload, website: "spam.example" });
    expect(response.status).toBe(200);
    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it("blocks the sixth request from the same IP within the window", async () => {
    const statuses = [];
    for (let i = 0; i < 6; i++) statuses.push((await post(validPayload, "192.168.1.1")).status);
    expect(statuses).toEqual([200, 200, 200, 200, 200, 429]);
    expect(sendContactEmail).toHaveBeenCalledTimes(5);
  });

  it("answers 502 when the email service fails", async () => {
    vi.mocked(sendContactEmail).mockRejectedValue(new Error("down"));
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect((await post(validPayload)).status).toBe(502);
  });
});
