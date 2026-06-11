/**
 * app/layout.tsx
 * Root layout — diterapkan ke semua halaman.
 * Setup font Inter, metadata global, dan Navbar.
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";

// Muat font Inter dari Google Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Media Pembelajaran AR — Konsep Elektronika",
    template: "%s | KonsepElektronika",
  },
  description:
    "Media pembelajaran interaktif berbasis Augmented Reality untuk mengenal komponen elektronika dasar: Resistor, Kapasitor, dan Induktor dalam model 3D.",
  keywords: [
    "elektronika",
    "resistor",
    "kapasitor",
    "induktor",
    "augmented reality",
    "media pembelajaran",
    "3D",
    "skripsi",
  ],
  authors: [{ name: "KonsepElektronika" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "Media Pembelajaran AR — Konsep Elektronika",
    description:
      "Eksplorasi komponen elektronika dalam model 3D interaktif.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="bg-gray-950 text-gray-100 antialiased font-sans">
        <Navbar />
        {/* Konten halaman dimulai di bawah Navbar (h-16 = 4rem) */}
        <main className="pt-16 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
