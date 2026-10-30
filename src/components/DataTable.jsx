// Tabla genérica, calcada del profe: cada columna es { key, label, align, render }.
// render(fila) permite mostrar cualquier cosa en la celda (badges, links, botones)
export default function DataTable({ columns, rows, empty }) {
  const align = (c) => (c.align === "right" ? "text-right" : "text-left");

  return (
    <div className="overflow-x-auto rounded-2xl border-2 border-borde bg-superficie">
      <table className="w-full">
        <thead className="border-b-2 border-borde text-texto-suave">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className={`px-4 py-3 font-medium ${align(c)}`}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-borde">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-texto-suave">
                {empty}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="hover:bg-fondo">
                {columns.map((c) => (
                  <td key={c.key} className={`px-4 py-3 tabular-nums ${align(c)}`}>
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
