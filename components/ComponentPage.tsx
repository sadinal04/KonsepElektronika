/**
 * components/ComponentPage.tsx
 * Komponen halaman reusable untuk semua komponen elektronika.
 * Mendukung:
 *   - Model GLB lokal (via ModelViewer / Three.js)
 *   - Embed Sketchfab (via SketchfabViewer / iframe)
 *   - Picker Koordinat (hanya untuk GLB lokal)
 */

"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import InfoPanel from "@/components/panels/InfoPanel";
import { AnnotationData, ComponentData } from "@/types";

/* ── Lazy-load 3D viewers ─────────────────────────────────── */
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

const SketchfabViewer = dynamic(
  () => import("@/components/three/SketchfabViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gray-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
          <p className="text-xs text-gray-500">Memuat model 3D…</p>
        </div>
      </div>
    ),
  }
);

/* ── Schematic SVG icons ─────────────────────────────────── */
function ComponentIcon({ id }: { id: string }) {
  const p = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 18, height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5" as const,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "text-gray-300",
  };
  switch (id) {
    case "resistor":   return <svg {...p}><path d="M2 12h4l2-6 3 12 3-12 3 12 2-6h3"/></svg>;
    case "capacitor":  return <svg {...p}><path d="M2 12h7M15 12h7M11 5v14M13 5v14"/></svg>;
    case "inductor":   return <svg {...p}><path d="M2 12h2a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0h2"/></svg>;
    case "dioda":      return <svg {...p}><path d="M6 12h12M14 7l5 5-5 5"/><path d="M14 12V7"/><path d="M14 17v-5"/></svg>;
    case "transistor": return <svg {...p}><line x1="4" y1="12" x2="12" y2="12"/><polyline points="12 8 12 16"/><path d="M12 8 20 4"/><path d="M12 16 20 20"/><path d="M12 12 20 12" strokeDasharray="2 2"/></svg>;
    case "ic":         return <svg {...p}><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M8 5V3M12 5V3M16 5V3M8 21v-2M12 21v-2M16 21v-2M3 8h2M3 12h2M3 16h2M19 8h2M19 12h2M19 16h2"/></svg>;
    default:           return <svg {...p}><circle cx="12" cy="12" r="10"/></svg>;
  }
}

/* ── Hint icons ──────────────────────────────────────────── */
const IconRotate = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6"/><path d="M2 12a10 10 0 0 1 10-10c3.11 0 5.93 1.42 7.79 3.65L21.5 8"/>
    <path d="M2.5 22v-6h6"/><path d="M22 12a10 10 0 0 1-10 10c-3.11 0-5.93-1.42-7.79-3.65L2.5 16"/>
  </svg>
);
const IconZoom = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
  </svg>
);
const IconClick = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2"/><circle cx="12" cy="12" r="6"/>
    <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
  </svg>
);

/* ── Props ───────────────────────────────────────────────── */
interface ComponentPageProps {
  component: ComponentData;
}

