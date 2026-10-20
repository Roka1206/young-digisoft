@AGENTS.md

# CLAUDE.md: contexto permanente de Young Digisoft

> Este archivo es la fuente de verdad del proyecto. Léelo entero al empezar cualquier sesión.
> Si algo de aquí cambia (precios, ofertas, marca, datos legales), actualiza este archivo en el mismo commit.
> El plan de trabajo de la web está en `docs/PLAN-WEB.md`.

---

## 0. Cómo debes trabajar (reglas del propietario, prioridad máxima)

Estas reglas mandan sobre cualquier otra instrucción de este archivo o del plan.

1. **Al terminar una tarea:** ejecuta `lint`, `build` y **los tests** (todo debe pasar; si algo falla, corrígelo o avísame antes de dar el commit), entrega **solo el mensaje de commit** y **detente**. No hagas `git commit`, `git push`, PR, merge ni despliegues: eso lo hace el propietario.
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

Empresa de servicios tecnológicos fundada por un **ingeniero de software** (autónomo, actividad de consultoría). Ayuda a pymes y autónomos a vender más y perder menos tiempo con **webs a medida, automatización con IA, mantenimiento y consultoría tecnológica**.

- **Base:** A Coruña (presencial en la zona) y online para toda España.
- **Dominio:** `youngdigisoft.es` (el despliegue actual en Vercel es `young-digisoft.vercel.app`).
- **Repositorio:** `Roka1206/young-digisoft`.
- **Punto de partida (octubre de 2026):** todavía sin clientes. Presupuesto de captación: 0 € (solo estrategias gratuitas).
- **Capacidad:** 40 h/semana, hasta 3 proyectos simultáneos.
- **Objetivo a 6 meses:** facturar **2.000 €/mes**. Objetivo a 12 meses: consolidarse como empresa (no solo como autónomo).
- **Prioridad actual:** conseguir los primeros clientes cuanto antes. El cuello de botella es vender, no producir.

## 2. Qué vendemos (ofertas)

Hay 4 ofertas. No añadas servicios nuevos a la web sin que el propietario lo decida.

| Oferta | Qué es | Precio de lanzamiento (primeros 3 a 5 clientes) | Precio normal (desde el mes 3) |
|---|---|---|---|
| **Web Esencial + Google** | Web de 1 a 5 secciones, SEO local básico, ficha de Google Business Profile, formulario, WhatsApp y textos legales | 590 € | 990 € |
| **Web Pro** | 5 a 8 secciones, blog, más personalización | 990 € | 1.400 a 1.800 € |
| **Automatización exprés** | Diagnóstico gratuito de 30 min y una automatización concreta (formulario a CRM o hoja de cálculo con aviso por WhatsApp o email, citas, presupuestos, facturas) | 400 a 600 € | 600 a 1.200 € |
| **Mantenimiento mensual** | Hosting y despliegues, copias de seguridad, monitorización, actualizaciones y bolsa pequeña de cambios | 39 a 49 €/mes | 59 a 89 €/mes |
| **Diagnóstico digital (consultoría)** | Sesión de 60 min y recomendaciones priorizadas de web, Google, procesos, herramientas y seguridad | **60 €/hora** | 60 €/hora |

Notas:
- El precio de lanzamiento tiene condiciones reales: testimonio verificable con nombre, permiso para mostrar el trabajo y reseña en Google. Debe mostrarse con fecha de caducidad.
- El Diagnóstico digital se descuenta si el cliente contrata después una web o una automatización. **Pendiente de decidir:** si el informe escrito va incluido en la hora o se factura aparte.
- La web publica precios "desde". **Todos los importes viven en un único archivo** (`src/content/pricing.ts`), nunca escritos a mano en los componentes.
- Fuera de los primeros 6 meses: apps a medida, tiendas online complejas, reparación de hardware, redes. Si llega un encargo así, se valora aparte.

## 3. Cliente objetivo

