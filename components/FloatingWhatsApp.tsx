"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";

export function FloatingWhatsApp() {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar consulta pelo WhatsApp"
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 rounded-full bg-navy text-white px-4 py-3.5 shadow-[0_10px_30px_rgba(20,45,80,0.28)] border border-white/15 hover:bg-institutional transition-all duration-300 hover:-translate-y-0.5"
    >
      <MessageCircle className="w-5 h-5 text-light-blue" />
      <span className="hidden sm:inline text-sm font-medium pr-1">
        WhatsApp
      </span>
    </a>
  );
}
