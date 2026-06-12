/**
 * components/three/ModelViewer.tsx
 * Komponen utama Canvas 3D yang mengintegrasikan:
 * - Canvas React Three Fiber
 * - Suspense + LoadingScreen
 * - ErrorBoundary untuk graceful error handling
 * - Model GLB
 * - Annotation hotspots
 * - SceneSetup (lighting + controls)
 */

"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense, Component, ReactNode, ErrorInfo } from "react";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Model from "@/components/three/Model";
import SceneSetup from "@/components/three/SceneSetup";
import Annotation from "@/components/three/Annotation";
import { ModelViewerProps, AnnotationData } from "@/types";

// ── Error Boundary ───────────────────────────────────────────
interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class ModelErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ModelViewer] Error loading 3D model:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950 gap-4">
          {/* Ikon error */}
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-gray-200 font-semibold mb-1">
              Gagal Memuat Model 3D
            </p>
            <p className="text-gray-500 text-sm max-w-xs">
              {this.state.errorMessage || "Terjadi kesalahan saat memuat file model."}
            </p>
          </div>
          <button
            onClick={this.handleRetry}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Inner scene (di dalam Canvas) ────────────────────────────
interface SceneProps {
  modelPath: string;
  annotations: AnnotationData[];
  onAnnotationClick: (data: AnnotationData) => void;
  activeAnnotationId: string | null;
  debugMode?: boolean;
  onPickCoords?: (pos: [number, number, number]) => void;
}

function Scene({
  modelPath,
  annotations,
  onAnnotationClick,
  activeAnnotationId,
  debugMode,
  onPickCoords,
}: SceneProps) {
  return (
    <>
      <SceneSetup />
      <Suspense fallback={null}>
        {/* Model 3D dengan support debug picker */}
        <Model
          modelPath={modelPath}
          debugMode={debugMode}
          onPickCoords={onPickCoords}
        />
        {/* Hotspot anotasi — disembunyikan saat mode debug aktif */}
        {!debugMode && annotations.map((ann) => (
          <Annotation
            key={ann.id}
            data={ann}
            isActive={activeAnnotationId === ann.id}
            onClick={onAnnotationClick}
          />
        ))}
      </Suspense>
    </>
  );
}

// ── Komponen publik ──────────────────────────────────────────
export default function ModelViewer({
  modelPath,
  annotations,
  onAnnotationClick,
  activeAnnotationId,
  debugMode,
  onPickCoords,
}: ModelViewerProps) {
  return (
    <div
      className="relative w-full h-full"
      style={{ cursor: debugMode ? "crosshair" : "grab" }}
    >
      <ModelErrorBoundary>
        {/* LoadingScreen ditampilkan selama Canvas belum siap */}
        <Suspense fallback={<LoadingScreen />}>
          <Canvas
            camera={{ position: [0, 0, 4], fov: 45 }}
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: "high-performance",
            }}
            shadows={{ type: THREE.PCFShadowMap }}
            dpr={[1, 2]}
          >
            <Scene
              modelPath={modelPath}
              annotations={annotations}
              onAnnotationClick={onAnnotationClick}
              activeAnnotationId={activeAnnotationId}
              debugMode={debugMode}
              onPickCoords={onPickCoords}
            />
          </Canvas>
        </Suspense>
      </ModelErrorBoundary>
    </div>
  );
}
