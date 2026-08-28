import { randomUUID } from "crypto";
import nodemailer from "nodemailer";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const INTERNAL_RECIPIENTS = ["contacto@vialoop.cl", "dloayza@vialoop.cl"];

const SERVICES = {
  web: "Sitio web",
  sistema: "Sistema o automatización",
  google: "Google y visibilidad",
  material: "Material comercial",
  otro: "Otra consulta",
} as const;

const WEB_PLANS = {
  emprendedor: {
    name: "Plan Emprendedor",
    net: 280000,
    prefix: "",
    payment: "Pago único al comenzar",
  },
  crece: {
    name: "Plan Crece",
    net: 390000,
    prefix: "",
    payment: "50% al comenzar, 25% al presentar la maqueta y 25% al finalizar",
  },
  empresa: {
    name: "Plan Empresa",
    net: 620000,
    prefix: "Desde",
    payment: "50% al comenzar, 25% al presentar la maqueta y 25% al finalizar",
  },
  ecommerce: {
    name: "Plan E-commerce",
    net: 790000,
    prefix: "Desde",
    payment: "50% al comenzar, 25% al presentar la maqueta y 25% al finalizar",
  },
} as const;

const MATERIALS = {
  logotipo: { name: "Diseño de logotipo", net: 50000 },
  brochure: { name: "Brochure corporativo", net: 150000 },
} as const;

type ServiceId = keyof typeof SERVICES;
type WebPlanId = keyof typeof WEB_PLANS;
type MaterialId = keyof typeof MATERIALS;

