// Lo muestran los error.js. El botón vuelve a pedir los datos a la API
export default function ErrorCarga({ error, retry }) {
  return (
    <div role="alert" className="mx-auto grid max-w-xl gap-4 rounded-2xl border-2 border-red-300 bg-red-50 p-8 text-red-950">
      <h2 className="font-serif text-2xl">No se pudieron cargar los datos</h2>
      <p>La API no respondió o devolvió un error. Si estaba dormida, probá de nuevo en unos segundos.</p>
      {/* En producción Next oculta el mensaje de los errores del servidor: el detalle solo se ve en desarrollo */}
      {process.env.NODE_ENV === "development" && <p className="text-sm">{error.message}</p>}
      <button
        type="button"
        onClick={() => retry()}
        className="justify-self-start rounded-full bg-bordo px-5 py-2.5 font-bold text-crema hover:bg-bordo-oscuro focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-caramelo"
      >
        Reintentar
      </button>
    </div>
  );
}
