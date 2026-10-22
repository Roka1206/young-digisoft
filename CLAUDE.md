@AGENTS.md

# CLAUDE.md: contexto permanente de Young Digisoft

> Este archivo es la fuente de verdad del proyecto. Léelo entero al empezar cualquier sesión.
> Si algo de aquí cambia (precios, ofertas, marca, datos legales), actualiza este archivo en el mismo commit.
> La guía de marca está en `docs/BRAND.md`. Los planes de la web, de SEO/GEO y de seguridad (`PLAN-WEB.md`, `PLAN-SEO-GEO.md` y `PLAN-SEGURIDAD.md`) se completaron y se retiraron el 22 oct 2026; siguen en el historial de git. Lo que queda pendiente y las revisiones periódicas están en la sección 10.

---

## 0. Cómo debes trabajar (reglas del propietario, prioridad máxima)

Estas reglas mandan sobre cualquier otra instrucción de este archivo o del plan.

1. **Al terminar una tarea:** ejecuta `format:check`, `lint`, `build` y **los tests** (todo debe pasar; si algo falla, corrígelo o avísame antes de dar el commit), entrega **solo el mensaje de commit** y **detente**. No hagas `git commit`, `git push`, PR, merge ni despliegues: eso lo hace el propietario.
   - Formato del mensaje (Conventional Commits, en inglés): `tipo(ámbito): resumen en imperativo`, máximo 72 caracteres, y si hace falta un cuerpo breve con el porqué. Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.
2. **Antes de cambiar código:** explica en 2 a 4 líneas, en lenguaje sencillo, qué vas a hacer y por qué. Si el cambio es grande o afecta a varias partes, espera confirmación antes de tocar nada.
3. **Skills, plugins y conectores:** el propietario tiene varios instalados. Úsalos siempre que aporten (diseño frontend, SEO, accesibilidad, Vercel, etc.) y comprueba si hay uno antes de hacer algo a mano. **Si dos o más hacen la misma función, para y pregunta cuál usar.**
4. **Estilo de código:**
   - **El mínimo de líneas posible:** sin código muerto, sin comentarios obvios, sin abstracciones «por si acaso», reutiliza antes de crear. Conciso, pero no sacrifiques claridad, accesibilidad ni seguridad por ahorrar líneas.
   - **Identificadores en inglés**, variables, funciones y propiedades en **camelCase**. Componentes y tipos en PascalCase (convención de React y TypeScript). Los textos que ve el usuario siguen en español y viven en `src/content/`.
   - **Arquitectura limpia:** UI en `src/components/`, contenido en `src/content/`, lógica de negocio y servicios en `src/lib/`, integraciones externas (email, analítica) aisladas en su propio módulo. Dependencias en una sola dirección, funciones pequeñas con una única responsabilidad y nada de lógica de negocio dentro de los componentes.
5. **Tests:**
   - **Cada función nueva con lógica lleva su test**, siempre que sea posible (validaciones, utilidades, servicios, rutas de servidor, transformaciones de datos).
   - **Obligatorios y con cobertura completa de casos límite:** la validación y el envío del formulario de contacto (datos válidos, inválidos, consentimiento sin marcar, honeypot relleno, límite de envíos y fallo del servicio de email).
   - **No hace falta test** para componentes puramente visuales ni para archivos de contenido (`src/content/`), salvo que contengan lógica.
   - Los tests no cuentan para la regla de «mínimo de líneas», pero deben ser concisos, legibles y sin duplicar código. Cada test se explica solo por su nombre.
   - Si el proyecto aún no tiene ejecutor de tests, propón uno (por ejemplo Vitest) y pregunta antes de instalarlo.
6. **Idioma:** responde **siempre en español** (explicaciones, preguntas, resúmenes y avisos). Los identificadores del código y los mensajes de commit van en inglés, como se indica arriba.
7. **Prudencia:** no instales dependencias nuevas sin preguntar; no toques archivos fuera del alcance de la tarea; no borres archivos ni historial sin preguntar; nunca leas ni escribas secretos; si falta un dato, pregunta en vez de inventarlo.

