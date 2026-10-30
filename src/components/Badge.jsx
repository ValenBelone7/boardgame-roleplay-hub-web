// Etiqueta chica para tipos y estados (Juego de rol, Sin stock, De baja...)
const colores = {
  arena: "bg-arena text-tinta",
  bordo: "bg-bordo text-crema",
  verde: "bg-emerald-100 text-emerald-900",
  ambar: "bg-amber-100 text-amber-900",
  rojo: "bg-red-100 text-red-900",
};

export default function Badge({ children, color = "arena" }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-sm font-bold whitespace-nowrap ${colores[color]}`}>
      {children}
    </span>
  );
}
