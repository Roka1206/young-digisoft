# PLAN-SEO-GEO.md: análisis y plan de mejora de SEO y GEO

> Análisis del 21 de octubre de 2026 sobre `https://youngdigisoft.es` (9 páginas) y el código del repositorio.
> Herramientas: skills `searchfit-seo:seo-audit` y `searchfit-seo:ai-visibility`, rastreo propio de producción, PageSpeed Insights, Google Search Console, LinkedIn Post Inspector y el depurador de Meta.
> **GEO** (Generative Engine Optimization): aparecer y ser citado en respuestas de asistentes de IA (ChatGPT, Gemini, Perplexity, Claude, AI Overviews de Google).
> Reglas de `CLAUDE.md` que mandan aquí: nada de datos, reseñas ni casos inventados; nada de promesas de posicionamiento; todo dato que falte es `[PENDIENTE]`.

---

## 1. Resumen

| Área | Nota | Comentario |
|---|---|---|
| SEO técnico | 95/100 | Indexable, rápido, metadatos y datos estructurados en todas las páginas |
| SEO on-page y contenido | 60/100 | Títulos mejorables, `h1` de portada sin palabra clave, páginas de servicio cortas, sin blog |
| SEO local | 45/100 | Sin Google Business Profile, sin directorios locales, sin reseñas |
| Autoridad (enlaces y menciones) | 10/100 | Web nueva: casi sin enlaces externos ni menciones de la marca |
| Visibilidad en IA (GEO) | 10/100 | Un buscador web no devuelve nada para «Young Digisoft»; el nombre se confunde con otras empresas «Digisoft» |
| **Global** | **~65/100** | Base técnica excelente; el trabajo pendiente es de **contenido, local y autoridad**, no de código |

La web está lista para posicionar, pero hoy Google y las IA tienen **muy poca información** sobre la empresa: pocas páginas, poco texto en los servicios y ninguna fuente externa que la mencione. Eso es lo que hay que construir.

## 2. Qué está bien (no tocar)

- `robots.txt` permite todo y apunta al sitemap; `sitemap.xml` lista las 9 páginas con el dominio de producción.
- Robots de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) reciben la página con 200: no están bloqueados.
- HTML renderizado en el servidor: el contenido se lee sin JavaScript (bueno para Google y para los robots de IA).
- Título, descripción, canonical, Open Graph y Twitter Card únicos en cada página. `lang="es"` y `viewport` correctos.
- Un solo `h1` por página y jerarquía `h2 > h3` sin saltos.
- JSON-LD: `ProfessionalService` (con `@id`, contacto, `areaServed` y `sameAs`), `Service` con precios «desde» y `FAQPage` en portada y `/servicios/web`.
- Lighthouse móvil ≥ 93 en Rendimiento y 100 en Accesibilidad, Prácticas recomendadas y SEO.
- Redirecciones `www`, `http` y `vercel.app` con 308 al dominio canónico; 404 real en rutas inexistentes.
- Search Console: propiedad de dominio verificada, sitemap enviado y portada indexada.
- FAQ honesta («No: nadie puede garantizarlo») que además es contenido muy citable por IA.

## 3. Hallazgos

### 3.1 Importantes

- [ ] **Sin Google Business Profile.** Para negocios locales es la mayor fuente de visibilidad en Google Maps y en el «paquete local», y una fuente que usan Gemini y los AI Overviews. Ya está en la hoja de ruta; es la acción de más impacto. → Propietario.
- [ ] **Páginas de servicio con poco contenido.** `/servicios/automatizacion` (≈230 palabras), `/servicios/mantenimiento` (≈200) y `/servicios/diagnostico-digital` (≈215) frente a ≈490 de `/servicios/web`. Les falta «para quién es», ejemplos concretos, proceso y preguntas frecuentes propias. Google y las IA no tienen de dónde sacar respuestas. → `src/content/services.ts`, `src/content/faq.ts`.
- [ ] **Marca ambigua para buscadores e IA.** Existen varias empresas «Digisoft» (Irlanda, India, EE. UU.). Hay que reforzar la entidad: nombre completo siempre «Young Digisoft», mismo texto descriptivo en todos los perfiles, `sameAs` completo y datos del fundador.

### 3.2 Avisos

