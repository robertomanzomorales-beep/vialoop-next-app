import { renderSocialPreview } from "@/lib/social-preview";

export const alt = "Vialoop: diseño web y software a medida para empresas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderSocialPreview({ category: "VIALOOP STUDIO", lines: ["Diseño web y", "software a medida."], description: "Presenta tu empresa y conecta tu operación con soluciones hechas para ti." });
}
