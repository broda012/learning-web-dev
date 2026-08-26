"use client";

import { useState } from "react";

const plans = [
  {
    name: "Basic Driveway Wash",
    oneTime: 89,
    recurring: 75,
    features: ["Single-car driveway", "Pressure washing", "Oil stain treatment"],
  },
  {
    name: "Driveway + Walkway",
    oneTime: 129,
    recurring: 109,
    features: ["Full driveway", "Front walkway", "Pressure washing", "Oil stain treatment"],
    featured: true,
  },
  {
    name: "Bin Cleaning (2 bins)",
    oneTime: 39,
    recurring: 29,
    features: ["Interior + exterior wash", "Deodorizing treatment", "Sanitized finish"],
  },
];

export default function Pricing() {
  const [isRecurring, setIsRecurring] = useState(false);

  return (
    <section id="pricing" className="bg-white text-slate-900 px-6 py-20">
      <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-extrabold text-center mb-4">
        Simple, Transparent Pricing
      </h2>
      <p className="text-center text-slate-600 mb-8">
        Choose one-time service, or save with a recurring plan.
      </p>

      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-slate-100 rounded-full p-1">
          <button
            onClick={() => setIsRecurring(false)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
              !isRecurring ? "bg-teal-500 text-white" : "text-slate-600"
            }`}
          >
            One-Time
          </button>
          <button
            onClick={() => setIsRecurring(true)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
              isRecurring ? "bg-teal-500 text-white" : "text-slate-600"
            }`}
          >
            Recurring (Save)
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl p-8 border transition-transform hover:-translate-y-1 ${
              plan.featured
                ? "border-teal-500 shadow-lg shadow-teal-100"
                : "border-slate-200"
            }`}
          >
            <h3 className="font-[family-name:var(--font-poppins)] text-xl font-bold mb-2">
              {plan.name}
            </h3>
            <p className="text-4xl font-extrabold mb-1">
              ${isRecurring ? plan.recurring : plan.oneTime}
              <span className="text-base font-medium text-slate-500">
                {isRecurring ? " /visit" : ""}
              </span>
            </p>
            <ul className="text-slate-600 mt-6 flex flex-col gap-2">
              {plan.features.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-8 block text-center bg-teal-500 hover:bg-teal-600 transition-colors text-white font-semibold py-3 rounded-lg"
            >
              Book This Plan
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
