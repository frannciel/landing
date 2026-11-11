import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const required = ["empresa", "cnpj", "responsavel", "cargo", "email", "whatsapp", "contratos", "notas"];
    if (required.some((field) => !data[field])) return NextResponse.json({ error: "Campos obrigatórios ausentes." }, { status: 400 });

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.LEADS_EMAIL;
    const from = process.env.FROM_EMAIL || "RecebeGov <onboarding@resend.dev>";
    if (!apiKey || !to) return NextResponse.json({ error: "Integração de e-mail não configurada." }, { status: 503 });

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Novo candidato ao piloto RecebeGov: ${data.empresa}`,
      html: `<h2>Nova inscrição no programa piloto</h2>
        <p><b>Empresa:</b> ${escapeHtml(data.empresa)}</p>
        <p><b>CNPJ:</b> ${escapeHtml(data.cnpj)}</p>
        <p><b>Responsável:</b> ${escapeHtml(data.responsavel)}</p>
        <p><b>Cargo:</b> ${escapeHtml(data.cargo)}</p>
        <p><b>E-mail:</b> ${escapeHtml(data.email)}</p>
        <p><b>WhatsApp:</b> ${escapeHtml(data.whatsapp)}</p>
        <p><b>Contratos federais:</b> ${escapeHtml(data.contratos)}</p>
        <p><b>Notas por mês:</b> ${escapeHtml(data.notas)}</p>
        <p><b>Principal dificuldade:</b><br>${escapeHtml(data.dificuldade || "Não informada")}</p>`
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}

function escapeHtml(value: unknown) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" }[char] || char));
}
