"use client";

import Link from "next/link";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import styles from "./QuoteWizard.module.css";

export type ServiceId = "web" | "sistema" | "google" | "material" | "hosting" | "otro";
type WebPlanId = "emprendedor" | "crece" | "empresa" | "ecommerce";
type MaterialId = "logotipo" | "brochure";
type HostingPlanId = "hosting1gb" | "hosting8gb";
type Step = 1 | 2 | 3;

type QuoteForm = {
  serviceIds: ServiceId[];
  webPlanId: WebPlanId | "";
  materialIds: MaterialId[];
  hostingPlanId: HostingPlanId | "";
  googleNeed: string;
  googleInvestment: string;
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
    description: "Landing pages, sitios empresariales, proyectos corporativos y tiendas online.",
  },
  {
    id: "sistema" as const,
    number: "02",
    title: "Software a medida",
    description: "Herramientas a medida para ordenar procesos, registros, documentos y operaciones.",
  },
  {
    id: "google" as const,
    number: "03",
    title: "Google y visibilidad",
    description: "Gestión, medición y campañas para captar oportunidades comerciales.",
  },
  {
    id: "material" as const,
    number: "04",
    title: "Identidad y material comercial",
    description: "Logotipo y brochure para presentar profesionalmente su empresa.",
  },
  {
    id: "hosting" as const,
    number: "05",
    title: "Hosting y correos",
    description: "Mayor capacidad para su sitio y cuentas de correo corporativas.",
  },
  {
    id: "otro" as const,
    number: "06",
    title: "Otra consulta",
    description: "Soporte, colaboración, reunión u otro requerimiento no incluido.",
  },
];

const webPlans = [
  {
    id: "emprendedor" as const,
    name: "Landing page",
    description: "Landing page de una sola página, organizada en hasta 6 secciones.",
  },
  {
    id: "crece" as const,
    name: "Sitio web empresarial",
    description: "Sitio empresarial con mayor contenido, navegación y capacidad comercial.",
  },
  {
    id: "empresa" as const,
    name: "Sitio corporativo",
    description: "Solución corporativa avanzada para múltiples servicios, áreas o públicos.",
  },
  {
    id: "ecommerce" as const,
    name: "Tienda online",
    description: "Tienda online personalizada para productos, pedidos, clientes y pagos.",
  },
];

const materialOptions = [
  {
    id: "logotipo" as const,
    name: "Diseño de logotipo",
    description: "2 propuestas iniciales y hasta 3 cambios sobre la alternativa elegida.",
  },
  {
    id: "brochure" as const,
    name: "Brochure corporativo",
    description: "Hasta 8 páginas interiores, más portada, índice y contraportada.",
  },
];

const hostingOptions = [
  {
    id: "hosting1gb" as const,
    name: "Hosting 1 GB",
    description: "1 GB de almacenamiento SSD y hasta 5 correos corporativos.",
  },
  {
    id: "hosting8gb" as const,
    name: "Hosting Empresa 8 GB SSD",
    description: "8 GB SSD y correos corporativos ilimitados dentro de la capacidad contratada.",
  },
];

