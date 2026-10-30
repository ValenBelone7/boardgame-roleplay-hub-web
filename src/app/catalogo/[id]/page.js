import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ENDPOINTS, getPagina, getUno, list } from "@/lib/api";
import { formatearFechaCorta, formatearJugadores } from "@/lib/formato";
import Badge from "@/components/Badge";
import Cargando from "@/components/Cargando";
import Portada from "@/components/Portada";
import Precio from "@/components/Precio";
import ResenaForm from "@/components/ResenaForm";

const tipos = {
  JUEGO_MESA: "Juego de mesa",
  JUEGO_ROL: "Juego de rol",
  EXPANSION: "Expansión",
  ACCESORIO: "Accesorio",
};

// "★★★★☆" con el número para los lectores de pantalla
function Estrellas({ puntaje }) {
  return (
    <span aria-label={`${puntaje} de 5`} className="text-caramelo">
      {"★".repeat(puntaje)}
      {"☆".repeat(5 - puntaje)}
    </span>
  );
}

// Va dentro de un Suspense: la ficha se ve enseguida y las reseñas llegan después
async function Resenas({ productoId }) {
  const pagina = await getPagina(`${ENDPOINTS.productos}${productoId}/resenas/`);
  const resenas = pagina.results;

  return (
    <div className="grid gap-6">
      {resenas.length === 0 ? (
        <p className="text-texto-suave">Todavía nadie opinó sobre este producto. ¡Sé el primero!</p>
      ) : (
        <ul className="grid gap-4">
          {resenas.map((r) => (
            <li key={r.id} className="rounded-2xl border-2 border-borde bg-superficie p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-bold">{r.usuario.alias || r.usuario.username}</p>
                <Estrellas puntaje={r.puntaje} />
              </div>
              {r.comentario && <p className="mt-2">{r.comentario}</p>}
              <p className="mt-2 text-sm text-texto-suave">{formatearFechaCorta(r.fecha)}</p>
            </li>
          ))}
        </ul>
      )}
      <ResenaForm productoId={productoId} autores={resenas.map((r) => r.usuario.id)} />
    </div>
  );
}

export const metadata = {
  title: "Producto",
};

export default async function ProductoPage({ params }) {
  const { id } = await params;
  const producto = await getUno(`${ENDPOINTS.productos}${id}/`);
  // Los dados de baja tampoco se muestran en el catálogo público
  if (!producto || !producto.activo) notFound();

  // El detalle trae ids (como pidió la consigna del back): se cruzan con los listados para los nombres
  const [categorias, editoriales, mecanicas, disenadores, juegoBase] = await Promise.all([
    list(ENDPOINTS.categorias),
    list(ENDPOINTS.editoriales),
    list(ENDPOINTS.mecanicas),
    list(ENDPOINTS.disenadores),
    producto.juego_base ? getUno(`${ENDPOINTS.productos}${producto.juego_base}/`) : null,
  ]);
  const nombre = (lista, id) => lista.find((x) => x.id === id)?.nombre;

  const ficha = [
    { etiqueta: "Categoría", valor: nombre(categorias, producto.categoria) },
    { etiqueta: "Editorial", valor: nombre(editoriales, producto.editorial) },
    {
      etiqueta: "Jugadores",
      valor: producto.jugadores_min && formatearJugadores(producto.jugadores_min, producto.jugadores_max),
    },
    { etiqueta: "Duración", valor: producto.duracion_minutos && `${producto.duracion_minutos} minutos` },
    { etiqueta: "Edad", valor: producto.edad_minima && `Desde ${producto.edad_minima} años` },
    { etiqueta: "Diseño", valor: producto.disenadores.map((d) => nombre(disenadores, d)).join(", ") },
  ].filter((f) => f.valor);

  return (
    <article className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <Link href="/catalogo" className="font-bold text-bordo hover:underline dark:text-arena">
          ← Volver al catálogo
        </Link>

        <div className="mt-6 grid gap-10 md:grid-cols-[2fr_3fr]">
          <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-borde">
            <Portada producto={producto} sizes="(min-width: 768px) 40vw, 100vw" />
          </div>

          <div className="grid content-start gap-5">
            <div className="flex flex-wrap gap-2">
              <Badge>{tipos[producto.tipo]}</Badge>
              {producto.stock === 0 ? (
                <Badge color="rojo">Sin stock</Badge>
              ) : (
                <Badge color="verde">{producto.stock} en stock</Badge>
              )}
            </div>
            <h1 className="font-serif text-4xl leading-tight lg:text-5xl">{producto.nombre}</h1>
            {juegoBase && (
              <p className="text-texto-suave">
                Expansión de{" "}
                <Link href={`/catalogo/${juegoBase.id}`} className="font-bold text-bordo underline dark:text-arena">
                  {juegoBase.nombre}
                </Link>
              </p>
            )}
            <Precio valor={producto.precio} className="text-4xl" />
            {producto.descripcion && <p className="text-lg">{producto.descripcion}</p>}

            <dl className="grid gap-4 rounded-2xl border-2 border-borde bg-superficie p-6 sm:grid-cols-2">
              {ficha.map((f) => (
                <div key={f.etiqueta}>
                  <dt className="text-sm text-texto-suave">{f.etiqueta}</dt>
                  <dd className="font-medium">{f.valor}</dd>
                </div>
              ))}
            </dl>

            {producto.mecanicas.length > 0 && (
              <ul className="flex flex-wrap gap-2" aria-label="Mecánicas">
                {producto.mecanicas.map((m) => (
                  <li key={m} className="rounded-md border-2 border-borde px-3 py-1">
                    {nombre(mecanicas, m)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <section className="mt-14 max-w-3xl">
          <h2 className="mb-6 font-ancha text-3xl font-black">Reseñas</h2>
          <Suspense fallback={<Cargando texto="Cargando reseñas" />}>
            <Resenas productoId={producto.id} />
          </Suspense>
        </section>
      </div>
    </article>
  );
}
