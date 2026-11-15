"use client";

import { useEffect, useState } from "react";
import { services, siteConfig } from "../lib/site";

const initialForm = {
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
};

const WEBHOOK_URL = "https://broda12.app.n8n.cloud/webhook/driveway-bin-cleaning-lead";

const inputClasses =
  "w-full border border-(--color-border) rounded-lg px-4 py-3 text-base text-(--color-body) placeholder:text-(--color-muted)/70 focus:outline-none focus:ring-2 focus:ring-(--color-terracotta) focus:border-transparent transition-shadow";

function compressImage(file, maxDimension = 1200, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function QuoteForm() {
  const [form, setForm] = useState(initialForm);
  const [photo, setPhoto] = useState(null);
  const [photoError, setPhotoError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => {
      setSubmitted(false);
      setForm(initialForm);
      setPhoto(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [submitted]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    setPhotoError("");
    if (!file) {
      setPhoto(null);
      return;
    }
    try {
      const dataUrl = await compressImage(file);
      setPhoto({ name: file.name, dataUrl });
    } catch {
      // e.g. iPhone HEIC files can't be decoded by most non-Safari browsers.
      setPhoto(null);
      setPhotoError(
        "We couldn't read that photo, so it won't be attached. Try a JPG or PNG — or send it to us by email."
      );
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(WEBHOOK_URL, {
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
      // fetch() only rejects on network errors; a 4xx/5xx from the webhook
      // must not be shown to the customer as a successful submission.
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      setSubmitted(true);
    } catch {
      setError(
        `Something went wrong sending your request. Please call us at ${siteConfig.phone} or email ${siteConfig.email}.`
      );
    }

    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 md:p-10 text-center shadow-2xl shadow-black/30" role="status">
        <div className="w-14 h-14 rounded-full bg-(--color-terracotta)/10 text-(--color-terracotta) flex items-center justify-center text-2xl mx-auto mb-5">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-(--color-ink) mb-2">
          Thanks, {form.name.split(" ")[0] || "there"}!
        </h3>
        <p className="text-(--color-muted)">
          Your quote request has been received. We’ll be in touch shortly to
          confirm pricing and a time that works for you.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 md:p-10 flex flex-col gap-5 shadow-2xl shadow-black/30"
    >
      <div className="pb-5 mb-1 border-b border-(--color-border)">
        <h3 className="text-2xl font-bold text-(--color-ink)">Request a free quote</h3>
        <p className="text-sm text-(--color-muted) mt-1">
          Takes about a minute. We usually reply within one business day.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="quote-name" className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
            Name
          </label>
          <input
            id="quote-name"
            autoComplete="name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="quote-phone" className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
            Phone
          </label>
          <input
            id="quote-phone"
            type="tel"
            autoComplete="tel"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="quote-email" className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
          Email
        </label>
        <input
          id="quote-email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="quote-address" className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
          Address / Postal Code
        </label>
        <input
          id="quote-address"
          autoComplete="street-address"
          required
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
          className={inputClasses}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="quote-service" className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
            Service Required
          </label>
          <select
            id="quote-service"
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
          <label htmlFor="quote-date" className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
            Preferred Date
          </label>
          <input
            id="quote-date"
            type="date"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="quote-bins" className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
            Number of Bins (if applicable)
          </label>
          <input
            id="quote-bins"
            type="number"
            min="0"
            value={form.bins}
            onChange={(e) => update("bins", e.target.value)}
            className={inputClasses}
            placeholder="e.g. 2"
          />
        </div>
        <div>
          <label htmlFor="quote-size" className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
            Approx. Driveway / Patio Size
          </label>
          <input
            id="quote-size"
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
        <label htmlFor="quote-notes" className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
          Additional Information
        </label>
        <textarea
          id="quote-notes"
          rows={3}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          className={inputClasses}
          placeholder="Anything else we should know?"
        />
      </div>

      <div>
        <label htmlFor="quote-photo" className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
          Photo (optional)
        </label>
        <input
          id="quote-photo"
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="w-full text-sm text-(--color-muted) file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-(--color-cream) file:text-(--color-ink) hover:file:bg-(--color-border)"
        />
        {photoError && <p className="text-sm text-red-600 mt-2">{photoError}</p>}
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

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
