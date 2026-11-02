import Link from "next/link";

export const metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <section className="flex flex-col items-center gap-5 px-6 py-24 text-center">
      <p className="font-ancha text-8xl font-black text-bordo dark:text-arena">404</p>
      <h1 className="font-serif text-3xl">Esta mesa no existe</h1>
      <p className="max-w-md text-lg text-texto-suave">
        Tiraste los dados y te tocó un camino que no está en el mapa. Volvé al inicio y probá otra
        ruta.
      </p>
      <Link
        href="/"
        className="rounded-full bg-tinta px-6 py-4 font-bold text-crema hover:bg-bordo focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-arena dark:bg-arena dark:text-tinta dark:hover:bg-crema"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
