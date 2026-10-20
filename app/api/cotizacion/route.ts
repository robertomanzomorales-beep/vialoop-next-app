import { randomUUID } from "crypto";
import nodemailer from "nodemailer";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const INTERNAL_RECIPIENTS = ["contacto@vialoop.cl", "dloayza@vialoop.cl"];
const SERVICES = {
  web: "Sitio web",
  sistema: "Software a medida",
  google: "Google y visibilidad",
  material: "Identidad y material comercial",
  hosting: "Hosting y correos",
  otro: "Otra consulta",
} as const;

const WEB_PLANS = {
  emprendedor: {
    name: "Landing page",
    description: "Landing page de una sola página para presentar la empresa, destacar una oferta y generar contactos.",
    features: [
      "Landing page de una sola página",
      "Contenido organizado en hasta 6 secciones",
      "Hasta 15 imágenes optimizadas",
      "Formulario de contacto y botón WhatsApp",
      "Diseño profesional adaptable a móviles",
      "SEO técnico inicial y optimización de velocidad",
      "Publicación y 1 ronda de cambios",
      "Hosting de 500 MB, dominio .cl y 2 correos corporativos por un año",
    ],
  },
  crece: {
    name: "Sitio web empresarial",
    description: "Sitio web empresarial con mayor contenido y navegación para presentar servicios, experiencia y respaldo comercial.",
    features: [
      "Sitio web empresarial con navegación completa",
      "Contenido ampliado para empresa y servicios",
      "Hasta 30 imágenes optimizadas",
      "2 formularios: contacto y cotización",
      "Diseño personalizado y línea visual",
      "SEO técnico y local con medición básica",
      "Publicación y 2 rondas de cambios",
      "Hosting de 500 MB, dominio .cl y 2 correos corporativos por un año",
    ],
  },
  empresa: {
    name: "Sitio corporativo",
    description: "Solución corporativa avanzada para empresas con múltiples servicios, áreas, públicos o requerimientos de integración.",
    features: [
      "Arquitectura corporativa para múltiples áreas",
      "Contenido avanzado y hasta 50 imágenes optimizadas",
      "Formularios personalizados y agendamiento",
      "UX/UI avanzada y diseño de mayor profundidad",
      "Gestión de contenido e integraciones según alcance",
      "Rendimiento, seguridad y SEO avanzados",
      "Capacitación y 3 rondas de cambios",
      "Hosting de 500 MB, dominio .cl y 2 correos corporativos por un año",
    ],
  },
  ecommerce: {
    name: "Tienda online",
    description: "Tienda online personalizada y autoadministrable para vender productos, gestionar pedidos y recibir pagos.",
    features: [
      "Tienda online desarrollada en Next.js y React",
      "Panel para productos, stock, pedidos y clientes",
      "Carrito de compra e integración inicial con Flow",
      "Carga inicial de hasta 20 productos",
      "Hasta 40 imágenes de productos optimizadas",
      "Configuración básica de despacho o retiro",
      "SEO técnico, capacitación y 2 rondas de cambios",
      "Hosting de 500 MB, dominio .cl y 2 correos corporativos por un año",
      "Infraestructura administrada y comisiones del medio de pago contratadas por separado",
    ],
  },
} as const;

const MATERIALS = {
  logotipo: {
    name: "Diseño de logotipo",
    description: "Desarrollo de identidad visual inicial para una empresa o nueva marca.",
    features: [
      "2 propuestas iniciales de logotipo",
      "Selección de una propuesta para desarrollo",
      "Hasta 3 cambios sobre la alternativa elegida",
      "Entrega final en formatos digitales acordados",
    ],
  },
  brochure: {
    name: "Brochure corporativo",
    description: "Documento comercial para presentar profesionalmente la empresa, sus servicios y capacidades.",
    features: [
      "Hasta 8 páginas interiores",
      "Portada, índice y contraportada adicionales",
      "Diseño alineado con la identidad de la empresa",
      "Entrega final en PDF digital",
    ],
  },
} as const;

