"use client";

import { useState } from "react";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Driveway Wash");
  const [frequency, setFrequency] = useState("one-time");
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
        className="bg-teal-500 hover:bg-teal-600 transition-colors text-white font-semibold py-3 rounded-md mt-2"
      >
        Book Now
      </button>
    </form>
  );
}
