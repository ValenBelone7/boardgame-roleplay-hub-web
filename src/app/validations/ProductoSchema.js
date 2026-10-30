import { z } from "zod";

// Los inputs del formulario devuelven texto: se valida como texto y la acción lo pasa a número.
// "" en un campo opcional significa "sin dato" (null en la API)
const entero = /^\d+$/;
const enteroOpcional = z
  .string()
  .trim()
  .refine((v) => v === "" || (entero.test(v) && Number(v) > 0), "Tiene que ser un número entero mayor a 0");

// Mismas reglas que el modelo Producto y ProductoSerializer.validate() del back
export const productoSchema = z
  .object({
    nombre: z
      .string()
      .trim()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(150, "El nombre debe tener como máximo 150 caracteres"),
    descripcion: z.string().trim(),
    tipo: z.enum(["JUEGO_MESA", "JUEGO_ROL", "EXPANSION", "ACCESORIO"], { error: "Elegí un tipo" }),
    // DecimalField(max_digits=10, decimal_places=2): hasta 8 enteros y 2 decimales
    precio: z
      .string()
      .trim()
      .regex(/^\d{1,8}(\.\d{1,2})?$/, "Ingresá un precio válido (hasta 8 cifras y 2 decimales)"),
    stock: z.string().trim().regex(entero, "El stock tiene que ser un número entero (0 o más)"),
    jugadores_min: enteroOpcional,
    jugadores_max: enteroOpcional,
    duracion_minutos: enteroOpcional,
    edad_minima: enteroOpcional,
    imagen_url: z
      .string()
      .trim()
      .refine((v) => v === "" || /^https?:\/\/\S+$/.test(v), "Tiene que ser una URL que empiece con http:// o https://"),
    categoria: z.string().min(1, "Elegí una categoría"),
    editorial: z.string(),
    juego_base: z.string(),
    mecanicas: z.array(z.string()),
    disenadores: z.array(z.string()),
    activo: z.boolean(),
  })
  // Reglas que comparan dos campos: superRefine marca el error en el campo que corresponde
  .superRefine((datos, ctx) => {
    const { jugadores_min, jugadores_max } = datos;
    if (jugadores_min && jugadores_max && Number(jugadores_min) > Number(jugadores_max)) {
      ctx.addIssue({ code: "custom", path: ["jugadores_max"], message: "Tiene que ser mayor o igual que el mínimo" });
    }
    if (datos.tipo === "EXPANSION" && !datos.juego_base) {
      ctx.addIssue({ code: "custom", path: ["juego_base"], message: "Una expansión necesita su juego base" });
    }
  });
