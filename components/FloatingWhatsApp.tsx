import styles from "./FloatingWhatsApp.module.css";
import { WHATSAPP_CONTACT_URL } from "@/lib/contact/whatsapp";
import WhatsAppIcon from "./icons/WhatsAppIcon";

export default function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_CONTACT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir chat de WhatsApp con Vialoop"
      data-floating-contact
      data-whatsapp-entry="floating"
      className={styles.whatsappButton}
    >
      <WhatsAppIcon className={styles.whatsappIcon} />
    </a>
  );
}
