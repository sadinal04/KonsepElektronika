/**
 * app/capacitor/page.tsx
 * Halaman /capacitor — menampilkan model 3D kapasitor dengan anotasi.
 */

import type { Metadata } from "next";
import { getComponentData } from "@/data/annotations";
import ComponentPage from "@/components/ComponentPage";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Kapasitor",
  description:
    "Eksplorasi model 3D Kapasitor secara interaktif. Pelajari bagian Body, Polarity Marking, dan Terminal Leads melalui hotspot anotasi.",
};

export default function CapacitorPage() {
  const component = getComponentData("capacitor");
  if (!component) notFound();

  return <ComponentPage component={component} />;
}
