"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
} from "react";
import styles from "./SystemsSection.module.css";

type RevealStyle = CSSProperties & {
  "--system-delay": string;
};

const WHATSAPP_NUMBER = "56974330586";

const modalFeatures = [
  "Centralización de información y documentos",
  "Usuarios con roles y permisos definidos",
  "Seguimiento de estados, tareas y responsables",
  "Certificados, reportes o registros automatizados",
  "Panel administrativo adaptado a cada proceso",
];

const revealDelay = (delay: number): RevealStyle => ({
  "--system-delay": `${delay}ms`,
});

export default function SystemsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    phone: "",
    process: "",
  });

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const elements = Array.from(
      section.querySelectorAll<HTMLElement>("[data-system-reveal]"),
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      elements.forEach((element) => {
        element.classList.add(styles.visible);
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -7% 0px",
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!modalOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen]);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function updateField(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  const canSend = Boolean(
    formData.company.trim() &&
      formData.name.trim() &&
      formData.phone.trim() &&
      formData.process.trim(),
  );

  function sendToWhatsApp() {
    if (!canSend) return;

    const message = [
      "Hola VÍA LOOP, quiero conversar sobre un sistema para mi empresa.",
      "",
      `Empresa: ${formData.company}`,
      `Nombre: ${formData.name}`,
      `WhatsApp: ${formData.phone}`,
      "",
      "Proceso que necesitamos mejorar:",
      formData.process,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message,
      )}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <>
      <section
        ref={sectionRef}
        id="sistemas-para-empresas"
        className={styles.systemsSection}
        aria-labelledby="systems-title"
      >
        <div className={styles.backgroundGrid} />
        <div className={styles.backgroundGlow} />

        <div className={styles.container}>
          <div className={styles.shell}>
            <div className={styles.copy}>
              <div
                className={`${styles.eyebrow} ${styles.reveal}`}
                data-system-reveal
                style={revealDelay(0)}
              >
                <span />
                <p>SISTEMAS PARA EMPRESAS</p>
              </div>

              <h2
                id="systems-title"
                className={`${styles.title} ${styles.reveal}`}
                data-system-reveal
                style={revealDelay(100)}
              >
                Cuando el proceso ya no cabe en una planilla,
                <span> construimos el sistema.</span>
              </h2>

              <div
                className={`${styles.contentGroup} ${styles.reveal}`}
                data-system-reveal
                style={revealDelay(210)}
              >
                <p className={styles.description}>
                  Desarrollamos plataformas para centralizar información,
                  controlar documentos, asignar responsables y seguir cada
                  etapa de la operación. Un sistema{" "}
                  <em>
                    hecho para la forma en que realmente trabaja tu empresa
                  </em>
                  , sin módulos innecesarios ni procesos genéricos.
                </p>

                <div className={styles.actionArea}>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={openModal}
                  >
                    CONVERSEMOS SOBRE TU SISTEMA
                  </button>

                  <p>
                    Revisamos el proceso antes de proponer una solución.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`${styles.visual} ${styles.reveal}`}
              data-system-reveal
              style={revealDelay(170)}
              aria-hidden="true"
            >
              <div className={styles.visualGlow} />

              <div className={styles.codeWindow}>
                <div className={styles.windowHeader}>
                  <div className={styles.windowDots}>
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className={styles.windowTitle}>
                    sistema-empresa.ts
                  </div>

                  <div className={styles.windowStatus}>
                    <span />
                    Activo
                  </div>
                </div>

                <div className={styles.codeBody}>
                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>01</span>
                    <code>
                      <span className={styles.keyword}>const</span>{" "}
                      <span className={styles.variable}>sistema</span>{" "}
                      <span className={styles.operator}>=</span>{" "}
                      <span className={styles.keyword}>await</span>{" "}
                      <span className={styles.function}>vialoop.crear</span>
                      {"({"}
                    </code>
                  </div>

                  <div className={`${styles.codeLine} ${styles.indent}`}>
                    <span className={styles.lineNumber}>02</span>
                    <code>
                      <span className={styles.property}>problema</span>
                      <span className={styles.operator}>:</span>{" "}
                      <span className={styles.string}>
                        &quot;procesos dispersos&quot;
                      </span>
                      ,
                    </code>
                  </div>

                  <div className={`${styles.codeLine} ${styles.indent}`}>
                    <span className={styles.lineNumber}>03</span>
                    <code>
                      <span className={styles.property}>información</span>
                      <span className={styles.operator}>:</span>{" "}
                      <span className={styles.string}>
                        &quot;centralizada&quot;
                      </span>
                      ,
                    </code>
                  </div>

                  <div className={`${styles.codeLine} ${styles.indent}`}>
                    <span className={styles.lineNumber}>04</span>
                    <code>
                      <span className={styles.property}>control</span>
                      <span className={styles.operator}>:</span> [
                    </code>
                  </div>

                  <div
                    className={`${styles.codeLine} ${styles.doubleIndent}`}
                  >
                    <span className={styles.lineNumber}>05</span>
                    <code>
                      <span className={styles.string}>
                        &quot;usuarios&quot;
                      </span>
                      ,{" "}
                      <span className={styles.string}>
                        &quot;documentos&quot;
                      </span>
                      ,
                    </code>
                  </div>

                  <div
                    className={`${styles.codeLine} ${styles.doubleIndent}`}
                  >
                    <span className={styles.lineNumber}>06</span>
                    <code>
                      <span className={styles.string}>
                        &quot;estados&quot;
                      </span>
                      ,{" "}
                      <span className={styles.string}>
                        &quot;responsables&quot;
                      </span>
                    </code>
                  </div>

                  <div className={`${styles.codeLine} ${styles.indent}`}>
                    <span className={styles.lineNumber}>07</span>
                    <code>],</code>
                  </div>

                  <div className={`${styles.codeLine} ${styles.indent}`}>
                    <span className={styles.lineNumber}>08</span>
                    <code>
                      <span className={styles.property}>resultado</span>
                      <span className={styles.operator}>:</span>{" "}
                      <span className={styles.string}>
                        &quot;operación clara&quot;
                      </span>
                    </code>
                  </div>

                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>09</span>
                    <code>{"});"}</code>
                  </div>

                  <div className={styles.codeComment}>
                    <span className={styles.lineNumber}>10</span>
                    <code>
                      // Menos tareas repetidas. Más control del proceso.
                    </code>
                  </div>
                </div>

                <div className={styles.systemStatus}>
                  <div>
                    <span className={styles.statusPulse} />
                    <p>Proceso centralizado</p>
                  </div>

                  <strong>Listo para crecer</strong>
                </div>
              </div>

              <div className={`${styles.floatingCard} ${styles.cardUsers}`}>
                <span>USUARIOS</span>
                <strong>Roles definidos</strong>
              </div>

              <div
                className={`${styles.floatingCard} ${styles.cardTraceability}`}
              >
                <span>TRAZABILIDAD</span>
                <strong>Cada etapa registrada</strong>
              </div>

              <div className={`${styles.floatingCard} ${styles.cardReports}`}>
                <span>REPORTES</span>
                <strong>Información disponible</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {modalOpen && (
        <div
          className={styles.modalBackdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby="systems-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className={styles.modal}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Cerrar"
            >
              ×
            </button>

            <div className={styles.modalInformation}>
              <p className={styles.modalEyebrow}>
                SISTEMAS PARA EMPRESAS
              </p>

              <h2 id="systems-modal-title">
                Construyamos una solución para tu proceso.
              </h2>

              <p className={styles.modalIntroduction}>
                Antes de hablar de tecnología, necesitamos entender qué
                información manejas, quién participa y dónde se pierde el
                control.
              </p>

              <ul className={styles.modalFeatures}>
                {modalFeatures.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className={styles.modalNote}>
                <span>01</span>

                <p>
                  Partimos entendiendo el problema. Después definimos el sistema
                  necesario.
                </p>
              </div>
            </div>

            <div className={styles.modalFormArea}>
              <p className={styles.formEyebrow}>CUÉNTANOS BREVEMENTE</p>

              <div className={styles.form}>
                <label>
                  <span>Empresa o negocio *</span>

                  <input
                    name="company"
                    value={formData.company}
                    onChange={updateField}
                    placeholder="Nombre de tu empresa"
                  />
                </label>

                <label>
                  <span>Tu nombre *</span>

                  <input
                    name="name"
                    value={formData.name}
                    onChange={updateField}
                    placeholder="Nombre y apellido"
                  />
                </label>

                <label>
                  <span>WhatsApp *</span>

                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={updateField}
                    placeholder="+56 9 1234 5678"
                  />
                </label>

                <label>
                  <span>¿Qué proceso necesitas mejorar? *</span>

                  <textarea
                    name="process"
                    value={formData.process}
                    onChange={updateField}
                    rows={5}
                    placeholder="Ej: certificados, documentos, clientes, estados de trabajo, inventario..."
                  />
                </label>

                <button
                  type="button"
                  className={styles.sendButton}
                  onClick={sendToWhatsApp}
                  disabled={!canSend}
                >
                  ENVIAR POR WHATSAPP
                </button>

                <p className={styles.formDisclaimer}>
                  Se abrirá WhatsApp con los datos listos para enviar.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}