import { Resend } from "resend";
import type { ContactFormValues } from "./contact-schema";

let client: Resend | null = null;

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} no está configurada`);
  }
  return value;
}

function getResendClient() {
  const apiKey = requiredEnv("RESEND_API_KEY");
  if (!client) {
    client = new Resend(apiKey);
  }
  return client;
}

export async function sendContactEmail({ name, email, phone, service, message }: ContactFormValues) {
  const { error } = await getResendClient().emails.send({
    from: requiredEnv("CONTACT_FROM_EMAIL"),
    to: requiredEnv("CONTACT_TO_EMAIL"),
    replyTo: email,
    subject: `Nuevo contacto de ${name}`,
    text: [
      `Nombre: ${name}`,
      `Email: ${email}`,
      phone ? `Teléfono: ${phone}` : null,
      service ? `Servicio de interés: ${service}` : null,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n"),
  });
  if (error) throw new Error(error.message);
}
