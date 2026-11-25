"use client";

import { useState } from "react";
import { Microscope, Activity, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getWhatsAppUrl } from "@/lib/constants";

interface TabData {
  id: string;
  label: string;
  icon: typeof Microscope;
  title: string;
  description: string;
  items: string[];
  recommendedArticle: {
    title: string;
    slug: string;
  };
}

const TABS: TabData[] = [
  {
    id: "exames",
    label: "Alterações no Hemograma",
    icon: Microscope,
    title: "Investigação diagnóstica de exames laboratoriais",
    description:
      "O hemograma reflete a saúde da medula óssea e do sangue. Valores fora do intervalo de referência frequentemente exigem correlação clínica detalhada para definir se são transitórios ou se necessitam de conduta específica.",
    items: [
      "Anemia persistente ou refratária a suplementos de ferro;",
      "Leucocitose (leucócitos elevados) ou leucopenia (leucócitos baixos);",
      "Plaquetopenia (plaquetas baixas com risco hemorrágico) ou trombocitose;",
      "Presença de células imaturas (blastos) ou atipias no esfregaço de sangue periférico;",
      "Ferritina muito elevada ou muito baixa sem causa aparente.",
    ],
    recommendedArticle: {
      title: "Como identificar alterações no hemograma?",
      slug: "como-identificar-alteracoes-no-hemograma",
    },
  },
  {
    id: "sintomas",
    label: "Sintomas e Sinais de Alerta",
    icon: Activity,
    title: "Manifestações clínicas que merecem atenção",
    description:
      "Determinados sinais do organismo podem estar diretamente ligados ao funcionamento das células sanguíneas ou do sistema linfático, justificando avaliação especializada.",
    items: [
      "Fadiga intensa, fraqueza contínua e palidez não explicadas por outros fatores;",
      "Aparecimento espontâneo de manchas roxas (hematomas) ou petéquias na pele;",
      "Sangramentos frequentes e anormais (gengivais, nasais ou menstruação excessiva);",
      "Aumento indolor e persistente de linfonodos (ínguas) no pescoço, axilas ou virilha;",
      "Febre de origem indeterminada acompanhada de suores noturnos profusos.",
    ],
    recommendedArticle: {
      title: "Quando procurar um hematologista?",
      slug: "quando-procurar-um-hematologista",
    },
  },
  {
    id: "tmo",
    label: "TMO & Segunda Opinião",
    icon: ShieldCheck,
    title: "Avaliação de alta complexidade e conduta terapêutica",
    description:
      "Para diagnósticos hematológicos complexos, a indicação de Transplante de Medula Óssea ou uma segunda opinião médica proporciona clareza, segurança e respaldo técnico ao paciente e sua família.",
    items: [
      "Avaliação de elegibilidade e momento oportuno para TMO autólogo ou alogênico;",
      "Revisão de laudos de mielograma, imunofenotipagem e biópsia de medula;",
      "Segunda opinião sobre protocolos de tratamento em doenças hematológicas;",
      "Acompanhamento de longo prazo e vigilância pós-transplante de medula.",
    ],
    recommendedArticle: {
      title: "O que é o Transplante de Medula Óssea (TMO)?",
      slug: "o-que-e-o-transplante-de-medula-ossea",
    },
  },
];

export function ClinicalSymptomsGuide() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  const cur = TABS.find((t) => t.id === activeTab) || TABS[0];
  const IconComponent = cur.icon;

  return (
    <div className="rounded-3xl bg-white border border-border-subtle p-6 sm:p-10 shadow-[0_12px_36px_rgba(20,45,80,0.04)] space-y-8">
      {/* Tab triggers */}
      <div className="flex flex-wrap gap-2.5 border-b border-border-subtle pb-4">
        {TABS.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-navy text-white shadow-sm"
                  : "bg-soft-gray text-text-main hover:bg-light-blue"
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-institutional">
            <IconComponent className="w-4 h-4" />
            <span>Critérios de Avaliação</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-navy leading-snug">
            {cur.title}
          </h3>
          <p className="text-sm text-text-muted leading-relaxed">
            {cur.description}
          </p>

          <ul className="space-y-3 pt-2">
            {cur.items.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm text-text-main leading-relaxed"
              >
                <span className="w-2 h-2 rounded-full bg-institutional mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5 rounded-2xl bg-soft-gray/70 border border-border-subtle p-6 space-y-5">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-institutional">
              Material Educativo Recomendado
            </span>
            <p className="font-serif text-lg font-semibold text-navy">
              {cur.recommendedArticle.title}
            </p>
            <p className="text-xs text-text-muted leading-relaxed">
              Leia o artigo completo preparado com fundamentação médica responsável para esclarecer suas dúvidas.
            </p>
          </div>

          <Link
            href={`/conteudos/${cur.recommendedArticle.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-institutional hover:underline"
          >
            Acessar artigo explicativo
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <div className="pt-3 border-t border-border-subtle">
            <a
              href={getWhatsAppUrl(`Olá! Gostaria de agendar uma consulta sobre: ${cur.label}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-2.5 text-xs font-medium text-white hover:bg-institutional transition-colors"
            >
              Agendar avaliação para este quadro
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