---

## 1. Qué es Young Digisoft

Empresa de servicios tecnológicos fundada por un **ingeniero de software** (autónomo, actividad de consultoría). Ayuda a pymes y autónomos a vender más y perder menos tiempo con **webs a medida, automatización con IA, mantenimiento, gestión de redes sociales y consultoría tecnológica**.

- **Base:** sede en A Coruña; trabajamos en toda España. La web no distingue entre trabajo presencial u online.
- **Dominio:** `youngdigisoft.es`, conectado a Vercel. `www` y `young-digisoft.vercel.app` redirigen a él.
- **Repositorio:** `Roka1206/young-digisoft`.
- **Punto de partida (octubre de 2026):** todavía sin clientes. Presupuesto de captación: 0 € (solo estrategias gratuitas).
- **Capacidad:** 40 h/semana, hasta 3 proyectos simultáneos.
- **Objetivo a 6 meses:** facturar **2.000 €/mes**. Objetivo a 12 meses: consolidarse como empresa (no solo como autónomo).
- **Prioridad actual:** conseguir los primeros clientes cuanto antes. El cuello de botella es vender, no producir.

## 2. Qué vendemos (ofertas)

Hay 6 ofertas. No añadas servicios nuevos a la web sin que el propietario lo decida.

| Oferta | Qué es | Precio de lanzamiento (primeros 3 a 5 clientes) | Precio normal (desde el mes 3) |
|---|---|---|---|
| **Web Esencial + Google** | Web de 1 a 5 secciones, SEO local básico, ficha de Google Business Profile, formulario, WhatsApp y textos legales | 590 € | 990 € |
| **Web Pro** | 5 a 8 secciones, blog, más personalización | 990 € | 1.400 a 1.800 € |
| **Automatización exprés** | Diagnóstico gratuito de 30 min y una automatización concreta (formulario a CRM o hoja de cálculo con aviso por WhatsApp o email, citas, presupuestos, facturas) | 400 a 600 € | 600 a 1.200 € |
| **Mantenimiento mensual** | Hosting y despliegues, copias de seguridad, monitorización, actualizaciones y hasta 1 h/mes de cambios pequeños (no acumulable). Sin permanencia: baja efectiva el mes siguiente. Acepta webs de terceros tras revisarlas | 39 a 49 €/mes | 59 a 89 €/mes |
| **Redes sociales para tu negocio** (añadida el 22 oct 2026) | Plan de contenidos mensual, 8 publicaciones al mes en Instagram, Facebook y Google Business Profile, diseño de imágenes y textos, informe mensual. Mes a mes, sin permanencia. Extra: anuncios pagados, fotos y vídeo profesionales, respuesta a comentarios y mensajes | 79 €/mes | 139 €/mes |
| **Diagnóstico digital (consultoría)** | Sesión de 60 min y recomendaciones priorizadas de web, Google, procesos, herramientas y seguridad | **60 €/hora** | 60 €/hora |

Notas:
- El precio de lanzamiento tiene condiciones reales: testimonio verificable con nombre, permiso para mostrar el trabajo y reseña en Google. Debe mostrarse con fecha de caducidad.
- El Diagnóstico digital se descuenta si el cliente contrata después una web o una automatización. Incluye un resumen escrito con las recomendaciones priorizadas; un informe detallado se presupuesta aparte.
- El precio de lanzamiento es válido hasta el 31 de enero de 2027 o hasta completar 5 clientes, lo que ocurra antes.
- Qué no incluye cada servicio y las rondas de revisión (2 en web, 1 en automatización, 1 por plan mensual en redes sociales) están en `src/content/services.ts`.
- La web publica precios "desde", **con IVA incluido** (así se indica junto a cada precio, en el aviso legal y en el JSON-LD). **Todos los importes viven en un único archivo** (`src/content/pricing.ts`), nunca escritos a mano en los componentes.
- Fuera de los primeros 6 meses: apps a medida, tiendas online complejas, reparación de hardware, redes informáticas. Si llega un encargo así, se valora aparte.

