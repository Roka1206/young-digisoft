// Datos de ejemplo — reemplazar por testimonios reales de clientes cuando estén disponibles.
export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Nombre Apellido",
    role: "Autónomo, A Coruña",
    quote:
      "Digitalizaron todo nuestro archivo en papel y ahora encontramos cualquier documento en segundos. Trato cercano y muy rápido.",
  },
  {
    name: "Nombre Apellido",
    role: "Comercio local",
    quote:
      "Nos hicieron la web nueva y desde entonces recibimos más consultas de clientes. Siempre disponibles para cualquier cambio.",
  },
  {
    name: "Nombre Apellido",
    role: "Pequeña empresa",
    quote:
      "El soporte técnico nos saca de apuros el mismo día. Se nota que conocen bien las necesidades de una pyme.",
  },
];
