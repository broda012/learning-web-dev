import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SERVICES = [
  "Emergency Plumbing",
  "Drain Cleaning",
  "Water Heater Repair",
  "Pipe Installation & Repair",
];

const SERVICE_AREAS = [
  "North York",
  "Scarborough",
  "Etobicoke",
  "Downtown Toronto",
  "Mississauga",
  "Vaughan",
  "Markham",
  "Richmond Hill",
];

const FAQS = [
  {
    q: "Do you offer emergency plumbing services?",
    a: "Yes, we're available 24/7 for emergencies like burst pipes, major leaks, and blocked drains.",
  },
  {
    q: "How much does a service call cost?",
    a: "Every job is different, so we provide a clear quote before any work begins — no hidden fees.",
  },
  {
    q: "Are your plumbers licensed and insured?",
    a: "Yes, all of our plumbers are fully licensed and insured for your protection.",
  },
];

const SYSTEM_PROMPT = `You are a friendly customer service assistant for Toronto Plumbing Co.

Only answer using the information below. If you don't know something, say so and suggest calling (123) 456-7890 — never make up details about pricing, availability, or services.

Services offered:
${SERVICES.map((s) => `- ${s}`).join("\n")}

Frequently asked questions:
${FAQS.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}

For any question about whether a specific neighborhood or area is serviced, use the check_service_area tool instead of guessing.

Keep replies short and conversational — 1-3 sentences.`;

const checkServiceAreaTool = {
  name: "check_service_area",
  description:
    "Check whether a specific neighborhood or city is within the company's service area.",
  input_schema: {
    type: "object",
    properties: {
      area: {
        type: "string",
        description: "The neighborhood or city name the customer asked about.",
      },
    },
    required: ["area"],
  },
};

function checkServiceArea(area) {
  const normalized = area.trim().toLowerCase();
  const match = SERVICE_AREAS.find(
    (a) =>
      a.toLowerCase() === normalized ||
      a.toLowerCase().includes(normalized) ||
      normalized.includes(a.toLowerCase())
  );
  return match
    ? { serviced: true, matchedArea: match }
    : { serviced: false, servicedAreas: SERVICE_AREAS };
}

const rateLimitLog = new Map();
const RATE_LIMIT_MAX = 8;
const RATE_LIMIT_WINDOW_MS = 60_000;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (rateLimitLog.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  rateLimitLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many messages. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  const { message } = await request.json();

  if (!message || typeof message !== "string") {
    return Response.json({ error: "Message is required." }, { status: 400 });
  }

  try {
    let messages = [{ role: "user", content: message }];

    while (true) {
      const response = await client.messages.create({
        model: "claude-opus-5",
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        tools: [checkServiceAreaTool],
        messages,
      });

      if (response.stop_reason !== "tool_use") {
        const textBlock = response.content.find((b) => b.type === "text");
        return Response.json({ reply: textBlock?.text ?? "" });
      }

      messages.push({ role: "assistant", content: response.content });

      const toolResults = [];
      for (const block of response.content) {
        if (block.type === "tool_use" && block.name === "check_service_area") {
          const result = checkServiceArea(block.input.area);
          toolResults.push({
            type: "tool_result",
            tool_use_id: block.id,
            content: JSON.stringify(result),
          });
        }
      }
      messages.push({ role: "user", content: toolResults });
    }
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Something went wrong. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
