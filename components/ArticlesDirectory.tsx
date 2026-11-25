"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import type { Article } from "@/lib/db";

export function ArticlesDirectory({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(articles.map((a) => a.category)));
    return ["Todas", ...cats];
  }, [articles]);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchCat =
        selectedCategory === "Todas" || a.category === selectedCategory;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [articles, query, selectedCategory]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-navy text-white"
                  : "bg-soft-gray text-text-main hover:bg-light-blue"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar artigo..."
            className="w-full rounded-full border border-border-subtle bg-white pl-10 pr-4 py-2 text-sm text-text-main focus:border-institutional focus:outline-none focus:ring-2 focus:ring-light-blue"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border-subtle bg-soft-gray/50 p-12 text-center text-sm text-text-muted">
          Nenhum artigo encontrado para o filtro selecionado.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col rounded-2xl border border-border-subtle bg-white overflow-hidden shadow-[0_4px_20px_rgba(20,45,80,0.03)] hover:shadow-[0_14px_36px_rgba(20,45,80,0.09)] transition-all duration-300"
            >
              <Link
                href={`/conteudos/${article.slug}`}
                className="relative aspect-[16/10] overflow-hidden bg-soft-gray"
              >
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy shadow-sm">
                  {article.category}
                </span>
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-xs text-text-muted mb-2.5">
                  <span>
                    {new Date(article.publishedAt + "T12:00:00").toLocaleDateString(
                      "pt-BR",
                      { day: "2-digit", month: "short", year: "numeric" }
                    )}
                  </span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-navy leading-snug group-hover:text-institutional transition-colors">
                  <Link href={`/conteudos/${article.slug}`}>{article.title}</Link>
                </h2>
                <p className="mt-2.5 text-sm text-text-muted leading-relaxed line-clamp-3 flex-1">
                  {article.summary}
                </p>
                <div className="mt-5 pt-4 border-t border-border-subtle flex items-center justify-between">
                  <span className="text-xs font-medium text-navy">
                    {article.author}
                  </span>
                  <Link
                    href={`/conteudos/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-institutional group-hover:gap-2 transition-all"
                  >
                    Ler artigo
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
