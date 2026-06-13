/**
 * app/transistor/page.tsx
 * Halaman /transistor — menampilkan model Transistor via Sketchfab embed.
 */

import type { Metadata } from "next";
import { getComponentData } from "@/data/annotations";
import ComponentPage from "@/components/ComponentPage";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Transistor | KonsepElektronika",
  description:
    "Eksplorasi model 3D Transistor TO-220 secara interaktif. Pelajari bagian Base, Collector, dan Emitter melalui anotasi.",
};

export default function TransistorPage() {
  const component = getComponentData("transistor");
  if (!component) notFound();
  return <ComponentPage component={component} />;
}
