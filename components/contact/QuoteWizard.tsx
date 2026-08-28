"use client";

import Link from "next/link";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import styles from "./QuoteWizard.module.css";

type ServiceId = "web" | "sistema" | "google" | "material" | "otro";
type WebPlanId = "emprendedor" | "crece" | "empresa" | "ecommerce";
type MaterialId = "logotipo" | "brochure";
type Step = 1 | 2 | 3 | 4 | 5;

type QuoteForm = {
  serviceId: ServiceId | "";
  webPlanId: WebPlanId | "";
  materialIds: MaterialId[];
  googleNeed: string;
  systemArea: string;
  systemUsers: string;
  systemIntegrations: string;
  otherSubject: string;
  currentWebsite: string;
  contentStatus: string;
  company: string;
  industry: string;
  city: string;
  objective: string;
  reference: string;
  desiredStart: string;
  fullName: string;
  email: string;
  phone: string;
  preferredContact: string;
  privacyAccepted: boolean;
  website: string;
};

type SubmitState = {
  status: "idle" | "sending" | "success" | "error";
  message: string;
  requestId?: string;
};

const services = [
  {
    id: "web" as const,
    number: "01",
    title: "Sitio web",
    description:
      "Landing pages, sitios empresariales, plataformas corporativas y tiendas online.",
  },
  {
    id: "sistema" as const,
    number: "02",
    title: "Sistema o automatización",
    description:
      "Herramientas a medida para ordenar procesos, registros, documentos y operaciones.",
  },
  {
    id: "google" as const,
    number: "03",
    title: "Google y visibilidad",
    description:
      "Presencia local, posicionamiento, medición y gestión de campañas para empresas.",
  },
  {
    id: "material" as const,
    number: "04",
    title: "Material comercial",
    description:
      "Diseño de logotipo y brochure corporativo para presentar mejor su empresa.",
  },
  {
    id: "otro" as const,
    number: "05",
    title: "Otra consulta",
    description:
      "Cuéntenos si necesita soporte, hosting, una colaboración u otro servicio no incluido arriba.",
  },
];

const webPlans = [
  {
    id: "emprendedor" as const,
    name: "Plan Emprendedor",
    price: 280000,
    prefix: "",
    payment: "Pago único al comenzar",
    description: "Una landing page de hasta 6 secciones para comenzar con una presencia profesional.",
  },
  {
    id: "crece" as const,
    name: "Plan Crece",
    price: 390000,
    prefix: "",
    payment: "50% al comenzar, 25% al presentar la maqueta y 25% al finalizar",
    description: "Un sitio empresarial con mayor contenido, navegación y capacidad comercial.",
  },
  {
    id: "empresa" as const,
    name: "Plan Empresa",
    price: 620000,
    prefix: "Desde",
    payment: "50% al comenzar, 25% al presentar la maqueta y 25% al finalizar",
    description: "Una solución corporativa avanzada para múltiples servicios, áreas o públicos.",
  },
  {
    id: "ecommerce" as const,
    name: "Plan E-commerce",
    price: 790000,
    prefix: "Desde",
    payment: "50% al comenzar, 25% al presentar la maqueta y 25% al finalizar",
    description: "Una tienda online personalizada para productos, pedidos, clientes y pagos.",
  },
];

const materialOptions = [
  {
    id: "logotipo" as const,
    name: "Diseño de logotipo",
    price: 50000,
    description: "Desarrollo de identidad visual inicial para su empresa o nueva marca.",
  },
  {
    id: "brochure" as const,
    name: "Brochure corporativo",
    price: 150000,
    description: "Documento comercial para presentar empresa, servicios y capacidades.",
  },
];

const initialForm: QuoteForm = {
  serviceId: "",
  webPlanId: "",
  materialIds: [],
  googleNeed: "",
  systemArea: "",
  systemUsers: "",
  systemIntegrations: "",
  otherSubject: "",
  currentWebsite: "",
  contentStatus: "",
  company: "",
  industry: "",
  city: "",
  objective: "",
  reference: "",
  desiredStart: "",
  fullName: "",
  email: "",
  phone: "",
  preferredContact: "",
  privacyAccepted: false,
  website: "",
};

