"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

// The two photos must be the same surface, same framing and same size so the
// pavers line up as the slider moves.
export default function BeforeAfter({
  before = "/images/pavers-before-dirty.jpg",
  after = "/images/pavers-after-clean.jpg",
  beforeAlt = "The same paver driveway before cleaning, with moss in the joints and black algae stains",
  afterAlt = "Interlocking paver driveway after cleaning, joints clear and surface bright",
  beforeLabel = "Before",
  afterLabel = "After",
  aspectClass = "aspect-4/3 md:aspect-16/9",
  sizes = "(min-width: 1088px) 1024px, 100vw",
  initialPosition = 50,
}) {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(initialPosition);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  function onPointerDown(e) {
    dragging.current = true;
    updateFromClientX(e.clientX);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }
  function onPointerMove(e) {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  }
  function onPointerUp() {
    dragging.current = false;
  }

  function onKeyDown(e) {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 4));
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden select-none`}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <Image
        src={after}
        alt={afterAlt}
        fill
        sizes={sizes}
        className="object-cover"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          alt={beforeAlt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>

      <span className="absolute top-4 left-4 bg-(--color-ink-dark)/80 text-white text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full">
        {beforeLabel}
      </span>
      <span className="absolute top-4 right-4 bg-(--color-terracotta)/90 text-white text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full">
        {afterLabel}
      </span>

      {/* touch-none only on the handle, so swiping elsewhere on the image
          still scrolls the page on phones. */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize touch-none"
        style={{ left: `${position}%` }}
        onPointerDown={onPointerDown}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label="Before and after comparison slider"
          aria-valuenow={Math.round(position)}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center cursor-ew-resize touch-none focus:outline-none focus:ring-2 focus:ring-(--color-terracotta)"
        >
          <span className="text-(--color-ink) text-sm font-bold">↔</span>
        </div>
      </div>
    </div>
  );
}
