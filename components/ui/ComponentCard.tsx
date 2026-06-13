/**
 * components/ui/ComponentCard.tsx
 * Kartu komponen interaktif dengan efek hover glow.
 * Mendukung komponen pasif (GLB) dan aktif (Sketchfab/GLB).
 */

"use client";

import Link from "next/link";
import { ComponentData } from "@/types";

/* ── Schematic-style SVG icon per komponen ─────────────── */
function ComponentSvgIcon({ id }: { id: string }) {
  const base = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 32, height: 32,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75" as const,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (id) {
    case "resistor":   return <svg {...base}><path d="M2 12h4l2-6 3 12 3-12 3 12 2-6h3"/></svg>;
    case "capacitor":  return <svg {...base}><path d="M2 12h7M15 12h7M11 5v14M13 5v14"/></svg>;
    case "inductor":   return <svg {...base}><path d="M2 12h2a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0h2"/></svg>;
    case "dioda":      return <svg {...base}><path d="M6 7l8 5-8 5V7z"/><line x1="14" y1="7" x2="14" y2="17"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="14" y1="12" x2="22" y2="12"/></svg>;
    case "transistor": return <svg {...base}><line x1="3" y1="12" x2="9" y2="12"/><line x1="9" y1="5" x2="9" y2="19"/><path d="M9 8l9-4M9 16l9 4"/></svg>;
    case "ic":         return <svg {...base}><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M8 6V4M12 6V4M16 6V4M8 20v-2M12 20v-2M16 20v-2M4 9H2M4 12H2M4 15H2M20 9h2M20 12h2M20 15h2"/></svg>;
    default:           return <svg {...base}><circle cx="12" cy="12" r="8"/></svg>;
  }
}

interface ComponentCardProps {
  component: ComponentData;
}

export default function ComponentCard({ component }: ComponentCardProps) {
  const isSketchfab = !!component.sketchfabUrl;

  return (
    <Link href={`/${component.id}`} className="group block h-full">
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/50 p-6 h-full
          transition-all duration-300 hover:border-white/20 hover:-translate-y-1 flex flex-col"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            `0 20px 60px ${component.accentColor}30`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        {/* Gradient hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top, ${component.accentColor}15 0%, transparent 70%)`,
          }}
        />

        {/* Badge kategori + model type */}
        <div className="relative flex items-center gap-2 mb-4">
          <span
            className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full"
            style={{
              background: component.category === "aktif"
                ? "rgba(34,197,94,0.12)" : "rgba(99,102,241,0.12)",
              color: component.category === "aktif" ? "#4ade80" : "#818cf8",
              border: `1px solid ${component.category === "aktif" ? "rgba(34,197,94,0.25)" : "rgba(99,102,241,0.25)"}`,
            }}
          >
            {component.category === "aktif" ? "Aktif" : "Pasif"}
          </span>
          {isSketchfab && (
            <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full"
              style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.25)" }}>
              Sketchfab
            </span>
          )}
        </div>

        {/* Ikon SVG */}
        <div
          className="relative mb-4 w-14 h-14 flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
          style={{
            background: `${component.accentColor}18`,
            border: `1px solid ${component.accentColor}30`,
            color: component.accentColor,
          }}
        >
          <ComponentSvgIcon id={component.id}/>
        </div>

        {/* Nama */}
        <h3 className="text-xl font-bold text-white mb-2 relative">{component.nameBahasa}</h3>

        {/* Deskripsi */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6 relative flex-1">
          {component.description}
        </p>

        {/* Footer kartu */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: component.accentColor }}/>
            <span className="text-xs text-gray-500">{component.annotations.length} anotasi</span>
          </div>

          <span
            className="text-sm font-medium flex items-center gap-1.5 transition-all duration-200 group-hover:gap-2.5"
            style={{ color: component.accentColor }}
          >
            Jelajahi
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
