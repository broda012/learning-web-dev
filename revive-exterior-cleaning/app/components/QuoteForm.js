"use client";

import { useState } from "react";
import { services } from "../lib/site";

const WEBHOOK_URL = "https://broda12.app.n8n.cloud/webhook/driveway-bin-cleaning-lead";

const inputClasses =
  "w-full border border-(--color-border) rounded-lg px-4 py-3 text-sm text-(--color-body) placeholder:text-(--color-muted)/70 focus:outline-none focus:ring-2 focus:ring-(--color-terracotta) focus:border-transparent transition-shadow";

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function QuoteForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    service: services[0].name,
    bins: "",
    size: "",
    date: "",
    frequency: "one-time",
    notes: "",
  });
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) {
      setPhoto(null);
      return;
    }
    try {
      const dataUrl = await readFileAsDataURL(file);
      setPhoto({ name: file.name, dataUrl });
    } catch {
      setPhoto(null);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          photoName: photo?.name || null,
          photoDataUrl: photo?.dataUrl || null,
          message: `${form.service} - ${
            form.frequency === "recurring" ? "Recurring" : "One-time"
          } service requested. Bins: ${form.bins || "n/a"}. Approx size: ${
            form.size || "n/a"
          }. Preferred date: ${form.date || "n/a"}.`,
        }),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong sending your request. Please call or email us directly.");
    }

    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 md:p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-(--color-clay)/10 text-(--color-clay) flex items-center justify-center text-2xl mx-auto mb-5">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-(--color-ink) mb-2">
          Thanks, {form.name.split(" ")[0] || "there"}!
        </h3>
        <p className="text-(--color-muted)">
          Your quote request has been received. We'll be in touch shortly to
          confirm pricing and a time that works for you.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 md:p-10 flex flex-col gap-5"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
            Name
          </label>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
            Phone
          </label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
          Email
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputClasses}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
          Address / Postcode
        </label>
        <input
          required
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
          className={inputClasses}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
            Service Required
          </label>
          <select
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
            className={inputClasses}
          >
            {services.map((s) => (
              <option key={s.slug}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
            Preferred Date
          </label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
            Number of Bins (if applicable)
          </label>
          <input
            type="number"
            min="0"
            value={form.bins}
            onChange={(e) => update("bins", e.target.value)}
            className={inputClasses}
            placeholder="e.g. 2"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
            Approx. Driveway / Patio Size
          </label>
          <input
            value={form.size}
            onChange={(e) => update("size", e.target.value)}
            className={inputClasses}
            placeholder="e.g. 2-car driveway"
          />
        </div>
      </div>

      <div>
        <span className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
          Frequency
        </span>
        <div className="flex gap-3">
          {["one-time", "recurring"].map((freq) => (
            <button
              type="button"
              key={freq}
              onClick={() => update("frequency", freq)}
              className={`flex-1 border rounded-lg py-2.5 text-sm font-medium capitalize transition-colors ${
                form.frequency === freq
                  ? "bg-(--color-ink) border-(--color-ink) text-white"
                  : "border-(--color-border) text-(--color-body) hover:border-(--color-ink)"
              }`}
            >
              {freq === "one-time" ? "One-Time" : "Recurring"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
          Additional Information
        </label>
        <textarea
          rows={3}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          className={inputClasses}
          placeholder="Anything else we should know?"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
          Photo (optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="w-full text-sm text-(--color-muted) file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-(--color-cream) file:text-(--color-ink) hover:file:bg-(--color-border)"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-(--color-terracotta) hover:bg-(--color-terracotta-dark) text-white font-semibold py-4 rounded-lg mt-2 disabled:opacity-50 transition-all hover:shadow-lg hover:-translate-y-0.5"
      >
        {loading ? "Sending..." : "Request My Free Quote"}
      </button>
    </form>
  );
}
