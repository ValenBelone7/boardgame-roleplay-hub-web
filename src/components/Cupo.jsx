// Más de 10 sillas no entran bien como puntos en una tarjeta: se muestra una barra
const MAXIMO_DE_PUNTOS = 10;

// Lugares ocupados de un evento: un punto por silla, o una barra si son muchas
export default function Cupo({ inscriptos, cupo }) {
  const texto = inscriptos >= cupo ? "Cupo completo" : `${inscriptos} de ${cupo} lugares ocupados`;

  return (
    <div className="grid gap-1.5">
      {cupo <= MAXIMO_DE_PUNTOS ? (
        <ul className="flex flex-wrap gap-1.5" aria-hidden="true">
          {Array.from({ length: cupo }, (_, i) => (
            <li
              key={i}
              className={`size-3 rounded-full border-2 border-caramelo ${i < inscriptos ? "bg-caramelo" : ""}`}
            />
          ))}
        </ul>
      ) : (
        <div className="h-3 overflow-hidden rounded-full border-2 border-caramelo" aria-hidden="true">
          {/* El ancho depende del dato: es el único estilo que no se puede escribir con una clase */}
          <div className="h-full bg-caramelo" style={{ width: `${Math.min((inscriptos / cupo) * 100, 100)}%` }} />
        </div>
      )}
      <p className="text-sm text-texto-suave">{texto}</p>
    </div>
  );
}
