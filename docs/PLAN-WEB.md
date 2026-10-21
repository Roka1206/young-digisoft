# PLAN-WEB.md: plan de desarrollo de la web de Young Digisoft

> Lee antes `CLAUDE.md` (contexto, marca, precios y reglas de oro). Este documento es la lista de trabajo.
> Marca cada tarea con `[x]` al terminarla, entrega el mensaje de commit y detente (reglas en `CLAUDE.md`, sección 0: no hagas commit, push ni PR).

## Objetivo

Publicar en **`youngdigisoft.es`** una web profesional que transmita confianza y convierta visitas en solicitudes de presupuesto o reservas de diagnóstico. Debe estar lista en **1 a 2 semanas** y lanzarse «suficientemente buena»: se mejora después con datos reales.

**La web debe:**
1. Dejar claro en 5 segundos qué hacemos, para quién y desde dónde.
2. Presentar las 4 ofertas con precios «desde» y plazos claros.
3. Generar confianza sin inventar nada (portfolio real, precio cerrado, soporte, proceso transparente).
4. Facilitar el contacto en un clic (WhatsApp, formulario, reserva de diagnóstico).
5. Posicionar en Google para búsquedas de diseño web y servicios digitales para pymes en toda España.
6. Cumplir la normativa española y europea (LSSI, RGPD, cookies).

**Criterios de éxito (definición de terminado):**
- Lighthouse ≥ 90 en Rendimiento, Accesibilidad, Buenas prácticas y SEO (móvil).
- Contraste WCAG AA en todos los textos.
- Formulario de contacto funcionando de extremo a extremo.
- Cero testimonios o datos inventados. Cero enlaces a `#` o a páginas inexistentes.
- Los tres textos legales publicados con los datos reales del titular.
- Dominio `youngdigisoft.es` sirviendo la web con HTTPS.

---

## Fase 0: Auditoría del código actual (no cambies nada aún)

Objetivo: conocer qué hay antes de tocarlo. Entrega un resumen corto en el chat.

- [x] Instalar dependencias y comprobar que el proyecto compila (`build`) y pasa `lint`. Anotar en `CLAUDE.md` (sección 6) los comandos reales.
- [x] Listar versión de Next.js, uso de App Router o Pages Router, estilos (Tailwind u otro), dependencias y estructura de carpetas.
- [x] Revisar la web actual: secciones, textos, formulario (¿envía algo? ¿a dónde?), enlaces rotos (`#`), metadatos, páginas legales y accesibilidad.
- [ ] Confirmar cómo está conectado a Vercel (rama de producción, variables de entorno existentes). `[PENDIENTE: el conector de Vercel da 403 en el equipo roka1206s-projects; revisarlo en el panel de Vercel]`
- [x] Comprobar si hay ejecutor de tests. Si no lo hay, proponer uno (por ejemplo Vitest) y **preguntar antes de instalarlo**. Anotar el comando de tests en `CLAUDE.md`.
- [x] Decidir y proponer: **reutilizar la base** o **reescribir los componentes**, conservando el repositorio y su historial. Esperar confirmación del propietario antes de la Fase 1.

## Fase 1: Cimientos de marca y estructura (día 1 a 2)

- [x] Tokens de marca: paleta de `CLAUDE.md` como tema de Tailwind (`brand`, `brand-fg`, `action`, `ink`, `mist`, `muted`).
- [x] Tipografías con `next/font`: Inter y JetBrains Mono.
- [x] Logo: colocar `logo_digisoft.png` en `/public/brand/`, vectorizarlo a SVG (símbolo `>_` sobre turquesa), generar favicon, `apple-touch-icon` y versión horizontal «símbolo + Young Digisoft».
- [x] Layout global: cabecera (logo, navegación, botón «Hablemos»), pie (contacto, legales, redes existentes) y botón flotante de WhatsApp.
- [x] Estructura de contenido tipado en `src/content/`: `site.ts` (nombre, descriptor, contacto), `services.ts`, `pricing.ts`, `faq.ts`, `portfolio.ts` (vacío al principio).
- [x] Componentes base: `Button`, `Section`, `Card`, `Container`, `Badge`, `FaqItem`, `PriceCard`.

## Fase 2: Páginas y contenido (día 2 a 5)

### Mapa del sitio

| Ruta | Propósito |
|---|---|
| `/` | Inicio: propuesta de valor, ofertas, proceso, FAQ y llamada a la acción |
| `/servicios/web` | Web Esencial + Google y Web Pro |
| `/servicios/automatizacion` | Automatización exprés con IA |
| `/servicios/mantenimiento` | Mantenimiento mensual |
| `/servicios/diagnostico-digital` | Consultoría: Diagnóstico digital (60 €/hora) |
| `/portfolio` | Casos reales (solo si hay al menos 1 caso real) |
| `/contacto` | Formulario, WhatsApp, teléfono y zona de servicio |
| `/aviso-legal`, `/privacidad`, `/cookies` | Textos legales |

