import { NextResponse } from "next/server";
import { readDb, writeDb, type ContactMessage } from "@/lib/db";

export async function GET() {
  const db = await readDb();
  return NextResponse.json({ messages: db.contactMessages });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, consent, website, humanCheck } =
      body;

    // Anti-spam honeypot check
    if (website && String(website).trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    // Simple human verification check (expected "7")
    if (String(humanCheck).trim() !== "7") {
      return NextResponse.json(
        { error: "Verificação anti-spam incorreta. Responda 4 + 3." },
        { status: 400 }
      );
    }

    if (!name || !email || !message || !consent) {
      return NextResponse.json(
        {
          error:
            "Preencha os campos obrigatórios e confirme o consentimento de dados (LGPD).",
        },
        { status: 400 }
      );
    }

    const db = await readDb();
    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone || "").trim(),
      subject: String(subject || "Informações sobre consulta").trim(),
      message: String(message).trim(),
      consent: Boolean(consent),
      createdAt: new Date().toISOString(),
    };

    db.contactMessages.unshift(newMessage);
    await writeDb(db);

    return NextResponse.json({ success: true, id: newMessage.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível enviar sua mensagem." },
      { status: 500 }
    );
  }
}
