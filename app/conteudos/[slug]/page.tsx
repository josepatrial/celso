import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { ArrowLeft, Calendar, Clock, User, CalendarCheck } from "lucide-react";
import { readDb } from "@/lib/db";
import { DOCTOR_INFO, getWhatsAppUrl } from "@/lib/constants";
import { ShareButtons } from "@/components/ShareButtons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const db = await readDb();
  const article = db.articles.find((a) => a.slug === slug);

  if (!article) {
    return { title: "Artigo não encontrado" };
  }

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.summary,
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.summary,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
  };
}

function renderArticleBody(content: string) {
  const blocks = content.split("\n\n").filter(Boolean);
  return blocks.map((block, idx) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("## ")) {
      return <h2 key={idx}>{trimmed.replace(/^##\s+/, "")}</h2>;
    }
    if (trimmed.startsWith("### ")) {
      return <h3 key={idx}>{trimmed.replace(/^###\s+/, "")}</h3>;
    }
    if (trimmed.startsWith("- ")) {
      const items = trimmed
        .split("\n")
        .map((line) => line.replace(/^-\s+/, "").trim())
        .filter(Boolean);
      return (
        <ul key={idx}>
          {items.map((item, i) => (
            <li
              key={i}
              dangerouslySetInnerHTML={{
                __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
              }}
            />
          ))}
        </ul>
      );
    }
    return (
      <p
        key={idx}
        dangerouslySetInnerHTML={{
          __html: trimmed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
        }}
      />
    );
  });
}

async function ArticleContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connection();
  const { slug } = await params;
  const db = await readDb();
  const article = db.articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="bg-white">
      <header className="bg-gradient-to-b from-light-blue/55 to-white pt-12 pb-12 border-b border-border-subtle/70">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 space-y-6">
          <Link
            href="/conteudos"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-institutional hover:text-navy transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar para conteúdos
          </Link>

          <div className="space-y-4">
            <span className="inline-block rounded-full bg-white border border-border-subtle px-3.5 py-1 text-xs font-semibold text-navy">
              {article.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-navy leading-[1.15]">
              {article.title}
            </h1>
            <p className="text-base sm:text-lg text-text-muted leading-relaxed">
              {article.summary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 pt-2 text-xs text-text-muted">
            <span className="inline-flex items-center gap-1.5 font-medium text-navy">
              <User className="w-3.5 h-3.5 text-institutional" />
              {article.author} ({DOCTOR_INFO.crm})
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-institutional" />
              {new Date(article.publishedAt + "T12:00:00").toLocaleDateString(
                "pt-BR",
                { day: "2-digit", month: "long", year: "numeric" }
              )}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-institutional" />
              {article.readTime}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 sm:px-8 py-12 space-y-10">
        <div className="rounded-3xl overflow-hidden border border-border-subtle shadow-sm aspect-[16/9] bg-soft-gray">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose-medical max-w-none">
          {renderArticleBody(article.content)}
        </div>

        <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <ShareButtons title={article.title} slug={article.slug} />
        </div>

        <div className="rounded-3xl bg-soft-gray border border-border-subtle p-7 sm:p-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <p className="font-serif text-2xl font-semibold text-navy">
              Dúvidas sobre este tema?
            </p>
            <p className="text-sm text-text-muted">
              Este conteúdo tem caráter informativo. Para avaliação individualizada, agende uma consulta médica.
            </p>
          </div>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-white hover:bg-institutional transition-colors"
          >
            <CalendarCheck className="w-4 h-4" />
            Agendar consulta
          </a>
        </div>
      </div>
    </article>
  );
}

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-4xl px-5 py-20">
          <div className="h-96 rounded-3xl bg-soft-gray animate-pulse" />
        </div>
      }
    >
      <ArticleContent params={params} />
    </Suspense>
  );
}
