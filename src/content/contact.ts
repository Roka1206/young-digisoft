import { legalEntity } from "./legal";

export const contactPage = {
  metaTitle: "Contacto",
  title: "¿Hablamos de tu negocio?",
  description: "Cuéntanos qué necesitas y te respondemos con una propuesta clara.",
  metaDescription:
    "Cuéntanos qué necesitas y te respondemos con una propuesta clara. Escríbenos por el formulario, por WhatsApp o por email.",
  labels: { whatsapp: "WhatsApp", phone: "Teléfono", email: "Email", zone: "Zona" },
};

export const contactForm = {
  labels: {
    name: "Nombre",
    email: "Email",
    phone: "Teléfono (opcional)",
    service: "Servicio de interés (opcional)",
    servicePlaceholder: "Selecciona un servicio",
    message: "Mensaje",
    honeypot: "No rellenes este campo",
  },
  consent: { before: "He leído y acepto la ", link: "política de privacidad", after: "." },
  privacyNote: `${legalEntity.tradeName} usará tus datos solo para responder a tu consulta.`,
  errors: {
    name: "Introduce tu nombre",
    email: "Introduce un email válido",
    phone: "Introduce un teléfono válido",
    service: "Elige un servicio de la lista",
    message: "Cuéntanos un poco más (mínimo 10 caracteres)",
    messageTooLong: "El mensaje es demasiado largo (máximo 5.000 caracteres)",
    consent: "Necesitamos tu permiso para responderte",
  },
  submit: "Enviar mensaje",
  sending: "Enviando...",
  success: {
    title: "¡Mensaje enviado!",
    description: "Te responderemos lo antes posible.",
    again: "Enviar otro mensaje",
  },
  failure: {
    error: "No se pudo enviar el mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.",
    rateLimited: "Has enviado varios mensajes seguidos. Espera unos minutos o escríbenos por WhatsApp.",
  },
  whatsappCta: "Escríbenos por WhatsApp",
};
