"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "../lib/site";

// Root-relative so the links also work from /privacy and /terms.
const links = [
  { href: "/#services", label: "Services" },
  { href: "/#bins", label: "Bins" },
  { href: "/#before-after", label: "Before & After" },
  { href: "/#about", label: "About" },
  { href: "/#faq", label: "FAQs" },
  { href: "/#quote", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = usePathname() === "/";

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

  // Only the homepage has a dark hero behind the header; elsewhere the
  // transparent/white-text header would be invisible on the cream background.
  const solid = scrolled || open || !isHome;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        solid ? "bg-white/95 backdrop-blur border-b border-(--color-border)" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className={`shrink-0 whitespace-nowrap font-[family-name:var(--font-wordmark)] font-extrabold uppercase tracking-tight leading-none transition-colors ${
            solid ? "text-(--color-ink)" : "text-white"
          }`}
        >
          <span className="text-base md:text-lg">Driveway</span>
          <span className={solid ? "text-(--color-terracotta)" : "text-(--color-accent-soft)"}> &amp; </span>
          <span className="block text-[0.6rem] md:text-xs font-semibold tracking-[0.15em] -mt-1">
            Bin Cleaning
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative whitespace-nowrap text-sm font-medium group transition-colors ${
                solid ? "text-(--color-body)" : "text-white/90"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ${
                  solid ? "bg-(--color-terracotta)" : "bg-white"
                }`}
              />
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-5 shrink-0">
          <a
            href={siteConfig.phoneHref}
            className={`whitespace-nowrap text-sm font-semibold transition-colors ${solid ? "text-(--color-ink)" : "text-white"}`}
          >
            {siteConfig.phone}
          </a>
          <Link
            href="/#quote"
            className="whitespace-nowrap bg-(--color-terracotta) hover:bg-(--color-terracotta-dark) text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-(--color-terracotta)/20 hover:-translate-y-0.5"
          >
            Get a Free Quote
          </Link>
        </div>

        <button
          className={`lg:hidden -mr-2 w-11 h-11 flex items-center justify-center rounded-full ${solid ? "text-(--color-ink)" : "text-white"}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-6 h-6">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="lg:hidden bg-white border-t border-(--color-border) px-6 py-6 flex flex-col gap-5 shadow-lg">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-(--color-body) font-medium"
            >
              {link.label}
            </Link>
          ))}
          <a href={siteConfig.phoneHref} className="text-(--color-ink) font-semibold">
            Call {siteConfig.phone}
          </a>
          <Link
            href="/#quote"
            onClick={() => setOpen(false)}
            className="bg-(--color-terracotta) text-white text-center font-semibold px-5 py-3 rounded-full"
          >
            Get a Free Quote
          </Link>
        </div>
      )}
    </header>
  );
}
