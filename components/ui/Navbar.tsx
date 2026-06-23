"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

/* ── Nav link data ─────────────────────────────────────────── */
const navLinks = [
  {
    href: "/",
    label: "Home",
    desc: "Halaman Utama",
    iconColor: "text-indigo-600",
    activeBg: "bg-indigo-50 border-indigo-200 text-indigo-700",
    category: null,
  },
  // Pasif
  {
    href: "/resistor",
    label: "Resistor",
    desc: "Penghambat Arus",
    iconColor: "text-orange-600",
    activeBg: "bg-orange-50 border-orange-200 text-orange-700",
    category: "pasif" as const,
  },
  {
    href: "/capacitor",
    label: "Kapasitor",
    desc: "Penyimpan Muatan",
    iconColor: "text-blue-600",
    activeBg: "bg-blue-50 border-blue-200 text-blue-700",
    category: "pasif" as const,
  },
  {
    href: "/inductor",
    label: "Induktor",
    desc: "Penyimpan Magnet",
    iconColor: "text-purple-600",
    activeBg: "bg-purple-50 border-purple-200 text-purple-700",
    category: "pasif" as const,
  },
  // Aktif
  {
    href: "/dioda",
    label: "Dioda",
    desc: "Penyearah Arus",
    iconColor: "text-green-600",
    activeBg: "bg-green-50 border-green-200 text-green-700",
    category: "aktif" as const,
  },
  {
    href: "/transistor",
    label: "Transistor",
    desc: "Penguat Sinyal",
    iconColor: "text-amber-600",
    activeBg: "bg-amber-50 border-amber-200 text-amber-700",
    category: "aktif" as const,
  },
  {
    href: "/ic",
    label: "IC",
    desc: "Integrated Circuit",
    iconColor: "text-cyan-600",
    activeBg: "bg-cyan-50 border-cyan-200 text-cyan-700",
    category: "aktif" as const,
  },
];

