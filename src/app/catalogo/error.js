"use client";

import ErrorCarga from "@/components/ErrorCarga";

// Si la API falla en el catálogo, Next muestra esto en lugar de la página
export default function CatalogoError({ error, retry }) {
  return (
    <section className="px-6 py-16">
      <ErrorCarga error={error} retry={retry} />
    </section>
  );
}
