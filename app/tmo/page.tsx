import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Transplante de Medula Óssea (TMO)",
  description:
    "Informações claras e cientificamente responsáveis sobre o Transplante de Medula Óssea (TMO), suas modalidades, etapas e acompanhamento especializado com o Dr. Celso Massumoto.",
};

export default function TmoPage() {
  return (
    <div className="bg-white">
      <section className="bg-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1 text-xs font-medium text-light-blue">
              Especialidade em Alta Complexidade
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold leading-tight">
              Transplante de Medula Óssea: conhecimento especializado e cuidado em cada etapa.
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">
              O Transplante de Medula Óssea (TMO) — também chamado de transplante de células-tronco hematopoéticas — é uma terapia celular avançada utilizada em situações específicas da Hematologia, sempre mediante indicação médica criteriosa.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={getWhatsAppUrl(
                  "Olá! Gostaria de obter informações sobre avaliação para Transplante de Medula Óssea com o Dr. Celso Massumoto."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white text-navy px-7 py-3.5 text-sm font-semibold hover:bg-light-blue transition-colors"
              >
                <CalendarCheck className="w-4 h-4 text-institutional" />
                Solicitar orientação pelo WhatsApp
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="/images/tmo-editorial.svg"
                alt="Transplante de Medula Óssea"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 space-y-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-border-subtle bg-soft-gray/60 p-8 space-y-3">
              <h2 className="font-serif text-2xl font-semibold text-navy">
                TMO Autólogo
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                As células-tronco hematopoéticas são coletadas do próprio paciente, armazenadas de forma segura e reinfundidas após um tratamento preparatório (condicionamento) destinado a controlar a doença de base.
              </p>
            </div>
            <div className="rounded-2xl border border-border-subtle bg-soft-gray/60 p-8 space-y-3">
              <h2 className="font-serif text-2xl font-semibold text-navy">
                TMO Alogênico
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                As células-tronco provêm de um doador compatível — familiar ou voluntário cadastrado em registros nacionais/internacionais — permitindo a substituição da medula doente e a reconstrução do sistema hematopoético e imunológico.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-semibold text-navy">
              Indicação responsável e acompanhamento contínuo
            </h2>
            <p className="text-base text-text-main leading-relaxed">
              O Transplante de Medula Óssea não é indicado para todos os pacientes nem representa a primeira linha de tratamento para a maioria das condições hematológicas. A decisão pela realização do TMO envolve uma análise minuciosa do diagnóstico, do estágio da doença, das condições clínicas gerais e dos objetivos terapêuticos de cada pessoa.
            </p>
            <ul className="space-y-3">
              {[
                "Avaliação pré-transplante completa e esclarecimento transparente de riscos e benefícios;",
                "Planejamento da coleta de células-tronco e pesquisa de compatibilidade quando aplicável;",
                "Acompanhamento rigoroso durante o condicionamento e a pega medular;",
                "Seguimento ambulatorial contínuo pós-TMO para prevenção de infecções e monitorização clínica.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-text-main">
                  <CheckCircle2 className="w-5 h-5 text-institutional shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-institutional/20 bg-light-blue/50 p-7 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-navy shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-navy">
                Compromisso com a informação ética
              </p>
              <p className="text-xs text-text-muted leading-relaxed">
                Os resultados de qualquer tratamento hematológico variam conforme o diagnóstico e as características individuais de cada paciente. Apenas a avaliação médica especializada pode definir a conduta mais adequada.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/conteudos/o-que-e-o-transplante-de-medula-ossea"
              className="inline-flex items-center gap-2 text-sm font-semibold text-institutional hover:underline"
            >
              Ler artigo completo: O que é o Transplante de Medula Óssea?
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
