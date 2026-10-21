import { NextResponse } from "next/server";
import { flattenError } from "zod/mini";
import { contactSchema } from "@/lib/contact-schema";
import { sendContactEmail } from "@/lib/email";
import { createRateLimiter } from "@/lib/rate-limit";
import { isSameOrigin, readJson } from "@/lib/request-guards";

const isAllowed = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });
const maxBodyBytes = 32_000;

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (!isAllowed(ip)) {
    return NextResponse.json({ error: "Demasiados envíos" }, { status: 429 });
  }

  const body = await readJson(request, maxBodyBytes);
  if (body.tooLarge) {
    return NextResponse.json({ error: "Mensaje demasiado grande" }, { status: 413 });
  }

  const parsed = contactSchema.safeParse(body.data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", issues: flattenError(parsed.error).fieldErrors },
      { status: 400 },
    );
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
