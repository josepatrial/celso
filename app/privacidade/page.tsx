import type { Metadata } from "next";
import { DOCTOR_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidade e Proteção de Dados (LGPD)",
  description:
    "Informações sobre privacidade, cookies, consentimento e tratamento de dados pessoais no site do Dr. Celso Massumoto.",
};

export default function PrivacidadePage() {
  return (
    <div className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 space-y-8">
        <div className="space-y-3 border-b border-border-subtle pb-6">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-institutional">
            Governança e Conformidade
          </span>
          <h1 className="font-serif text-4xl font-semibold text-navy">
            Política de Privacidade e Proteção de Dados
          </h1>
          <p className="text-sm text-text-muted">
            Em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 – LGPD) e com as diretrizes éticas do Conselho Federal de Medicina (CFM).
          </p>
        </div>

        <div className="prose-medical" id="lgpd">
          <h2>1. Coleta e Finalidade dos Dados</h2>
          <p>
            Os dados fornecidos voluntariamente por meio do formulário de contato (nome, e-mail, telefone e mensagem) são utilizados exclusivamente para responder às solicitações de informação e orientação sobre agendamento de consultas com o {DOCTOR_INFO.name}.
          </p>

          <h2>2. Dados Sensíveis e Sigilo Médico</h2>
          <p>
            Recomendamos que não sejam enviados laudos laboratoriais, exames detalhados ou informações clínicas sensíveis pelo formulário aberto do site. A avaliação médica e o compartilhamento de documentos clínicos ocorrem de forma segura e sigilosa em ambiente apropriado de consulta.
          </p>

          <h2>3. Cookies e Ferramentas de Análise</h2>
          <p>
            Este site utiliza cookies estritamente necessários para seu funcionamento técnico. Ferramentas de análise de tráfego e desempenho somente são ativadas mediante consentimento expresso do visitante no banner de privacidade.
          </p>

          <h2>4. Responsabilidade Profissional</h2>
          <p>
            Todo o conteúdo publicado neste portal possui finalidade exclusivamente informativa e educativa sobre Hematologia e Transplante de Medula Óssea, não substituindo a consulta médica presencial, o exame físico ou a conduta individualizada.
          </p>
          <p>
            Responsável técnico: {DOCTOR_INFO.name} — {DOCTOR_INFO.specialty} ({DOCTOR_INFO.crm}).
          </p>
        </div>
      </div>
    </div>
  );
}
