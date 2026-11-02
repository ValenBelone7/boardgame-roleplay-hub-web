import { registroSchema } from "@/app/validations/RegistroSchema";

// Datos válidos: cada test cambia solo lo que quiere probar
const valido = {
  username: "nuevo_jugador",
  email: "nuevo@arcana.com",
  alias: "Dado Loco",
  fecha_nacimiento: "2000-05-10",
  password: "arcana2026",
  confirmar: "arcana2026",
};

describe("registroSchema", () => {
  it("debe aceptar datos válidos", () => {
    expect(registroSchema.safeParse(valido).success).toBe(true);
  });

  it("debe aceptar alias y fecha vacíos porque son opcionales", () => {
    const result = registroSchema.safeParse({ ...valido, alias: "", fecha_nacimiento: "" });

    expect(result.success).toBe(true);
  });

  it("debe fallar si el email no es válido", () => {
    const result = registroSchema.safeParse({ ...valido, email: "nuevo-arcana.com" });

    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toBe("Ingresá un email válido");
  });

  it("debe fallar si la contraseña tiene menos de 8 caracteres", () => {
    const result = registroSchema.safeParse({ ...valido, password: "corta", confirmar: "corta" });

    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toBe("La contraseña debe tener al menos 8 caracteres");
  });

  it("debe fallar en confirmar si las contraseñas no coinciden", () => {
    const result = registroSchema.safeParse({ ...valido, confirmar: "otraclave1" });

    expect(result.success).toBe(false);
    expect(result.error.issues[0].path).toEqual(["confirmar"]);
    expect(result.error.issues[0].message).toBe("Las contraseñas no coinciden");
  });

  it("debe fallar si el usuario tiene espacios", () => {
    const result = registroSchema.safeParse({ ...valido, username: "nuevo jugador" });

    expect(result.success).toBe(false);
    expect(result.error.issues[0].path).toEqual(["username"]);
  });

  it("debe fallar si la fecha de nacimiento es futura", () => {
    const result = registroSchema.safeParse({ ...valido, fecha_nacimiento: "2999-01-01" });

    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toBe("La fecha tiene que ser pasada");
  });
});
