import Reveal from "./Reveal";
import { siteConfig } from "../lib/site";

export default function ServiceAreas() {
  return (
    <section className="py-24 md:py-32 px-6 bg-(--color-cream)">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <p className="eyebrow">
            Service Area
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-(--color-ink) mb-6 max-w-md">
            Do we cover your area?
          </h2>
          <p className="text-(--color-muted) mb-8 max-w-md leading-relaxed">
            We serve homeowners across Toronto and the surrounding GTA,
            including:
          </p>

          <ul className="flex flex-wrap gap-2.5 mb-8">
            {siteConfig.serviceAreas.map((area) => (
              <li
                key={area}
                className="inline-flex items-center gap-2 text-sm font-medium text-(--color-ink) bg-white border border-(--color-border) rounded-full px-4 py-2"
              >
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-(--color-terracotta)" />
                {area}
              </li>
            ))}
          </ul>

          <a
            href="#quote"
            className="inline-flex items-center gap-2 text-(--color-accent-text) font-semibold group hover:underline underline-offset-4"
          >
            Nearby but not listed? Ask us — we may still cover you.
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-2xl overflow-hidden border border-(--color-border) h-[320px] md:h-[420px]">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                siteConfig.mapQuery
              )}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Service area map"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
