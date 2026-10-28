import Link from "next/link";
import TitularDados from "@/components/TitularDados";

const secciones = [
  {
    href: "/catalogo",
    titulo: "Catálogo",
    texto: "Juegos de mesa, de rol, expansiones y accesorios. Filtrá por cómo se juega, no solo por género.",
    enlace: "Ver el catálogo",
    fondo: "bg-fondo",
  },
  {
    href: "/eventos",
    titulo: "En la mesa",
    texto: "Torneos, campañas de rol y noches de juego abiertas. Anotate antes de que se llene la mesa.",
    enlace: "Ver la agenda",
    fondo: "bg-superficie",
  },
  {
    href: "/salon-de-la-fama",
    titulo: "Salón de la fama",
    texto: "Cada campeón recibe su arcano. La comunidad escribe la leyenda que lo acompaña.",
    enlace: "Ver los campeones",
    fondo: "bg-fondo",
  },
];

const botonClaro =
  "rounded-full bg-arena px-6 py-4 text-lg font-bold text-tinta hover:bg-crema focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-arena";
const botonBorde =
  "rounded-full border-2 border-crema px-6 py-3.5 text-lg font-bold text-crema hover:bg-crema hover:text-tinta focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-arena";

export default function Home() {
  return (
    <>
      <section className="bg-bordo px-6 pt-6 pb-24 text-crema">
        <div className="mx-auto max-w-6xl">
          <TitularDados />
          <h1 className="mt-6 mb-4 max-w-[18ch] text-4xl leading-tight font-extrabold lg:text-5xl">
            Juegos de mesa y rol, con mesa propia para jugarlos.
          </h1>
          <p className="mb-8 max-w-[52ch] text-lg text-rosado">
            Comprá online o vení al local: tenemos torneos, campañas de rol y noches de juego
            abiertas. Si no sabés jugar, te enseñamos en la mesa.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/catalogo" className={botonClaro}>
              Ver el catálogo
            </Link>
            <Link href="/eventos" className={botonBorde}>
              Ver la agenda
            </Link>
          </div>
        </div>
      </section>

      {secciones.map((s) => (
        <section key={s.href} className={`${s.fondo} px-6 py-20`}>
          <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="mb-3 font-ancha text-5xl font-black tracking-tight lg:text-7xl">{s.titulo}</h2>
              <p className="max-w-[46ch] text-lg text-texto-suave">{s.texto}</p>
            </div>
            <Link
              href={s.href}
              className="py-3 font-bold text-bordo underline-offset-4 hover:underline dark:text-arena"
            >
              {s.enlace}
            </Link>
          </div>
        </section>
      ))}
    </>
  );
}
