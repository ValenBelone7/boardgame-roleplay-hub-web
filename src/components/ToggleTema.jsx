"use client";

import { useTema } from "@/app/context/TemaContext";

// Los dos íconos están siempre en el HTML y el CSS elige cuál se ve (dark:),
// así el servidor y el navegador dibujan lo mismo aunque el tema guardado sea otro
export default function ToggleTema() {
  const { alternarTema } = useTema();

  return (
    <button
      type="button"
      onClick={alternarTema}
      aria-label="Cambiar entre tema claro y oscuro"
      className="rounded-full p-3 hover:bg-bordo-oscuro focus-visible:outline-3 focus-visible:outline-arena"
    >
      {/* Luna: se ve en el tema claro */}
      <svg
        viewBox="0 0 24 24"
        className="size-6 dark:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      {/* Sol: se ve en el tema oscuro */}
      <svg
        viewBox="0 0 24 24"
        className="hidden size-6 dark:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
