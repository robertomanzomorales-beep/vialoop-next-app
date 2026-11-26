import { randomUUID } from "node:crypto";
import nodemailer from "nodemailer";
import { NextResponse, type NextRequest } from "next/server";
export const runtime = "nodejs";
export const maxDuration = 30;
const recipients = ["contacto@vialoop.cl", "dloayza@vialoop.cl"];
const services: Record<string, string> = {
  web: "Diseño web",
  sistema: "Software a medida",
  google: "Google y visibilidad",
  material: "Material comercial",
  hosting: "Hosting y correos",
  otro: "Consulta general",
};
const attempts = new Map<string, { count: number; until: number }>();
const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";
const escape = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
const paragraph = (value: string) => escape(value).replaceAll("\n", "<br>");
function frame(title: string, content: string) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:28px 14px;background:#eef2f8;color:#17304e;font-family:Arial,sans-serif"><div style="max-width:620px;margin:auto;border:1px solid #dbe3ee;border-radius:12px;overflow:hidden;background:#fff"><div style="padding:29px 30px;background:#071527;color:#fff"><p style="margin:0 0 22px;font-size:15px;letter-spacing:2px">VIALOOP STUDIO</p><h1 style="margin:0;font-size:25px;line-height:1.3;font-weight:500">${title}</h1></div><div style="padding:30px;font-size:14px;line-height:1.8">${content}</div><div style="padding:18px 30px;border-top:1px solid #e4eaf2;font-size:11px;line-height:1.7;color:#687c96">Vialoop Studio SpA · <a href="https://vialoop.cl/politicasprivacidad" style="color:#365e94">Política de Privacidad</a><br>Usamos estos antecedentes para responder tu consulta.</div></div></body></html>`;
}
function limited(key: string) {
  const now = Date.now();
  if (attempts.size > 1000)
    for (const [k, v] of attempts) {
      if (v.until <= now) attempts.delete(k);
    }
  if (attempts.size > 1500) attempts.clear();
  const current = attempts.get(key);
  if (!current || current.until <= now) {
    attempts.set(key, { count: 1, until: now + 900000 });
    return false;
  }
  if (current.count >= 5) return true;
  current.count++;
  return false;
}
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    request.nextUrl.host;
  if (origin) {
    try {
      if (new URL(origin).host !== host)
        return NextResponse.json(
          {
            ok: false,
            message: "No fue posible validar el origen de la consulta.",
          },
          { status: 403 },
        );
    } catch {
      return NextResponse.json(
        { ok: false, message: "Origen inválido." },
        { status: 403 },
      );
    }
  }
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json(
      { ok: false, message: "Formato de consulta inválido." },
      { status: 415 },
    );
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 16000)
    return NextResponse.json(
      { ok: false, message: "La consulta es demasiado extensa." },
      { status: 413 },
    );
  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > 16000)
      return NextResponse.json(
        { ok: false, message: "La consulta es demasiado extensa." },
        { status: 413 },
      );
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      throw new Error("Invalid body");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "La información enviada no tiene un formato válido.",
      },
      { status: 400 },
    );
  }
  if (text(body.website, 120))
    return NextResponse.json({
      ok: true,
      message: "La consulta fue recibida.",
    });
  const fullName = text(body.fullName, 120),
    email = text(body.email, 180).toLowerCase(),
    company = text(body.company, 120),
    phone = text(body.phone, 40),
    message = text(body.message, 2000),
    service = text(body.service, 30);
  if (
    fullName.length < 2 ||
    /[\r\n]/.test(fullName) ||
    !/^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(email) ||
    /[\r\n]/.test(email)
  )
    return NextResponse.json(
      { ok: false, message: "Revisa tu nombre y correo electrónico." },
      { status: 400 },
    );
  if (message.length < 10)
    return NextResponse.json(
      {
        ok: false,
        message:
          "Cuéntanos un poco más sobre tu idea (al menos 10 caracteres).",
      },
      { status: 400 },
    );
  if (phone && phone.replace(/\D/g, "").length < 7)
    return NextResponse.json(
      { ok: false, message: "Revisa tu teléfono o deja ese campo vacío." },
      { status: 400 },
    );
  if (body.privacyAccepted !== true)
    return NextResponse.json(
      {
        ok: false,
        message:
          "Para enviar la consulta debes aceptar el aviso de privacidad.",
      },
      { status: 400 },
    );
  const address =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (limited(address))
    return NextResponse.json(
      {
        ok: false,
        message:
          "Recibimos varias consultas. Espera unos minutos antes de volver a enviar.",
      },
      { status: 429, headers: { "Retry-After": "900" } },
    );
  const hostSmtp = process.env.SMTP_HOST,
    user = process.env.SMTP_USER,
    password = process.env.SMTP_PASSWORD,
    port = Number(process.env.SMTP_PORT || 465);
  if (!hostSmtp || !user || !password || !Number.isFinite(port)) {
    console.error("contact.smtp_configuration_missing");
    return NextResponse.json(
      {
        ok: false,
        message:
          "No pudimos enviar la consulta. Escríbenos a dloayza@vialoop.cl o al +56 9 7433 0586.",
      },
      { status: 503 },
    );
  }
  const transporter = nodemailer.createTransport({
    host: hostSmtp,
    port,
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE !== "false"
      : port === 465,
    auth: { user, pass: password },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
    tls: { minVersion: "TLSv1.2" },
  });
  const requestId = `VL-${randomUUID().slice(0, 8).toUpperCase()}`;
  const category = services[service] || services.otro;
  const details = `<p><strong>Nombre:</strong> ${escape(fullName)}<br><strong>Correo:</strong> ${escape(email)}<br><strong>Empresa:</strong> ${escape(company || "No informada")}<br><strong>Teléfono:</strong> ${escape(phone || "No informado")}<br><strong>Consulta:</strong> ${escape(category)}<br><strong>Referencia:</strong> ${requestId}</p><p style="padding-top:16px;border-top:1px solid #e2e8f1">${paragraph(message)}</p>`;
  try {
    await transporter.sendMail({
      from: `"Vialoop Contacto" <${user}>`,
      to: recipients,
      replyTo: email,
      subject: `Nueva consulta Vialoop · ${requestId}`,
      text: [
        `Nueva consulta ${requestId}`,
        `Nombre: ${fullName}`,
        `Correo: ${email}`,
        `Empresa: ${company || "No informada"}`,
        `Teléfono: ${phone || "No informado"}`,
        `Servicio: ${category}`,
        "",
        message,
        "",
        "La persona aceptó el aviso de privacidad para responder su consulta.",
      ].join("\n"),
      html: frame("Conversemos de un nuevo proyecto", details),
    });
  } catch {
    console.error("contact.delivery_failed", { requestId });
    return NextResponse.json(
      {
        ok: false,
        message:
          "No pudimos enviar tu consulta en este momento. Intenta nuevamente o escríbenos a dloayza@vialoop.cl.",
      },
      { status: 502 },
    );
  }
  let confirmationSent = true;
  try {
    await transporter.sendMail({
      from: `"Vialoop Studio" <${user}>`,
      to: email,
      replyTo: "dloayza@vialoop.cl",
      subject: `Recibimos tu consulta · ${requestId}`,
      text: [
        `Hola ${fullName},`,
        "",
        "Recibimos tu consulta. Doris, del área comercial de Vialoop, revisará los antecedentes para conversar contigo sobre el siguiente paso.",
        `Referencia: ${requestId}`,
        "Tu mensaje:",
        message,
        "",
        "Vialoop Studio SpA",
        "dloayza@vialoop.cl",
        "https://vialoop.cl",
      ].join("\n"),
      html: frame(
        "Gracias por escribirnos.",
        `<p>Hola ${escape(fullName)},</p><p>Recibimos tu consulta. Doris, del área comercial, revisará los antecedentes para conversar contigo sobre el siguiente paso.</p><p><strong>Referencia:</strong> ${requestId}</p><p style="padding-top:16px;border-top:1px solid #e2e8f1"><strong>Tu mensaje</strong><br>${paragraph(message)}</p><p>Saludos,<br>Vialoop Studio SpA<br><a href="mailto:dloayza@vialoop.cl">dloayza@vialoop.cl</a></p>`,
      ),
    });
  } catch {
    confirmationSent = false;
    console.error("contact.acknowledgement_failed", { requestId });
  }
  return NextResponse.json({
    ok: true,
    requestId,
    confirmationSent,
    message: confirmationSent
      ? "Tu consulta fue recibida y enviamos una confirmación a tu correo."
      : "Tu consulta fue recibida. No pudimos enviar la confirmación por correo, pero no necesitas volver a enviarla.",
  });
}
