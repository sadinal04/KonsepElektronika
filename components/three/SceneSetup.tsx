/**
 * components/three/SceneSetup.tsx
 * Setup lingkungan 3D: pencahayaan, environment, shadows, dan OrbitControls.
 * Digunakan di dalam Canvas React Three Fiber.
 */

"use client";

import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";

export default function SceneSetup() {
  return (
    <>
      {/* ── Kontrol kamera: rotate, zoom, pan ──────────────── */}
      <OrbitControls
        makeDefault
        enableDamping          // Kelembutan saat berhenti berputar
        dampingFactor={0.05}
        minDistance={0.5}      // Batas zoom in
        maxDistance={8}        // Batas zoom out
        maxPolarAngle={Math.PI * 0.85} // Batas sudut vertikal
      />

      {/* ── Pencahayaan ──────────────────────────────────────── */}
      {/* Cahaya ambient: dasar agar tidak ada bagian gelap total */}
      <ambientLight intensity={0.4} />

      {/* Cahaya utama dari atas-kiri */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Cahaya pengisi dari bawah untuk mengurangi bayangan keras */}
      <directionalLight position={[-3, -3, -3]} intensity={0.3} />

      {/* Cahaya aksen biru dari samping kanan */}
      <pointLight position={[-5, 2, -3]} intensity={0.8} color="#6366f1" />

      {/* Cahaya hangat dari depan */}
      <pointLight position={[3, 1, 4]} intensity={0.5} color="#f0abfc" />

      {/* ── Environment HDR ──────────────────────────────────── */}
      {/* Memberikan refleksi realistis pada material metalik */}
      <Environment preset="studio" />

      {/* ── Bayangan kontak di bawah model ─────────────────── */}
      <ContactShadows
        position={[0, -0.8, 0]}
        opacity={0.4}
        scale={8}
        blur={2.5}
        far={2}
        color="#1e1b4b"
      />
    </>
  );
}
