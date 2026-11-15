import Link from "next/link";
import { siteConfig } from "../lib/site";

export default function MobileCtaBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-(--color-ink)/95 backdrop-blur border-t border-white/10 grid grid-cols-[1fr_1.6fr] gap-2 p-2 text-sm font-semibold">
      <a
        href={siteConfig.phoneHref}
        className="flex items-center justify-center gap-2 rounded-xl py-3 text-white border border-white/15 active:bg-white/10 transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-4 h-4">
          <path
            d="M5 4h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        Call
      </a>
      <Link
        href="/#quote"
        className="flex items-center justify-center rounded-xl py-3 text-white bg-(--color-terracotta) active:bg-(--color-terracotta-dark) transition-colors"
      >
        Get a Free Quote
      </Link>
    </div>
  );
}
