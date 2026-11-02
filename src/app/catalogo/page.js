import { Suspense } from "react";
import { ENDPOINTS, getPagina, list } from "@/lib/api";
import { armarQuery } from "@/lib/filtros";
import FiltrosCatalogo from "@/components/FiltrosCatalogo";
import ProductoCard from "@/components/ProductoCard";
import Paginacion from "@/components/Paginacion";
import Cargando from "@/components/Cargando";

export const metadata = {
  title: "Catálogo",
};

// Pide una página de productos con los filtros de la URL. La API filtra, busca y ordena
async function Resultados({ params }) {
  const query = armarQuery({
    activo: "true", // los dados de baja no se muestran
    search: params.search,
    categoria: params.categoria,
    tipo: params.tipo,
    precio__lte: params.precio__lte,
    // "Somos 3": juegos donde el mínimo es ≤ 3 y el máximo ≥ 3
    jugadores_min__lte: params.jugadores,
    jugadores_max__gte: params.jugadores,
    ordering: params.ordering,
    page: params.page,
  });
  const pagina = await getPagina(ENDPOINTS.productos, query);

  if (pagina.results.length === 0) {
    return (
      <p className="rounded-2xl border-2 border-borde bg-superficie px-5 py-12 text-center text-texto-suave">
        No encontramos productos con esos filtros. Probá con otros o limpialos.
      </p>
    );
  }

  return (
    <>
      <p className="mb-5 text-texto-suave">
        {pagina.count} {pagina.count === 1 ? "producto" : "productos"}
      </p>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pagina.results.map((p) => (
          <li key={p.id} className="flex">
            <ProductoCard producto={p} />
          </li>
        ))}
      </ul>
      <Paginacion
        ruta="/catalogo"
        query={armarQuery(params)}
        pagina={Number(params.page) || 1}
        total={pagina.count}
      />
    </>
  );
}

export default async function CatalogoPage({ searchParams }) {
  const params = await searchParams;
  const categorias = await list(ENDPOINTS.categorias);

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-ancha text-5xl font-black tracking-tight lg:text-6xl">Catálogo</h1>
        <p className="mt-2 mb-8 text-lg text-texto-suave">
          Juegos de mesa, de rol, expansiones y accesorios. Filtrá por cómo se juega, no solo por género.
        </p>

        <FiltrosCatalogo categorias={categorias} />

        {/* La key cambia con cada búsqueda: así se vuelve a mostrar "Cargando" mientras llega */}
        <div className="mt-8">
          <Suspense key={armarQuery(params)} fallback={<Cargando texto="Buscando productos" />}>
            <Resultados params={params} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
