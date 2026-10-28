import { Archivo, Young_Serif } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${texto.variable} ${serif.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
