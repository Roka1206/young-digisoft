import {
  Cloud,
  Compass,
  FileText,
  Globe,
  Network,
  RefreshCw,
  Share2,
  Smartphone,
  TrendingUp,
  Headphones,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const site = {
  name: "Young Digisoft",
  tagline: "Digitalización, tecnología y soporte para empresas y autónomos",
  description:
    "En Young Digisoft acompañamos a empresas y autónomos en su transformación digital: digitalizamos procesos, reparamos y mantenemos tus equipos, y creamos las herramientas web y móviles que tu negocio necesita para crecer. Soluciones cercanas, rápidas y adaptadas a cada presupuesto.",
};

export const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Por qué elegirnos", href: "#por-que-elegirnos" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
] as const;

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    title: "Digitalización de documentos y procesos",
    description:
      "Pasamos tu papeleo y flujos de trabajo a formato digital, ordenado y accesible.",
    icon: FileText,
  },
  {
    title: "Reparación de hardware",
    description:
      "Ordenadores, portátiles, impresoras y equipos de oficina, diagnosticados y reparados.",
    icon: Wrench,
  },
  {
    title: "Soporte técnico de software",
    description:
      "Resolvemos incidencias, instalamos y configuramos programas y mantenemos tus sistemas al día.",
    icon: Headphones,
  },
  {
    title: "Creación de páginas web",
    description:
      "Webs profesionales, rápidas y adaptadas a móvil, pensadas para captar clientes.",
    icon: Globe,
  },
  {
    title: "Mantenimiento web",
    description:
      "Actualizaciones, copias de seguridad y mejoras continuas para que tu web nunca falle.",
    icon: RefreshCw,
  },
  {
    title: "Desarrollo de apps a medida",
    description:
      "Aplicaciones móviles y de escritorio diseñadas para las necesidades de tu negocio.",
    icon: Smartphone,
  },
  {
    title: "Copias de seguridad y nube",
    description:
      "Protegemos tu información y la migramos a la nube para acceder desde cualquier lugar.",
    icon: Cloud,
  },
  {
    title: "Redes e infraestructura",
    description:
      "Instalación y configuración de redes, wifi y equipos para tu oficina o local.",
    icon: Network,
  },
  {
    title: "Automatización de tareas",
    description:
      "Optimizamos procesos repetitivos para ahorrar tiempo y reducir errores.",
    icon: Workflow,
  },
  {
    title: "Asesoría en transformación digital",
    description:
      "Te orientamos sobre qué herramientas digitales encajan mejor con tu negocio.",
    icon: Compass,
  },
  {
    title: "Gestión de Redes Sociales",
    description:
      "Creamos y gestionamos tus perfiles en redes sociales: contenido, publicaciones y estrategia para dar visibilidad a tu negocio.",
    icon: Share2,
  },
  {
    title: "Marketing digital y SEO",
    description:
      "Posicionamos tu negocio en Google y diseñamos campañas online para atraer más clientes.",
    icon: TrendingUp,
  },
];

export const whyUs = [
  {
    title: "100% presupuesto adaptado",
    description: "Soluciones ajustadas al tamaño y presupuesto de tu negocio.",
  },
  {
    title: "Atención rápida y cercana",
    description: "Respondemos rápido y hablamos claro, sin tecnicismos innecesarios.",
  },
  {
    title: "Servicio local y online",
    description: "Presenciales en A Coruña, y online para toda España.",
  },
] as const;

export const contact = {
  phone: "655 08 73 21",
  phoneHref: "tel:+34655087321",
  whatsappHref:
    "https://wa.me/34655087321?text=" +
    encodeURIComponent("Hola, quiero más información sobre los servicios de Young Digisoft."),
  email: "1206roka@gmail.com",
  emailHref: "mailto:1206roka@gmail.com",
  zone: "A Coruña (presencial) y online en toda España",
};

// TODO: reemplazar por las URLs reales de las redes sociales del negocio.
export const socialLinks = [
  { name: "WhatsApp", href: contact.whatsappHref },
  { name: "Instagram", href: "#" },
  { name: "Facebook", href: "#" },
] as const;
