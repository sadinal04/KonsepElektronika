/**
 * components/ComponentPage.tsx
 * Komponen halaman reusable untuk semua halaman komponen elektronika.
 * Menggabungkan: ModelViewer 3D + InfoPanel + navigasi kembali.
 *
 * Fitur tambahan:
 * - Mode Koordinat Picker: klik model → tampilkan koordinat world-space
 *   Gunakan ini untuk menentukan posisi hotspot di data/annotations.ts
 */

"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import InfoPanel from "@/components/panels/InfoPanel";
import { AnnotationData, ComponentData } from "@/types";

/**
 * ModelViewer di-import secara dynamic agar tidak di-render di server-side.
 * Canvas WebGL hanya berjalan di sisi klien (browser).
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
  // ── State anotasi ──────────────────────────────────────────
  const [activeAnnotation, setActiveAnnotation] =
    useState<AnnotationData | null>(null);

  // ── State debug mode (koordinat picker) ───────────────────
  const [debugMode, setDebugMode] = useState(false);
  /** Koordinat terakhir yang diklik dalam debug mode */
  const [pickedCoords, setPickedCoords] =
    useState<[number, number, number] | null>(null);
  /** Apakah koordinat baru saja di-copy */
  const [copied, setCopied] = useState(false);

  // ── Handler klik hotspot ───────────────────────────────────
  const handleAnnotationClick = useCallback(
    (data: AnnotationData) => {
      setActiveAnnotation((prev) => (prev?.id === data.id ? null : data));
    },
    []
  );

  // ── Handler tutup panel ────────────────────────────────────
  const handleClosePanel = useCallback(() => {
    setActiveAnnotation(null);
  }, []);

  // ── Handler terima koordinat dari debug picker ─────────────
  const handlePickCoords = useCallback(
    (pos: [number, number, number]) => {
      setPickedCoords(pos);
      setCopied(false);
    },
    []
  );

  // ── Toggle debug mode ─────────────────────────────────────
  const toggleDebugMode = useCallback(() => {
    setDebugMode((prev) => {
      if (prev) {
        // Keluar dari debug mode → reset state
        setPickedCoords(null);
        setCopied(false);
      } else {
        // Masuk debug mode → tutup panel info
        setActiveAnnotation(null);
      }
      return !prev;
    });
  }, []);

  // ── Copy koordinat ke clipboard ──────────────────────────
  const handleCopyCoords = useCallback(() => {
    if (!pickedCoords) return;
    const text = `[${pickedCoords.join(", ")}]`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [pickedCoords]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">

      {/* ── Header Halaman ──────────────────────────────────── */}
      <div className="flex-shrink-0 px-4 sm:px-6 py-3 border-b border-white/5 bg-gray-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Tombol kembali */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Kembali
          </Link>

          <div className="w-px h-4 bg-white/10" />

          {/* Info komponen */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-xl">{component.icon}</span>
            <div className="min-w-0">
              <h1 className="text-sm font-semibold text-white truncate">
                {component.nameBahasa}
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block truncate">
                {component.description}
              </p>
            </div>
          </div>

          {/* Quick hotspot buttons */}
          {!debugMode && (
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 overflow-x-auto pb-1 -mb-1 [&::-webkit-scrollbar]:hidden">
              {component.annotations.map((ann) => (
                <button
                  key={ann.id}
                  onClick={() => handleAnnotationClick(ann)}
                  className={`flex-shrink-0 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium border transition-all duration-150 ${
                    activeAnnotation?.id === ann.id
                      ? "bg-red-500/20 border-red-500/40 text-red-300"
                      : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {ann.title}
                </button>
              ))}
            </div>
          )}

          {/* Tombol debug mode */}
          <button
            onClick={toggleDebugMode}
            title={debugMode ? "Keluar mode picker" : "Mode Koordinat Picker — klik model untuk cari posisi hotspot"}
            className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
              debugMode
                ? "bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30"
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>🎯</span>
            <span className="hidden sm:inline">
              {debugMode ? "Mode Picker Aktif" : "Picker Koordinat"}
            </span>
          </button>
        </div>
      </div>

      {/* ── Area Utama: Canvas 3D ────────────────────────────── */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900" />

        {/* Model 3D Viewer */}
        <ModelViewer
          modelPath={component.modelPath}
          annotations={component.annotations}
          onAnnotationClick={handleAnnotationClick}
          activeAnnotationId={activeAnnotation?.id ?? null}
          debugMode={debugMode}
          onPickCoords={handlePickCoords}
        />

        {/* ── Hint kontrol (kiri bawah) ──────────────────────── */}
        {!debugMode && (
          <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 pointer-events-none">
            {[
              { icon: "🖱️", text: "Drag untuk rotate" },
              { icon: "🔍", text: "Scroll untuk zoom" },
              { icon: "👆", text: "Klik hotspot untuk info" },
            ].map((hint) => (
              <div
                key={hint.text}
                className="flex items-center gap-2 px-2.5 py-1 bg-black/40 backdrop-blur-sm rounded-lg border border-white/5"
              >
                <span className="text-xs">{hint.icon}</span>
                <span className="text-xs text-gray-400">{hint.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── Panel Debug Koordinat (kiri bawah, saat debug aktif) */}
        {debugMode && (
          <div className="absolute bottom-4 left-4 flex flex-col gap-3 max-w-xs">
            {/* Instruksi */}
            <div className="flex flex-col gap-1.5 px-3 py-2.5 bg-amber-950/80 backdrop-blur-sm rounded-xl border border-amber-500/30">
              <div className="flex items-center gap-2">
                <span className="text-sm">🎯</span>
                <span className="text-xs font-semibold text-amber-300">
                  Mode Koordinat Picker
                </span>
              </div>
              <p className="text-xs text-amber-200/70 leading-relaxed">
                Klik bagian model yang ingin diberi hotspot. Koordinat
                akan muncul di bawah — salin ke{" "}
                <code className="text-amber-300 text-[10px] bg-amber-900/50 px-1 rounded">
                  data/annotations.ts
                </code>
              </p>
              <p className="text-xs text-amber-200/50">
                Hotspot disembunyikan saat mode ini aktif.
              </p>
            </div>

            {/* Hasil koordinat */}
            {pickedCoords ? (
              <div className="flex flex-col gap-2 px-3 py-2.5 bg-gray-900/90 backdrop-blur-sm rounded-xl border border-green-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-green-400">
                    Koordinat Terakhir Diklik:
                  </span>
                </div>

                {/* Tampilan koordinat */}
                <div className="flex items-center gap-2 bg-gray-800/80 rounded-lg px-3 py-2">
                  <code className="text-green-300 text-xs font-mono flex-1">
                    [{pickedCoords.join(", ")}]
                  </code>
                  <button
                    onClick={handleCopyCoords}
                    className={`flex-shrink-0 px-2 py-1 rounded text-[10px] font-medium transition-all duration-150 ${
                      copied
                        ? "bg-green-500/30 text-green-300"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    {copied ? "✓ Tersalin!" : "Salin"}
                  </button>
                </div>

                {/* Breakdown per axis */}
                <div className="grid grid-cols-3 gap-1.5">
                  {(["x", "y", "z"] as const).map((axis, i) => (
                    <div
                      key={axis}
                      className="text-center bg-gray-800/50 rounded-lg py-1.5"
                    >
                      <div className="text-[10px] text-gray-500 uppercase mb-0.5">
                        {axis}
                      </div>
                      <div className="text-xs font-mono text-gray-200">
                        {pickedCoords[i]}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-[10px] text-gray-600 leading-relaxed">
                  Salin nilai di atas ke field{" "}
                  <code className="text-gray-500">position</code> pada
                  anotasi yang sesuai di{" "}
                  <code className="text-gray-500">data/annotations.ts</code>
                </p>
              </div>
            ) : (
              <div className="px-3 py-2 bg-gray-900/60 backdrop-blur-sm rounded-xl border border-white/5">
                <p className="text-xs text-gray-500 text-center">
                  Belum ada klik — klik model di atas
                </p>
              </div>
            )}
          </div>
        )}

        {/* Panel info (slide dari kanan) — tersembunyi saat debug */}
        {!debugMode && (
          <InfoPanel
            annotation={activeAnnotation}
            onClose={handleClosePanel}
          />
        )}
      </div>
    </div>
  );
}
