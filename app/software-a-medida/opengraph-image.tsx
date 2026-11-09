import { renderSocialPreview } from "@/lib/social-preview";

export const alt = "Software Vialoop: tu forma de trabajar convertida en software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderSocialPreview({ category: "SOFTWARE A MEDIDA", lines: ["Tu forma de trabajar.", "Convertida en software."], description: "Procesos, equipos e información conectados en una solución para tu empresa." });
}
