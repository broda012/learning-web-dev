import Reveal from "./Reveal";
import QuoteForm from "./QuoteForm";
import { siteConfig } from "../lib/site";

const trustBadges = [
  "Free, no-obligation quotes",
  "Fully insured",
  "Local & independently run",
  "Satisfaction-focused",
];

export default function QuoteSection() {
  return (
    <section id="quote" className="py-24 md:py-32 px-6 bg-(--color-ink)">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
        <Reveal>
          <p className="font-[family-name:var(--font-mono)] text-(--color-clay) text-sm uppercase tracking-[0.2em] mb-4">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 max-w-md">
            Get Your Free Cleaning Quote
          </h2>
          <p className="text-white/70 max-w-md mb-10 leading-relaxed">
            Pricing depends on the size of the job, surface condition, number
            of bins, and how often you'd like it done. Tell us a bit about
            what you need and we'll follow up with a straightforward quote.
          </p>

          <div className="flex flex-col gap-4 mb-10">
            <a href={siteConfig.phoneHref} className="flex items-center gap-3 text-white font-semibold">
              <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm">☎</span>
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-white/85">
              <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm">✉</span>
              {siteConfig.email}
            </a>
            <div className="flex items-center gap-3 text-white/85">
              <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm">🕓</span>
              {siteConfig.hours}
            </div>
          </div>

          <ul className="flex flex-wrap gap-3">
            {trustBadges.map((badge) => (
              <li
                key={badge}
                className="text-xs text-white/90 border border-white/15 rounded-full px-3.5 py-1.5"
              >
                {badge}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <QuoteForm />
        </Reveal>
      </div>
    </section>
  );
}
