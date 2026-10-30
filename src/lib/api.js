import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth";
import { erroresDeDrf } from "@/lib/errores";

// Solo la lee el servidor de Next (sin NEXT_PUBLIC_): el navegador nunca habla con Django
export const API_URL = process.env.API_URL;

export const ENDPOINTS = {
  categorias: "/api/categorias/",
  editoriales: "/api/editoriales/",
  disenadores: "/api/disenadores/",
  mecanicas: "/api/mecanicas/",
  productos: "/api/productos/",
  resenas: "/api/resenas/",
  eventos: "/api/eventos/",
  inscripciones: "/api/inscripciones/",
  resultados: "/api/resultados/",
  leyendas: "/api/leyendas/",
  pedidos: "/api/pedidos/",
  itemsPedido: "/api/items-pedido/",
  me: "/api/usuarios/me/",
  registro: "/api/usuarios/registro/",
  token: "/api/token/",
};

// GET a la API, con el token si hay sesión. Las páginas no envuelven estas funciones en
// try/catch: el error lo muestra el error.js de la sección, y un catch se comería el redirect
async function pedir(path, query = "") {
  const token = await getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await fetch(`${API_URL}${path}${query ? `?${query}` : ""}`, {
    headers,
    cache: "no-store",
  }).catch(() => null);

  if (!res) {
    throw new Error("No se pudo conectar con la API. Si estaba dormida, probá de nuevo en unos segundos.");
  }
  // El token dura 2 h, igual que la cookie: si igual llega vencido, se vuelve a iniciar sesión
  if (res.status === 401 && token) redirect("/login?vencida=1");
  if (!res.ok && res.status !== 404) {
    throw new Error(`La API respondió con un error (${res.status}) en ${path}`);
  }
  return res;
}

// Todos los resultados, recorriendo las páginas de DRF (de a 10). Para selects y filtros
export async function list(path, query = "") {
  const params = new URLSearchParams(query);
  let todos = [];
  let pagina = 1;

  while (true) {
    params.set("page", pagina);
    const res = await pedir(path, params.toString());
    const data = await res.json();
    if (Array.isArray(data)) return data;
    todos = todos.concat(data.results ?? []);
    if (!data.next) return todos;
    pagina += 1;
  }
}

// Una sola página: { count, next, previous, results }. Para listados con paginación.
// Si piden una página que no existe (?page=99), devuelve una página vacía
export async function getPagina(path, query = "") {
  const res = await pedir(path, query);
  if (res.status === 404) return { count: 0, next: null, previous: null, results: [] };
  return res.json();
}

// Un objeto, o null si no existe: la página llama a notFound()
export async function getUno(path) {
  const res = await pedir(path);
  if (res.status === 404) return null;
  return res.json();
}

// Para las Server Actions (escrituras), calcado de llamar() del profe: manda JSON con el token.
// Devuelve la respuesta, o null si la API no responde
export async function llamar(path, opciones = {}) {
  const token = await getToken();
  return fetch(`${API_URL}${path}`, {
    ...opciones,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  }).catch(() => null);
}

// Convierte una respuesta fallida de llamar() en lo que muestran los formularios:
// { error } (mensaje general) y { errores } (por campo, como los manda DRF)
export async function errorDeRespuesta(res) {
  if (!res) return { error: "No se pudo conectar con la API. Si estaba dormida, probá de nuevo en unos segundos." };
  if (res.status === 401) return { error: "Tu sesión venció. Volvé a iniciar sesión." };
  const { campos, general } = erroresDeDrf(await res.json().catch(() => null));
  return { errores: campos, error: general };
}