/* ─────────────────────────────────────────────────────────── */
export default function ComponentPage({ component }: ComponentPageProps) {
  const [activeAnnotation, setActiveAnnotation] = useState<AnnotationData | null>(null);
  const [debugMode, setDebugMode]               = useState(false);
  const [pickedCoords, setPickedCoords]         = useState<[number,number,number] | null>(null);
  const [copied, setCopied]                     = useState(false);

  const handleAnnotationClick = useCallback((data: AnnotationData) => {
    setActiveAnnotation(prev => prev?.id === data.id ? null : data);
  }, []);

  const handleClosePanel = useCallback(() => setActiveAnnotation(null), []);

  const handlePickCoords = useCallback((pos: [number,number,number]) => {
    setPickedCoords(pos);
    setCopied(false);
  }, []);

  const toggleDebugMode = useCallback(() => {
    setDebugMode(prev => {
      if (prev) { setPickedCoords(null); setCopied(false); }
      else       { setActiveAnnotation(null); }
      return !prev;
    });
  }, []);

  const handleCopyCoords = useCallback(() => {
    if (!pickedCoords) return;
    navigator.clipboard.writeText(`[${pickedCoords.join(", ")}]`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [pickedCoords]);

  const isSketchfab = !!component.sketchfabUrl;
  const isGLB       = !!component.modelPath;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">

      {/* ── Header ─────────────────────────────────────────── */}
      <div
        className="flex-shrink-0 border-b border-white/5"
        style={{ background: "rgba(3,7,18,0.95)" }}
      >
        {/* Baris 1: Kembali + Nama + Tombol Picker */}
        <div className="max-w-7xl mx-auto flex items-center gap-3 px-4 sm:px-6 pt-2.5 pb-2">

          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-1.5 text-gray-400 hover:text-white text-xs sm:text-sm transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            <span className="hidden xs:inline">Kembali</span>
          </Link>

          <div className="w-px h-4 bg-white/10 flex-shrink-0"/>

          {/* Icon + Nama */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="flex-shrink-0 p-1.5 rounded-lg"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <ComponentIcon id={component.id}/>
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-semibold text-white leading-tight truncate">
                {component.nameBahasa}
              </h1>
              <span
                className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full"
                style={{
                  background: component.category === "aktif"
                    ? "rgba(34,197,94,0.12)" : "rgba(99,102,241,0.12)",
                  color: component.category === "aktif" ? "#4ade80" : "#818cf8",
                  border: `1px solid ${component.category === "aktif" ? "rgba(34,197,94,0.25)" : "rgba(99,102,241,0.25)"}`,
                }}
              >
                {component.category}
              </span>
            </div>
          </div>


        </div>

        {/* Baris 2: Deskripsi (desktop) */}
        <div className="hidden sm:block max-w-7xl mx-auto px-4 sm:px-6 pb-1.5">
          <p className="text-[11px] text-gray-500 leading-relaxed">{component.description}</p>
        </div>

        {/* Baris 3: Tombol anotasi */}
        {!debugMode && (
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
        )}
      </div>

      {/* ── Area Utama ─────────────────────────────────────── */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900"/>

        {/* ── Dual Sketchfab (ada model kedua) ─────────────── */}
        {isSketchfab && component.secondarySketchfabUrl ? (
          <div className="absolute inset-0 flex flex-col sm:flex-row">

            {/* Model utama */}
            <div className="flex-1 flex flex-col min-h-0 relative" style={{ minHeight: 0 }}>
              {/* Label */}
              <div className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 z-10"
                style={{ background: "rgba(3,7,18,0.80)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"/>
                <span className="text-[10px] font-semibold text-gray-300 uppercase tracking-widest">
                  {component.nameBahasa}
                </span>
              </div>
              {/* Viewer */}
              <div className="flex-1 relative min-h-0">
                <SketchfabViewer url={component.sketchfabUrl!} title={component.nameBahasa}/>
              </div>
            </div>

            {/* Divider vertikal (desktop) / horizontal (mobile) */}
            <div className="flex-shrink-0 sm:w-px sm:h-auto h-px w-auto bg-white/5"/>

            {/* Model kedua */}
            <div className="flex-1 flex flex-col min-h-0 relative" style={{ minHeight: 0 }}>
              {/* Label */}
              <div className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 z-10"
                style={{ background: "rgba(3,7,18,0.80)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"/>
                <span className="text-[10px] font-semibold text-gray-300 uppercase tracking-widest">
                  {component.secondaryLabel}
                </span>
              </div>
              {/* Viewer */}
              <div className="flex-1 relative min-h-0">
                <SketchfabViewer url={component.secondarySketchfabUrl} title={component.secondaryLabel ?? ""}/>
              </div>
            </div>
          </div>

        ) : isSketchfab ? (
          /* ── Single Sketchfab ──────────────────────────── */
          <SketchfabViewer url={component.sketchfabUrl!} title={component.nameBahasa}/>

        ) : isGLB ? (
          /* ── GLB model ─────────────────────────────────── */
          <ModelViewer
            modelPath={component.modelPath!}
            annotations={component.annotations}
            onAnnotationClick={handleAnnotationClick}
            activeAnnotationId={activeAnnotation?.id ?? null}
            debugMode={debugMode}
            onPickCoords={handlePickCoords}
          />
        ) : null}

        {/* ── Hints GLB (kanan bawah) ───────────────────── */}
        {!debugMode && isGLB && (
          <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1.5 pointer-events-none z-10">
            {([
              { icon: <IconRotate/>, text: "Drag: Rotasi" },
              { icon: <IconZoom/>,   text: "Scroll: Zoom" },
              { icon: <IconClick/>,  text: "Klik: Lihat Info" },
            ] as { icon: React.ReactNode; text: string }[]).map((h) => (
              <div key={h.text} className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(0,0,0,0.50)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <span className="text-indigo-400 flex-shrink-0">{h.icon}</span>
                <span className="text-[11px] text-gray-400 whitespace-nowrap">{h.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── Panel Picker Koordinat (GLB debug mode) ─────── */}
        {debugMode && isGLB && (
          <div className="absolute bottom-4 left-4 flex flex-col gap-3 max-w-[min(320px,calc(100vw-2rem))] z-20">
            {/* Instruksi */}
            <div className="flex flex-col gap-1.5 px-3 py-2.5 rounded-xl border border-amber-500/30"
              style={{ background: "rgba(120,53,15,0.85)", backdropFilter: "blur(8px)" }}>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"/><circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="2" x2="12" y2="7"/><line x1="12" y1="17" x2="12" y2="22"/>
                  <line x1="2" y1="12" x2="7" y2="12"/><line x1="17" y1="12" x2="22" y2="12"/>
                </svg>
                <span className="text-xs font-semibold text-amber-300">Picker Koordinat Aktif</span>
              </div>
              <p className="text-xs text-amber-200/70 leading-relaxed">
                Klik bagian model yang ingin diberi hotspot. Koordinat akan muncul di bawah — salin ke{" "}
                <code className="text-amber-300 text-[10px] bg-amber-900/50 px-1 rounded">data/annotations.tsx</code>
              </p>
            </div>

            {/* Hasil koordinat */}
            {pickedCoords ? (
              <div className="flex flex-col gap-2 px-3 py-2.5 rounded-xl border border-green-500/30"
                style={{ background: "rgba(5,46,22,0.90)", backdropFilter: "blur(8px)" }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-green-400">Koordinat Diklik:</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/80 rounded-lg px-3 py-2">
                  <code className="text-green-300 text-xs font-mono flex-1">
                    [{pickedCoords.map(n => n.toFixed(3)).join(", ")}]
                  </code>
                  <button
                    onClick={handleCopyCoords}
                    className={`flex-shrink-0 px-2 py-1 rounded text-[10px] font-medium transition-all ${
                      copied ? "bg-green-500/30 text-green-300" : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    {copied ? "✓ Tersalin" : "Salin"}
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["X", "Y", "Z"] as const).map((axis, i) => (
                    <div key={axis} className="text-center bg-gray-800/50 rounded-lg py-1.5">
                      <div className="text-[9px] text-gray-500 uppercase mb-0.5">{axis}</div>
                      <div className="text-xs font-mono text-gray-200">{pickedCoords[i].toFixed(3)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="px-3 py-2 rounded-xl border border-white/5"
                style={{ background: "rgba(17,24,39,0.80)", backdropFilter: "blur(8px)" }}>
                <p className="text-xs text-gray-500 text-center">Belum ada klik — klik model di atas</p>
              </div>
            )}
          </div>
        )}

        {/* Hint Sketchfab (single viewer saja) */}
        {isSketchfab && !component.secondarySketchfabUrl && (
          <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(0,0,0,0.60)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width={11} height={11} viewBox="0 0 24 24"
                fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span className="text-[10px] text-gray-500">Drag: Rotasi · Scroll: Zoom · Gunakan kontrol Sketchfab</span>
            </div>
          </div>
        )}

        {/* Info Panel */}
        {!debugMode && (
          <InfoPanel annotation={activeAnnotation} onClose={handleClosePanel}/>
        )}
      </div>
    </div>
  );
}

