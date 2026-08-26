"use client";

import { openCookieSettings } from "@/lib/privacy/consent";

type CookieSettingsButtonProps = {
  className?: string;
};

export default function CookieSettingsButton({
  className,
}: CookieSettingsButtonProps) {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className={className}
      aria-label="Abrir configuración de cookies"
    >
      Configurar cookies
    </button>
  );
}