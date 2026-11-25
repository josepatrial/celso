import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarCheck,
  Droplets,
  ExternalLink,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  MapPin,
  MessageCircle,
  Microscope,
  Navigation,
  Play,
  Shield,
  ShieldCheck,
  Stethoscope,
  Activity,
  Globe2,
  Building2,
  Sparkles,
} from "lucide-react";
import { DOCTOR_INFO, PRACTICE_AREAS, getWhatsAppUrl } from "@/lib/constants";
import { readDb } from "@/lib/db";
import { ContactForm } from "@/components/ContactForm";
import { InstagramIcon } from "@/components/BrandIcons";
import { QuickScheduleWidget } from "@/components/QuickScheduleWidget";
import { FAQSection } from "@/components/FAQSection";
import { ClinicalSymptomsGuide } from "@/components/ClinicalSymptomsGuide";

const ICON_MAP = {
  droplet: Droplets,
  activity: Activity,
  microscope: Microscope,
  shield: Shield,
  heartPulse: HeartPulse,
  stethoscope: Stethoscope,
} as const;

async function DynamicArticlesSection() {
  await connection();
  const db = await readDb();
  const articles = [...db.articles]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 6);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {articles.map((article) => (
        <article
          key={article.id}
          className="group flex flex-col rounded-3xl border border-border-subtle bg-white overflow-hidden shadow-[0_4px_24px_rgba(20,45,80,0.03)] hover:shadow-[0_16px_40px_rgba(20,45,80,0.09)] hover:border-institutional/30 transition-all duration-300"
        >
          <Link
            href={`/conteudos/${article.slug}`}
            className="relative aspect-[16/10] overflow-hidden bg-soft-gray"
          >
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute top-4 left-4 rounded-full bg-white/95 backdrop-blur-sm px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy shadow-sm">
              {article.category}
            </span>
          </Link>
          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <div className="flex items-center gap-2 text-xs text-text-muted mb-2.5">
              <span>
                {new Date(article.publishedAt + "T12:00:00").toLocaleDateString(
                  "pt-BR",
                  { day: "2-digit", month: "short", year: "numeric" }
                )}
              </span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
            <h3 className="font-serif text-2xl font-semibold text-navy leading-snug group-hover:text-institutional transition-colors">
              <Link href={`/conteudos/${article.slug}`}>{article.title}</Link>
            </h3>
            <p className="mt-2.5 text-sm text-text-muted leading-relaxed line-clamp-3 flex-1">
              {article.summary}
            </p>
            <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between">
              <span className="text-xs font-medium text-navy">
                {article.author}
              </span>
              <Link
                href={`/conteudos/${article.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-institutional group-hover:gap-2 transition-all"
              >
                Ler artigo completo
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

async function DynamicInstagramSection() {
  await connection();
  const db = await readDb();
  const highlights = db.instagramHighlights.slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {highlights.map((item) => (
        <a
          key={item.id}
          href={item.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative rounded-3xl border border-border-subtle bg-white overflow-hidden shadow-[0_4px_20px_rgba(20,45,80,0.03)] hover:shadow-[0_16px_36px_rgba(20,45,80,0.09)] transition-all duration-300"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-soft-gray">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            {item.mediaType === "video" && (
              <span className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-navy/85 text-white flex items-center justify-center backdrop-blur-sm shadow-md">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </span>
            )}
            <div className="absolute bottom-3 left-3 rounded-full bg-white/95 backdrop-blur-sm px-3.5 py-1 text-[11px] font-medium text-navy flex items-center gap-1.5 shadow-sm">
              <InstagramIcon className="w-3 h-3 text-institutional" />
              {DOCTOR_INFO.instagramHandle}
            </div>
          </div>
          <div className="p-6 space-y-2">
            <h3 className="font-serif text-xl font-semibold text-navy group-hover:text-institutional transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-text-muted leading-relaxed line-clamp-2">
              {item.caption}
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-institutional pt-1">
              Ver publicação oficial
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* SEÇÃO 1 – HERO SECTION ELEVADA */}
      <section className="relative overflow-hidden bg-gradient-to-b from-light-blue/60 via-white to-white pt-10 pb-20 lg:pt-16 lg:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-36 -right-36 w-[640px] h-[640px] rounded-full bg-light-blue/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-12 right-12 w-[420px] h-[420px] rounded-full border border-dashed border-institutional/15"
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Text column */}
            <div className="lg:col-span-7 space-y-7 animate-fade-up">
              {/* Verified Status Tag */}
              <div className="inline-flex flex-wrap items-center gap-2.5 rounded-full bg-white border border-border-subtle px-4 py-1.5 text-xs font-medium text-navy shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-institutional opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-institutional" />
                </span>
                <span className="font-semibold">{DOCTOR_INFO.name}</span>
                <span className="text-border-subtle">•</span>
                <span className="text-institutional font-medium">
                  {DOCTOR_INFO.specialty} · {DOCTOR_INFO.crm}
                </span>
                <span className="hidden sm:inline text-border-subtle">•</span>
                <span className="hidden sm:inline text-navy font-semibold">{DOCTOR_INFO.clinicalRole}</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-semibold text-navy leading-[1.10] tracking-tight">
                Excelência em Hematologia, conhecimento científico e cuidado individualizado.
              </h1>

              <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl">
                Atuação especializada em Hematologia e Transplante de Medula Óssea. Formação com Doutorado e Mestrado pela FMUSP e fellowship no <strong>Fred Hutchinson Cancer Research Center (Seattle, EUA)</strong>.
              </p>

              <div className="pt-1">
                <Link
                  href="/sobre"
                  className="inline-flex items-center gap-2.5 rounded-full bg-navy px-8 py-4 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(20,45,80,0.18)] hover:bg-institutional transition-all duration-200 hover:-translate-y-0.5"
                >
                  Conheça minha trajetória
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* 4 Verified Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-border-subtle/80">
                <div className="rounded-2xl bg-white border border-border-subtle p-3.5 space-y-1 shadow-sm">
                  <div className="w-7 h-7 rounded-lg bg-light-blue text-institutional flex items-center justify-center">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-bold text-navy">Fred Hutch (EUA)</p>
                  <p className="text-[10px] text-text-muted leading-tight">Fellowship em TMO</p>
                </div>
                
                <div className="rounded-2xl bg-white border border-border-subtle p-3.5 space-y-1 shadow-sm">
                  <div className="w-7 h-7 rounded-lg bg-light-blue text-institutional flex items-center justify-center">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-bold text-navy">Doutor e Mestre</p>
                  <p className="text-[10px] text-text-muted leading-tight">FMUSP (USP)</p>
                </div>

                <div className="rounded-2xl bg-white border border-border-subtle p-3.5 space-y-1 shadow-sm">
                  <div className="w-7 h-7 rounded-lg bg-light-blue text-institutional flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-bold text-navy">Hematologia</p>
                  <p className="text-[10px] text-text-muted leading-tight">Residência FMUSP</p>
                </div>

                <div className="rounded-2xl bg-white border border-border-subtle p-3.5 space-y-1 shadow-sm">
                  <div className="w-7 h-7 rounded-lg bg-light-blue text-institutional flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-bold text-navy">Diretor Clínico</p>
                  <p className="text-[10px] text-text-muted leading-tight">Oncocenter</p>
                </div>
              </div>
            </div>

            {/* High-resolution portrait column with creative layered cards */}
            <div className="lg:col-span-5 animate-fade-up-delay-1">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Ambient glow behind image */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-6 rounded-[48px] bg-gradient-to-tr from-institutional/20 via-light-blue/60 to-white/40 blur-2xl -z-10"
                />

                {/* Main Image Container */}
                <div className="relative rounded-[36px] overflow-hidden bg-white border-2 border-white shadow-[0_28px_72px_rgba(20,45,80,0.16)] aspect-[4/5]">
                  <img
                    src="/images/dr-celso-massumoto.jpg"
                    alt="Dr. Celso Massumoto — Hematologista e Diretor Clínico da Oncocenter"
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                  />

                  {/* Floating Card Top-Left: USP Badge */}
                  <div className="absolute top-4 left-4 rounded-2xl bg-white/92 backdrop-blur-md border border-white/70 p-2.5 sm:p-3 shadow-[0_8px_24px_rgba(20,45,80,0.12)] flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-navy text-white flex items-center justify-center text-xs font-serif font-bold shadow-sm">
                      USP
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-navy leading-none">Doutor & Mestre</p>
                      <p className="text-[10px] text-institutional font-medium mt-0.5">FMUSP</p>
                    </div>
                  </div>

                  {/* Floating Badge Top-Right: CRM */}
                  <div className="absolute top-4 right-4 rounded-full bg-navy/90 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-light-blue animate-pulse" />
                    <span>CRM-SP 48392</span>
                  </div>

                  {/* Floating Card Bottom: Identity & Role ON TOP OF IMAGE */}
                  <div className="absolute bottom-4 inset-x-4 sm:bottom-5 sm:inset-x-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 p-4 sm:p-5 shadow-[0_16px_36px_rgba(20,45,80,0.16)] space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-institutional uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-institutional shrink-0" />
                        Diretor Clínico da Oncocenter
                      </span>
                      <span className="rounded-full bg-light-blue px-2.5 py-0.5 text-[10px] font-bold text-navy shrink-0">
                        Fred Hutch (EUA)
                      </span>
                    </div>

                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy leading-tight">
                        {DOCTOR_INFO.name}
                      </h2>
                      <p className="text-[11px] sm:text-xs text-text-muted mt-0.5 leading-snug">
                        Hematologia · Especialista em TMO · Doutor e Mestre FMUSP
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Corner Accent Badge: International Fellowship */}
                <div className="hidden sm:flex absolute -bottom-3 -right-3 rounded-2xl bg-navy text-white px-3.5 py-2.5 shadow-xl border border-white/20 items-center gap-2.5 z-10 animate-fade-up">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-light-blue">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-bold leading-tight">Fred Hutchinson</p>
                    <p className="text-[9px] text-light-blue/80">Seattle, WA – USA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Schedule Interactive Widget */}
          <div className="mt-16 pt-6">
            <QuickScheduleWidget />
          </div>
        </div>
      </section>

      {/* SEÇÃO 2 – APRESENTAÇÃO PROFISSIONAL & FILOSOFIA */}
      <section className="py-20 lg:py-28 bg-white border-t border-border-subtle/60">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="rounded-3xl bg-soft-gray border border-border-subtle p-8 sm:p-10 space-y-6 shadow-sm">
                <div className="flex items-center gap-3 text-institutional">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                    Qualificações e Vínculos
                  </span>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3.5 pb-4 border-b border-border-subtle">
                    <span className="w-2.5 h-2.5 rounded-full bg-navy mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-navy">
                        Diretor Clínico da Oncocenter
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">
                        Liderança médica e coordenação de protocolos assistenciais de ponta
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5 pb-4 border-b border-border-subtle">
                    <span className="w-2.5 h-2.5 rounded-full bg-navy mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-navy">
                        Hematology Fellow — Fred Hutchinson Cancer Research Center (Seattle, EUA)
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">
                        Especialização internacional (1990 – 1992) no berço mundial do TMO
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5 pb-4 border-b border-border-subtle">
                    <span className="w-2.5 h-2.5 rounded-full bg-navy mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-navy">
                        Doutorado (1993) e Mestrado (1988) pela FMUSP
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">
                        Faculdade de Medicina da Universidade de São Paulo
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-navy mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-navy">
                        Residência Médica em Hematologia (FMUSP, 1986)
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">
                        Residência em Clínica Médica (PUC, 1984) e Graduação em Medicina (PUC, 1983)
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-institutional">
                Apresentação Profissional
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold text-navy leading-[1.18]">
                Conhecimento, experiência e dedicação à medicina.
              </h2>
              <div className="space-y-4 text-base text-text-main leading-relaxed">
                <p>
                  A trajetória do {DOCTOR_INFO.name} na Hematologia e no Transplante de Medula Óssea é marcada pelo mais alto rigor acadêmico nacional e internacional, unindo a liderança como Diretor Clínico da {DOCTOR_INFO.institutionName} a um atendimento acolhedor e focado nas particularidades de cada paciente.
                </p>
                <p>
                  Com formação pela Faculdade de Medicina da Universidade de São Paulo (FMUSP) — onde concluiu Residência, Mestrado e Doutorado — e especialização no prestigiado Fred Hutchinson Cancer Research Center em Seattle (EUA), seu trabalho traduz a medicina de fronteira em segurança e confiança clínica para quem necessita de acompanhamento especializado.
                </p>
                <p>
                  Cada consulta médica é realizada com escuta clínica aprofundada, diálogo claro e respeito integral ao paciente e seus familiares.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/sobre"
                  className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-white hover:bg-institutional transition-colors"
                >
                  Conheça a trajetória completa e linha do tempo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3 – ÁREAS DE ATUAÇÃO */}
      <section className="py-20 lg:py-28 bg-soft-gray border-y border-border-subtle/70">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl space-y-4 mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-institutional">
              Áreas de Atuação
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy leading-tight">
              Atuação especializada em Hematologia
            </h2>
            <p className="text-base text-text-muted leading-relaxed">
              Conheça as principais frentes de avaliação clínica e orientação em Hematologia. A indicação de exames e condutas é sempre definida individualmente em consulta médica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRACTICE_AREAS.map((area) => {
              const Icon = ICON_MAP[area.icon];
              return (
                <div
                  key={area.id}
                  className="group rounded-3xl border border-border-subtle bg-white p-8 shadow-[0_4px_20px_rgba(20,45,80,0.03)] hover:shadow-[0_16px_36px_rgba(20,45,80,0.08)] hover:border-institutional/30 transition-all duration-300 flex flex-col"
                >
                  <div className="w-12 h-12 rounded-2xl bg-light-blue text-navy flex items-center justify-center mb-6 group-hover:bg-navy group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-navy mb-2.5">
                    {area.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed flex-1">
                    {area.description}
                  </p>
                  <Link
                    href={`/conteudos/${area.slug}`}
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-institutional group-hover:gap-2 transition-all"
                  >
                    Saiba mais sobre o tema
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GUIA CLÍNICO INTERATIVO / QUANDO PROCURAR O HEMATOLOGISTA */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 space-y-10">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-institutional">
              <Sparkles className="w-4 h-4" />
              Orientação Médica Prática
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy leading-tight">
              Quando agendar uma avaliação com o Dr. Celso Massumoto?
            </h2>
            <p className="text-base text-text-muted leading-relaxed">
              Consulte os principais cenários laboratoriais e clínicos que motivam a consulta com o especialista em Hematologia e TMO.
            </p>
          </div>

          <ClinicalSymptomsGuide />
        </div>
      </section>

      {/* SEÇÃO 4 – TRANSPLANTE DE MEDULA ÓSSEA */}
      <section className="relative overflow-hidden bg-navy text-white py-20 lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full border border-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 top-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-dashed border-white/15"
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1 text-xs font-medium text-light-blue">
                Alta Complexidade em Hematologia
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-[1.18]">
                Transplante de Medula Óssea: conhecimento especializado e cuidado em cada etapa.
              </h2>
              <p className="text-base text-white/80 leading-relaxed">
                O Transplante de Medula Óssea (TMO) é uma terapia celular de alta complexidade. Com experiência internacional de fellowship no <strong>Fred Hutchinson Cancer Research Center</strong> (Seattle, EUA) — centro pioneiro de TMO no mundo — o Dr. Celso Massumoto oferece avaliação criteriosa e acolhedora em todas as fases do procedimento.
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                A indicação do TMO não é universal: depende de avaliação médica detalhada do diagnóstico, do momento clínico e da análise individualizada de riscos e benefícios.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-xs font-semibold text-light-blue uppercase tracking-wider">
                    1. Avaliação
                  </p>
                  <p className="text-xs text-white/75 mt-1.5 leading-relaxed">
                    Análise detalhada da indicação clínica e compatibilidade.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-xs font-semibold text-light-blue uppercase tracking-wider">
                    2. Preparo e TMO
                  </p>
                  <p className="text-xs text-white/75 mt-1.5 leading-relaxed">
                    Condicionamento, infusão celular e suporte hospitalar especializado.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-xs font-semibold text-light-blue uppercase tracking-wider">
                    3. Seguimento
                  </p>
                  <p className="text-xs text-white/75 mt-1.5 leading-relaxed">
                    Monitoramento contínuo da recuperação medular e imunológica.
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/tmo"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-navy px-7 py-3.5 text-sm font-medium hover:bg-light-blue transition-colors"
                >
                  Entenda o Transplante de Medula Óssea
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
                <img
                  src="/images/tmo-editorial.svg"
                  alt="Ilustração científica minimalista representando o Transplante de Medula Óssea"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5 – CONTEÚDO E EDUCAÇÃO EM SAÚDE */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-institutional">
                <BookOpen className="w-3.5 h-3.5" />
                Conteúdo e Educação em Saúde
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy leading-tight">
                Informação de qualidade também faz parte do cuidado.
              </h2>
              <p className="text-base text-text-muted leading-relaxed">
                Artigos educativos elaborados com clareza e responsabilidade científica para orientar pacientes e familiares sobre exames, anemias e doenças hematológicas.
              </p>
            </div>
            <Link
              href="/conteudos"
              className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-6 py-3 text-sm font-medium text-navy hover:bg-light-blue/60 transition-colors self-start md:self-auto"
            >
              Ver todos os artigos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-80 rounded-3xl bg-soft-gray animate-pulse border border-border-subtle"
                  />
                ))}
              </div>
            }
          >
            <DynamicArticlesSection />
          </Suspense>
        </div>
      </section>

      {/* SEÇÃO 6 – PRESENÇA DIGITAL (INSTAGRAM) */}
      <section className="py-20 lg:py-24 bg-soft-gray border-y border-border-subtle/70">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-institutional">
                <InstagramIcon className="w-3.5 h-3.5" />
                Presença Digital · {DOCTOR_INFO.instagramHandle}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy leading-tight">
                Acompanhe meus conteúdos.
              </h2>
              <p className="text-base text-text-muted leading-relaxed">
                Seleção editorial de publicações e orientações em Hematologia compartilhadas no perfil oficial do Instagram.
              </p>
            </div>
            <a
              href={DOCTOR_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-white hover:bg-institutional transition-colors self-start md:self-auto"
            >
              <InstagramIcon className="w-4 h-4" />
              Visitar perfil no Instagram
            </a>
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-72 rounded-3xl bg-white animate-pulse border border-border-subtle"
                  />
                ))}
              </div>
            }
          >
            <DynamicInstagramSection />
          </Suspense>

          <p className="mt-6 text-xs text-text-muted text-center">
            Seleção editorial atualizada periodicamente pelo painel administrativo. Para acompanhar todas as publicações em tempo real, acesse{" "}
            <a
              href={DOCTOR_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-institutional underline"
            >
              instagram.com/drcelsomassumoto
            </a>
            .
          </p>
        </div>
      </section>

      {/* DÚVIDAS FREQUENTES (FAQ) */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-institutional">
              Esclarecimentos ao Paciente
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy leading-tight">
              Perguntas Frequentes
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              Tire suas principais dúvidas sobre o atendimento hematológico, preparo para consultas e documentação médica.
            </p>
          </div>

          <FAQSection />
        </div>
      </section>

      {/* SEÇÃO 7 – AGENDAMENTO */}
      <section className="py-20 bg-soft-gray/50 border-t border-border-subtle/70">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-navy via-navy to-institutional text-white p-8 sm:p-14 text-center shadow-[0_24px_60px_rgba(20,45,80,0.16)] relative overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full border border-white/10"
            />
            <div className="relative space-y-5 max-w-2xl mx-auto">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-light-blue">
                Atendimento Médico Especializado
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight">
                Agende sua consulta.
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Entre em contato com nossa equipe pelo WhatsApp para obter informações sobre horários disponíveis, orientações iniciais e local de atendimento.
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-white text-navy px-8 py-4 text-sm font-semibold shadow-lg hover:bg-light-blue transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-institutional" />
                  Agendar pelo WhatsApp
                </a>
                <Link
                  href="/contato"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                >
                  Enviar mensagem
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 8 – LOCALIZAÇÃO E CONTATO */}
      <section className="py-20 lg:py-24 bg-white border-t border-border-subtle/70">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Map & Address */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-institutional">
                  Localização
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy">
                  Consultório em São Paulo
                </h2>
                <p className="text-sm text-text-muted leading-relaxed">
                  Atendimento com hora marcada. Confirme o endereço exato da consulta durante o contato com nossa equipe.
                </p>
              </div>

              <div className="rounded-3xl bg-soft-gray border border-border-subtle p-6 sm:p-7 space-y-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-institutional shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-navy">
                      {DOCTOR_INFO.address.street}
                    </p>
                    <p className="text-sm text-text-muted">
                      {DOCTOR_INFO.address.neighborhood} — {DOCTOR_INFO.address.cityState}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-text-muted bg-white rounded-2xl p-4 border border-border-subtle/60 leading-relaxed">
                  Atuação institucional complementar junto à{" "}
                  <a
                    href={DOCTOR_INFO.institutionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-navy underline"
                  >
                    {DOCTOR_INFO.institutionName}
                  </a>
                  . Endereço acima referente ao consultório divulgado no perfil oficial do médico.
                </div>
                <a
                  href={DOCTOR_INFO.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-navy/20 bg-white px-5 py-2.5 text-xs font-semibold text-navy hover:bg-light-blue transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-institutional" />
                  Traçar rota no Google Maps
                </a>
              </div>

              <div className="rounded-3xl overflow-hidden border border-border-subtle bg-white shadow-sm h-64">
                <iframe
                  title="Localização do consultório Dr. Celso Massumoto"
                  src={DOCTOR_INFO.address.embedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-soft-gray border border-border-subtle p-7 sm:p-10 shadow-sm">
                <div className="space-y-2 mb-6">
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-navy">
                    Envie uma mensagem
                  </h3>
                  <p className="text-sm text-text-muted">
                    Utilize o formulário abaixo para dúvidas administrativas ou solicitações de informação sobre consultas.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
