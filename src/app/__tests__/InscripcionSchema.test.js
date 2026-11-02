import { inscripcionSchema } from "@/app/validations/InscripcionSchema";

describe("inscripcionSchema", () => {
  it("debe aceptar una inscripción sin personaje", () => {
    expect(inscripcionSchema.safeParse({ personaje: "" }).success).toBe(true);
  });

  it("debe aceptar un personaje y quitarle los espacios", () => {
    const result = inscripcionSchema.safeParse({ personaje: "  Lyra, maga elfa  " });
    expect(result.success).toBe(true);
    expect(result.data.personaje).toBe("Lyra, maga elfa");
  });

  it("debe rechazar un personaje de más de 100 caracteres", () => {
    const result = inscripcionSchema.safeParse({ personaje: "a".repeat(101) });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toBe("El personaje debe tener como máximo 100 caracteres");
  });
});
