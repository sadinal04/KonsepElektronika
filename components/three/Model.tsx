/**
 * components/three/Model.tsx
 * Loader model GLB menggunakan useGLTF dari @react-three/drei.
 * Komponen ini di-suspend selama model loading (dipakai dengan Suspense).
 *
 * Fix:
 * - Reset transform di awal useEffect → aman dari bug GLTF cache
 *   (useGLTF menyimpan scene yang sama; tanpa reset, transform menumpuk)
 * - TARGET_SIZE = 2 → ukuran model seperti semula
 * - scene.position.set() menggantikan .sub() → tidak terpengaruh nilai awal
 */

"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ModelProps {
  modelPath: string;
  /** Jika true, klik pada model → memanggil onPickCoords */
  debugMode?: boolean;
  /** Callback koordinat world-space saat debug klik */
  onPickCoords?: (pos: [number, number, number]) => void;
}

/** Ukuran dimensi terbesar model dalam world units setelah normalisasi */
const TARGET_SIZE = 2;

export default function Model({
  modelPath,
  debugMode = false,
  onPickCoords,
}: ModelProps) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    if (!scene) return;

    // ── 1. Reset transform (fix bug GLTF cache) ──────────────
    // useGLTF menyimpan (cache) scene yang sama antar navigasi.
    // Tanpa reset, transform dari kunjungan sebelumnya akan menumpuk.
    scene.scale.set(1, 1, 1);
    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);
    scene.updateMatrixWorld(true); // perbarui matriks dunia setelah reset

    // ── 2. Aktifkan shadow pada semua mesh ────────────────────
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.envMapIntensity = 1.2;
          child.material.needsUpdate = true;
        }
      }
    });

    // ── 3. Hitung bounding box dalam model space asli ─────────
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    if (maxDim === 0) return; // jaga-jaga model kosong

    const scale = TARGET_SIZE / maxDim;

    // ── 4. Terapkan scale lalu posisi ─────────────────────────
    // Urutan penting: scale dulu, baru hitung center dalam world space.
    scene.scale.setScalar(scale);
    // Center world-space setelah scaling = center_model * scale
    // Geser scene agar center tepat di origin (0,0,0)
    scene.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }, [scene]);

  return (
    <group
      ref={groupRef}
      /**
       * DEBUG MODE: klik model → e.point = koordinat world-space.
       * Salin nilai ke annotations.ts sebagai posisi hotspot.
       */
      onPointerDown={(e) => {
        if (debugMode && onPickCoords) {
          e.stopPropagation();
          onPickCoords([
            parseFloat(e.point.x.toFixed(3)),
            parseFloat(e.point.y.toFixed(3)),
            parseFloat(e.point.z.toFixed(3)),
          ]);
        }
      }}
    >
      <primitive object={scene} />
    </group>
  );
}
