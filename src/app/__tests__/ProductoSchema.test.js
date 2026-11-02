import { productoSchema } from "@/app/validations/ProductoSchema";

// Un juego de mesa válido, con los valores como los deja el formulario (texto)
const valido = {
  nombre: "Catan",
  descripcion: "",
  tipo: "JUEGO_MESA",
  precio: "89900.00",
  stock: "8",
  jugadores_min: "3",
  jugadores_max: "4",
  duracion_minutos: "90",
  edad_minima: "",
  imagen_url: "",
  categoria: "1",
  editorial: "",
  juego_base: "",
  mecanicas: ["1", "2"],
  disenadores: [],
  activo: true,
};

describe("productoSchema", () => {
  it("debe aceptar un producto válido con los opcionales vacíos", () => {
    expect(productoSchema.safeParse(valido).success).toBe(true);
  });

  it("debe fallar si el precio es negativo", () => {
    const result = productoSchema.safeParse({ ...valido, precio: "-100" });

    expect(result.success).toBe(false);
    expect(result.error.issues[0].path).toEqual(["precio"]);
  });

  it("debe fallar si el precio tiene más de 2 decimales", () => {
    const result = productoSchema.safeParse({ ...valido, precio: "100.505" });

    expect(result.success).toBe(false);
  });

  it("debe fallar si el mínimo de jugadores supera al máximo", () => {
    const result = productoSchema.safeParse({ ...valido, jugadores_min: "5", jugadores_max: "2" });

    expect(result.success).toBe(false);
    expect(result.error.issues[0].path).toEqual(["jugadores_max"]);
    expect(result.error.issues[0].message).toBe("Tiene que ser mayor o igual que el mínimo");
  });

  it("debe fallar si una expansión no tiene juego base", () => {
    const result = productoSchema.safeParse({ ...valido, tipo: "EXPANSION", juego_base: "" });

    expect(result.success).toBe(false);
    expect(result.error.issues[0].path).toEqual(["juego_base"]);
    expect(result.error.issues[0].message).toBe("Una expansión necesita su juego base");
  });

  it("debe aceptar una expansión con su juego base", () => {
    expect(productoSchema.safeParse({ ...valido, tipo: "EXPANSION", juego_base: "1" }).success).toBe(true);
  });

  it("debe fallar si falta la categoría", () => {
    const result = productoSchema.safeParse({ ...valido, categoria: "" });

    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toBe("Elegí una categoría");
  });
});
