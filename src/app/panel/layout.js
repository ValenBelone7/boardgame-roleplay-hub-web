import SidebarPanel from "@/components/SidebarPanel";
import { API_URL } from "@/lib/api";

// Layout anidado: todas las páginas de /panel llevan el sidebar.
// Acá no se controla el permiso: el layout no se vuelve a ejecutar al navegar entre las
// páginas del panel (doc de Next, "Layouts and auth checks"), así que cada página llama a requireStaff()
export default function PanelLayout({ children }) {
  return (
    <div className="px-6 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[220px_1fr]">
        <SidebarPanel adminUrl={`${API_URL}/admin/`} />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
