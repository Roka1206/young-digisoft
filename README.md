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
- **Gestor de paquetes:** pnpm
- **Deploy:** Vercel

## Empezar

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Descripción |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm start` | Sirve el build de producción |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | Chequeo de tipos con `tsc` |
| `pnpm test` | Tests unitarios (Vitest) |
| `pnpm test:watch` | Tests unitarios en modo watch |
| `pnpm test:e2e` | Tests end-to-end (Playwright). Requiere `pnpm exec playwright install` la primera vez |
| `pnpm generate:brand-assets` | Regenera `public/logo.png`, `src/app/icon.png`, `src/app/apple-icon.png` y `src/app/favicon.ico` a partir de `assets/brand/young-digisoft-logo-source.png` |

## Ramas

- `main`: rama estable / producción.
- `development`: rama de trabajo. Todo el desarrollo se hace aquí (o en ramas de feature que mergean a `development`), y se promueve a `main` vía PR cuando está listo para producción.

## CI/CD (GitHub Actions)

- **`.github/workflows/ci.yml`**: en cada push/PR a `main` o `development` corre lint, typecheck, tests unitarios, build y tests e2e con Playwright.
- **`.github/workflows/deploy.yml`**: despliega a Vercel.
  - Push a `main` → deploy de producción.
  - Pull request → deploy preview (con comentario automático en el PR con la URL).

### Secrets necesarios para el deploy

Configura estos secrets en **GitHub → Settings → Secrets and variables → Actions**:

| Secret | Cómo obtenerlo |
| --- | --- |
| `VERCEL_TOKEN` | Vercel → Account Settings → Tokens |
| `VERCEL_ORG_ID` | Ejecuta `vercel link` en local (crea `.vercel/project.json`) o Vercel → Team Settings |
| `VERCEL_PROJECT_ID` | Igual que arriba, en `.vercel/project.json` |

Sin estos secrets el workflow de deploy fallará; el de CI (lint/test/build) funciona sin configuración adicional.

## Variables de entorno

Copia estas variables en `.env.local` (desarrollo) y en Vercel → Project Settings → Environment Variables (producción/preview):

| Variable | Descripción |
| --- | --- |
| `RESEND_API_KEY` | API key de [Resend](https://resend.com) usada por `src/app/api/contact/route.ts` para enviar el email del formulario de contacto. Sin ella, el formulario muestra el estado de error. |
| `CONTACT_TO_EMAIL` | Email que recibe los mensajes del formulario. Por defecto `1206roka@gmail.com` si no se define. |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio, usada en metadata (OpenGraph), `robots.txt` y `sitemap.xml`. Actualizar cuando se tenga el dominio definitivo. |

El remitente del email (`from`) usa el dominio de pruebas `onboarding@resend.dev` de Resend; para enviar desde un dominio propio (ej. `contacto@youngdigisoft.com`) hay que verificarlo en el panel de Resend y actualizar `src/app/api/contact/route.ts`.

## Marca

El logo fuente vive en `assets/brand/young-digisoft-logo-source.png`. Al ser un PNG de baja resolución (368x239px), los íconos generados a tamaños grandes (icon.png, apple-icon.png) pueden verse algo suaves. Si se consigue una versión vectorial (SVG/AI) del logo, reemplazar el source y volver a ejecutar `pnpm generate:brand-assets` para mejor nitidez.

## Pendientes de contenido

- **Redes sociales**: los enlaces en `src/content/site.ts` (`socialLinks`) son placeholders (`#`, salvo WhatsApp que ya es real). Reemplazar por las URLs reales cuando se tengan.
- **Testimonios**: `src/content/testimonials.ts` tiene datos de ejemplo. Reemplazar por testimonios reales de clientes.
- **LinkedIn**: no se incluyó un botón de LinkedIn porque ni `lucide-react` ni `simple-icons` distribuyen ya ese ícono (lo retiraron ambos proyectos). Si se quiere añadir, hay que conseguir el SVG oficial y añadirlo a `src/components/ui/BrandIcons.tsx`.
