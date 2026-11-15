import Reveal from "./Reveal";
import QuoteForm from "./QuoteForm";
import { siteConfig } from "../lib/site";

const trustBadges = [
  "Free, no-obligation quotes",
  "Local & independently run",
  "One-time or recurring plans",
];

const iconPaths = {
  phone:
    "M5 4h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  clock: "M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};

function ContactIcon({ name }) {
  return (
    <span className="w-10 h-10 rounded-full bg-white/10 ring-1 ring-white/10 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-[18px] h-[18px] text-(--color-accent-soft)">
        <path d={iconPaths[name]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function QuoteSection() {
  return (
    // overflow-clip (not hidden) so the sticky left column still works.
    <section id="quote" className="grain relative py-24 md:py-32 px-6 bg-(--color-ink) overflow-clip">
      {/* Warm glow behind the form */}
      <div
        aria-hidden="true"
        className="glow-orb bg-(--color-terracotta)"
        style={{ width: 520, height: 520, top: "10%", right: "-12%", opacity: 0.18, animationDuration: "24s" }}
      />
      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-14 items-start">
        <Reveal className="lg:sticky lg:top-28">
          <p className="eyebrow eyebrow-on-dark">Get In Touch</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 max-w-md">
            Get Your Free Cleaning Quote
          </h2>
          <p className="text-white/70 max-w-md mb-10 leading-relaxed">
            Pricing depends on the size of the job, surface condition, number
            of bins, and how often you&apos;d like it done. Tell us a bit about
            what you need and we&apos;ll follow up with a straightforward quote.
          </p>

          <div className="flex flex-col gap-4 mb-10">
            <a
              href={siteConfig.phoneHref}
              className="group flex items-center gap-4 text-white font-semibold text-lg"
            >
              <ContactIcon name="phone" />
              <span className="group-hover:underline underline-offset-4">{siteConfig.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group flex items-center gap-4 text-white/85 break-all"
            >
              <ContactIcon name="mail" />
              <span className="group-hover:underline underline-offset-4">{siteConfig.email}</span>
            </a>
            <div className="flex items-center gap-4 text-white/85">
              <ContactIcon name="clock" />
              {siteConfig.hours}
            </div>
          </div>

          <ul className="flex flex-wrap gap-2.5">
            {trustBadges.map((badge) => (
              <li
                key={badge}
                className="text-xs text-white/90 border border-white/15 bg-white/5 rounded-full px-3.5 py-1.5"
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
