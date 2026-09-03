"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { faqs } from "../lib/site";

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-(--color-border) py-5">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 text-left"
      >
        <span className="font-semibold text-(--color-ink)">{faq.q}</span>
        <span
          className={`shrink-0 text-(--color-terracotta) text-xl leading-none transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="text-(--color-muted) text-base leading-relaxed pt-3 pr-8">{faq.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const mid = Math.ceil(faqs.length / 2);
  const columns = [faqs.slice(0, mid), faqs.slice(mid)];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="py-24 md:py-32 px-6 bg-(--color-cream)">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="font-[family-name:var(--font-mono)] text-(--color-terracotta) text-sm uppercase tracking-[0.2em] mb-4">
            FAQs
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-(--color-ink) mb-14 max-w-lg">
            Questions we hear a lot.
          </h2>
        </Reveal>

        <Reveal>
          <div className="grid md:grid-cols-2 md:gap-x-12">
            {columns.map((col, colIndex) => (
              <div key={colIndex}>
                {col.map((faq, i) => {
                  const globalIndex = colIndex === 0 ? i : mid + i;
                  return (
                    <FaqItem
                      key={faq.q}
                      faq={faq}
                      isOpen={openIndex === globalIndex}
                      onToggle={() =>
                        setOpenIndex(openIndex === globalIndex ? -1 : globalIndex)
                      }
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
