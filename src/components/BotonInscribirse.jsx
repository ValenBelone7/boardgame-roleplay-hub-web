"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inscripcionSchema } from "@/app/validations/InscripcionSchema";
import { darseDeBaja, inscribirse } from "@/app/eventos/actions";
import { useSesion } from "@/app/context/SesionContext";
import Campo from "@/components/Campo";

const boton =
  "justify-self-start rounded-full bg-bordo px-6 py-3 font-bold text-crema hover:bg-bordo-oscuro focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-caramelo disabled:opacity-60 dark:bg-arena dark:text-tinta dark:hover:bg-crema";
const botonBorde =
  "rounded-full border-2 border-borde px-6 py-2.5 font-bold hover:bg-fondo focus-visible:outline-3 focus-visible:outline-caramelo disabled:opacity-60";
const caja = "grid gap-4 rounded-2xl border-2 border-borde bg-superficie p-6";
const alerta = "rounded-lg bg-red-100 px-4 py-3 text-red-900";

function FormInscripcion({ evento }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(inscripcionSchema),
    defaultValues: { personaje: "" },
  });
  // El personaje solo tiene sentido en los eventos de rol
  const esDeRol = evento.tipo === "PARTIDA_ROL" || evento.tipo === "CAMPANA_ROL";

  async function onSubmit(datos) {
    const respuesta = await inscribirse(evento.id, datos);
    if (respuesta.error || respuesta.errores) {
      for (const [campo, mensaje] of Object.entries(respuesta.errores ?? {})) {
        setError(campo, { message: mensaje });
      }
      if (respuesta.error) setError("root", { message: respuesta.error });
      return;
    }
    router.refresh(); // vuelve a pedir el evento con el cupo actualizado
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={caja}>
      {esDeRol && <Campo etiqueta="Personaje (opcional)" error={errors.personaje?.message} {...register("personaje")} />}

      {errors.root && (
        <p role="alert" className={alerta}>
          {errors.root.message}
        </p>
      )}

      <button disabled={isSubmitting} className={boton}>
        {isSubmitting ? "Anotando…" : "Anotarme"}
      </button>
    </form>
  );
}

// Confirmación en dos pasos, como BorrarProducto: un clic sin querer no te hace perder el lugar
function BajaInscripcion({ evento, inscripcion }) {
  const router = useRouter();
  const [confirmando, setConfirmando] = useState(false);
  const [pendiente, setPendiente] = useState(false);
  const [error, setError] = useState("");

  async function confirmar() {
    setPendiente(true);
    setError("");
    const respuesta = await darseDeBaja(inscripcion.id, evento.id);
    setPendiente(false);
    setConfirmando(false);
    if (respuesta.error) {
      setError(respuesta.error);
      return;
    }
    router.refresh();
  }

  return (
    <div className={caja}>
      <p className="font-bold">
        Ya tenés tu lugar{inscripcion.personaje && ` como ${inscripcion.personaje}`}.
      </p>

      {error && (
        <p role="alert" className={alerta}>
          {error}
        </p>
      )}

      {confirmando ? (
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={confirmar} disabled={pendiente} className={boton}>
            {pendiente ? "Dando de baja…" : "Sí, darme de baja"}
          </button>
          <button type="button" onClick={() => setConfirmando(false)} disabled={pendiente} className={botonBorde}>
            Cancelar
          </button>
        </div>
      ) : (
        <div>
          <button type="button" onClick={() => setConfirmando(true)} className={botonBorde}>
            Darme de baja
          </button>
        </div>
      )}
    </div>
  );
}

// inscripcion: la del usuario logueado en este evento, o null. La busca la página (Server)
export default function BotonInscribirse({ evento, inscripcion }) {
  const { logueado } = useSesion();

  // La API solo acepta inscripciones y bajas mientras el evento está programado
  if (evento.estado !== "PROGRAMADO") return null;

  if (!logueado) {
    return (
      <p className="text-texto-suave">
        <Link href="/login" className="font-bold text-bordo underline underline-offset-4 dark:text-arena">
          Iniciá sesión
        </Link>{" "}
        para anotarte.
      </p>
    );
  }

  if (inscripcion) return <BajaInscripcion evento={evento} inscripcion={inscripcion} />;

  if (evento.inscriptos >= evento.cupo) {
    return <p className="font-bold">Ya no quedan lugares para este evento.</p>;
  }

  return <FormInscripcion evento={evento} />;
}
