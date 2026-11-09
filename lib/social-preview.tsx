import { ImageResponse } from "next/og";

type SocialPreview = {
  category: string;
  lines: [string, string];
  description: string;
};

/** Build-time share artwork, kept outside the visitor's JavaScript bundle. */
export function renderSocialPreview({ category, lines, description }: SocialPreview) {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "58px 70px", background: "linear-gradient(135deg, #0d2543, #061120 72%)", color: "#edf3fd", fontFamily: "sans-serif" }}>
      <div style={{ position: "absolute", top: 0, left: 70, right: 70, height: 3, background: "#3385fa" }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1.5 }}>VIALOOP.CL</span>
        <span style={{ fontSize: 17, letterSpacing: 2, color: "#a0b7d7" }}>{category}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 78 }}>
        {lines.map((line, index) => <div key={line} style={{ display: "flex", fontSize: 67, fontWeight: 700, letterSpacing: -2.5, lineHeight: 1.18, color: index ? "#a4c7fb" : "#edf3fd" }}>{line}</div>)}
        <p style={{ display: "flex", maxWidth: 940, margin: "28px 0 0", fontSize: 27, lineHeight: 1.5, color: "#a6bad5" }}>{description}</p>
      </div>
      <div style={{ position: "absolute", left: 70, right: 70, bottom: 48, display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #29405b", paddingTop: 22, color: "#92abc9", fontSize: 19 }}>
        <span>Calama · Antofagasta · Todo Chile</span>
        <span style={{ color: "#c8dcf7" }}>Diseño, tecnología y personas.</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
