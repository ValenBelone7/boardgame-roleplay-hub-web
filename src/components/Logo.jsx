import Link from "next/link";

// Isotipo: dos cartas inclinadas que forman la A, con un dado en el medio
export function Isotipo({ tamano = 44 }) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 120 120" aria-hidden="true">
      <g stroke="var(--tinta)" strokeWidth="6" strokeLinejoin="round">
        <rect x="20" y="14" width="24" height="96" rx="5" transform="rotate(17 32 110)" fill="var(--arena)" />
        <rect x="76" y="14" width="24" height="96" rx="5" transform="rotate(-17 88 110)" fill="var(--caramelo)" />
        <rect x="50" y="76" width="20" height="20" rx="4" fill="var(--crema)" />
      </g>
      <circle cx="60" cy="86" r="3.5" fill="var(--tinta)" />
    </svg>
  );
}

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 rounded-lg text-crema focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-arena"
    >
      <Isotipo />
      <span className="font-ancha text-2xl font-black">Arcana</span>
    </Link>
  );
}
