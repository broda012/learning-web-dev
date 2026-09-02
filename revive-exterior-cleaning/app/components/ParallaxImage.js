"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function ParallaxImage({ src, alt, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const el = ref.current;
          if (el) {
            const offset = Math.min(60, window.scrollY * 0.15);
            el.style.transform = `translateY(${offset}px) scale(1.12)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 will-change-transform" style={{ transform: "scale(1.12)" }}>
      <Image src={src} alt={alt} fill priority sizes="100vw" className={className} />
    </div>
  );
}
