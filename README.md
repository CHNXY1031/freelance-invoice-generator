# InvoiceCraft — Freelance Invoice & Contract Generator

A polished, zero-backend invoice and service-contract generator for global freelancers and small teams. Built with Next.js 14 App Router, TypeScript and Tailwind CSS.

## Features

- Invoice and service-contract document modes
- Six billing currencies: USD, EUR, GBP, CAD, AUD and JPY
- Dynamic line items with automatic subtotal, tax, discount and total calculations
- Client-ready A4 print styles for browser PDF export
- Copyable plain-text invoice summary
- 60 statically generated, profession-specific invoice pages
- FAQ and WebApplication structured data, sitemap, robots and Google verification
- Fully client-side: entered business information is never uploaded

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Production domain: [https://freelance-invoice-generator.vercel.app](https://freelance-invoice-generator.vercel.app)
