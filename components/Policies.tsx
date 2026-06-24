const policies = [
  {
    title: "1. Términos de Pago",
    content: (
      <>
        <p>
          Para el <strong>Plan Emprendedor</strong>, el pago se realiza al
          comenzar. Para los planes <strong>Crece</strong> y{" "}
          <strong>Empresa</strong>: <strong>50% al comenzar</strong>,{" "}
          <strong>25% al presentar la maqueta</strong> y{" "}
          <strong>25% al finalizar</strong>.
        </p>
      </>
    ),
    featured: true,
  },
  {
    title: "2. Rondas de Cambios Adicionales",
    content: (
      <ul>
        <li>
          <strong>Plan Emprende:</strong> $36.900 + IVA por ronda adicional.
        </li>
        <li>
          <strong>Plan Crece:</strong> $73.800 + IVA por ronda adicional.
        </li>
        <li>
          <strong>Plan Empresa:</strong> $110.700 + IVA por ronda adicional.
        </li>
      </ul>
    ),
    featured: true,
  },
  {
    title: "3. Plazos de Revisión",
    content: (
      <>
        <ul>
          <li>
            <strong>Plan Crece:</strong> 24 horas corridas.
          </li>
          <li>
            <strong>Otros planes:</strong> 48 o 72 horas corridas.
          </li>
        </ul>
        <p>
          El cliente debe entregar feedback dentro de esos plazos para no
          retrasar el proceso.
        </p>
      </>
    ),
  },
  {
    title: "4. Suspensión y Reintegro del Proyecto",
    content: (
      <>
        <p>
          Si el cliente no envía material o feedback en <strong>72 horas</strong>{" "}
          sin justificación, se considera <strong>abandono</strong> del
          proyecto.
        </p>
        <p>
          Para retomar, se debe abonar un{" "}
          <strong>25% adicional del saldo pendiente</strong> como condición de
          reactivación.
        </p>
      </>
    ),
  },
  {
    title: "5. Facturación",
    content: <p>El proyecto se factura al finalizar.</p>,
  },
  {
    title: "6. Propiedad Intelectual",
    content: (
      <>
        <p>
          Al cancelar el 100% del proyecto, el cliente obtiene la{" "}
          <strong>propiedad y derechos de uso</strong> del sitio.
        </p>
        <p>
          El código reutilizable, librerías o módulos internos de Vialoop no se
          transfieren como propiedad intelectual, pero quedan como parte
          funcional del sitio.
        </p>
      </>
    ),
  },
  {
    title: "7. Soporte Posterior",
    content: (
      <p>
        El proyecto se entrega en pleno funcionamiento. Cualquier soporte o
        mantención posterior se contrata como servicio aparte.
      </p>
    ),
  },
  {
    title: "8. Responsabilidad del Cliente",
    content: (
      <p>
        El cliente debe entregar textos, imágenes, logos y/o videos en los
        plazos acordados. Vialoop no se responsabiliza por retrasos derivados de
        demoras en la entrega de contenido.
      </p>
    ),
  },
  {
    title: "9. Hosting y Dominios",
    content: (
      <p>
        Incluye <strong>hosting 1GB</strong> + <strong>dominio .CL</strong> por
        un año. La administración y renovación posterior son responsabilidad del
        cliente, salvo contratación directa con Vialoop.
      </p>
    ),
  },
  {
    title: "10. Licencias de Software",
    content: (
      <p>
        Las licencias premium usadas en la construcción son gestionadas por
        Vialoop durante el desarrollo. No se transfieren salvo acuerdo distinto.
        El sitio queda funcional; futuras actualizaciones corren por cuenta del
        cliente.
      </p>
    ),
  },
  {
    title: "11. Limitación de Garantía",
    content: (
      <p>
        Garantizamos el correcto funcionamiento al momento de la entrega. No nos
        responsabilizamos por cambios de terceros, caídas de servicios externos
        o incompatibilidades con proveedores ajenos.
      </p>
    ),
  },
  {
    title: "12. Confidencialidad",
    content: (
      <p>
        La información del cliente se maneja de forma confidencial y se utiliza
        exclusivamente para el proyecto.
      </p>
    ),
  },
  {
    title: "13. Devoluciones",
    content: (
      <p>
        <strong>No se realizan devoluciones</strong> en ninguno de nuestros
        productos o servicio.
      </p>
    ),
  },
  {
    title: "14. Entrega de Material y Cambios",
    content: (
      <ul>
        <li>
          El <strong>material</strong>, textos, imágenes, logos, videos y/o los{" "}
          <strong>cambios u observaciones</strong> deben enviarse{" "}
          <strong>por correo electrónico</strong>.
        </li>
        <li>
          El material debe ser <strong>legible</strong>, en formatos estándar
          como .docx, .pdf, .jpg, .png o .webp, y{" "}
          <strong>previamente filtrado</strong> por el cliente.
        </li>
        <li>
          Para archivos pesados, recomendamos usar{" "}
          <a
            href="https://wetransfer.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            WeTransfer
          </a>{" "}
          o{" "}
          <a
            href="https://www.filemail.com/es"
            target="_blank"
            rel="noopener noreferrer"
          >
            Filemail
          </a>
          .
        </li>
      </ul>
    ),
  },
  {
    title: "15. Diseño de Logotipo",
    content: (
      <>
        <p>
          El servicio de diseño de logotipo tiene un valor de{" "}
          <strong>$49.900 + IVA</strong>.
        </p>
        <p>
          Este valor incluye la presentación de hasta{" "}
          <strong>2 propuestas iniciales de logotipo</strong>, desarrolladas
          según la información entregada por el cliente al momento de solicitar
          el servicio.
        </p>
      </>
    ),
    featured: true,
  },
  {
    title: "16. Información Inicial para Logotipo",
    content: (
      <>
        <p>
          Para iniciar el diseño del logotipo, el cliente debe entregar
          información clara sobre su empresa, rubro, estilo deseado, colores de
          preferencia y referencias visuales que considere importantes.
        </p>
        <p>
          También debe indicar desde el inicio si existe algún elemento que{" "}
          <strong>no desea incluir</strong> en el diseño.
        </p>
      </>
    ),
  },
  {
    title: "17. Propuestas Incluidas de Logotipo",
    content: (
      <p>
        El servicio incluye hasta <strong>2 propuestas iniciales</strong>. El
        cliente deberá revisar ambas propuestas y elegir una de ellas como base
        para continuar el proceso de ajustes.
      </p>
    ),
  },
  {
    title: "18. Ajustes Incluidos en Logotipo",
    content: (
      <>
        <p>
          Una vez seleccionada una propuesta, se podrán realizar hasta{" "}
          <strong>5 ajustes o variaciones menores</strong>.
        </p>
        <ul>
          <li>Modificación de colores.</li>
          <li>Ajustes en tipografía.</li>
          <li>Cambios pequeños en distribución.</li>
          <li>Correcciones de detalles visuales.</li>
          <li>Ajustes simples de proporción o alineación.</li>
        </ul>
      </>
    ),
  },
  {
    title: "19. Cambios No Incluidos en Logotipo",
    content: (
      <>
        <p>
          No se consideran ajustes menores las solicitudes que impliquen
          rediseñar o cambiar por completo el concepto aprobado.
        </p>
        <ul>
          <li>Solicitar una propuesta completamente nueva.</li>
          <li>Cambiar por completo el concepto aprobado.</li>
          <li>Agregar nuevos elementos principales al logotipo.</li>
          <li>Cambiar la idea base después de haber elegido una propuesta.</li>
          <li>Rediseñar el logotipo desde cero.</li>
        </ul>
      </>
    ),
  },
  {
    title: "20. Propuestas Adicionales de Logotipo",
    content: (
      <>
        <p>
          Si el cliente necesita más propuestas después de recibir las{" "}
          <strong>2 propuestas iniciales</strong>, podrá solicitar{" "}
          <strong>2 propuestas adicionales</strong> por un valor de{" "}
          <strong>$29.900 + IVA</strong>.
        </p>
        <p>
          Estas propuestas se desarrollarán considerando las nuevas indicaciones
          entregadas por el cliente.
        </p>
      </>
    ),
  },
  {
    title: "21. Importancia de la Información Entregada",
    content: (
      <>
        <p>
          El proceso de diseño se realiza en base a la información entregada por
          el cliente. Mientras más clara sea la información inicial, más preciso
          será el resultado.
        </p>
        <p>
          El cliente debe comunicar desde el inicio sus preferencias,
          restricciones o elementos que no desea ver en el logotipo para
          desarrollar propuestas alineadas a su marca.
        </p>
      </>
    ),
    featured: true,
  },
];

