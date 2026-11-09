import { renderSocialPreview } from "@/lib/social-preview";

export const alt = "Diseño web Vialoop: tu empresa tiene mucho que mostrar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderSocialPreview({ category: "DISEÑO WEB", lines: ["Tu empresa tiene", "mucho que mostrar."], description: "Que tu web lo diga. Diseño con identidad, proyectos reales y acompañamiento cercano." });
}
