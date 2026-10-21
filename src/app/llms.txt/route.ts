import { services } from "@/content/services";
import { buildLlmsTxt } from "@/lib/llms";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(siteUrl, services), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
