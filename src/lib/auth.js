import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// El token JWT vive en la cookie httpOnly "access": solo la lee el servidor de Next
export async function getToken() {
  return (await cookies()).get("access")?.value;
}

export async function requireToken() {
  const token = await getToken();
  if (!token) redirect("/login");
  return token;
}

// El usuario logueado (con is_staff) o null si no hay sesión, venció o la API no responde.
// No redirige: lo usa el layout en todas las páginas, también en las públicas
export async function getUsuario() {
  const token = await getToken();
  if (!token) return null;

  const res = await fetch(`${process.env.API_URL}/api/usuarios/me/`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  }).catch(() => null);

  if (!res || !res.ok) return null;
  return res.json();
}

// Para /panel: sin sesión va al login; logueado pero sin ser staff, al inicio
export async function requireStaff() {
  await requireToken();
  const usuario = await getUsuario();
  if (!usuario?.is_staff) redirect("/");
  return usuario;
}
