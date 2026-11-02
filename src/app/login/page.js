import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Iniciar sesión",
};

export default async function LoginPage({ searchParams }) {
  // lib/api.js manda acá con ?vencida=1 cuando la API rechaza un token vencido
  const { vencida } = await searchParams;

  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid max-w-md gap-6 rounded-2xl border-2 border-borde bg-superficie p-8">
        <div>
          <h1 className="font-serif text-4xl">Iniciar sesión</h1>
          <p className="mt-2 text-texto-suave">Entrá para anotarte en eventos y dejar reseñas.</p>
        </div>

        {vencida && (
          <p role="status" className="rounded-lg bg-arena px-4 py-3 text-tinta">
            Tu sesión venció. Volvé a iniciar sesión.
          </p>
        )}

        <LoginForm />

        <p className="text-center">
          ¿No tenés cuenta?{" "}
          <Link href="/registro" className="font-bold text-bordo underline underline-offset-4 dark:text-arena">
            Registrate
          </Link>
        </p>
        <p className="text-center text-sm text-texto-suave">
          Para probar: <strong>lucia</strong> o <strong>arcana_admin</strong> (staff), contraseña{" "}
          <strong>arcana2026</strong>.
        </p>
      </div>
    </section>
  );
}
