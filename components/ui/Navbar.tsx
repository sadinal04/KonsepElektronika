/**
 * components/ui/Navbar.tsx
 * Navigasi atas dengan link ke semua halaman komponen.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/resistor", label: "Resistor" },
  { href: "/capacitor", label: "Kapasitor" },
  { href: "/inductor", label: "Induktor" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              KonsepElektronika
            </span>
          </Link>

          {/* Navigation Links - Scrollable on mobile */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 -mb-1 [&::-webkit-scrollbar]:hidden min-w-0 flex-1 justify-end ml-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
