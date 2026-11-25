"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "O que devo levar na primeira consulta hematológica?",
    answer:
      "É altamente recomendável trazer todos os exames recentes e anteriores que possuir — principalmente hemogramas, biópsias, exames de imagem e mielogramas prévios, se houver. O histórico comparativo é uma das ferramentas mais valiosas na Hematologia. Traga também a lista de medicamentos em uso habitual.",
  },
  {
    question: "Preciso de encaminhamento médico para agendar uma avaliação?",
    answer:
      "Não é obrigatório possuir encaminhamento formal. Qualquer paciente que tenha identificado alterações laboratoriais no hemograma, apresente sintomas como fadiga inexplicada, ínguas ou hematomas, ou que busque uma segunda opinião especializada pode solicitar agendamento diretamente com nossa equipe.",
  },
  {
    question: "Como funciona a avaliação para Transplante de Medula Óssea (TMO)?",
    answer:
      "A avaliação para TMO é criteriosa e individualizada. O Dr. Celso Massumoto analisa o diagnóstico hematológico, o estágio da doença, as terapias já realizadas e o estado clínico geral do paciente, orientando de forma transparente se o procedimento está indicado, qual a modalidade mais recomendada (autóloga ou alogênica) e quais são as etapas de preparo necessárias.",
  },
  {
    question: "O consultório fornece documentação para reembolso de convênio médico?",
    answer:
      "Sim. O atendimento é realizado na modalidade particular com emissão de nota fiscal e relatório médico detalhado para que o paciente possa solicitar reembolso junto ao seu plano de saúde, de acordo com as regras e coberturas da sua operadora.",
  },
  {
    question: "Qual a relação entre o consultório do Dr. Celso e a Oncocenter?",
    answer:
      "O Dr. Celso Massumoto possui consultório individual na Rua Adma Jafet, 74 (Bela Vista, São Paulo) e simultaneamente integra o corpo clínico institucional da Oncocenter. O local exato de cada consulta ou procedimento é alinhado com a equipe no momento do agendamento para maior comodidade e segurança do paciente.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-2xl border border-border-subtle bg-white overflow-hidden transition-all duration-200 shadow-sm"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-serif text-lg sm:text-xl font-semibold text-navy hover:text-institutional transition-colors"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-institutional shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-6 pt-1 text-sm text-text-muted leading-relaxed border-t border-border-subtle/40">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
