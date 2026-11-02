import Image from "next/image";
import { Isotipo } from "@/components/Logo";

// Portada del producto. Algunos no tienen imagen: se muestra el isotipo de Arcana.
// "fill" ocupa la caja del padre, que tiene que tener tamaño y position relative.
// chica: para las miniaturas de la tabla del panel
export default function Portada({ producto, sizes, chica = false }) {
  if (!producto.imagen_url) {
    return (
      <div className="flex size-full items-center justify-center bg-rosado">
        <Isotipo tamano={chica ? 36 : 64} />
      </div>
    );
  }

  // unoptimized: Wikimedia le responde 429 (demasiados pedidos) al optimizador de Next,
  // así que la imagen la pide el navegador directo. Igual se carga diferida (lazy)
  return (
    <Image
      src={producto.imagen_url}
      alt={`Portada de ${producto.nombre}`}
      fill
      unoptimized
      sizes={sizes}
      className={`bg-crema object-contain ${chica ? "p-0.5" : "p-3"}`}
    />
  );
}
