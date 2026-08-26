"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white text-slate-900 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold mb-2">Thanks, {name}!</h3>
        <p className="text-slate-600">
          We've received your request and will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-slate-900 rounded-lg p-8 flex flex-col gap-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-slate-300 rounded-md px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-slate-300 rounded-md px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          What do you need help with?
        </label>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-slate-300 rounded-md px-4 py-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-md"
      >
        Request a Quote
      </button>
    </form>
  );
}
