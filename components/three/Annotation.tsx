/**
 * components/three/Annotation.tsx
 * Komponen hotspot anotasi yang di-render di atas model 3D.
 * Menggunakan <Html> dari @react-three/drei untuk overlay DOM di ruang 3D.
 *
 * Struktur visual:
 *  [Bulatan berwarna konsisten berisi angka]
 */

"use client";

import { Html } from "@react-three/drei";
import { AnnotationProps } from "@/types";

// Palette warna konsisten berdasarkan index anotasi
const COLOR_PALETTE = [
  "bg-green-500",    // 1
  "bg-blue-500",     // 2
  "bg-amber-500",    // 3
  "bg-purple-500",   // 4
  "bg-pink-500",     // 5
  "bg-teal-500",     // 6
  "bg-rose-500",     // 7
  "bg-indigo-500",   // 8
];

const BORDER_PALETTE = [
  "border-green-300",
  "border-blue-300",
  "border-amber-300",
  "border-purple-300",
  "border-pink-300",
  "border-teal-300",
  "border-rose-300",
  "border-indigo-300",
];

const SHADOW_PALETTE = [
  "shadow-[0_0_12px_rgba(34,197,94,0.7)]",
  "shadow-[0_0_12px_rgba(59,130,246,0.7)]",
  "shadow-[0_0_12px_rgba(245,158,11,0.7)]",
  "shadow-[0_0_12px_rgba(168,85,247,0.7)]",
  "shadow-[0_0_12px_rgba(236,72,153,0.7)]",
  "shadow-[0_0_12px_rgba(20,184,166,0.7)]",
  "shadow-[0_0_12px_rgba(244,63,94,0.7)]",
  "shadow-[0_0_12px_rgba(99,102,241,0.7)]",
];

export default function Annotation({ data, isActive, onClick, index }: AnnotationProps) {
  // Ambil warna berdasarkan index (loop kembali ke awal jika index lebih dari palette)
  const colorIndex = (index - 1) % COLOR_PALETTE.length;
  const bgColor = COLOR_PALETTE[colorIndex];
  const borderColor = BORDER_PALETTE[colorIndex];
  const shadow = SHADOW_PALETTE[colorIndex];

  return (
    <Html
      position={data.position}
      distanceFactor={4}
      zIndexRange={[10, 100]}
    >
      <div
        className="relative cursor-pointer group select-none"
        onClick={(e) => {
          e.stopPropagation();
          onClick(data);
        }}
        role="button"
        aria-label={`Hotspot: ${data.title}`}
      >
        {/* Titik mungil penanda koordinat asli (ditengah 0,0) */}
        <div className={`absolute top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full ${bgColor} shadow-sm z-10`} />
        
        {/* Garis pendek diagonal (Panjang 24px, sudut 45 derajat) */}
        {/* Ujung garis ini akan berada di koordinat X: ~17px, Y: ~-17px */}
        <div className={`absolute top-0 left-0 w-[24px] h-[1.5px] origin-left -rotate-45 ${bgColor} opacity-80`} />
        
        {/* Bulatan angka (20x20) */}
        {/* Posisi disesuaikan agar pusat bulatan (10px, 10px) jatuh persis di ujung garis (17, -17) */}
        <div
          className={`
            absolute top-[-27px] left-[7px]
            flex items-center justify-center
            w-[20px] h-[20px] rounded-full border-[1.5px] text-[10px] font-bold text-white
            transition-transform duration-200 origin-center
            ${bgColor} ${borderColor} ${shadow}
            group-hover:scale-110 group-hover:brightness-110
            ${isActive ? "scale-125 ring-2 ring-white/50 ring-offset-1 ring-offset-gray-900 brightness-110" : "scale-100"}
          `}
        >
          {index}
        </div>

        {/* Tooltip Judul (Muncul saat di-hover, hanya untuk desktop) */}
        <div
          className={`
            hidden sm:block
            absolute top-[-60px] left-[17px] -translate-x-1/2
            px-2.5 py-1 rounded-md bg-gray-900/95 text-[11px] font-semibold text-white whitespace-nowrap
            border border-white/20 shadow-xl pointer-events-none
            opacity-0 translate-y-2 transition-all duration-200 ease-out
            group-hover:opacity-100 group-hover:translate-y-0
            z-20
          `}
        >
          {data.title}
          {/* Segitiga panah ke bawah */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900/95" />
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white/20 mt-[1px] -z-10" />
        </div>
      </div>
    </Html>
  );
}
