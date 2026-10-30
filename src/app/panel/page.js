import { requireStaff } from "@/lib/auth";

export const metadata = {
  title: "Panel",
};

export default async function PanelPage() {
  // Sin sesión → /login; con sesión pero sin ser staff → inicio
  const usuario = await requireStaff();

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-serif text-4xl">Panel de la tienda</h1>
        <p className="mt-2 text-texto-suave">
          Hola, {usuario.alias || usuario.username}. Desde acá se administran los productos del catálogo.
        </p>
      </div>
    </section>
  );
}
