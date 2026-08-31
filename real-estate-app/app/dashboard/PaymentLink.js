"use client";

import { useState } from "react";
import { createPaymentLink } from "./actions";

export default function PaymentLink({ contactId, contactName, currentDealValue }) {
  const [dealValue, setDealValue] = useState(currentDealValue || "");
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!dealValue) return;
    setLoading(true);
    const url = await createPaymentLink(contactId, contactName, dealValue);
    setLink(url);
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Deal $"
          value={dealValue}
          onChange={(e) => setDealValue(e.target.value)}
          className="w-20 border border-slate-300 rounded-md px-2 py-1 text-sm"
        />
        <button
          onClick={handleClick}
          disabled={loading || !dealValue}
          className="bg-slate-200 hover:bg-slate-300 transition-colors text-sm px-3 py-1 rounded-md disabled:opacity-50"
        >
          {loading ? "..." : "Create Link"}
        </button>
      </div>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-blue-600 underline break-all"
        >
          Payment link ready — click to view
        </a>
      )}
    </div>
  );
}
