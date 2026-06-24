import Footer from "@/components/Footer";

const faqs = [
  {
    question: "¿Cuánto demoran en entregar una página web?",
    answer:
      "El plazo habitual es de 10 a 15 días hábiles. El tiempo final depende del tipo de sitio, la cantidad de secciones y la rapidez en la entrega de contenidos y feedback.",
  },
  {
    question: "¿Cómo son los pagos?",
    answer:
      "Para el Plan Emprendedor, el pago se realiza al comenzar. Para los planes Crece y Empresa: 50% al comenzar, 25% al presentar la maqueta y 25% al finalizar.",
  },
  {
    question: "¿Qué necesito para comenzar mi sitio web?",
    answer:
      "Necesitamos tu logo, información de la empresa, servicios, textos, fotografías, datos de contacto y referencias visuales si las tienes.",
  },
  {
    question: "¿Los planes incluyen hosting y dominio?",
    answer:
      "Sí. Todos los planes web incluyen hosting y dominio .cl por un año.",
  },
  {
    question: "¿En qué tecnología desarrollan las páginas web?",
    answer:
      "Desarrollamos sitios web con React y Next.js, lo que permite crear páginas rápidas, personalizadas y bien estructuradas.",
  },
  {
    question: "¿Incluyen SEO en el sitio web?",
    answer:
      "Incluimos configuración técnica básica para indexación, estructura de contenido, títulos, descripciones y buenas prácticas iniciales.",
  },
  {
    question: "¿El servicio de Google Ads incluye el presupuesto publicitario?",
    answer:
      "No. La gestión de Google Ads tiene un valor independiente y el presupuesto publicitario se paga directamente a Google.",
  },
  {
    question: "¿Ustedes redactan los textos de la página web?",
    answer:
      "El contenido base debe ser entregado por el cliente. Si necesitas copywriting, podemos cotizarlo como servicio adicional.",
  },
  {
    question: "¿Qué incluye el soporte posterior al lanzamiento?",
    answer:
      "Incluye un mes de garantía para ajustes técnicos menores posteriores al lanzamiento. Cambios de contenido o nuevas secciones se cotizan aparte.",
  },
  {
    question: "¿Entregan factura?",
    answer: "Sí. Emitimos factura electrónica por los servicios contratados.",
  },
  {
    question: "¿Trabajan páginas web para empresas en Antofagasta?",
    answer:
      "Sí. Desarrollamos páginas web para empresas en Antofagasta que necesitan mostrar sus servicios, generar confianza y mejorar su presencia online.",
  },
  {
    question: "¿También hacen sitios web para empresas en Calama?",
    answer:
      "Sí. Diseñamos sitios web para empresas en Calama, especialmente negocios industriales, mineros, técnicos, comerciales y de servicios.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export const metadata = {
  title: "Preguntas frecuentes | Vialoop",
  description:
    "Preguntas frecuentes sobre diseño web, hosting, dominio, SEO, pagos, plazos y páginas web para empresas en Calama y Antofagasta.",
};

export default function FAQPage() {
  return (
    <main style={{ background: "#020712", color: "#ffffff" }}>
      <section
        style={{
          minHeight: "calc(100vh - 92px)",
          padding: "120px 24px 110px",
          background:
            "radial-gradient(circle at 22% 0%, rgba(47,128,255,.30), transparent 34%), radial-gradient(circle at 82% 0%, rgba(66,199,255,.15), transparent 34%), radial-gradient(circle at 18% 88%, rgba(14,40,91,.45), transparent 64%), linear-gradient(135deg, #020712 0%, #041022 46%, #071b38 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <style>
          {`
            .faq-summary::-webkit-details-marker {
              display: none;
            }

            .faq-card {
              transition:
                background-color 220ms ease,
                border-color 220ms ease;
            }

            .faq-card:hover {
              background-color: rgba(255, 255, 255, 0.03);
            }

            .faq-card[open] {
              background-color: rgba(255, 255, 255, 0.035);
            }

            .faq-summary {
              user-select: none;
            }

            .faq-icon {
              position: relative;
              display: grid;
              place-items: center;
              width: 30px;
              height: 30px;
              flex-shrink: 0;
              border-radius: 999px;
              border: 1px solid rgba(255, 255, 255, 0.11);
              background: rgba(255, 255, 255, 0.035);
              color: rgba(143, 194, 255, 0.92);
              transition:
                border-color 220ms ease,
                background-color 220ms ease,
                color 220ms ease,
                transform 220ms ease;
            }

            .faq-card:hover .faq-icon {
              border-color: rgba(47, 128, 255, 0.42);
              background: rgba(255, 255, 255, 0.07);
              color: #ffffff;
            }

            .faq-card[open] .faq-icon {
              transform: rotate(180deg);
              border-color: rgba(47, 128, 255, 0.48);
              background: rgba(47, 128, 255, 0.16);
              color: #ffffff;
            }

            .faq-line {
              position: absolute;
              width: 13px;
              height: 2px;
              border-radius: 999px;
              background: currentColor;
              transition:
                transform 220ms ease,
                opacity 180ms ease;
            }

            .faq-line-vertical {
              transform: rotate(90deg);
            }

            .faq-card[open] .faq-line-vertical {
              opacity: 0;
              transform: rotate(90deg) scaleX(0.3);
            }

            .faq-answer {
              animation: faqAnswerIn 220ms ease;
            }

            @keyframes faqAnswerIn {
              from {
                opacity: 0;
                transform: translateY(-4px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @media (max-width: 640px) {
              .faq-section-inner {
                max-width: 100% !important;
              }

              .faq-title {
                font-size: 46px !important;
              }

              .faq-summary {
                padding: 20px 20px !important;
              }

              .faq-answer {
                padding: 0 20px 22px !important;
              }
            }
          `}
        </style>

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.035,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "78px 78px",
            pointerEvents: "none",
          }}
        />

        <div
          className="faq-section-inner"
          style={{
            position: "relative",
            maxWidth: 760,
            margin: "0 auto",
          }}
        >
          <header style={{ marginBottom: 44 }}>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: ".32em",
                textTransform: "uppercase",
                color: "rgba(143,194,255,.78)",
              }}
            >
              Preguntas frecuentes
            </p>

            <h1
              className="faq-title"
              style={{
                margin: 0,
                maxWidth: 680,
                fontSize: "clamp(46px, 6vw, 78px)",
                lineHeight: ".9",
                letterSpacing: "-.08em",
                fontWeight: 950,
                color: "#ffffff",
              }}
            >
              Todo lo que necesitas
              <span
                style={{
                  display: "block",
                  color: "rgba(143,194,255,.64)",
                }}
              >
                saber.
              </span>
            </h1>

            <p
              style={{
                margin: "22px 0 0",
                maxWidth: 520,
                fontSize: 15,
                lineHeight: 1.75,
                color: "rgba(255,255,255,.56)",
              }}
            >
              Si no encuentras tu respuesta, escríbenos y te ayudamos a revisar
              tu caso.
            </p>
          </header>

          <div
            style={{
              overflow: "hidden",
              borderRadius: 26,
              border: "1px solid rgba(255,255,255,.12)",
              background: "rgba(10,19,35,.78)",
              boxShadow: "0 34px 120px rgba(0,0,0,.42)",
              backdropFilter: "blur(18px)",
            }}
          >
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="faq-card"
                style={{
                  borderBottom:
                    index === faqs.length - 1
                      ? "none"
                      : "1px solid rgba(255,255,255,.08)",
                }}
              >
                <summary
                  className="faq-summary"
                  style={{
                    cursor: "pointer",
                    listStyle: "none",
                    padding: "22px 28px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 20,
                    fontSize: 15,
                    fontWeight: 850,
                    color: "rgba(255,255,255,.9)",
                  }}
                >
                  <span>{faq.question}</span>

                  <span className="faq-icon" aria-hidden="true">
                    <span className="faq-line faq-line-horizontal" />
                    <span className="faq-line faq-line-vertical" />
                  </span>
                </summary>

                <div
                  className="faq-answer"
                  style={{
                    padding: "0 28px 24px",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      maxWidth: 660,
                      fontSize: 14,
                      lineHeight: 1.8,
                      color: "rgba(255,255,255,.56)",
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <p
              style={{
                margin: "0 0 16px",
                fontSize: 13,
                color: "rgba(255,255,255,.38)",
              }}
            >
              ¿No encontraste lo que buscabas?
            </p>

            <a
              href="https://wa.link/fgn52s"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 44,
                padding: "0 24px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,.12)",
                background: "rgba(255,255,255,.07)",
                color: "rgba(255,255,255,.86)",
                textDecoration: "none",
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                boxShadow: "0 18px 46px rgba(0,0,0,.24)",
              }}
            >
              Escríbenos por WhatsApp →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}