/**
 * types/index.ts
 * Definisi TypeScript untuk seluruh aplikasi media pembelajaran
 */

/** Data satu hotspot anotasi pada model 3D */
export interface AnnotationData {
  /** Identifikasi unik hotspot */
  id: string;
  /** Judul anotasi yang tampil di panel info */
  title: string;
  /** Deskripsi detail anotasi */
  description: string;
  /** Posisi hotspot di ruang 3D [x, y, z] */
  position: [number, number, number];
}

/** Data keseluruhan satu komponen elektronika */
export interface ComponentData {
  /** Kunci unik komponen (resistor | capacitor | inductor) */
  id: "resistor" | "capacitor" | "inductor";
  /** Nama tampil komponen */
  name: string;
  /** Nama dalam bahasa Indonesia */
  nameBahasa: string;
  /** Deskripsi singkat komponen */
  description: string;
  /** Path ke file GLB di public/models/ */
  modelPath: string;
  /** Warna aksen kartu komponen (Tailwind class) */
  accentColor: string;
  /** Warna gradient kartu */
  gradientFrom: string;
  gradientTo: string;
  /** Ikon emoji */
  icon: string;
  /** Daftar anotasi hotspot */
  annotations: AnnotationData[];
}

/** Props untuk komponen Annotation */
export interface AnnotationProps {
  data: AnnotationData;
  isActive: boolean;
  onClick: (data: AnnotationData) => void;
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
