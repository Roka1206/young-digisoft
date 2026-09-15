import { Resend } from "resend";

let client: Resend | null = null;

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY no está configurada");
  }
  if (!client) {
    client = new Resend(apiKey);
  }
  return client;
}
