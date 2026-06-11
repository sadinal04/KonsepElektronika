/**
 * components/ComponentPage.tsx
 * Komponen halaman reusable untuk semua halaman komponen elektronika.
 * Menggabungkan: ModelViewer 3D + InfoPanel + navigasi kembali.
 */

"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import InfoPanel from "@/components/panels/InfoPanel";
import { AnnotationData, ComponentData } from "@/types";

/* ── SVG Icons ──────────────────────────────────────────────── */
function IconRotate({ size = 13 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.5 2v6h-6" />
      <path d="M2 12a10 10 0 0 1 10-10c3.11 0 5.93 1.42 7.79 3.65L21.5 8" />
      <path d="M2.5 22v-6h6" />
      <path d="M22 12a10 10 0 0 1-10 10c-3.11 0-5.93-1.42-7.79-3.65L2.5 16" />
    </svg>
  );
}
function IconScroll({ size = 13 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2" width="12" height="20" rx="6" />
      <line x1="12" y1="6" x2="12" y2="10" />
      <polyline points="10 8 12 6 14 8" />
      <polyline points="10 16 12 18 14 16" />
    </svg>
  );
}
function IconZoomIn({ size = 13 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}
function IconClick({ size = 13 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="12" r="6" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
    </svg>
  );
}

/** SVG icon sesuai component.id */
function ComponentIcon({ id }: { id: string }) {
  const props = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5" as const,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "text-gray-300",
  };
  switch (id) {
    case "resistor":
      return <svg {...props}><path d="M2 12h4l2-6 3 12 3-12 3 12 2-6h3" /></svg>;
    case "capacitor":
      return <svg {...props}><path d="M2 12h7M15 12h7M11 5v14M13 5v14" /></svg>;
    case "inductor":
      return <svg {...props}><path d="M2 12h2a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0h2" /></svg>;
    default:
      return <svg {...props}><circle cx="12" cy="12" r="10" /></svg>;
  }
}

/**
 * ModelViewer di-import secara dynamic agar tidak di-render di server-side.
 */
const ModelViewer = dynamic(
  () => import("@/components/three/ModelViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gray-950">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    ),
  }
);

interface ComponentPageProps {
  component: ComponentData;
}

export default function ComponentPage({ component }: ComponentPageProps) {
  const [activeAnnotation, setActiveAnnotation] = useState<AnnotationData | null>(null);

  const handleAnnotationClick = useCallback(
    (data: AnnotationData) => {
      setActiveAnnotation((prev) => (prev?.id === data.id ? null : data));
    },
    []
  );

  const handleClosePanel = useCallback(() => {
    setActiveAnnotation(null);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">

      {/* ── Header ──────────────────────────────────────────── */}
      <div
        className="flex-shrink-0 border-b border-white/5"
        style={{ background: "rgba(3,7,18,0.92)", backdropFilter: "blur(12px)" }}
      >
        {/* Baris 1: Kembali + Nama Komponen */}
        <div className="max-w-7xl mx-auto flex items-center gap-3 px-4 sm:px-6 pt-2.5 pb-2">

          {/* Tombol kembali */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-1.5 text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Kembali</span>
          </Link>

          <div className="w-px h-4 bg-white/10 flex-shrink-0" />

          {/* Icon + Nama */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div
              className="flex-shrink-0 p-1.5 rounded-lg"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <ComponentIcon id={component.id} />
            </div>
            <h1 className="text-sm font-semibold text-white leading-tight truncate">
              {component.nameBahasa}
            </h1>
          </div>
        </div>

        {/* Baris 2: Deskripsi — desktop saja */}
        <div className="hidden sm:block max-w-7xl mx-auto px-4 sm:px-6 pb-1.5">
          <p className="text-[11px] text-gray-500 leading-relaxed">
            {component.description}
          </p>
        </div>

        {/* Baris 3: Tombol anotasi — scrollable, full-width */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {component.annotations.map((ann) => (
              <button
                key={ann.id}
                onClick={() => handleAnnotationClick(ann)}
                className={`flex-shrink-0 px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium border transition-all duration-150 ${
                  activeAnnotation?.id === ann.id
                    ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {ann.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Area Utama: Canvas 3D ──────────────────────────── */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900" />

        {/* 3D Model */}
        <ModelViewer
          modelPath={component.modelPath}
          annotations={component.annotations}
          onAnnotationClick={handleAnnotationClick}
          activeAnnotationId={activeAnnotation?.id ?? null}
          debugMode={false}
          onPickCoords={() => {}}
        />

        {/* ── Hints (kanan bawah) ─────────────────────────── */}
        <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1.5 pointer-events-none z-10">
          {(
            [
              { icon: <IconRotate size={13} />, text: "Drag: Rotasi" },
              { icon: <IconZoomIn size={13} />, text: "Scroll: Zoom" },
              { icon: <IconClick size={13} />,  text: "Klik: Lihat Info" },
            ] as { icon: React.ReactNode; text: string }[]
          ).map((hint) => (
            <div
              key={hint.text}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(0,0,0,0.50)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span className="text-indigo-400 flex-shrink-0">{hint.icon}</span>
              <span className="text-[11px] text-gray-400 whitespace-nowrap">{hint.text}</span>
            </div>
          ))}
        </div>

        {/* Info Panel */}
        <InfoPanel
          annotation={activeAnnotation}
          onClose={handleClosePanel}
        />
      </div>
    </div>
  );
}
