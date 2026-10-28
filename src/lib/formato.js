// Formatos para mostrar los datos de la API (precios, fechas de eventos, jugadores)

const precio = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

// Hora de Argentina siempre, corra donde corra el servidor (Vercel está en UTC)
const fecha = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "America/Argentina/Buenos_Aires",
});

// La API manda los precios como texto ("15000.00")
export function formatearPrecio(valor) {
  return precio.format(Number(valor));
}

export function formatearFecha(iso) {
  return fecha.format(new Date(iso));
}

export function formatearJugadores(min, max) {
  if (min === max) return min === 1 ? "1 jugador" : `${min} jugadores`;
  return `${min}–${max} jugadores`;
}
