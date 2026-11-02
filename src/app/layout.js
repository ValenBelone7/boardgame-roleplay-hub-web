import { Archivo, Young_Serif } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TemaProvider } from "@/app/context/TemaContext";
import { SesionProvider } from "@/app/context/SesionContext";
import { getUsuario } from "@/lib/auth";
import "./globals.css";

// Archivo variable con el eje de ancho (wdth) para los títulos anchos
const texto = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--f-texto" });
const serif = Young_Serif({ subsets: ["latin"], weight: "400", variable: "--f-serif" });

export const metadata = {
  title: {
    default: "Arcana — Juegos de mesa y de rol",
    template: "%s · Arcana",
  },
  description:
    "Tienda de juegos de mesa y de rol con torneos, campañas y noches de juego en el local.",
};

export default async function RootLayout({ children }) {
  // Sin sesión no se llama a la API. Al cliente solo le pasamos lo que necesita (sin email)
  const datos = await getUsuario();
  const usuario = datos
    ? { id: datos.id, username: datos.username, alias: datos.alias, is_staff: datos.is_staff }
    : null;

  return (
    // suppressHydrationWarning: el script del <head> le agrega la clase dark antes de que React cargue
    <html lang="es" className={`${texto.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        {/* Aplica el tema guardado antes de pintar, para que no parpadee (guía de Next) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("tema")==="oscuro")document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <TemaProvider>
          <SesionProvider usuario={usuario}>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </SesionProvider>
        </TemaProvider>
      </body>
    </html>
  );
}
