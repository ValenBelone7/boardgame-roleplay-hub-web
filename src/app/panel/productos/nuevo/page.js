import { requireStaff } from "@/lib/auth";
import ProductoForm from "@/components/ProductoForm";
import { datosFormulario } from "@/app/panel/productos/datos-formulario";

export const metadata = {
  title: "Nuevo producto",
};

export default async function NuevoProductoPage() {
  await requireStaff();
  const opciones = await datosFormulario();

  return (
    <div className="grid gap-6">
      <h1 className="font-serif text-4xl">Nuevo producto</h1>
      <ProductoForm {...opciones} />
    </div>
  );
}
