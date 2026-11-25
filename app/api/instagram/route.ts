import { NextResponse } from "next/server";
import { readDb, writeDb, type InstagramHighlight } from "@/lib/db";

export async function GET() {
  const db = await readDb();
  return NextResponse.json({ highlights: db.instagramHighlights });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, caption, mediaType, imageUrl, postUrl } = body;

    if (!title || !caption) {
      return NextResponse.json(
        { error: "Título e legenda são obrigatórios." },
        { status: 400 }
      );
    }

    const db = await readDb();
    const newItem: InstagramHighlight = {
      id: `ig-${Date.now()}`,
      title: title.trim(),
      caption: caption.trim(),
      mediaType: mediaType === "video" ? "video" : "image",
      imageUrl: imageUrl?.trim() || "/images/hematologia-laboratorio.svg",
      postUrl:
        postUrl?.trim() || "https://www.instagram.com/drcelsomassumoto/",
      publishedAt: new Date().toISOString().split("T")[0],
    };

    db.instagramHighlights.unshift(newItem);
    await writeDb(db);

    return NextResponse.json({ highlight: newItem }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível salvar a publicação." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID obrigatório." }, { status: 400 });
  }
  const db = await readDb();
  db.instagramHighlights = db.instagramHighlights.filter((i) => i.id !== id);
  await writeDb(db);
  return NextResponse.json({ success: true });
}
