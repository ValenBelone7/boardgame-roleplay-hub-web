import { z } from "zod";

// Las mismas reglas que el back (UsuarioRegistroSerializer y el modelo Usuario), para avisar
// antes de mandar. El back igual valida: lo que solo sabe él (usuario repetido) llega por campo
export const registroSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "El usuario debe tener al menos 3 caracteres")
      .max(150, "El usuario debe tener como máximo 150 caracteres")
      .regex(/^[\w.@+-]+$/, "Solo letras, números y @ . + - _ (sin espacios)"),
    email: z.string().trim().min(1, "Ingresá tu email").email("Ingresá un email válido"),
    alias: z.string().trim().max(50, "El alias debe tener como máximo 50 caracteres"),
    fecha_nacimiento: z
      .string()
      .refine((fecha) => !fecha || new Date(fecha) < new Date(), "La fecha tiene que ser pasada"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmar: z.string().min(1, "Repetí la contraseña"),
  })
  .refine((datos) => datos.password === datos.confirmar, {
    message: "Las contraseñas no coinciden",
    path: ["confirmar"],
  });