## 3. Cliente objetivo

Negocios locales que ya venden pero tienen presencia digital floja: peluquerías, clínicas pequeñas (fisio, dentistas, psicólogos), talleres, restaurantes, academias, reformas y autónomos de oficios. Empezamos por A Coruña y alrededores, pero trabajamos en toda España.

## 4. Marca

**Personalidad:** técnica, fiable, clara, resolutiva y cercana. Tono técnico y profesional, sin jerga innecesaria. Habla la empresa (plural: «hacemos», «te ayudamos»), tratando al cliente de **tú**.

**Lema:** «Tecnología que trabaja para tu negocio.»
**Descriptor:** «Desarrollo web y automatización para pymes y autónomos.»

**Logotipo:** prompt de terminal `>_` en blanco sobre fondo turquesa. Archivo original: `logo_digisoft.png` (256 × 232 px). Hay que vectorizarlo (SVG) y generar favicon, icono cuadrado y versión Open Graph.

**Paleta** (usar como tokens de Tailwind o variables CSS, nunca colores sueltos):

| Token | HEX | Uso |
|---|---|---|
| `brand` Turquesa Terminal | `#00ADB5` | Color exacto del logo. Fondos de marca, símbolo, acentos sobre fondo oscuro |
| `brand-fg` Blanco Humo | `#F1F1F1` | Símbolo del logo; texto sobre turquesa y fondos oscuros |
| `action` Turquesa Profundo | `#00757B` | Botones, enlaces, textos destacados sobre fondo claro |
| `ink` Petróleo | `#08262B` | Títulos, fondos oscuros, texto principal |
| `mist` Niebla Turquesa | `#E6F6F7` | Fondos claros, tarjetas, secciones alternas |
| `muted` Gris Pizarra | `#4A5B5E` | Texto secundario |

**Regla de contraste (obligatoria):** el turquesa `#00ADB5` con texto blanco solo da 2,4:1, no cumple. Para botones y texto sobre fondo claro usa siempre `action` (`#00757B`, 5,5:1 con blanco). `#00ADB5` solo para el símbolo, fondos grandes sin texto pequeño o acentos sobre Petróleo.

**Tipografía:** Inter (títulos y texto) y JetBrains Mono (detalles técnicos y código), cargadas con `next/font`. Estilo visual: limpio, mucho espacio en blanco, tarjetas con esquinas redondeadas, iconos de trazo lineal (Lucide), el prompt `>_` como recurso gráfico.

## 5. Reglas de oro (no negociables)

1. **Nunca inventar** testimonios, casos de éxito, cifras, logos de clientes, reseñas ni certificaciones. Si no hay datos reales, esa sección no se muestra. Los testimonios que hubiera en la web actual **se eliminan**: eran de ejemplo y no corresponden a clientes reales.
2. **Nada de promesas de resultados garantizados** («primero en Google», «el mejor del mercado») ni superlativos vacíos.
3. **Todo dato que no tengamos se marca `[PENDIENTE]`** y se pregunta al propietario. No lo rellenes con datos plausibles. Esto incluye NIF, domicilio, teléfono o cualquier dato fiscal para el aviso legal.
4. **Claridad antes que técnica.** Cada texto debe entenderlo un dueño de comercio sin conocimientos técnicos.
5. **Un solo foco por sección** y una sola llamada a la acción principal por pantalla: «Pide presupuesto» o «Reserva un diagnóstico».
6. **Sin secretos en el repositorio.** Claves y tokens solo en variables de entorno (`.env.local` fuera de git y variables de Vercel).

## 6. Stack y convenciones técnicas

