import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { ENDPOINTS, getUno } from "@/lib/api";
import ProductoForm from "@/components/ProductoForm";
import { datosFormulario } from "@/app/panel/productos/datos-formulario";

export const metadata = {
  title: "Editar producto",
};

export default async function EditarProductoPage({ params }) {
  await requireStaff();
  const { id } = await params;

  const [producto, opciones] = await Promise.all([getUno(`${ENDPOINTS.productos}${id}/`), datosFormulario()]);
  if (!producto) notFound();

  // Un producto no puede ser expansión de sí mismo
  const juegosBase = opciones.juegosBase.filter((j) => j.id !== producto.id);

  return (
    <div className="grid gap-6">
      <h1 className="font-serif text-4xl">Editar {producto.nombre}</h1>
      <ProductoForm producto={producto} {...opciones} juegosBase={juegosBase} />
    </div>
  );
}
