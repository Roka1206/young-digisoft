import { contact, founder } from "./site";

export const legalEntity = {
  ownerName: founder.name,
  tradeName: "Young Digisoft",
  taxId: "32946796D",
  address: "Rúa Linares Rivas 9 bajo, 15160, Sada, A Coruña",
};

export const legalUpdatedAt = "Última actualización: octubre de 2026";

const owner = `${legalEntity.ownerName}, que actúa con el nombre comercial ${legalEntity.tradeName}, con NIF ${legalEntity.taxId} y domicilio en ${legalEntity.address}`;

export type LegalSection = {
  title: string;
  paragraphs: string[];
};

export const avisoLegalSections: LegalSection[] = [
  {
    title: "1. Datos identificativos",
    paragraphs: [
      `En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de que este sitio web es titularidad de ${owner}.`,
      `Contacto: ${contact.phone} · ${contact.email}.`,
    ],
  },
  {
    title: "2. Objeto",
    paragraphs: [
      "El presente aviso legal regula el uso del sitio web, cuyo objeto es informar sobre los servicios de desarrollo web, automatización, mantenimiento y consultoría tecnológica ofrecidos por Young Digisoft, así como permitir el contacto con clientes potenciales.",
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
    title: "6. Enlaces a sitios de terceros",
    paragraphs: [
      "Este sitio web contiene enlaces a servicios de terceros, como Instagram, LinkedIn o WhatsApp. Young Digisoft no controla ni se hace responsable de sus contenidos ni de sus políticas de privacidad.",
    ],
  },
  {
    title: "7. Legislación aplicable",
    paragraphs: [
      "Las presentes condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales del domicilio del titular, salvo que la normativa de consumidores establezca otro fuero.",
    ],
  },
];

export const privacidadSections: LegalSection[] = [
  {
    title: "1. Responsable del tratamiento",
    paragraphs: [
      `${owner}, es el responsable del tratamiento de los datos personales recogidos a través de este sitio web.`,
      `Contacto para cuestiones de privacidad: ${contact.email}.`,
    ],
  },
  {
    title: "2. Finalidad del tratamiento",
    paragraphs: [
      "Los datos facilitados a través del formulario de contacto (nombre, email, teléfono, servicio de interés y mensaje) se utilizan exclusivamente para responder a la consulta o solicitud de presupuesto planteada por el usuario.",
      "El nombre, el email y el mensaje son obligatorios para poder responder: sin ellos no es posible atender la consulta. El teléfono y el servicio de interés son opcionales.",
      "Para evitar abusos, la dirección IP se usa de forma temporal, solo en memoria, para limitar el número de envíos del formulario. No se guarda en ninguna base de datos.",
      "Si el usuario acepta las cookies analíticas, se recogen datos de navegación (páginas visitadas, dispositivo, navegador y ubicación aproximada) mediante Google Analytics 4, con el fin de conocer de forma estadística cómo se usa el sitio web y mejorarlo.",
    ],
  },
  {
    title: "3. Legitimación",
    paragraphs: [
      "La base legal para responder al formulario es el consentimiento del usuario, otorgado al enviarlo voluntariamente, y, si solicita un presupuesto, la aplicación de medidas precontractuales a petición suya (artículo 6.1.a y b del RGPD).",
      "El uso temporal de la dirección IP para limitar envíos se basa en el interés legítimo en proteger el sitio web frente a abusos (artículo 6.1.f del RGPD).",
      `El usuario puede retirar ese consentimiento en cualquier momento escribiendo a ${contact.email}, sin que ello afecte a la licitud del tratamiento anterior a la retirada.`,
      "La analítica con Google Analytics se basa en el consentimiento que el usuario da al pulsar «Aceptar» en el aviso de cookies. Puede retirarlo en cualquier momento desde el enlace «Configurar cookies» del pie de página.",
    ],
  },
  {
    title: "4. Destinatarios y encargados del tratamiento",
    paragraphs: [
      "Para prestar el servicio se utilizan proveedores que actúan como encargados del tratamiento: Vercel Inc. (alojamiento del sitio web) y Plus Five Five, Inc., que opera como Resend (envío por correo electrónico de los mensajes del formulario). Ambas tienen sede en Estados Unidos.",
      "Ambos proveedores están adheridos al Marco de Privacidad de Datos UE-EE. UU., sobre el que la Comisión Europea ha adoptado una decisión de adecuación, y además incluyen en sus acuerdos de tratamiento de datos las cláusulas contractuales tipo de la Comisión Europea.",
      "No se ceden datos a terceros salvo obligación legal.",
      "El sitio web utiliza Vercel Analytics y Vercel Speed Insights para analítica de uso y rendimiento, con datos agregados y sin fines identificativos.",
      "Solo con el consentimiento del usuario, los datos de navegación se comparten con Google Ireland Ltd. como proveedor de Google Analytics. Google puede tratarlos en Estados Unidos, país con el que la Comisión Europea ha adoptado una decisión de adecuación (Marco de Privacidad de Datos UE-EE. UU.). Más información en la política de privacidad de Google: policies.google.com/privacy.",
    ],
  },
  {
    title: "5. Conservación de los datos",
    paragraphs: [
      "Los datos del formulario se conservan durante 12 meses desde la última comunicación si no se llega a contratar ningún servicio.",
      "Si se contrata un servicio, se conservan mientras dure la relación y, después, durante los plazos que exige la ley: 6 años en materia mercantil (Código de Comercio) y 4 años en materia tributaria (Ley General Tributaria).",
      "Los datos de Google Analytics se conservan durante 14 meses; el plazo se renueva si vuelves a visitar la web.",
    ],
  },
  {
    title: "6. Derechos del usuario",
    paragraphs: [
      `El usuario puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento, portabilidad y a no ser objeto de decisiones individuales automatizadas enviando un correo a ${contact.email}, indicando el derecho que desea ejercer. Se responderá en el plazo de un mes.`,
      "No se toman decisiones automatizadas ni se elaboran perfiles con los datos del formulario.",
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
      "Este sitio web no utiliza cookies de publicidad. Emplea las siguientes tecnologías de carácter técnico y necesario para su funcionamiento:",
      "· Preferencia de tema (claro/oscuro): almacenamiento local del navegador (localStorage), sin fecha de caducidad, hasta que el usuario borre los datos del navegador.",
      "· Aviso de salida (exit-intent): almacenamiento de sesión del navegador (sessionStorage), para no mostrar el mismo aviso más de una vez por visita. Se elimina automáticamente al cerrar la pestaña o el navegador.",
      "· Preferencia de cookies: almacenamiento local del navegador (localStorage), para recordar si el usuario ha aceptado o rechazado las cookies analíticas durante 24 meses. Pasado ese plazo, se le vuelve a preguntar.",
      "· Vercel Analytics y Vercel Speed Insights: herramientas de analítica de uso y rendimiento sin cookies, que no identifican individualmente a los usuarios.",
    ],
  },
  {
    title: "3. Cookies analíticas de Google Analytics",
    paragraphs: [
      "Solo si el usuario las acepta, el sitio web usa Google Analytics 4, un servicio de Google Ireland Ltd., para conocer de forma estadística cómo se usa la web (páginas visitadas, tiempo de visita, dispositivo y ubicación aproximada) y mejorarla. Instala estas cookies:",
      "· _ga: cookie propia gestionada por Google. Distingue a los visitantes de forma estadística. Duración: 2 años.",
      "· _ga_H40D89JXJQ: cookie propia gestionada por Google. Guarda el estado de la sesión. Duración: 2 años.",
      "Más información sobre cómo trata Google estos datos en policies.google.com/privacy.",
    ],
  },
  {
    title: "4. Consentimiento",
    paragraphs: [
      "El almacenamiento técnico necesario y la analítica sin cookies de Vercel no requieren consentimiento, conforme al artículo 22.2 de la LSSI-CE.",
      "Las cookies de Google Analytics solo se instalan si el usuario pulsa «Aceptar» en el aviso de cookies. Si pulsa «Rechazar», Google Analytics no se carga.",
    ],
  },
  {
    title: "5. Cómo cambiar o retirar el consentimiento",
    paragraphs: [
      "El usuario puede cambiar su elección en cualquier momento desde el enlace «Configurar cookies» del pie de página. Si retira el consentimiento, se borran las cookies de Google Analytics y deja de cargarse.",
      "También puede eliminar las cookies y los datos de localStorage/sessionStorage desde la configuración de privacidad de su navegador, en la sección de datos de sitios web.",
    ],
  },
  {
    title: "6. Cambios en esta política",
    paragraphs: [
      "Esta política de cookies puede actualizarse para adaptarse a cambios legislativos o en el funcionamiento del sitio web. Se recomienda revisarla periódicamente.",
    ],
  },
];

export const cookieBanner = {
  label: "Aviso de cookies",
  text: "Usamos cookies de Google Analytics (Google Ireland Ltd.) para saber cómo se usa la web y mejorarla. Solo se activan si las aceptas.",
  link: "Ver la política de cookies",
  accept: "Aceptar",
  reject: "Rechazar",
  settings: "Configurar cookies",
};
