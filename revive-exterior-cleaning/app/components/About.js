import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-(--color-surface)">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
        <Reveal>
          <div className="aspect-4/5 rounded-2xl bg-(--color-ink) flex items-end p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink-dark) to-(--color-ink)/60" />
            <div className="relative">
              <p className="text-white font-bold text-lg">Owner photo coming soon</p>
              <p className="text-white/60 text-sm mt-1">
                Add your photo, name, and story here before launch.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="font-[family-name:var(--font-mono)] text-(--color-terracotta) text-sm uppercase tracking-[0.2em] mb-4">
            About Us
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-(--color-ink) mb-6 max-w-lg">
            Built on doing the job properly.
          </h2>
          <div className="space-y-4 text-(--color-muted) leading-relaxed max-w-xl">
            <p>
              We started this business because too many driveways, patios,
              and bins get overlooked until they're an eyesore. We wanted to
              offer homeowners a straightforward way to keep their property
              looking the way it should, without the runaround.
            </p>
            <p>
              Every job gets the same standard of care, whether it's a single
              wheelie bin or a full driveway — professional equipment, a
              careful process, and pride in the finished result.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8 max-w-md">
            <div className="border-t border-(--color-border) pt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
                Insurance
              </p>
              <p className="text-sm text-(--color-ink) font-medium mt-1">Add details before launch</p>
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
