"use client";

import { useState } from "react";

const LETRAS = ["A", "R", "C", "A", "N", "A"];
const COLORES = ["bg-arena", "bg-caramelo", "bg-crema"];

// La primera posición es fija: si fuera al azar, el servidor y el navegador
// dibujarían fichas distintas y React avisaría el desajuste
const POSICION_INICIAL = [
  { giro: -6, alto: 4 },
  { giro: 5, alto: -6 },
  { giro: -3, alto: 8 },
  { giro: 8, alto: -2 },
  { giro: -7, alto: 6 },
  { giro: 4, alto: -8 },
];

function numeroAlAzar(maximo) {
  return Math.round((Math.random() * 2 - 1) * maximo);
}

export default function TitularDados() {
  const [fichas, setFichas] = useState(POSICION_INICIAL);
  const [tiradas, setTiradas] = useState(0);

  function tirarLosDados() {
    setFichas(LETRAS.map(() => ({ giro: numeroAlAzar(9), alto: numeroAlAzar(10) })));
    setTiradas(tiradas + 1);
  }

  return (
    <div>
      <div role="img" aria-label="Arcana" className="my-8 flex flex-wrap gap-1.5 sm:gap-3">
        {LETRAS.map((letra, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`flex size-12 items-center justify-center rounded-lg font-ancha text-3xl font-black text-tinta shadow-ficha transition-transform duration-500 sm:size-20 sm:text-6xl lg:size-28 lg:text-7xl ${
              COLORES[(i + tiradas) % COLORES.length]
            }`}
            style={{ transform: `rotate(${fichas[i].giro}deg) translateY(${fichas[i].alto}px)` }}
          >
            {letra}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={tirarLosDados}
        className="flex items-center gap-2 py-2 font-semibold text-arena hover:text-crema focus-visible:outline-3 focus-visible:outline-arena"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" />
          <circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" />
        </svg>
        Tirar los dados
      </button>
    </div>
  );
}
