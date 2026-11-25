"use client";

import { useState } from "react";
import { MessageCircle, Check, Sparkles, ChevronRight } from "lucide-react";
import { DOCTOR_INFO, getWhatsAppUrl } from "@/lib/constants";

const REASONS = [
  {
    id: "hemograma",
    label: "Alterações no Hemograma / Anemia",
    description: "Investigação de hemoglobina, leucócitos ou plaquetas fora dos padrões.",
  },
  {
    id: "hematologia",
    label: "Primeira Consulta de Hematologia",
    description: "Avaliação diagnóstica completa das condições do sangue e gânglios.",
  },
  {
    id: "tmo",
    label: "Transplante de Medula Óssea (TMO)",
    description: "Avaliação de indicação, segunda opinião ou acompanhamento pré/pós-TMO.",
  },
  {
    id: "segunda-opiniao",
    label: "Segunda Opinião Especializada",
    description: "Revisão detalhada de exames e laudos com orientação especializada.",
  },
];

export function QuickScheduleWidget() {
  const [selectedReason, setSelectedReason] = useState(REASONS[0].id);

  const selectedObj = REASONS.find((r) => r.id === selectedReason) || REASONS[0];

  const customMessage = `Olá! Gostaria de informações sobre agendamento de consulta com o Dr. Celso Massumoto para: ${selectedObj.label}.`;

  const link = getWhatsAppUrl(customMessage);

  return (
    <div className="rounded-3xl bg-white border border-border-subtle p-6 sm:p-8 shadow-[0_16px_40px_rgba(20,45,80,0.06)] space-y-6">
      <div className="flex items-center justify-between gap-3 border-b border-border-subtle pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-light-blue text-institutional flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-semibold text-navy">
              Agendamento Direto e Personalizado
            </h3>
            <p className="text-xs text-text-muted">
              Selecione o motivo da consulta para direcionar o atendimento via WhatsApp
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {REASONS.map((reason) => {
          const isSelected = selectedReason === reason.id;
          return (
            <button
              key={reason.id}
              type="button"
              onClick={() => setSelectedReason(reason.id)}
              className={`p-4 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? "bg-light-blue/50 border-institutional shadow-sm ring-1 ring-institutional"
                  : "bg-soft-gray/50 border-border-subtle hover:bg-white hover:border-institutional/40"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-semibold text-navy leading-snug">
                  {reason.label}
                </span>
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                    isSelected
                      ? "bg-navy border-navy text-white"
                      : "border-border-subtle bg-white"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                </span>
              </div>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                {reason.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <p className="text-xs text-text-muted text-center sm:text-left">
          Atendimento humanizado · Confirmação de horários diretamente com a equipe
        </p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(20,45,80,0.18)] hover:bg-institutional transition-all hover:gap-3"
        >
          <MessageCircle className="w-4 h-4 text-light-blue" />
          <span>Prosseguir no WhatsApp</span>
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
