"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  {
    href: "/",
    label: "Home",
    desc: "Halaman Utama",
    color: "from-indigo-500/20 to-indigo-600/20",
    iconColor: "text-indigo-400",
    activeBg: "bg-indigo-500/15 border-indigo-500/30 text-indigo-300",
  },
  {
    href: "/resistor",
    label: "Resistor",
    desc: "Penghambat Arus",
    color: "from-orange-500/20 to-orange-600/20",
    iconColor: "text-orange-400",
    activeBg: "bg-orange-500/15 border-orange-500/30 text-orange-300",
  },
  {
    href: "/capacitor",
    label: "Kapasitor",
    desc: "Penyimpan Muatan",
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-400",
    activeBg: "bg-blue-500/15 border-blue-500/30 text-blue-300",
  },
  {
    href: "/inductor",
    label: "Induktor",
    desc: "Penyimpan Magnet",
    color: "from-purple-500/20 to-purple-600/20",
    iconColor: "text-purple-400",
    activeBg: "bg-purple-500/15 border-purple-500/30 text-purple-300",
  },
];

/* ── SVG Icon components ──────────────────────────────────── */

function IconHome({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconResistor({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12h4l2-6 3 12 3-12 3 12 2-6h3" />
    </svg>
  );
}

function IconCapacitor({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12h7M15 12h7M11 5v14M13 5v14" />
    </svg>
  );
}

function IconInductor({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12h2a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0h2" />
    </svg>
  );
}

function IconMenu({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function IconClose({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconChevronRight({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function getNavIcon(href: string, size?: number) {
  switch (href) {
    case "/":
      return <IconHome size={size} />;
    case "/resistor":
      return <IconResistor size={size} />;
    case "/capacitor":
      return <IconCapacitor size={size} />;
    case "/inductor":
      return <IconInductor size={size} />;
    default:
      return null;
  }
}

/* ── Logo SVG ─────────────────────────────────────────────── */
function LogoIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="28" height="28" rx="8" fill="url(#logo-grad)" />
      <path
        d="M6 14h3l2-5 3 10 3-10 2 5h3"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="28" y2="28">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Main Navbar ──────────────────────────────────────────── */
export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll on mobile menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ── Main Navbar Bar ─────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16"
        style={{
          background: "rgba(3, 7, 18, 0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">

            {/* ── Logo / Brand ─────────────────────────────── */}
            <Link
              href="/"
              className="flex items-center gap-2.5 flex-shrink-0 group"
            >
              <div className="transition-transform duration-200 group-hover:scale-105">
                <LogoIcon />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-sm sm:text-base font-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, #818cf8 0%, #c084fc 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  KonsepElektronika
                </span>
                <span className="text-[9px] sm:text-[10px] text-gray-500 tracking-widest uppercase font-medium hidden xs:block">
                  Media Pembelajaran AR
                </span>
              </div>
            </Link>

            {/* ── Desktop Navigation (text only) ─────────── */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                      isActive
                        ? `${link.activeBg} border-current/30`
                        : "text-gray-400 hover:text-gray-200 hover:bg-white/5 border-transparent"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* ── Tablet Navigation (compact, icons only with tooltip) */}
            <div className="hidden sm:flex md:hidden items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    title={link.label}
                    className={`relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 border group ${
                      isActive
                        ? `bg-indigo-500/15 border-indigo-500/30 ${link.iconColor}`
                        : "text-gray-400 hover:text-gray-200 hover:bg-white/5 border-transparent"
                    }`}
                  >
                    {getNavIcon(link.href, 18)}
                    {/* Tooltip */}
                    <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-[10px] rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none border border-white/10 z-10">
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* ── Mobile Hamburger Button ───────────────────── */}
            <button
              id="navbar-mobile-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="flex sm:hidden items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 focus:outline-none"
              style={{
                background: isOpen
                  ? "rgba(99,102,241,0.15)"
                  : "rgba(255,255,255,0.05)",
                border: isOpen
                  ? "1px solid rgba(99,102,241,0.4)"
                  : "1px solid rgba(255,255,255,0.1)",
                color: isOpen ? "#a5b4fc" : "#9ca3af",
              }}
              aria-label={isOpen ? "Tutup Menu" : "Buka Menu"}
              aria-expanded={isOpen}
            >
              <span
                className="transition-transform duration-200"
                style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
              >
                {isOpen ? <IconClose /> : <IconMenu />}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay Backdrop ─────────────────────── */}
      <div
        className="fixed inset-0 z-40 sm:hidden transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.6)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile Menu Drawer ───────────────────────────────── */}
      <div
        id="navbar-mobile-menu"
        className="fixed top-16 left-0 right-0 z-50 sm:hidden transition-all duration-300 ease-out"
        style={{
          background: "#0a0f1e",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          transform: isOpen ? "translateY(0)" : "translateY(-100%)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          maxHeight: "calc(100vh - 4rem)",
          overflowY: "auto",
        }}
      >
        {/* Header section */}
        <div
          className="px-4 pt-5 pb-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
            Navigasi
          </p>
        </div>

        {/* Nav links */}
        <nav className="px-3 py-3 space-y-1.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? "bg-white/5"
                    : "hover:bg-white/5 active:bg-white/10"
                }`}
                style={{
                  border: isActive
                    ? "1px solid rgba(99,102,241,0.25)"
                    : "1px solid transparent",
                }}
              >
                {/* Icon container */}
                <span
                  className={`flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 ${link.iconColor}`}
                  style={{
                    background: isActive
                      ? "rgba(99,102,241,0.15)"
                      : "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {getNavIcon(link.href, 18)}
                </span>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-sm font-semibold ${
                      isActive ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {link.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{link.desc}</div>
                </div>

                {/* Arrow */}
                <span
                  className={`flex-shrink-0 transition-all duration-200 ${
                    isActive
                      ? "text-indigo-400 translate-x-0.5"
                      : "text-gray-600"
                  }`}
                >
                  <IconChevronRight />
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className="px-4 py-4 mt-1"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-[10px] text-gray-600 text-center leading-relaxed">
            Media Pembelajaran Elektronika 3D
          </p>
        </div>
      </div>
    </>
  );
}
