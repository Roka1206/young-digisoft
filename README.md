# Young Digisoft

Landing page de Young Digisoft, construida con [Next.js](https://nextjs.org) (App Router), TypeScript y Tailwind CSS.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4
- **Tipografías:** [Alata](https://fonts.google.com/specimen/Alata) (`font-heading`) y [Roboto Slab](https://fonts.google.com/specimen/Roboto+Slab) (por defecto, vía `font-sans`), cargadas con `next/font/google`
- **Colores de marca:** `--color-brand` (`#0197af`) y `--color-brand-light` / `--color-background` (`#f0f0f0`), definidos en `src/app/globals.css`
- **Tests unitarios:** Vitest + Testing Library
- **Tests e2e:** Playwright
- **Gestor de paquetes:** npm
- **Deploy:** Vercel

## Empezar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Sirve el build de producción |
| `npm run lint` | ESLint |
| `npm run format` | Formatea el código con Prettier (y ordena las clases de Tailwind) |
| `npm run format:check` | Comprueba el formato sin cambiar nada |
| `npm run typecheck` | Chequeo de tipos con `tsc` |
| `npm test` | Tests unitarios (Vitest) |
| `npm run test:watch` | Tests unitarios en modo watch |
| `npm run test:e2e` | Tests end-to-end (Playwright). Requiere `npx playwright install` la primera vez |
| `npm run generate:brand-assets` | Regenera `src/app/icon.png`, `src/app/apple-icon.png` y `src/app/favicon.ico` a partir de `public/brand/logo-mark.svg` |

## Ramas

- `main`: rama estable / producción.
- `development`: rama de trabajo. Todo el desarrollo se hace aquí (o en ramas de feature que mergean a `development`), y se promueve a `main` vía PR cuando está listo para producción.

## CI/CD

- **`.github/workflows/ci.yml`** (GitHub Actions): en cada push/PR a `main` o `development` corre lint, typecheck, tests unitarios, build y tests e2e con Playwright.
- **Deploy**: lo gestiona la integración nativa de Vercel (proyecto `young-digisoft`, repo importado directamente desde GitHub). Cada push a `main` genera un deploy de producción, y cualquier otra rama o PR genera un deploy preview — no hace falta ningún workflow de GitHub Actions para esto. Los secrets `VERCEL_ORG_ID`/`VERCEL_PROJECT_ID` quedaron guardados en GitHub → Settings → Secrets and variables → Actions por si en el futuro se necesita un workflow custom, pero hoy no los usa nada.

## Variables de entorno

Copia estas variables en `.env.local` (desarrollo) y en Vercel → Project Settings → Environment Variables (producción/preview):

| Variable | Descripción |
| --- | --- |
| `RESEND_API_KEY` | API key de [Resend](https://resend.com) usada por `src/lib/email.ts` para enviar el email del formulario de contacto. Obligatoria. |
| `CONTACT_TO_EMAIL` | Email que recibe los mensajes del formulario, por ejemplo `info@youngdigisoft.es`. Obligatoria. |
| `CONTACT_FROM_EMAIL` | Remitente del email, por ejemplo `Young Digisoft <info@youngdigisoft.es>`. Debe ser de un dominio verificado en Resend (`youngdigisoft.es` ya lo está). Obligatoria. |
| `NEXT_PUBLIC_GA_ID` | ID de medición de Google Analytics 4 (`G-…`). GA4 solo se carga si existe y el visitante acepta las cookies. Opcional: sin ella no se carga GA4. |

El código no tiene direcciones de email por defecto: si falta alguna de las tres variables de email, el formulario muestra el error con la alternativa de WhatsApp y el servidor registra qué variable falta.

`young-digisoft.vercel.app` redirige de forma permanente a `https://youngdigisoft.es` (ver `next.config.ts`). La URL base del sitio (canonical, Open Graph, `robots.txt` y `sitemap.xml`) es la constante `siteUrl` de `src/lib/site-url.ts`.

## Marca

El símbolo `>_` vive en `public/brand/logo-mark.svg` (vectorial, fuente única). El original en PNG es `public/brand/logo_digisoft.png`. Colores, tipografía y uso del logo: `docs/BRAND.md`. Tras cambiar el SVG, ejecuta `npm run generate:brand-assets`.

## Pendientes de contenido

- **Redes sociales**: los enlaces en `src/content/site.ts` (`socialLinks`) son placeholders (`#`, salvo WhatsApp que ya es real). Reemplazar por las URLs reales cuando se tengan.
- **Testimonios**: `src/content/testimonials.ts` tiene datos de ejemplo. Reemplazar por testimonios reales de clientes.
- **LinkedIn**: no se incluyó un botón de LinkedIn porque ni `lucide-react` ni `simple-icons` distribuyen ya ese ícono (lo retiraron ambos proyectos). Si se quiere añadir, hay que conseguir el SVG oficial y añadirlo a `src/components/ui/BrandIcons.tsx`.
