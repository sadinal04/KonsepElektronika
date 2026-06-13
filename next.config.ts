import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Transpilasi paket Three.js dan React Three Fiber agar kompatibel
   * dengan Next.js App Router (ESM → CJS transform).
   */
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  /**
   * Konfigurasi Turbopack (default bundler Next.js 16+).
   */
  turbopack: {},
};

export default nextConfig;

