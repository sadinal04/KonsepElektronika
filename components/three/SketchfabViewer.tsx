/**
 * components/three/SketchfabViewer.tsx
 * Embed Sketchfab 3D model viewer menggunakan iframe.
 * Digunakan untuk komponen aktif (Dioda, Transistor) yang modelnya
 * di-host di Sketchfab.
 */

"use client";

interface SketchfabViewerProps {
  url: string;
  title: string;
}

export default function SketchfabViewer({ url, title }: SketchfabViewerProps) {
  return (
    <div className="relative w-full h-full min-h-0">
      <iframe
        title={title}
        src={url}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
        className="absolute inset-0 w-full h-full"
        style={{ border: "none" }}
      />
    </div>
  );
}
