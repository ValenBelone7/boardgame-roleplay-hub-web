"use client";

import { createContext, useContext } from "react";

const SesionContext = createContext();

// El layout raíz (Server) pide el usuario a la API y lo pasa acá. El token nunca llega al
// navegador: los componentes Client solo ven estos datos
export function SesionProvider({ usuario, children }) {
  const valor = {
    usuario,
    logueado: usuario !== null,
    esStaff: usuario?.is_staff === true,
  };

  return <SesionContext.Provider value={valor}>{children}</SesionContext.Provider>;
}

export const useSesion = () => useContext(SesionContext);
