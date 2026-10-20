export const softwareProjects = [
  {
    id: "rerchar",
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
] as const;
