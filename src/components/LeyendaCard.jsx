import Link from "next/link";
import { formatearFechaCorta } from "@/lib/formato";

const nombre = (usuario) => usuario.alias || usuario.username;

// Una crónica de lo que pasó en la mesa (viene con evento, autor y protagonista anidados).
// mostrarEvento: para cuando la leyenda no está dentro de la página de su evento
export default function LeyendaCard({ leyenda, mostrarEvento = false }) {
  return (
    <article className="grid content-start gap-3 rounded-2xl border-2 border-borde bg-superficie p-6">
      <h3 className="font-serif text-2xl leading-snug">{leyenda.titulo}</h3>
      {mostrarEvento && (
        <Link href={`/eventos/${leyenda.evento.id}`} className="font-bold text-bordo underline dark:text-arena">
          {leyenda.evento.nombre}
        </Link>
      )}
      <p className="whitespace-pre-line">{leyenda.relato}</p>
      {leyenda.protagonista && <p className="font-medium">Protagonista: {nombre(leyenda.protagonista)}</p>}
      <p className="text-sm text-texto-suave">
        Por {nombre(leyenda.autor)} · {formatearFechaCorta(leyenda.fecha)}
      </p>
    </article>
  );
}
