import { trackEvent } from "./analytics";
import type { ContactFormValues } from "./contact-schema";

export type SubmitResult = "success" | "rateLimited" | "error";

export async function submitContact(values: ContactFormValues): Promise<SubmitResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      // Only the chosen service: never personal data.
      trackEvent("generate_lead", { form_name: "contact", ...(values.service && { service: values.service }) });
      return "success";
    }
    return response.status === 429 ? "rateLimited" : "error";
  } catch {
    return "error";
  }
}
