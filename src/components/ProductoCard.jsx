import Link from "next/link";
import Badge from "@/components/Badge";
import Portada from "@/components/Portada";
import Precio from "@/components/Precio";
import { formatearJugadores } from "@/lib/formato";

// Ficha de un producto del listado (viene con categoría y mecánicas anidadas)
export default function ProductoCard({ producto }) {
  const sinStock = producto.stock === 0;

  return (
    <article className="relative flex w-full flex-col overflow-hidden rounded-2xl border-2 border-borde bg-superficie">
      <div className="relative aspect-square">
        <Portada producto={producto} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
      </div>

      <div className="flex grow flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          <Badge>{producto.tipo_display}</Badge>
          {sinStock && <Badge color="rojo">Sin stock</Badge>}
        </div>

        <h3 className="font-serif text-xl leading-snug">
          {/* El ::after del link cubre toda la ficha: se puede hacer clic en cualquier parte */}
          <Link
            href={`/catalogo/${producto.id}`}
            className="after:absolute after:inset-0 hover:underline focus-visible:outline-3 focus-visible:outline-caramelo"
          >
            {producto.nombre}
          </Link>
        </h3>

        {producto.jugadores_min && (
          <p className="text-texto-suave">
            {formatearJugadores(producto.jugadores_min, producto.jugadores_max)}
            {producto.duracion_minutos && ` · ${producto.duracion_minutos} min`}
          </p>
        )}

        {producto.mecanicas.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 text-sm" aria-label="Mecánicas">
            {producto.mecanicas.slice(0, 3).map((m) => (
              <li key={m.id} className="rounded-md border border-borde px-2 py-0.5">
                {m.nombre}
              </li>
            ))}
          </ul>
        )}

        <Precio valor={producto.precio} className="mt-auto text-2xl" />
      </div>
    </article>
  );
}
