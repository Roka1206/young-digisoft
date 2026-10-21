import * as z from "zod/mini";
import { contactForm } from "@/content/contact";
import { services } from "@/content/services";

const { errors } = contactForm;

export const serviceOptions = services.map((service) => service.name);

export const contactSchema = z.object({
  name: z
    .string()
    .check(z.minLength(2, errors.name), z.maxLength(100, errors.name), z.regex(/^[^\p{Cc}]*$/u, errors.name)),
  email: z.email(errors.email).check(z.maxLength(254, errors.email)),
  phone: z.optional(z.string().check(z.refine((val) => !val || /^[+()\d\s-]{6,20}$/.test(val), errors.phone))),
  service: z.optional(z.string().check(z.refine((val) => !val || serviceOptions.includes(val), errors.service))),
  message: z.string().check(z.minLength(10, errors.message), z.maxLength(5000, errors.messageTooLong)),
  consent: z.literal(true, { error: errors.consent }),
  website: z.optional(z.string()),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
