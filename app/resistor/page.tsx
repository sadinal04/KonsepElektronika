/**
 * app/resistor/page.tsx
 * Halaman /resistor — menampilkan model 3D resistor dengan anotasi.
 */

import type { Metadata } from "next";
import { getComponentData } from "@/data/annotations";
import ComponentPage from "@/components/ComponentPage";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Resistor",
  description:
    "Eksplorasi model 3D Resistor secara interaktif. Pelajari bagian Body, Color Bands, dan Lead Wire melalui hotspot anotasi.",
};

export default function ResistorPage() {
  const component = getComponentData("resistor");
  if (!component) notFound();

  return <ComponentPage component={component} />;
}
