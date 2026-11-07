import type { Metadata } from "next";
import Policies from "@/components/Policies";

export const metadata: Metadata = {
  title: "Políticas de uso | Vialoop",
  description:
    "Condiciones generales de Vialoop para desarrollo web, diseño, entrega de proyectos, pagos, revisiones, soporte, hosting, dominios y servicios gráficos.",
};

export default function PoliticasDeUsoPage() {
  return (
    <main>
      <Policies />

    </main>
  );
}
