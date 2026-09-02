import Reveal from "./Reveal";

const reasons = [
  {
    title: "Professional equipment",
    text: "Commercial-grade pressure washers and tools suited to each surface — not a garden-hose attachment.",
  },
  {
    title: "Reliable, on-time service",
    text: "We show up when we say we will, and we tell you if anything changes — no chasing us for updates.",
  },
  {
    title: "Attention to detail",
    text: "Edges, corners, and awkward spots get the same care as the open surface area.",
  },
  {
    title: "Convenient scheduling",
    text: "Free quotes and flexible booking that works around your week, not ours.",
  },
  {
    title: "Respect for your property",
    text: "Careful setup, careful cleanup — we treat your driveway and garden like our own.",
  },
  {
    title: "Safe, surface-matched methods",
    text: "Pressure and technique are matched to the material, so results don't come at the cost of damage.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32 px-6 bg-(--color-surface)">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
            <div>
              <p className="font-[family-name:var(--font-mono)] text-(--color-terracotta) text-sm uppercase tracking-[0.2em] mb-4">
                Why Choose Us
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-(--color-ink) max-w-md">
                The details most companies skip.
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 md:gap-x-16 border-b border-(--color-border)">
          {reasons.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 60}>
              <div className="flex gap-5 py-6 border-t border-(--color-border)">
                <span className="font-[family-name:var(--font-mono)] text-(--color-clay) text-sm pt-1 shrink-0 w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-bold text-(--color-ink) mb-1.5">{reason.title}</h3>
                  <p className="text-(--color-muted) text-sm leading-relaxed">{reason.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
