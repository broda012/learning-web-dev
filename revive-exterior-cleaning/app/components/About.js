import Image from "next/image";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-(--color-surface)">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
        <Reveal>
          {/* TODO: swap in an owner photo, name, and story when available. */}
          <div className="aspect-4/5 rounded-2xl bg-(--color-ink) flex items-end p-8 relative overflow-hidden">
            <Image
              src="/images/gallery-stairs.jpg"
              alt="Pressure washing stone steps"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink-dark)/90 via-(--color-ink-dark)/20 to-transparent" />
            <div className="relative">
              <p className="text-white font-bold text-lg">Local &amp; independently run</p>
              <p className="text-white/70 text-sm mt-1">
                Serving homeowners across Toronto and the GTA.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="eyebrow">
            About Us
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-(--color-ink) mb-6 max-w-lg">
            Built on doing the job properly.
          </h2>
          <div className="space-y-4 text-(--color-muted) leading-relaxed max-w-xl">
            <p>
              We started this business because too many driveways, patios,
              and bins get overlooked until they’re an eyesore. We wanted to
              offer homeowners a straightforward way to keep their property
              looking the way it should, without the runaround.
            </p>
            <p>
              Every job gets the same standard of care, whether it’s a single
              wheelie bin or a full driveway — professional equipment, a
              careful process, and pride in the finished result.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8 max-w-md">
            <div className="border-t border-(--color-border) pt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
                Quotes
              </p>
              <p className="text-sm text-(--color-ink) font-medium mt-1">Free, no-obligation</p>
            </div>
            <div className="border-t border-(--color-border) pt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
                Equipment
              </p>
              <p className="text-sm text-(--color-ink) font-medium mt-1">Professional-grade</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
