import Badge from "@/components/Badge";

const colores = {
  PROGRAMADO: "verde",
  EN_CURSO: "ambar",
  FINALIZADO: "arena",
  CANCELADO: "rojo",
};

// Etiqueta con el estado de un evento, del color que le corresponde
export default function EstadoEvento({ evento }) {
  return <Badge color={colores[evento.estado]}>{evento.estado_display}</Badge>;
}
