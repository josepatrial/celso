import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const expected = process.env.ADMIN_PASSWORD || "celso2026";

    if (password === expected) {
      return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json(
      { error: "Senha incorreta." },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: "Erro ao validar acesso." },
      { status: 400 }
    );
  }
}