/* ── SVG Icons ─────────────────────────────────────────────── */
function Ico({ size = 18, children }: { size?: number; children: React.ReactNode }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

function getNavIcon(href: string, size = 18) {
  switch (href) {
    case "/":
      return <Ico size={size}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></Ico>;
    case "/resistor":
      return <Ico size={size}><path d="M2 12h4l2-6 3 12 3-12 3 12 2-6h3"/></Ico>;
    case "/capacitor":
      return <Ico size={size}><path d="M2 12h7M15 12h7M11 5v14M13 5v14"/></Ico>;
    case "/inductor":
      return <Ico size={size}><path d="M2 12h2a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0h2"/></Ico>;
    case "/dioda":
      return <Ico size={size}><path d="M6 7l8 5-8 5V7z"/><line x1="14" y1="7" x2="14" y2="17"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="14" y1="12" x2="22" y2="12"/></Ico>;
    case "/transistor":
      return <Ico size={size}><line x1="3" y1="12" x2="9" y2="12"/><line x1="9" y1="5" x2="9" y2="19"/><path d="M9 8l9-4M9 16l9 4"/></Ico>;
    case "/ic":
      return <Ico size={size}><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M8 6V4M12 6V4M16 6V4M8 20v-2M12 20v-2M16 20v-2M4 9H2M4 12H2M4 15H2M20 9h2M20 12h2M20 15h2"/></Ico>;
    default: return null;
  }
}

function IconMenu({ size = 20 }: { size?: number }) {
  return <Ico size={size}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></Ico>;
}
function IconClose({ size = 20 }: { size?: number }) {
  return <Ico size={size}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Ico>;
}
function IconChevronRight({ size = 16 }: { size?: number }) {
  return <Ico size={size}><polyline points="9 18 15 12 9 6"/></Ico>;
}

function LogoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="8" fill="url(#logo-grad)"/>
      <path d="M6 14h3l2-5 3 10 3-10 2 5h3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="28" y2="28">
          <stop stopColor="#6366f1"/><stop offset="1" stopColor="#a855f7"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────── */
export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { setIsOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Split links by category
  const pasifLinks = navLinks.filter(l => l.category === "pasif");
  const aktifLinks = navLinks.filter(l => l.category === "aktif");
  const homeLink   = navLinks.find(l => l.href === "/")!;

  return (
    <>
      {/* ── Navbar Bar ──────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(15,23,42,0.08)",
          boxShadow: "0 1px 12px rgba(15,23,42,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="transition-transform duration-200 group-hover:scale-105"><LogoIcon/></div>
              <div className="flex flex-col leading-none">
                <span className="text-sm sm:text-base font-bold"
                  style={{
                    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                  KonsepElektronika
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-400 tracking-widest uppercase font-medium hidden xs:block">
                  Media Pembelajaran AR
                </span>
              </div>
            </Link>

            {/* ── Desktop Navigation ─────────────────────────── */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Home */}
              <Link href="/"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  pathname === "/" ? homeLink.activeBg : "text-slate-500 hover:text-slate-900 hover:bg-slate-100 border-transparent"
                }`}>
                Home
              </Link>
              {/* Separator */}
              <div className="w-px h-4 bg-slate-200 mx-1"/>
              {/* Pasif links */}
              {pasifLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    pathname === link.href ? link.activeBg : "text-slate-500 hover:text-slate-900 hover:bg-slate-100 border-transparent"
                  }`}>
                  {link.label}
                </Link>
              ))}
              {/* Separator */}
              <div className="w-px h-4 bg-slate-200 mx-1"/>
              {/* Aktif links */}
              {aktifLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    pathname === link.href ? link.activeBg : "text-slate-500 hover:text-slate-900 hover:bg-slate-100 border-transparent"
                  }`}>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* ── Tablet Nav (icons only) ────────────────────── */}
            <div className="hidden sm:flex lg:hidden items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href} title={link.label}
                    className={`relative flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 border group ${
                      isActive
                        ? `bg-indigo-50 border-indigo-200 ${link.iconColor}`
                        : "text-slate-400 hover:text-slate-700 hover:bg-slate-100 border-transparent"
                    }`}>
                    {getNavIcon(link.href, 16)}
                    <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none border border-slate-700 z-10">
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* ── Mobile Hamburger ──────────────────────────── */}
            <button
              id="navbar-mobile-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="flex sm:hidden items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 focus:outline-none"
              style={{
                background: isOpen ? "rgba(79,70,229,0.1)" : "rgba(15,23,42,0.05)",
                border: isOpen ? "1px solid rgba(79,70,229,0.3)" : "1px solid rgba(15,23,42,0.1)",
                color: isOpen ? "#4f46e5" : "#64748b",
              }}
              aria-label={isOpen ? "Tutup Menu" : "Buka Menu"}
              aria-expanded={isOpen}
            >
              <span className="transition-transform duration-200" style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
                {isOpen ? <IconClose/> : <IconMenu/>}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Backdrop ─────────────────────────────────── */}
      <div
        className="fixed inset-0 z-40 sm:hidden transition-opacity duration-300"
        style={{ background: "rgba(15,23,42,0.5)", opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none" }}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile Drawer ───────────────────────────────────── */}
      <div
        id="navbar-mobile-menu"
        className="fixed top-16 left-0 right-0 z-50 sm:hidden transition-all duration-300 ease-out overflow-y-auto"
        style={{
          background: "#ffffff",
          borderBottom: "1px solid rgba(15,23,42,0.08)",
          boxShadow: "0 8px 32px rgba(15,23,42,0.1)",
          transform: isOpen ? "translateY(0)" : "translateY(-105%)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          maxHeight: "calc(100vh - 4rem)",
        }}
      >
        {/* Home */}
        <div className="px-3 pt-4 pb-2">
          <Link href="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
              pathname === "/" ? "bg-indigo-50" : "hover:bg-slate-50"
            }`}
            style={{ border: pathname === "/" ? "1px solid rgba(79,70,229,0.2)" : "1px solid transparent" }}
          >
            <span className={`flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 text-indigo-600`}
              style={{ background: "rgba(79,70,229,0.08)", border: "1px solid rgba(79,70,229,0.15)" }}>
              {getNavIcon("/", 18)}
            </span>
            <div className="flex-1"><div className="text-sm font-semibold text-slate-800">Home</div><div className="text-xs text-slate-400">Halaman Utama</div></div>
            <span className={pathname === "/" ? "text-indigo-500" : "text-slate-300"}><IconChevronRight/></span>
          </Link>
        </div>

        {/* Pasif Section */}
        <div className="px-4 pt-3 pb-1">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <span className="inline-block px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-200">A</span>
            Komponen Pasif
          </p>
        </div>
        <div className="px-3 pb-2 space-y-1">
          {pasifLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${isActive ? "bg-slate-50" : "hover:bg-slate-50"}`}
                style={{ border: isActive ? "1px solid rgba(79,70,229,0.15)" : "1px solid transparent" }}>
                <span className={`flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 ${link.iconColor}`}
                  style={{ background: isActive ? "rgba(79,70,229,0.08)" : "rgba(15,23,42,0.04)", border: "1px solid rgba(15,23,42,0.07)" }}>
                  {getNavIcon(link.href, 18)}
                </span>
                <div className="flex-1">
                  <div className={`text-sm font-semibold ${isActive ? "text-slate-900" : "text-slate-600"}`}>{link.label}</div>
                  <div className="text-xs text-slate-400">{link.desc}</div>
                </div>
                <span className={isActive ? "text-indigo-500" : "text-slate-300"}><IconChevronRight/></span>
              </Link>
            );
          })}
        </div>

        {/* Aktif Section */}
        <div className="px-4 pt-3 pb-1">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <span className="inline-block px-1.5 py-0.5 rounded bg-green-50 text-green-600 border border-green-200">B</span>
            Komponen Aktif
          </p>
        </div>
        <div className="px-3 pb-4 space-y-1">
          {aktifLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${isActive ? "bg-slate-50" : "hover:bg-slate-50"}`}
                style={{ border: isActive ? "1px solid rgba(34,197,94,0.2)" : "1px solid transparent" }}>
                <span className={`flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 ${link.iconColor}`}
                  style={{ background: isActive ? "rgba(34,197,94,0.08)" : "rgba(15,23,42,0.04)", border: "1px solid rgba(15,23,42,0.07)" }}>
                  {getNavIcon(link.href, 18)}
                </span>
                <div className="flex-1">
                  <div className={`text-sm font-semibold ${isActive ? "text-slate-900" : "text-slate-600"}`}>{link.label}</div>
                  <div className="text-xs text-slate-400">{link.desc}</div>
                </div>
                <span className={isActive ? "text-green-600" : "text-slate-300"}><IconChevronRight/></span>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-4 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-[10px] text-slate-400 text-center">Media Pembelajaran Elektronika 3D</p>
        </div>
      </div>
    </>
  );
}
