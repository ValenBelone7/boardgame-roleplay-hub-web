"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cambiarParametro } from "@/lib/filtros";

const tipos = [
  { valor: "JUEGO_MESA", nombre: "Juego de mesa" },
  { valor: "JUEGO_ROL", nombre: "Juego de rol" },
  { valor: "EXPANSION", nombre: "Expansión" },
  { valor: "ACCESORIO", nombre: "Accesorio" },
];

const ordenes = [
  { valor: "", nombre: "Nombre (A–Z)" },
  { valor: "precio", nombre: "Precio: menor a mayor" },
  { valor: "-precio", nombre: "Precio: mayor a menor" },
  { valor: "-fecha_alta", nombre: "Más nuevos" },
];

const etiqueta = "grid gap-1.5 font-medium";
const campo =
  "w-full min-w-0 rounded-lg border-2 border-borde bg-fondo px-3 py-2.5 font-normal text-texto focus:border-caramelo focus:outline-none";

// Los filtros no se guardan en un estado propio: se escriben en la URL y la página (Server)
// vuelve a pedir los productos a la API con esos parámetros
export default function FiltrosCatalogo({ categorias }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Los campos de texto tienen estado propio para poder tipear sin esperar a la URL
  const [texto, setTexto] = useState(searchParams.get("search") ?? "");
  const [precio, setPrecio] = useState(searchParams.get("precio__lte") ?? "");
  const [jugadores, setJugadores] = useState(searchParams.get("jugadores") ?? "");
  const espera = useRef(null);

  function cambiar(clave, valor) {
    router.replace(`${pathname}?${cambiarParametro(searchParams.toString(), clave, valor)}`, { scroll: false });
  }

  // Espera a que el usuario deje de tipear para no pedirle a la API una vez por letra
  function cambiarAlTipear(clave, valor, setValor) {
    setValor(valor);
    clearTimeout(espera.current);
    espera.current = setTimeout(() => cambiar(clave, valor), 400);
  }

  function limpiar() {
    setTexto("");
    setPrecio("");
    setJugadores("");
    router.replace(pathname, { scroll: false });
  }

  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="grid gap-4 rounded-2xl border-2 border-borde bg-superficie p-5 sm:grid-cols-2 lg:grid-cols-6"
    >
      <label className={`${etiqueta} sm:col-span-2`}>
        Buscar
        <input
          type="search"
          value={texto}
          onChange={(e) => cambiarAlTipear("search", e.target.value, setTexto)}
          placeholder="Nombre, editorial, diseñador o mecánica"
          className={campo}
        />
      </label>

      <label className={etiqueta}>
        Categoría
        <select
          value={searchParams.get("categoria") ?? ""}
          onChange={(e) => cambiar("categoria", e.target.value)}
          className={campo}
        >
          <option value="">Todas</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </label>

      <label className={etiqueta}>
        Tipo
        <select value={searchParams.get("tipo") ?? ""} onChange={(e) => cambiar("tipo", e.target.value)} className={campo}>
          <option value="">Todos</option>
          {tipos.map((t) => (
            <option key={t.valor} value={t.valor}>
              {t.nombre}
            </option>
          ))}
        </select>
      </label>

      <label className={etiqueta}>
        Precio máximo
        <input
          type="number"
          min="0"
          step="1000"
          inputMode="numeric"
          value={precio}
          onChange={(e) => cambiarAlTipear("precio__lte", e.target.value, setPrecio)}
          placeholder="$"
          className={campo}
        />
      </label>

      <label className={etiqueta}>
        Jugadores
        <input
          type="number"
          min="1"
          max="20"
          inputMode="numeric"
          value={jugadores}
          onChange={(e) => cambiarAlTipear("jugadores", e.target.value, setJugadores)}
          placeholder="Somos…"
          className={campo}
        />
      </label>

      <label className={`${etiqueta} sm:col-span-2 lg:col-span-3`}>
        Ordenar por
        <select
          value={searchParams.get("ordering") ?? ""}
          onChange={(e) => cambiar("ordering", e.target.value)}
          className={campo}
        >
          {ordenes.map((o) => (
            <option key={o.valor} value={o.valor}>
              {o.nombre}
            </option>
          ))}
        </select>
      </label>

      <div className="flex items-end sm:col-span-2 lg:col-span-3 lg:justify-end">
        <button
          type="button"
          onClick={limpiar}
          className="rounded-full border-2 border-borde px-5 py-2.5 font-bold hover:bg-fondo focus-visible:outline-3 focus-visible:outline-caramelo"
        >
          Limpiar filtros
        </button>
      </div>
    </form>
  );
}
