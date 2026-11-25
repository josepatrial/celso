"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Quote,
  Star,
  ShieldCheck,
  CalendarCheck,
  ArrowRight,
  Filter,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { DOCTOR_INFO, getWhatsAppUrl } from "@/lib/constants";

interface Testimonial {
  id: string;
  name: string;
  age?: number;
  role?: string;
  category: "tmo" | "hemograma" | "hematologia" | "segunda-opiniao";
  categoryLabel: string;
  context: string;
  date: string;
  quote: string;
  treatmentTime: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "dep-1",
    name: "Mariana Silveira",
    age: 44,
    role: "Paciente de TMO",
    category: "tmo",
    categoryLabel: "Transplante de Medula Óssea",
    context: "Acompanhamento e realização de TMO Autólogo",
    date: "Outubro de 2026",
    treatmentTime: "Acompanhamento há 2 anos",
    quote:
      "Receber a indicação de um transplante de medula óssea causa um turbilhão de emoções e inseguranças na gente e na nossa família. O Dr. Celso Massumoto foi um porto seguro desde o primeiro minuto. A clareza com que ele desenhou cada etapa do condicionamento, a paciência para tirar as dúvidas dos meus filhos e a presença constante no pós-transplante fizeram toda a diferença. Hoje celebro minha recuperação com gratidão infinita.",
  },
  {
    id: "dep-2",
    name: "Carlos Eduardo Ramos",
    age: 58,
    role: "Paciente de Hematologia",
    category: "hemograma",
    categoryLabel: "Investigação Diagnóstica",
    context: "Investigação de anemia severa refratária",
    date: "Setembro de 2026",
    treatmentTime: "Tratamento concluído",
    quote:
      "Passei por mais de três consultas com diferentes médicos que apenas receitavam sulfato ferroso, sem que minha taxa de hemoglobina subisse. Na consulta com o Dr. Celso, ele solicitou uma bateria criteriosa de exames laboratoriais complementares e identificou a causa real da perda. Em dois meses de tratamento direcionado, minha disposição voltou ao normal. Um médico brilhante e de rara humanidade.",
  },
  {
    id: "dep-3",
    name: "Juliana Mendes & Família",
    role: "Familiar de paciente",
    category: "tmo",
    categoryLabel: "Transplante de Medula Óssea",
    context: "Segunda opinião e suporte no TMO Alogênico",
    date: "Agosto de 2026",
    treatmentTime: "Acompanhamento contínuo",
    quote:
      "Buscamos o Dr. Celso para uma segunda opinião sobre o transplante do meu pai. O conhecimento dele sobre protocolos internacionais — fruto de sua experiência no Fred Hutchinson nos Estados Unidos — nos deu a certeza e a serenidade necessárias para tomar a decisão correta. Ele não apenas cuida do aspecto biológico do sangue, mas acolhe a família inteira com respeito e nobreza.",
  },
  {
    id: "dep-4",
    name: "Roberto T. Almeida",
    age: 39,
    role: "Paciente de Hematologia",
    category: "hemograma",
    categoryLabel: "Alterações no Hemograma",
    context: "Investigação de plaquetopenia acentuada",
    date: "Novembro de 2026",
    treatmentTime: "Acompanhamento preventivo",
    quote:
      "Um exame de rotina acusou minhas plaquetas muito abaixo do normal. Fiquei apavorado pesquisando na internet. O Dr. Celso me atendeu com calma extrema, explicou que nem toda plaqueta baixa é motivo de pânico e conduziu uma investigação minuciosa. Saí do consultório aliviado e orientado com precisão médica.",
  },
  {
    id: "dep-5",
    name: "Renata Fagundes",
    age: 52,
    role: "Paciente Oncocenter",
    category: "hematologia",
    categoryLabel: "Acompanhamento Contínuo",
    context: "Controle de doença hematológica crônica",
    date: "Julho de 2026",
    treatmentTime: "Acompanhamento há 3 anos",
    quote:
      "O atendimento do Dr. Celso na Oncocenter e em seu consultório é um exemplo de medicina moderna e humana. Ele não tem pressa durante a consulta, olha nos olhos, analisa exame por exame e explica o raciocínio clínico de forma que qualquer leigo compreenda. Sinto-me completamente segura sob seus cuidados.",
  },
  {
    id: "dep-6",
    name: "Fernando Vasconcelos",
    age: 63,
    role: "Segunda Opinião Especializada",
    category: "segunda-opiniao",
    categoryLabel: "Segunda Opinião Médica",
    context: "Revisão diagnóstica de alteração medular",
    date: "Junho de 2026",
    treatmentTime: "Avaliação diagnóstica",
    quote:
      "A consulta de segunda opinião com o Dr. Celso me evitou um procedimento invasivo e desnecessário. A autoridade dele como Doutor pela USP e especialista com décadas de bagagem prática é evidente em cada observação clínica. Recomendo de olhos fechados a qualquer pessoa que precise de um parecer hematológico sério.",
  },
];

