"use client";

import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="#" className="text-lg font-bold">
          Toronto Plumbing Co.
        </a>

        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>

        <div className="hidden md:flex gap-6">
          <a href="#" className="hover:text-blue-400">
            Home
          </a>
          <a href="#services" className="hover:text-blue-400">
            Services
          </a>
          <a href="#areas" className="hover:text-blue-400">
            Service Areas
          </a>
          <a href="#reviews" className="hover:text-blue-400">
            Reviews
          </a>
          <a href="#faq" className="hover:text-blue-400">
            FAQ
          </a>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          <a
            href="#"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-400"
          >
            Home
          </a>
          <a
            href="#services"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-400"
          >
            Services
          </a>
          <a
            href="#areas"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-400"
          >
            Service Areas
          </a>
          <a
            href="#reviews"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-400"
          >
            Reviews
          </a>
          <a
            href="#faq"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-400"
          >
            FAQ
          </a>
        </div>
      )}
    </nav>
  );
}
