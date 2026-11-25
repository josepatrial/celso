import type { Metadata } from "next";
import { MapPin, MessageCircle, Navigation, ExternalLink } from "lucide-react";
import { InstagramIcon } from "@/components/BrandIcons";
import { DOCTOR_INFO, getWhatsAppUrl } from "@/lib/constants";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contato e Localização",
  description:
    "Entre em contato para informações sobre agendamento de consultas com o Dr. Celso Massumoto em São Paulo/SP.",
};

export default function ContatoPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-light-blue/60 to-white py-16 lg:py-20 border-b border-border-subtle/70">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-institutional">
            Atendimento
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-navy">
            Contato e Agendamento
          </h1>
          <p className="text-base text-text-muted leading-relaxed">
            Para solicitar informações sobre consultas, horários disponíveis e orientações de atendimento, utilize o WhatsApp ou envie sua mensagem pelo formulário abaixo.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-navy text-white p-7 space-y-4 shadow-md">
              <h2 className="font-serif text-2xl font-semibold">
                Agendamento via WhatsApp
              </h2>
              <p className="text-sm text-white/80 leading-relaxed">
                Canal direto para informações sobre consultas e orientações iniciais com a equipe do {DOCTOR_INFO.name}.
              </p>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white text-navy px-6 py-3 text-sm font-semibold hover:bg-light-blue transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-institutional" />
                Agendar pelo WhatsApp
              </a>
            </div>

            <div className="rounded-2xl border border-border-subtle bg-soft-gray/60 p-6 space-y-4">
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
              <div className="flex flex-wrap gap-3">
                <a
                  href={DOCTOR_INFO.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-navy/20 bg-white px-4 py-2 text-xs font-semibold text-navy hover:bg-light-blue transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-institutional" />
                  Traçar rota
                </a>
                <a
                  href={DOCTOR_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-navy/20 bg-white px-4 py-2 text-xs font-semibold text-navy hover:bg-light-blue transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-institutional" />
                  Instagram
                </a>
                <a
                  href={DOCTOR_INFO.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-navy/20 bg-white px-4 py-2 text-xs font-semibold text-navy hover:bg-light-blue transition-colors"
                >
                  {DOCTOR_INFO.institutionName}
                  <ExternalLink className="w-3 h-3 text-institutional" />
                </a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border-subtle h-64">
              <iframe
                title="Mapa do consultório"
                src={DOCTOR_INFO.address.embedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border-subtle bg-white p-7 sm:p-10 shadow-sm">
              <h2 className="font-serif text-3xl font-semibold text-navy mb-2">
                Formulário de Contato
              </h2>
              <p className="text-sm text-text-muted mb-6">
                Preencha os campos abaixo. Este formulário conta com proteção anti-spam e tratamento de dados conforme a LGPD.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
