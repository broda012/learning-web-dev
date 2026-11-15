import Reveal from "./Reveal";
import { siteConfig } from "../lib/site";

export default function CtaBand() {
  return (
    <section className="px-4 sm:px-6 pb-20 md:pb-28 bg-(--color-cream)">
      <Reveal>
        <div className="grain relative max-w-6xl mx-auto overflow-hidden rounded-3xl bg-(--color-ink-dark) px-6 py-14 sm:px-12 md:px-16 md:py-20">
          <div
            aria-hidden="true"
            className="glow-orb bg-(--color-terracotta)"
            style={{ width: 420, height: 420, top: "-30%", right: "-8%", opacity: 0.35, animationDuration: "20s" }}
          />
          <div
            aria-hidden="true"
            className="glow-orb bg-(--color-clay)"
            style={{ width: 340, height: 340, bottom: "-40%", left: "10%", opacity: 0.25, animationDuration: "26s" }}
          />

          <div className="relative z-10 grid md:grid-cols-[1.4fr_1fr] gap-10 items-end">
            <div>
              <p className="eyebrow eyebrow-on-dark">Ready when you are</p>
              <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.05]">
                Let&apos;s get your driveway looking{" "}
                <span className="italic font-normal text-(--color-accent-soft)">new again.</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 md:justify-self-end">
              <a
                href="#quote"
                className="text-center bg-(--color-terracotta) hover:bg-(--color-terracotta-dark) text-white font-semibold px-7 py-4 rounded-full transition-all hover:-translate-y-0.5 whitespace-nowrap"
              >
                Get a Free Quote
              </a>
              <a
                href={siteConfig.phoneHref}
                className="text-center text-white font-semibold px-7 py-4 rounded-full border border-white/25 hover:border-white/60 hover:bg-white/5 transition-colors whitespace-nowrap"
              >
                Call {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