### Portada (`/`), orden de secciones

1. **Hero.** Titular: «Tecnología que trabaja para tu negocio.» Subtítulo: «Webs, automatización y consultoría para pymes y autónomos. Precio cerrado, plazo claro y trato directo. Desde A Coruña, para toda España.» Dos botones: **Pide presupuesto** (principal) y **Reserva un diagnóstico** (secundario).
2. **Problemas que resolvemos** (3 tarjetas): «No me encuentran en Google», «Pierdo tiempo con tareas repetitivas», «No sé qué herramientas necesito».
3. **Nuestras 4 ofertas** con precio «desde», qué incluye y plazo.
4. **Cómo trabajamos** (4 pasos): hablamos → propuesta con precio cerrado → lo construimos y lo revisas → lo publicamos y te damos soporte.
5. **Por qué Young Digisoft:** ingeniería de software real (código propio, no plantillas pesadas), precio cerrado, trato directo, toda España con sede en A Coruña.
6. **Portfolio** (condicional): se muestra solo si `portfolio.ts` tiene casos con permiso de publicación.
7. **Preguntas frecuentes:** ¿cuánto tarda?, ¿qué incluye el precio?, ¿el dominio y el hosting son míos?, ¿qué pasa después de publicar?, ¿trabajáis fuera de A Coruña?
8. **Cierre con llamada a la acción** y botón de WhatsApp.

### Reglas de contenido

- Cada oferta: para quién es, qué incluye, qué no incluye, plazo estimado, precio «desde», cuántas rondas de revisión y llamada a la acción.
- Lenguaje claro, en plural de empresa y de tú. Sin superlativos ni promesas de resultados garantizados.
- **Precio de lanzamiento:** mostrarlo con etiqueta clara y fecha de caducidad `[PENDIENTE: fecha]`, leyendo los importes de `pricing.ts`.
- **Portfolio:** estructura en `portfolio.ts` (nombre, sector, qué se hizo, tecnologías, resultado verificable, enlace, permiso). Hasta que el propietario aporte casos reales, la sección no se renderiza. **No generes casos ficticios.**
- **Testimonios:** eliminar los actuales. No añadir ninguno hasta tener opiniones reales con nombre y permiso.
- Redes sociales: mostrar solo las que ya existan. Si no hay cuenta, ocultar el icono.

## Fase 3: Formulario de contacto y conversión (día 4 a 6)

- [x] Formulario con nombre, email, teléfono (opcional), servicio de interés, mensaje y **casilla de consentimiento** con enlace a la política de privacidad.
- [x] Validación con zod en cliente y servidor, campo honeypot y límite de envíos por IP.
- [x] Envío por una ruta de servidor a un servicio de email transaccional (propuesta: Resend, nivel gratuito). Variables de entorno: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. **Nunca subir claves al repositorio.** Las tres son obligatorias: el código no tiene direcciones por defecto.
- [x] Estados claros: enviando, enviado con éxito (sin plazo concreto, por decisión del propietario), error con alternativa por WhatsApp.
- [x] **Tests obligatorios** de la validación y de la ruta de envío: datos válidos, campos inválidos, consentimiento sin marcar, honeypot relleno, límite de envíos y fallo del servicio de email.
- [x] Botón de WhatsApp con mensaje prellenado según la página de origen (en las páginas de servicio nombra el servicio).
- [x] Enlace «Reservar diagnóstico» que lleve al formulario o a WhatsApp con el servicio preseleccionado. `[PENDIENTE: valorar un sistema de citas gratuito como Cal.com más adelante]`.

## Fase 4: SEO local y técnico (día 5 a 7)

- [x] Metadatos únicos por página (`title`, `description`, canonical) y Open Graph con imagen de marca.
- [x] `sitemap.xml` y `robots.txt` generados desde Next.js.
- [x] Datos estructurados JSON-LD: `ProfessionalService` (sede en la provincia de A Coruña, zona de servicio toda España, contacto, logotipo y redes), `Service` con precios «desde» en cada página de servicio y `FAQPage` donde aparecen las preguntas frecuentes.
- [x] Página de «Diseño web» para toda España: en lugar de una página local de A Coruña, `/servicios/web` se titula «Diseño web para pymes y autónomos» y suma para qué negocios es, cómo te ayudamos a aparecer en Google y preguntas propias (con `FAQPage`).
- [x] Enlazado interno entre servicios y contacto (columna «Servicios» en el pie); texto alternativo en imágenes; una sola etiqueta `h1` por página.
- [x] Rendimiento: fuentes con `next/font`, animaciones en CSS (sin la librería `motion`) y banner de cookies renderizado en el servidor. `[PENDIENTE: confirmar Lighthouse ≥ 90 con PageSpeed Insights tras desplegar]`
- [x] Analítica: Vercel Web Analytics (sin cookies) y Google Analytics 4 solo tras aceptar el banner de cookies, con «Configurar cookies» en el pie. `[PENDIENTE: plazo de conservación de datos configurado en GA4, para /privacidad]`

