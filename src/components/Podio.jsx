import { ENDPOINTS, list } from "@/lib/api";

// Tabla de ganadores del evento. Si todavía no tiene resultados, no muestra nada
export default async function Podio({ eventoId }) {
  const resultados = await list(`${ENDPOINTS.eventos}${eventoId}/podio/`);
  if (resultados.length === 0) return null;

  return (
    <section className="mt-14 max-w-3xl">
      <h2 className="mb-6 font-ancha text-3xl font-black">Podio</h2>
      <ol className="grid gap-3">
        {resultados.map((r) => (
          <li
            key={r.id}
            className="flex items-center gap-4 rounded-2xl border-2 border-borde bg-superficie px-5 py-4"
          >
            <span className="font-ancha text-2xl font-black text-bordo dark:text-arena">{r.posicion}°</span>
            <span className="grow font-bold">{r.usuario.alias || r.usuario.username}</span>
            <span className="text-texto-suave">{r.puntos} puntos</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
