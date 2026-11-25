"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const CONSENT_KEY = "dr_celso_consent_v1";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(CONSENT_KEY);
        if (!saved) {
          setVisible(true);
        }
      } catch {
        // Ignore storage restrictions
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const handleChoice = (acceptedAnalytics: boolean) => {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({
          essential: true,
          analytics: acceptedAnalytics,
          updatedAt: new Date().toISOString(),
        })
      );
    } catch {
      // Ignore storage restrictions
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimento de cookies e privacidade"
      className="fixed bottom-5 left-5 right-5 sm:right-auto sm:max-w-md z-50 rounded-2xl bg-white border border-border-subtle shadow-[0_16px_48px_rgba(20,45,80,0.14)] p-5"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-light-blue text-navy flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-navy">
            Privacidade e Proteção de Dados (LGPD)
          </p>
          <p className="text-xs text-text-muted leading-relaxed">
            Utilizamos cookies essenciais para o funcionamento do site e, mediante seu consentimento, ferramentas de análise de desempenho para aprimorar a experiência de navegação. Saiba mais em nossa{" "}
            <Link href="/privacidade" className="text-institutional underline">
              Política de Privacidade
            </Link>
            .
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleChoice(true)}
              className="rounded-full bg-navy px-4 py-1.5 text-xs font-medium text-white hover:bg-institutional transition-colors"
            >
              Aceitar todos
            </button>
            <button
              type="button"
              onClick={() => handleChoice(false)}
              className="rounded-full border border-border-subtle px-4 py-1.5 text-xs font-medium text-text-main hover:bg-soft-gray transition-colors"
            >
              Apenas essenciais
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
