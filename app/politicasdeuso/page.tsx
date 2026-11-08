import type { Metadata } from "next";
import Policies from "@/components/Policies";

export const metadata: Metadata = {
  title: "Condiciones de servicio",
  description: "Condiciones de Vialoop para propuestas a medida, pagos, revisiones, entrega de proyectos, hosting y servicios de diseño.",
  alternates: { canonical: "/politicasdeuso" },
};

export default function PoliticasDeUsoPage() { return <Policies />; }
