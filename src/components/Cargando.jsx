"use client";

import { useEffect, useState } from "react";

// Calcado del profe: cuenta los segundos porque la API en Render se duerme y la primera
// carga puede tardar hasta un minuto
export default function Cargando({ texto = "Cargando" }) {
  const [seg, setSeg] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeg((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  let mensaje = texto;
  if (seg >= 5) mensaje = "Despertando la API. La primera carga puede tardar hasta un minuto";
  if (seg >= 75) mensaje = "Está tardando más de lo normal. Si sigue así, recargá la página";

  return (
    <div
      role="status"
      className="flex items-center justify-center gap-3 rounded-2xl border-2 border-borde bg-superficie px-5 py-12 text-texto-suave"
    >
      <span className="relative flex size-2.5 shrink-0" aria-hidden="true">
        <span className="absolute inline-flex size-full rounded-full bg-caramelo/70 motion-safe:animate-ping" />
        <span className="relative inline-flex size-2.5 rounded-full bg-caramelo" />
      </span>
      <span>{mensaje}</span>
      {seg >= 2 && (
        <span aria-hidden="true" className="w-8 tabular-nums">
          {seg}s
        </span>
      )}
    </div>
  );
}
