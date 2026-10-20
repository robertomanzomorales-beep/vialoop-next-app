export type SoftwareVariant = "operations" | "laboratory" | "reservations";

type SoftwareProject = {
  id: string; name: string; category: string; title: string;
  description: string; focus: string; capabilities: string[];
  tags: string[]; logo: string; logoWidth: number; logoHeight: number;
  variant: SoftwareVariant; website?: string;
};

export const softwareProjects: SoftwareProject[] = [
  {
    id: "rerchar",
    variant: "operations",
    name: "RERCHAR",
    category: "Economía circular y gestión de materiales",
    title: "Una operación conectada, de la solicitud al cierre.",
    description:
      "Una plataforma a medida para relacionar la gestión comercial con la operación de RERCHAR. Reúne clientes, cotizaciones, servicios, guías y materiales en un mismo entorno de trabajo.",
    focus:
      "Conectar los documentos y movimientos de cada servicio para facilitar su seguimiento entre las distintas áreas de la empresa.",
    capabilities: [
      "Clientes, documentos y cotizaciones",
      "Solicitudes, agenda y despachos",
      "Control de guías y movimientos de material",
      "Stock, abastecimiento y seguimiento administrativo",
    ],
    tags: ["Operación", "Documentos", "Trazabilidad"],
    logo: "/software/rerchar-logo.png",
    logoWidth: 892,
    logoHeight: 311,
  },
  {
    id: "gm-especialistas",
    variant: "laboratory",
    name: "GM Especialistas",
    category: "Calibración y servicios técnicos",
    title: "Cada equipo con su historia, cada servicio con su respaldo.",
    description:
      "Software de gestión para vincular la recepción de equipos, las órdenes de trabajo, los registros técnicos y los certificados. La información del laboratorio y la gestión comercial se organizan alrededor de cada servicio.",
    focus:
      "Dar continuidad al trabajo técnico y administrativo, conservando la relación entre cada equipo, su documentación y las atenciones realizadas.",
    capabilities: [
      "Recepción de equipos y órdenes de trabajo",
      "Historial de equipos y registros técnicos",
      "Certificados y programación de revisiones",
      "Clientes, cotizaciones y estados de pago",
    ],
    tags: ["Equipos", "Registros técnicos", "Certificados"],
    logo: "/software/gm-especialistas-logo.png",
    logoWidth: 500,
    logoHeight: 500,
  },
  {
    id: "martin-atacama-transfers",
    variant: "reservations",
    name: "Martín Atacama Transfers",
    category: "Reservas de traslados y pagos en línea",
    title: "Del trayecto al pago, en un mismo sistema.",
    description: "Sistema de reservas integrado al sitio web para solicitar traslados, coordinar cada servicio y gestionar su pago mediante Flow. Reúne los datos del viaje, la comunicación con el pasajero y el seguimiento del equipo.",
    focus: "Conectar la solicitud, la revisión de disponibilidad y el pago del traslado, con información organizada para el pasajero y el equipo de administración.",
    capabilities: [
      "Origen, destino, fecha, horario y pasajeros",
      "Panel de administración y seguimiento de reservas",
      "Pagos de servicios integrados con Flow",
      "Confirmaciones y notificaciones por correo",
    ],
    tags: ["Reservas", "Flow", "Notificaciones"],
    logo: "/software/martin-atacama-logo.webp",
    logoWidth: 256,
    logoHeight: 256,
    website: "https://www.transferatacamachile.cl/",
  },
];
