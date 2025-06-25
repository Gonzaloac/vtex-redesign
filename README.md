This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
// ==================== VTEX-like Next.js Project (with Dynamic Product Page) ====================
// NOTE: Este proyecto está estructurado pensando en migración a VTEX IO.
// Guía de migración a VTEX IO:
// 1. Cada componente de carpeta `components/blocks` (HeroBanner, CategoryGrid, ProductShelf,
//    BenefitsSection, InfoBar) debe copiarse a `react/` dentro de tu app VTEX IO.
// 2. Crea `store/blocks.json` con declaraciones de bloques, por ejemplo:
//    {
//      "hero-banner": { "component": "HeroBanner", "props": { "title": ..., "image": ... } },
//      "category-grid": { "component": "CategoryGrid" },
//      "product-shelf": { "component": "ProductShelf" },
//      "benefits-section": { "component": "BenefitsSection" },
//      "info-bar": { "component": "InfoBar" }
//    }
// 3. En `react/index.ts`, exporta todos los componentes:
//    export { default as HeroBanner } from './HeroBanner'
//    export { default as CategoryGrid } from './CategoryGrid'
//    ...
// 4. Las páginas dinámicas en Next.js (`pages/product/[id].tsx`) se migran como módulos de página,
//    pero en VTEX IO deberás usar `store.product` y bloques `product-summary` para PDP.
// 5. Ajusta estilos y utilidades de Tailwind a `vtex.styleguide` o CSS Modules si prefieres.
// -----------------------------------------------------------------------------
