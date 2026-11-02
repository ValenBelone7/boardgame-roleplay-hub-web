import { Suspense } from "react";
import Link from "next/link";
import { requireToken } from "@/lib/auth";
import { ENDPOINTS, getUno, list } from "@/lib/api";
import { armarQuery } from "@/lib/filtros";
import { formatearFecha } from "@/lib/formato";
import Cargando from "@/components/Cargando";
import EstadoEvento from "@/components/EstadoEvento";

export const metadata = {
  title: "Mi cuenta",
};

// La API manda la fecha como "1998-04-21"; sin hora, así no se corre un día por la zona horaria
function formatearDia(fecha) {
  const [anio, mes, dia] = fecha.split("-");
  return `${dia}/${mes}/${anio}`;
}

// Cada inscripción trae solo el id del evento: se cruza con el listado para mostrar sus datos.
// La baja se hace desde el detalle del evento
async function MisInscripciones({ usuarioId }) {
  const [inscripciones, eventos] = await Promise.all([
    list(ENDPOINTS.inscripciones, armarQuery({ usuario: usuarioId })),
    list(ENDPOINTS.eventos),
  ]);
  const personajes = new Map(inscripciones.map((i) => [i.evento, i.personaje]));
  const misEventos = eventos.filter((e) => personajes.has(e.id));

  if (misEventos.length === 0) {
    return (
      <p className="text-texto-suave">
        Todavía no te anotaste a ningún evento.{" "}
        <Link href="/eventos" className="font-bold text-bordo underline underline-offset-4 dark:text-arena">
          Mirá la agenda
        </Link>
      </p>
    );
  }

  return (
    <ul className="grid gap-4">
      {misEventos.map((e) => (
        <li key={e.id} className="grid gap-2 rounded-2xl border-2 border-borde bg-superficie p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <Link href={`/eventos/${e.id}`} className="font-serif text-xl leading-snug hover:underline">
              {e.nombre}
            </Link>
            <EstadoEvento evento={e} />
          </div>
          <p className="text-texto-suave">{formatearFecha(e.fecha)}</p>
          {personajes.get(e.id) && <p>Personaje: {personajes.get(e.id)}</p>}
        </li>
      ))}
    </ul>
  );
}

export default async function CuentaPage() {
  await requireToken(); // sin sesión → /login
  // Si el token venció, getUno manda a /login?vencida=1
  const usuario = await getUno(ENDPOINTS.me);

  const datos = [
    { etiqueta: "Usuario", valor: usuario.username },
    { etiqueta: "Alias", valor: usuario.alias || "—" },
    { etiqueta: "Email", valor: usuario.email || "—" },
    { etiqueta: "Nombre", valor: `${usuario.first_name} ${usuario.last_name}`.trim() || "—" },
    { etiqueta: "Fecha de nacimiento", valor: usuario.fecha_nacimiento ? formatearDia(usuario.fecha_nacimiento) : "—" },
  ];

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-4xl">Hola, {usuario.alias || usuario.username}</h1>
        <p className="mt-2 text-texto-suave">Tus datos e inscripciones en Arcana.</p>

        <dl className="mt-8 grid gap-4 rounded-2xl border-2 border-borde bg-superficie p-8 sm:grid-cols-2">
          {datos.map(({ etiqueta, valor }) => (
            <div key={etiqueta}>
              <dt className="text-sm text-texto-suave">{etiqueta}</dt>
              <dd className="text-lg font-medium">{valor}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-12 mb-6 font-ancha text-3xl font-black">Mis inscripciones</h2>
        <Suspense fallback={<Cargando texto="Cargando tus inscripciones" />}>
          <MisInscripciones usuarioId={usuario.id} />
        </Suspense>
      </div>
    </section>
  );
}
