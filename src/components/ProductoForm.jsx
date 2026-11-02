"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productoSchema } from "@/app/validations/ProductoSchema";
import { crearProducto, editarProducto } from "@/app/panel/actions";
import Campo from "@/components/Campo";

const tipos = [
  { valor: "JUEGO_MESA", nombre: "Juego de mesa" },
  { valor: "JUEGO_ROL", nombre: "Juego de rol" },
  { valor: "EXPANSION", nombre: "Expansión" },
  { valor: "ACCESORIO", nombre: "Accesorio" },
];

const etiqueta = "grid gap-1.5 font-medium";
const campo =
  "w-full min-w-0 rounded-lg border-2 border-borde bg-fondo px-3 py-2.5 font-normal text-texto focus:border-caramelo focus:outline-none aria-invalid:border-red-700";
const textoError = "text-sm font-normal text-red-700 dark:text-red-300";
const seccion = "grid gap-5 rounded-2xl border-2 border-borde bg-superficie p-6";
const boton =
  "rounded-full bg-bordo px-6 py-3.5 text-lg font-bold text-crema hover:bg-bordo-oscuro focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-caramelo disabled:opacity-60 dark:bg-arena dark:text-tinta dark:hover:bg-crema";

// Los valores del producto de la API pasan a texto, que es lo que manejan los inputs
function valoresIniciales(producto) {
  if (!producto) {
    return {
      nombre: "",
      descripcion: "",
      tipo: "JUEGO_MESA",
      precio: "",
      stock: "0",
      jugadores_min: "",
      jugadores_max: "",
      duracion_minutos: "",
      edad_minima: "",
      imagen_url: "",
      categoria: "",
      editorial: "",
      juego_base: "",
      mecanicas: [],
      disenadores: [],
      activo: true,
    };
  }
  const texto = (valor) => (valor === null ? "" : String(valor));
  return {
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    tipo: producto.tipo,
    precio: producto.precio,
    stock: String(producto.stock),
    jugadores_min: texto(producto.jugadores_min),
    jugadores_max: texto(producto.jugadores_max),
    duracion_minutos: texto(producto.duracion_minutos),
    edad_minima: texto(producto.edad_minima),
    imagen_url: producto.imagen_url,
    categoria: String(producto.categoria),
    editorial: texto(producto.editorial),
    juego_base: texto(producto.juego_base),
    mecanicas: producto.mecanicas.map(String),
    disenadores: producto.disenadores.map(String),
    activo: producto.activo,
  };
}

// Alta y edición con el mismo formulario: si llega "producto", se edita
export default function ProductoForm({ producto, categorias, editoriales, mecanicas, disenadores, juegosBase }) {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productoSchema),
    defaultValues: valoresIniciales(producto),
  });

  // El juego base solo se pide para las expansiones
  const esExpansion = useWatch({ control, name: "tipo" }) === "EXPANSION";

  async function onSubmit(datos) {
    const respuesta = producto ? await editarProducto(producto.id, datos) : await crearProducto(datos);
    if (!respuesta) return; // salió bien: la acción redirige al listado

    // Errores del serializer del back, debajo de cada campo (ej. juego_base, jugadores_max)
    for (const [nombre, mensaje] of Object.entries(respuesta.errores ?? {})) {
      setError(nombre, { message: mensaje });
    }
    if (respuesta.error) setError("root", { message: respuesta.error });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6">
      <fieldset className={seccion}>
        <legend className="sr-only">Datos principales</legend>
        <Campo etiqueta="Nombre" error={errors.nombre?.message} {...register("nombre")} />

        <label className={etiqueta}>
          Descripción
          <textarea rows={3} className={campo} {...register("descripcion")} />
        </label>

        <div className="grid gap-5 sm:grid-cols-3">
          <label className={etiqueta}>
            Tipo
            <select className={campo} {...register("tipo")}>
              {tipos.map((t) => (
                <option key={t.valor} value={t.valor}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </label>
          <Campo
            etiqueta="Precio ($)"
            type="number"
            min="0"
            step="0.01"
            error={errors.precio?.message}
            {...register("precio")}
          />
          <Campo etiqueta="Stock" type="number" min="0" step="1" error={errors.stock?.message} {...register("stock")} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className={etiqueta}>
            Categoría
            <select className={campo} aria-invalid={errors.categoria ? true : undefined} {...register("categoria")}>
              <option value="">Elegí una</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
            {errors.categoria && <span className={textoError}>{errors.categoria.message}</span>}
          </label>
          <label className={etiqueta}>
            Editorial (opcional)
            <select className={campo} {...register("editorial")}>
              <option value="">Sin editorial</option>
              {editoriales.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nombre}
                </option>
              ))}
            </select>
            {errors.editorial && <span className={textoError}>{errors.editorial.message}</span>}
          </label>
        </div>

        {esExpansion && (
          <label className={etiqueta}>
            Juego base
            <select className={campo} aria-invalid={errors.juego_base ? true : undefined} {...register("juego_base")}>
              <option value="">Elegí el juego que expande</option>
              {juegosBase.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.nombre}
                </option>
              ))}
            </select>
            {errors.juego_base && <span className={textoError}>{errors.juego_base.message}</span>}
          </label>
        )}
      </fieldset>

      <fieldset className={seccion}>
        <legend className="mb-1 font-serif text-2xl">Cómo se juega (opcional)</legend>
        <div className="grid gap-5 sm:grid-cols-4">
          <Campo etiqueta="Jugadores mín." type="number" min="1" error={errors.jugadores_min?.message} {...register("jugadores_min")} />
          <Campo etiqueta="Jugadores máx." type="number" min="1" error={errors.jugadores_max?.message} {...register("jugadores_max")} />
          <Campo etiqueta="Duración (min)" type="number" min="1" error={errors.duracion_minutos?.message} {...register("duracion_minutos")} />
          <Campo etiqueta="Edad mínima" type="number" min="1" error={errors.edad_minima?.message} {...register("edad_minima")} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <fieldset>
            <legend className="mb-2 font-medium">Mecánicas</legend>
            <div className="grid gap-1.5">
              {mecanicas.map((m) => (
                <label key={m.id} className="flex items-center gap-2">
                  <input type="checkbox" value={m.id} className="size-4 accent-bordo" {...register("mecanicas")} />
                  {m.nombre}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-2 font-medium">Diseño</legend>
            <div className="grid gap-1.5">
              {disenadores.map((d) => (
                <label key={d.id} className="flex items-center gap-2">
                  <input type="checkbox" value={d.id} className="size-4 accent-bordo" {...register("disenadores")} />
                  {d.nombre}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </fieldset>

      <fieldset className={seccion}>
        <legend className="sr-only">Publicación</legend>
        <Campo
          etiqueta="URL de la portada (opcional)"
          type="url"
          placeholder="https://upload.wikimedia.org/…"
          error={errors.imagen_url?.message}
          {...register("imagen_url")}
        />
        <label className="flex items-center gap-2 font-medium">
          <input type="checkbox" className="size-4 accent-bordo" {...register("activo")} />
          Visible en el catálogo
        </label>
      </fieldset>

      {errors.root && (
        <p role="alert" className="rounded-lg bg-red-100 px-4 py-3 text-red-900">
          {errors.root.message}
        </p>
      )}

      <button disabled={isSubmitting} className={`${boton} justify-self-start`}>
        {isSubmitting ? "Guardando…" : producto ? "Guardar cambios" : "Crear producto"}
      </button>
    </form>
  );
}
