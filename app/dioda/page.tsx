/**
 * app/dioda/page.tsx
 * Halaman /dioda — menampilkan model Dioda via Sketchfab embed.
 */

import type { Metadata } from "next";
import { getComponentData } from "@/data/annotations";
import ComponentPage from "@/components/ComponentPage";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Dioda | KonsepElektronika",
  description:
    "Eksplorasi model 3D Dioda secara interaktif. Pelajari bagian Anode, Cathode, dan Body Dioda melalui anotasi.",
};

export default function DiodaPage() {
  const component = getComponentData("dioda");
  if (!component) notFound();
  return <ComponentPage component={component} />;
}
