// Los filtros del catálogo viven en la URL (?search=catan&tipo=JUEGO_ROL&page=2): así se pueden
// compartir y el botón Atrás del navegador funciona. Estas funciones arman esos textos.

// Arma "clave=valor&..." descartando lo vacío, para no mandar ?search=&tipo= a la API
export function armarQuery(params) {
  const query = new URLSearchParams();
  for (const [clave, valor] of Object.entries(params)) {
    if (valor !== undefined && valor !== null && valor !== "") query.set(clave, valor);
  }
  return query.toString();
}

// Cambia un filtro y vuelve a la página 1 (la página 3 de otra búsqueda puede no existir)
export function cambiarParametro(params, clave, valor) {
  const query = new URLSearchParams(params);
  if (valor === undefined || valor === null || valor === "") query.delete(clave);
  else query.set(clave, valor);
  query.delete("page");
  return query.toString();
}

// Misma búsqueda, otra página. Para los links de la paginación
export function conPagina(params, pagina) {
  const query = new URLSearchParams(params);
  if (pagina === 1) query.delete("page");
  else query.set("page", pagina);
  return query.toString();
}
