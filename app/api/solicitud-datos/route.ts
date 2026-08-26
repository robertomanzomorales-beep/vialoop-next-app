import { randomUUID } from "crypto";
import nodemailer from "nodemailer";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REQUEST_TYPES = {
  acceso: "Acceso a datos personales",
  rectificacion: "Rectificación de datos",
  supresion: "Supresión o eliminación de datos",
  oposicion: "Oposición al tratamiento",
  portabilidad: "Portabilidad de datos",
  revocacion: "Revocación del consentimiento",
  otro: "Otra solicitud relacionada con privacidad",
} as const;

const RELATION_TYPES = {
  visitante: "Visitante del sitio web",
  prospecto: "Persona que solicitó información o cotización",
  cliente: "Cliente o representante de una empresa cliente",
  proveedor: "Proveedor o representante de una empresa proveedora",
  otro: "Otra relación con Vialoop",
} as const;

type RequestType = keyof typeof REQUEST_TYPES;
type RelationType = keyof typeof RELATION_TYPES;

type PrivacyRequestBody = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  relation?: unknown;
  requestType?: unknown;
  details?: unknown;
  privacyAccepted?: unknown;
  website?: unknown;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, RateLimitEntry>();

function getText(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.trim().slice(0, maxLength)
    : "";
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

function getClientAddress(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(identifier: string) {
  const now = Date.now();
  const currentEntry = rateLimitStore.get(identifier);

  if (!currentEntry || currentEntry.resetAt <= now) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    });

    return false;
  }

  if (currentEntry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  currentEntry.count += 1;
  rateLimitStore.set(identifier, currentEntry);

  return false;
}

function hasValidOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) {
    return true;
  }

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
    auth: {
      user,
      pass: password,
    },
    tls: {
      minVersion: "TLSv1.2",
    },
  });
}

