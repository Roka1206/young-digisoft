export const legalEntity = {
  legalName: "Young Digisoft",
  taxId: "32946796D",
  address: "Rúa Linares Rivas 9 bajo, 15160, Sada, A Coruña",
};

export type LegalSection = {
  title: string;
  paragraphs: string[];
};

export const avisoLegalSections: LegalSection[] = [
  {
    title: "1. Datos identificativos",
    paragraphs: [
      `En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de que este sitio web es titularidad de ${legalEntity.legalName}, con NIF/CIF ${legalEntity.taxId} y domicilio en ${legalEntity.address}.`,
      "Contacto: 655 08 73 21 · 1206roka@gmail.com.",
    ],
  },
  {
    title: "2. Objeto",
    paragraphs: [
      "El presente aviso legal regula el uso del sitio web, cuyo objeto es informar sobre los servicios de digitalización, tecnología y soporte ofrecidos por Young Digisoft, así como permitir el contacto con clientes potenciales.",
    ],
  },
  {
    title: "3. Condiciones de uso",
    paragraphs: [
      "El acceso y uso de este sitio web atribuye la condición de usuario y supone la aceptación de las condiciones incluidas en este aviso legal. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios ofrecidos.",
    ],
  },
  {
    title: "4. Propiedad intelectual e industrial",
    paragraphs: [
      "Todos los contenidos del sitio web (textos, imágenes, logotipos, diseño) son propiedad de Young Digisoft o de terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial.",
    ],
  },
  {
    title: "5. Responsabilidad",
    paragraphs: [
      "Young Digisoft no se hace responsable de los daños derivados del uso incorrecto del sitio web, ni de la disponibilidad continua del mismo, aunque pondrá los medios razonables para garantizar su correcto funcionamiento.",
    ],
  },
  {
    title: "6. Legislación aplicable",
    paragraphs: [
      "Las presentes condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales del domicilio del titular, salvo que la normativa de consumidores establezca otro fuero.",
    ],
  },
];

export const privacidadSections: LegalSection[] = [
  {
    title: "1. Responsable del tratamiento",
    paragraphs: [
      `${legalEntity.legalName}, con NIF/CIF ${legalEntity.taxId} y domicilio en ${legalEntity.address}, es el responsable del tratamiento de los datos personales recogidos a través de este sitio web.`,
      "Contacto para cuestiones de privacidad: 1206roka@gmail.com.",
    ],
  },
  {
    title: "2. Finalidad del tratamiento",
    paragraphs: [
      "Los datos facilitados a través del formulario de contacto (nombre, email, teléfono, mensaje) se utilizan exclusivamente para responder a la consulta o solicitud de presupuesto planteada por el usuario.",
    ],
  },
  {
    title: "3. Legitimación",
    paragraphs: [
      "La base legal para el tratamiento es el consentimiento del usuario, otorgado al enviar voluntariamente el formulario de contacto.",
    ],
  },
  {
    title: "4. Destinatarios y encargados del tratamiento",
    paragraphs: [
      "Los datos del formulario se envían por correo electrónico mediante el proveedor Resend (servicio de envío de emails). No se ceden datos a terceros salvo obligación legal.",
      "El sitio web utiliza Vercel Analytics y Vercel Speed Insights para analítica de uso y rendimiento, con datos agregados y sin fines identificativos.",
    ],
  },
  {
    title: "5. Conservación de los datos",
    paragraphs: [
      "Los datos se conservarán únicamente durante el tiempo necesario para gestionar la consulta, salvo que exista una obligación legal de conservación superior.",
    ],
  },
  {
    title: "6. Derechos del usuario",
    paragraphs: [
      "El usuario puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad enviando un correo a 1206roka@gmail.com, indicando el derecho que desea ejercer.",
      "Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si considera que el tratamiento no se ajusta a la normativa vigente.",
    ],
  },
];

export const cookiesSections: LegalSection[] = [
  {
    title: "1. ¿Qué son las cookies?",
    paragraphs: [
      "Las cookies y tecnologías similares (como el almacenamiento local del navegador) son pequeños archivos que permiten a un sitio web recordar información sobre la visita, como preferencias de idioma o de visualización.",
    ],
  },
  {
    title: "2. Tecnologías que utiliza este sitio web",
    paragraphs: [
      "Este sitio web no utiliza cookies de publicidad ni de seguimiento de terceros. Únicamente emplea las siguientes tecnologías, de carácter técnico y necesario para su funcionamiento:",
      "· Preferencia de tema (claro/oscuro): almacenamiento local del navegador (localStorage), sin fecha de caducidad, hasta que el usuario borre los datos del navegador.",
      "· Aviso de salida (exit-intent): almacenamiento de sesión del navegador (sessionStorage), para no mostrar el mismo aviso más de una vez por visita. Se elimina automáticamente al cerrar la pestaña o el navegador.",
      "· Vercel Analytics y Vercel Speed Insights: herramientas de analítica de uso y rendimiento sin cookies, que no identifican individualmente a los usuarios.",
    ],
  },
  {
    title: "3. Consentimiento",
    paragraphs: [
      "Al tratarse exclusivamente de almacenamiento técnico necesario y de herramientas de analítica sin cookies, no es necesario solicitar el consentimiento del usuario conforme al artículo 22.2 de la LSSI-CE.",
    ],
  },
  {
    title: "4. Cómo eliminar este almacenamiento",
    paragraphs: [
      "El usuario puede eliminar en cualquier momento los datos de localStorage/sessionStorage desde la configuración de privacidad de su navegador, en la sección de datos de sitios web.",
    ],
  },
  {
    title: "5. Cambios en esta política",
    paragraphs: [
      "Esta política de cookies puede actualizarse para adaptarse a cambios legislativos o en el funcionamiento del sitio web. Se recomienda revisarla periódicamente.",
    ],
  },
];
