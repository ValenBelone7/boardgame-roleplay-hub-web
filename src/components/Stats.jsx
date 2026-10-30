// Números del resumen del panel, calcado del profe: items = [{ label, value }]
export default function Stats({ items }) {
  return (
    <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((i) => (
        <div key={i.label} className="rounded-2xl border-2 border-borde bg-superficie px-5 py-4">
          <dt className="text-texto-suave">{i.label}</dt>
          <dd className="mt-1 font-ancha text-4xl font-black tabular-nums">{i.value}</dd>
        </div>
      ))}
    </dl>
  );
}
