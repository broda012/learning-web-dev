"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

export default function BeforeAfter({
  before = "/images/gallery-moss-tiles.jpg",
  after = "/images/after-clean-pavers.jpg",
  beforeLabel = "Before",
  afterLabel = "After",
}) {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(50);
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
      className="relative w-full aspect-4/3 md:aspect-16/9 rounded-2xl overflow-hidden select-none touch-none"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <Image
        src={after}
        alt="After cleaning"
        fill
        sizes="(min-width: 768px) 900px, 100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          alt="Before cleaning"
          fill
          sizes="(min-width: 768px) 900px, 100vw"
          className="object-cover"
        />
      </div>

      <span className="absolute top-4 left-4 bg-(--color-ink-dark)/80 text-white text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full">
        {beforeLabel}
      </span>
      <span className="absolute top-4 right-4 bg-(--color-terracotta)/90 text-white text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full">
        {afterLabel}
      </span>

      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize"
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
          onPointerDown={onPointerDown}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-(--color-terracotta)"
        >
          <span className="text-(--color-ink) text-sm font-bold">↔</span>
        </div>
      </div>
    </div>
  );
}
