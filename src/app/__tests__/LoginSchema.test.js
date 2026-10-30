import { loginSchema } from "@/app/validations/LoginSchema";

describe("loginSchema", () => {
  it("debe fallar si el usuario está vacío", () => {
    const result = loginSchema.safeParse({ username: "", password: "arcana2026" });

    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toBe("Ingresá tu usuario");
  });

  it("debe fallar si el usuario son solo espacios", () => {
    const result = loginSchema.safeParse({ username: "   ", password: "arcana2026" });

    expect(result.success).toBe(false);
  });

  it("debe fallar si la contraseña está vacía", () => {
    const result = loginSchema.safeParse({ username: "lucia", password: "" });

    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toBe("Ingresá tu contraseña");
  });

  it("debe aceptar usuario y contraseña", () => {
    const result = loginSchema.safeParse({ username: "lucia", password: "arcana2026" });

    expect(result.success).toBe(true);
  });
});
