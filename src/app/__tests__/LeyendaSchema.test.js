import { leyendaSchema } from "@/app/validations/LeyendaSchema";

const relato = "Lucía ganó la partida con el último puerto del mapa.";

describe("leyendaSchema", () => {
  it("debe fallar si el título es muy corto", () => {
    const result = leyendaSchema.safeParse({ titulo: "Ah", relato });

    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toBe("El título debe tener al menos 3 caracteres");
  });

  it("debe fallar si el relato es muy corto", () => {
    const result = leyendaSchema.safeParse({ titulo: "El puerto", relato: "Ganó Lucía." });

    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toBe("Contá un poco más: al menos 20 caracteres");
  });

  it("debe aceptar un título y un relato válidos", () => {
    expect(leyendaSchema.safeParse({ titulo: "El puerto", relato }).success).toBe(true);
  });
});
