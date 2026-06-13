/**
 * components/three/SceneSetup.tsx
 * Setup lingkungan 3D: pencahayaan, shadows, dan OrbitControls.
 *
 * STRATEGI PENCAHAYAAN:
 * 1. "Synthetic Studio Lighting" — basis pencahayaan yang selalu aktif,
 *    tidak memerlukan fetch jaringan, menjamin warna model selalu terlihat.
 * 2. HDREnvironment — opsional, dibungkus ErrorBoundary+Suspense.
 *    Jika preset HDR berhasil diunduh dari CDN, kualitas refleksi meningkat.
 *    Jika gagal, fallback ke synthetic lighting yang sudah cukup baik.
 */

"use client";

import { useEffect, Suspense, Component, ReactNode } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";

/* ── ErrorBoundary khusus untuk Environment HDR ───────────────────── */
class EnvErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return null; // silent fallback
    return this.props.children;
  }
}

/* ── Synthetic Studio Lighting ────────────────────────────────────────
   Simulasi 3-point studio lighting (key + fill + rim) plus bounce & accent.
   Dirancang agar material PBR (roughness/metallic) terlihat vivid dan natural
   meski tanpa environment map HDR.
   ──────────────────────────────────────────────────────────────────── */
function StudioLights() {
  return (
    <>
      {/* HEMISPHERE — langit cerah di atas, lantai gelap di bawah */}
      <hemisphereLight args={["#c8dcff", "#1a1040", 1.0]} />

      {/* KEY LIGHT — cahaya utama dari sudut 45° atas-kiri-depan */}
      <directionalLight
        position={[4, 7, 5]}
        intensity={2.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />

      {/* FILL LIGHT — melembutkan bayangan dari sisi berlawanan key */}
      <directionalLight position={[-4, 3, -3]} intensity={0.9} color="#a0b8e8" />

      {/* RIM LIGHT — memberi outline cahaya dari belakang-atas */}
      <directionalLight position={[1, 7, -6]} intensity={0.7} color="#ffffff" />

      {/* BOUNCE LIGHT — pantulan dari lantai studio */}
      <directionalLight position={[0, -5, 2]} intensity={0.3} color="#ffe0ff" />

      {/* ACCENT biru dari kiri */}
      <pointLight position={[-6, 2, -2]} intensity={1.5} color="#6366f1" decay={2} />

      {/* ACCENT ungu dari kanan-depan */}
      <pointLight position={[4, 0, 3]} intensity={0.9} color="#a855f7" decay={2} />

      {/* FRONT FILL — mencegah area terlalu gelap di depan */}
      <pointLight position={[0, 0.5, 6]} intensity={0.5} color="#f0f4ff" decay={2} />
    </>
  );
}

/* ── HDR Environment (opsional, dengan error boundary) ────────────── */
function HDREnvironment() {
  return (
    <EnvErrorBoundary>
      <Suspense fallback={null}>
        <Environment preset="studio" background={false} />
      </Suspense>
    </EnvErrorBoundary>
  );
}

/* ── Main SceneSetup ─────────────────────────────────────────────── */
export default function SceneSetup() {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / size.height;
    if (aspect < 1) {
      // Mobile portrait: mundurkan kamera agar model tidak terpotong
      const targetZ = Math.min(6.5, Math.max(4, 4 / (aspect * 1.1)));
      camera.position.set(0, 0, targetZ);
    } else {
      camera.position.set(0, 0, 4);
    }
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [size.width, size.height, camera]);

  return (
    <>
      {/* ── Kontrol orbit kamera ─────────────────────────────── */}
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.05}
        minDistance={0.5}
        maxDistance={8}
        maxPolarAngle={Math.PI * 0.85}
      />

      {/* ── Ambient base (sangat rendah, dikompensasi StudioLights) */}
      <ambientLight intensity={0.15} />

      {/* ── Pencahayaan sintetis studio — selalu aktif ─────────── */}
      <StudioLights />

      {/* ── HDR environment map — opsional, gagal = silent skip ── */}
      <HDREnvironment />

      {/* ── Bayangan kontak di bawah model ───────────────────── */}
      <ContactShadows
        position={[0, -0.8, 0]}
        opacity={0.45}
        scale={8}
        blur={2.5}
        far={2}
        color="#1e1b4b"
      />
    </>
  );
}
