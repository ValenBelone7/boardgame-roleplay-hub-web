import { z } from "zod";

// Como el modelo Inscripcion: el personaje es opcional y se usa en las partidas de rol
export const inscripcionSchema = z.object({
  personaje: z.string().trim().max(100, "El personaje debe tener como máximo 100 caracteres"),
});
