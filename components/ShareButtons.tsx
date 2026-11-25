"use client";

import { useState } from "react";
import { Share2, Check, MessageCircle } from "lucide-react";
import { LinkedInIcon } from "@/components/BrandIcons";

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/conteudos/${slug}`;
    }
    return `/conteudos/${slug}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard failure
    }
  };

  const shareWhatsApp = () => {
    const url = encodeURIComponent(`${title} — ${getUrl()}`);
    window.open(`https://api.whatsapp.com/send?text=${url}`, "_blank", "noopener,noreferrer");
  };

  const shareLinkedIn = () => {
    const url = encodeURIComponent(getUrl());
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="text-xs font-medium uppercase tracking-wider text-text-muted mr-1">
        Compartilhar:
      </span>
      <button
        type="button"
        onClick={shareWhatsApp}
        className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-white px-3.5 py-1.5 text-xs font-medium text-navy hover:bg-light-blue transition-colors"
      >
        <MessageCircle className="w-3.5 h-3.5 text-institutional" />
        WhatsApp
      </button>
      <button
        type="button"
        onClick={shareLinkedIn}
        className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-white px-3.5 py-1.5 text-xs font-medium text-navy hover:bg-light-blue transition-colors"
      >
        <LinkedInIcon className="w-3.5 h-3.5 text-institutional" />
        LinkedIn
      </button>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-white px-3.5 py-1.5 text-xs font-medium text-navy hover:bg-light-blue transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            Link copiado
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5 text-institutional" />
            Copiar link
          </>
        )}
      </button>
    </div>
  );
}