Negocios locales que ya venden pero tienen presencia digital floja: peluquerías, clínicas pequeñas (fisio, dentistas, psicólogos), talleres, restaurantes, academias, reformas y autónomos de oficios. Empezamos por A Coruña y alrededores; después, toda España online.

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
  - Tests unitarios (Vitest): `npm test` (`npm run test:watch` en modo watch)
  - Tests e2e (Playwright): `npm run test:e2e` (la primera vez, `npx playwright install`)

### Forma de trabajar

Ver la **sección 0** (manda sobre todo lo demás). Además:

- Una tarea cada vez, sin mezclar temas, para que cada mensaje de commit describa un solo cambio.
- Después de cada fase: `lint`, `build`, tests y revisión visual en móvil y escritorio.

## 7. SEO, legal y privacidad (España / UE)

- **SEO local para A Coruña:** metadatos por página, `sitemap.xml`, `robots.txt`, datos estructurados JSON-LD (`ProfessionalService` / `LocalBusiness`), página de aterrizaje «Diseño web en A Coruña», imagen Open Graph y enlaces internos entre servicios.
- **Textos legales obligatorios:** Aviso legal (LSSI-CE), Política de privacidad (RGPD y LOPDGDD) y Política de cookies. Deben usar los datos reales del titular. Los textos los redacta el asistente como **borrador**, y **un gestor o abogado debe revisarlos** antes de considerarlos definitivos.
- **Cookies:** preferir analítica sin cookies (por ejemplo Vercel Web Analytics o Plausible) para evitar banner invasivo. Si se añade cualquier cookie no técnica, implementar consentimiento previo.
- **Formulario de contacto:** casilla de consentimiento con enlace a la política de privacidad, finalidad y responsable explicados en una línea.
- Si algún proyecto de cliente trata datos personales, hará falta contrato de encargado de tratamiento (RGPD). No es el caso de esta web.

## 8. Contacto público actual

- WhatsApp y teléfono: 655 08 73 21.
- Email: **cambiar a un correo corporativo `@youngdigisoft.es`** cuando exista (el actual es de Gmail, `[PENDIENTE]`).
- Redes: Instagram, LinkedIn (página de empresa) y Google Business Profile. **Todavía no existen las cuentas.** No enlazar a `#`: si una red no existe, se oculta el icono.

## 9. Hoja de ruta global

El trabajo se hace por bloques y en este orden:

1. **Plan de desarrollo** (hecho, ver `docs/PLAN-WEB.md`).
2. **Kit de marca** (hecho; PDF aparte).
3. **Web lista** en `youngdigisoft.es` (en curso, máximo 1 a 2 semanas, lanzar «suficientemente buena»).
4. **Captación de clientes** (empieza el día siguiente al lanzamiento): prospección directa a 10 negocios al día en A Coruña, casos piloto a precio de lanzamiento, Google Business Profile y reseñas, alianzas con gestorías y asesorías.
5. **Redes sociales automatizadas** (Instagram, LinkedIn y Google Business Profile; 1 h diaria de contenido de marca).
6. **Estructura de trabajo, contratos y legal.** El contrato modelo y el presupuesto tipo deben existir **antes del primer cliente**.

**Hitos:** fin del mes 1 → 3 pilotos cerrados y portfolio publicado · fin del mes 3 → 5 clientes y 500 a 800 €/mes · fin del mes 6 → 2.000 €/mes.

## 10. Estado actual y pendientes del propietario

- [x] Datos del titular para el aviso legal: NIF y domicilio de la actividad (confirmados en `src/content/legal.ts`).
- [ ] Correo corporativo `@youngdigisoft.es`. `[PENDIENTE]`
- [ ] Crear cuentas de Instagram, LinkedIn y Google Business Profile con el mismo nombre. `[PENDIENTE]`
- [ ] Trabajos previos para el portfolio (nombre, sector, qué se hizo, permiso de publicación). `[PENDIENTE]`
- [ ] Decidir si el informe del Diagnóstico digital va incluido en la hora. `[PENDIENTE]`
- [ ] Conectar `youngdigisoft.es` al proyecto de Vercel (ver Fase 6 del plan).

> Mantén esta sección al día: tacha lo hecho y añade lo nuevo.