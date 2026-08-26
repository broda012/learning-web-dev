"use client";

import { useState } from "react";

const links = [
  { href: "#", label: "Home" },
  { href: "#pricing", label: "Pricing" },
  { href: "#gallery", label: "Gallery" },
  { href: "#areas", label: "Service Areas" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-slate-900 px-6 py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a
          href="#"
          className="text-xl font-[family-name:var(--font-poppins)] font-extrabold text-teal-600"
        >
          SparkleClean
        </a>

        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>

        <div className="hidden md:flex gap-6 text-sm font-medium">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-teal-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-sm font-medium">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="hover:text-teal-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
