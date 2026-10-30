"use client";

import ErrorCarga from "@/components/ErrorCarga";

export default function PanelError({ error, retry }) {
  return <ErrorCarga error={error} retry={retry} />;
}
