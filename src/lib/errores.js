// Ordena las respuestas de error de la API para mostrarlas en los formularios.
// DRF las manda de cuatro formas:
//   { "detail": "…" }                       401, 403, 404 y token inválido
//   { "error": "…" }                        reglas del negocio (sin cupo, sin stock…)
//   { "non_field_errors": ["…"] }           validaciones de todo el objeto (reseña repetida)
//   { "username": ["…"], "email": ["…"] }   validaciones de cada campo
// Devuelve { campos: { username: "…" }, general: "…" } con el primer mensaje de cada uno
export function erroresDeDrf(json) {
  if (!json || typeof json !== "object") {
    return { campos: {}, general: "Ocurrió un error inesperado. Intentá de nuevo." };
  }
  if (json.detail) return { campos: {}, general: json.detail };
  if (json.error) return { campos: {}, general: json.error };

  const campos = {};
  let general = null;
  for (const [clave, valor] of Object.entries(json)) {
    const mensaje = Array.isArray(valor) ? valor[0] : String(valor);
    if (clave === "non_field_errors") general = mensaje;
    else campos[clave] = mensaje;
  }
  return { campos, general };
}
