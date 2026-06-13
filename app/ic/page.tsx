/**
 * app/ic/page.tsx
 * Halaman /ic — menampilkan model 3D IC (Integrated Circuit) via GLB lokal.
 */

import type { Metadata } from "next";
import { getComponentData } from "@/data/annotations";
import ComponentPage from "@/components/ComponentPage";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "IC (Integrated Circuit) | KonsepElektronika",
  description:
    "Eksplorasi model 3D IC (Integrated Circuit) secara interaktif. Pelajari Pin, Package, dan Notch melalui hotspot anotasi.",
};

export default function ICPage() {
  const component = getComponentData("ic");
  if (!component) notFound();
  return <ComponentPage component={component} />;
}
