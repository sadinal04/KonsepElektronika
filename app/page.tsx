/**
 * app/page.tsx
 * Landing page — halaman utama "/"
 * Menampilkan:
 * - Hero section dengan judul skripsi
 * - Deskripsi media pembelajaran
 * - 3 kartu komponen (Resistor, Kapasitor, Induktor)
 */

import type { Metadata } from "next";
import { componentsData } from "@/data/annotations";
import ComponentCard from "@/components/ui/ComponentCard";

export const metadata: Metadata = {
  title: "Media Pembelajaran AR — Konsep Elektronika",
  description:
    "Eksplorasi komponen elektronika dasar dalam model 3D interaktif. Klik hotspot untuk mempelajari setiap bagian komponen.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 overflow-hidden">
      {/* ── Background dekoratif ─────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Blob atas kiri */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
        {/* Blob kanan */}
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]" />
        {/* Blob bawah */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-40 bg-blue-600/10 rounded-full blur-[80px]" />
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Hero Section ─────────────────────────────────────── */}
        <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300 text-xs font-medium mb-8 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Media Pembelajaran Interaktif
          </div>

          {/* Judul skripsi */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 max-w-4xl mx-auto">
            Perancangan Media Pembelajaran Menggunakan{" "}
            <span className="text-gradient-primary">
              Augmented Reality (AR)
            </span>{" "}
            pada Materi{" "}
            <span className="text-gradient-primary">Konsep Elektronika</span>
          </h1>

          {/* Deskripsi */}
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Eksplorasi komponen elektronika dasar secara interaktif melalui
            model{" "}
            <strong className="text-gray-300">3 dimensi</strong>. Klik hotspot
            pada model untuk mempelajari setiap bagian komponen secara mendalam.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-12 mb-14">
            {[
              { value: "3", label: "Komponen" },
              { value: "9", label: "Anotasi" },
              { value: "AR", label: "Teknologi" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Kartu Komponen ───────────────────────────────────── */}
        <section className="pb-20">
          <h2 className="text-center text-sm font-medium text-gray-500 uppercase tracking-widest mb-8">
            Pilih Komponen untuk Dieksplorasi
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {componentsData.map((component) => (
              <ComponentCard key={component.id} component={component} />
            ))}
          </div>

        </section>

        {/* ── Footer info ──────────────────────────────────────── */}
        <footer className="pb-8 text-center">
          <p className="text-gray-600 text-xs">
            Media Pembelajaran · Augmented Reality · Konsep Elektronika
          </p>
        </footer>
      </div>
    </div>
  );
}
