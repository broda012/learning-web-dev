import Reveal from "./Reveal";
import BeforeAfter from "./BeforeAfter";
import AmbientMist from "./AmbientMist";

export default function BeforeAfterSection() {
  return (
    <section id="before-after" className="relative py-24 md:py-32 px-6 bg-(--color-ink-dark) overflow-hidden">
      <AmbientMist />
      <div className="relative max-w-5xl mx-auto text-center">
        <Reveal>
          <p className="font-[family-name:var(--font-mono)] text-(--color-clay) text-sm uppercase tracking-[0.2em] mb-4">
            See The Difference
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5">
            Sometimes the best way to explain what we do is to show you.
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-14">
            Drag the slider to see the kind of transformation you can expect
            from a professional clean.
          </p>
        </Reveal>

        <Reveal>
          <BeforeAfter />
        </Reveal>
      </div>
    </section>
  );
}
