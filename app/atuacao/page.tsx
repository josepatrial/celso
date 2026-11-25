import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CalendarCheck,
  Droplets,
  HeartPulse,
  Microscope,
  Shield,
  Stethoscope,
} from "lucide-react";
import { DOCTOR_INFO, PRACTICE_AREAS, getWhatsAppUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Áreas de Atuação em Hematologia",
  description:
    "Conheça as frentes de atuação do Dr. Celso Massumoto em Hematologia, investigação de anemias, alterações no hemograma e Transplante de Medula Óssea.",
};

const ICON_MAP = {
  droplet: Droplets,
  activity: Activity,
  microscope: Microscope,
  shield: Shield,
  heartPulse: HeartPulse,
  stethoscope: Stethoscope,
} as const;

export default function AtuacaoPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-light-blue/60 to-white py-16 lg:py-24 border-b border-border-subtle/70">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center space-y-5">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-institutional">
            Atuação Médica · {DOCTOR_INFO.crm}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-navy leading-tight">
            Atuação especializada em Hematologia
          </h1>
          <p className="text-base sm:text-lg text-text-muted leading-relaxed">
            Avaliação clínica criteriosa, investigação diagnóstica precisa e acompanhamento individualizado nas principais condições que envolvem o sangue, a medula óssea e o sistema linfático.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {PRACTICE_AREAS.map((area) => {
              const Icon = ICON_MAP[area.icon];
              return (
                <div
                  key={area.id}
                  className="rounded-2xl border border-border-subtle bg-white p-8 shadow-[0_4px_20px_rgba(20,45,80,0.03)] hover:shadow-[0_14px_34px_rgba(20,45,80,0.08)] transition-all flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-light-blue text-navy flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="font-serif text-2xl font-semibold text-navy mb-3">
                    {area.title}
                  </h2>
                  <p className="text-sm text-text-muted leading-relaxed flex-1">
                    {area.description}
                  </p>
                  <Link
                    href={`/conteudos/${area.slug}`}
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-institutional hover:gap-2 transition-all"
                  >
                    Ler conteúdo explicativo
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="mt-14 rounded-3xl bg-soft-gray border border-border-subtle p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h3 className="font-serif text-2xl font-semibold text-navy">
                Precisa de uma avaliação hematológica?
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Cada caso é avaliado de forma individualizada em consulta presencial, considerando histórico clínico completo e exames laboratoriais prévios.
              </p>
            </div>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-white hover:bg-institutional transition-colors"
            >
              <CalendarCheck className="w-4 h-4" />
              Agendar consulta
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
