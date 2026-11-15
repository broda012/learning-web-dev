"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import { galleryImages } from "../lib/site";

const categories = ["All", "Driveways", "Bins", "Patios", "Walkways", "Pressure Washing", "Before & After"];

export default function Gallery() {
  const [active, setActive] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);

  const filtered =
    active === "All" ? galleryImages : galleryImages.filter((img) => img.category === active);

  const isOpen = openIndex !== null;
  const count = filtered.length;

  // Keyboard support + lock page scroll while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i + 1) % count);
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i - 1 + count) % count);
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, count]);

  function close() {
    setOpenIndex(null);
  }
  function next(e) {
    e.stopPropagation();
    setOpenIndex((i) => (i + 1) % filtered.length);
  }
  function prev(e) {
    e.stopPropagation();
    setOpenIndex((i) => (i - 1 + filtered.length) % filtered.length);
  }

  return (
    <section className="py-24 md:py-32 px-6 bg-(--color-surface)">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow">
            Gallery
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-(--color-ink) mb-10 max-w-lg">
            Every surface, handled with care.
          </h2>

          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
                  active === cat
                    ? "bg-(--color-ink) border-(--color-ink) text-white"
                    : "border-(--color-border) text-(--color-body) hover:border-(--color-ink)"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="columns-2 md:columns-3 gap-4 [column-fill:_balance]">
            {filtered.map((img, i) => (
              <button
                key={img.src + img.category}
                onClick={() => setOpenIndex(i)}
                className="group relative block w-full mb-4 break-inside-avoid overflow-hidden rounded-xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={500}
                  height={500}
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-(--color-ink-dark)/0 group-hover:bg-(--color-ink-dark)/20 transition-colors" />
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {openIndex !== null && filtered[openIndex] && (
        <div
          className="fixed inset-0 z-[60] bg-(--color-ink-dark)/95 flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-6 right-6 text-white text-3xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
          <button
            onClick={prev}
            className="absolute left-4 md:left-8 text-white text-3xl"
            aria-label="Previous image"
          >
            ‹
          </button>
          <div className="relative max-w-3xl w-full max-h-[80vh] aspect-4/3" onClick={(e) => e.stopPropagation()}>
            <Image
              src={filtered[openIndex].src}
              alt={filtered[openIndex].alt}
              fill
              sizes="800px"
              className="object-contain"
            />
          </div>
          <button
            onClick={next}
            className="absolute right-4 md:right-8 text-white text-3xl"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