## Fase 5: Páginas legales (día 6 a 7)

- [ ] Redactar como **borrador** `/aviso-legal`, `/privacidad` y `/cookies` adaptados a esta web, usando los datos reales del titular. Hasta tenerlos, dejar `[PENDIENTE]` visibles en el borrador, no inventar.
  - Datos del titular que hacen falta: nombre completo, NIF, domicilio de la actividad, email y teléfono de contacto.
- [ ] Política de privacidad: responsable, finalidad (atender solicitudes), base legal (consentimiento), conservación, destinatarios (proveedor de email y de hosting), derechos y cómo ejercerlos.
- [ ] Política de cookies coherente con lo que realmente usa la web.
- [ ] Enlaces a los tres textos en el pie y junto al formulario.
- [ ] Recordar al propietario que **un gestor o abogado debe revisar estos textos** antes de darlos por definitivos.

## Fase 6: Dominio `youngdigisoft.es` y despliegue (día 7)

Pasos de Claude Code (repositorio y configuración) y pasos manuales del propietario.

- [ ] **Propietario:** hacer el push y revisar el preview de Vercel con todo lo anterior.
- [x] **Propietario:** en Vercel (proyecto), añadir los dominios `youngdigisoft.es` y `www.youngdigisoft.es`, y copiar en el registrador los registros DNS que Vercel indique (normalmente `A` para el dominio raíz y `CNAME` para `www`).
- [x] Configurar `www` para redirigir al dominio raíz (o al revés, pero uno solo como canónico) y comprobar HTTPS.
- [x] Añadir redirección permanente `young-digisoft.vercel.app` a `youngdigisoft.es`.
- [x] Definir `metadataBase` y URLs canónicas con el dominio nuevo.
- [x] **Propietario:** crear el correo corporativo `info@youngdigisoft.es` y usarlo en `site.ts`, el formulario y los textos legales. Dominio verificado en Resend.
- [ ] **Propietario:** dar de alta el dominio en Google Search Console y enviar el sitemap.

## Fase 7: Control de calidad y lanzamiento (día 7 a 8)

- [ ] `lint`, `build` y todos los tests sin errores ni avisos relevantes.
- [ ] Revisión en móvil (375 px), tableta y escritorio. Navegación completa con teclado.
- [ ] Lighthouse ≥ 90 en las 4 categorías (móvil). Corregir lo necesario.
- [ ] Comprobación de contraste de todos los textos (AA). Recordar: texto blanco sobre `#00ADB5` no pasa; usar `action`.
- [ ] Probar el formulario real (recepción del email y mensaje de confirmación) y todos los enlaces (sin `#`, sin 404).
- [ ] Verificar que no queda ningún testimonio, cifra o caso inventado, y que ningún `[PENDIENTE]` sale publicado salvo acuerdo del propietario.
- [ ] Publicar en producción y revisar `sitemap.xml`, `robots.txt`, metadatos y la vista previa al compartir en WhatsApp y LinkedIn.
- [ ] Actualizar la sección 10 de `CLAUDE.md` (estado actual y pendientes).

---

## Después del lanzamiento (siguiente bloque: captación)

La captación empieza al día siguiente. La web debe apoyarla con:

- [ ] **Google Business Profile** enlazado a la web, con fotos, servicios y primera reseña de un piloto.
- [ ] **Casos de estudio:** al entregar cada piloto, añadirlo a `portfolio.ts` (antes/después, qué se hizo, resultado verificable, testimonio con nombre y permiso por escrito).
- [ ] **Páginas locales adicionales** solo si hay demanda real (por ejemplo, «Diseño web para clínicas en A Coruña»).
- [ ] **Subir a precio normal** tras publicar el tercer caso, actualizando solo `pricing.ts`.
- [ ] **Medición:** número de visitas, solicitudes de presupuesto y clics a WhatsApp (con analítica sin cookies) para decidir qué mejorar.

## Orden de trabajo sugerido para la primera sesión

1. Lee `CLAUDE.md` y este plan.
2. Ejecuta la **Fase 0** y resume lo encontrado.
3. Propón en 5 líneas si se reutiliza la base o se reescribe, y espera confirmación.
4. Después, avanza fase a fase y tarea a tarea: explica el cambio en pocas líneas, hazlo, entrega el mensaje de commit y detente. No saltes la revisión del propietario al final de cada fase.