import type { NextRequest } from "next/server";
import { buildPersonaPrompt } from "@/lib/persona";

export const runtime = "edge";

type Role = "user" | "assistant";
type ClientMessage = { role: Role; content: string };

type Body = {
  model?: string;
  messages?: ClientMessage[];
};

// Keep request payloads sane — the persona prompt is already large.
const MAX_MESSAGES = 40;
const MAX_CONTENT_CHARS = 4000;

// Per-IP sliding-window rate limit. In-memory only: this is per-edge-instance
// and resets on redeploy, which is acceptable for a personal site. For
// stricter guarantees, swap this for Vercel KV / Upstash Redis.
const RATE_LIMIT_MAX = 8;
const RATE_LIMIT_WINDOW_MS = 60_000;
const ipHits = new Map<string, number[]>();

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

type RateResult =
  | { allowed: true; remaining: number }
  | { allowed: false; retryAfterSec: number };

function checkRate(ip: string): RateResult {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const recent = (ipHits.get(ip) ?? []).filter((t) => t > cutoff);

  if (recent.length >= RATE_LIMIT_MAX) {
    const retryAfterSec = Math.max(
      1,
      Math.ceil((recent[0] + RATE_LIMIT_WINDOW_MS - now) / 1000),
    );
    ipHits.set(ip, recent);
    return { allowed: false, retryAfterSec };
  }

  recent.push(now);
  ipHits.set(ip, recent);
  return { allowed: true, remaining: RATE_LIMIT_MAX - recent.length };
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response(
      "OPENROUTER_API_KEY is not configured on the server.",
      { status: 500 },
    );
  }

  const ip = clientIp(req);
  const rate = checkRate(ip);
  if (!rate.allowed) {
    return new Response(
      `Too many requests. Try again in ${rate.retryAfterSec}s.`,
      {
        status: 429,
        headers: {
          "Retry-After": String(rate.retryAfterSec),
          "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
          "X-RateLimit-Remaining": "0",
        },
      },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return new Response("Invalid JSON body.", { status: 400 });
  }

  const { model, messages } = body;
  if (typeof model !== "string" || !Array.isArray(messages)) {
    return new Response("Body must include `model` and `messages`.", {
      status: 400,
    });
  }

  if (messages.length === 0 || messages.length > MAX_MESSAGES) {
    return new Response(
      `Expected between 1 and ${MAX_MESSAGES} messages.`,
      { status: 400 },
    );
  }

  // Strip anything that isn't a plain user/assistant turn. The system prompt
  // is added below — we never trust a client-supplied system role.
  const sanitized: ClientMessage[] = [];
  for (const m of messages) {
    if (!m || typeof m.content !== "string") continue;
    if (m.role !== "user" && m.role !== "assistant") continue;
    if (m.content.length > MAX_CONTENT_CHARS) continue;
    sanitized.push({ role: m.role, content: m.content });
  }
  if (sanitized.length === 0) {
    return new Response("No valid messages in request.", { status: 400 });
  }

  const upstreamMessages = [
    { role: "system" as const, content: buildPersonaPrompt() },
    ...sanitized,
  ];

  const upstream = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://lymperisperakis.com",
        "X-Title": "lymperisperakis.com - Ask the site",
      },
      body: JSON.stringify({
        model,
        messages: upstreamMessages,
        stream: true,
        temperature: 0.5,
        top_p: 0.9,
      }),
    },
  );

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => "");
    return new Response(text || `Upstream error (${upstream.status})`, {
      status: upstream.status || 502,
    });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
