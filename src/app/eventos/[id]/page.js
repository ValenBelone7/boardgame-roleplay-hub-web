import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ENDPOINTS, list } from "@/lib/api";
import { formatearFecha, formatearPrecio } from "@/lib/formato";
import Badge from "@/components/Badge";
import Cargando from "@/components/Cargando";
import EstadoEvento from "@/components/EstadoEvento";
import LugaresEvento from "@/components/LugaresEvento";
import Podio from "@/components/Podio";

export const metadata = {
  title: "Evento",
};

export default async function EventoPage({ params }) {
  const { id } = await params;
  // El listado es la única lectura pública con el cupo: eventos/{id}/ no trae los inscriptos
  // e inscripciones/ pide login, pero un visitante también tiene que ver cuántos lugares quedan
  const eventos = await list(ENDPOINTS.eventos);
  const evento = eventos.find((e) => String(e.id) === id);
  if (!evento) notFound();

  const costo = Number(evento.costo_inscripcion);
  const organizador = evento.organizador.alias || evento.organizador.username;

  return (
    <article className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <Link href="/eventos" className="font-bold text-bordo hover:underline dark:text-arena">
          ← Volver a los eventos
        </Link>

        <div className="mt-6 grid max-w-3xl gap-5">
          <div className="flex flex-wrap gap-2">
            <Badge>{evento.tipo_display}</Badge>
            <EstadoEvento evento={evento} />
          </div>
          <h1 className="font-serif text-4xl leading-tight lg:text-5xl">{evento.nombre}</h1>
          {evento.descripcion && <p className="text-lg">{evento.descripcion}</p>}

          <dl className="grid gap-4 rounded-2xl border-2 border-borde bg-superficie p-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-texto-suave">Fecha</dt>
              <dd className="font-medium">{formatearFecha(evento.fecha)}</dd>
            </div>
            <div>
              <dt className="text-sm text-texto-suave">Costo</dt>
              <dd className="font-medium">{costo === 0 ? "Gratis" : formatearPrecio(costo)}</dd>
            </div>
            {evento.juego && (
              <div>
                <dt className="text-sm text-texto-suave">Juego</dt>
                <dd className="font-medium">
                  <Link href={`/catalogo/${evento.juego.id}`} className="text-bordo underline dark:text-arena">
                    {evento.juego.nombre}
                  </Link>
                </dd>
              </div>
            )}
            <div>
              <dt className="text-sm text-texto-suave">Organiza</dt>
              <dd className="font-medium">{organizador}</dd>
            </div>
          </dl>

          <LugaresEvento evento={evento} />
        </div>

        <Suspense fallback={<Cargando texto="Cargando el podio" />}>
          <Podio eventoId={evento.id} />
        </Suspense>
      </div>
    </article>
  );
}
