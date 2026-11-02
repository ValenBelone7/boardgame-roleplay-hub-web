import Cargando from "@/components/Cargando";

// Se muestra mientras la página del salón de la fama espera a la API
export default function SalonLoading() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <Cargando texto="Cargando el salón de la fama" />
      </div>
    </section>
  );
}
