# NEXKO PARFUM — Tienda 3D (Next.js + Shopify)

Tienda headless de perfumería premium construida con **Next.js 14 (App Router)**, **Shopify Storefront API**, **React Three Fiber**, **GSAP/Framer Motion**, **Tailwind CSS** y **Zustand**.

## Stack

- Next.js 14.2 · React 18 · TypeScript (strict)
- Shopify Storefront API 2024-10 (lectura de catálogo + carrito, todo server-side)
- Three.js / @react-three/fiber v8 + drei + postprocessing
- Framer Motion (micro-interacciones) · GSAP (disponible)
- Tailwind CSS 3 con sistema de diseño NEXKO
- Zustand (carrito y lista de deseos persistidos en localStorage)

### Funcionalidades

- Home con hero 3D, grid de categorías, best sellers y sección de regalo
- Catálogo `/tienda` con filtros (categoría, género, marca, familia, precio, orden, búsqueda) y búsqueda desde el header (`/tienda?q=`)
- PDP con galería + zoom, pirámide olfativa 3D, JSON-LD y relacionados
- 5 páginas de colección temáticas
- Carrito server-side (drawer + `/cart`) con barra de envío gratis
- Lista de deseos `/lista` (corazón en cada producto)
- ScentFinder (quiz olfativo), social proof, cursor personalizado, WhatsApp
- SEO: metadata por página, `sitemap.xml`, `robots.txt`
- Analítica GA4 + Meta Pixel (opt-in por env) y revalidación on-demand

## Requisitos

- Node.js 18+ (probado en 24)
- Una tienda Shopify con Storefront API habilitada

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # rellena tus credenciales
npm run dev                  # http://localhost:3000
```

### Variables de entorno (`.env.local`)

| Variable | Descripción |
|---|---|
| `SHOPIFY_STORE_DOMAIN` | Dominio `xxx.myshopify.com` (sin https) |
| `SHOPIFY_STOREFRONT_TOKEN` | Token Storefront (lectura). Solo se usa en el servidor. |
| `SHOPIFY_ADMIN_TOKEN` | Token Admin (`shpat_…`). **Solo** para `npm run seed`. |
| `SHOPIFY_API_VERSION` | `2024-10` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp internacional sin `+` (ej. `573001112233`) |
| `NEXT_PUBLIC_SITE_URL` | URL pública para metadata/OG/sitemap |
| `NEXT_PUBLIC_GA_ID` | (opcional) ID de Google Analytics 4 (`G-XXXX`) |
| `NEXT_PUBLIC_META_PIXEL_ID` | (opcional) ID de Meta Pixel |
| `REVALIDATE_SECRET` | (opcional) Secreto para `/api/revalidate` (webhooks Shopify) |

> ⚠️ `.env.local` está en `.gitignore`. Nunca subas tokens al repositorio.
> Rota los tokens que hayan quedado expuestos en chats o documentos.

## Sembrar productos en Shopify (`npm run seed`)

El script `scripts/seed.ts` crea las 5 colecciones y ~28 productos representativos
(con precios COP, vendor, tags de género/presentación/familia, stock e imágenes
placeholder). Es **idempotente**: re-ejecutarlo no duplica.

```bash
npm run seed
```

### ⚠️ El token Admin necesita scopes de producto

El token Admin debe tener habilitados, en la app personalizada de Shopify
(*Settings → Apps and sales channels → Develop apps → tu app → Configuration →
Admin API integration*):

- `write_products` (crea productos y colecciones)
- `write_publications` + `read_publications` (publica en Online Store para que la
  Storefront API los vea)

Tras habilitarlos, **reinstala/actualiza** la app, copia el nuevo token a
`.env.local` y corre `npm run seed`.

Si el catálogo aún no está sembrado, la tienda muestra un *empty state* elegante
en lugar de fallar.

## Estructura

```
app/                 Rutas (home, /tienda, /tienda/[handle], /colecciones/*, /cart, /api/cart)
components/3d/        Escenas R3F (HeroScene, FloatingBottle, ParticleField, ScentWaves, ScentPyramid)
components/ui/        Header, Footer, CartDrawer, ProductCard, PriceDisplay, cursor, social proof…
components/sections/  Hero, CategoryGrid, ScentFinder, CollectionView, ProductDetail…
lib/shopify/          Cliente Storefront, queries, mutations, tipos
lib/data/             Catálogo semilla + metadatos de aroma + temas de colección
lib/store/            Estado Zustand (carrito, UI)
scripts/seed.ts       Seeder de la Admin API
```

## Notas de desarrollo

- **OneDrive:** este proyecto vive bajo OneDrive. Si la sincronización bloquea
  `node_modules` durante `next build` (`EBUSY`), pausa OneDrive o excluye la
  carpeta del proyecto. Reintentar el build suele bastar.
- Los componentes 3D se cargan con `dynamic(..., { ssr: false })` y se degradan
  en dispositivos de bajos recursos (`useLowPower`).
- Todos los precios provienen de la Storefront API y se formatean en COP.

## Aviso legal

Productos de inspiración. NEXKO PARFUM no es distribuidor oficial de las marcas
mencionadas; las marcas son propiedad de sus respectivos dueños.
