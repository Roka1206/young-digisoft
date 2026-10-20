# BRAND.md: colores y tipografía de Young Digisoft

> **Fuente de verdad única** para colores y tipografía. Si algo del código, de otro documento o de tu memoria contradice este archivo, **manda este archivo**.
> No uses ningún color ni fuente que no aparezca aquí. Si necesitas uno nuevo, **pregunta antes**.

---

## 1. Paleta (solo estos 6 colores de marca)

| Token | Nombre | HEX | RGB | Uso principal |
|---|---|---|---|---|
| `brand` | Turquesa Terminal | `#00ADB5` | 0, 173, 181 | Color exacto del logotipo. Fondos de marca, símbolo `>_`, líneas e iconos grandes, acentos sobre fondo oscuro |
| `brand-fg` | Blanco Humo | `#F1F1F1` | 241, 241, 241 | Símbolo `>_` del logo; texto sobre fondos oscuros |
| `action` | Turquesa Profundo | `#00757B` | 0, 117, 123 | **Botones, enlaces y textos destacados sobre fondo claro** |
| `ink` | Petróleo | `#08262B` | 8, 38, 43 | Títulos, texto principal, fondos oscuros y texto sobre turquesa de marca |
| `mist` | Niebla Turquesa | `#E6F6F7` | 230, 246, 247 | Fondos claros, tarjetas y secciones alternas |
| `muted` | Gris Pizarra | `#4A5B5E` | 74, 91, 94 | Texto secundario, pies de página y descripciones |

Más el **blanco** `#FFFFFF` como fondo base de página.

### Colores funcionales (solo para mensajes del formulario)

| Token | HEX | Uso |
|---|---|---|
| `error` | `#B91C1C` | Errores de validación y fallo de envío |
| `success` | `#15803D` | Confirmación de envío correcto |

No se usan en ningún otro sitio.

### Colores prohibidos

Ya no forman parte de la marca. Si los encuentras en el código, sustitúyelos por el token correspondiente:
`#0B1B3A`, `#2563EB`, `#22D3EE`, `#EEF2FF`, `#475569`, y cualquier azul, cian, violeta o degradado ajeno a la tabla de arriba.

---

## 2. Qué color va con qué (combinaciones permitidas)

Contraste calculado según WCAG. **Mínimo exigido: 4,5:1 para texto normal.**

| Texto | Fondo | Contraste | ¿Texto? |
|---|---|---|---|
| `ink` Petróleo | Blanco | 15,9:1 | Sí |
| `ink` Petróleo | `mist` Niebla | 14,3:1 | Sí |
| `ink` Petróleo | `brand` Turquesa | 5,8:1 | **Sí (usar este para texto sobre turquesa)** |
| `muted` Gris Pizarra | Blanco | 7,1:1 | Sí |
| `muted` Gris Pizarra | `mist` Niebla | 6,4:1 | Sí |
| `action` Turquesa Profundo | Blanco | 5,5:1 | Sí (enlaces, textos destacados) |
| `action` Turquesa Profundo | `mist` Niebla | 4,9:1 | Sí |
| Blanco | `action` Turquesa Profundo | 5,5:1 | Sí (**botón principal**) |
| `brand` Turquesa | `ink` Petróleo | 5,8:1 | Sí (acento sobre fondo oscuro) |
| `brand-fg` Blanco Humo | `ink` Petróleo | 14,1:1 | Sí |
| Blanco | `error` / `success` | 6,5:1 / 5,0:1 | Sí |

### Combinaciones que NO se pueden usar para texto

| Combinación | Contraste | Por qué |
|---|---|---|
| Blanco o Blanco Humo sobre `brand` Turquesa | 2,4 a 2,8:1 | No llega a 4,5:1 |
| `brand` Turquesa sobre Blanco | 2,8:1 | No llega a 4,5:1 |

> **Regla clave que se suele olvidar:** el turquesa del logo (`#00ADB5`) **no sirve para texto ni para botones sobre fondo claro**. Para eso, `action` (`#00757B`). Sobre un fondo turquesa, el texto va en `ink`. La única excepción es el propio símbolo `>_` del logotipo, que es un gráfico y no un texto.

---

## 3. Componentes: qué usar en cada caso

| Elemento | Fondo | Texto | Detalle |
|---|---|---|---|
| Página y secciones normales | Blanco | `ink` | |
| Secciones alternas, tarjetas | `mist` | `ink` | Borde fino opcional en `ink` al 10 % |
| Portada y bloques de mensaje clave | `ink` | `brand-fg` | Acento y líneas en `brand` |
| Banda de marca (franja, etiqueta) | `brand` | `ink` | Nunca texto blanco |
| **Botón principal** | `action` | Blanco | Hover: `#005A60` (blanco sobre él, 8,0:1) |
| Botón secundario | Transparente, borde `action` 2 px | `action` | Hover: fondo `mist` |
| Botón sobre fondo oscuro | `brand` | `ink` | Hover: más claro, sin perder contraste |
| Enlaces en texto | | `action`, subrayado | Visitado y hover: `#005A60` |
| Texto secundario | | `muted` | |
| Iconos (Lucide, trazo 2 px) | | `action` sobre claro, `brand` sobre `ink` | |
| Foco de teclado | | Anillo 2 px en `action` (claro) o `brand` (oscuro) | Siempre visible |
| Errores y confirmaciones del formulario | | `error` / `success` | Acompañar con icono y texto, nunca solo color |

