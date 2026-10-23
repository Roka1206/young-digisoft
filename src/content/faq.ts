import { services } from "./services";

export type FaqItem = {
  question: string;
  answer: string[];
};

export const faq: FaqItem[] = [
  {
    question: "¿Cuánto tarda?",
    answer: [
      "Depende del alcance de cada proyecto. Como referencia:",
      ...services.flatMap((service) =>
        service.plans.filter((plan) => plan.timeline).map((plan) => `${plan.name}: ${plan.timeline}.`),
      ),
      "Antes de empezar te damos un plazo cerrado para tu proyecto.",
    ],
  },
  {
    question: "¿Qué incluye el precio?",
    answer: [
      "El precio es cerrado: incluye todo lo que aparece en la ficha de cada servicio y te lo confirmamos por escrito en la propuesta antes de empezar.",
      "Si necesitas algo que no está incluido, te lo decimos antes de hacerlo.",
    ],
  },
  {
    question: "¿El dominio y el hosting son míos?",
    answer: [
      "Sí. El dominio y el alojamiento se registran a tu nombre y son tuyos desde el primer día. Nosotros nos encargamos de la configuración técnica, pero el control siempre es tuyo.",
    ],
  },
  {
    question: "¿Qué pasa después de publicar?",
    answer: [
      "Cada proyecto es diferente, así que lo dejamos por escrito en el contrato antes de empezar: qué soporte incluye, durante cuánto tiempo y cómo seguimos después.",
      "Si prefieres olvidarte de la parte técnica, puedes contratar el Mantenimiento mensual: hosting, copias de seguridad, actualizaciones y pequeños cambios.",
    ],
  },
  {
    question: "¿Trabajáis fuera de A Coruña?",
    answer: ["Sí. Tenemos la sede en Sada (A Coruña) y trabajamos con negocios de toda España."],
  },
];
