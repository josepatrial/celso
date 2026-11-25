import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  BookOpen,
  CalendarCheck,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  ExternalLink,
  Globe2,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { DOCTOR_INFO, DOCTOR_TIMELINE, getWhatsAppUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Trajetória Profissional | Dr. Celso Massumoto",
  description:
    "Conheça a trajetória do Dr. Celso Massumoto: Doutor e Mestre pela FMUSP, Hematology Fellow no Fred Hutchinson Cancer Research Center (Seattle, EUA) e Diretor Clínico da Oncocenter.",
};

export default function SobrePage() {
  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-light-blue/60 to-white py-16 lg:py-24 border-b border-border-subtle/70">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-border-subtle px-4 py-1.5 text-xs font-semibold text-navy shadow-sm">
              <span className="w-2 h-2 rounded-full bg-institutional" />
              <span>{DOCTOR_INFO.crm}</span>
              <span className="text-border-subtle">•</span>
              <span className="text-institutional">{DOCTOR_INFO.clinicalRole}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-navy leading-tight">
              {DOCTOR_INFO.name}
            </h1>
            
            <p className="text-base sm:text-lg text-institutional font-medium leading-relaxed">
              Médico Hematologista · Diretor Clínico da Oncocenter · Doutor e Mestre pela FMUSP · Hematology Fellow no Fred Hutchinson Cancer Research Center (Seattle – EUA)
            </p>
            
            <p className="text-base text-text-muted leading-relaxed max-w-2xl">
              Mais de quatro décadas dedicadas à medicina, combinando formação acadêmica no mais conceituado centro de pesquisa médica do Brasil (FMUSP) com especialização internacional no berço mundial do Transplante de Medula Óssea (Fred Hutchinson Cancer Research Center – Seattle, EUA).
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-white hover:bg-institutional transition-colors shadow-sm"
              >
                <CalendarCheck className="w-4 h-4" />
                Agendar consulta
              </a>
              <Link
                href="/atuacao"
                className="inline-flex items-center gap-2 rounded-full border border-navy/20 bg-white px-7 py-3.5 text-sm font-medium text-navy hover:bg-light-blue/50 transition-colors"
              >
                Ver áreas de atuação
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-tr from-light-blue via-soft-gray to-white border border-border-subtle/80 -z-10 shadow-lg" />
              <div className="rounded-3xl overflow-hidden border-2 border-white shadow-[0_20px_50px_rgba(20,45,80,0.12)]">
                <img
                  src="/images/dr-celso-massumoto.jpg"
                  alt="Dr. Celso Massumoto — Médico Hematologista e Diretor Clínico da Oncocenter"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destaques de Formação Internacional & Nacional */}
      <section className="py-20 bg-soft-gray/50 border-b border-border-subtle/70">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-institutional">
              Pilares Acadêmicos e Científicos
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy">
              Autoridade científica construída nas maiores referências do mundo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-border-subtle bg-white p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-light-blue text-institutional flex items-center justify-center">
                <Globe2 className="w-6 h-6" />
              </div>
              <span className="inline-block rounded-full bg-light-blue px-3 py-1 text-[11px] font-semibold text-navy">
                Seattle, USA (1990 – 1992)
              </span>
              <h3 className="font-serif text-2xl font-semibold text-navy">
                Fred Hutchinson Cancer Research Center
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Experiência internacional como <strong>Hematology Fellow</strong> no mais renomado centro de transplante de medula óssea do planeta, fundado pelo laureado com o Prêmio Nobel Dr. E. Donnall Thomas.
              </p>
            </div>

            <div className="rounded-3xl border border-border-subtle bg-white p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-light-blue text-institutional flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="inline-block rounded-full bg-light-blue px-3 py-1 text-[11px] font-semibold text-navy">
                FMUSP (1986, 1988, 1993)
              </span>
              <h3 className="font-serif text-2xl font-semibold text-navy">
                Doutorado, Mestrado e Residência na USP
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Residência em Hematologia (1986), Mestrado (1988) e Doutorado em Medicina (1993) pela <strong>Faculdade de Medicina da Universidade de São Paulo</strong>, referência máxima nacional.
              </p>
            </div>

            <div className="rounded-3xl border border-border-subtle bg-white p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-light-blue text-institutional flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="inline-block rounded-full bg-light-blue px-3 py-1 text-[11px] font-semibold text-navy">
                Liderança Clínica
              </span>
              <h3 className="font-serif text-2xl font-semibold text-navy">
                Diretor Clínico da Oncocenter
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Atuação como <strong>Diretor Clínico da Oncocenter</strong>, liderando protocolos assistenciais e assegurando excelência no atendimento hematológico e oncológico em São Paulo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Linha do Tempo Visual / Trajetória Completa */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 space-y-14">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-institutional">
              Cronologia Médica
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-navy">
              Uma trajetória de dedicação à ciência e à vida
            </h2>
            <p className="text-sm sm:text-base text-text-muted max-w-xl mx-auto leading-relaxed">
              Conheça as etapas da formação e atuação do Dr. Celso Massumoto ao longo dos anos.
            </p>
          </div>

          <div className="relative border-l-2 border-institutional/20 ml-4 sm:ml-32 space-y-12">
            {DOCTOR_TIMELINE.map((item, idx) => (
              <div key={idx} className="relative pl-7 sm:pl-10 group">
                {/* Timeline node */}
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-institutional group-hover:scale-125 transition-transform" />

                {/* Desktop year badge on left */}
                <div className="hidden sm:block absolute -left-36 top-1 text-right w-28">
                  <span className="font-serif text-lg font-bold text-navy">
                    {item.year}
                  </span>
                </div>

                <div className="rounded-2xl border border-border-subtle bg-white p-6 sm:p-7 shadow-sm group-hover:shadow-md group-hover:border-institutional/30 transition-all space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="sm:hidden text-xs font-bold text-institutional uppercase tracking-wider">
                      {item.year}
                    </span>
                    {item.badge && (
                      <span className="rounded-full bg-light-blue px-3 py-0.5 text-[11px] font-semibold text-navy">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl font-semibold text-navy">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs font-medium text-institutional uppercase tracking-wide">
                    {item.institution}
                  </p>

                  <p className="text-sm text-text-muted leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Institutional note */}
          <div className="rounded-3xl bg-light-blue/50 border border-institutional/15 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-institutional">
                <CheckCircle2 className="w-4 h-4" />
                Atendimento Especializado
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-navy">
                Agende uma consulta com o Dr. Celso Massumoto.
              </h3>
              <p className="text-sm text-text-muted">
                Atendimento em consultório no bairro Bela Vista em São Paulo e atuação na Oncocenter.
              </p>
            </div>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-white hover:bg-institutional transition-colors shadow-sm"
            >
              Agendar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
