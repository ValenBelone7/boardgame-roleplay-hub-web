import { z } from "zod";

// Como el modelo Resena: puntaje de 1 a 5 y comentario opcional
export const resenaSchema = z.object({
  // Los radio buttons devuelven texto ("4"): coerce lo pasa a número antes de validar
  puntaje: z.coerce
    .number({ error: "Elegí un puntaje" })
    .int()
    .min(1, "Elegí un puntaje de 1 a 5")
    .max(5, "Elegí un puntaje de 1 a 5"),
  comentario: z.string().trim().max(1000, "El comentario debe tener como máximo 1000 caracteres"),
});
