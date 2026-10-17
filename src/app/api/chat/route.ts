import { NextRequest, NextResponse } from "next/server";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

// Rate limiting in-memory storage (sliding window)
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string, limit = 20, windowMs = 60000): boolean {
  const now = Date.now();
  const clientData = rateLimitMap.get(ip);

  if (!clientData || now > clientData.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + windowMs });
    return true;
  }

  if (clientData.count >= limit) {
    return false;
  }

  clientData.count += 1;
  return true;
}

// Local FAQ Matcher for verified portfolio questions
function findLocalFAQMatch(query: string) {
  const normalized = query.toLowerCase().trim();

  // Score each FAQ based on matched keywords
  let bestMatch: (typeof PORTFOLIO_DATA.faqs)[0] | null = null;
  let highestScore = 0;

  for (const faq of PORTFOLIO_DATA.faqs) {
    let score = 0;
    // Check direct question containment
    if (normalized.includes(faq.question.toLowerCase())) {
      score += 10;
    }

    for (const keyword of faq.keywords) {
      if (normalized.includes(keyword.toLowerCase())) {
        score += 2;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = faq;
    }
  }

  if (bestMatch && highestScore >= 2) {
    return {
      reply: bestMatch.answer,
      source: "faq-fallback" as const,
      relatedLink: bestMatch.relatedLink,
      relatedLinkLabel: bestMatch.relatedLinkLabel,
    };
  }

  // Generic honest fallback when no specific keyword is matched
  return {
    reply:
      "I couldn't find an exact match in Ahmad's verified portfolio data for that query. Ahmad is an undergraduate Computer Science student focusing on AI, automation, and web development. He has explored three main projects: ShopLens (product comparison), Flexivo (desktop voice assistant), and WhatsApp Business Automation. Feel free to ask about his background, skills, or projects!",
    source: "faq-fallback" as const,
    relatedLink: "#projects",
    relatedLinkLabel: "Browse Projects",
  };
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous-client";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before sending another message." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);

    if (!body || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "Invalid request. A string 'message' parameter is required." },
        { status: 400 }
      );
    }

    const message = body.message.trim();

    if (!message) {
      return NextResponse.json(
        { error: "Message cannot be empty." },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "Message is too long. Please limit to 500 characters." },
        { status: 400 }
      );
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    const openaiApiKey = process.env.OPENAI_API_KEY;

    // 1. If Gemini API key is configured on server
    if (geminiApiKey) {
      try {
        const systemPrompt = `You are "Ahmad's AI Guide", a helpful, polite, and strictly honest portfolio assistant for Ahmad Hassan.
Ahmad Hassan's Verified Profile:
- Role: Computer Science Student | Aspiring AI & Automation Developer
- Status: Undergraduate Student in Pakistan
- Bio: Interested in AI, automation, and software development. Enjoys exploring new technologies and building practical projects.
- Skills:
  * Programming: C++, Python
  * Web: HTML, CSS, JavaScript, TypeScript, Next.js
  * Tools: Git, GitHub, VS Code, AI-assisted coding tools
- Projects:
  1. ShopLens: Product comparison and shopping research concept. In development. Next.js & Python.
  2. Flexivo: Experimental AI desktop assistant (voice commands & shortcuts). Early prototype.
  3. WhatsApp Business Automation: Webhook messaging exploration for routine communication. Concept / Prototype.
CRITICAL RULES:
- Never invent job titles, professional work experience, awards, user numbers, or commercial deployments.
- Accurately distinguish in-progress or experimental features from completed ones.
- Keep responses concise (2-4 sentences max).
- If information is not in this verified context, state that Ahmad hasn't documented it yet.
- Never output private keys, env vars, or sensitive info.`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `${systemPrompt}\n\nVisitor Question: "${message}"\nProvide a concise, verified response:`,
                    },
                  ],
                },
              ],
              generationConfig: {
                maxOutputTokens: 250,
                temperature: 0.2,
              },
            }),
            signal: AbortSignal.timeout(8000), // 8s timeout
          }
        );

        if (response.ok) {
          const data = await response.json();
          const candidateText =
            data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

          if (candidateText) {
            return NextResponse.json({
              reply: candidateText,
              source: "ai",
            });
          }
        }
      } catch (err) {
        console.warn("Gemini API call failed or timed out. Falling back to local FAQ matcher.", err);
      }
    }

    // 2. If OpenAI API key is configured on server
    if (openaiApiKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: `You are Ahmad's AI Guide, a strictly honest portfolio assistant for Ahmad Hassan (Computer Science student). Rely ONLY on verified facts: Student in Pakistan, exploring AI, automation, and web development (C++, Python, Next.js, TS). Projects: ShopLens (product research), Flexivo (desktop voice prototype), WhatsApp Automation (messaging exploration). Never invent employment or stats. Keep replies concise under 4 sentences.`,
              },
              { role: "user", content: message },
            ],
            max_tokens: 250,
            temperature: 0.2,
          }),
          signal: AbortSignal.timeout(8000),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content?.trim();
          if (reply) {
            return NextResponse.json({
              reply,
              source: "ai",
            });
          }
        }
      } catch (err) {
        console.warn("OpenAI API call failed or timed out. Falling back to local FAQ matcher.", err);
      }
    }

    // 3. Verified Local FAQ Fallback
    const fallbackResult = findLocalFAQMatch(message);
    return NextResponse.json(fallbackResult);
  } catch (error) {
    console.error("Assistant API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
