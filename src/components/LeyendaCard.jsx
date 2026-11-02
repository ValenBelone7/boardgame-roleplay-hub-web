import { formatearFechaCorta } from "@/lib/formato";

const nombre = (usuario) => usuario.alias || usuario.username;

// Una crónica de lo que pasó en la mesa (viene con autor y protagonista anidados)
export default function LeyendaCard({ leyenda }) {
  return (
    <article className="grid gap-3 rounded-2xl border-2 border-borde bg-superficie p-6">
      <h3 className="font-serif text-2xl leading-snug">{leyenda.titulo}</h3>
      <p className="whitespace-pre-line">{leyenda.relato}</p>
      {leyenda.protagonista && <p className="font-medium">Protagonista: {nombre(leyenda.protagonista)}</p>}
      <p className="text-sm text-texto-suave">
        Por {nombre(leyenda.autor)} · {formatearFechaCorta(leyenda.fecha)}
      </p>
    </article>
  );
}
