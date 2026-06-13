/**
 * data/annotations.tsx
 * Data terpusat untuk semua komponen elektronika dan anotasi hotspot-nya.
 */

import { ComponentData } from "@/types";

export const componentsData: ComponentData[] = [
  // ──────────────────────────────────────────────────────────
  // KOMPONEN PASIF
  // ──────────────────────────────────────────────────────────

  // RESISTOR
  {
    id: "resistor",
    name: "Resistor",
    nameBahasa: "Resistor",
    category: "pasif",
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
        position: [0.063, 0.347, 0.15],
      },
      {
        id: "resistor-bands",
        title: "Color Bands",
        description:
          "Pita warna yang menunjukkan nilai resistansi resistor. Setiap warna mewakili angka tertentu; kombinasinya menentukan nilai hambatan dalam satuan Ohm (Ω).",
        position: [0.019, -0.069, 0.145],
      },
      {
        id: "resistor-lead",
        title: "Lead Wire",
        description:
          "Kaki resistor yang digunakan untuk menghubungkan resistor ke rangkaian elektronik. Terbuat dari kawat logam yang mudah disolder ke PCB.",
        position: [0, -0.671, 0.045],
      },
    ],
  },

  // KAPASITOR
  {
    id: "capacitor",
    name: "Capacitor",
    nameBahasa: "Kapasitor",
    category: "pasif",
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
        position: [0.412, 0.152, 0.125],
      },
      {
        id: "capacitor-polarity",
        title: "Polarity Marking",
        description:
          "Penanda kutub positif atau negatif pada kapasitor. Pada kapasitor elektrolit, pemasangan terbalik dapat merusak komponen, sehingga penanda ini sangat penting.",
        position: [0.067, 0.312, 0.428],
      },
      {
        id: "capacitor-terminal",
        title: "Terminal Leads",
        description:
          "Kaki kapasitor yang digunakan untuk koneksi ke rangkaian elektronik. Kaki positif biasanya lebih panjang dari kaki negatif untuk memudahkan identifikasi.",
        position: [0.021, -0.853, 0.233],
      },
    ],
  },

  // INDUKTOR
  {
    id: "inductor",
    name: "Inductor",
    nameBahasa: "Induktor",
    category: "pasif",
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
        position: [0.707, -0.063, -0.133],
      },
      {
        id: "inductor-core",
        title: "Core",
        description:
          "Inti induktor yang memperkuat medan magnet yang dihasilkan lilitan. Material inti (udara, besi, ferit) sangat memengaruhi karakteristik induktor.",
        position: [0.699, -0.216, 0.232],
      },
      {
        id: "inductor-terminal",
        title: "Terminal Leads",
        description:
          "Kaki induktor yang digunakan untuk koneksi ke rangkaian elektronik. Menghubungkan induktor ke jalur PCB untuk menyalurkan arus listrik.",
        position: [0.863, -0.449, 0.241],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // KOMPONEN AKTIF
  // ──────────────────────────────────────────────────────────

  // DIODA
  {
    id: "dioda",
    name: "Diode",
    nameBahasa: "Dioda",
    category: "aktif",
    description:
      "Komponen semikonduktor aktif yang hanya mengalirkan arus listrik satu arah. Digunakan sebagai penyearah arus (rectifier) dan pelindung polaritas.",
    sketchfabUrl: "https://sketchfab.com/models/0fe6dcd28d7445e8b47204cd4abb622d/embed?autostart=1&annotations_visible=1&transparent=1",
    secondarySketchfabUrl: "https://sketchfab.com/models/0c5855559ee5465aa8044a0fdbac39fb/embed?autostart=1&annotations_visible=1&transparent=1",
    secondaryLabel: "LED (Light-Emitting Diode)",
    accentColor: "#22c55e",
    gradientFrom: "#14532d",
    gradientTo: "#15803d",
    icon: "→",
    annotations: [
      {
        id: "dioda-anode",
        title: "Anode (+)",
        description:
          "Terminal positif dioda tempat arus masuk. Arus mengalir dari anode menuju katode dalam kondisi forward bias.",
        position: [0, 0, 0],
      },
      {
        id: "dioda-cathode",
        title: "Cathode (−)",
        description:
          "Terminal negatif dioda, ditandai dengan garis atau band perak/putih. Arus keluar dari katode dalam kondisi forward bias.",
        position: [0, 0, 0],
      },
      {
        id: "dioda-body",
        title: "Body Dioda",
        description:
          "Badan dioda yang berisi junction P-N (pertemuan semikonduktor tipe-P dan tipe-N). Junction inilah yang menentukan arah aliran arus.",
        position: [0, 0, 0],
      },
    ],
  },

  // TRANSISTOR
  {
    id: "transistor",
    name: "Transistor",
    nameBahasa: "Transistor",
    category: "aktif",
    description:
      "Komponen semikonduktor aktif yang berfungsi sebagai penguat sinyal dan sakelar elektronik. Transistor adalah komponen fundamental dalam elektronika modern.",
    modelPath: "/models/lowpoly_transistor.glb",
    accentColor: "#eab308",
    gradientFrom: "#713f12",
    gradientTo: "#854d0e",
    icon: "Tr",
    annotations: [
      {
        id: "transistor-base",
        title: "Base (B)",
        description:
          "Terminal kontrol transistor. Arus kecil pada base mengendalikan arus yang jauh lebih besar antara collector dan emitter.",
        position: [-0.153, 0.091, -0.069],
      },
      {
        id: "transistor-collector",
        title: "Collector (C)",
        description:
          "Terminal pengumpul arus. Arus mengalir dari collector menuju emitter (pada transistor NPN) saat transistor aktif.",
        position: [0.02, 0.041, -0.069],
      },
      {
        id: "transistor-emitter",
        title: "Emitter (E)",
        description:
          "Terminal pemancar arus. Merupakan terminal output utama transistor.",
        position: [0.153, 0.106, -0.069],
      },
      {
        id: "transistor-symbol",
        title: "Simbol Transistor PNP",
        description: (
          <div className="flex flex-col gap-4 mt-2">
            <p className="text-gray-300">
              Pada skematik, simbol transistor membedakan tipe NPN dan PNP melalui arah panah pada kaki Emitter.
            </p>
            <div className="flex gap-6 items-center justify-center p-5 bg-gray-800/80 rounded-xl border border-white/10 shadow-inner">
              
              {/* NPN Symbol */}
              <div className="flex flex-col items-center gap-3">
                <svg width="70" height="70" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                  {/* Lingkaran Luar */}
                  <circle cx="50" cy="50" r="38" />
                  {/* Base Bar & Terminal */}
                  <line x1="12" y1="50" x2="35" y2="50" />
                  <line x1="35" y1="35" x2="35" y2="65" strokeWidth="4.5" />
                  {/* Collector (Atas) */}
                  <line x1="35" y1="42" x2="60" y2="17" />
                  <line x1="60" y1="17" x2="60" y2="2" />
                  {/* Emitter (Bawah) */}
                  <line x1="35" y1="58" x2="60" y2="83" />
                  <line x1="60" y1="83" x2="60" y2="98" />
                  {/* Panah Emitter Keluar (NPN) */}
                  <polygon points="63,80 50,77 58,68" fill="currentColor" stroke="none" />
                  
                  {/* Teks Label */}
                  <text x="3" y="55" fill="currentColor" stroke="none" fontSize="16" fontWeight="bold">B</text>
                  <text x="65" y="15" fill="currentColor" stroke="none" fontSize="16" fontWeight="bold">C</text>
                  <text x="65" y="93" fill="currentColor" stroke="none" fontSize="16" fontWeight="bold">E</text>
                </svg>
                <div className="flex flex-col items-center leading-tight">
                  <span className="text-sm font-bold text-blue-300 tracking-widest">NPN</span>
                  <span className="text-[10px] text-gray-400 font-medium">(Panah Keluar)</span>
                </div>
              </div>
              
              <div className="w-px h-24 bg-white/10" />

              {/* PNP Symbol */}
              <div className="flex flex-col items-center gap-3">
                <svg width="70" height="70" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                  {/* Lingkaran Luar */}
                  <circle cx="50" cy="50" r="38" />
                  {/* Base Bar & Terminal */}
                  <line x1="12" y1="50" x2="35" y2="50" />
                  <line x1="35" y1="35" x2="35" y2="65" strokeWidth="4.5" />
                  {/* Emitter (Atas) - PNP standar */}
                  <line x1="35" y1="42" x2="60" y2="17" />
                  <line x1="60" y1="17" x2="60" y2="2" />
                  {/* Collector (Bawah) */}
                  <line x1="35" y1="58" x2="60" y2="83" />
                  <line x1="60" y1="83" x2="60" y2="98" />
                  {/* Panah Emitter Masuk (PNP) */}
                  <polygon points="45,43 57,35 48,27" fill="currentColor" stroke="none" />
                  
                  {/* Teks Label */}
                  <text x="3" y="55" fill="currentColor" stroke="none" fontSize="16" fontWeight="bold">B</text>
                  <text x="65" y="15" fill="currentColor" stroke="none" fontSize="16" fontWeight="bold">E</text>
                  <text x="65" y="93" fill="currentColor" stroke="none" fontSize="16" fontWeight="bold">C</text>
                </svg>
                <div className="flex flex-col items-center leading-tight">
                  <span className="text-sm font-bold text-red-300 tracking-widest">PNP</span>
                  <span className="text-[10px] text-gray-400 font-medium">(Panah Masuk)</span>
                </div>
              </div>
            </div>
          </div>
        ),
        position: [0, 0.647, 0.181],
      },
    ],
  },

  // INTEGRATED CIRCUIT (IC)
  {
    id: "ic",
    name: "Integrated Circuit",
    nameBahasa: "IC (Integrated Circuit)",
    category: "aktif",
    description:
      "Chip elektronik yang mengintegrasikan jutaan komponen (transistor, resistor, kapasitor) dalam satu keeping silikon. Otak dari semua perangkat elektronik modern.",
    modelPath: "/models/integrated_circuit_ic.glb",
    accentColor: "#06b6d4",
    gradientFrom: "#164e63",
    gradientTo: "#155e75",
    icon: "IC",
    annotations: [
      {
        id: "ic-pin",
        title: "Pin / Kaki IC",
        description:
          "Kaki-kaki logam yang menghubungkan chip ke rangkaian luar. Setiap pin memiliki fungsi spesifik (power, ground, input, output) sesuai datasheet IC.",
        position: [0.768, -0.423, 0.855], // ✓ final
      },
      {
        id: "ic-package",
        title: "Package (Casing)",
        description:
          "Casing pelindung chip silikon. Paket DIP (Dual In-line Package) yang umum ini memudahkan pemasangan di breadboard maupun PCB.",
        position: [0.255, 0.56, 0.055], // ✓ final
      },
      {
        id: "ic-notch",
        title: "Notch / Pin 1 Marker",
        description:
          "Lekukan atau tanda di ujung IC sebagai penanda orientasi. Pin 1 selalu berada di sisi kiri notch, digunakan sebagai referensi pemasangan IC.",
        position: [0.708, 0.303, 0.776], // ✓ final
      },
    ],
  },
];

/** Helper: cari data komponen berdasarkan ID */
export function getComponentData(id: string): ComponentData | undefined {
  return componentsData.find((c) => c.id === id);
}

/** Helper: filter komponen berdasarkan kategori */
export function getComponentsByCategory(category: "pasif" | "aktif"): ComponentData[] {
  return componentsData.filter((c) => c.category === category);
}
