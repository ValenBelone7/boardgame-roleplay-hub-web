"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resenaSchema } from "@/app/validations/ResenaSchema";
import { crearResena } from "@/app/catalogo/actions";
import { useSesion } from "@/app/context/SesionContext";

const boton =
  "justify-self-start rounded-full bg-bordo px-6 py-3 font-bold text-crema hover:bg-bordo-oscuro focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-caramelo disabled:opacity-60 dark:bg-arena dark:text-tinta dark:hover:bg-crema";

// autores: ids de los usuarios que ya opinaron (el back admite una reseña por persona)
export default function ResenaForm({ productoId, autores }) {
  const router = useRouter();
  const { usuario, logueado } = useSesion();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resenaSchema),
    defaultValues: { puntaje: "", comentario: "" },
  });

  if (!logueado) {
    return (
      <p className="text-texto-suave">
        <Link href="/login" className="font-bold text-bordo underline underline-offset-4 dark:text-arena">
          Iniciá sesión
        </Link>{" "}
        para dejar tu reseña.
      </p>
    );
  }

  if (autores.includes(usuario.id)) {
    return <p className="text-texto-suave">Ya dejaste tu reseña de este producto. ¡Gracias!</p>;
  }

  async function onSubmit(datos) {
    const respuesta = await crearResena(productoId, datos);
    if (respuesta.error || respuesta.errores) {
      for (const [campo, mensaje] of Object.entries(respuesta.errores ?? {})) {
        setError(campo, { message: mensaje });
      }
      if (respuesta.error) setError("root", { message: respuesta.error });
      return;
    }
    reset();
    router.refresh(); // vuelve a pedir la lista con la reseña nueva, como el profe
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4 rounded-2xl border-2 border-borde bg-superficie p-6">
      <h3 className="font-serif text-2xl">Dejá tu reseña</h3>

      <fieldset>
        <legend className="mb-2 font-medium">Puntaje</legend>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <label
              key={n}
              className="cursor-pointer rounded-full border-2 border-borde px-4 py-2 font-bold has-checked:border-caramelo has-checked:bg-arena has-checked:text-tinta has-focus-visible:outline-3 has-focus-visible:outline-caramelo"
            >
              <input type="radio" value={n} className="sr-only" {...register("puntaje")} />
              {n} ★
            </label>
          ))}
        </div>
        {errors.puntaje && <p className="mt-2 text-sm text-red-700 dark:text-red-300">{errors.puntaje.message}</p>}
      </fieldset>

      <label className="grid gap-1.5 font-medium">
        Comentario (opcional)
        <textarea
          rows={4}
          {...register("comentario")}
          className="rounded-lg border-2 border-borde bg-fondo px-3 py-2.5 font-normal text-texto focus:border-caramelo focus:outline-none"
        />
        {errors.comentario && (
          <span className="text-sm font-normal text-red-700 dark:text-red-300">{errors.comentario.message}</span>
        )}
      </label>

      {errors.root && (
        <p role="alert" className="rounded-lg bg-red-100 px-4 py-3 text-red-900">
          {errors.root.message}
        </p>
      )}

      <button disabled={isSubmitting} className={boton}>
        {isSubmitting ? "Publicando…" : "Publicar reseña"}
      </button>
    </form>
  );
}
