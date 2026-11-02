import Link from "next/link";
import RegistroForm from "@/components/RegistroForm";

export const metadata = {
  title: "Crear cuenta",
};

export default function RegistroPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid max-w-md gap-6 rounded-2xl border-2 border-borde bg-superficie p-8">
        <div>
          <h1 className="font-serif text-4xl">Crear cuenta</h1>
          <p className="mt-2 text-texto-suave">
            Tu alias es el nombre que aparece en la tabla de ganadores y en las leyendas.
          </p>
        </div>

        <RegistroForm />

        <p className="text-center">
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="font-bold text-bordo underline underline-offset-4 dark:text-arena">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </section>
  );
}
