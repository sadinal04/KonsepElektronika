/**
 * data/annotations.ts
 * Data terpusat untuk semua komponen elektronika dan anotasi hotspot-nya.
 * Edit posisi hotspot di sini setelah menyesuaikan dengan tampilan model 3D.
 */

import { ComponentData } from "@/types";

export const componentsData: ComponentData[] = [
  // ─────────────────────────────────────────────
  // RESISTOR
  // ─────────────────────────────────────────────
  {
    id: "resistor",
    name: "Resistor",
    nameBahasa: "Resistor",
    description:
      "Komponen pasif yang menghambat aliran arus listrik. Nilai hambatannya dapat dibaca melalui pita warna yang tercetak pada tubuhnya.",
    modelPath: "/models/resistor.glb",
    accentColor: "#f97316",
    gradientFrom: "#7c2d12",
    gradientTo: "#9a3412",
    icon: "⚡",
    annotations: [
      {
        id: "resistor-body",
        title: "Body Resistor",
        description:
          "Bagian utama resistor yang melindungi elemen resistif di dalamnya. Terbuat dari bahan keramik atau karbon yang tahan panas dan mampu menyerap daya.",
        position: [0.063, 0.347, 0.15], // ✓ final
      },
      {
        id: "resistor-bands",
        title: "Color Bands",
        description:
          "Pita warna yang menunjukkan nilai resistansi resistor. Setiap warna mewakili angka tertentu; kombinasinya menentukan nilai hambatan dalam satuan Ohm (Ω).",
        position: [0.034, 0.006, 0.143], // ✓ final
      },
      {
        id: "resistor-lead",
        title: "Lead Wire",
        description:
          "Kaki resistor yang digunakan untuk menghubungkan resistor ke rangkaian elektronik. Terbuat dari kawat logam yang mudah disolder ke PCB.",
        position: [0, -0.671, 0.045], // ✓ final
      },
    ],
  },

  // ─────────────────────────────────────────────
  // KAPASITOR
  // ─────────────────────────────────────────────
  {
    id: "capacitor",
    name: "Capacitor",
    nameBahasa: "Kapasitor",
    description:
      "Komponen pasif yang menyimpan dan melepaskan energi listrik. Kapasitor digunakan untuk memfilter sinyal, menstabilkan tegangan, dan menyimpan energi.",
    modelPath: "/models/capacitor.glb",
    accentColor: "#3b82f6",
    gradientFrom: "#1e3a8a",
    gradientTo: "#1e40af",
    icon: "🔋",
    annotations: [
      {
        id: "capacitor-body",
        title: "Body Capacitor",
        description:
          "Bagian utama yang menyimpan muatan listrik. Terdiri dari dua lempeng konduktor (elektroda) yang dipisahkan oleh material dielektrik.",
        position: [0.412, 0.152, 0.125], // ✓ final
      },
      {
        id: "capacitor-polarity",
        title: "Polarity Marking",
        description:
          "Penanda kutub positif atau negatif pada kapasitor. Pada kapasitor elektrolit, pemasangan terbalik dapat merusak komponen, sehingga penanda ini sangat penting.",
        position: [0.067, 0.312, 0.428], // ✓ final
      },
      {
        id: "capacitor-terminal",
        title: "Terminal Leads",
        description:
          "Kaki kapasitor yang digunakan untuk koneksi ke rangkaian elektronik. Kaki positif biasanya lebih panjang dari kaki negatif untuk memudahkan identifikasi.",
        position: [0.021, -0.853, 0.233], // ✓ final
      },
    ],
  },

  // ─────────────────────────────────────────────
  // INDUKTOR
  // ─────────────────────────────────────────────
  {
    id: "inductor",
    name: "Inductor",
    nameBahasa: "Induktor",
    description:
      "Komponen pasif yang menyimpan energi dalam bentuk medan magnet. Induktor terbuat dari kawat yang dililitkan, digunakan dalam filter dan transformasi energi.",
    modelPath: "/models/inductor.glb",
    accentColor: "#a855f7",
    gradientFrom: "#4c1d95",
    gradientTo: "#5b21b6",
    icon: "🌀",
    annotations: [
      {
        id: "inductor-coil",
        title: "Coil Winding",
        description:
          "Lilitan kawat yang menghasilkan medan magnet saat dialiri arus listrik. Jumlah lilitan (turns) menentukan nilai induktansi dalam satuan Henry (H).",
        position: [0.707, -0.063, -0.133], // ✓ final
      },
      {
        id: "inductor-core",
        title: "Core",
        description:
          "Inti induktor yang memperkuat medan magnet yang dihasilkan lilitan. Material inti (udara, besi, ferit) sangat memengaruhi karakteristik induktor.",
        position: [0.699, -0.216, 0.232], // ✓ final
      },
      {
        id: "inductor-terminal",
        title: "Terminal Leads",
        description:
          "Kaki induktor yang digunakan untuk koneksi ke rangkaian elektronik. Menghubungkan induktor ke jalur PCB untuk menyalurkan arus listrik.",
        position: [0.863, -0.449, 0.241], // ✓ final
      },
    ],
  },
];

/** Helper: cari data komponen berdasarkan ID */
export function getComponentData(id: string): ComponentData | undefined {
  return componentsData.find((c) => c.id === id);
}
