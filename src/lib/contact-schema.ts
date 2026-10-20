import { z } from "zod";
import { contactForm } from "@/content/contact";
import { services } from "@/content/services";

const { errors } = contactForm;

export const contactSchema = z.object({
  name: z.string().min(2, errors.name),
  email: z.email(errors.email),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[+()\d\s-]{6,20}$/.test(val), { message: errors.phone }),
  service: z.string().optional(),
  message: z.string().min(10, errors.message),
  consent: z.literal(true, { error: errors.consent }),
  website: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const serviceOptions = services.map((service) => service.name);
