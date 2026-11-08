import { NextResponse } from "next/server";

// The former fixed-plan catalog has been retired. Current forms use /api/contacto.
export async function POST() {
  return NextResponse.json({
    ok: false,
    message: "Este cotizador ya no está disponible. Solicita una propuesta a medida desde el formulario de contacto.",
    contactUrl: "/contacto",
  }, { status: 410 });
}
