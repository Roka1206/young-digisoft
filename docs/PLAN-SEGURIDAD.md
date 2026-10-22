# PLAN-SEGURIDAD.md: análisis y plan de mejora de seguridad y testing

> Análisis del 21 de octubre de 2026 sobre `https://youngdigisoft.es` y el código del repositorio (rama `development`).
> Herramientas: skill `security-review` (criterios aplicados a todo el código, no solo al diff), `engineering:testing-strategy`, `npm audit`, y pruebas contra producción (cabeceras, API del formulario, mapas de código, optimizador de imágenes).
> Superficie de ataque: web pública sin cuentas de usuario ni base de datos. Lo único que recibe datos es `POST /api/contact`, que envía un email con Resend. Los activos a proteger son la reputación del dominio (que no se use para spam), la clave de Resend, los datos del formulario y las cuentas del propietario (GitHub, Vercel, Google, Resend, registrador del dominio).

---

## 1. Resumen

| Prioridad | Hallazgo | Acción |
|---|---|---|
| **Crítica** | Next.js 16.3.5 tiene vulnerabilidades publicadas: RCE en `next/og` `ImageResponse` (la web lo usa en `opengraph-image.tsx`) y SSRF en el optimizador de imágenes (`/_next/image` responde 200 en producción) | Actualizar a `next@16.3.8` (parche, sin cambios de API) |
| Media | Sin cabeceras de seguridad: CSP, protección contra *clickjacking*, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` | Añadirlas en `next.config.ts` |
| Media | Campos del formulario sin longitud máxima, `service` acepta cualquier texto y `name` (va en el asunto del email) admite saltos de línea | Endurecer `contact-schema.ts` |
| Baja | 466 archivos de `.pnpm-runner/` (48 MB, binarios de terceros) siguen en git tras migrar a npm | Sacarlos del repositorio y añadirlos a `.gitignore` (con permiso del propietario) |
| Baja | Límite de envíos en memoria por instancia y sin comprobar el origen de la petición | Mejora opcional (ya anotada en `PLAN-WEB.md`) |
| Baja | CI sin auditoría de dependencias, sin Dependabot, sin `permissions` mínimos y con acciones en Node 20 (obsoleto) | Endurecer `.github/workflows/ci.yml` |
| Info | Sin `/.well-known/security.txt` | Añadirlo |

**Nota global: 70/100.** El código de la aplicación está bien hecho (validación en servidor, honeypot, email en texto plano, JSON-LD escapado, GA4 tras consentimiento). Lo que baja la nota es la **dependencia desactualizada** y la **falta de cabeceras**, ambas fáciles de corregir.

## 2. Qué está bien (no tocar)

- **Sin secretos en el repositorio:** `.env*` está en `.gitignore` (solo se versiona `.env.example`); las claves viven en Vercel.
- **Validación en servidor con zod** antes de cualquier efecto; los errores devuelven mensajes genéricos (sin trazas ni detalles internos). El fallo de Resend se registra en el servidor y el cliente recibe un 502 genérico.
- **Email en texto plano** (`src/lib/email.ts`): no hay HTML, así que no hay inyección de HTML ni de enlaces en el correo. Destinatario y remitente fijos por variable de entorno: el formulario no puede usarse para enviar a terceros.
- **Honeypot** que responde «ok» sin enviar nada, para no dar pistas a los bots.
- **`dangerouslySetInnerHTML` solo en dos sitios seguros:** el JSON-LD escapa `<` (`src/lib/structured-data.ts:67`) y el script del banner es una cadena fija sin datos externos (`src/lib/cookie-consent-script.ts`).
- **GA4 solo tras aceptar** y con borrado de cookies `_ga` al retirar el consentimiento; el evento `generate_lead` no envía datos personales.
- **HTTPS con HSTS** (`max-age` de 2 años) y redirecciones 308 al dominio canónico.
- **Sin mapas de código públicos** (`.map` devuelve 403) y `GET /api/contact` responde 405.
- **Tests obligatorios del formulario** ya existen (`src/app/api/contact/route.test.ts`): válido, inválido, no JSON, sin consentimiento, honeypot, límite de envíos y fallo del email.

## 3. Hallazgos en detalle

### 3.1 Crítica: actualizar Next.js

`npm audit` (21 oct 2026) sobre `next@16.3.5`:

| Aviso | Gravedad | Rango afectado | ¿Afecta a esta web? |
|---|---|---|---|
| [GHSA-vcvr-r3jv-pc5j](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j) RCE en `next/og` `ImageResponse` | Crítica | `>=16.2.0 <16.3.6` | Usamos `ImageResponse` en `src/app/opengraph-image.tsx`. Se genera sin datos del usuario, lo que reduce el riesgo, pero no hay que depender de eso |
| [GHSA-cjq9-62q9-8jv4](https://github.com/advisories/GHSA-cjq9-62q9-8jv4) SSRF en Image Optimization | Alta | `<16.3.8` | `/_next/image` está activo en producción aunque la web no usa imágenes |
| [GHSA-f87g-xv8r-7p7x](https://github.com/advisories/GHSA-f87g-xv8r-7p7x) Fuga de información en rutas de imágenes de metadatos | Moderada | `<16.3.8` | Tenemos rutas de imágenes de metadatos (`opengraph-image`, `icon`) |
| GHSA-4jqv-mc3x-m676, GHSA-mcj8-r9mp-w47p, GHSA-3w37-wq28-93x7, GHSA-39w2-rjm5-chcv | Moderada / baja | `<16.3.8` | Caché en servidores propios, `use cache` con Draft Mode o servidor de desarrollo: no aplican en Vercel, se corrigen igualmente |

- [x] **Acción:** `npm install next@16.3.8` (misma versión menor, sin cambios de API) y, si existe la misma versión, `eslint-config-next@16.3.8`. Después, `format:check`, `lint`, `typecheck`, tests, build y e2e.
- [ ] Las alertas de `eslint-config-next` → `micromatch`/`braces` son de **desarrollo** (DoS por patrones anidados al hacer lint), no llegan a producción. `npm audit fix --force` propone bajar a la versión 14: **no hacerlo**. Esperar a que Next publique la corrección.
- [x] Opcional: desactivar el optimizador de imágenes mientras no se use (`images: { unoptimized: true }`) para cerrar esa superficie del todo. Hecho el 22 oct 2026: `/_next/image` responde 404. Si algún día se usa `next/image`, quitarlo.

### 3.2 Media: cabeceras de seguridad

Producción hoy solo envía `Strict-Transport-Security`. Faltan:

| Cabecera | Valor propuesto | Para qué |
|---|---|---|
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://vitals.vercel-insights.com; img-src 'self' data: https://*.google-analytics.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; font-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests` | Limita de dónde se cargan scripts y a dónde se envían datos; bloquea incrustar la web en otra (*clickjacking*) |
| `X-Content-Type-Options` | `nosniff` | Evita que el navegador interprete archivos con otro tipo |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | No filtra rutas completas a otros sitios |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), browsing-topics=()` | Desactiva APIs que la web no usa |
| `X-Frame-Options` | `DENY` | Respaldo de `frame-ancestors` para navegadores antiguos |
| `Strict-Transport-Security` | añadir `includeSubDomains` | Solo si **todos** los subdominios (incluido el correo web, si lo hay) van por HTTPS `[PENDIENTE: confirmar]` |

- [x] Añadirlas con `headers()` en `next.config.ts`, empezando con la CSP en modo `Content-Security-Policy-Report-Only` durante unos días para no romper GA4 ni Vercel Analytics. Después, pasarla a modo bloqueante.
- [ ] `'unsafe-inline'` en `script-src` hace falta por los scripts en línea (banner de cookies, inicialización de GA4 y los de Next). Más adelante se puede sustituir por *nonces* generados en `proxy.ts`, a cambio de que las páginas dejen de ser estáticas. No compensa ahora.
- [x] Revisar la CSP contra la documentación de la versión instalada (`node_modules/next/dist/docs/`, guía de CSP), como pide `AGENTS.md`.

### 3.3 Media: endurecer el formulario

`src/lib/contact-schema.ts` valida tipos y mínimos, pero no máximos:

- [x] **Longitudes máximas:** `name` ≤ 100, `email` ≤ 254, `phone` ≤ 20 (ya lo limita la expresión regular), `message` ≤ 5.000, `website` ≤ 200. Hoy se puede enviar un mensaje de varios MB, que llega entero al correo.
- [x] **`name` sin saltos de línea ni caracteres de control:** va en el asunto (`Nuevo contacto de ${name}`). Resend lo envía por API JSON, así que no hay inyección de cabeceras SMTP conocida, pero un nombre con saltos de línea ensucia el asunto y no es un dato válido.
- [x] **`service` limitado a la lista** (`serviceOptions`) o vacío. Hoy acepta cualquier texto, que se copia en el email.
- [x] **Comprobar `Origin`** en `src/app/api/contact/route.ts`: rechazar con 403 si existe y no es `https://youngdigisoft.es` (o el dominio de la *preview*). No hay sesión que robar, así que no es CSRF, pero frena el spam automatizado desde otras webs. Coste: 3 líneas.
- [x] Límite del tamaño del cuerpo: rechazar con 413 antes de leer el JSON. Hecho con 32 KB en `src/lib/request-guards.ts`.

