const numerales = ["I", "II", "III"];

// Cada campeón recibe su arcano: una carta de tarot con el numeral de su puesto en el ranking
export default function CartaCampeon({ jugador, puesto }) {
  const datos = [
    { etiqueta: jugador.titulos === 1 ? "Título" : "Títulos", valor: jugador.titulos },
    { etiqueta: jugador.podios === 1 ? "Podio" : "Podios", valor: jugador.podios },
    { etiqueta: "Puntos", valor: jugador.puntos },
  ];

  return (
    <article className="flex w-full flex-col items-center gap-6 rounded-2xl border-4 border-double border-arena bg-bordo px-5 py-8 text-center text-crema">
      <p className="font-serif text-5xl text-arena">
        <span className="sr-only">Puesto </span>
        {numerales[puesto - 1]}
      </p>
      <h3 className="font-serif text-2xl leading-snug">{jugador.alias || jugador.username}</h3>
      <dl className="mt-auto grid w-full grid-cols-3 gap-2">
        {datos.map((d) => (
          // flex-col-reverse: el número se ve arriba, aunque la etiqueta va primero en el HTML
          <div key={d.etiqueta} className="flex flex-col-reverse">
            <dt className="text-sm text-rosado">{d.etiqueta}</dt>
            <dd className="font-ancha text-2xl font-black">{d.valor}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
