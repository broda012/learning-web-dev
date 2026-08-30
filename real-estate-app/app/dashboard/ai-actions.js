"use server";

import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";

const client = new Anthropic();
const MODEL = "claude-opus-5";

export async function qualifyLead(contactId) {
  const supabase = await createClient();
  const { data: contact } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", contactId)
    .single();

  if (!contact) return { error: "Contact not found." };

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 400,
    system:
      "You are a real estate agent's assistant. Assess how qualified this lead is and suggest one concrete next step. Keep it to 2-3 short sentences.",
    messages: [
      {
        role: "user",
        content: `Contact: ${contact.name}\nSource: ${contact.source || "unknown"}\nCurrent stage: ${contact.stage}\nNotes: ${contact.notes || "none"}`,
      },
    ],
  });

  const text = response.content.find((b) => b.type === "text")?.text ?? "";
  return { result: text };
}

export async function summarizeConversation(transcript) {
  if (!transcript || typeof transcript !== "string") {
    return { error: "Please paste a conversation to summarize." };
  }

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 400,
    system:
      "You are a real estate agent's assistant. Summarize this conversation into 2-4 short bullet points covering what the client wants and any concerns raised.",
    messages: [{ role: "user", content: transcript }],
  });

  const text = response.content.find((b) => b.type === "text")?.text ?? "";
  return { result: text };
}

export async function draftFollowUp(contactId) {
  const supabase = await createClient();
  const { data: contact } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", contactId)
    .single();

  if (!contact) return { error: "Contact not found." };

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 400,
    system:
      "You are a real estate agent's assistant. Draft a short, warm follow-up text message (not email) to this contact, appropriate to their current stage. No subject line, just the message text.",
    messages: [
      {
        role: "user",
        content: `Contact: ${contact.name}\nStage: ${contact.stage}\nNotes: ${contact.notes || "none"}`,
      },
    ],
  });

  const text = response.content.find((b) => b.type === "text")?.text ?? "";
  return { result: text };
}

export async function answerPropertyQuestion(question) {
  if (!question || typeof question !== "string") {
    return { error: "Please ask a question." };
  }

  const supabase = await createClient();
  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .eq("status", "active");

  const listingsText = (listings || [])
    .map(
      (l) =>
        `- ${l.address}: $${l.price}, ${l.bedrooms} bed / ${l.bathrooms} bath. ${l.description || ""}`
    )
    .join("\n");

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 400,
    system: `You are a real estate agent's assistant. Only answer using the active listings below. If the answer isn't in this data, say so honestly.\n\nActive listings:\n${listingsText}`,
    messages: [{ role: "user", content: question }],
  });

  const text = response.content.find((b) => b.type === "text")?.text ?? "";
  return { result: text };
}
