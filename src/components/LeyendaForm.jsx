"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leyendaSchema } from "@/app/validations/LeyendaSchema";
import { crearLeyenda } from "@/app/eventos/actions";
import { useSesion } from "@/app/context/SesionContext";
import Campo from "@/components/Campo";

const boton =
  "justify-self-start rounded-full bg-bordo px-6 py-3 font-bold text-crema hover:bg-bordo-oscuro focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-caramelo disabled:opacity-60 dark:bg-arena dark:text-tinta dark:hover:bg-crema";

export default function LeyendaForm({ eventoId }) {
  const router = useRouter();
  const { logueado } = useSesion();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(leyendaSchema),
    defaultValues: { titulo: "", relato: "" },
  });

  if (!logueado) {
    return (
      <p className="text-texto-suave">
        <Link href="/login" className="font-bold text-bordo underline underline-offset-4 dark:text-arena">
          Iniciá sesión
        </Link>{" "}
        para escribir una leyenda.
      </p>
    );
  }

  async function onSubmit(datos) {
    const respuesta = await crearLeyenda(eventoId, datos);
    if (respuesta.error || respuesta.errores) {
      for (const [campo, mensaje] of Object.entries(respuesta.errores ?? {})) {
        // "evento" no es un campo del formulario: su error no se vería en ningún lado
        setError(campo === "titulo" || campo === "relato" ? campo : "root", { message: mensaje });
      }
      if (respuesta.error) setError("root", { message: respuesta.error });
      return;
    }
    reset();
    router.refresh(); // vuelve a pedir la lista con la leyenda nueva
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4 rounded-2xl border-2 border-borde bg-superficie p-6">
      <h3 className="font-serif text-2xl">Escribí una leyenda</h3>

      <Campo etiqueta="Título" error={errors.titulo?.message} {...register("titulo")} />

      <label className="grid gap-1.5 font-medium">
        Relato
        <textarea
          rows={5}
          {...register("relato")}
          className="rounded-lg border-2 border-borde bg-fondo px-3 py-2.5 font-normal text-texto focus:border-caramelo focus:outline-none"
        />
        {errors.relato && <span className="text-sm font-normal text-red-700 dark:text-red-300">{errors.relato.message}</span>}
      </label>

      {errors.root && (
        <p role="alert" className="rounded-lg bg-red-100 px-4 py-3 text-red-900">
          {errors.root.message}
        </p>
      )}

      <button disabled={isSubmitting} className={boton}>
        {isSubmitting ? "Publicando…" : "Publicar leyenda"}
      </button>
    </form>
  );
}