### 3.4 Baja

- [x] **`.pnpm-runner/` en git** (466 archivos, 48 MB, binarios y scripts de pnpm). Quedó tras `chore: migrate package manager from pnpm to npm`. Es código de terceros versionado que nadie revisa. `git rm -r --cached .pnpm-runner` y añadirlo a `.gitignore`. El historial conserva los archivos; limpiarlo del historial no compensa. **Requiere permiso del propietario** (regla 7 de `CLAUDE.md`).
- [ ] **Límite de envíos por instancia** (`src/lib/rate-limit.ts`): con varias instancias de Vercel, el límite real es 5 × número de instancias. Opciones: Vercel Firewall (regla de *rate limit* en `/api/contact`, sin código) o un almacén compartido del Marketplace. Ya está anotado en `PLAN-WEB.md`.
- [ ] **IP del límite de envíos:** se toma el primer valor de `x-forwarded-for`. En Vercel lo fija la plataforma, así que es fiable; si algún día se despliega fuera de Vercel, revisarlo.
- [x] **`/.well-known/security.txt`** con `Contact: mailto:info@youngdigisoft.es`, `Expires` y `Preferred-Languages: es, en`, para que quien encuentre un fallo sepa a quién avisar.

### 3.5 CI y cadena de suministro

`.github/workflows/ci.yml`:

