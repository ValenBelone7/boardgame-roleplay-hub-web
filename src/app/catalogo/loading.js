import Cargando from "@/components/Cargando";

// Se muestra mientras la página del catálogo espera a la API
export default function CatalogoLoading() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <Cargando texto="Cargando el catálogo" />
      </div>
    </section>
  );
}
