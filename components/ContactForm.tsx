"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Informações sobre consulta");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [humanCheck, setHumanCheck] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message,
          consent,
          website,
          humanCheck,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Não foi possível enviar sua mensagem.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setHumanCheck("");
      setConsent(false);
    } catch {
      setStatus("error");
      setErrorMsg("Erro de conexão. Tente novamente ou utilize o WhatsApp.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-light-blue/60 border border-institutional/20 p-8 text-center space-y-3">
        <CheckCircle2 className="w-10 h-10 text-institutional mx-auto" />
        <h3 className="font-serif text-2xl font-semibold text-navy">
          Mensagem recebida com sucesso
        </h3>
        <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed">
          Agradecemos o seu contato. Nossa equipe retornará com as orientações solicitadas o mais breve possível. Para solicitações urgentes de agendamento, utilize o WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 inline-flex items-center justify-center rounded-full border border-navy/20 px-5 py-2 text-xs font-medium text-navy hover:bg-white transition-colors"
        >
          Enviar nova mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot anti-spam field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-medium text-navy mb-1.5">
            Nome completo *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            className="w-full rounded-xl border border-border-subtle bg-white px-4 py-2.5 text-sm text-text-main focus:border-institutional focus:outline-none focus:ring-2 focus:ring-light-blue"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-xs font-medium text-navy mb-1.5">
            Telefone / WhatsApp
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(11) 99999-9999"
            className="w-full rounded-xl border border-border-subtle bg-white px-4 py-2.5 text-sm text-text-main focus:border-institutional focus:outline-none focus:ring-2 focus:ring-light-blue"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-email" className="block text-xs font-medium text-navy mb-1.5">
            E-mail *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="w-full rounded-xl border border-border-subtle bg-white px-4 py-2.5 text-sm text-text-main focus:border-institutional focus:outline-none focus:ring-2 focus:ring-light-blue"
          />
        </div>
        <div>
          <label htmlFor="contact-subject" className="block text-xs font-medium text-navy mb-1.5">
            Assunto
          </label>
          <select
            id="contact-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-xl border border-border-subtle bg-white px-4 py-2.5 text-sm text-text-main focus:border-institutional focus:outline-none focus:ring-2 focus:ring-light-blue"
          >
            <option value="Informações sobre consulta">Informações sobre consulta</option>
            <option value="Avaliação em Hematologia">Avaliação em Hematologia</option>
            <option value="Transplante de Medula Óssea (TMO)">Transplante de Medula Óssea (TMO)</option>
            <option value="Outros assuntos">Outros assuntos</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-medium text-navy mb-1.5">
          Mensagem *
        </label>
        <textarea
          id="contact-message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Descreva brevemente como podemos ajudar. Evite enviar dados clínicos sensíveis ou laudos por este formulário."
          className="w-full rounded-xl border border-border-subtle bg-white px-4 py-2.5 text-sm text-text-main focus:border-institutional focus:outline-none focus:ring-2 focus:ring-light-blue"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div>
          <label htmlFor="human-check" className="block text-xs font-medium text-navy mb-1.5">
            Verificação de segurança: quanto é 4 + 3? *
          </label>
          <input
            id="human-check"
            type="text"
            required
            value={humanCheck}
            onChange={(e) => setHumanCheck(e.target.value)}
            placeholder="Digite o resultado"
            className="w-full rounded-xl border border-border-subtle bg-white px-4 py-2 text-sm text-text-main focus:border-institutional focus:outline-none focus:ring-2 focus:ring-light-blue"
          />
        </div>
      </div>

      <label className="flex items-start gap-2.5 text-xs text-text-muted cursor-pointer pt-1">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 rounded border-border-subtle text-navy focus:ring-institutional"
        />
        <span>
          Concordo com o tratamento dos meus dados pessoais exclusivamente para retorno deste contato, conforme a{" "}
          <Link href="/privacidade" className="text-institutional underline">
            Política de Privacidade (LGPD)
          </Link>
          .
        </span>
      </label>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-2.5 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-white hover:bg-institutional transition-colors disabled:opacity-60"
      >
        <Send className="w-4 h-4" />
        {status === "sending" ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}
