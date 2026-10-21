import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { sendContactEmail } from "@/lib/email";
import { createRateLimiter } from "@/lib/rate-limit";

const isAllowed = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (!isAllowed(ip)) {
    return NextResponse.json({ error: "Demasiados envíos" }, { status: 429 });
  }

  const parsed = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  // Honeypot filled: answer as if it worked so bots get no signal.
  if (parsed.data.website) return NextResponse.json({ ok: true });

  try {
    await sendContactEmail(parsed.data);
  } catch (error) {
    console.error("Error enviando email de contacto", error);
    return NextResponse.json({ error: "No se pudo enviar el mensaje" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