const HOSTING_PLANS = {
  hosting1gb: {
    name: "Hosting 1 GB",
    description: "Alternativa básica para ampliar la capacidad del sitio y sus correos corporativos.",
    features: [
      "1 GB de almacenamiento SSD",
      "Hasta 5 correos corporativos",
      "Administración mediante cPanel",
      "Valor correspondiente a un año de servicio",
    ],
  },
  hosting8gb: {
    name: "Hosting Empresa 8 GB SSD",
    description: "Alternativa empresarial inicial para sitios y organizaciones con mayor uso de correo.",
    features: [
      "8 GB de almacenamiento SSD",
      "Correos corporativos ilimitados dentro de la capacidad contratada",
      "Administración mediante cPanel",
      "Valor correspondiente a un año de servicio",
    ],
  },
} as const;

type ServiceId = keyof typeof SERVICES;
type WebPlanId = keyof typeof WEB_PLANS;
type MaterialId = keyof typeof MATERIALS;
type HostingPlanId = keyof typeof HOSTING_PLANS;

type QuoteBody = {
  serviceIds?: unknown;
  webPlanId?: unknown;
  materialIds?: unknown;
  hostingPlanId?: unknown;
  googleNeed?: unknown;
  googleInvestment?: unknown;
  systemArea?: unknown;
  systemUsers?: unknown;
  systemIntegrations?: unknown;
  otherSubject?: unknown;
  currentWebsite?: unknown;
  contentStatus?: unknown;
  company?: unknown;
  industry?: unknown;
  city?: unknown;
  objective?: unknown;
  reference?: unknown;
  desiredStart?: unknown;
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  preferredContact?: unknown;
  privacyAccepted?: unknown;
  website?: unknown;
};

type RateLimitEntry = { count: number; resetAt: number };

type QuoteItem = {
  id: string;
  name: string;
  description: string;
  features: string[];
};

const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, RateLimitEntry>();

function getText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function getStringArray(value: unknown, maxItems: number, maxLength: number) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .slice(0, maxItems)
    .map((item) => item.trim().slice(0, maxLength))
    .filter(Boolean);
}

function uniqueValues<T>(values: T[]) {
  return [...new Set(values)];
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function htmlText(value: string) {
  return escapeHtml(value).replaceAll("\n", "<br />");
}

function getClientAddress(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(identifier: string) {
  const now = Date.now();
  const current = rateLimitStore.get(identifier);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  if (current.count >= RATE_LIMIT_MAX_REQUESTS) return true;
  current.count += 1;
  rateLimitStore.set(identifier, current);
  return false;
}

function hasValidOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "465");
  const secure = process.env.SMTP_SECURE !== "false";
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  if (!host || !user || !password || !Number.isFinite(port)) {
    throw new Error("La configuración SMTP está incompleta.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass: password },
    tls: { minVersion: "TLSv1.2" },
  });
}

function emailFrame(title: string, eyebrow: string, content: string, footer: string) {
  return `<!doctype html>
  <html lang="es">
    <head>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    </head>
    <body style="margin:0;padding:30px 12px;background:#eef3f8;font-family:Arial,Helvetica,sans-serif;color:#172943;">
      <div style="max-width:720px;margin:0 auto;border:1px solid #d7e0ea;border-radius:14px;background:#ffffff;overflow:hidden;box-shadow:0 20px 60px rgba(7,22,47,.08);">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0b2b50" style="width:100%;border-collapse:collapse;background-color:#0b2b50;color:#ffffff;">
          <tr>
            <td bgcolor="#0b2b50" style="padding:31px 34px;background-color:#0b2b50;color:#ffffff;">
              <p style="margin:0 0 24px;color:#ffffff;font-size:16px;font-weight:800;letter-spacing:2.4px;line-height:1;">VIALOOP STUDIO</p>
              <p style="margin:0 0 9px;color:#86bfff;font-size:10px;font-weight:700;letter-spacing:1.8px;line-height:1.4;">${eyebrow}</p>
              <h1 style="margin:0;color:#ffffff;font-size:27px;font-weight:700;line-height:1.18;letter-spacing:-.5px;">${title}</h1>
            </td>
          </tr>
        </table>
        <div style="padding:34px;">${content}</div>
        <div style="padding:19px 34px;border-top:1px solid #e0e6ed;background:#f7f9fb;color:#68788b;font-size:10px;line-height:1.65;">${footer}</div>
      </div>
    </body>
  </html>`;
}

