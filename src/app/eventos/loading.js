import Cargando from "@/components/Cargando";

// Se muestra mientras la página de eventos espera a la API
export default function EventosLoading() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <Cargando texto="Cargando los eventos" />
      </div>
    </section>
  );
}
