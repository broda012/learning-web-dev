"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "../lib/site";

const links = [
  { href: "#services", label: "Services" },
  { href: "#before-after", label: "Before & After" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQs" },
  { href: "#quote", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        solid ? "bg-white/95 backdrop-blur border-b border-(--color-border)" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="#"
          className={`font-[family-name:var(--font-wordmark)] font-extrabold uppercase tracking-tight leading-none transition-colors ${
            solid ? "text-(--color-ink)" : "text-white"
          }`}
        >
          <span className="text-base md:text-lg">Driveway</span>
          <span className="text-(--color-clay)"> &amp; </span>
          <span className="block text-[0.6rem] md:text-xs font-semibold tracking-[0.15em] -mt-1">
            Bin Cleaning
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium group transition-colors ${
                solid ? "text-(--color-body)" : "text-white/90"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ${
                  solid ? "bg-(--color-terracotta)" : "bg-white"
                }`}
              />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={siteConfig.phoneHref}
            className={`text-sm font-semibold transition-colors ${solid ? "text-(--color-ink)" : "text-white"}`}
          >
            {siteConfig.phone}
          </a>
          <a
            href="#quote"
            className="bg-(--color-terracotta) hover:bg-(--color-terracotta-dark) text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-(--color-terracotta)/20 hover:-translate-y-0.5"
          >
            Get a Free Quote
          </a>
        </div>

        <button
          className={`md:hidden text-2xl ${solid ? "text-(--color-ink)" : "text-white"}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white border-t border-(--color-border) px-6 py-6 flex flex-col gap-5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-(--color-body) font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#quote"
            onClick={() => setOpen(false)}
            className="bg-(--color-terracotta) text-white text-center font-semibold px-5 py-3 rounded-full"
          >
            Get a Free Quote
          </a>
        </div>
      )}
    </header>
  );
}
