import { NextResponse } from "next/server";
import { readDb, writeDb, slugify, type Article } from "@/lib/db";

export async function GET() {
  const db = await readDb();
  const sorted = [...db.articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return NextResponse.json({ articles: sorted });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      summary,
      content,
      coverImage,
      category,
      publishedAt,
      author,
      readTime,
      seoTitle,
      seoDescription,
    } = body;

    if (!title || !summary || !content) {
      return NextResponse.json(
        { error: "Título, resumo e conteúdo são obrigatórios." },
        { status: 400 }
      );
    }

    const db = await readDb();
    const baseSlug = slugify(title);
    const existingSlug = db.articles.some((a) => a.slug === baseSlug);
    const slug = existingSlug ? `${baseSlug}-${Date.now().toString().slice(-4)}` : baseSlug;

    const newArticle: Article = {
      id: `art-${Date.now()}`,
      slug,
      title: title.trim(),
      summary: summary.trim(),
      content: content.trim(),
      coverImage: coverImage?.trim() || "/images/hematologia-laboratorio.svg",
      category: category?.trim() || "Hematologia",
      publishedAt: publishedAt || new Date().toISOString().split("T")[0],
      author: author?.trim() || "Dr. Celso Massumoto",
      readTime: readTime?.trim() || "4 min de leitura",
      seoTitle: seoTitle?.trim() || `${title.trim()} | Dr. Celso Massumoto`,
      seoDescription: seoDescription?.trim() || summary.trim().slice(0, 155),
    };

    db.articles.unshift(newArticle);
    await writeDb(db);

    return NextResponse.json({ article: newArticle }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível criar o artigo." },
      { status: 500 }
    );
  }
}
