import { z } from "zod";

// El título tiene el largo del modelo Leyenda; el mínimo del relato es para que cuente algo
export const leyendaSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(150, "El título debe tener como máximo 150 caracteres"),
  relato: z.string().trim().min(20, "Contá un poco más: al menos 20 caracteres"),
});
