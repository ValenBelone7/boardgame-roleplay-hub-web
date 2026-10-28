"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";

const items = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/eventos", label: "Eventos" },
  { href: "/salon-de-la-fama", label: "Salón de la fama" },
];

export default function Navbar() {
  const pathname = usePathname();

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

        <Link
          href="/login"
          className="rounded-full bg-arena px-5 py-3 font-bold text-tinta hover:bg-crema focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-arena"
        >
          Ingresar
        </Link>
      </nav>
    </header>
  );
}