const CATEGORIES = [
  { id: "todos", label: "Todos os Relatos" },
  { id: "tmo", label: "Transplante de Medula Óssea (TMO)" },
  { id: "hemograma", label: "Hemograma & Anemias" },
  { id: "hematologia", label: "Acompanhamento Clínico" },
  { id: "segunda-opiniao", label: "Segunda Opinião" },
];

export default function DepoimentosPage() {
  const [filter, setFilter] = useState("todos");

  const filtered =
    filter === "todos"
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.category === filter);

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-light-blue/60 to-white py-16 lg:py-24 border-b border-border-subtle/70">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-border-subtle px-4 py-1.5 text-xs font-semibold text-navy shadow-sm">
            <Heart className="w-3.5 h-3.5 text-institutional fill-current" />
            <span>Acolhimento · Confiança · Rigor Científico</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-navy leading-tight">
            Experiências e Relatos de Cuidado
          </h1>

          <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl mx-auto">
            Histórias de superação, diagnóstico preciso e acompanhamento humanizado na Hematologia e no Transplante de Medula Óssea.
          </p>

          {/* CFM Compliance & Demo Banner */}
          <div className="rounded-2xl bg-light-blue/40 border border-institutional/20 p-4 sm:p-5 text-left max-w-2xl mx-auto flex items-start gap-3 mt-6">
            <ShieldCheck className="w-5 h-5 text-institutional shrink-0 mt-0.5" />
            <div className="text-xs text-text-muted leading-relaxed space-y-1">
              <p className="font-semibold text-navy">
                Nota Ética e Demonstrativa de Layout (Resolução CFM nº 2.336/2023):
              </p>
              <p>
                Os relatos abaixo foram elaborados em formato modelo/ilustrativo para demonstração visual da estrutura da página durante a fase de projeto. Em conformidade com o Código de Ética Médica, publicações definitivas de depoimentos de pacientes devem ocorrer mediante consentimento livre e esclarecido, sem promessa de resultados garantidos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Testimonials Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 space-y-12">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border-subtle pb-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  filter === cat.id
                    ? "bg-navy text-white shadow-sm"
                    : "bg-soft-gray text-text-main hover:bg-light-blue"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl border border-border-subtle bg-white p-7 sm:p-8 shadow-[0_4px_24px_rgba(20,45,80,0.04)] hover:shadow-[0_16px_40px_rgba(20,45,80,0.1)] hover:border-institutional/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-light-blue px-3 py-1 text-[11px] font-semibold text-navy">
                      {item.categoryLabel}
                    </span>
                    <Quote className="w-6 h-6 text-institutional/30 group-hover:text-institutional transition-colors" />
                  </div>

                  <p className="text-sm sm:text-base text-text-muted leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-border-subtle space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif text-lg font-semibold text-navy">
                        {item.name}
                      </p>
                      <p className="text-xs text-institutional font-medium">
                        {item.role} {item.age ? `· ${item.age} anos` : ""}
                      </p>
                    </div>
                    <div className="flex items-center text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-text-muted pt-1">
                    <span>{item.context}</span>
                    <span className="text-institutional font-medium">
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Conversion Box */}
          <div className="rounded-3xl bg-gradient-to-br from-navy via-navy to-institutional text-white p-8 sm:p-12 text-center space-y-5 shadow-xl max-w-4xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-light-blue">
              Cuidado Médico de Excelência
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight">
              Precisa de avaliação especializada em Hematologia ou TMO?
            </h2>
            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
              Agende sua consulta para uma análise diagnóstica criteriosa, com acolhimento e respaldo científico das maiores referências do mundo.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-white text-navy px-8 py-3.5 text-sm font-semibold hover:bg-light-blue transition-colors shadow-lg"
              >
                <CalendarCheck className="w-4 h-4 text-institutional" />
                Agendar consulta pelo WhatsApp
              </a>
              <Link
                href="/sobre"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Conheça o Dr. Celso Massumoto
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
