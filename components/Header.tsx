"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, MapPin } from "lucide-react";
import { DOCTOR_INFO } from "@/lib/constants";
import { InstagramIcon } from "@/components/BrandIcons";
import { DoctorLogo } from "@/components/DoctorLogo";

const NAV_ITEMS = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Atuação", href: "/atuacao" },
  { label: "Depoimentos", href: "/depoimentos" },
  { label: "Conteúdos", href: "/conteudos" },
  { label: "Contato", href: "/contato" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
      {/* Barra Azul Superior com Localização e Instagram */}
      <div className="bg-navy text-white border-b border-white/10 text-xs py-2 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-end gap-3 sm:gap-4 text-[11px] sm:text-xs text-white/90">
          <span className="inline-flex items-center gap-1.5 font-semibold text-light-blue">
            <MapPin className="w-3.5 h-3.5 text-light-blue" />
            São Paulo/SP
          </span>

          <span className="text-white/30">•</span>

          <a
            href={DOCTOR_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram do Dr. Celso Massumoto"
            className="inline-flex items-center gap-1.5 font-semibold text-light-blue hover:text-white transition-colors"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-light-blue" />
            <span>{DOCTOR_INFO.instagramHandle}</span>
          </a>
        </div>
      </div>

      {/* Navbar Principal com Logotipo e Menu Limpo */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-border-subtle shadow-[0_4px_24px_rgba(20,45,80,0.06)] py-3"
            : "bg-white/90 backdrop-blur-sm border-b border-border-subtle/50 py-3.5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between gap-6">
          {/* Left: Brand Logo Lockup */}
          <Link
            href="/"
            className="focus:outline-none shrink-0"
            aria-label="Página Inicial Dr. Celso Massumoto"
          >
            <DoctorLogo />
          </Link>

          {/* Right: Main Navigation Menu (limpo e sem poluição) */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegação principal">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    active
                      ? "text-navy font-bold"
                      : "text-text-muted hover:text-navy"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-institutional rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-border-subtle text-navy hover:bg-soft-gray transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border-subtle shadow-lg">
          <nav className="mx-auto max-w-7xl px-5 py-5 flex flex-col gap-3">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    active
                      ? "bg-light-blue text-navy font-semibold"
                      : "text-text-main hover:bg-soft-gray"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
