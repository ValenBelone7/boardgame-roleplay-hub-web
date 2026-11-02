import { ENDPOINTS, list } from "@/lib/api";
import CartaCampeon from "@/components/CartaCampeon";
import LeyendaCard from "@/components/LeyendaCard";

export const metadata = {
  title: "Salón de la fama",
};

export default async function SalonDeLaFamaPage() {
  // El ranking ya viene ordenado por el back: primero por títulos y después por puntos
  const [ranking, leyendas] = await Promise.all([
    list(`${ENDPOINTS.resultados}salon_de_la_fama/`),
    list(ENDPOINTS.leyendas, "destacada=true"),
  ]);
  const campeones = ranking.slice(0, 3);
  const resto = ranking.slice(3);

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-ancha text-5xl font-black tracking-tight lg:text-6xl">Salón de la fama</h1>
        <p className="mt-2 mb-10 text-lg text-texto-suave">
          Cada campeón recibe su arcano. La comunidad escribe la leyenda que lo acompaña.
        </p>

        <h2 className="mb-6 font-ancha text-3xl font-black">Ranking</h2>
        {ranking.length === 0 ? (
          <p className="text-texto-suave">Todavía no hay resultados cargados. ¡El primer título está en juego!</p>
        ) : (
          <>
            <ol className="grid gap-6 md:grid-cols-3">
              {campeones.map((j, i) => (
                <li key={j.id} className="flex">
                  <CartaCampeon jugador={j} puesto={i + 1} />
                </li>
              ))}
            </ol>

            {resto.length > 0 && (
              <ol className="mt-6 grid gap-3">
                {resto.map((j, i) => (
                  <li
                    key={j.id}
                    className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-2xl border-2 border-borde bg-superficie px-5 py-4"
                  >
                    <span className="font-ancha text-2xl font-black text-bordo dark:text-arena">{i + 4}°</span>
                    <span className="grow font-bold">{j.alias || j.username}</span>
                    <span className="text-texto-suave">
                      {j.titulos} {j.titulos === 1 ? "título" : "títulos"} · {j.podios}{" "}
                      {j.podios === 1 ? "podio" : "podios"} · {j.puntos} puntos
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </>
        )}

        <h2 className="mt-14 mb-6 font-ancha text-3xl font-black">Leyendas destacadas</h2>
        {leyendas.length === 0 ? (
          <p className="text-texto-suave">Todavía no hay leyendas destacadas.</p>
        ) : (
          <ul className="grid gap-4 lg:grid-cols-2">
            {leyendas.map((l) => (
              <li key={l.id} className="grid">
                <LeyendaCard leyenda={l} mostrarEvento />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
