This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Contacto y validación

El formulario sencillo utiliza `POST /api/contacto`. Requiere nombre, correo, mensaje y aceptación del aviso de privacidad; empresa y teléfono son opcionales. Conserva el contexto del servicio desde `?servicio=web`, `sistema`, `google`, `material` o `hosting`.

La notificación interna y la confirmación usan las variables SMTP existentes: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER` y `SMTP_PASSWORD`. Deben configurarse en el entorno de despliegue; nunca incluirlas en Git.

Ejecuta `npm run test:contact` para probar validación y entrega mediante un servidor SMTP local de captura. Las pruebas no envían correos reales. `npm run build` verifica TypeScript y la compilación de todas las páginas.

Las demostraciones de reservas, documentos y operación utilizan datos de ejemplo y no ejecutan transacciones. Las animaciones respetan la preferencia de movimiento reducido.
