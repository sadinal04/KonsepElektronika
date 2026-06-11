/**
 * components/panels/InfoPanel.tsx
 * Panel informasi yang muncul dari sisi kanan saat hotspot diklik.
 * Menggunakan CSS transform transition untuk animasi slide-in yang halus.
 */

"use client";

import { InfoPanelProps } from "@/types";

export default function InfoPanel({ annotation, onClose }: InfoPanelProps) {
  /** Panel tampil ketika ada anotasi yang dipilih */
  const isVisible = annotation !== null;

  return (
    <>
      {/* Overlay gelap di belakang panel (hanya mobile) */}
      {isVisible && (
        <div
          className="fixed inset-0 bg-black/40 z-30 sm:hidden"
          onClick={onClose}
        />
      )}

      {/* Panel slide-in (Bottom Sheet di HP, Side Panel di Desktop) */}
      <div
        className={`
          fixed z-40 flex flex-col transition-transform duration-300 ease-out
          bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-black/50
          
          /* Mobile layout: Bottom Sheet */
          bottom-0 left-0 right-0 top-auto h-auto max-h-[75vh]
          rounded-t-3xl border-t border-white/10
          ${isVisible ? "translate-y-0" : "translate-y-full"}
          
          /* Desktop layout: Side Panel */
          sm:top-16 sm:right-0 sm:left-auto sm:bottom-0 sm:h-full sm:w-80 lg:w-96
          sm:rounded-none sm:border-t-0 sm:border-l
          ${isVisible ? "sm:translate-x-0 sm:translate-y-0" : "sm:translate-x-full sm:translate-y-0"}
        `}
      >
        {/* Handle bar kecil untuk drag visual (hanya di HP) */}
        <div className="w-full flex justify-center pt-3 pb-1 sm:hidden cursor-pointer" onClick={onClose}>
          <div className="w-12 h-1.5 bg-gray-600/50 rounded-full" />
        </div>
        {/* Header panel */}
        <div className="flex items-start justify-between px-6 pb-4 sm:p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            {/* Indikator titik merah kecil */}
            <div className="relative mt-1">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-0.5">
                Informasi Komponen
              </p>
              <h2 className="text-lg font-bold text-white leading-tight">
                {annotation?.title ?? ""}
              </h2>
            </div>
          </div>

          {/* Tombol tutup */}
          <button
            onClick={onClose}
            aria-label="Tutup panel informasi"
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-150 ml-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Konten deskripsi */}
        <div className="flex-1 overflow-y-auto p-6">
          {annotation && (
            <div className="space-y-4">
              {/* Deskripsi utama */}
              <p className="text-gray-300 text-sm leading-relaxed">
                {annotation.description}
              </p>

              {/* Divider dekoratif */}
              <div className="border-t border-white/5 pt-4">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>Klik hotspot lain untuk melihat informasi berbeda</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer panel */}
        <div className="p-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white text-sm font-medium rounded-xl transition-all duration-150"
          >
            Tutup Panel
          </button>
        </div>
      </div>
    </>
  );
}
