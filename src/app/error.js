"use client";

import ErrorCarga from "@/components/ErrorCarga";

// Error de cualquier página que no tenga su propio error.js (por ejemplo, las novedades del inicio)
export default function Error({ error, retry }) {
  return (
    <section className="px-6 py-16">
      <ErrorCarga error={error} retry={retry} />
    </section>
  );
}
