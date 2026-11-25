"use client";

import Link from "next/link";
import {
  MessageCircle,
  MapPin,
  ShieldCheck,
  ExternalLink,
  ChevronUp,
  Award,
  Globe2,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { InstagramIcon } from "@/components/BrandIcons";
import { DOCTOR_INFO, getWhatsAppUrl } from "@/lib/constants";
import { DoctorLogo } from "@/components/DoctorLogo";

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#0B1A2C] via-[#081422] to-[#050C16] text-white border-t border-white/10">
      {/* Subtle ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-12 w-96 h-96 rounded-full bg-institutional/15 blur-3xl -z-10"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-12">
        {/* Top Connection Strip */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-5 sm:p-6 mb-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 backdrop-blur-sm">
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-white/90">
            <span className="inline-flex items-center gap-1.5 font-semibold text-light-blue">
              <MapPin className="w-4 h-4 text-light-blue" />
              São Paulo/SP
            </span>
            <span className="text-white/30">•</span>
            <span className="font-bold text-white tracking-wide">{DOCTOR_INFO.crm}</span>
            <span className="text-white/30">•</span>
            <span className="text-white/90 font-medium">
              {DOCTOR_INFO.specialty} · Transplante de Medula Óssea (TMO)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={DOCTOR_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram do Dr. Celso Massumoto"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-2 text-xs font-semibold text-white transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-light-blue" />
              <span>{DOCTOR_INFO.instagramHandle}</span>
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp do Dr. Celso Massumoto"
              className="inline-flex items-center gap-2 rounded-full bg-institutional hover:bg-white hover:text-navy px-4 py-2 text-xs font-semibold text-white transition-all shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Contato WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-14 border-b border-white/10">
          {/* Col 1: Identity & Authority */}
          <div className="lg:col-span-5 space-y-5">
            <DoctorLogo isDark />

            <p className="text-sm text-white/80 leading-relaxed max-w-md">
              Prática médica baseada no mais rigoroso pensamento científico, na atualização contínua e no acolhimento humano. Formação com Doutorado e Mestrado pela FMUSP e fellowship internacional no Fred Hutchinson Cancer Research Center (Seattle, EUA).
            </p>

            {/* Quick credentials badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 text-[11px] font-medium text-white/90">
                <Globe2 className="w-3.5 h-3.5 text-light-blue" />
                Fred Hutch (Seattle, EUA)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 text-[11px] font-medium text-white/90">
                <Award className="w-3.5 h-3.5 text-light-blue" />
                Doutor & Mestre FMUSP
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 text-[11px] font-medium text-white/90">
                <Building2 className="w-3.5 h-3.5 text-light-blue" />
                Oncocenter
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-light-blue">
              Páginas do Portal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-white/75 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-white/75 hover:text-white transition-colors">
                  Trajetória e Linha do Tempo
                </Link>
              </li>
              <li>
                <Link href="/atuacao" className="text-white/75 hover:text-white transition-colors">
                  Áreas de Atuação
                </Link>
              </li>
              <li>
                <Link href="/tmo" className="text-white/75 hover:text-white transition-colors">
                  Transplante de Medula Óssea (TMO)
                </Link>
              </li>
              <li>
                <Link href="/depoimentos" className="text-white/75 hover:text-white transition-colors">
                  Depoimentos de Pacientes
                </Link>
              </li>
              <li>
                <Link href="/conteudos" className="text-white/75 hover:text-white transition-colors">
                  Conteúdos e Educação em Saúde
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-white/75 hover:text-white transition-colors">
                  Contato e Agendamento
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Consulting Rooms & Address */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-light-blue">
              Localização e Atendimento
            </h4>
            
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-light-blue shrink-0 mt-1" />
                <div className="space-y-0.5 text-xs sm:text-sm">
                  <p className="font-semibold text-white">Consultório Bela Vista</p>
                  <p className="text-white/75 leading-relaxed">{DOCTOR_INFO.address.full}</p>
                </div>
              </div>
              <a
                href={DOCTOR_INFO.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-light-blue hover:text-white transition-colors pl-6"
              >
                Traçar rota no mapa
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-semibold text-white">Atuação Institucional</p>
                <p className="text-white/70">Oncocenter — Direção Clínica</p>
              </div>
              <a
                href={DOCTOR_INFO.institutionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-3 py-1 font-semibold text-light-blue hover:bg-white/10 transition-colors"
              >
                Visitar site
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Compliance & Ethics */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-white/70 leading-relaxed">
          <div className="space-y-1.5 max-w-2xl">
            <p className="text-white font-medium">
              © 2026 {DOCTOR_INFO.name} — {DOCTOR_INFO.specialty} ({DOCTOR_INFO.crm}). Todos os direitos reservados.
            </p>
            <p className="text-white/60 text-[11px] leading-relaxed">
              Conteúdo de caráter exclusivamente informativo e educativo, em estrita conformidade com as diretrizes do Conselho Federal de Medicina (Resolução CFM nº 2.336/2023). Não substitui a consulta médica presencial ou individualizada.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs shrink-0">
            <Link
              href="/privacidade"
              className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-light-blue" />
              Privacidade & LGPD
            </Link>
            <Link
              href="/admin"
              className="text-white/40 hover:text-white/80 transition-colors"
            >
              Painel
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-light-blue hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Voltar ao topo da página"
            >
              <span>Voltar ao topo</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
