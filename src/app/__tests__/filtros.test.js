import { armarQuery, cambiarParametro, conPagina } from "@/lib/filtros";

describe("armarQuery", () => {
  it("debe descartar los valores vacíos", () => {
    expect(armarQuery({ search: "catan", tipo: "", categoria: undefined, page: null })).toBe("search=catan");
  });

  it("debe devolver texto vacío si no hay filtros", () => {
    expect(armarQuery({})).toBe("");
  });
});

describe("cambiarParametro", () => {
  it("debe cambiar el filtro y volver a la página 1", () => {
    expect(cambiarParametro("search=catan&page=3", "tipo", "EXPANSION")).toBe("search=catan&tipo=EXPANSION");
  });

  it("debe sacar el filtro si el valor queda vacío", () => {
    expect(cambiarParametro("search=catan&tipo=EXPANSION", "tipo", "")).toBe("search=catan");
  });
});

describe("conPagina", () => {
  it("debe conservar los filtros al cambiar de página", () => {
    expect(conPagina("search=catan", 2)).toBe("search=catan&page=2");
  });

  it("debe sacar page para la página 1", () => {
    expect(conPagina("search=catan&page=2", 1)).toBe("search=catan");
  });
});
