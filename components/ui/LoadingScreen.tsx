/**
 * components/ui/LoadingScreen.tsx
 * Overlay loading yang ditampilkan saat model 3D belum selesai dimuat.
 * Digunakan sebagai fallback Suspense pada ModelViewer.
 */

export default function LoadingScreen() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950 z-10">
      {/* Spinner animasi */}
      <div className="relative w-20 h-20 mb-6">
        {/* Ring luar */}
        <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20" />
        {/* Ring berputar */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 animate-spin" />
        {/* Titik tengah */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
        </div>
      </div>

      {/* Teks loading */}
      <p className="text-gray-300 text-sm font-medium tracking-widest uppercase animate-pulse">
        Memuat Model 3D...
      </p>
      <p className="text-gray-600 text-xs mt-2">Harap tunggu sebentar</p>
    </div>
  );
}
