import Image from "next/image";
import Link from "next/link";
import CookieSettingsButton from "@/components/privacy/CookieSettingsButton";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer
      id="footer"
      role="contentinfo"
      aria-label="Pie de página Vialoop"
      className={styles.footer}
    >
      <div className={styles.container}>
        <div className={styles.mainGrid}>
          <div className={styles.brandColumn}>
            <Image
              src="/logo-blanco-vialoop.webp"
              alt="Vialoop Studio SpA"
              width={512}
              height={512}
              className={styles.logo}
              sizes="112px"
            />

            <p className={styles.description}>
              Diseñamos sitios web y sistemas digitales para
              empresas industriales, de servicios y negocios
              que buscan crecer y proyectarse
              profesionalmente.
            </p>

            <p className={styles.coverage}>
              Desde Calama y Antofagasta, con atención remota
              para empresas de todo Chile.
            </p>

            <p className={styles.companyData}>
              Vialoop Studio SpA
            </p>
          </div>

          <div className={styles.contactColumn}>
            <p className={styles.columnTitle}>Contacto</p>

            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <div className={styles.contactIconBox}>
                  <Image
                    src="/icono-correo.webp"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden="true"
                    className={styles.contactIcon}
                  />
                </div>

                <div className={styles.contactContent}>
                  <span className={styles.contactLabel}>
                    Email
                  </span>

                  <a
                    href="mailto:dloayza@vialoop.cl"
                    className={styles.contactLink}
                  >
                    dloayza@vialoop.cl
                  </a>
                </div>
              </li>

              <li className={styles.contactItem}>
                <div className={styles.contactIconBox}>
                  <Image
                    src="/icono-telefono.webp"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden="true"
                    className={styles.contactIcon}
                  />
                </div>

                <div className={styles.contactContent}>
                  <span className={styles.contactLabel}>
                    Teléfono y WhatsApp
                  </span>

                  <a
                    href="tel:+56974330586"
                    className={styles.contactLink}
                  >
                    +56 9 7433 0586
                  </a>
                </div>
              </li>
            </ul>

            <a
              href="https://calendly.com/contacto-vialoop/diseno-web"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.scheduleButton}
            >
              Agendar revisión
            </a>
          </div>

          <div className={styles.socialColumn}>
            <p className={styles.columnTitle}>Conectemos</p>

            <a
              href="https://www.instagram.com/vialoop.cl/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar Instagram de Vialoop"
              className={styles.instagramButton}
            >
              <Image
                src="/logo-instagram.webp"
                alt=""
                width={24}
                height={24}
                aria-hidden="true"
                className={styles.instagramIcon}
              />
            </a>

            <p className={styles.socialText}>
              Conoce nuestros proyectos, novedades y
              contenido para empresas.
            </p>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © 2026 Vialoop Studio SpA · Diseño web y
            sistemas digitales.
          </p>

          <nav
            className={styles.legalLinks}
            aria-label="Información legal y privacidad"
          >
            <Link
              href="/politicasdeuso"
              className={styles.legalLink}
            >
              Políticas de Uso
            </Link>

            <Link
              href="/politicasprivacidad"
              className={styles.legalLink}
            >
              Política de Privacidad
            </Link>

            <Link
              href="/politicadecookies"
              className={styles.legalLink}
            >
              Política de Cookies
            </Link>

            <Link
              href="/solicitud-datos"
              className={styles.legalLink}
            >
              Ejercer derechos
            </Link>

            <CookieSettingsButton
              className={styles.legalButton}
            />

            <p className={styles.credit}>
              Diseñado y potenciado por{" "}
              <span className={styles.creditBrand}>
                Vialoop.cl
              </span>
            </p>
          </nav>
        </div>
      </div>
    </footer>
  );
}