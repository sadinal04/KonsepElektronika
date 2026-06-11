/**
 * components/ui/ComponentCard.tsx
 * Kartu komponen interaktif dengan efek hover glow.
 * "use client" diperlukan karena menggunakan onMouseEnter/onMouseLeave.
 */

"use client";

import Link from "next/link";
import { ComponentData } from "@/types";

interface ComponentCardProps {
  component: ComponentData;
}

export default function ComponentCard({ component }: ComponentCardProps) {
  return (
    <Link href={`/${component.id}`} className="group block">
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/50 p-6 h-full
          transition-all duration-300 hover:border-white/20 hover:-translate-y-1"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            `0 20px 60px ${component.accentColor}25`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        {/* Gradient hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(ellipse at top, ${component.accentColor}12 0%, transparent 70%)`,
          }}
        />

        {/* Ikon */}
        <div className="relative text-5xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
          {component.icon}
        </div>

        {/* Nama */}
        <h3 className="text-xl font-bold text-white mb-2 relative">
          {component.nameBahasa}
        </h3>

        {/* Deskripsi */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6 relative">
          {component.description}
        </p>

        {/* Footer kartu */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: component.accentColor }}
            />
            <span className="text-xs text-gray-500">
              {component.annotations.length} anotasi
            </span>
          </div>

          <span
            className="text-sm font-medium flex items-center gap-1.5 transition-all duration-200 group-hover:gap-2.5"
            style={{ color: component.accentColor }}
          >
            Jelajahi
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
