import { Suspense } from "react";
import { ENDPOINTS, getPagina, idsDeMisEventos } from "@/lib/api";
import { armarQuery } from "@/lib/filtros";
import FiltrosEventos from "@/components/FiltrosEventos";
import EventoCard from "@/components/EventoCard";
import Paginacion from "@/components/Paginacion";
import Cargando from "@/components/Cargando";

export const metadata = {
  title: "Eventos",
};

// Pide una página de eventos con los filtros de la URL. La API filtra, busca y ordena
async function Resultados({ params }) {
  // Sin estado en la URL se ven los programados; "Todos" es no filtrar por estado
  const estado = params.estado ?? "PROGRAMADO";
  const query = armarQuery({
    estado: estado === "TODOS" ? "" : estado,
    tipo: params.tipo,
    search: params.search,
    // Los programados, del más cercano al más lejano. El resto, del más nuevo al más viejo
    ordering: estado === "PROGRAMADO" ? "fecha" : "-fecha",
    page: params.page,
  });
  const [pagina, misEventos] = await Promise.all([getPagina(ENDPOINTS.eventos, query), idsDeMisEventos()]);

  if (pagina.results.length === 0) {
    return (
      <p className="rounded-2xl border-2 border-borde bg-superficie px-5 py-12 text-center text-texto-suave">
        No encontramos eventos con esos filtros. Probá con otro estado o limpialos.
      </p>
    );
  }

  return (
    <>
      <p className="mb-5 text-texto-suave">
        {pagina.count} {pagina.count === 1 ? "evento" : "eventos"}
      </p>
      <ul className="grid gap-6 lg:grid-cols-2">
        {pagina.results.map((e) => (
          <li key={e.id} className="flex">
            <EventoCard evento={e} inscripto={misEventos.includes(e.id)} />
          </li>
        ))}
      </ul>
      <Paginacion
        ruta="/eventos"
        query={armarQuery(params)}
        pagina={Number(params.page) || 1}
        total={pagina.count}
      />
    </>
  );
}

export default async function EventosPage({ searchParams }) {
  const params = await searchParams;

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-ancha text-5xl font-black tracking-tight lg:text-6xl">Eventos</h1>
        <p className="mt-2 mb-8 text-lg text-texto-suave">
          Torneos, campañas de rol y noches de juego abiertas. Anotate antes de que se llene la mesa.
        </p>

        <FiltrosEventos />

        {/* La key cambia con cada búsqueda: así se vuelve a mostrar "Cargando" mientras llega */}
        <div className="mt-8">
          <Suspense key={armarQuery(params)} fallback={<Cargando texto="Buscando eventos" />}>
            <Resultados params={params} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
