"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cambiarParametro } from "@/lib/filtros";

const tipos = [
  { valor: "TORNEO", nombre: "Torneo" },
  { valor: "PARTIDA_ROL", nombre: "Partida de rol" },
  { valor: "CAMPANA_ROL", nombre: "Campaña de rol" },
  { valor: "NOCHE_JUEGOS", nombre: "Noche de juegos" },
];

const estados = [
  { valor: "PROGRAMADO", nombre: "Programados" },
  { valor: "EN_CURSO", nombre: "En curso" },
  { valor: "FINALIZADO", nombre: "Finalizados" },
  { valor: "CANCELADO", nombre: "Cancelados" },
  { valor: "TODOS", nombre: "Todos" },
];

const etiqueta = "grid gap-1.5 font-medium";
const campo =
  "w-full min-w-0 rounded-lg border-2 border-borde bg-fondo px-3 py-2.5 font-normal text-texto focus:border-caramelo focus:outline-none";

// Igual que FiltrosCatalogo: escribe los filtros en la URL y la página (Server) le pide a la API
export default function FiltrosEventos() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [texto, setTexto] = useState(searchParams.get("search") ?? "");
  const espera = useRef(null);

  function cambiar(clave, valor) {
    router.replace(`${pathname}?${cambiarParametro(searchParams.toString(), clave, valor)}`, { scroll: false });
  }

  // Espera a que el usuario deje de tipear para no pedirle a la API una vez por letra
  function cambiarAlTipear(valor) {
    setTexto(valor);
    clearTimeout(espera.current);
    espera.current = setTimeout(() => cambiar("search", valor), 400);
  }

  function limpiar() {
    setTexto("");
    router.replace(pathname, { scroll: false });
  }

  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="grid gap-4 rounded-2xl border-2 border-borde bg-superficie p-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      <label className={`${etiqueta} sm:col-span-2 lg:col-span-1`}>
        Buscar
        <input
          type="search"
          value={texto}
          onChange={(e) => cambiarAlTipear(e.target.value)}
          placeholder="Nombre del evento o del juego"
          className={campo}
        />
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
        Estado
        <select
          value={searchParams.get("estado") ?? "PROGRAMADO"}
          onChange={(e) => cambiar("estado", e.target.value)}
          className={campo}
        >
          {estados.map((e) => (
            <option key={e.valor} value={e.valor}>
              {e.nombre}
            </option>
          ))}
        </select>
      </label>

      <div className="flex items-end lg:justify-end">
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