function formatCLP(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

function getServiceName(serviceId: QuoteForm["serviceId"]) {
  return services.find((service) => service.id === serviceId)?.title ?? "Sin seleccionar";
}

export default function QuoteWizard() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<QuoteForm>(initialForm);
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const selectedWebPlan = useMemo(
    () => webPlans.find((plan) => plan.id === form.webPlanId),
    [form.webPlanId],
  );

  const selectedMaterials = useMemo(
    () => materialOptions.filter((item) => form.materialIds.includes(item.id)),
    [form.materialIds],
  );

  const estimate = useMemo(() => {
    if (form.serviceId === "web" && selectedWebPlan) {
      return {
        net: selectedWebPlan.price,
        prefix: selectedWebPlan.prefix,
        payment: selectedWebPlan.payment,
        label: selectedWebPlan.name,
      };
    }

    if (form.serviceId === "google") {
      return {
        net: 130000,
        prefix: "Desde",
        payment: "Modalidad mensual o según alcance de la campaña",
        label: "Google y visibilidad",
      };
    }

    if (form.serviceId === "material" && selectedMaterials.length > 0) {
      return {
        net: selectedMaterials.reduce((total, item) => total + item.price, 0),
        prefix: "",
        payment: "Condiciones confirmadas al formalizar el servicio",
        label: selectedMaterials.map((item) => item.name).join(" + "),
      };
    }

    return null;
  }, [form.serviceId, selectedMaterials, selectedWebPlan]);

  const vat = estimate ? Math.round(estimate.net * 0.19) : null;
  const total = estimate && vat !== null ? estimate.net + vat : null;

  function updateField(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const target = event.target;
    const { name, value } = target;

    setForm((current) => ({
      ...current,
      [name]: target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : value,
    }));
  }

  function selectService(serviceId: ServiceId) {
    setForm((current) => ({
      ...current,
      serviceId,
      webPlanId: serviceId === "web" ? current.webPlanId : "",
      materialIds: serviceId === "material" ? current.materialIds : [],
      googleNeed: serviceId === "google" ? current.googleNeed : "",
      systemArea: serviceId === "sistema" ? current.systemArea : "",
      systemUsers: serviceId === "sistema" ? current.systemUsers : "",
      systemIntegrations: serviceId === "sistema" ? current.systemIntegrations : "",
      otherSubject: serviceId === "otro" ? current.otherSubject : "",
    }));
  }

  function toggleMaterial(materialId: MaterialId) {
    setForm((current) => ({
      ...current,
      materialIds: current.materialIds.includes(materialId)
        ? current.materialIds.filter((item) => item !== materialId)
        : [...current.materialIds, materialId],
    }));
  }

  function canContinueFrom(currentStep: Step) {
    if (currentStep === 1) return Boolean(form.serviceId);

    if (currentStep === 2) {
      if (form.serviceId === "web") return Boolean(form.webPlanId);
      if (form.serviceId === "sistema") return Boolean(form.systemArea && form.systemUsers);
      if (form.serviceId === "google") return Boolean(form.googleNeed);
      if (form.serviceId === "material") return form.materialIds.length > 0;
      if (form.serviceId === "otro") return form.otherSubject.trim().length >= 5;
      return false;
    }

    if (currentStep === 3) {
      if (form.serviceId === "otro") {
        return Boolean(
          form.objective.trim().length >= 20 && form.desiredStart,
        );
      }

      return Boolean(
        form.company.trim().length >= 2 &&
          form.industry.trim().length >= 2 &&
          form.city.trim().length >= 2 &&
          form.objective.trim().length >= 20 &&
          form.desiredStart,
      );
    }

    if (currentStep === 4) {
      return Boolean(
        form.fullName.trim().length >= 3 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
          form.phone.trim().length >= 8 &&
          form.preferredContact &&
          form.privacyAccepted,
      );
    }

    return true;
  }

  function changeStep(nextStep: Step) {
    if (isTransitioning || nextStep === step) return;

    setIsTransitioning(true);

    window.setTimeout(() => {
      setStep(nextStep);
      window.scrollTo({ top: 0, behavior: "smooth" });

      window.setTimeout(() => {
        setIsTransitioning(false);
      }, 40);
    }, 180);
  }

  function goNext() {
    if (!canContinueFrom(step) || step === 5) return;
    changeStep(Math.min(step + 1, 5) as Step);
  }

  function goBack() {
    if (step === 1) return;
    setSubmitState({ status: "idle", message: "" });
    changeStep(Math.max(step - 1, 1) as Step);
  }

  async function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step !== 5 || submitState.status === "sending") return;

    setSubmitState({ status: "sending", message: "Enviando su solicitud…" });

    try {
      const response = await fetch("/api/cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        requestId?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "No fue posible enviar la solicitud.");
      }

      setSubmitState({
        status: "success",
        message: result.message || "La solicitud fue enviada correctamente.",
        requestId: result.requestId,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Ocurrió un problema al enviar la solicitud.",
      });
    }
  }

  if (submitState.status === "success") {
    return (
      <section className={styles.successScreen} aria-labelledby="success-title">
        <div className={styles.successLayout}>
          <div className={styles.successIntro}>
            <p className={styles.eyebrow}>SOLICITUD REGISTRADA</p>
            <h1 id="success-title">Gracias, {form.fullName.split(" ")[0]}.</h1>
            <p>Su proyecto ya ingresó al flujo comercial de Vialoop.</p>

            <div className={styles.successReference}>
              <span>Identificador de seguimiento</span>
              <strong>{submitState.requestId}</strong>
            </div>
          </div>

          <div className={styles.successDetail}>
            <p className={styles.successLead}>
              Enviamos el resumen a <strong>{form.email}</strong>. Conserve el
              identificador para cualquier consulta relacionada con esta solicitud.
            </p>

            <ol className={styles.successSteps}>
              <li>
                <span>01</span>
                <div>
                  <strong>Resumen enviado</strong>
                  <p>Revise su bandeja de entrada y, si es necesario, la carpeta de correo no deseado.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Revisión comercial</strong>
                  <p>Doris revisará los antecedentes, el servicio elegido y el alcance informado.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Contacto y confirmación</strong>
                  <p>Nos comunicaremos por {form.preferredContact.toLowerCase()} para confirmar el valor y los próximos pasos.</p>
                </div>
              </li>
            </ol>

            <div className={styles.successActions}>
              <Link href="/">Volver al inicio</Link>
              <Link href="/portafolio-web">Revisar portafolio</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.quoteSection} aria-labelledby="quote-title">
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>COTIZADOR DE PROYECTOS</p>
            <h1 id="quote-title">Cuéntenos qué necesita su empresa.</h1>
            <p>
              Responda algunas preguntas y reciba por correo una estimación clara con el
              resumen de su proyecto.
            </p>
          </div>

          <div className={styles.headerMeta}>
            <span>Etapa</span>
            <strong>{String(step).padStart(2, "0")} de 05</strong>
          </div>
        </header>

        <div className={styles.progress} aria-label={`Etapa ${step} de 5`}>
          {[1, 2, 3, 4, 5].map((item) => (
            <span
              key={item}
              className={item <= step ? styles.progressActive : ""}
            />
          ))}
        </div>

        <form onSubmit={submitQuote} className={styles.workspace} noValidate>
          <aside className={styles.sidebar}>
            <p className={styles.sidebarLabel}>RESUMEN ACTUAL</p>

            <dl className={styles.summaryList}>
              <div>
                <dt>Servicio</dt>
                <dd>{getServiceName(form.serviceId)}</dd>
              </div>

              {estimate && (
                <div>
                  <dt>Alternativa</dt>
                  <dd>{estimate.label}</dd>
                </div>
              )}

              <div>
                <dt>Empresa</dt>
                <dd>
                  {form.company || (form.serviceId === "otro" ? "No informado" : "Pendiente")}
                </dd>
              </div>

              <div>
                <dt>Contacto</dt>
                <dd>{form.fullName || "Pendiente"}</dd>
              </div>
            </dl>

            <div className={styles.sidebarEstimate}>
              <span>Estimación</span>
              {estimate ? (
                <>
                  <strong>
                    {estimate.prefix ? `${estimate.prefix} ` : ""}
                    {formatCLP(estimate.net)}
                  </strong>
                  <small>Valor neto, IVA no incluido</small>
                </>
              ) : (
                <>
                  <strong>
                    {form.serviceId === "otro"
                      ? "Contacto general"
                      : "Evaluación personalizada"}
                  </strong>
                  <small>
                    {form.serviceId === "otro"
                      ? "Revisaremos su consulta y responderemos por el medio indicado."
                      : "El valor se define después de revisar el alcance."}
                  </small>
                </>
              )}
            </div>
          </aside>

          <div className={styles.panel}>
            {step === 1 && (
              <div className={`${styles.stepContent} ${isTransitioning ? styles.stepLeaving : ""}`}>
                <div className={styles.stepHeading}>
                  <span>01</span>
                  <div>
                    <h2>¿Qué necesita cotizar?</h2>
                    <p>Seleccione el servicio que mejor represente su proyecto.</p>
                  </div>
                </div>

                <div className={styles.choiceGrid}>
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      className={`${styles.choiceCard} ${
                        form.serviceId === service.id ? styles.choiceSelected : ""
                      }`}
                      onClick={() => selectService(service.id)}
                    >
                      <span>{service.number}</span>
                      <strong>{service.title}</strong>
                      <p>{service.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className={`${styles.stepContent} ${isTransitioning ? styles.stepLeaving : ""}`}>
                <div className={styles.stepHeading}>
                  <span>02</span>
                  <div>
                    <h2>Configure su solicitud.</h2>
                    <p>Las preguntas cambian según el servicio seleccionado.</p>
                  </div>
                </div>

                {form.serviceId === "web" && (
                  <div className={styles.planGrid}>
                    {webPlans.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        className={`${styles.planCard} ${
                          form.webPlanId === plan.id ? styles.choiceSelected : ""
                        }`}
                        onClick={() =>
                          setForm((current) => ({ ...current, webPlanId: plan.id }))
                        }
                      >
                        <span className={styles.planKicker}>{plan.prefix || "Valor"}</span>
                        <strong className={styles.planName}>{plan.name}</strong>
                        <b>{formatCLP(plan.price)} + IVA</b>
                        <p>{plan.description}</p>
                        <small>{plan.payment}</small>
                      </button>
                    ))}

                    <p className={styles.includedNotice}>
                      Todos los planes web incluyen hosting de 500 MB, dominio .cl y 2
                      correos corporativos por un año.
                    </p>
                  </div>
                )}

                {form.serviceId === "sistema" && (
                  <div className={styles.fieldsGrid}>
                    <label>
                      <span>Área o proceso principal *</span>
                      <select name="systemArea" value={form.systemArea} onChange={updateField}>
                        <option value="">Seleccione una alternativa</option>
                        <option value="Operaciones y tareas">Operaciones y tareas</option>
                        <option value="Documentos y vencimientos">Documentos y vencimientos</option>
                        <option value="Mantenciones y equipos">Mantenciones y equipos</option>
                        <option value="Clientes, ventas o cotizaciones">Clientes, ventas o cotizaciones</option>
                        <option value="Inventario o bodega">Inventario o bodega</option>
                        <option value="Otro proceso">Otro proceso</option>
                      </select>
                    </label>

                    <label>
                      <span>Usuarios estimados *</span>
                      <select name="systemUsers" value={form.systemUsers} onChange={updateField}>
                        <option value="">Seleccione un rango</option>
                        <option value="1 a 5 usuarios">1 a 5 usuarios</option>
                        <option value="6 a 20 usuarios">6 a 20 usuarios</option>
                        <option value="21 a 50 usuarios">21 a 50 usuarios</option>
                        <option value="Más de 50 usuarios">Más de 50 usuarios</option>
                      </select>
                    </label>

                    <label className={styles.fieldFull}>
                      <span>¿Debe conectarse con otras herramientas?</span>
                      <textarea
                        name="systemIntegrations"
                        value={form.systemIntegrations}
                        onChange={updateField}
                        rows={4}
                        maxLength={800}
                        placeholder="Ejemplo: Excel, correo, facturación, equipos, base de datos o una plataforma actual."
                      />
                    </label>

                    <p className={styles.customNotice}>
                      Los sistemas y automatizaciones se cotizan después de revisar el flujo,
                      las funciones, los usuarios y las integraciones necesarias.
                    </p>
                  </div>
                )}

                {form.serviceId === "google" && (
                  <div className={styles.fieldsGrid}>
                    <label className={styles.fieldFull}>
                      <span>¿Qué desea mejorar? *</span>
                      <select name="googleNeed" value={form.googleNeed} onChange={updateField}>
                        <option value="">Seleccione una alternativa</option>
                        <option value="Google Business y posicionamiento local">
                          Google Business y posicionamiento local
                        </option>
                        <option value="SEO y visibilidad orgánica">SEO y visibilidad orgánica</option>
                        <option value="Google Ads y medición">Google Ads y medición</option>
                        <option value="Mantención y optimización mensual">
                          Mantención y optimización mensual
                        </option>
                        <option value="Necesito una recomendación">Necesito una recomendación</option>
                      </select>
                    </label>

                    <p className={styles.customNotice}>
                      Gestión desde $130.000 + IVA. El presupuesto publicitario pagado a
                      Google no está incluido y se define por separado.
                    </p>
                  </div>
                )}

                {form.serviceId === "material" && (
                  <div className={styles.planGrid}>
                    {materialOptions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`${styles.planCard} ${
                          form.materialIds.includes(item.id) ? styles.choiceSelected : ""
                        }`}
                        onClick={() => toggleMaterial(item.id)}
                      >
                        <span className={styles.planKicker}>Servicio</span>
                        <strong className={styles.planName}>{item.name}</strong>
                        <b>{formatCLP(item.price)} + IVA</b>
                        <p>{item.description}</p>
                        <small>Puede seleccionar una o ambas alternativas.</small>
                      </button>
                    ))}
                  </div>
                )}

                {form.serviceId === "otro" && (
                  <div className={styles.fieldsGrid}>
                    <label className={styles.fieldFull}>
                      <span>¿Sobre qué necesita contactarnos? *</span>
                      <input
                        name="otherSubject"
                        value={form.otherSubject}
                        onChange={updateField}
                        maxLength={160}
                        placeholder="Ejemplo: hosting, soporte, alianza, reunión u otra consulta"
                      />
                    </label>

                    <p className={styles.customNotice}>
                      Su consulta será enviada al equipo de Vialoop y Doris se comunicará
                      por el medio que indique en las siguientes etapas.
                    </p>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className={`${styles.stepContent} ${isTransitioning ? styles.stepLeaving : ""}`}>
                <div className={styles.stepHeading}>
                  <span>03</span>
                  <div>
                    <h2>
                      {form.serviceId === "otro"
                        ? "Denos un poco de contexto."
                        : "Háblenos de su empresa y del proyecto."}
                    </h2>
                    <p>
                      {form.serviceId === "otro"
                        ? "Explique su consulta para dirigirla correctamente dentro de Vialoop."
                        : "Esta información permite preparar una respuesta realmente útil."}
                    </p>
                  </div>
                </div>

                <div className={styles.fieldsGrid}>
                  <label>
                    <span>
                      Empresa o negocio {form.serviceId === "otro" ? "(opcional)" : "*"}
                    </span>
                    <input name="company" value={form.company} onChange={updateField} maxLength={120} />
                  </label>

                  <label>
                    <span>Rubro {form.serviceId === "otro" ? "(opcional)" : "*"}</span>
                    <input name="industry" value={form.industry} onChange={updateField} maxLength={120} />
                  </label>

                  <label>
                    <span>Ciudad {form.serviceId === "otro" ? "(opcional)" : "*"}</span>
                    <input name="city" value={form.city} onChange={updateField} maxLength={100} />
                  </label>

                  <label>
                    <span>
                      {form.serviceId === "otro" ? "Prioridad de la consulta *" : "Inicio esperado *"}
                    </span>
                    <select name="desiredStart" value={form.desiredStart} onChange={updateField}>
                      <option value="">Seleccione una alternativa</option>
                      <option value="Lo antes posible">Lo antes posible</option>
                      <option value="Durante los próximos 30 días">Durante los próximos 30 días</option>
                      <option value="Durante los próximos 60 días">Durante los próximos 60 días</option>
                      <option value="Solo estoy evaluando">Solo estoy evaluando</option>
                    </select>
                  </label>

                  {form.serviceId === "web" && (
                    <>
                      <label>
                        <span>¿Tiene un sitio web actualmente?</span>
                        <select name="currentWebsite" value={form.currentWebsite} onChange={updateField}>
                          <option value="">Seleccione una alternativa</option>
                          <option value="No tiene sitio web">No tiene sitio web</option>
                          <option value="Sí, necesita una renovación">Sí, necesita una renovación</option>
                          <option value="Sí, necesita mejoras específicas">
                            Sí, necesita mejoras específicas
                          </option>
                        </select>
                      </label>

                      <label>
                        <span>Estado del contenido</span>
                        <select name="contentStatus" value={form.contentStatus} onChange={updateField}>
                          <option value="">Seleccione una alternativa</option>
                          <option value="Textos e imágenes listos">Textos e imágenes listos</option>
                          <option value="Material parcialmente listo">Material parcialmente listo</option>
                          <option value="Necesita apoyo para organizarlo">
                            Necesita apoyo para organizarlo
                          </option>
                        </select>
                      </label>
                    </>
                  )}

                  <label className={styles.fieldFull}>
                    <span>
                      {form.serviceId === "otro"
                        ? "Detalle de la consulta *"
                        : "Objetivo principal del proyecto *"}
                    </span>
                    <textarea
                      name="objective"
                      value={form.objective}
                      onChange={updateField}
                      rows={5}
                      maxLength={2000}
                      placeholder={
                        form.serviceId === "otro"
                          ? "Describa su consulta con la información necesaria para poder responderle."
                          : "Explique qué necesita mejorar, resolver o conseguir con este proyecto."
                      }
                    />
                    <small>{form.objective.length}/2000</small>
                  </label>

                  <label className={styles.fieldFull}>
                    <span>Sitio actual o referencia</span>
                    <input
                      name="reference"
                      value={form.reference}
                      onChange={updateField}
                      maxLength={300}
                      placeholder="https://empresa.cl o una referencia que le guste"
                    />
                  </label>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className={`${styles.stepContent} ${isTransitioning ? styles.stepLeaving : ""}`}>
                <div className={styles.stepHeading}>
                  <span>04</span>
                  <div>
                    <h2>¿Con quién debemos comunicarnos?</h2>
                    <p>Le enviaremos el resumen y el identificador de su solicitud.</p>
                  </div>
                </div>

                <div className={styles.fieldsGrid}>
                  <label>
                    <span>Nombre completo *</span>
                    <input name="fullName" value={form.fullName} onChange={updateField} maxLength={120} />
                  </label>

                  <label>
                    <span>Correo electrónico *</span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={updateField}
                      maxLength={180}
                      autoComplete="email"
                    />
                  </label>

                  <label>
                    <span>Teléfono o WhatsApp *</span>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={updateField}
                      maxLength={40}
                      autoComplete="tel"
                    />
                  </label>

                  <label>
                    <span>Medio de contacto preferido *</span>
                    <select
                      name="preferredContact"
                      value={form.preferredContact}
                      onChange={updateField}
                    >
                      <option value="">Seleccione una alternativa</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Llamada telefónica">Llamada telefónica</option>
                      <option value="Correo electrónico">Correo electrónico</option>
                    </select>
                  </label>

                  <label className={styles.honeypot} aria-hidden="true">
                    Sitio web
                    <input
                      name="website"
                      value={form.website}
                      onChange={updateField}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>

                  <div className={`${styles.privacyBox} ${styles.fieldFull}`}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="privacyAccepted"
                        checked={form.privacyAccepted}
                        onChange={updateField}
                      />
                      <span>
                        He leído la Política de Privacidad y autorizo a Vialoop Studio SpA
                        a tratar estos datos para evaluar mi solicitud, preparar una
                        cotización y contactarme respecto de este proyecto. *
                      </span>
                    </label>

                    <p>
                      No ingrese contraseñas, datos bancarios ni antecedentes sensibles.
                      Puede conocer cómo tratamos sus datos y ejercer sus derechos en la{" "}
                      <Link href="/politicasprivacidad" target="_blank">
                        Política de Privacidad
                      </Link>{" "}
                      y en el{" "}
                      <Link href="/solicitud-datos" target="_blank">
                        canal de solicitud de datos
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className={`${styles.stepContent} ${isTransitioning ? styles.stepLeaving : ""}`}>
                <div className={styles.stepHeading}>
                  <span>05</span>
                  <div>
                    <h2>Revise su solicitud.</h2>
                    <p>El valor indicado es una referencia y será confirmado por Vialoop.</p>
                  </div>
                </div>

                <div className={styles.reviewGrid}>
                  <section>
                    <span>Servicio</span>
                    <strong>{getServiceName(form.serviceId)}</strong>
                    <p>
                      {estimate?.label ||
                        (form.serviceId === "otro"
                          ? form.otherSubject
                          : `${form.systemArea} · ${form.systemUsers}`)}
                    </p>
                  </section>

                  <section>
                    <span>Empresa</span>
                    <strong>{form.company || "No informado"}</strong>
                    <p>
                      {[form.industry, form.city].filter(Boolean).join(" · ") ||
                        "Consulta general"}
                    </p>
                  </section>

                  <section>
                    <span>Contacto</span>
                    <strong>{form.fullName}</strong>
                    <p>{form.email}<br />{form.phone}</p>
                  </section>

                  <section>
                    <span>Inicio esperado</span>
                    <strong>{form.desiredStart}</strong>
                    <p>Contacto preferido: {form.preferredContact}</p>
                  </section>
                </div>

                <div className={styles.finalEstimate}>
                  <div>
                    <span>Presupuesto referencial</span>
                    {estimate ? (
                      <strong>
                        {estimate.prefix ? `${estimate.prefix} ` : ""}
                        {formatCLP(estimate.net)} + IVA
                      </strong>
                    ) : (
                      <strong>
                        {form.serviceId === "otro"
                          ? "Consulta sin presupuesto automático"
                          : "Evaluación personalizada"}
                      </strong>
                    )}
                  </div>

                  {estimate && vat !== null && total !== null && (
                    <dl>
                      <div><dt>Neto</dt><dd>{formatCLP(estimate.net)}</dd></div>
                      <div><dt>IVA 19%</dt><dd>{formatCLP(vat)}</dd></div>
                      <div><dt>Total referencial</dt><dd>{formatCLP(total)}</dd></div>
                      <div><dt>Forma de pago</dt><dd>{estimate.payment}</dd></div>
                    </dl>
                  )}

                  {form.serviceId === "web" && (
                    <p>
                      Incluye hosting de 500 MB, dominio .cl y 2 correos corporativos por
                      un año. Renovaciones y servicios adicionales se cotizan por separado.
                    </p>
                  )}

                  {form.serviceId === "sistema" && (
                    <p>
                      Doris se comunicará para coordinar la revisión del proceso y preparar
                      una propuesta técnica y comercial según el alcance real.
                    </p>
                  )}

                  {form.serviceId === "otro" && (
                    <p>
                      Esta solicitud no genera un presupuesto automático. Doris revisará
                      el asunto y se comunicará por el medio de contacto seleccionado.
                    </p>
                  )}
                </div>

                {submitState.status === "error" && (
                  <p className={styles.errorMessage} role="alert">{submitState.message}</p>
                )}
              </div>
            )}

            <div className={styles.actions}>
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1 || submitState.status === "sending" || isTransitioning}
              >
                Volver
              </button>

              {step < 5 ? (
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={goNext}
                  disabled={!canContinueFrom(step) || isTransitioning}
                >
                  Continuar
                </button>
              ) : (
                <button type="submit" className={styles.primaryButton} disabled={submitState.status === "sending"}>
                  {submitState.status === "sending" ? "Enviando…" : "Enviar solicitud y recibir resumen"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
