"use server";

import { revalidatePath } from "next/cache";
import { ENDPOINTS, errorDeRespuesta, llamar } from "@/lib/api";

// El usuario lo pone el back con el token. Las reglas de cupo y estado también las valida el back
export async function inscribirse(eventoId, datos) {
  const res = await llamar(`${ENDPOINTS.eventos}${eventoId}/inscribirse/`, {
    method: "POST",
    body: JSON.stringify({ personaje: datos.personaje }),
  });
  if (!res?.ok) return errorDeRespuesta(res);

  revalidatePath(`/eventos/${eventoId}`);
  return {};
}

// El autor lo pone el back con el token. Si el evento todavía no se jugó, responde 400 en "evento"
export async function crearLeyenda(eventoId, datos) {
  const res = await llamar(ENDPOINTS.leyendas, {
    method: "POST",
    body: JSON.stringify({ evento: eventoId, titulo: datos.titulo, relato: datos.relato }),
  });
  if (!res?.ok) return errorDeRespuesta(res);

  revalidatePath(`/eventos/${eventoId}`);
  return {};
}

export async function darseDeBaja(inscripcionId, eventoId) {
  const res = await llamar(`${ENDPOINTS.inscripciones}${inscripcionId}/`, { method: "DELETE" });
  if (!res?.ok) return errorDeRespuesta(res);

  revalidatePath(`/eventos/${eventoId}`);
  return {};
}