- [x] `permissions: contents: read` a nivel de workflow (hoy usa los permisos por defecto del token).
- [x] `actions/checkout`, `actions/setup-node` y `actions/upload-artifact` a v7 (las v4 usaban Node 20, obsoleto en GitHub Actions). Opcional: fijarlas por SHA.
- [x] Paso `npm audit --omit=dev --audit-level=high`, para que el CI falle si una dependencia de producción tiene un aviso alto o crítico.
- [x] `.github/dependabot.yml` semanal para `npm` y `github-actions`, agrupando las actualizaciones menores y de parche.
- [x] Activar en GitHub (*Settings → Code security*): alertas de Dependabot, *secret scanning* y *push protection*. → Propietario.
- [x] Protección de la rama `main`: exigir que el CI pase antes de fusionar. → Propietario. Regla «Proteger main»: CI obligatorio, sin borrado ni force push.

### 3.6 Cuentas y servicios (propietario)

- [x] Doble factor (2FA) en GitHub, Vercel, Google (1206roka@gmail.com), Resend y OVH. Desactivado en las cinco al revisarlo el 21 oct 2026; activado por el propietario el mismo día (confirmado por él, no comprobado desde fuera).
- [x] Clave de Resend: una sola (`young-digisoft`) con «Sending access». Dominio «All domains»: equivale a `youngdigisoft.es` mientras sea el único dominio en Resend; restringirla si se añade otro.
- [x] Bloqueo de transferencia del dominio activado en OVH. DNSSEC activo: el `.es` publica el `DS` y los resolutores validan la zona (comprobado el 22 oct 2026).
- [ ] SPF (`include:mx.ovh.com`), DKIM de Resend y DMARC publicados. DMARC en `p=none` (solo vigila). El correo de OVH es un MX Plan de redirección sin buzones, así que solo Resend envía como `@youngdigisoft.es`. Endurecer a `p=quarantine` cuando se confirme que ningún otro servicio envía como el dominio. El propietario envía desde Zimbra (OVH) y desde Gmail como `info@`: antes de endurecer hay que confirmar el DKIM de Zimbra y el servidor SMTP de Gmail. Comprobado en DNS el 22 oct 2026: SPF raíz con OVH, SPF propio de Resend en `send.`, DKIM de Resend (`resend._domainkey`) y de OVH/Zimbra (`ovhmo-selector-1` y `-2`). Gmail debe enviar como `info@` a través del SMTP de OVH (no se puede ver desde el DNS). Siguiente paso, en OVH: `v=DMARC1; p=quarantine; rua=mailto:info@youngdigisoft.es` y revisar los informes unas semanas antes de pasar a `p=reject`.

