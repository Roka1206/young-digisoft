import { z } from "zod";
import { services } from "@/content/site";

export const contactSchema = z.object({
  name: z.string().min(2, "Introduce tu nombre"),
  email: z.email("Introduce un email válido"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[+()\d\s-]{6,20}$/.test(val), {
      message: "Introduce un teléfono válido",
    }),
  service: z.string().optional(),
  message: z.string().min(10, "Cuéntanos un poco más (mínimo 10 caracteres)"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const serviceOptions = services.map((service) => service.title);
