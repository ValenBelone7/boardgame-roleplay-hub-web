import { formatearPrecio } from "@/lib/formato";

// La API manda el precio como texto ("84900.00"): acá se muestra como $ 84.900
export default function Precio({ valor, className = "" }) {
  return <span className={`font-bold tabular-nums ${className}`}>{formatearPrecio(valor)}</span>;
}
