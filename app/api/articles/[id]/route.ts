import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const db = await readDb();
  const article = db.articles.find((a) => a.id === id || a.slug === id);
  if (!article) {
    return NextResponse.json({ error: "Artigo não encontrado." }, { status: 404 });
  }
  return NextResponse.json({ article });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const updates = await request.json();
    const db = await readDb();
    const index = db.articles.findIndex((a) => a.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Artigo não encontrado." }, { status: 404 });
    }

    db.articles[index] = {
      ...db.articles[index],
      ...updates,
      id: db.articles[index].id,
    };

    await writeDb(db);
    return NextResponse.json({ article: db.articles[index] });
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar artigo." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const db = await readDb();
  const filtered = db.articles.filter((a) => a.id !== id);

  if (filtered.length === db.articles.length) {
    return NextResponse.json({ error: "Artigo não encontrado." }, { status: 404 });
  }

  db.articles = filtered;
  await writeDb(db);
  return NextResponse.json({ success: true });
}