const initialForm: QuoteForm = {
  serviceIds: [],
  webPlanId: "",
  materialIds: [],
  hostingPlanId: "",
  googleNeed: "",
  googleInvestment: "definir",
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

export default function QuoteWizard({ initialService }: { initialService?: ServiceId }) {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<QuoteForm>(() => ({ ...initialForm, serviceIds: initialService ? [initialService] : [] }));
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle", message: "" });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const selectedWebPlan = useMemo(
    () => webPlans.find((plan) => plan.id === form.webPlanId),
    [form.webPlanId],
  );

  const selectedMaterials = useMemo(
    () => materialOptions.filter((item) => form.materialIds.includes(item.id)),
    [form.materialIds],
  );

  const selectedHosting = useMemo(
    () => hostingOptions.find((item) => item.id === form.hostingPlanId),
    [form.hostingPlanId],
  );

  const selectionDetails = [
    ...(form.serviceIds.includes("web") && selectedWebPlan ? [selectedWebPlan] : []),
    ...(form.serviceIds.includes("material") ? selectedMaterials : []),
    ...(form.serviceIds.includes("hosting") && selectedHosting ? [selectedHosting] : []),
    ...(form.serviceIds.includes("sistema") ? [{ id: "sistema", name: "Software a medida", description: [form.systemArea, form.systemUsers].filter(Boolean).join(" · ") }] : []),
    ...(form.serviceIds.includes("google") ? [{ id: "google", name: "Google y visibilidad", description: form.googleNeed }] : []),
    ...(form.serviceIds.includes("otro") ? [{ id: "otro", name: "Otra consulta", description: form.otherSubject }] : []),
  ];

  function updateField(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const target = event.target;
    const value = target instanceof HTMLInputElement && target.type === "checkbox"
      ? target.checked
      : target.value;

    setForm((current) => ({ ...current, [target.name]: value }));
  }

  function toggleService(serviceId: ServiceId) {
    setForm((current) => ({
      ...current,
      serviceIds: current.serviceIds.includes(serviceId)
        ? current.serviceIds.filter((id) => id !== serviceId)
        : [...current.serviceIds, serviceId],
    }));
  }

  function toggleMaterial(materialId: MaterialId) {
    setForm((current) => ({
      ...current,
      materialIds: current.materialIds.includes(materialId)
        ? current.materialIds.filter((id) => id !== materialId)
        : [...current.materialIds, materialId],
    }));
  }

  function canContinueFrom(currentStep: Step) {
    if (currentStep === 1) return form.serviceIds.length > 0;

    if (currentStep === 2) {
      if (form.serviceIds.includes("web") && !form.webPlanId) return false;
      if (form.serviceIds.includes("sistema") && (!form.systemArea || !form.systemUsers)) return false;
      if (form.serviceIds.includes("google") && (!form.googleNeed || !form.googleInvestment)) return false;
      if (form.serviceIds.includes("material") && form.materialIds.length === 0) return false;
      if (form.serviceIds.includes("hosting") && !form.hostingPlanId) return false;
      if (form.serviceIds.includes("otro") && form.otherSubject.trim().length < 5) return false;

      const onlyOther = form.serviceIds.length === 1 && form.serviceIds[0] === "otro";
      return Boolean(
        (onlyOther || (
          form.company.trim().length >= 2 &&
          form.industry.trim().length >= 2 &&
          form.city.trim().length >= 2
        )) &&
        form.objective.trim().length >= 20 &&
        form.desiredStart,
      );
    }

    if (currentStep === 3) {
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
      document.getElementById("cotizador-vialoop")?.scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => setIsTransitioning(false), 50);
    }, 220);
  }

  function goNext() {
    if (!canContinueFrom(step) || step === 3) return;
    changeStep(Math.min(step + 1, 3) as Step);
  }

  function goBack() {
    if (step === 1) return;
    setSubmitState({ status: "idle", message: "" });
    changeStep(Math.max(step - 1, 1) as Step);
  }

  async function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step !== 3 || submitState.status === "sending" || !canContinueFrom(1) || !canContinueFrom(2) || !canContinueFrom(3)) return;

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
        throw new Error(result.message || "No fue posible enviar la cotización.");
      }

      setSubmitState({
        status: "success",
        message: result.message || "Cotización enviada correctamente.",
        requestId: result.requestId,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error instanceof Error
          ? error.message
          : "Ocurrió un problema al enviar la cotización.",
      });
    }
  }

  const selectedServiceNames = services
    .filter((service) => form.serviceIds.includes(service.id))
    .map((service) => service.title);

  if (submitState.status === "success") {
    return (
      <section className={styles.successScreen} aria-labelledby="success-title">
        <div className={styles.successGlow} aria-hidden="true" />
        <div className={styles.successLayout}>
          <div className={styles.successIntro}>
            <p className={styles.eyebrow}>SOLICITUD REGISTRADA</p>
            <h1 id="success-title">
              Gracias, <span>{form.fullName.split(" ")[0]}.</span>
            </h1>
            <p>Recibimos su solicitud. El equipo comercial de Vialoop revisará los antecedentes de su proyecto.</p>
          </div>

          <div className={styles.successDetail}>
            <p className={styles.successLead}>
              Enviamos a <strong>{form.email}</strong> un resumen de los servicios
              y los antecedentes que compartió con nosotros.
            </p>

            <div className={styles.successReference}>
              <span>Identificador</span>
              <strong>{submitState.requestId}</strong>
            </div>

            <ol className={styles.successSteps}>
              <li><span>01</span><p><strong>Resumen enviado.</strong> Revise su correo para consultar los servicios y detalles de su solicitud.</p></li>
              <li><span>02</span><p><strong>Revisión comercial.</strong> Doris revisará personalmente los antecedentes y el alcance informado.</p></li>
              <li><span>03</span><p><strong>Próximo contacto.</strong> Se comunicará por {form.preferredContact.toLowerCase()} para confirmar la propuesta y los siguientes pasos.</p></li>
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
    <section id="cotizador-vialoop" className={styles.quoteSection} aria-labelledby="quote-title">
      <div className={styles.heroGlow} aria-hidden="true" />

      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span /> HABLEMOS DE SU PROYECTO</p>
          <h1 id="quote-title">Cuéntenos qué necesita. <em>Le damos forma juntos.</em></h1>
        </div>

        <div className={styles.heroIntro}>
          <p>
            Seleccione los servicios que necesita y cuéntenos qué quiere resolver.
            Revisaremos sus antecedentes para preparar una propuesta a su medida.
          </p>
          <div className={styles.stageMeta}>
            <span>ETAPA</span>
            <strong>{String(step).padStart(2, "0")} / 03</strong>
          </div>
        </div>
      </header>

      <div className={styles.progress} aria-label={`Etapa ${step} de 3`}>
        {[1, 2, 3].map((item) => (
          <span key={item} className={item <= step ? styles.progressActive : ""} />
        ))}
      </div>

      <form onSubmit={submitQuote} className={styles.workspace} noValidate>
        <aside className={styles.summary}>
          <p className={styles.summaryEyebrow}>RESUMEN ACTUAL</p>

          <dl className={styles.summaryList}>
            <div>
              <dt>Servicios</dt>
              <dd>{selectedServiceNames.length ? selectedServiceNames.join(" · ") : "Sin seleccionar"}</dd>
            </div>
            <div>
              <dt>Empresa</dt>
              <dd>{form.company || "Pendiente"}</dd>
            </div>
            <div>
              <dt>Contacto</dt>
              <dd>{form.fullName || "Pendiente"}</dd>
            </div>
          </dl>

          <div className={styles.summaryTotal}>
            <span>PROPUESTA A MEDIDA</span>
            <strong>Conozcamos su proyecto</strong>
            <small>Definimos el alcance y la inversión después de revisar su solicitud.</small>
          </div>
        </aside>

        <div className={styles.panel}>
          <div className={`${styles.stepViewport} ${isTransitioning ? styles.stepLeaving : ""}`}>
            {step === 1 && (
              <div className={styles.stepContent}>
                <div className={styles.stepHeading}>
                  <span>01</span>
                  <div>
                    <h2>¿Qué necesita cotizar?</h2>
                    <p>Puede seleccionar y combinar todos los servicios que necesite.</p>
                  </div>
                </div>

                <div className={styles.choiceGrid}>
                  {services.map((service) => {
                    const selected = form.serviceIds.includes(service.id);
                    return (
                      <button
                        key={service.id}
                        type="button"
                        className={`${styles.choiceLine} ${selected ? styles.choiceSelected : ""}`}
                        onClick={() => toggleService(service.id)}
                        aria-pressed={selected}
                      >
                        <span>{service.number}</span>
                        <div>
                          <strong>{service.title}</strong>
                          <p>{service.description}</p>
                        </div>
                        <b>{selected ? "AGREGADO" : "SELECCIONAR"}</b>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className={styles.stepContent}>
                <div className={styles.stepHeading}>
                  <span>02</span>
                  <div>
                    <h2>Configure su selección.</h2>
                    <p>Defina las alternativas que formarán parte de su cotización.</p>
                  </div>
                </div>

                <div className={styles.configuration}>
                  {form.serviceIds.includes("web") && (
                    <section className={styles.configSection}>
                      <div className={styles.configHeading}>
                        <span>SITIO WEB</span>
                        <h3>¿Qué tipo de sitio necesita?</h3>
                      </div>
                      <div className={styles.optionList}>
                        {webPlans.map((plan) => (
                          <button
                            key={plan.id}
                            type="button"
                            className={`${styles.optionLine} ${form.webPlanId === plan.id ? styles.optionSelected : ""}`}
                            aria-pressed={form.webPlanId === plan.id}
                            onClick={() => setForm((current) => ({ ...current, webPlanId: plan.id }))}
                          >
                            <div>
                              <strong>{plan.name}</strong>
                              <p>{plan.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                      <p className={styles.note}>Todos incluyen 500 MB de hosting, dominio .cl y 2 correos corporativos por un año.</p>
                    </section>
                  )}

                  {form.serviceIds.includes("material") && (
                    <section className={styles.configSection}>
                      <div className={styles.configHeading}>
                        <span>IDENTIDAD Y MATERIAL</span>
                        <h3>Seleccione una o ambas alternativas</h3>
                      </div>
                      <div className={styles.optionList}>
                        {materialOptions.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            className={`${styles.optionLine} ${form.materialIds.includes(item.id) ? styles.optionSelected : ""}`}
                            aria-pressed={form.materialIds.includes(item.id)}
                            onClick={() => toggleMaterial(item.id)}
                          >
                            <div>
                              <strong>{item.name}</strong>
                              <p>{item.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </section>
                  )}

                  {form.serviceIds.includes("hosting") && (
                    <section className={styles.configSection}>
                      <div className={styles.configHeading}>
                        <span>HOSTING Y CORREOS</span>
                        <h3>Seleccione una capacidad</h3>
                      </div>
                      <div className={styles.optionList}>
                        {hostingOptions.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            className={`${styles.optionLine} ${form.hostingPlanId === item.id ? styles.optionSelected : ""}`}
                            aria-pressed={form.hostingPlanId === item.id}
                            onClick={() => setForm((current) => ({ ...current, hostingPlanId: item.id }))}
                          >
                            <div>
                              <strong>{item.name}</strong>
                              <p>{item.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                      {form.serviceIds.includes("web") && <p className={styles.note}>Esta alternativa amplía y reemplaza la capacidad de hosting incluida en el plan web. Su alcance se revisa en la propuesta.</p>}
                    </section>
                  )}

                  {form.serviceIds.includes("google") && (
                    <section className={styles.configSection}>
                      <div className={styles.configHeading}>
                        <span>GOOGLE Y VISIBILIDAD</span>
                        <h3>¿Qué busca mejorar?</h3>
                      </div>
                      <div className={styles.fieldsGrid}>
                        <label>
                          <span>Necesidad principal *</span>
                          <select name="googleNeed" value={form.googleNeed} onChange={updateField}>
                            <option value="">Seleccione una alternativa</option>
                            <option value="Google Business y posicionamiento local">Google Business y posicionamiento local</option>
                            <option value="SEO y visibilidad orgánica">SEO y visibilidad orgánica</option>
                            <option value="Google Ads y medición">Google Ads y medición</option>
                            <option value="Mantención y optimización mensual">Mantención y optimización mensual</option>
                            <option value="Necesito una recomendación">Necesito una recomendación</option>
                          </select>
                        </label>

                      </div>
                      <p className={styles.note}>Revisaremos el objetivo y el alcance de la gestión. El presupuesto publicitario se define por separado y se paga directamente a Google.</p>
                    </section>
                  )}

                  {form.serviceIds.includes("sistema") && (
                    <section className={styles.configSection}>
                      <div className={styles.configHeading}>
                        <span>SISTEMA O AUTOMATIZACIÓN</span>
                        <h3>Información inicial del proceso</h3>
                      </div>
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
                          <span>Integraciones o herramientas actuales</span>
                          <textarea name="systemIntegrations" value={form.systemIntegrations} onChange={updateField} rows={3} maxLength={800} placeholder="Excel, correo, facturación, equipos, base de datos u otra plataforma." />
                        </label>
                      </div>
                      <p className={styles.note}>Este servicio requiere evaluación y se incorporará a la propuesta definitiva después de revisar su alcance.</p>
                    </section>
                  )}

                  {form.serviceIds.includes("otro") && (
                    <section className={styles.configSection}>
                      <div className={styles.configHeading}>
                        <span>OTRA CONSULTA</span>
                        <h3>Indique brevemente el asunto</h3>
                      </div>
                      <div className={styles.fieldsGrid}>
                        <label className={styles.fieldFull}>
                          <span>Asunto *</span>
                          <input name="otherSubject" value={form.otherSubject} onChange={updateField} maxLength={160} placeholder="Ejemplo: soporte, alianza, reunión u otro servicio" />
                        </label>
                      </div>
                    </section>
                  )}

                  <section className={styles.configSection}>
                    <div className={styles.configHeading}>
                      <span>SU PROYECTO</span>
                      <h3>Contexto para orientar la propuesta</h3>
                    </div>
                    <div className={styles.fieldsGrid}>
                      <label><span>Empresa o negocio *</span><input name="company" value={form.company} onChange={updateField} maxLength={120} /></label>
                      <label><span>Rubro *</span><input name="industry" value={form.industry} onChange={updateField} maxLength={120} /></label>
                      <label><span>Ciudad *</span><input name="city" value={form.city} onChange={updateField} maxLength={100} /></label>
                      <label>
                        <span>Inicio esperado *</span>
                        <select name="desiredStart" value={form.desiredStart} onChange={updateField}>
                          <option value="">Seleccione una alternativa</option>
                          <option value="Lo antes posible">Lo antes posible</option>
                          <option value="Durante los próximos 30 días">Durante los próximos 30 días</option>
                          <option value="Durante los próximos 60 días">Durante los próximos 60 días</option>
                          <option value="Solo estoy evaluando">Solo estoy evaluando</option>
                        </select>
                      </label>

                      {form.serviceIds.includes("web") && (
                        <>
                          <label>
                            <span>¿Tiene sitio web actualmente?</span>
                            <select name="currentWebsite" value={form.currentWebsite} onChange={updateField}>
                              <option value="">Seleccione una alternativa</option>
                              <option value="No tiene sitio web">No tiene sitio web</option>
                              <option value="Sí, necesita una renovación">Sí, necesita una renovación</option>
                              <option value="Sí, necesita mejoras específicas">Sí, necesita mejoras específicas</option>
                            </select>
                          </label>
                          <label>
                            <span>Estado del contenido</span>
                            <select name="contentStatus" value={form.contentStatus} onChange={updateField}>
                              <option value="">Seleccione una alternativa</option>
                              <option value="Textos e imágenes listos">Textos e imágenes listos</option>
                              <option value="Material parcialmente listo">Material parcialmente listo</option>
                              <option value="Necesita apoyo para organizarlo">Necesita apoyo para organizarlo</option>
                            </select>
                          </label>
                        </>
                      )}

                      <label className={styles.fieldFull}>
                        <span>Objetivo principal o detalle de la consulta *</span>
                        <textarea name="objective" value={form.objective} onChange={updateField} rows={4} maxLength={2000} placeholder="Explique brevemente qué necesita resolver, mejorar o conseguir." />
                        <small>{form.objective.length}/2000</small>
                      </label>
                      <label className={styles.fieldFull}>
                        <span>Sitio actual o referencia</span>
                        <input name="reference" value={form.reference} onChange={updateField} maxLength={300} placeholder="https://empresa.cl o una referencia" />
                      </label>
                    </div>
                  </section>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className={styles.stepContent}>
                <div className={styles.stepHeading}>
                  <span>03</span>
                  <div>
                    <h2>Revise y envíe su solicitud.</h2>
                    <p>Recibirá este resumen por correo. Doris validará personalmente el alcance antes de confirmar la propuesta.</p>
                  </div>
                </div>

                <div className={styles.fieldsGrid}>
                  <label><span>Nombre completo *</span><input name="fullName" value={form.fullName} onChange={updateField} maxLength={120} autoComplete="name" /></label>
                  <label><span>Correo electrónico *</span><input type="email" name="email" value={form.email} onChange={updateField} maxLength={180} autoComplete="email" /></label>
                  <label><span>Teléfono o WhatsApp *</span><input type="tel" name="phone" value={form.phone} onChange={updateField} maxLength={40} autoComplete="tel" /></label>
                  <label>
                    <span>Medio de contacto preferido *</span>
                    <select name="preferredContact" value={form.preferredContact} onChange={updateField}>
                      <option value="">Seleccione una alternativa</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Llamada telefónica">Llamada telefónica</option>
                      <option value="Correo electrónico">Correo electrónico</option>
                    </select>
                  </label>

                  <label className={styles.honeypot} aria-hidden="true">Sitio web<input name="website" value={form.website} onChange={updateField} tabIndex={-1} autoComplete="off" /></label>

                  <div className={`${styles.privacy} ${styles.fieldFull}`}>
                    <label className={styles.checkboxLabel}>
                      <input type="checkbox" name="privacyAccepted" checked={form.privacyAccepted} onChange={updateField} />
                      <span>He leído la Política de Privacidad y autorizo a Vialoop Studio SpA a tratar estos datos para evaluar mi solicitud, enviarme el resumen de la solicitud y contactarme respecto del proyecto. *</span>
                    </label>
                    <p>No ingrese contraseñas, datos bancarios ni información sensible. Revise la <Link href="/politicasprivacidad" target="_blank">Política de Privacidad</Link> y el <Link href="/solicitud-datos" target="_blank">canal para ejercer sus derechos</Link>.</p>
                  </div>
                </div>

                <div className={styles.reviewList}>
                  {selectionDetails.map((item) => (
                    <div key={item.id}>
                      <strong>{item.name}</strong>
                      <small>{item.description}</small>
                    </div>
                  ))}
                </div>
                <p className={styles.note}>Revisaremos los antecedentes para definir el alcance, los plazos y la propuesta económica de su proyecto.</p>

                <div className={styles.clientReview}>
                  <div><span>Empresa</span><strong>{form.company || "No informada"}</strong><p>{[form.industry, form.city].filter(Boolean).join(" · ")}</p></div>
                  <div><span>Contacto</span><strong>{form.fullName}</strong><p>{form.email}<br />{form.phone}</p></div>
                </div>

                {submitState.status === "error" && <p className={styles.errorMessage} role="alert">{submitState.message}</p>}
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={goBack} disabled={step === 1 || submitState.status === "sending" || isTransitioning}>Volver</button>
            {step < 3 ? (
              <button type="button" className={styles.primaryButton} onClick={goNext} disabled={!canContinueFrom(step) || isTransitioning}>Continuar</button>
            ) : (
              <button type="submit" className={styles.primaryButton} disabled={submitState.status === "sending" || !canContinueFrom(1) || !canContinueFrom(2) || !canContinueFrom(3)}>
                {submitState.status === "sending" ? "Enviando…" : "Enviar solicitud y recibir resumen"}
              </button>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