- [x] **`h1` de la portada sin palabra clave.** Es el lema («Tecnología que trabaja para tu negocio.»). Propuesta: `h1` = «Desarrollo web y automatización para pymes y autónomos» (el descriptor) y el lema como texto destacado. → `src/components/sections/Hero.tsx:20`, `src/content/site.ts`. Hecho: el lema va en el badge del hero.
- [x] **Título de la portada largo (71 caracteres):** Google lo corta hacia los 60. Propuesta: «Diseño web y automatización para pymes | Young Digisoft» (≈55). → `src/app/layout.tsx:41` y `src/content/site.ts`.
- [x] **Títulos de servicio poco descriptivos.** «Mantenimiento mensual — Young Digisoft» no dice de qué. Propuestas: «Mantenimiento web mensual para pymes», «Automatización de tareas para pymes y autónomos», «Diagnóstico digital para negocios: sesión de 60 min». Hoy el título sale del nombre del servicio: añadir un campo `metaTitle` opcional. → `src/content/services.ts`, `src/app/servicios/[slug]/page.tsx`. Hecho con el campo `headline`, que ya existía y sirve también de `h1`: «Automatización de tareas para pymes», «Mantenimiento web mensual para pymes» y «Diagnóstico digital para tu negocio».
- [x] **Descripciones cortas** en `/contacto` (se publicará con 118 caracteres), `/servicios/mantenimiento` (123) y `/aviso-legal` (111). Objetivo: 140 a 160 caracteres. Hecho: mantenimiento 148 y aviso legal 149; contacto se queda en 118.
- [x] **`lastmod` del sitemap = fecha del build** en todas las URLs. Google ignora `lastmod` si no es fiable. Mejor una fecha real por página (o quitarlo). → `src/app/sitemap.ts:7`, `src/lib/sitemap.ts`.
- [x] **Sin `BreadcrumbList`** en las páginas de servicio. Ayuda a que Google muestre la ruta «Inicio › Servicios › …». → `src/app/servicios/[slug]/page.tsx`.
- [ ] **Los `h2` del pie** («Navegación», «Servicios», «Contacto») aparecen como encabezados en todas las páginas. No es un error, pero diluye el esquema de la página. Opción: `<p>` con el mismo estilo, o dejarlo así. → `src/components/layout/Footer.tsx:22,31,44`.
- [ ] **Search Console detecta 4 de 9 páginas en el sitemap** (enviado el 20 oct con una versión anterior). Reenviarlo. → Propietario.

### 3.3 Oportunidades

- [x] **`llms.txt`** en la raíz: un resumen en texto plano de quiénes somos, servicios, precios «desde», zona y contacto, con enlaces a cada página. Lo leen algunos asistentes y agentes de IA; coste mínimo. → `src/app/llms.txt/route.ts` generado desde `src/content/`.
- [x] **Enriquecer el JSON-LD de `ProfessionalService`:** `founder` (`Person`: Ronald Fonseca, ingeniero de software, con LinkedIn personal `[PENDIENTE: URL]`), `knowsAbout` (diseño web, SEO local, automatización, Next.js…), `priceRange`, `slogan`, `foundingDate` `[PENDIENTE]` y `openingHours` `[PENDIENTE]`. → `src/lib/structured-data.ts`. Hecho: `founder` con LinkedIn, `knowsAbout` y `slogan`. Sin `priceRange` (solo admite una franja subjetiva tipo «€€»; los precios reales ya van en cada `Service`). Faltan `foundingDate` y `openingHours`.
- [ ] **`FAQPage` en cada página de servicio** con 3 a 5 preguntas reales por servicio (precio, plazo, qué necesito aportar, qué pasa si…). Las IA citan mucho las FAQ.
- [ ] **Blog / guías** (la oferta Web Pro incluye blog; la propia web no lo tiene). Artículos que respondan preguntas exactas de dueños de negocio, ver §5.
- [ ] **Página «Sobre nosotros»**: quién está detrás, experiencia real, forma de trabajar. Es la señal de confianza (E-E-A-T) que más falta y la que las IA usan para describir una empresa. Solo con datos reales del propietario.
- [ ] **Portfolio y casos de estudio** en cuanto haya pilotos (ya previsto en `portfolio.ts`): con `CreativeWork` o `Article` en JSON-LD.
- [ ] **Páginas por sector** solo cuando haya un caso real del sector (por ejemplo «Webs para clínicas de fisioterapia»), como ya dice `PLAN-WEB.md`.
- [ ] **Imágenes propias.** La web no tiene ninguna imagen de contenido: capturas de trabajos o una foto del fundador ayudan a Google Imágenes y a la confianza. Con `next/image` y `alt` descriptivo.

## 4. GEO: cómo hacer que las IA conozcan y citen a Young Digisoft

**Situación:** la web es nueva y no hay fuentes externas. Un buscador web no devuelve ningún resultado para «Young Digisoft» y sí devuelve otras empresas «Digisoft». No se ha podido consultar directamente a ChatGPT, Gemini o Perplexity; se recomienda que el propietario lo haga una vez al mes con las preguntas de la tabla y apunte el resultado.

