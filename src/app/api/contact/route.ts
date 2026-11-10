import { Resend } from "resend";
import { escapeHtml, validateContact } from "@/lib/contact";

// Limite simple par IP (mémoire de l'instance, au mieux).
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const data = validateContact(body);
  if (!data) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  // Robot détecté : on répond OK sans envoyer.
  if (data.company) return Response.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("RESEND_API_KEY ou CONTACT_TO_EMAIL manquant");
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to,
    replyTo: data.email,
    subject: `[Portfolio · ${data.subject}] ${data.name}`,
    html: `
      <p><strong>Nom :</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email :</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Sujet :</strong> ${escapeHtml(data.subject)}</p>
      <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
    `,
  });

  if (error) {
    console.error("Resend:", error);
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
