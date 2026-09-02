import { siteConfig } from "../lib/site";

export default function MobileCtaBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-(--color-ink) border-t border-white/10 grid grid-cols-3 text-white text-sm font-semibold">
      <a
        href={siteConfig.phoneHref}
        className="flex items-center justify-center gap-1.5 py-3.5 active:bg-white/10 transition-colors"
      >
        Call
      </a>
      <a
        href="#quote"
        className="flex items-center justify-center gap-1.5 py-3.5 bg-(--color-terracotta) active:bg-(--color-terracotta-dark) transition-colors"
      >
        Get Quote
      </a>
      <a
        href="#quote"
        className="flex items-center justify-center gap-1.5 py-3.5 active:bg-white/10 transition-colors"
      >
        Book Now
      </a>
    </div>
  );
}