| Pregunta a probar en ChatGPT, Gemini y Perplexity | Hoy (estimado) | Objetivo a 6 meses |
|---|---|---|
| «¿Qué es Young Digisoft?» | No la conoce o la confunde | Descripción correcta |
| «Diseño web para autónomos en A Coruña» | No aparece | Aparece entre las opciones |
| «¿Cuánto cuesta una web para un pequeño negocio en España?» | No aparece | Citada como fuente (FAQ y guía de precios) |
| «Cómo automatizar las citas de mi peluquería» | No aparece | Citada como fuente (guía) |
| «Empresas que automatizan procesos para pymes en Galicia» | No aparece | Aparece entre las opciones |

**Competidores** (búsqueda del 21 oct 2026; precios según sus propias webs, sin verificar):

| Competidor | Qué ofrece | Por qué importa |
|---|---|---|
| [Nerade](https://nerade.com/diseno-web-coruna/) | Webs WordPress en A Coruña con precio cerrado, desde 350 € (sin IVA) | Mismo mensaje de «precio cerrado» y precio de entrada más bajo: diferenciarse por código propio, rendimiento y automatización |
| [Cantonce](https://www.cantonce.es/provincias/a-coruna.html) | Freelance, webs desde 300 €, presupuesto en 24 h | Compite en precio y rapidez de respuesta |
| [Beedigital](https://www.beedigital.es/productos/diseno-web/a-coruna/) | Web y presencia digital por cuota mensual (desde 79,90 €/mes) | Modelo de suscripción: comparar con Web Esencial + Mantenimiento |
| [Lapriex Digital](https://lapriexdigital.com/blog/cuanto-cuesta-web-a-coruna-2026/) | Agencia; su guía «¿Cuánto cuesta una página web en A Coruña? Precios 2026» posiciona | Competidor de **contenido**: confirma que la guía de precios de §5 tiene demanda |
| [SEO Galicia](https://seogalicia.es/paginas-web), [Agencia Pronoia](https://agenciapronoia.com/diseno-web-coruna/), [Dvesign](https://dvesign.com/diseno-web-la-coruna/), [Cristina Ferrís](https://cristinaferris.com/diseno-web-coruna/) | Diseño web local con páginas «Diseño web Coruña» | Ocupan la búsqueda local: competir con ficha de Google, reseñas y guías, no con otra página genérica |
| IngenioLab, Javadex (n8n, agentes IA) | Automatización e IA para pymes en A Coruña o en remoto | Competencia directa de Automatización exprés; Javadex también ofrece auditoría gratuita de 30 min |

Directorios donde aparecen y donde conviene darse de alta: [Páxinas Galegas](https://www.paxinasgalegas.es/dise%C3%B1o-paginas-web-a-coru%C3%B1a-2385ep_31ay.html) y [Proveedores.com](https://proveedores.com/diseno-web/a-coruna).

**Diferenciación a reforzar en el contenido:** código propio (no WordPress), web rápida medida (Lighthouse ≥ 90), precio cerrado con lo que no incluye por escrito, automatización además de la web, y el dominio y el hosting a nombre del cliente.

**Idea de contenido a verificar:** ayudas a la digitalización para autónomos y pymes en Galicia (Bono Autónomo de la Xunta, Kit Digital). Solo con datos de la convocatoria oficial vigente `[PENDIENTE: verificar en xunta.gal y acelerapyme.gob.es]`.

**Qué mueve la aguja (por orden):**

1. **Fuentes externas coherentes**, que es lo que más pesa en las IA: Google Business Profile, LinkedIn de empresa y personal, Instagram, y directorios gratuitos de la zona (Páxinas Galegas, Proveedores.com, Cylex, QDQ, Páginas Amarillas). Mismo nombre, descripción, teléfono y web en todos.
2. **Reseñas reales** en Google de los pilotos (ya está en las condiciones del precio de lanzamiento).
3. **Contenido que responde preguntas exactas**, con frases claras y datos verificables que una IA pueda citar (precios «desde», plazos, qué incluye). Tablas y listas antes que párrafos de marketing.
4. **Menciones en terceros:** alianzas con gestorías y asesorías (ya en la hoja de ruta) con enlace a la web; colaboraciones o entrevistas en medios locales; respuestas útiles en foros y grupos de autónomos, sin spam.
5. **Señales técnicas** (§3.3): `llms.txt`, JSON-LD enriquecido con fundador y `sameAs` completo.

## 5. Contenido a crear (en orden)

Cada pieza responde a una búsqueda o pregunta concreta. Sin cifras inventadas: los precios salen de `pricing.ts` y los ejemplos, de trabajos reales.

- [ ] **Guía: «¿Cuánto cuesta una página web para un pequeño negocio en 2026?»** Qué influye en el precio, rangos «desde» propios, qué preguntar antes de contratar. Objetivo: búsquedas de precio y la pregunta 3 de la tabla.
- [ ] **Guía: «Cómo aparecer en Google Maps con tu negocio: ficha de Google paso a paso».** Encaja con Web Esencial + Google.
- [ ] **Guía: «5 tareas que un pequeño negocio puede automatizar»** (citas, presupuestos, avisos por WhatsApp, facturas). Encaja con Automatización exprés.
- [ ] **Guía: «Qué incluye el mantenimiento de una web y cuándo lo necesitas».**
- [ ] **Página «Sobre nosotros».** `[PENDIENTE: datos reales del fundador, trayectoria y foto]`
- [ ] **Casos de estudio** de cada piloto, con permiso por escrito.

Formato: `/guias/[slug]` con `Article` en JSON-LD, autor (`Person`), fecha de publicación y de actualización, enlaces internos al servicio relacionado y una sola llamada a la acción.

## 6. Plan por fases

### Fase A: ajustes rápidos (1 a 2 días, solo código)

- [x] `h1` de la portada con palabra clave y lema como subtítulo.
- [x] Títulos y descripciones de portada y servicios (longitudes de §3.2).
- [x] `BreadcrumbList` en servicios.
- [x] `lastmod` real o sin `lastmod` en el sitemap.
- [x] `llms.txt` generado desde `src/content/`.
- [x] JSON-LD enriquecido (`founder`, `knowsAbout`, `priceRange`, `slogan`) con los datos que haya; el resto `[PENDIENTE]`. Hecho salvo `priceRange` (ver §3.3).
- [x] Tests: el `llms.txt`, el sitemap y el JSON-LD nuevos llevan su test (regla 5 de `CLAUDE.md`).

### Fase B: presencia local (semana 1 a 2, propietario)

- [ ] Crear y completar Google Business Profile: categoría «Diseñador de sitios web», servicios con precios «desde», zona de servicio, horario, fotos y enlace a la web. Después añadir su URL a `sameAs`.
- [ ] Alta en 4 a 6 directorios gratuitos con datos idénticos (NAP: nombre, dirección o zona, teléfono).
- [ ] Reenviar el sitemap en Search Console.
- [ ] Página de Facebook (si se crea) y su URL en `sameAs` y en el pie.

### Fase C: contenido (mes 1 a 3)

- [ ] Ampliar las tres páginas de servicio cortas hasta ≈450 palabras útiles, cada una con su FAQ y `FAQPage`.
- [ ] Sección `/guias` con las 4 guías de §5 (1 cada 2 semanas).
- [ ] Página «Sobre nosotros» con datos reales.

### Fase D: autoridad y GEO (continuo, desde el mes 1)

- [ ] Reseña en Google de cada piloto.
- [ ] Caso de estudio publicado por piloto.
- [ ] Enlaces desde gestorías y asesorías aliadas.
- [ ] Revisión mensual de la tabla de §4 en ChatGPT, Gemini y Perplexity.

## 7. Medición

| Indicador | Herramienta | Frecuencia |
|---|---|---|
| Páginas indexadas, impresiones, clics y consultas | Google Search Console | Semanal |
| Visitas y origen, solicitudes de contacto (`generate_lead`) | GA4 y Vercel Web Analytics | Semanal |
| Llamadas, clics a la web y búsquedas de la ficha | Google Business Profile | Mensual |
| Menciones en IA (tabla de §4) | Prueba manual | Mensual |
| Lighthouse móvil ≥ 90 | PageSpeed Insights | Tras cada cambio grande |

## 8. Datos que faltan del propietario

- Competidores: recogidos en §4.
- LinkedIn del fundador (Ronald Fonseca): <https://www.linkedin.com/in/rfonsecah92>.
- Guías: se montan con MDX (`@next/mdx`), aprobado por el propietario.
- `[PENDIENTE]` URL de Google Business Profile y de Facebook (cuando existan).
- `[PENDIENTE]` Trayectoria resumida y foto del fundador (para «Sobre nosotros»; el propietario la aporta más adelante).
- `[PENDIENTE]` Fecha de inicio de la actividad y horario de atención.
- `[PENDIENTE]` Decidir si se publica la dirección completa en el JSON-LD (hoy solo la provincia; es un domicilio de autónomo).