## 4. Plan de testing

### 4.1 Estado actual

| Tipo | Herramienta | Cantidad | Cubre |
|---|---|---|---|
| Unitarios y de componentes | Vitest + Testing Library (jsdom) | 19 archivos, 84 tests | Esquema y ruta del formulario, email, cliente, límite de envíos, metadatos, sitemap, JSON-LD, precios, servicios, WhatsApp, GA4, cabecera y pie |
| E2E | Playwright (escritorio y móvil) | 27 tests × 2 proyectos (1 se salta a propósito en escritorio: solo aplica a móvil) | Portada, servicios, contacto, legales, cookies, 404, redirección, `robots.txt` y sitemap |
| Cobertura | — | No se mide | — |

### 4.2 Huecos detectados

| Área | Riesgo | Falta |
|---|---|---|
| `src/lib/cookie-consent.ts` | Legal (RGPD): que GA4 se cargue sin permiso o no se borren sus cookies | Test unitario: valor guardado inválido → `null`; retirar el consentimiento borra las cookies `_ga*` y recarga; aceptar no recarga; `localStorage` bloqueado no rompe |
| `src/lib/analytics.ts` | Enviar eventos sin consentimiento | Test: `trackEvent` no llama a `gtag` sin consentimiento ni si `gtag` no existe |
| Cabeceras de seguridad (§3.2) | Que un cambio las quite sin avisar | E2E: la respuesta de `/` incluye CSP, `nosniff`, `Referrer-Policy`, `Permissions-Policy` y `frame-ancestors 'none'` |
| CSP y GA4 | Que la CSP bloquee GA4 o Vercel Analytics | E2E: aceptar cookies → se carga `gtag/js` y no hay errores de CSP en consola |
| Formulario endurecido (§3.3) | Mensajes enormes, `service` arbitrario, `Origin` ajeno | Tests unitarios en `contact-schema.test.ts` y `route.test.ts`: longitud máxima +1 rechazada, longitud máxima aceptada, nombre con `\n` rechazado, `service` fuera de lista rechazado, `Origin` ajeno → 403, cuerpo > 20 KB → 413 |
| Producción tras desplegar | Que un despliegue rompa algo que solo existe en producción (variables de entorno, dominio, redirecciones) | *Smoke test* e2e contra `https://youngdigisoft.es`: páginas 200, cabeceras, `robots.txt`, sitemap y `POST /api/contact` inválido → 400 (sin enviar emails reales) |
| Dependencias | Vulnerabilidades nuevas | `npm audit` en CI y Dependabot (§3.5) |

### 4.3 Objetivos

