import Link from "next/link";

// La muestra notFound() cuando el producto no existe o está dado de baja
export default function ProductoNoEncontrado() {
  return (
    <section className="flex flex-col items-center gap-5 px-6 py-24 text-center">
      <p className="font-ancha text-8xl font-black text-bordo dark:text-arena">404</p>
      <h1 className="font-serif text-3xl">Ese juego no está en el catálogo</h1>
      <p className="max-w-md text-lg text-texto-suave">
        Puede que se haya agotado para siempre o que el link esté mal. Buscalo entre los que sí tenemos.
      </p>
      <Link
        href="/catalogo"
        className="rounded-full bg-tinta px-6 py-4 font-bold text-crema hover:bg-bordo focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-arena dark:bg-arena dark:text-tinta dark:hover:bg-crema"
      >
        Ver el catálogo
      </Link>
    </section>
  );
}
