import Reveal from "./Reveal";
import { reviews } from "../lib/site";

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 md:py-32 bg-(--color-cream)">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="font-[family-name:var(--font-mono)] text-(--color-terracotta) text-sm uppercase tracking-[0.2em] mb-4">
            Reviews
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-(--color-ink) mb-14 max-w-lg">
            What customers say.
          </h2>
        </Reveal>
      </div>

      <Reveal>
        <div className="flex gap-5 overflow-x-auto no-scrollbar px-6 max-w-6xl mx-auto pb-4 snap-x snap-mandatory">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="snap-start shrink-0 w-[85vw] sm:w-[380px] bg-white border border-(--color-border) rounded-2xl p-7 flex flex-col"
            >
              <p className="text-(--color-terracotta) mb-4 tracking-wide">
                {"★".repeat(review.rating)}
              </p>
              <p className="text-(--color-body) mb-6 leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <p className="font-bold text-(--color-ink)">{review.name}</p>
                <p className="text-xs text-(--color-muted)">{review.location}</p>
              </div>
              <p className="text-xs text-(--color-muted) mt-1">{review.service}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
