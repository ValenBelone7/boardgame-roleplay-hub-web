"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { borrarProducto, darDeBajaProducto } from "@/app/panel/actions";

const botonChico =
  "rounded-lg px-3 py-1.5 font-bold focus-visible:outline-3 focus-visible:outline-caramelo disabled:opacity-60";

// Confirmación en dos pasos, como BorrarArticulo del profe. Si el producto ya se vendió, la API no
// deja borrarlo y se ofrece darlo de baja (sale del catálogo pero queda en los pedidos)
export default function BorrarProducto({ id, nombre, activo }) {
  const router = useRouter();
  const [paso, setPaso] = useState("inicio"); // inicio → confirmar → borrando (o baja)
  const [error, setError] = useState("");

  async function borrar() {
    setPaso("borrando");
    setError("");
    const r = await borrarProducto(id);
    if (r.puedeDarDeBaja && activo) {
      setPaso("baja");
    } else if (r.error) {
      setError(r.error);
      setPaso("inicio");
    } else {
      router.refresh();
    }
  }

  async function darDeBaja() {
    setPaso("borrando");
    const r = await darDeBajaProducto(id);
    if (r.error) setError(r.error);
    setPaso("inicio");
    router.refresh();
  }

  if (paso === "borrando") return <span className="text-texto-suave">Un momento…</span>;

  if (paso === "baja") {
    return (
      <span className="inline-flex flex-wrap items-center justify-end gap-2">
        <span role="alert" className="max-w-56 text-left text-sm">
          Ya tiene pedidos, no se puede borrar. ¿Lo das de baja del catálogo?
        </span>
        <button type="button" onClick={darDeBaja} className={`${botonChico} bg-amber-200 text-tinta hover:bg-amber-300`}>
          Dar de baja
        </button>
        <button type="button" onClick={() => setPaso("inicio")} className={`${botonChico} hover:bg-fondo`}>
          Cancelar
        </button>
      </span>
    );
  }

  if (paso === "confirmar") {
    return (
      <span className="inline-flex items-center gap-2">
        <button type="button" onClick={borrar} className={`${botonChico} bg-red-700 text-white hover:bg-red-800`}>
          Sí, borrar
        </button>
        <button type="button" onClick={() => setPaso("inicio")} className={`${botonChico} hover:bg-fondo`}>
          Cancelar
        </button>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center justify-end gap-2">
      {error && (
        <span role="alert" className="text-sm text-red-700 dark:text-red-300">
          {error}
        </span>
      )}
      <button
        type="button"
        onClick={() => setPaso("confirmar")}
        aria-label={`Borrar ${nombre}`}
        className={`${botonChico} text-red-700 hover:bg-red-100 dark:text-red-300 dark:hover:bg-red-950`}
      >
        Borrar
      </button>
    </span>
  );
}
