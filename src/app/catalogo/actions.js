"use server";

import { revalidatePath } from "next/cache";
import { ENDPOINTS, errorDeRespuesta, llamar } from "@/lib/api";

// El autor lo pone el back con el usuario del token: no viaja en el body
export async function crearResena(productoId, datos) {
  const res = await llamar(ENDPOINTS.resenas, {
    method: "POST",
    body: JSON.stringify({ producto: productoId, puntaje: datos.puntaje, comentario: datos.comentario }),
  });
  if (!res?.ok) return errorDeRespuesta(res);

  revalidatePath(`/catalogo/${productoId}`);
  return {};
}
