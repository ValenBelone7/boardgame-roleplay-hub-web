import { Isotipo } from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-bordo px-6 pt-14 pb-8 text-crema">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-x-16 gap-y-10">
        <div className="flex-[2_1_260px]">
          <p className="flex items-center gap-3">
            <Isotipo tamano={52} />
            <span className="font-ancha text-4xl font-black">Arcana</span>
          </p>
          <p className="mt-3 max-w-[34ch] text-rosado">
            Tienda de juegos de mesa y rol con eventos semanales en el local.
          </p>
        </div>

        <div className="flex flex-[1_1_200px] flex-col gap-2">
          <h2 className="mb-1 font-extrabold">El proyecto</h2>
          <a
            href="https://github.com/ValenBelone7/boardgame-roleplay-hub-django"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:underline"
          >
            API de Arcana (Django REST Framework)
          </a>
          <a
            href="https://github.com/ValenBelone7/boardgame-roleplay-hub-web"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:underline"
          >
            Repositorio del frontend
          </a>
        </div>

        <div className="flex flex-[1_1_160px] flex-col gap-2">
          <h2 className="mb-1 font-extrabold">Equipo</h2>
          <p>Valentín Belone</p>
          <p>Tiago Pescara</p>
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-6xl text-sm text-rosado">EFI 2026, Programación III, ITEC</p>
    </footer>
  );
}
