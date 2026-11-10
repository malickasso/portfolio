import { Resend } from "resend";
import { escapeHtml, validateContact } from "@/lib/contact";

// Limite simple par IP. Elle vit dans la mémoire de l'instance : c'est un frein,
// pas une garantie (voir README pour une limite au niveau de l'hébergeur).
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const MAX_BODY_BYTES = 20_000;

function rateLimited(ip: string) {
  const now = Date.now();
  // Purge des entrées expirées pour que la table ne grossisse pas indéfiniment.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

function clientIp(request: Request) {
  // x-real-ip est fixé par l'hébergeur (Vercel) et ne peut pas être forgé par le client.
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown"
  );
}

/** N'accepte que les envois venant du site lui-même. */
function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

const json = (body: object, status: number) => Response.json(body, { status });

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ ok: false, error: "forbidden" }, 403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return json({ ok: false, error: "unsupported" }, 415);
  }
  if (rateLimited(clientIp(request))) return json({ ok: false, error: "rate_limited" }, 429);

  const raw = await request.text().catch(() => "");
  if (raw.length === 0 || raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "invalid" }, 400);
  }
  let body: unknown = null;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "invalid" }, 400);
  }

  const data = validateContact(body);
  if (!data) return json({ ok: false, error: "invalid" }, 400);
  // Robot détecté : on répond OK sans envoyer.
  if (data.company) return json({ ok: true }, 200);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("RESEND_API_KEY ou CONTACT_TO_EMAIL manquant");
    return json({ ok: false, error: "not_configured" }, 503);
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
    return json({ ok: false, error: "send_failed" }, 502);
  }
  return json({ ok: true }, 200);
}
