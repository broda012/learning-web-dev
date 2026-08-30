"use client";

import { useState } from "react";
import {
  qualifyLead,
  summarizeConversation,
  draftFollowUp,
  answerPropertyQuestion,
} from "./ai-actions";

function ResultBox({ text }) {
  if (!text) return null;
  return (
    <div className="mt-3 bg-slate-50 border border-slate-200 rounded-md p-3 text-sm whitespace-pre-wrap">
      {text}
    </div>
  );
}

export default function AITools({ contacts }) {
  const [qualifyContactId, setQualifyContactId] = useState(
    contacts[0]?.id ?? ""
  );
  const [qualifyResult, setQualifyResult] = useState("");
  const [qualifyLoading, setQualifyLoading] = useState(false);

  const [followUpContactId, setFollowUpContactId] = useState(
    contacts[0]?.id ?? ""
  );
  const [followUpResult, setFollowUpResult] = useState("");
  const [followUpLoading, setFollowUpLoading] = useState(false);

  const [transcript, setTranscript] = useState("");
  const [summaryResult, setSummaryResult] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);

  const [question, setQuestion] = useState("");
  const [answerResult, setAnswerResult] = useState("");
  const [answerLoading, setAnswerLoading] = useState(false);

  async function handleQualify() {
    setQualifyLoading(true);
    const { result, error } = await qualifyLead(Number(qualifyContactId));
    setQualifyResult(error || result);
    setQualifyLoading(false);
  }

  async function handleFollowUp() {
    setFollowUpLoading(true);
    const { result, error } = await draftFollowUp(Number(followUpContactId));
    setFollowUpResult(error || result);
    setFollowUpLoading(false);
  }

  async function handleSummarize() {
    setSummaryLoading(true);
    const { result, error } = await summarizeConversation(transcript);
    setSummaryResult(error || result);
    setSummaryLoading(false);
  }

  async function handleAnswer() {
    setAnswerLoading(true);
    const { result, error } = await answerPropertyQuestion(question);
    setAnswerResult(error || result);
    setAnswerLoading(false);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold mb-3">Qualify a Lead</h3>
        <div className="flex gap-2">
          <select
            value={qualifyContactId}
            onChange={(e) => setQualifyContactId(e.target.value)}
            className="border border-slate-300 rounded-md px-2 py-1.5 text-sm flex-1"
          >
            {contacts.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleQualify}
            disabled={qualifyLoading}
            className="bg-slate-900 hover:bg-slate-800 transition-colors text-white text-sm font-semibold px-4 py-1.5 rounded-md disabled:opacity-50"
          >
            {qualifyLoading ? "..." : "Qualify"}
          </button>
        </div>
        <ResultBox text={qualifyResult} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold mb-3">Draft Follow-up Message</h3>
        <div className="flex gap-2">
          <select
            value={followUpContactId}
            onChange={(e) => setFollowUpContactId(e.target.value)}
            className="border border-slate-300 rounded-md px-2 py-1.5 text-sm flex-1"
          >
            {contacts.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleFollowUp}
            disabled={followUpLoading}
            className="bg-slate-900 hover:bg-slate-800 transition-colors text-white text-sm font-semibold px-4 py-1.5 rounded-md disabled:opacity-50"
          >
            {followUpLoading ? "..." : "Draft"}
          </button>
        </div>
        <ResultBox text={followUpResult} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold mb-3">Summarize a Conversation</h3>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Paste a conversation or notes here..."
          rows={3}
          className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
        />
        <button
          onClick={handleSummarize}
          disabled={summaryLoading}
          className="mt-2 bg-slate-900 hover:bg-slate-800 transition-colors text-white text-sm font-semibold px-4 py-1.5 rounded-md disabled:opacity-50"
        >
          {summaryLoading ? "..." : "Summarize"}
        </button>
        <ResultBox text={summaryResult} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold mb-3">Ask About a Property</h3>
        <div className="flex gap-2">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. What 2-bedroom listings do we have?"
            className="flex-1 border border-slate-300 rounded-md px-3 py-1.5 text-sm"
          />
          <button
            onClick={handleAnswer}
            disabled={answerLoading}
            className="bg-slate-900 hover:bg-slate-800 transition-colors text-white text-sm font-semibold px-4 py-1.5 rounded-md disabled:opacity-50"
          >
            {answerLoading ? "..." : "Ask"}
          </button>
        </div>
        <ResultBox text={answerResult} />
      </div>
    </div>
  );
}
