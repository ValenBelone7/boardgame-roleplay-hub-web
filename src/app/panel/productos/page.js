import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { ENDPOINTS, list } from "@/lib/api";
import DataTable from "@/components/DataTable";
import Badge from "@/components/Badge";
import Portada from "@/components/Portada";
import Precio from "@/components/Precio";
import BorrarProducto from "@/components/BorrarProducto";

export const metadata = {
  title: "Productos",
};

// Stock con colores, como el profe: rojo sin stock, ámbar poco, verde bien
function colorStock(stock) {
  if (stock === 0) return "rojo";
  if (stock <= 3) return "ambar";
  return "verde";
}

const columns = [
  {
    key: "portada",
    label: "",
    render: (p) => (
      <div className="relative size-14 overflow-hidden rounded-lg border border-borde">
        <Portada producto={p} sizes="56px" chica />
      </div>
    ),
  },
  {
    key: "nombre",
    label: "Producto",
    render: (p) => (
      <>
        <p className="font-bold">{p.nombre}</p>
        <p className="text-sm text-texto-suave">
          {p.tipo_display} · {p.categoria.nombre}
        </p>
      </>
    ),
  },
  { key: "precio", label: "Precio", align: "right", render: (p) => <Precio valor={p.precio} /> },
  {
    key: "stock",
    label: "Stock",
    align: "right",
    render: (p) => <Badge color={colorStock(p.stock)}>{p.stock}</Badge>,
  },
  {
    key: "activo",
    label: "Estado",
    render: (p) => (p.activo ? <Badge color="verde">Activo</Badge> : <Badge color="rojo">De baja</Badge>),
  },
  {
    key: "acciones",
    label: "Acciones",
    align: "right",
    render: (p) => (
      <div className="flex items-center justify-end gap-2">
        <Link
          href={`/panel/productos/${p.id}/editar`}
          aria-label={`Editar ${p.nombre}`}
          className="rounded-lg px-3 py-1.5 font-bold text-bordo hover:bg-fondo focus-visible:outline-3 focus-visible:outline-caramelo dark:text-arena"
        >
          Editar
        </Link>
        <BorrarProducto id={p.id} nombre={p.nombre} activo={p.activo} />
      </div>
    ),
  },
];

export default async function ProductosPanelPage() {
  await requireStaff();
  const productos = await list(ENDPOINTS.productos);

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl">Productos</h1>
          <p className="mt-2 text-texto-suave">{productos.length} en total, incluidos los dados de baja.</p>
        </div>
        <Link
          href="/panel/productos/nuevo"
          className="rounded-full bg-bordo px-5 py-3 font-bold text-crema hover:bg-bordo-oscuro focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-caramelo dark:bg-arena dark:text-tinta dark:hover:bg-crema"
        >
          + Nuevo producto
        </Link>
      </div>
      <DataTable columns={columns} rows={productos} empty="Todavía no hay productos. Cargá el primero." />
    </div>
  );
}
