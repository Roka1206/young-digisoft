// Browsers always send Origin on a POST, so a missing or foreign one is not our form.
export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  try {
    return !!origin && new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export async function readJson(request: Request, maxBytes: number) {
  const text = await request.text();
  if (new TextEncoder().encode(text).length > maxBytes) return { tooLarge: true, data: null };
  try {
    return { tooLarge: false, data: JSON.parse(text) as unknown };
  } catch {
    return { tooLarge: false, data: null };
  }
}