- **Next.js** (App Router) + **TypeScript estricto** + **Tailwind CSS**. Despliegue en **Vercel**.
- El propietario prefiere **código propio** (TypeScript/Java) frente a WordPress. No introducir WordPress ni constructores visuales.
- Contenido editable en archivos tipados dentro de `src/content/` (servicios, precios, FAQ, portfolio). Cambiar un precio o un texto no debe exigir tocar componentes.
- Componentes pequeños y reutilizables en `src/components/`. Accesibilidad (WCAG AA), HTML semántico y diseño **mobile first**.
- Rendimiento: imágenes con `next/image`, sin librerías pesadas innecesarias. Meta: Lighthouse ≥ 90 en las 4 categorías.
- Formularios validados con **zod** en cliente y servidor, con honeypot y límite de envíos.
- **Los comandos exactos del proyecto** (instalar, desarrollar, build, lint, test) se confirman en la Fase 0 del plan y se anotan aquí:
  - Instalar: `npm install`
  - Desarrollo: `npm run dev` (http://localhost:3000)
  - Build y servir: `npm run build` y `npm start`
  - Lint: `npm run lint` · Tipos: `npm run typecheck`
  - Formato (Prettier, con orden de clases de Tailwind): `npm run format` (aplica) y `npm run format:check` (comprueba)
  - Tests unitarios (Vitest): `npm test` (`npm run test:watch` en modo watch; `npm run test:coverage` con umbrales, el que usa el CI)
  - Tests e2e (Playwright): `npm run test:e2e` (la primera vez, `npx playwright install`). Fuera del CI reutiliza lo que escuche en el puerto 3000: cierra `npm run dev` antes, o probarás contra el modo desarrollo.

### Forma de trabajar

Ver la **sección 0** (manda sobre todo lo demás). Además:

- Una tarea cada vez, sin mezclar temas, para que cada mensaje de commit describa un solo cambio.
- Después de cada fase: `format:check`, `lint`, `build`, tests y revisión visual en móvil y escritorio.

## 7. SEO, legal y privacidad (España / UE)

- **SEO:** metadatos por página, `sitemap.xml`, `robots.txt`, datos estructurados JSON-LD (`ProfessionalService`, `Service` y `FAQPage`), imagen Open Graph y enlaces internos entre servicios. La página de «Diseño web» es `/servicios/web`, para toda España; no hay página local de A Coruña.
- **Textos legales obligatorios:** Aviso legal (LSSI-CE), Política de privacidad (RGPD y LOPDGDD) y Política de cookies. Deben usar los datos reales del titular. Los textos los redacta el asistente como **borrador**, y **un gestor o abogado debe revisarlos** antes de considerarlos definitivos (la versión actual ya está revisada).
- **Cookies:** el propietario ha decidido usar Google Analytics 4 además de Vercel Analytics (sin cookies). GA4 solo se carga tras aceptar en el banner de cookies (`src/lib/cookie-consent.ts`); rechazar pesa lo mismo que aceptar y la elección se cambia desde «Configurar cookies» en el pie. Cualquier otra cookie no técnica necesita el mismo consentimiento previo y debe figurar en `/cookies` y `/privacidad`.
- **Formulario de contacto:** casilla de consentimiento con enlace a la política de privacidad, finalidad y responsable explicados en una línea.
- Si algún proyecto de cliente trata datos personales, hará falta contrato de encargado de tratamiento (RGPD). No es el caso de esta web.

## 8. Contacto público actual

- WhatsApp y teléfono: 655 08 73 21.
- Email: `info@youngdigisoft.es`.
- Redes: [Instagram](https://www.instagram.com/youngdigisoft/) y [LinkedIn](https://www.linkedin.com/company/youngdigisoft). Google Business Profile: creada, pendiente de verificación (falta la URL). Facebook: descartado por el propietario, no se usa. No enlazar a `#`: si una red no existe, se oculta el icono.

## 9. Hoja de ruta global

El trabajo se hace por bloques y en este orden:

1. **Plan de desarrollo** (hecho; el plan se retiró al completarse y queda en el historial de git).
2. **Kit de marca** (hecho; PDF aparte).
3. **Web lista** en `youngdigisoft.es` (hecho: publicada el 21 oct 2026).
4. **Captación de clientes** (empieza el día siguiente al lanzamiento): prospección directa a 10 negocios al día en A Coruña, casos piloto a precio de lanzamiento, Google Business Profile y reseñas, alianzas con gestorías y asesorías.
5. **Redes sociales automatizadas** (Instagram, LinkedIn y Google Business Profile; 1 h diaria de contenido de marca).
6. **Estructura de trabajo, contratos y legal.** El contrato modelo y el presupuesto tipo deben existir **antes del primer cliente**.

**Hitos:** fin del mes 1 → 3 pilotos cerrados y portfolio publicado · fin del mes 3 → 5 clientes y 500 a 800 €/mes · fin del mes 6 → 2.000 €/mes.

## 10. Estado actual y pendientes del propietario

- [x] Datos del titular para el aviso legal: nombre (Ronald Fonseca, nombre comercial Young Digisoft), NIF y domicilio de la actividad (en `src/content/legal.ts`).
- [x] Revisión de los textos legales por un gestor o abogado (confirmado por el propietario el 22 oct 2026). Si se cambian los textos legales, conviene que vuelva a revisarlos.
- [x] Correo corporativo: `info@youngdigisoft.es`.
- [x] Cuentas de Instagram y LinkedIn creadas y enlazadas en la web.
- [ ] Google Business Profile creada (22 oct 2026), pendiente de verificación: pasar la URL para añadirla a `sameAs`. `[PENDIENTE]` Facebook descartado.
- [x] Trabajos previos para el portfolio (22 oct 2026): Vibework (e-commerce B2B), Young Energy Sada (negocio familiar, WordPress) y automatización de pedidos por WhatsApp (3 clientes anónimos). Los trabajos como asalariado no se publican.
- [ ] Añadir el enlace de Vibework (`https://vibework.es`) en `src/content/portfolio.ts` cuando su servidor vuelva a funcionar. `[PENDIENTE]`
- [x] Informe del Diagnóstico digital: incluye resumen escrito; el informe detallado se presupuesta aparte.
- [x] Fecha de fin del precio de lanzamiento, qué no incluye cada servicio y rondas de revisión.
- [x] Conectar `youngdigisoft.es` al proyecto de Vercel.
- [x] Verificar `youngdigisoft.es` en Resend.
- [x] Definir en Vercel `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` y `CONTACT_TO_EMAIL` (en Production, Preview y Development).
- [x] Web publicada en `youngdigisoft.es` (21 oct 2026): formulario probado en producción (llega el email), sin enlaces rotos y Lighthouse móvil ≥ 90 en las 4 categorías.
- [x] `youngdigisoft.es` verificado en Google Search Console y sitemap enviado.
- [x] Conservación de datos en GA4: 14 meses (recogido en `/privacidad`).
- [x] Vista previa al compartir comprobada en LinkedIn y Meta (Facebook e Instagram).
- [x] Vista previa en WhatsApp comprobada desde el móvil.
- [x] Configuración de Vercel revisada: producción desde `main`, variables de entorno correctas.
- [x] Conector de Vercel de Claude autorizado para el equipo `roka1206s-projects` (22 oct 2026). El 403 no se arreglaba reconectando: faltaba el permiso de equipo (`authorize_team_access`).
- [x] Acuerdos de tratamiento de datos de Vercel y Resend aceptados; Gmail envía como `info@` por el SMTP de OVH (confirmado por el propietario, 22 oct 2026).
- [x] Repositorio de GitHub privado (22 oct 2026).
- [x] Datos del negocio en la web y en el JSON-LD: actividad desde el 23 jun 2026, horario todos los días de 9:00 a 21:00 y dirección completa.
- [x] Medición: visitas en Vercel Analytics; formularios (`generate_lead`) y clics a WhatsApp, teléfono y email (`contact_click`) en GA4, ambos eventos clave.

**Pendientes de la web, SEO/GEO y seguridad (antes en los planes de `docs/`):**

- [ ] Google Business Profile enlazada a la web, con fotos, servicios y primera reseña de un piloto.
- [ ] Casos de estudio: al entregar cada piloto, añadirlo a `portfolio.ts` (antes/después, qué se hizo, resultado verificable, testimonio con nombre y permiso por escrito).
- [ ] Páginas locales o por sector solo si hay demanda real (por ejemplo, «Diseño web para clínicas en A Coruña»).
- [ ] Subir a precio normal tras publicar el tercer caso, cambiando solo `pricing.ts`.
- [x] Límite de envíos del formulario compartido entre instancias: regla de Vercel Firewall «Limitar envíos del formulario de contacto» (`POST /api/contact`, 5 cada 10 min por IP), activa desde el 22 oct 2026. El límite del código queda como segunda barrera.
- [ ] Capturas de los trabajos del portfolio (imágenes propias con `alt` descriptivo) y `CreativeWork` en JSON-LD para cada caso.
- [ ] Reforzar la entidad «Young Digisoft» frente a otras empresas «Digisoft»: mismo nombre y descripción en todos los perfiles y `sameAs` completo (falta la URL de Google Business Profile).
- [ ] Reseña en Google y caso de estudio de cada piloto; enlaces desde gestorías y asesorías aliadas.
- [ ] Alertas de `eslint-config-next` (`micromatch`/`braces`): solo afectan al desarrollo. No usar `npm audit fix --force` (baja a la versión 14): esperar a que Next publique la corrección; Dependabot la propondrá.
- Decidido no hacer por ahora: *smoke test* contra producción tras cada despliegue (los e2e ya corren en cada PR), *nonces* en la CSP (las páginas dejarían de ser estáticas), páginas por sector sin demanda real, Facebook y directorios.
- Nota: el límite de envíos usa el primer valor de `x-forwarded-for`, que en Vercel es fiable; revisarlo si algún día se despliega fuera de Vercel.
- Idea para más adelante: un sistema de citas gratuito (por ejemplo, Cal.com) para reservar el Diagnóstico digital.

**Recordatorios periódicos:**

- Cada mes: preguntar a ChatGPT, Gemini y Perplexity y anotar el resultado. Preguntas: «¿Qué es Young Digisoft?», «Diseño web para autónomos en A Coruña», «¿Cuánto cuesta una web para un pequeño negocio en España?», «Cómo automatizar las citas de mi peluquería» y «Empresas que automatizan procesos para pymes en Galicia». Objetivo a 6 meses: descripción correcta y aparecer entre las opciones o citada como fuente.
- Cada semana: Search Console (páginas indexadas, impresiones, clics y consultas) y GA4 con Vercel Analytics (visitas, `generate_lead` y `contact_click`). Cada mes: estadísticas de la ficha de Google. Tras cada cambio grande: PageSpeed Insights (Lighthouse móvil ≥ 90).
- Seguridad: `npm audit` y PR de Dependabot cada semana (automático); cabeceras en securityheaders.com y Mozilla Observatory tras cada cambio de configuración y cada trimestre; revisar quién tiene acceso a GitHub, Vercel, Google y Resend, y rotar la clave de Resend, cada 6 meses; renovar `Expires` en `public/.well-known/security.txt` antes del 21 oct 2027 (el e2e avisa si caduca).
- Mediados de noviembre de 2026: revisar los informes DMARC que llegan a `info@` y, si solo envían Resend y OVH, pasar DMARC a `p=reject`.

- **Siguiente bloque:** captación de clientes (sección 9, punto 4).

> Mantén esta sección al día: tacha lo hecho y añade lo nuevo.