type QuoteBody = {
  serviceId?: unknown;
  webPlanId?: unknown;
  materialIds?: unknown;
  googleNeed?: unknown;
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

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type Estimate = {
  label: string;
  net: number | null;
  prefix: string;
  payment: string;
  note: string;
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

function formatCLP(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
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
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    });
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

function getEstimate(
  serviceId: ServiceId,
  webPlanId: string,
  materialIds: string[],
): Estimate {
  if (serviceId === "web") {
    const plan = WEB_PLANS[webPlanId as WebPlanId];
    if (!plan) throw new Error("Seleccione un plan web válido.");

    return {
      label: plan.name,
      net: plan.net,
      prefix: plan.prefix,
      payment: plan.payment,
      note:
        "Incluye hosting de 500 MB, dominio .cl y 2 correos corporativos por un año.",
    };
  }

  if (serviceId === "google") {
    return {
      label: "Google y visibilidad",
      net: 130000,
      prefix: "Desde",
      payment: "Modalidad mensual o según alcance de la campaña",
      note:
        "El presupuesto publicitario pagado directamente a Google no está incluido.",
    };
  }

  if (serviceId === "material") {
    const uniqueIds = [...new Set(materialIds)] as MaterialId[];
    const selected = uniqueIds.map((id) => MATERIALS[id]).filter(Boolean);
    if (selected.length === 0) throw new Error("Seleccione al menos un material comercial.");

    return {
      label: selected.map((item) => item.name).join(" + "),
      net: selected.reduce((total, item) => total + item.net, 0),
      prefix: "",
      payment: "Condiciones confirmadas al formalizar el servicio",
      note: "El alcance y los entregables se confirman antes de comenzar.",
    };
  }

  if (serviceId === "sistema") {
    return {
      label: "Sistema o automatización a medida",
      net: null,
      prefix: "",
      payment: "Se define en la propuesta técnica y comercial",
      note:
        "El valor se determina después de revisar funciones, usuarios, procesos e integraciones.",
    };
  }

  return {
    label: "Otra consulta",
    net: null,
    prefix: "",
    payment: "No corresponde en esta etapa",
    note: "Revisaremos el asunto y responderemos por el medio de contacto indicado.",
  };
}

function emailFrame(title: string, eyebrow: string, content: string, footer: string) {
  return `
    <!doctype html>
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      </head>
      <body style="margin:0;background:#edf1f5;padding:28px 12px;font-family:Arial,Helvetica,sans-serif;color:#17263a;">
        <div style="max-width:700px;margin:0 auto;border:1px solid #d6dee7;border-radius:16px;background:#ffffff;overflow:hidden;box-shadow:0 18px 50px rgba(15,35,58,.08);">
          <div style="padding:29px 32px;background:#091d35;color:#ffffff;">
            <p style="margin:0 0 9px;color:#8dbce6;font-size:10px;font-weight:700;letter-spacing:1.8px;">${eyebrow}</p>
            <h1 style="margin:0;font-size:26px;line-height:1.15;">${title}</h1>
          </div>
          <div style="padding:32px;">${content}</div>
          <div style="padding:18px 32px;border-top:1px solid #e0e6ed;background:#f7f9fb;color:#68788b;font-size:11px;line-height:1.6;">${footer}</div>
        </div>
      </body>
    </html>
  `;
}

function detailRow(label: string, value: string, strong = false) {
  return `
    <tr>
      <td style="width:35%;padding:9px 12px 9px 0;color:#6b7b8e;font-size:12px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:9px 0;color:#17263a;font-size:12px;line-height:1.55;vertical-align:top;${strong ? "font-weight:700;" : ""}">${value}</td>
    </tr>
  `;
}

export async function POST(request: NextRequest) {
  if (!hasValidOrigin(request)) {
    return NextResponse.json(
      { ok: false, message: "No fue posible validar el origen de la solicitud." },
      { status: 403 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 50_000) {
    return NextResponse.json(
      { ok: false, message: "La solicitud contiene demasiada información." },
      { status: 413 },
    );
  }

  const clientAddress = getClientAddress(request);
  if (isRateLimited(clientAddress)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Se han recibido varias solicitudes. Espere unos minutos e intente nuevamente.",
      },
      { status: 429 },
    );
  }

  let body: QuoteBody;
  try {
    body = (await request.json()) as QuoteBody;
  } catch {
    return NextResponse.json(
      { ok: false, message: "La información enviada no tiene un formato válido." },
      { status: 400 },
    );
  }

  if (getText(body.website, 120)) {
    return NextResponse.json({
      ok: true,
      message: "La solicitud fue recibida correctamente.",
      requestId: "VL-RECIBIDA",
    });
  }

  const serviceId = getText(body.serviceId, 30) as ServiceId;
  const webPlanId = getText(body.webPlanId, 30);
  const materialIds = getStringArray(body.materialIds, 2, 30);
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

  if (!Object.hasOwn(SERVICES, serviceId)) {
    return NextResponse.json(
      { ok: false, message: "Seleccione un servicio válido." },
      { status: 400 },
    );
  }

  if (serviceId === "sistema" && (!systemArea || !systemUsers)) {
    return NextResponse.json(
      { ok: false, message: "Complete el área y la cantidad estimada de usuarios." },
      { status: 400 },
    );
  }

  if (serviceId === "google" && !googleNeed) {
    return NextResponse.json(
      { ok: false, message: "Seleccione qué desea mejorar en Google." },
      { status: 400 },
    );
  }

  if (serviceId === "otro" && otherSubject.length < 5) {
    return NextResponse.json(
      { ok: false, message: "Indique brevemente el asunto de su consulta." },
      { status: 400 },
    );
  }

  if (
    serviceId !== "otro" &&
    (company.length < 2 || industry.length < 2 || city.length < 2)
  ) {
    return NextResponse.json(
      { ok: false, message: "Complete los antecedentes de la empresa." },
      { status: 400 },
    );
  }

  if (objective.length < 20 || !desiredStart) {
    return NextResponse.json(
      { ok: false, message: "Describa el objetivo del proyecto y el inicio esperado." },
      { status: 400 },
    );
  }

  if (fullName.length < 3 || !isValidEmail(email) || phone.length < 8) {
    return NextResponse.json(
      { ok: false, message: "Revise el nombre, correo electrónico y teléfono." },
      { status: 400 },
    );
  }

  if (!preferredContact || !privacyAccepted) {
    return NextResponse.json(
      {
        ok: false,
        message: "Seleccione un medio de contacto y acepte el aviso de privacidad.",
      },
      { status: 400 },
    );
  }

  let estimate: Estimate;
  try {
    estimate = getEstimate(serviceId, webPlanId, materialIds);
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "La selección no es válida.",
      },
      { status: 400 },
    );
  }

  const smtpUser = process.env.SMTP_USER;
  if (!smtpUser) {
    console.error("Falta SMTP_USER.");
    return NextResponse.json(
      {
        ok: false,
        message: "El cotizador no está disponible temporalmente. Intente nuevamente más tarde.",
      },
      { status: 503 },
    );
  }

  const requestId = `VC-${new Date()
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "")}-${randomUUID().slice(0, 8).toUpperCase()}`;

  const receivedAt = new Intl.DateTimeFormat("es-CL", {
    dateStyle: "full",
    timeStyle: "medium",
    timeZone: "America/Santiago",
  }).format(new Date());

  const vat = estimate.net === null ? null : Math.round(estimate.net * 0.19);
  const total = estimate.net === null || vat === null ? null : estimate.net + vat;
  const displayedEstimate = estimate.net === null
    ? "Evaluación personalizada"
    : `${estimate.prefix ? `${estimate.prefix} ` : ""}${formatCLP(estimate.net)} + IVA`;

  const branchDetails = [
    serviceId === "web" ? `Plan: ${estimate.label}` : "",
    serviceId === "web" && currentWebsite ? `Sitio actual: ${currentWebsite}` : "",
    serviceId === "web" && contentStatus ? `Contenido: ${contentStatus}` : "",
    serviceId === "sistema" ? `Área o proceso: ${systemArea}` : "",
    serviceId === "sistema" ? `Usuarios: ${systemUsers}` : "",
    serviceId === "sistema" && systemIntegrations
      ? `Integraciones: ${systemIntegrations}`
      : "",
    serviceId === "google" ? `Necesidad: ${googleNeed}` : "",
    serviceId === "material" ? `Material: ${estimate.label}` : "",
    serviceId === "otro" ? `Asunto: ${otherSubject}` : "",
  ].filter(Boolean);

  const safeName = escapeHtml(fullName);
  const companyLabel = company || "No informado";
  const safeCompany = escapeHtml(companyLabel);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeService = escapeHtml(SERVICES[serviceId]);
  const safeEstimate = escapeHtml(displayedEstimate);
  const safePayment = escapeHtml(estimate.payment);
  const safeNote = escapeHtml(estimate.note);

  const internalContent = `
    <p style="margin:0 0 22px;color:#41566d;font-size:13px;line-height:1.7;">
      Se registró una nueva solicitud mediante el cotizador del sitio web.
    </p>
    <table role="presentation" style="width:100%;border-collapse:collapse;">
      ${detailRow("Identificador", escapeHtml(requestId), true)}
      ${detailRow("Recepción", escapeHtml(receivedAt))}
      ${detailRow("Nombre", safeName, true)}
      ${detailRow("Empresa", safeCompany, true)}
      ${detailRow(
        "Rubro / ciudad",
        `${escapeHtml(industry || "No informado")} · ${escapeHtml(city || "No informada")}`,
      )}
      ${detailRow("Correo", `<a href="mailto:${safeEmail}" style="color:#176bb5;">${safeEmail}</a>`)}
      ${detailRow("Teléfono", `<a href="tel:${safePhone}" style="color:#176bb5;">${safePhone}</a>`)}
      ${detailRow("Contacto preferido", escapeHtml(preferredContact))}
      ${detailRow("Servicio", safeService, true)}
      ${detailRow("Alternativa", escapeHtml(estimate.label))}
      ${detailRow("Estimación", safeEstimate, true)}
      ${detailRow("Forma de pago", safePayment)}
      ${detailRow("Inicio esperado", escapeHtml(desiredStart))}
      ${branchDetails.map((item) => detailRow("Detalle", htmlText(item))).join("")}
      ${reference ? detailRow("Referencia", htmlText(reference)) : ""}
    </table>
    <div style="margin-top:24px;padding:20px;border:1px solid #dce3eb;border-left:3px solid #2b78bf;border-radius:10px;background:#f4f7fa;">
      <p style="margin:0 0 8px;color:#536980;font-size:10px;font-weight:700;letter-spacing:1px;">OBJETIVO DEL PROYECTO</p>
      <p style="margin:0;color:#17263a;font-size:13px;line-height:1.75;">${htmlText(objective)}</p>
    </div>
    <p style="margin:20px 0 0;color:#6c7d90;font-size:11px;line-height:1.7;">
      La persona aceptó el aviso de privacidad para evaluar la solicitud, preparar una cotización y recibir contacto sobre este proyecto.
    </p>
  `;

  const clientPriceBlock = estimate.net === null
    ? `
      <div style="margin:24px 0;padding:22px;border-radius:11px;background:#0b2340;color:#ffffff;">
        <p style="margin:0 0 8px;color:#8dbce6;font-size:10px;font-weight:700;letter-spacing:1.2px;">${serviceId === "otro" ? "GESTIÓN DE LA CONSULTA" : "EVALUACIÓN DEL PROYECTO"}</p>
        <strong style="display:block;font-size:23px;">${serviceId === "otro" ? "Consulta recibida" : "Cotización personalizada"}</strong>
        <p style="margin:11px 0 0;color:#c4d4e4;font-size:12px;line-height:1.65;">${safeNote}</p>
      </div>
    `
    : `
      <div style="margin:24px 0;padding:22px;border-radius:11px;background:#0b2340;color:#ffffff;">
        <p style="margin:0 0 8px;color:#8dbce6;font-size:10px;font-weight:700;letter-spacing:1.2px;">PRESUPUESTO REFERENCIAL</p>
        <strong style="display:block;font-size:27px;">${safeEstimate}</strong>
        <table role="presentation" style="width:100%;margin-top:17px;border-collapse:collapse;color:#ffffff;">
          <tr><td style="padding:7px 0;color:#afc5da;font-size:11px;">Neto</td><td style="padding:7px 0;text-align:right;font-size:11px;">${formatCLP(estimate.net)}</td></tr>
          <tr><td style="padding:7px 0;color:#afc5da;font-size:11px;">IVA 19%</td><td style="padding:7px 0;text-align:right;font-size:11px;">${formatCLP(vat as number)}</td></tr>
          <tr><td style="padding:9px 0;border-top:1px solid #38516a;color:#ffffff;font-size:11px;font-weight:700;">Total referencial</td><td style="padding:9px 0;border-top:1px solid #38516a;text-align:right;font-size:12px;font-weight:700;">${formatCLP(total as number)}</td></tr>
        </table>
      </div>
    `;

  const clientContent = `
    <p style="margin:0;color:#41566d;font-size:13px;line-height:1.75;">Estimado/a <strong>${safeName}</strong>:</p>
    <p style="margin:17px 0 0;color:#41566d;font-size:13px;line-height:1.75;">
      Confirmamos la recepción de su solicitud para <strong>${safeService}</strong>. A continuación encontrará el resumen generado por nuestro cotizador.
    </p>
    <table role="presentation" style="width:100%;margin-top:20px;border-collapse:collapse;">
      ${detailRow("Identificador", escapeHtml(requestId), true)}
      ${detailRow("Empresa", safeCompany)}
      ${detailRow("Servicio", safeService, true)}
      ${detailRow("Alternativa", escapeHtml(estimate.label))}
      ${detailRow("Inicio esperado", escapeHtml(desiredStart))}
    </table>
    ${clientPriceBlock}
    <div style="padding:18px;border:1px solid #d9e1e9;border-radius:10px;background:#f5f8fb;">
      <p style="margin:0;color:#263e57;font-size:12px;line-height:1.7;"><strong>Forma de pago:</strong> ${safePayment}</p>
      <p style="margin:8px 0 0;color:#617489;font-size:11px;line-height:1.7;">${safeNote}</p>
    </div>
    <p style="margin:23px 0 0;color:#41566d;font-size:13px;line-height:1.75;">
      <strong>Doris, del área comercial de Vialoop, se comunicará con usted</strong> por el medio indicado para revisar los antecedentes, resolver sus consultas y confirmar el valor definitivo del proyecto.
    </p>
    <p style="margin:17px 0 0;color:#718094;font-size:11px;line-height:1.7;">
      Este cálculo es referencial y no constituye una cotización formal ni una reserva de disponibilidad. El precio puede variar si cambian el alcance, las funciones, el contenido, las integraciones o los requerimientos informados.
    </p>
    <p style="margin:24px 0 0;color:#17263a;font-size:12px;line-height:1.65;">
      Saludos cordiales,<br /><strong>Área Comercial Vialoop</strong><br />
      <a href="mailto:contacto@vialoop.cl" style="color:#176bb5;">contacto@vialoop.cl</a><br />
      <a href="https://vialoop.cl" style="color:#176bb5;">www.vialoop.cl</a>
    </p>
  `;

  try {
    const transporter = createTransporter();

    await Promise.all([
      transporter.sendMail({
        from: `"Vialoop Cotizaciones" <${smtpUser}>`,
        to: INTERNAL_RECIPIENTS,
        replyTo: email,
        subject: `[Nueva solicitud] ${companyLabel} · ${SERVICES[serviceId]} · ${requestId}`,
        text: [
          "NUEVA SOLICITUD DE COTIZACIÓN",
          "",
          `Identificador: ${requestId}`,
          `Recepción: ${receivedAt}`,
          `Nombre: ${fullName}`,
          `Empresa: ${companyLabel}`,
          `Rubro: ${industry || "No informado"}`,
          `Ciudad: ${city || "No informada"}`,
          `Correo: ${email}`,
          `Teléfono: ${phone}`,
          `Contacto preferido: ${preferredContact}`,
          `Servicio: ${SERVICES[serviceId]}`,
          `Alternativa: ${estimate.label}`,
          `Estimación: ${displayedEstimate}`,
          `Forma de pago: ${estimate.payment}`,
          `Inicio esperado: ${desiredStart}`,
          ...branchDetails,
          reference ? `Referencia: ${reference}` : "",
          "",
          "Objetivo:",
          objective,
        ].filter(Boolean).join("\n"),
        html: emailFrame(
          "Nueva solicitud de cotización",
          "COTIZADOR VIALOOP",
          internalContent,
          "Este correo fue generado automáticamente por el cotizador de Vialoop.",
        ),
      }),
      transporter.sendMail({
        from: `"Vialoop Cotizaciones" <${smtpUser}>`,
        to: email,
        replyTo: "contacto@vialoop.cl",
        subject: `Recibimos su solicitud · ${requestId} · Vialoop`,
        text: [
          `Estimado/a ${fullName}:`,
          "",
          "Confirmamos la recepción de su solicitud.",
          `Identificador: ${requestId}`,
          `Empresa: ${companyLabel}`,
          `Servicio: ${SERVICES[serviceId]}`,
          `Alternativa: ${estimate.label}`,
          `Presupuesto referencial: ${displayedEstimate}`,
          `Forma de pago: ${estimate.payment}`,
          estimate.note,
          "",
          "Doris, del área comercial de Vialoop, se comunicará con usted para revisar los antecedentes y confirmar el valor definitivo.",
          "",
          "Este cálculo es referencial y no constituye una cotización formal.",
          "",
          "Área Comercial Vialoop",
          "contacto@vialoop.cl",
          "https://vialoop.cl",
        ].join("\n"),
        html: emailFrame(
          "Solicitud recibida",
          "VIALOOP · ÁREA COMERCIAL",
          clientContent,
          "Este correo fue generado automáticamente. Sus datos se utilizan para evaluar y responder esta solicitud conforme a nuestra Política de Privacidad.",
        ),
      }),
    ]);

    return NextResponse.json({
      ok: true,
      requestId,
      message:
        "La solicitud fue enviada correctamente. Revise su correo para ver el resumen.",
    });
  } catch (error) {
    console.error("Error al enviar la cotización:", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "No fue posible enviar la solicitud en este momento. Intente nuevamente más tarde.",
      },
      { status: 500 },
    );
  }
}
