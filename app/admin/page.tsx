"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  FileText,
  Lock,
  LogOut,
  Mail,
  Pencil,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { InstagramIcon } from "@/components/BrandIcons";
import type { Article, ContactMessage, InstagramHighlight } from "@/lib/db";

const COVER_OPTIONS = [
  { label: "Hematologia & Laboratório", value: "/images/hematologia-laboratorio.svg" },
  { label: "Transplante de Medula Óssea", value: "/images/tmo-editorial.svg" },
  { label: "Consulta & Acolhimento", value: "/images/consulta-acolhimento.svg" },
];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<"articles" | "instagram" | "messages">("articles");

  const [articles, setArticles] = useState<Article[]>([]);
  const [highlights, setHighlights] = useState<InstagramHighlight[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [toast, setToast] = useState("");

  // Article form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("Hematologia");
  const [coverImage, setCoverImage] = useState("/images/hematologia-laboratorio.svg");
  const [readTime, setReadTime] = useState("4 min de leitura");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [content, setContent] = useState("");

  // Instagram form state
  const [igTitle, setIgTitle] = useState("");
  const [igCaption, setIgCaption] = useState("");
  const [igMediaType, setIgMediaType] = useState<"image" | "video">("image");
  const [igImageUrl, setIgImageUrl] = useState("/images/hematologia-laboratorio.svg");
  const [igPostUrl, setIgPostUrl] = useState("https://www.instagram.com/drcelsomassumoto/");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const loadAll = async () => {
    const [artRes, igRes, msgRes] = await Promise.all([
      fetch("/api/articles"),
      fetch("/api/instagram"),
      fetch("/api/contact"),
    ]);
    if (artRes.ok) {
      const d = await artRes.json();
      setArticles(d.articles || []);
    }
    if (igRes.ok) {
      const d = await igRes.json();
      setHighlights(d.highlights || []);
    }
    if (msgRes.ok) {
      const d = await msgRes.json();
      setMessages(d.messages || []);
    }
  };

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setAuthError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      await loadAll();
    } else {
      setAuthError("Senha incorreta. Verifique e tente novamente.");
    }
  }

  function resetArticleForm() {
    setEditingId(null);
    setTitle("");
    setSummary("");
    setCategory("Hematologia");
    setCoverImage("/images/hematologia-laboratorio.svg");
    setReadTime("4 min de leitura");
    setSeoTitle("");
    setSeoDescription("");
    setContent("");
  }

  function startEditArticle(a: Article) {
    setEditingId(a.id);
    setTitle(a.title);
    setSummary(a.summary);
    setCategory(a.category);
    setCoverImage(a.coverImage);
    setReadTime(a.readTime);
    setSeoTitle(a.seoTitle);
    setSeoDescription(a.seoDescription);
    setContent(a.content);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSaveArticle(e: FormEvent) {
    e.preventDefault();
    const payload = {
      title,
      summary,
      category,
      coverImage,
      readTime,
      seoTitle: seoTitle || `${title} | Dr. Celso Massumoto`,
      seoDescription: seoDescription || summary.slice(0, 155),
      content,
    };

    const res = editingId
      ? await fetch(`/api/articles/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/articles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    if (res.ok) {
      showToast(editingId ? "Artigo atualizado!" : "Artigo publicado!");
      resetArticleForm();
      loadAll();
    }
  }

  async function handleDeleteArticle(id: string) {
    const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Artigo excluído.");
      loadAll();
    }
  }

  async function handleSaveIg(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/instagram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: igTitle,
        caption: igCaption,
        mediaType: igMediaType,
        imageUrl: igImageUrl,
        postUrl: igPostUrl,
      }),
    });
    if (res.ok) {
      showToast("Destaque do Instagram adicionado!");
      setIgTitle("");
      setIgCaption("");
      loadAll();
    }
  }

  async function handleDeleteIg(id: string) {
    const res = await fetch(`/api/instagram?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      showToast("Publicação removida.");
      loadAll();
    }
  }

  if (!authed) {
    return (
      <div className="min-h-[75vh] bg-soft-gray flex items-center justify-center px-5 py-16">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-3xl bg-white border border-border-subtle p-8 sm:p-10 shadow-sm space-y-6"
        >
          <div className="w-12 h-12 rounded-2xl bg-light-blue text-navy flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div className="text-center space-y-1.5">
            <h1 className="font-serif text-3xl font-semibold text-navy">
              Painel Editorial
            </h1>
            <p className="text-xs text-text-muted">
              Gerenciamento de artigos, destaques do Instagram e mensagens.
            </p>
          </div>
          <div>
            <label htmlFor="admin-pass" className="block text-xs font-medium text-navy mb-1.5">
              Senha de acesso
            </label>
            <input
              id="admin-pass"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha editorial"
              className="w-full rounded-xl border border-border-subtle px-4 py-2.5 text-sm focus:border-institutional focus:outline-none focus:ring-2 focus:ring-light-blue"
            />
            <p className="mt-1.5 text-[11px] text-text-muted">
              Senha padrão de demonstração: <code className="bg-soft-gray px-1.5 py-0.5 rounded">celso2026</code>
            </p>
          </div>
          {authError && <p className="text-xs text-red-600">{authError}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-navy py-3 text-sm font-medium text-white hover:bg-institutional transition-colors"
          >
            Entrar no painel
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-gray py-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-border-subtle p-6">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-navy">
              Painel Administrativo — Dr. Celso Massumoto
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Cadastre, edite ou exclua artigos educativos, gerencie destaques do Instagram e acompanhe mensagens.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAuthed(false)}
            className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-4 py-2 text-xs font-medium text-navy hover:bg-soft-gray transition-colors self-start"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sair
          </button>
        </div>

        {toast && (
          <div className="flex items-center gap-2 rounded-xl bg-navy text-white px-4 py-3 text-xs font-medium shadow-md">
            <CheckCircle2 className="w-4 h-4 text-light-blue" />
            <span>{toast}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("articles")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition-colors ${
              activeTab === "articles"
                ? "bg-navy text-white"
                : "bg-white text-navy border border-border-subtle hover:bg-light-blue/50"
            }`}
          >
            <FileText className="w-4 h-4" />
            Artigos ({articles.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("instagram")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition-colors ${
              activeTab === "instagram"
                ? "bg-navy text-white"
                : "bg-white text-navy border border-border-subtle hover:bg-light-blue/50"
            }`}
          >
            <InstagramIcon className="w-4 h-4" />
            Destaques Instagram ({highlights.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("messages")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition-colors ${
              activeTab === "messages"
                ? "bg-navy text-white"
                : "bg-white text-navy border border-border-subtle hover:bg-light-blue/50"
            }`}
          >
            <Mail className="w-4 h-4" />
            Mensagens ({messages.length})
          </button>
        </div>

        {/* ARTICLES TAB */}
        {activeTab === "articles" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <form
              onSubmit={handleSaveArticle}
              className="lg:col-span-6 rounded-2xl bg-white border border-border-subtle p-6 space-y-4 h-fit"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-semibold text-navy">
                  {editingId ? "Editar Artigo" : "Novo Artigo"}
                </h2>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetArticleForm}
                    className="text-xs text-institutional underline"
                  >
                    Cancelar edição
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-navy mb-1">
                  Título *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-border-subtle px-3.5 py-2 text-sm"
                  placeholder="Ex.: O que é ferritina baixa?"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-navy mb-1">
                    Categoria
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-border-subtle px-3.5 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy mb-1">
                    Tempo de leitura
                  </label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full rounded-xl border border-border-subtle px-3.5 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-navy mb-1">
                  Imagem de capa
                </label>
                <select
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full rounded-xl border border-border-subtle px-3.5 py-2 text-sm"
                >
                  {COVER_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-navy mb-1">
                  Resumo *
                </label>
                <textarea
                  rows={2}
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full rounded-xl border border-border-subtle px-3.5 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-navy mb-1">
                  Conteúdo completo * (use ## para subtítulos e - para listas)
                </label>
                <textarea
                  rows={7}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full rounded-xl border border-border-subtle px-3.5 py-2 text-sm font-mono"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2 border-t border-border-subtle">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-institutional">
                  SEO Individual
                </p>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Título SEO (opcional)"
                  className="w-full rounded-xl border border-border-subtle px-3.5 py-2 text-xs"
                />
                <input
                  type="text"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Meta descrição SEO (opcional)"
                  className="w-full rounded-xl border border-border-subtle px-3.5 py-2 text-xs"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-sm font-medium text-white hover:bg-institutional transition-colors"
              >
                <Plus className="w-4 h-4" />
                {editingId ? "Salvar alterações" : "Publicar artigo"}
              </button>
            </form>

            <div className="lg:col-span-6 space-y-3">
              {articles.map((a) => (
                <div
                  key={a.id}
                  className="rounded-2xl bg-white border border-border-subtle p-5 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-institutional">
                      {a.category} · {a.publishedAt}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-navy">
                      {a.title}
                    </h3>
                    <p className="text-xs text-text-muted line-clamp-2">
                      {a.summary}
                    </p>
                    <Link
                      href={`/conteudos/${a.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-institutional hover:underline pt-1"
                    >
                      Visualizar página
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEditArticle(a)}
                      aria-label={`Editar ${a.title}`}
                      className="p-2 rounded-lg border border-border-subtle text-navy hover:bg-light-blue transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteArticle(a.id)}
                      aria-label={`Excluir ${a.title}`}
                      className="p-2 rounded-lg border border-border-subtle text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INSTAGRAM TAB */}
        {activeTab === "instagram" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <form
              onSubmit={handleSaveIg}
              className="lg:col-span-5 rounded-2xl bg-white border border-border-subtle p-6 space-y-4 h-fit"
            >
              <h2 className="font-serif text-2xl font-semibold text-navy">
                Adicionar Destaque do Instagram
              </h2>
              <div>
                <label className="block text-xs font-medium text-navy mb-1">
                  Título do post *
                </label>
                <input
                  type="text"
                  required
                  value={igTitle}
                  onChange={(e) => setIgTitle(e.target.value)}
                  className="w-full rounded-xl border border-border-subtle px-3.5 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-navy mb-1">
                  Legenda resumida *
                </label>
                <textarea
                  rows={3}
                  required
                  value={igCaption}
                  onChange={(e) => setIgCaption(e.target.value)}
                  className="w-full rounded-xl border border-border-subtle px-3.5 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-navy mb-1">
                    Tipo
                  </label>
                  <select
                    value={igMediaType}
                    onChange={(e) =>
                      setIgMediaType(e.target.value === "video" ? "video" : "image")
                    }
                    className="w-full rounded-xl border border-border-subtle px-3.5 py-2 text-sm"
                  >
                    <option value="image">Imagem / Carrossel</option>
                    <option value="video">Vídeo / Reels</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy mb-1">
                    Capa
                  </label>
                  <select
                    value={igImageUrl}
                    onChange={(e) => setIgImageUrl(e.target.value)}
                    className="w-full rounded-xl border border-border-subtle px-3.5 py-2 text-sm"
                  >
                    {COVER_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-navy mb-1">
                  Link da publicação no Instagram
                </label>
                <input
                  type="url"
                  value={igPostUrl}
                  onChange={(e) => setIgPostUrl(e.target.value)}
                  className="w-full rounded-xl border border-border-subtle px-3.5 py-2 text-sm"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-sm font-medium text-white hover:bg-institutional transition-colors"
              >
                <Plus className="w-4 h-4" />
                Adicionar destaque
              </button>
            </form>

            <div className="lg:col-span-7 space-y-3">
              {highlights.map((h) => (
                <div
                  key={h.id}
                  className="rounded-2xl bg-white border border-border-subtle p-5 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-institutional">
                      {h.mediaType === "video" ? "Vídeo / Reels" : "Imagem"} · {h.publishedAt}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-navy">
                      {h.title}
                    </h3>
                    <p className="text-xs text-text-muted">{h.caption}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteIg(h.id)}
                    aria-label={`Remover ${h.title}`}
                    className="p-2 rounded-lg border border-border-subtle text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === "messages" && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="rounded-2xl bg-white border border-border-subtle p-12 text-center text-sm text-text-muted">
                Nenhuma mensagem recebida pelo formulário de contato até o momento.
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className="rounded-2xl bg-white border border-border-subtle p-6 space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-navy text-sm">
                      {m.name} — <span className="text-institutional">{m.subject}</span>
                    </p>
                    <span className="text-xs text-text-muted">
                      {new Date(m.createdAt).toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted">
                    {m.email} {m.phone ? `· ${m.phone}` : ""}
                  </p>
                  <p className="text-sm text-text-main pt-1">{m.message}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
