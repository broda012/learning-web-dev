"use client";

import { useState } from "react";

const WEBHOOK_URL = "https://broda12.app.n8n.cloud/webhook/driveway-lead";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Driveway Wash");
  const [frequency, setFrequency] = useState("one-time");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message: `${service} - ${
            frequency === "recurring" ? "Recurring" : "One-time"
          } service requested.`,
        }),
      });
    } catch (error) {
      console.error("Failed to notify booking system:", error);
    }

    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white text-slate-900 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold mb-2">Thanks, {name}!</h3>
        <p className="text-slate-600">
          Your {frequency === "recurring" ? "recurring" : "one-time"}{" "}
          {service.toLowerCase()} request has been received.
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
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <label className="block text-sm font-medium mb-1">Service</label>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full border border-slate-300 rounded-md px-4 py-2"
        >
          <option>Driveway Wash</option>
          <option>Driveway + Walkway</option>
          <option>Bin Cleaning</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Frequency</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="frequency"
              checked={frequency === "one-time"}
              onChange={() => setFrequency("one-time")}
            />
            One-Time
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="frequency"
              checked={frequency === "recurring"}
              onChange={() => setFrequency("recurring")}
            />
            Recurring
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-teal-500 hover:bg-teal-600 transition-colors text-white font-semibold py-3 rounded-md mt-2 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Book Now"}
      </button>
    </form>
  );
}
