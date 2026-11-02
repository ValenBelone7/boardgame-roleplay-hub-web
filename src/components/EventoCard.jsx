import Link from "next/link";
import Badge from "@/components/Badge";
import EstadoEvento from "@/components/EstadoEvento";
import LugaresEvento from "@/components/LugaresEvento";
import Precio from "@/components/Precio";
import { formatearDiaMes, formatearFecha } from "@/lib/formato";

// "Ticket" de un evento del listado (viene con juego y organizador anidados)
export default function EventoCard({ evento }) {
  const { dia, mes } = formatearDiaMes(evento.fecha);

  return (
    <article className="relative flex w-full overflow-hidden rounded-2xl border-2 border-borde bg-superficie">
      <div className="flex w-20 shrink-0 flex-col items-center justify-center bg-bordo text-crema">
        <span className="font-ancha text-3xl font-black">{dia}</span>
        <span className="uppercase">{mes}</span>
      </div>

      <div className="grid min-w-0 grow gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          <Badge>{evento.tipo_display}</Badge>
          <EstadoEvento evento={evento} />
        </div>

        <h2 className="font-serif text-xl leading-snug">
          {/* El ::after del link cubre toda la tarjeta, como en ProductoCard */}
          <Link
            href={`/eventos/${evento.id}`}
            className="after:absolute after:inset-0 hover:underline focus-visible:outline-3 focus-visible:outline-caramelo"
          >
            {evento.nombre}
          </Link>
        </h2>

        <p className="text-texto-suave">
          {formatearFecha(evento.fecha)}
          {evento.juego && ` · ${evento.juego.nombre}`}
        </p>

        <LugaresEvento evento={evento} />

        {Number(evento.costo_inscripcion) === 0 ? (
          <p className="font-bold">Gratis</p>
        ) : (
          <Precio valor={evento.costo_inscripcion} />
        )}
      </div>
    </article>
  );
}
