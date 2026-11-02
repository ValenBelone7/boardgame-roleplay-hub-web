import { ENDPOINTS, list } from "@/lib/api";

// Las opciones de los selects y checkboxes de ProductoForm (alta y edición las usan igual)
export async function datosFormulario() {
  const [categorias, editoriales, mecanicas, disenadores, juegosMesa, juegosRol] = await Promise.all([
    list(ENDPOINTS.categorias),
    list(ENDPOINTS.editoriales),
    list(ENDPOINTS.mecanicas),
    list(ENDPOINTS.disenadores),
    list(ENDPOINTS.productos, "tipo=JUEGO_MESA"),
    list(ENDPOINTS.productos, "tipo=JUEGO_ROL"),
  ]);
  // Una expansión solo puede ser de un juego de mesa o de rol (no de otra expansión)
  const juegosBase = [...juegosMesa, ...juegosRol].map((j) => ({ id: j.id, nombre: j.nombre }));
  return { categorias, editoriales, mecanicas, disenadores, juegosBase };
}
