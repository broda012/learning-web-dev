import { siteConfig } from "../lib/site";
import ParallaxImage from "./ParallaxImage";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden">
      <ParallaxImage
        src="/images/hero-pressure-wash.jpg"
        alt="Professional pressure washing an exterior surface"
        className="object-cover object-[center_75%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink-dark)/90 via-(--color-ink-dark)/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-(--color-ink-dark)/35 via-transparent to-transparent" />

      <div className="relative max-w-6xl mx-auto w-full px-6 pt-40 pb-16 md:pb-24">
        <p className="font-[family-name:var(--font-mono)] text-(--color-clay) text-sm uppercase tracking-[0.2em] mb-5">
          Driveway · Patio · Walkway · Bin Cleaning
        </p>

        <h1 className="text-white font-semibold leading-[0.95] mb-6 text-[clamp(2.5rem,6vw,4.5rem)] max-w-3xl">
          Bring Your Outdoor Spaces{" "}
          <span className="italic font-normal">Back to Life.</span>
        </h1>

        <p className="text-white/80 text-lg max-w-xl mb-10 leading-relaxed">
          {siteConfig.name} restores driveways, patios, walkways, and wheelie
          bins across your area — professional equipment, careful work, and
          results you can see the same day.
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-12">
          <a
            href="#quote"
            className="bg-(--color-terracotta) hover:bg-(--color-terracotta-dark) text-white font-semibold px-7 py-4 rounded-full transition-all hover:shadow-xl hover:shadow-(--color-terracotta)/30 hover:-translate-y-0.5"
          >
            Get a Free Quote
          </a>
          <a
            href="#before-after"
            className="group inline-flex items-center gap-2 text-white font-semibold px-2 py-4"
          >
            See the Difference
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3 text-white/85 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-(--color-clay)" />
            Free, no-obligation quotes
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-(--color-clay)" />
            Local & reliable
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-(--color-clay)" />
            Professional-grade equipment
          </span>
        </div>
      </div>
    </section>
  );
}
