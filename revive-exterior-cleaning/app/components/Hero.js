import ParallaxImage from "./ParallaxImage";

const trustPoints = [
  "Free, no-obligation quotes",
  "Locally owned & operated",
  "Professional-grade equipment",
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="w-4 h-4 shrink-0 text-(--color-accent-soft)">
      <path d="M4.5 10.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="grain relative min-h-[100svh] md:min-h-[92vh] flex items-end overflow-hidden bg-(--color-ink-dark)">
      <ParallaxImage
        src="/images/service-driveway.jpg"
        alt="Clean residential driveway leading to a garage, with bins at the curb"
        className="object-cover object-[center_62%]"
      />
      {/* Legibility washes, kept light so the photo stays bright: shade only where text sits. */}
      {/* Top: just enough behind the navbar. */}
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/45 to-transparent" />
      {/* Phones: text fills the lower part of the screen, so shade the bottom more. */}
      <div className="absolute inset-0 md:hidden bg-linear-to-t from-(--color-ink-dark)/95 from-15% via-(--color-ink-dark)/60 via-55% to-transparent" />
      {/* Wider screens: soft wash on the left (behind the text) and along the bottom; the right side stays clear. */}
      <div className="absolute inset-0 hidden md:block bg-linear-to-r from-(--color-ink-dark)/75 via-(--color-ink-dark)/35 via-45% to-transparent to-75%" />
      <div className="absolute inset-0 hidden md:block bg-linear-to-t from-(--color-ink-dark)/85 via-(--color-ink-dark)/20 via-35% to-transparent to-60%" />

      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 pt-36 pb-12 md:pb-16">
        <p
          className="rise inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white/90 mb-7"
          style={{ animationDelay: "80ms" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-soft)" />
          Serving Toronto &amp; the GTA
        </p>

        <h1
          className="rise text-white font-semibold leading-[0.95] mb-6 text-[clamp(2.6rem,6.4vw,5rem)] max-w-3xl [text-shadow:0_2px_30px_rgb(0_0_0/0.45)]"
          style={{ animationDelay: "180ms" }}
        >
          Bring Your Outdoor Spaces{" "}
          <span className="italic font-normal text-(--color-accent-soft)">Back to Life.</span>
        </h1>

        <p
          className="rise text-white/90 text-lg md:text-xl max-w-xl mb-10 leading-relaxed [text-shadow:0_1px_16px_rgb(0_0_0/0.6)]"
          style={{ animationDelay: "300ms" }}
        >
          Driveway, patio, walkway, and bin cleaning for homes across the
          GTA — professional equipment, careful work, and results you can see
          the same day.
        </p>

        <div
          className="rise flex flex-wrap items-center gap-3 sm:gap-4 mb-14"
          style={{ animationDelay: "420ms" }}
        >
          <a
            href="#quote"
            className="bg-(--color-terracotta) hover:bg-(--color-terracotta-dark) text-white font-semibold px-7 py-4 rounded-full transition-all shadow-lg shadow-black/20 hover:shadow-xl hover:-translate-y-0.5"
          >
            Get a Free Quote
          </a>
          <a
            href="#before-after"
            className="group inline-flex items-center gap-2 text-white font-semibold px-6 py-4 rounded-full border border-white/25 hover:border-white/60 hover:bg-white/5 transition-colors"
          >
            See the Difference
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        <ul
          className="rise flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-2.5 border-t border-white/15 pt-6 text-white/90 text-sm [text-shadow:0_1px_10px_rgb(0_0_0/0.6)]"
          style={{ animationDelay: "540ms" }}
        >
          {trustPoints.map((point) => (
            <li key={point} className="flex items-center gap-2">
              <CheckIcon />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
