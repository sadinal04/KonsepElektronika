/**
 * components/three/Annotation.tsx
 * Komponen hotspot anotasi yang di-render di atas model 3D.
 * Menggunakan <Html> dari @react-three/drei untuk overlay DOM di ruang 3D.
 *
 * Struktur visual:
 *  [titik merah pulse] → [garis penunjuk] → [label teks]
 */

"use client";

import { Html } from "@react-three/drei";
import { AnnotationProps } from "@/types";

export default function Annotation({ data, isActive, onClick }: AnnotationProps) {
  return (
    /**
     * Html dari Drei: menempatkan elemen DOM pada posisi 3D.
     * distanceFactor: ukuran skala berubah sesuai jarak kamera.
     */
    <Html
      position={data.position}
      distanceFactor={4}
      // occlude dihapus: hotspot yang berada di permukaan model
      // akan tersembunyi oleh occlusion detection — selalu tampilkan
      zIndexRange={[10, 100]}
    >
      {/* Wrapper interaktif: klik untuk buka panel info */}
      <div
        className="relative flex items-center cursor-pointer group select-none"
        onClick={(e) => {
          e.stopPropagation();
          onClick(data);
        }}
        role="button"
        aria-label={`Hotspot: ${data.title}`}
      >
        {/* ── Titik merah dengan animasi pulse ──────────── */}
        <div className="relative flex-shrink-0">
          {/* Ring pulse luar (animasi) */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-300 ${
              isActive
                ? "bg-red-400/30 scale-[2.5] animate-ping"
                : "bg-red-500/20 scale-[2] animate-ping"
            }`}
          />
          {/* Titik inti */}
          <div
            className={`relative w-3 h-3 rounded-full border-2 transition-all duration-200 shadow-lg ${
              isActive
                ? "bg-white border-red-400 scale-125 shadow-[0_0_12px_rgba(239,68,68,0.9)]"
                : "bg-red-500 border-red-300 hover:scale-110 shadow-[0_0_8px_rgba(239,68,68,0.7)]"
            }`}
          />
        </div>

        {/* ── Garis penunjuk ────────────────────────────── */}
        <div
          className={`h-px w-8 transition-all duration-200 ${
            isActive ? "bg-red-400" : "bg-red-500/70 group-hover:bg-red-400"
          }`}
        />

        {/* ── Label teks ────────────────────────────────── */}
        <div
          className={`
            px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap
            border transition-all duration-200
            ${
              isActive
                ? "bg-red-500 text-white border-red-400 shadow-[0_0_16px_rgba(239,68,68,0.5)]"
                : "bg-gray-900/90 text-gray-200 border-white/20 group-hover:bg-gray-800 group-hover:text-white group-hover:border-red-500/50"
            }
          `}
        >
          {data.title}
        </div>
      </div>
    </Html>
  );
}
