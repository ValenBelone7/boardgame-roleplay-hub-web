"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registroSchema } from "@/app/validations/RegistroSchema";
import { registrar } from "@/app/actions";
import Campo from "@/components/Campo";

const boton =
  "rounded-full bg-bordo px-6 py-3.5 text-lg font-bold text-crema hover:bg-bordo-oscuro focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-caramelo disabled:opacity-60 dark:bg-arena dark:text-tinta dark:hover:bg-crema";

export default function RegistroForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registroSchema),
    defaultValues: { username: "", email: "", alias: "", fecha_nacimiento: "", password: "", confirmar: "" },
  });

  async function onSubmit(datos) {
    const respuesta = await registrar(datos);
    if (!respuesta) return; // salió bien: la acción redirige

    // Los errores de la API van debajo de cada campo (por ejemplo, "ya existe un usuario...")
    for (const [campo, mensaje] of Object.entries(respuesta.errores ?? {})) {
      setError(campo, { message: mensaje });
    }
    if (respuesta.error) setError("root", { message: respuesta.error });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
      <Campo etiqueta="Usuario" autoComplete="username" error={errors.username?.message} {...register("username")} />
      <Campo etiqueta="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
      <Campo etiqueta="Alias de jugador (opcional)" error={errors.alias?.message} {...register("alias")} />
      <Campo
        etiqueta="Fecha de nacimiento (opcional)"
        type="date"
        error={errors.fecha_nacimiento?.message}
        {...register("fecha_nacimiento")}
      />
      <Campo
        etiqueta="Contraseña"
        type="password"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register("password")}
      />
      <Campo
        etiqueta="Repetí la contraseña"
        type="password"
        autoComplete="new-password"
        error={errors.confirmar?.message}
        {...register("confirmar")}
      />

      {errors.root && (
        <p role="alert" className="rounded-lg bg-red-100 px-4 py-3 text-red-900">
          {errors.root.message}
        </p>
      )}

      <button disabled={isSubmitting} className={boton}>
        {isSubmitting ? "Creando la cuenta…" : "Crear cuenta"}
      </button>
    </form>
  );
}
