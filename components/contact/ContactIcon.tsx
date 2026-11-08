import type { ReactNode } from "react";

type IconName = "user" | "mail" | "building" | "phone" | "message" | "pin" | "check" | "loader" | "alert" | "briefcase";

const shapes: Record<IconName, ReactNode> = {
  user: <><circle cx="12" cy="7.5" r="3.5" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 6.8 5.1a2 2 0 0 0 2.4 0L20 7" /></>,
  building: <><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h2a2 2 0 0 1 2 2v10M2 21h20M8 7h4M8 11h4M8 15h4M9 21v-2h2v2" /></>,
  phone: <path d="m7.2 3 2.2 4.4a1.4 1.4 0 0 1-.3 1.6l-1.5 1.5a14.4 14.4 0 0 0 5.9 5.9l1.5-1.5a1.4 1.4 0 0 1 1.6-.3l4.4 2.2v2.3a2 2 0 0 1-2.2 2C10.1 20.3 3.7 13.9 2.9 5.2A2 2 0 0 1 4.9 3h2.3Z" />,
  message: <><path d="M21 15a3 3 0 0 1-3 3H9l-6 3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v9Z" /><path d="M7 8h10M7 12h6" /></>,
  pin: <><path d="M19 10c0 5.2-7 11-7 11S5 15.2 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
  loader: <><circle cx="12" cy="12" r="9" opacity=".25" /><path d="M12 3a9 9 0 0 1 9 9" /></>,
  alert: <><circle cx="12" cy="12" r="9" /><path d="M12 7v6M12 17h.01" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="14" rx="2.5" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12a22 22 0 0 0 18 0M12 12v3" /></>,
};

export default function ContactIcon({ name, className }: { name: IconName; className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{shapes[name]}</svg>;
}
