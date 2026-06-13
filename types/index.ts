/**
 * types/index.ts
 * Definisi TypeScript untuk seluruh aplikasi media pembelajaran
 */

import React from "react";

/** Data satu hotspot anotasi pada model 3D */
export interface AnnotationData {
  /** Identifikasi unik hotspot */
  id: string;
  /** Judul anotasi yang tampil di panel info */
  title: string;
  /** Deskripsi detail anotasi (bisa teks biasa atau komponen React/SVG) */
  description: string | React.ReactNode;
  /** Posisi hotspot di ruang 3D [x, y, z] */
  position: [number, number, number];
}

/** Data keseluruhan satu komponen elektronika */
export interface ComponentData {
  /** Kunci unik komponen */
  id: "resistor" | "capacitor" | "inductor" | "dioda" | "transistor" | "ic";
  /** Nama tampil komponen */
  name: string;
  /** Nama dalam bahasa Indonesia */
  nameBahasa: string;
  /** Deskripsi singkat komponen */
  description: string;
  /** Path ke file GLB di public/models/ (opsional jika pakai Sketchfab) */
  modelPath?: string;
  /** URL embed Sketchfab (opsional jika pakai GLB lokal) */
  sketchfabUrl?: string;
  /** URL embed Sketchfab kedua (opsional, tampil berdampingan) */
  secondarySketchfabUrl?: string;
  /** Label model kedua */
  secondaryLabel?: string;
  /** Warna aksen kartu komponen (hex) */
  accentColor: string;
  /** Warna gradient kartu */
  gradientFrom: string;
  gradientTo: string;
  /** Ikon emoji (dipakai di kartu lama, bisa diganti SVG) */
  icon: string;
  /** Kategori komponen */
  category: "pasif" | "aktif";
  /** Daftar anotasi hotspot */
  annotations: AnnotationData[];
}

/** Props untuk komponen Annotation */
export interface AnnotationProps {
  data: AnnotationData;
  isActive: boolean;
  onClick: (data: AnnotationData) => void;
  index: number;
}

/** Props untuk komponen InfoPanel */
export interface InfoPanelProps {
  annotation: AnnotationData | null;
  onClose: () => void;
}

/** Props untuk komponen ModelViewer */
export interface ModelViewerProps {
  modelPath: string;
  annotations: AnnotationData[];
  onAnnotationClick: (data: AnnotationData) => void;
  activeAnnotationId: string | null;
  /** Aktifkan mode koordinat picker: klik model → catat posisi */
  debugMode?: boolean;
  /** Dipanggil saat user klik model dalam debug mode */
  onPickCoords?: (pos: [number, number, number]) => void;
}
