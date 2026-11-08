import LegalPage from "@/components/legal/LegalPage";

const policies = [
  {
    title: "1. Términos de Pago",
    content: (
      <>
        <p>La forma de pago, los hitos y las fechas se establecen en la propuesta o contrato aceptado para cada proyecto. Los servicios se cotizan de acuerdo con su alcance y necesidades.</p>
      </>
    ),
    featured: true,
  },
  {
    title: "2. Rondas de Cambios Adicionales",
    content: (
      <p>Las revisiones incluidas se definen en la propuesta de cada proyecto. Las rondas adicionales y las solicitudes que amplíen el alcance se evalúan y cotizan antes de su ejecución.</p>
    ),
    featured: true,
  },
  {
    title: "3. Plazos de Revisión",
    content: <p>Los plazos para revisar avances y entregar observaciones se acuerdan en la propuesta o calendario del proyecto. Las observaciones deben enviarse de forma consolidada para mantener la continuidad del trabajo.</p>,
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
    content: <p>La capacidad de hosting, las cuentas de correo, el dominio y los períodos de contratación o renovación se especifican en cada propuesta. Su inclusión no es automática y depende del servicio acordado con el cliente.</p>,
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
          El servicio de diseño de logotipo se cotiza según el alcance
          acordado con el cliente.
        </p>
        <p>
          El servicio considera la presentación de hasta{" "}
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
          <strong>2 propuestas adicionales</strong>, sujetas a una
          cotización complementaria.
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
  const sections = policies.map((policy, index) => ({
    id: `condicion-${index + 1}`,
    title: policy.title.replace(/^\d+\. /, ""),
    content: policy.content,
  }));
  return <LegalPage current="terms" title="Condiciones de servicio" updated
    description="Cómo organizamos el desarrollo, las revisiones y la entrega de nuestros proyectos web, software y servicios de diseño."
    overview={<p>Cada proyecto comienza con una propuesta a medida. Su alcance, las condiciones de pago y el calendario se definen antes de iniciar el trabajo.</p>}
    navigation={[0, 3, 5, 8, 11, 14, 20].map(index => sections[index])}
    sections={sections} />;
}
