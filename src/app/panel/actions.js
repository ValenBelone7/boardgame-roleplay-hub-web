"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ENDPOINTS, errorDeRespuesta, llamar } from "@/lib/api";

// Los inputs del formulario devuelven texto: acá se pasa a lo que espera la API
// ("" → null en los opcionales, ids como números)
function paraApi(datos) {
  const numero = (valor) => (valor === "" ? null : Number(valor));
  return {
    nombre: datos.nombre,
    descripcion: datos.descripcion,
    tipo: datos.tipo,
    precio: datos.precio, // DecimalField acepta "84900.50" y así no se pierden decimales
    stock: Number(datos.stock),
    jugadores_min: numero(datos.jugadores_min),
    jugadores_max: numero(datos.jugadores_max),
    duracion_minutos: numero(datos.duracion_minutos),
    edad_minima: numero(datos.edad_minima),
    imagen_url: datos.imagen_url,
    activo: datos.activo,
    categoria: Number(datos.categoria),
    editorial: numero(datos.editorial),
    // Solo las expansiones tienen juego base (el back lo valida igual)
    juego_base: datos.tipo === "EXPANSION" ? numero(datos.juego_base) : null,
    mecanicas: datos.mecanicas.map(Number),
    disenadores: datos.disenadores.map(Number),
  };
}

// Después de cambiar un producto, el listado del panel y el catálogo tienen que mostrarlo
function refrescar() {
  revalidatePath("/panel/productos");
  revalidatePath("/catalogo");
}

// El back controla que sea staff (403 si no): el front solo esconde los botones
export async function crearProducto(datos) {
  const res = await llamar(ENDPOINTS.productos, { method: "POST", body: JSON.stringify(paraApi(datos)) });
  if (!res?.ok) return errorDeRespuesta(res);

  refrescar();
  redirect("/panel/productos");
}

// PATCH: manda todos los campos del formulario, pero no pisa id ni fecha_alta
export async function editarProducto(id, datos) {
  const res = await llamar(`${ENDPOINTS.productos}${id}/`, {
    method: "PATCH",
    body: JSON.stringify(paraApi(datos)),
  });
  if (!res?.ok) return errorDeRespuesta(res);

  refrescar();
  redirect("/panel/productos");
}

export async function borrarProducto(id) {
  const res = await llamar(`${ENDPOINTS.productos}${id}/`, { method: "DELETE" });
  // 400: el producto tiene pedidos (ItemPedido lo protege). Se ofrece darlo de baja
  if (res?.status === 400) return { ...(await errorDeRespuesta(res)), puedeDarDeBaja: true };
  if (!res?.ok && res?.status !== 404) return errorDeRespuesta(res);

  refrescar();
  return {};
}

// Borrado lógico: el producto queda en la base (y en los pedidos) pero sale del catálogo
export async function darDeBajaProducto(id) {
  const res = await llamar(`${ENDPOINTS.productos}${id}/borrado_logico/`, { method: "DELETE" });
  if (!res?.ok) return errorDeRespuesta(res);

  refrescar();
  return {};
}
