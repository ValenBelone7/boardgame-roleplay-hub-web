"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/panel", label: "Resumen" },
  { href: "/panel/productos", label: "Productos" },
  { href: "/panel/productos/nuevo", label: "Nuevo producto" },
];

const enlace = "block rounded-lg px-3 py-2.5 font-medium focus-visible:outline-3 focus-visible:outline-caramelo";

// Client por usePathname (marca la sección actual), como el Sidebar del profe
export default function SidebarPanel({ adminUrl }) {
  const pathname = usePathname();

  return (
    <aside className="rounded-2xl bg-bordo p-4 text-crema md:self-start">
      <p className="mb-3 px-3 font-ancha text-xl font-black">Panel</p>
      <nav aria-label="Panel" className="flex flex-wrap gap-1 md:flex-col">
        {items.map(({ href, label }) => {
          const activo = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={activo ? "page" : undefined}
              className={`${enlace} ${activo ? "bg-arena text-tinta" : "hover:bg-bordo-oscuro"}`}
            >
              {label}
            </Link>
          );
        })}
        <a href={adminUrl} target="_blank" rel="noreferrer" className={`${enlace} hover:bg-bordo-oscuro`}>
          Admin de Django ↗
        </a>
      </nav>
    </aside>
  );
}
