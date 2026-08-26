"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How does the recurring plan work?",
    answer:
      "We visit on a schedule you choose (monthly or bi-weekly) at a discounted per-visit rate. Cancel anytime.",
  },
  {
    question: "Do I need to be home during the service?",
    answer:
      "No — as long as we have access to your driveway and bins, you don't need to be present.",
  },
  {
    question: "What areas do you service?",
    answer:
      "We serve North York, Scarborough, Etobicoke, Downtown Toronto, Mississauga, Vaughan, Markham, and Richmond Hill.",
  },
  {
    question: "Is the cleaning solution safe for pets and plants?",
    answer: "Yes, we use biodegradable, pet- and plant-safe cleaning solutions.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(index) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section id="faq" className="bg-white px-6 py-20">
      <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-extrabold text-center mb-12">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-slate-50 border border-slate-200 rounded-lg p-6"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full text-left font-semibold flex justify-between items-center"
            >
              {faq.question}
              <span className="text-teal-600 text-xl ml-4">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <p className="text-slate-600 mt-4">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
