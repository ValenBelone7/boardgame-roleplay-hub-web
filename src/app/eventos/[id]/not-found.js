import Link from "next/link";

// La muestra notFound() cuando el evento no existe
export default function EventoNoEncontrado() {
  return (
    <section className="flex flex-col items-center gap-5 px-6 py-24 text-center">
      <p className="font-ancha text-8xl font-black text-bordo dark:text-arena">404</p>
      <h1 className="font-serif text-3xl">Ese evento no está en la agenda</h1>
      <p className="max-w-md text-lg text-texto-suave">
        Puede que el link esté mal. Buscá tu próxima mesa entre los eventos que tenemos.
      </p>
      <Link
        href="/eventos"
        className="rounded-full bg-tinta px-6 py-4 font-bold text-crema hover:bg-bordo focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-arena dark:bg-arena dark:text-tinta dark:hover:bg-crema"
      >
        Ver los eventos
      </Link>
    </section>
  );
}
