import Cupo from "@/components/Cupo";

// Los lugares libres solo importan mientras uno se puede anotar. Después, cuántos jugaron
export default function LugaresEvento({ evento }) {
  if (evento.estado === "CANCELADO") return null;
  if (evento.estado === "PROGRAMADO") return <Cupo inscriptos={evento.inscriptos} cupo={evento.cupo} />;

  return (
    <p className="text-sm text-texto-suave">
      {evento.inscriptos} {evento.inscriptos === 1 ? "participante" : "participantes"}
    </p>
  );
}
