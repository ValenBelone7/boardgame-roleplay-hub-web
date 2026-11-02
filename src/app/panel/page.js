import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { ENDPOINTS, getPagina, list } from "@/lib/api";
import Stats from "@/components/Stats";

export const metadata = {
  title: "Panel",
};

export default async function PanelPage() {
  // Sin sesión → /login; con sesión pero sin ser staff → inicio
  const usuario = await requireStaff();

  // list() recorre todas las páginas: el panel ve también los dados de baja
  const [productos, eventos] = await Promise.all([
    list(ENDPOINTS.productos),
    getPagina(ENDPOINTS.eventos, "estado=PROGRAMADO"),
  ]);
  const activos = productos.filter((p) => p.activo);
  const sinStock = activos.filter((p) => p.stock === 0);

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="font-serif text-4xl">Panel de la tienda</h1>
        <p className="mt-2 text-texto-suave">Hola, {usuario.alias || usuario.username}. Así está Arcana hoy.</p>
      </div>

      <Stats
        items={[
          { label: "Productos activos", value: activos.length },
          { label: "Sin stock", value: sinStock.length },
          { label: "Dados de baja", value: productos.length - activos.length },
          { label: "Eventos programados", value: eventos.count },
        ]}
      />

      <section className="rounded-2xl border-2 border-borde bg-superficie p-6">
        <h2 className="mb-3 font-serif text-2xl">Para reponer</h2>
        {sinStock.length === 0 ? (
          <p className="text-texto-suave">No hay productos sin stock.</p>
        ) : (
          <ul className="grid gap-2">
            {sinStock.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/panel/productos/${p.id}/editar`}
                  className="font-bold text-bordo underline-offset-4 hover:underline dark:text-arena"
                >
                  {p.nombre}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
