"use client";

import ErrorCarga from "@/components/ErrorCarga";

// Si la API falla en el salón de la fama, Next muestra esto en lugar de la página
export default function SalonError({ error, retry }) {
  return (
    <section className="px-6 py-16">
      <ErrorCarga error={error} retry={retry} />
    </section>
  );
}