---

## 4. Tipografía

**Solo dos familias**, gratuitas (Google Fonts), cargadas con `next/font` (sin `<link>` externos):

| Familia | Uso | Pesos |
|---|---|---|
| **Inter** | Todo: títulos, textos, botones, navegación | 400 (regular), 500 (medium), 700 (bold) |
| **JetBrains Mono** | Detalles técnicos: etiquetas, cifras, fragmentos de código, el recurso gráfico `>_` | 400, 700 |

Fallback: `system-ui, sans-serif` para Inter y `ui-monospace, monospace` para JetBrains Mono.
**No uses ninguna otra fuente.** Máximo **dos pesos** por pieza.

### Escala

| Elemento | Escritorio | Móvil | Fuente y peso | Color |
|---|---|---|---|---|
| Título principal (H1) | 40 / 48 px | 32 / 40 px | Inter 700 | `ink` |
| Título de sección (H2) | 28 / 36 px | 24 / 32 px | Inter 700 | `ink` |
| Subtítulo (H3) | 20 / 28 px | 18 / 26 px | Inter 500 | `action` o `ink` |
| Texto de párrafo | 16 / 26 px | 16 / 26 px | Inter 400 | `ink` o `muted` |
| Botón | 16 / 24 px | 16 / 24 px | Inter 500 | Según botón |
| Etiqueta o detalle técnico | 13 / 20 px | 13 / 20 px | JetBrains Mono 400 | `muted` |

Reglas: alineación a la izquierda en textos largos; ancho de línea máximo de unos 70 caracteres; títulos con mayúscula solo inicial (versalitas únicamente en etiquetas cortas); un solo `h1` por página.

---

## 5. Implementación (usa la que corresponda a la versión de Tailwind del proyecto)

Los identificadores van en inglés y camelCase, como en `CLAUDE.md`. Define los colores **una sola vez** y úsalos siempre por nombre (`bg-action`, `text-ink`...), nunca con HEX sueltos en los componentes.

### Tailwind v4 (en el CSS global)

```css
@theme {
  --color-brand: #00ADB5;
  --color-brand-fg: #F1F1F1;
  --color-action: #00757B;
  --color-action-hover: #005A60;
  --color-ink: #08262B;
  --color-mist: #E6F6F7;
  --color-muted: #4A5B5E;
  --color-error: #B91C1C;
  --color-success: #15803D;
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;
}
```

### Tailwind v3 (en `tailwind.config`)

```ts
theme: {
  extend: {
    colors: {
      brand: { DEFAULT: "#00ADB5", fg: "#F1F1F1" },
      action: { DEFAULT: "#00757B", hover: "#005A60" },
      ink: "#08262B", mist: "#E6F6F7", muted: "#4A5B5E",
      error: "#B91C1C", success: "#15803D",
    },
    fontFamily: {
      sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
    },
  },
}
```

### Carga de fuentes (`src/app/layout.tsx`)

```tsx
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-inter" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-jetbrains-mono" });

// <html lang="es" className={`${inter.variable} ${jetBrainsMono.variable}`}>
```

---

## 6. Logotipo

- Símbolo `>_` en **Blanco Humo `#F1F1F1`** sobre **Turquesa Terminal `#00ADB5`**. Archivo original: `logo_digisoft.png` (256 × 232 px); vectorizar a SVG.
- **Sobre fondo oscuro (`ink`):** símbolo en `brand`, sin recuadro.
- **Sobre fondo claro, versión monocroma:** símbolo en `ink`.
- **Versión horizontal:** símbolo + «Young Digisoft» en Inter 700, color `ink` (fondo claro) o `brand-fg` (fondo oscuro).
- Zona de seguridad: un cuarto de la altura del símbolo. Tamaño mínimo del símbolo: 32 px en pantalla.
- No deformar, rotar, recolorear, añadir sombras ni degradados.

---

## 7. Estilo visual (resumen)

Limpio y técnico: mucho espacio en blanco, un solo foco por sección, tarjetas con esquinas redondeadas (radio 12 px) y líneas finas, iconos de trazo lineal (Lucide, 2 px) y el prompt `>_` como recurso gráfico propio. Sin degradados llamativos, sin sombras duras y sin fotos de stock genéricas.

---

## 8. Lista de comprobación antes de dar una tarea de diseño por terminada

- [ ] Ningún HEX suelto en componentes: todo sale de los tokens.
- [ ] Ningún color de la lista de prohibidos.
- [ ] Ningún texto blanco o `#F1F1F1` sobre `#00ADB5`, ni `#00ADB5` como color de texto sobre blanco.
- [ ] Botones principales en `action` con texto blanco.
- [ ] Solo Inter y JetBrains Mono, cargadas con `next/font`.
- [ ] Contraste ≥ 4,5:1 en todo el texto y foco de teclado visible.
- [ ] Revisado en móvil (375 px) y en escritorio.