function detailRow(label: string, value: string, strong = false) {
  return `<tr>
    <td style="width:35%;padding:9px 13px 9px 0;border-bottom:1px solid #e4e9ef;color:#718197;font-size:11px;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:9px 0;border-bottom:1px solid #e4e9ef;color:#172943;font-size:11px;line-height:1.55;vertical-align:top;${strong ? "font-weight:700;" : ""}">${value}</td>
  </tr>`;
}

function productEmailBlock(item: QuoteItem) {
  return `<div style="padding:20px 0;border-bottom:1px solid #dfe6ee;">
    <h2 style="margin:0 0 8px;color:#152d4b;font-size:14px;">${escapeHtml(item.name)}</h2>
    <p style="margin:0;color:#667991;font-size:11px;line-height:1.65;">${escapeHtml(item.description)}</p>
    <ul style="margin:11px 0 0;padding-left:17px;color:#52677f;font-size:10.5px;line-height:1.7;">
      ${item.features.map((feature) => `<li style="margin:3px 0;">${escapeHtml(feature)}</li>`).join("")}
    </ul>
  </div>`;
}

export async function POST(request: NextRequest) {
  if (!hasValidOrigin(request)) {
    return NextResponse.json({ ok: false, message: "No fue posible validar el origen de la solicitud." }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 75_000) {
    return NextResponse.json({ ok: false, message: "La solicitud contiene demasiada información." }, { status: 413 });
  }

  if (isRateLimited(getClientAddress(request))) {
    return NextResponse.json({ ok: false, message: "Se han recibido varias solicitudes. Espere unos minutos e intente nuevamente." }, { status: 429 });
  }

  let body: QuoteBody;
  try {
    body = (await request.json()) as QuoteBody;
  } catch {
    return NextResponse.json({ ok: false, message: "La información enviada no tiene un formato válido." }, { status: 400 });
  }

  if (getText(body.website, 120)) {
    return NextResponse.json({ ok: true, message: "La solicitud fue recibida correctamente.", requestId: "VL-RECIBIDA" });
  }

  const serviceIds = uniqueValues(getStringArray(body.serviceIds, 6, 30)) as ServiceId[];
  const webPlanId = getText(body.webPlanId, 30) as WebPlanId;
  const materialIds = uniqueValues(getStringArray(body.materialIds, 2, 30)) as MaterialId[];
  const hostingPlanId = getText(body.hostingPlanId, 30) as HostingPlanId;
  const googleNeed = getText(body.googleNeed, 160);
  const systemArea = getText(body.systemArea, 160);
  const systemUsers = getText(body.systemUsers, 80);
  const systemIntegrations = getText(body.systemIntegrations, 800);
  const otherSubject = getText(body.otherSubject, 160);
  const currentWebsite = getText(body.currentWebsite, 160);
  const contentStatus = getText(body.contentStatus, 160);
  const company = getText(body.company, 120);
  const industry = getText(body.industry, 120);
  const city = getText(body.city, 100);
  const objective = getText(body.objective, 2000);
  const reference = getText(body.reference, 300);
  const desiredStart = getText(body.desiredStart, 100);
  const fullName = getText(body.fullName, 120);
  const email = getText(body.email, 180).toLowerCase();
  const phone = getText(body.phone, 40);
  const preferredContact = getText(body.preferredContact, 80);
  const privacyAccepted = body.privacyAccepted === true;

  if (serviceIds.length === 0 || serviceIds.some((id) => !Object.hasOwn(SERVICES, id))) {
    return NextResponse.json({ ok: false, message: "Seleccione al menos un servicio válido." }, { status: 400 });
  }
  if (serviceIds.includes("web") && !Object.hasOwn(WEB_PLANS, webPlanId)) {
    return NextResponse.json({ ok: false, message: "Seleccione un tipo de sitio web válido." }, { status: 400 });
  }
  if (serviceIds.includes("material") && (materialIds.length === 0 || materialIds.some((id) => !Object.hasOwn(MATERIALS, id)))) {
    return NextResponse.json({ ok: false, message: "Seleccione al menos un material comercial válido." }, { status: 400 });
  }
  if (serviceIds.includes("hosting") && !Object.hasOwn(HOSTING_PLANS, hostingPlanId)) {
    return NextResponse.json({ ok: false, message: "Seleccione una alternativa de hosting válida." }, { status: 400 });
  }
  if (serviceIds.includes("google") && !googleNeed) {
    return NextResponse.json({ ok: false, message: "Complete la necesidad principal para Google." }, { status: 400 });
  }
  if (serviceIds.includes("sistema") && (!systemArea || !systemUsers)) {
    return NextResponse.json({ ok: false, message: "Complete el área y la cantidad estimada de usuarios." }, { status: 400 });
  }
  if (serviceIds.includes("otro") && otherSubject.length < 5) {
    return NextResponse.json({ ok: false, message: "Indique brevemente el asunto de la consulta." }, { status: 400 });
  }

  const onlyOther = serviceIds.length === 1 && serviceIds[0] === "otro";
  if (!onlyOther && (company.length < 2 || industry.length < 2 || city.length < 2)) {
    return NextResponse.json({ ok: false, message: "Complete los antecedentes de la empresa." }, { status: 400 });
  }
  if (objective.length < 20 || !desiredStart) {
    return NextResponse.json({ ok: false, message: "Describa el objetivo y el inicio esperado." }, { status: 400 });
  }
  if (fullName.length < 3 || !isValidEmail(email) || phone.length < 8) {
    return NextResponse.json({ ok: false, message: "Revise el nombre, correo electrónico y teléfono." }, { status: 400 });
  }
  if (!preferredContact || !privacyAccepted) {
    return NextResponse.json({ ok: false, message: "Seleccione un medio de contacto y acepte el aviso de privacidad." }, { status: 400 });
  }

  const items: QuoteItem[] = [];
  if (serviceIds.includes("web")) {
    const plan = WEB_PLANS[webPlanId];
    items.push({ id: webPlanId, name: plan.name, description: plan.description, features: [...plan.features] });
  }
  if (serviceIds.includes("material")) {
    materialIds.forEach((id) => {
      const item = MATERIALS[id];
      items.push({ id, name: item.name, description: item.description, features: [...item.features] });
    });
  }
  if (serviceIds.includes("hosting")) {
    const hosting = HOSTING_PLANS[hostingPlanId];
    items.push({ id: hostingPlanId, name: hosting.name, description: hosting.description, features: [...hosting.features] });
  }
  if (serviceIds.includes("sistema")) {
    items.push({ id: "sistema", name: "Software a medida", description: "Desarrollo de software según los procesos y requerimientos de la empresa.", features: [systemArea, systemUsers, systemIntegrations].filter(Boolean) });
  }
  if (serviceIds.includes("google")) {
    items.push({ id: "google", name: "Google y visibilidad", description: googleNeed, features: ["El alcance de la gestión se define en la propuesta.", "El presupuesto publicitario se acuerda por separado y se paga directamente a Google."] });
  }
  if (serviceIds.includes("otro")) {
    items.push({ id: "otro", name: "Otra consulta", description: otherSubject, features: [] });
  }

  const requestId = `VC-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${randomUUID().slice(0, 8).toUpperCase()}`;
  const now = new Date();
  const receivedAt = new Intl.DateTimeFormat("es-CL", { dateStyle: "full", timeStyle: "short", timeZone: "America/Santiago" }).format(now);

  const branchDetails = [
    serviceIds.includes("web") && currentWebsite ? `Sitio actual: ${currentWebsite}` : "",
    serviceIds.includes("web") && contentStatus ? `Estado del contenido: ${contentStatus}` : "",
    serviceIds.includes("sistema") ? `Área o proceso: ${systemArea}` : "",
    serviceIds.includes("sistema") ? `Usuarios estimados: ${systemUsers}` : "",
    serviceIds.includes("sistema") && systemIntegrations ? `Integraciones: ${systemIntegrations}` : "",
    serviceIds.includes("google") ? `Objetivo Google: ${googleNeed}` : "",
    serviceIds.includes("otro") ? `Asunto adicional: ${otherSubject}` : "",
  ].filter(Boolean);

  const safeName = escapeHtml(fullName);
  const safeCompany = escapeHtml(company || "No informada");
  const productsHtml = items.map(productEmailBlock).join("");
  const evaluationHtml = `<div style="margin:25px 0 0;padding:22px;border-radius:10px;background:#0b2340;color:#ffffff;">
    <p style="margin:0 0 10px;color:#8dc2ff;font-size:9px;font-weight:700;letter-spacing:1.3px;">PROPUESTA A MEDIDA</p>
    <p style="margin:0;font-size:13px;line-height:1.7;">Revisaremos sus antecedentes para definir el alcance, los plazos y la propuesta económica. Este mensaje confirma la recepción de su solicitud.</p>
  </div>`;

  const clientContent = `
    <p style="margin:0;color:#41566d;font-size:13px;line-height:1.75;">Estimado/a <strong>${safeName}</strong>:</p>
    <p style="margin:17px 0 0;color:#41566d;font-size:13px;line-height:1.75;">Preparamos un resumen de los servicios seleccionados para <strong>${safeCompany}</strong>, y los antecedentes de su proyecto.</p>
    <table role="presentation" style="width:100%;margin-top:22px;border-collapse:collapse;">
      ${detailRow("Identificador", escapeHtml(requestId), true)}
      ${detailRow("Servicios", escapeHtml(serviceIds.map((id) => SERVICES[id]).join(" · ")), true)}
      ${detailRow("Inicio esperado", escapeHtml(desiredStart))}
    </table>
    <div style="margin-top:27px;border-top:2px solid #2366c7;">${productsHtml}</div>
    ${evaluationHtml}
    <p style="margin:24px 0 0;color:#41566d;font-size:13px;line-height:1.75;"><strong>Doris, del área comercial de Vialoop, se comunicará con usted</strong> por ${escapeHtml(preferredContact.toLowerCase())} para revisar los antecedentes, responder sus consultas y confirmar el alcance definitivo.</p>

    <p style="margin:22px 0 0;color:#172943;font-size:11px;line-height:1.7;">Saludos cordiales,<br /><strong>Área Comercial Vialoop</strong><br /><a href="mailto:contacto@vialoop.cl" style="color:#1768c5;">contacto@vialoop.cl</a><br /><a href="https://vialoop.cl" style="color:#1768c5;">www.vialoop.cl</a></p>`;

  const internalContent = `
    <p style="margin:0 0 20px;color:#41566d;font-size:13px;line-height:1.7;">Se recibió una nueva solicitud desde el formulario de vialoop.cl. El cliente recibió un resumen de los servicios y antecedentes, sin valores automáticos.</p>
    <table role="presentation" style="width:100%;border-collapse:collapse;">
      ${detailRow("Identificador", escapeHtml(requestId), true)}
      ${detailRow("Recepción", escapeHtml(receivedAt))}
      ${detailRow("Nombre", safeName, true)}
      ${detailRow("Empresa", safeCompany, true)}
      ${detailRow("Rubro / ciudad", `${escapeHtml(industry || "No informado")} · ${escapeHtml(city || "No informada")}`)}
      ${detailRow("Correo", `<a href="mailto:${escapeHtml(email)}" style="color:#1768c5;">${escapeHtml(email)}</a>`)}
      ${detailRow("Teléfono", escapeHtml(phone))}
      ${detailRow("Contacto preferido", escapeHtml(preferredContact))}
      ${detailRow("Servicios", escapeHtml(serviceIds.map((id) => SERVICES[id]).join(" · ")), true)}
      ${detailRow("Inicio esperado", escapeHtml(desiredStart))}
    </table>
    ${productsHtml}
    ${evaluationHtml}
    <div style="margin-top:24px;padding:20px 0;border-top:1px solid #dce3eb;border-bottom:1px solid #dce3eb;">
      <p style="margin:0 0 8px;color:#2366c7;font-size:9px;font-weight:700;letter-spacing:1.2px;">OBJETIVO DEL PROYECTO</p>
      <p style="margin:0;color:#172943;font-size:12px;line-height:1.75;">${htmlText(objective)}</p>
    </div>
    ${branchDetails.length ? `<div style="margin-top:20px;">${branchDetails.map((detail) => `<p style="margin:5px 0;color:#60738a;font-size:10.5px;line-height:1.6;">${htmlText(detail)}</p>`).join("")}</div>` : ""}
    ${reference ? `<p style="margin:17px 0 0;color:#60738a;font-size:10.5px;"><strong>Referencia:</strong> ${htmlText(reference)}</p>` : ""}`;

  try {
    const smtpUser = process.env.SMTP_USER;
    if (!smtpUser) throw new Error("Falta SMTP_USER.");

    const transporter = createTransporter();

    await Promise.all([
      transporter.sendMail({
        from: `"Vialoop Cotizaciones" <${smtpUser}>`,
        to: INTERNAL_RECIPIENTS,
        replyTo: email,
        subject: `[Nueva cotización] ${company || fullName} · ${requestId}`,
        text: [
          "NUEVA COTIZACIÓN VIALOOP",
          "",
          `Identificador: ${requestId}`,
          `Nombre: ${fullName}`,
          `Empresa: ${company || "No informada"}`,
          `Correo: ${email}`,
          `Teléfono: ${phone}`,
          `Servicios: ${serviceIds.map((id) => SERVICES[id]).join(", ")}`,
          ...items.map((item) => `${item.name}: ${item.description}`),
          "",
          "Objetivo:",
          objective,
        ].filter(Boolean).join("\n"),
        html: emailFrame("Nueva solicitud de proyecto", "SOLICITUD VIALOOP", internalContent, "Mensaje generado automáticamente. La persona aceptó el aviso de privacidad para evaluar y responder su solicitud."),
      }),
      transporter.sendMail({
        from: `"Vialoop Cotizaciones" <${smtpUser}>`,
        to: email,
        replyTo: "contacto@vialoop.cl",
        subject: `Resumen de su proyecto Vialoop · ${requestId}`,
        text: [
          `Estimado/a ${fullName}:`,
          "",
          "Recibimos su solicitud. Revisaremos sus antecedentes para preparar una propuesta a medida.",
          `Identificador: ${requestId}`,
          `Servicios: ${serviceIds.map((id) => SERVICES[id]).join(", ")}`,
          ...items.map((item) => `${item.name}: ${item.description}`),
          "",
          "Doris, del área comercial de Vialoop, se comunicará con usted para validar el alcance y los próximos pasos.",
          "",
          "Vialoop Studio SpA",
          "contacto@vialoop.cl",
          "https://vialoop.cl",
        ].filter(Boolean).join("\n"),
        html: emailFrame("Recibimos su proyecto", "VIALOOP · ÁREA COMERCIAL", clientContent, "Correo generado automáticamente. Sus datos se utilizan para evaluar y responder esta solicitud conforme a nuestra Política de Privacidad."),
      }),
    ]);

    return NextResponse.json({ ok: true, requestId, message: "La solicitud fue registrada y enviamos el resumen a su correo." });
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    return NextResponse.json({ ok: false, message: "No fue posible enviar la solicitud en este momento. Intente nuevamente más tarde." }, { status: 500 });
  }
}