export async function POST(request: NextRequest) {
  if (!hasValidOrigin(request)) {
    return NextResponse.json(
      {
        ok: false,
        message: "No fue posible validar el origen de la solicitud.",
      },
      { status: 403 },
    );
  }

  const clientAddress = getClientAddress(request);

  if (isRateLimited(clientAddress)) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Se han recibido varias solicitudes. Espere unos minutos e intente nuevamente.",
      },
      { status: 429 },
    );
  }

  let body: PrivacyRequestBody;

  try {
    body = (await request.json()) as PrivacyRequestBody;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "La información enviada no tiene un formato válido.",
      },
      { status: 400 },
    );
  }

  const honeypot = getText(body.website, 120);

  if (honeypot) {
    return NextResponse.json({
      ok: true,
      message: "La solicitud fue recibida correctamente.",
    });
  }

  const fullName = getText(body.fullName, 120);
  const email = getText(body.email, 180).toLowerCase();
  const phone = getText(body.phone, 40);
  const relation = getText(body.relation, 40) as RelationType;
  const requestType = getText(body.requestType, 40) as RequestType;
  const details = getText(body.details, 4000);
  const privacyAccepted = body.privacyAccepted === true;

  if (fullName.length < 3) {
    return NextResponse.json(
      {
        ok: false,
        message: "Ingrese su nombre completo.",
      },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Ingrese un correo electrónico válido.",
      },
      { status: 400 },
    );
  }

  if (!Object.hasOwn(RELATION_TYPES, relation)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Seleccione su relación con Vialoop.",
      },
      { status: 400 },
    );
  }

  if (!Object.hasOwn(REQUEST_TYPES, requestType)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Seleccione el derecho o solicitud que desea ejercer.",
      },
      { status: 400 },
    );
  }

  if (details.length < 20) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Describa su solicitud con suficiente información para poder evaluarla.",
      },
      { status: 400 },
    );
  }

  if (!privacyAccepted) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Debe confirmar que la información será utilizada para gestionar su solicitud.",
      },
      { status: 400 },
    );
  }

  const smtpUser = process.env.SMTP_USER;
  const privacyEmail = process.env.PRIVACY_EMAIL || smtpUser;

  if (!smtpUser || !privacyEmail) {
    console.error("Faltan SMTP_USER o PRIVACY_EMAIL.");

    return NextResponse.json(
      {
        ok: false,
        message:
          "El canal de privacidad no está disponible temporalmente. Intente nuevamente más tarde.",
      },
      { status: 503 },
    );
  }

  const requestId = `VD-${new Date()
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "")}-${randomUUID().slice(0, 8).toUpperCase()}`;

  const safeName = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "No informado");
  const safeRelation = escapeHtml(RELATION_TYPES[relation]);
  const safeRequestType = escapeHtml(REQUEST_TYPES[requestType]);
  const safeDetails = escapeHtml(details).replaceAll("\n", "<br />");
  const receivedAt = new Intl.DateTimeFormat("es-CL", {
    dateStyle: "full",
    timeStyle: "medium",
    timeZone: "America/Santiago",
  }).format(new Date());

  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"Vialoop Privacidad" <${smtpUser}>`,
      to: privacyEmail,
      replyTo: email,
      subject: `[Privacidad] ${REQUEST_TYPES[requestType]} · ${requestId}`,
      text: [
        "NUEVA SOLICITUD DE PRIVACIDAD",
        "",
        `Identificador: ${requestId}`,
        `Fecha de recepción: ${receivedAt}`,
        `Nombre: ${fullName}`,
        `Correo: ${email}`,
        `Teléfono: ${phone || "No informado"}`,
        `Relación con Vialoop: ${RELATION_TYPES[relation]}`,
        `Tipo de solicitud: ${REQUEST_TYPES[requestType]}`,
        "",
        "Descripción:",
        details,
        "",
        "La persona confirmó el uso de la información para gestionar esta solicitud.",
      ].join("\n"),
      html: `
        <div style="margin:0;background:#eef1f5;padding:32px;font-family:Arial,sans-serif;color:#17263a;">
          <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #d5dce5;">
            <div style="background:#091d35;padding:26px 30px;color:#ffffff;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:1.8px;color:#8dbce6;">PRIVACIDAD Y DATOS</p>
              <h1 style="margin:0;font-size:25px;">Nueva solicitud de derechos</h1>
            </div>
            <div style="padding:30px;">
              <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6;">
                <tr><td style="padding:8px 0;color:#6b7787;width:190px;">Identificador</td><td style="padding:8px 0;font-weight:bold;">${requestId}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7787;">Recepción</td><td style="padding:8px 0;">${escapeHtml(receivedAt)}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7787;">Nombre</td><td style="padding:8px 0;">${safeName}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7787;">Correo</td><td style="padding:8px 0;">${safeEmail}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7787;">Teléfono</td><td style="padding:8px 0;">${safePhone}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7787;">Relación</td><td style="padding:8px 0;">${safeRelation}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7787;">Solicitud</td><td style="padding:8px 0;font-weight:bold;">${safeRequestType}</td></tr>
              </table>
              <div style="margin-top:24px;padding-top:22px;border-top:1px solid #dce2e9;">
                <p style="margin:0 0 10px;font-size:12px;font-weight:bold;color:#526174;">DESCRIPCIÓN</p>
                <p style="margin:0;font-size:14px;line-height:1.75;">${safeDetails}</p>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    let confirmationSent = true;

    try {
      await transporter.sendMail({
        from: `"Vialoop Privacidad" <${smtpUser}>`,
        to: email,
        replyTo: privacyEmail,
        subject: `Recepción de solicitud de privacidad · ${requestId}`,
        text: [
          `Estimado/a ${fullName}:`,
          "",
          "Confirmamos la recepción de su solicitud relacionada con privacidad y tratamiento de datos personales.",
          "",
          `Identificador: ${requestId}`,
          `Tipo de solicitud: ${REQUEST_TYPES[requestType]}`,
          "",
          "Vialoop revisará los antecedentes y podrá solicitar información adicional para verificar su identidad o localizar los datos correspondientes antes de responder.",
          "",
          "No responda enviando contraseñas ni antecedentes sensibles que no hayan sido solicitados.",
          "",
          "Saludos cordiales,",
          "Vialoop Studio SpA",
          "contacto@vialoop.cl",
        ].join("\n"),
        html: `
          <div style="margin:0;background:#eef1f5;padding:32px;font-family:Arial,sans-serif;color:#17263a;">
            <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #d5dce5;">
              <div style="background:#091d35;padding:25px 28px;color:#ffffff;">
                <p style="margin:0 0 8px;font-size:11px;letter-spacing:1.8px;color:#8dbce6;">VIALOOP PRIVACIDAD</p>
                <h1 style="margin:0;font-size:23px;">Solicitud recibida</h1>
              </div>
              <div style="padding:28px;font-size:14px;line-height:1.75;color:#526174;">
                <p style="margin-top:0;">Estimado/a ${safeName}:</p>
                <p>Confirmamos la recepción de su solicitud relacionada con privacidad y tratamiento de datos personales.</p>
                <div style="margin:22px 0;padding:18px;border-left:3px solid #2d78b9;background:#f2f5f8;">
                  <p style="margin:0 0 7px;"><strong>Identificador:</strong> ${requestId}</p>
                  <p style="margin:0;"><strong>Solicitud:</strong> ${safeRequestType}</p>
                </div>
                <p>Revisaremos los antecedentes y podremos solicitar información adicional para verificar su identidad o localizar los datos correspondientes antes de responder.</p>
                <p>No responda enviando contraseñas ni antecedentes sensibles que no hayan sido solicitados.</p>
                <p style="margin-bottom:0;">Saludos cordiales,<br /><strong>Vialoop Studio SpA</strong><br />contacto@vialoop.cl</p>
              </div>
            </div>
          </div>
        `,
      });
    } catch (confirmationError) {
      confirmationSent = false;
      console.error(
        "La solicitud fue recibida, pero no se pudo enviar la confirmación:",
        confirmationError,
      );
    }

    return NextResponse.json({
      ok: true,
      requestId,
      message: confirmationSent
        ? "La solicitud fue recibida correctamente. Enviamos una confirmación al correo indicado."
        : "La solicitud fue recibida correctamente. Guarde el identificador informado para su seguimiento.",
    });
  } catch (error) {
    console.error("Error al enviar la solicitud de privacidad:", error);

    return NextResponse.json(
      {
        ok: false,
        message:
          "No fue posible enviar la solicitud en este momento. Intente nuevamente o escriba a contacto@vialoop.cl.",
      },
      { status: 500 },
    );
  }
}
