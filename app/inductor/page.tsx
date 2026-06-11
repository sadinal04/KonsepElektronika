/**
 * app/inductor/page.tsx
 * Halaman /inductor — menampilkan model 3D induktor dengan anotasi.
 */

import type { Metadata } from "next";
import { getComponentData } from "@/data/annotations";
import ComponentPage from "@/components/ComponentPage";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Induktor",
  description:
    "Eksplorasi model 3D Induktor secara interaktif. Pelajari bagian Coil Winding, Core, dan Terminal Leads melalui hotspot anotasi.",
};

export default function InductorPage() {
  const component = getComponentData("inductor");
  if (!component) notFound();

  return <ComponentPage component={component} />;
}
