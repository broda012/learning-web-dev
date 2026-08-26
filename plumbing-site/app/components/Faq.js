"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Do you offer emergency plumbing services?",
    answer:
      "Yes, we're available 24/7 for emergencies like burst pipes, major leaks, and blocked drains.",
  },
  {
    question: "What areas do you service?",
    answer:
      "We serve North York, Scarborough, Etobicoke, Downtown Toronto, Mississauga, Vaughan, Markham, and Richmond Hill.",
  },
  {
    question: "How much does a service call cost?",
    answer:
      "Every job is different, so we provide a clear quote before any work begins — no hidden fees.",
  },
  {
    question: "Are your plumbers licensed and insured?",
    answer:
      "Yes, all of our plumbers are fully licensed and insured for your protection.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(index) {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  }

  return (
    <section id="faq" className="bg-slate-50 text-slate-900 px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200 rounded-lg p-6"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full text-left font-semibold flex justify-between items-center"
            >
              {faq.question}
              <span className="text-blue-600 text-xl ml-4">
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
