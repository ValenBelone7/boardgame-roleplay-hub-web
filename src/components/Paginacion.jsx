import Link from "next/link";
import { conPagina } from "@/lib/filtros";

const enlace =
  "rounded-full border-2 border-borde px-5 py-2.5 font-bold hover:bg-superficie focus-visible:outline-3 focus-visible:outline-caramelo";

// Links a la página anterior y siguiente conservando los filtros. DRF pagina de a 10
export default function Paginacion({ ruta, query, pagina, total }) {
  const paginas = Math.ceil(total / 10);
  if (paginas <= 1) return null;

  // Sin filtros ni página queda "/catalogo" (sin el "?" colgando)
  function enlaceA(n) {
    const q = conPagina(query, n);
    return q ? `${ruta}?${q}` : ruta;
  }

  return (
    <nav aria-label="Paginación" className="mt-10 flex flex-wrap items-center justify-center gap-4">
      {pagina > 1 && (
        <Link href={enlaceA(pagina - 1)} className={enlace}>
          ← Anterior
        </Link>
      )}
      <span className="text-texto-suave">
        Página {pagina} de {paginas}
      </span>
      {pagina < paginas && (
        <Link href={enlaceA(pagina + 1)} className={enlace}>
          Siguiente →
        </Link>
      )}
    </nav>
  );
}
