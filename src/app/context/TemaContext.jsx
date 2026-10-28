"use client";

import { createContext, useContext, useState } from "react";

const TemaContext = createContext();

// El script del <head> ya puso (o no) la clase dark antes de pintar: el estado arranca igual
function temaInicial() {
  if (typeof document === "undefined") return "claro";
  return document.documentElement.classList.contains("dark") ? "oscuro" : "claro";
}

export function TemaProvider({ children }) {
  const [tema, setTema] = useState(temaInicial);

  function alternarTema() {
    const nuevo = tema === "oscuro" ? "claro" : "oscuro";
    setTema(nuevo);
    document.documentElement.classList.toggle("dark", nuevo === "oscuro");
    localStorage.setItem("tema", nuevo);
  }

  return <TemaContext.Provider value={{ tema, alternarTema }}>{children}</TemaContext.Provider>;
}

export const useTema = () => useContext(TemaContext);
