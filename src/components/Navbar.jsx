"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import ToggleTema from "@/components/ToggleTema";
import { useSesion } from "@/app/context/SesionContext";
import { logout } from "@/app/actions";

const botonArena =
  "rounded-full bg-arena px-5 py-3 font-bold text-tinta hover:bg-crema focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-arena";
const enlaceSesion =
  "block px-3 py-3 font-medium underline-offset-8 hover:underline focus-visible:outline-3 focus-visible:outline-arena";

const items = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/eventos", label: "Eventos" },
  { href: "/salon-de-la-fama", label: "Salón de la fama" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { usuario, logueado, esStaff } = useSesion();

  return (
    <header className="bg-bordo text-crema">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-2 px-6 py-4"
      >
        <Logo />

        <ul className="flex grow flex-wrap gap-1">
          {items.map(({ href, label }) => {
            const activo = pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={activo ? "page" : undefined}
                  className={`block px-3 py-3 font-medium underline-offset-8 hover:underline focus-visible:outline-3 focus-visible:outline-arena ${
                    activo ? "underline decoration-arena decoration-2" : ""
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <ToggleTema />

        {logueado ? (
          <div className="flex flex-wrap items-center gap-1">
            {esStaff && (
              <Link href="/panel" className={enlaceSesion}>
                Panel
              </Link>
            )}
            <Link href="/cuenta" className={enlaceSesion}>
              {usuario.alias || usuario.username}
            </Link>
            {/* Logout es una Server Action: el form la llama sin JavaScript extra, como el profe */}
            <form action={logout}>
              <button className={botonArena}>Salir</button>
            </form>
          </div>
        ) : (
          <Link href="/login" className={botonArena}>
            Ingresar
          </Link>
        )}
      </nav>
    </header>
  );
}
