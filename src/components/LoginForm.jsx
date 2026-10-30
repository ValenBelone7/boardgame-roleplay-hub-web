"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/validations/LoginSchema";
import { login } from "@/app/actions";
import Campo from "@/components/Campo";

const boton =
  "rounded-full bg-bordo px-6 py-3.5 text-lg font-bold text-crema hover:bg-bordo-oscuro focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-caramelo disabled:opacity-60 dark:bg-arena dark:text-tinta dark:hover:bg-crema";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  // Solo llega acá si Zod aprobó los datos. Si el login sale bien, la acción redirige
  async function onSubmit(datos) {
    const respuesta = await login(datos);
    if (respuesta?.error) setError("root", { message: respuesta.error });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
      <Campo etiqueta="Usuario" autoComplete="username" error={errors.username?.message} {...register("username")} />
      <Campo
        etiqueta="Contraseña"
        type="password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password")}
      />

      {errors.root && (
        <p role="alert" className="rounded-lg bg-red-100 px-4 py-3 text-red-900">
          {errors.root.message}
        </p>
      )}

      <button disabled={isSubmitting} className={boton}>
        {isSubmitting ? "Entrando…" : "Entrar"}
      </button>
      {isSubmitting && (
        <p className="text-center text-sm text-texto-suave">Si la API estaba dormida, puede tardar hasta un minuto.</p>
      )}
    </form>
  );
}