- **Cobertura:** medir con `@vitest/coverage-v8` (dependencia nueva: pedir permiso). Objetivo: ≥ 90 % de líneas en `src/lib/` y 100 % de ramas en `contact-schema.ts`, `route.ts`, `rate-limit.ts` y `cookie-consent.ts`. Sin objetivo para componentes visuales ni `src/content/` (regla 5 de `CLAUDE.md`).
- **Umbral en CI:** que el CI falle si la cobertura de `src/lib/` baja del objetivo.
- **Regla:** cada corrección de seguridad llega con un test que falla antes del cambio y pasa después.

### 4.4 Ejemplos de casos (nombres en inglés, como el resto de tests)

```ts
// src/lib/contact-schema.test.ts
it("rejects a message longer than 5000 characters", ...);
it("rejects a name with a line break", ...);
it("rejects a service that is not in the list", ...);

// src/app/api/contact/route.test.ts
it("answers 403 when the request comes from another origin", ...);
it("answers 413 when the body is larger than 20 KB", ...);

// src/lib/cookie-consent.test.ts
it("treats an unknown stored value as no choice", ...);
it("clears _ga cookies and reloads when consent is withdrawn", ...);

// e2e/security-headers.spec.ts
test("pages are served with the security headers", ...);
test("accepting cookies loads Google Analytics without CSP errors", ...);
```

## 5. Orden de trabajo

### Fase 1: urgente (hoy)

- [x] Actualizar `next` a 16.3.8 y pasar todas las comprobaciones (§3.1). Hecho el 21 oct 2026: `npm audit --omit=dev` sin vulnerabilidades.

### Fase 2: semana 1 (código)

- [x] Cabeceras de seguridad (§3.2) y su test e2e (`e2e/security-headers.spec.ts`). La CSP se aplica en modo bloqueante: los e2e comprueban que no hay violaciones. GA4 confirmado en producción con la CSP (Tiempo real).
- [x] Endurecer el formulario (§3.3) con sus tests: longitudes máximas, nombre sin caracteres de control, servicio de la lista, `Origin` del mismo dominio (403) y cuerpo ≤ 32 KB (413) en `src/lib/request-guards.ts`.
- [x] Tests de `cookie-consent.ts` y `analytics.ts` (§4.2), validados rompiendo el código a propósito.
- [x] `security.txt` en `public/.well-known/` (caduca el 21 oct 2027; el e2e falla si caduca).

### Fase 3: semana 2 (CI y repositorio)

- [x] Endurecer `ci.yml`, añadir `npm audit` y Dependabot (§3.5).
- [x] Medir la cobertura y fijar el umbral (§4.3): `npm run test:coverage` en el CI; 90 % global y 100 % de ramas en los archivos críticos.
- [ ] *Smoke test* contra producción tras cada despliegue.
- [x] Sacar `.pnpm-runner/` de git (§3.4). **Pide permiso:** borra archivos del repositorio.

### Fase 4: propietario (cuando pueda)

- [ ] 2FA en todas las cuentas, clave de Resend solo de envío, bloqueo del dominio, DMARC (§3.6). Hecho salvo endurecer DMARC (hoy `p=none`).
- [x] *Secret scanning*, alertas de Dependabot y protección de `main` en GitHub (§3.5).
- [x] CSP en modo bloqueante tras revisar que no hay errores en la consola.
- [ ] Límite de envíos compartido o regla en Vercel Firewall (§3.4).

## 6. Revisión periódica

| Qué | Cuándo |
|---|---|
| `npm audit` y PR de Dependabot | Semanal (automático) |
| Cabeceras con [securityheaders.com](https://securityheaders.com) y [Mozilla Observatory](https://developer.mozilla.org/en-US/observatory) | Tras cada cambio de configuración y cada trimestre |
| Revisión de accesos (quién tiene acceso a GitHub, Vercel, Google y Resend) y rotación de la clave de Resend | Cada 6 meses o si alguien deja de tener acceso |
| Este plan | Cada trimestre |
| Renovar `Expires` en `public/.well-known/security.txt` | Antes del 21 oct 2027 (el e2e avisa si caduca) |