export default function Policies() {
  return (
    <section
      id="vl-policies"
      aria-label="Políticas de Vialoop"
      className="relative isolate overflow-hidden bg-[#f7f8fa] px-6 py-28 text-[#1f2937] md:px-10 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_0%,rgba(37,99,235,.08),transparent_30%),radial-gradient(circle_at_88%_8%,rgba(56,189,248,.08),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#f7f8fa_45%,#f3f5f7_100%)]" />

      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5] [background-image:linear-gradient(rgba(15,23,42,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.035)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:linear-gradient(180deg,transparent_0%,black_18%,black_78%,transparent_100%)]" />

      <div className="mx-auto max-w-[1080px]">
        <header className="mb-12 text-center">
          <span className="mb-5 inline-flex rounded-full border border-slate-200 bg-white px-5 py-2 text-[12px] font-black uppercase tracking-[0.14em] text-slate-500 shadow-[0_10px_24px_rgba(15,23,42,.04)]">
            Condiciones generales
          </span>

          <h1 className="text-[clamp(34px,4vw,52px)] font-black leading-tight tracking-[-0.055em] text-slate-950">
            Políticas de Vialoop
          </h1>

          <p className="mx-auto mt-4 max-w-[760px] text-[16px] leading-8 text-slate-600 md:text-[17px]">
            Nuestras condiciones para el desarrollo, diseño y entrega de
            proyectos web y servicios gráficos.
          </p>
        </header>

        <div className="mb-6 rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_14px_38px_rgba(15,23,42,.06)] md:p-7">
          <p className="text-[15.5px] leading-8 text-slate-700">
            <strong className="font-black text-slate-900">Importante:</strong>{" "}
            Todos los planes web incluyen{" "}
            <strong className="font-black text-slate-900">hosting 1GB</strong> y{" "}
            <strong className="font-black text-slate-900">dominio .CL</strong>{" "}
            por un año. La renovación posterior es responsabilidad del cliente,
            salvo contratación directa con Vialoop.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {policies.map((policy) => (
            <article
              key={policy.title}
              className={`rounded-[20px] border p-6 shadow-[0_10px_28px_rgba(15,23,42,.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(15,23,42,.08)] ${
                policy.featured
                  ? "border-slate-300 bg-[linear-gradient(180deg,rgba(255,255,255,.98),rgba(255,255,255,.94)),linear-gradient(135deg,rgba(37,99,235,.06),transparent)] md:col-span-2"
                  : "border-slate-200 bg-white"
              }`}
            >
              <h2 className="mb-3 text-[19px] font-black leading-tight tracking-[-0.025em] text-slate-950">
                {policy.title}
              </h2>

              <div className="space-y-2 text-[15px] leading-7 text-slate-700 [&_a]:font-bold [&_a]:text-slate-950 [&_a]:underline [&_a]:underline-offset-4 [&_li]:my-1.5 [&_ul]:ml-5 [&_ul]:list-disc">
                {policy.content}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}