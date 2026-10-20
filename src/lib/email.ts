import { Resend } from "resend";
import { contact } from "@/content/site";
import type { ContactFormValues } from "./contact-schema";

const defaultFrom = "Young Digisoft <onboarding@resend.dev>";

let client: Resend | null = null;

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY no está configurada");
  }
  if (!client) {
    client = new Resend(apiKey);
  }
  return client;
}

export async function sendContactEmail({ name, email, phone, service, message }: ContactFormValues) {
  const { error } = await getResendClient().emails.send({
    from: process.env.CONTACT_FROM_EMAIL || defaultFrom,
    to: process.env.CONTACT_TO_EMAIL || contact.email,
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
