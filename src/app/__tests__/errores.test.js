import { erroresDeDrf } from "@/lib/errores";

// Las respuestas son copias de lo que devuelve la API de Arcana
describe("erroresDeDrf", () => {
  it("debe repartir los errores de validación por campo", () => {
    const json = {
      username: ["Ya existe un usuario con ese nombre."],
      password: ["Asegúrese de que este campo tenga al menos 8 caracteres."],
    };

    expect(erroresDeDrf(json)).toEqual({
      campos: {
        username: "Ya existe un usuario con ese nombre.",
        password: "Asegúrese de que este campo tenga al menos 8 caracteres.",
      },
      general: null,
    });
  });

  it("debe usar non_field_errors como error general", () => {
    const json = { non_field_errors: ["Ya dejaste una reseña para este producto."] };

    expect(erroresDeDrf(json)).toEqual({
      campos: {},
      general: "Ya dejaste una reseña para este producto.",
    });
  });

  it("debe tomar el mensaje de error de las reglas del negocio", () => {
    const json = { error: "Las inscripciones de este evento están cerradas." };

    expect(erroresDeDrf(json).general).toBe("Las inscripciones de este evento están cerradas.");
  });

  it("debe tomar solo el detail aunque vengan otras claves", () => {
    const json = { detail: "Given token not valid for any token type", code: "token_not_valid" };

    expect(erroresDeDrf(json)).toEqual({
      campos: {},
      general: "Given token not valid for any token type",
    });
  });

  it("debe dar un mensaje genérico si la respuesta no es JSON", () => {
    expect(erroresDeDrf(null).general).toBe("Ocurrió un error inesperado. Intentá de nuevo.");
  });
});
