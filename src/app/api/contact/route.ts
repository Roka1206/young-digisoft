import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { getResendClient } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, phone, service, message } = parsed.data;
  const to = process.env.CONTACT_TO_EMAIL ?? "1206roka@gmail.com";

  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: "Young Digisoft <onboarding@resend.dev>",
      to,
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
        .filter(Boolean)
        .join("\n"),
    });
  } catch (error) {
    console.error("Error enviando email de contacto", error);
    return NextResponse.json({ error: "No se pudo enviar el mensaje" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
