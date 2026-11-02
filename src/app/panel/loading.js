import Cargando from "@/components/Cargando";

// Va dentro del layout del panel: el sidebar queda visible mientras carga
export default function PanelLoading() {
  return <Cargando texto="Cargando el panel" />;
}
