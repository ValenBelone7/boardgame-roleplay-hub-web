"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_URL, ENDPOINTS } from "@/lib/api";
import { erroresDeDrf } from "@/lib/errores";

const SIN_CONEXION = "No se pudo conectar con la API. Si estaba dormida, probá de nuevo en unos segundos.";

// POST /api/token/ y guarda el access en la cookie. Devuelve null si salió bien o el mensaje de error
async function pedirToken(username, password) {
  const res = await fetch(`${API_URL}${ENDPOINTS.token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    cache: "no-store",
  }).catch(() => null);

  if (!res) return SIN_CONEXION;
  if (res.status === 401) return "Usuario o contraseña incorrectos.";
  if (!res.ok) return "La API respondió con un error. Intentá de nuevo.";

  const { access } = await res.json();
  (await cookies()).set("access", access, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 2, // igual que ACCESS_TOKEN_LIFETIME del back
  });
  return null;
}

// La llama LoginForm con los datos que ya validó Zod
export async function login(datos) {
  const error = await pedirToken(datos.username, datos.password);
  if (error) return { error };
  redirect("/cuenta");
}

export async function logout() {
  (await cookies()).delete("access");
  redirect("/login");
}

// Crea la cuenta y entra con ella. Los errores del back vuelven por campo (usuario repetido...)
export async function registrar(datos) {
  const usuario = {
    username: datos.username,
    email: datos.email,
    password: datos.password,
    alias: datos.alias,
  };
  // La fecha es opcional: vacía no se manda (el back no acepta "")
  if (datos.fecha_nacimiento) usuario.fecha_nacimiento = datos.fecha_nacimiento;

  const res = await fetch(`${API_URL}${ENDPOINTS.registro}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
    cache: "no-store",
  }).catch(() => null);

  if (!res) return { error: SIN_CONEXION };
  if (!res.ok) {
    const { campos, general } = erroresDeDrf(await res.json().catch(() => null));
    return { errores: campos, error: general };
  }

  const error = await pedirToken(usuario.username, usuario.password);
  if (error) return { error };
  redirect("/cuenta");
}
