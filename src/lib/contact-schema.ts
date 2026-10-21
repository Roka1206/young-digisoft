import * as z from "zod/mini";
import { contactForm } from "@/content/contact";
import { services } from "@/content/services";

const { errors } = contactForm;

export const contactSchema = z.object({
  name: z.string().check(z.minLength(2, errors.name)),
  email: z.email(errors.email),
  phone: z.optional(z.string().check(z.refine((val) => !val || /^[+()\d\s-]{6,20}$/.test(val), errors.phone))),
  service: z.optional(z.string()),
  message: z.string().check(z.minLength(10, errors.message)),
  consent: z.literal(true, { error: errors.consent }),
  website: z.optional(z.string()),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const serviceOptions = services.map((service) => service.name);
