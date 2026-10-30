import { requireToken } from "@/lib/auth";
import { ENDPOINTS, getUno } from "@/lib/api";

export const metadata = {
  title: "Mi cuenta",
};

// La API manda la fecha como "1998-04-21"; sin hora, así no se corre un día por la zona horaria
function formatearDia(fecha) {
  const [anio, mes, dia] = fecha.split("-");
  return `${dia}/${mes}/${anio}`;
}

export default async function CuentaPage() {
  await requireToken(); // sin sesión → /login
  // Si el token venció, getUno manda a /login?vencida=1
  const usuario = await getUno(ENDPOINTS.me);

  const datos = [
    { etiqueta: "Usuario", valor: usuario.username },
    { etiqueta: "Alias", valor: usuario.alias || "—" },
    { etiqueta: "Email", valor: usuario.email || "—" },
    { etiqueta: "Nombre", valor: `${usuario.first_name} ${usuario.last_name}`.trim() || "—" },
    { etiqueta: "Fecha de nacimiento", valor: usuario.fecha_nacimiento ? formatearDia(usuario.fecha_nacimiento) : "—" },
  ];

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-4xl">Hola, {usuario.alias || usuario.username}</h1>
        <p className="mt-2 text-texto-suave">Tus datos en Arcana. Tus inscripciones y pedidos van a aparecer acá.</p>

        <dl className="mt-8 grid gap-4 rounded-2xl border-2 border-borde bg-superficie p-8 sm:grid-cols-2">
          {datos.map(({ etiqueta, valor }) => (
            <div key={etiqueta}>
              <dt className="text-sm text-texto-suave">{etiqueta}</dt>
              <dd className="text-lg font-medium">{valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
