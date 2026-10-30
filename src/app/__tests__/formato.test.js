import { formatearPrecio, formatearFecha, formatearFechaCorta, formatearJugadores } from "@/lib/formato";

describe("formatearPrecio", () => {
  it("debe mostrar pesos con punto de miles y sin centavos", () => {
    // Intl separa el $ con un espacio duro ( ) para que no se corte en dos líneas
    expect(formatearPrecio("89900.00")).toBe("$ 89.900");
  });

  it("debe aceptar números además del texto que manda la API", () => {
    expect(formatearPrecio(1500)).toBe("$ 1.500");
  });
});

describe("formatearFecha", () => {
  it("debe mostrar día, fecha y hora de Argentina", () => {
    expect(formatearFecha("2026-11-21T16:00:00-03:00")).toBe("sábado, 21 de noviembre, 16:00");
  });

  it("debe pasar a hora de Argentina una fecha en UTC", () => {
    expect(formatearFecha("2026-11-21T19:00:00Z")).toBe("sábado, 21 de noviembre, 16:00");
  });
});

describe("formatearFechaCorta", () => {
  it("debe mostrar día, mes y año en hora de Argentina", () => {
    // 01:30 UTC del 13 todavía es el 12 en Argentina
    expect(formatearFechaCorta("2026-10-13T01:30:00Z")).toBe("12 de octubre de 2026");
  });
});

describe("formatearJugadores", () => {
  it("debe mostrar el rango cuando min y max son distintos", () => {
    expect(formatearJugadores(2, 4)).toBe("2–4 jugadores");
  });

  it("debe usar singular para un solo jugador", () => {
    expect(formatearJugadores(1, 1)).toBe("1 jugador");
  });

  it("debe mostrar un solo número cuando min y max son iguales", () => {
    expect(formatearJugadores(4, 4)).toBe("4 jugadores");
  });
});
