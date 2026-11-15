import Reveal from "./Reveal";
import BeforeAfter from "./BeforeAfter";
import SelectServiceLink from "./SelectServiceLink";

const points = [
  "Hot-water wash, inside and out",
  "Sanitised to remove bacteria and sticky residue",
  "Deodorised, so the smell doesn’t come back",
  "Garbage, recycling and organics bins",
];

function CheckIcon() {
  return (
    <span className="mt-0.5 w-6 h-6 rounded-full bg-(--color-terracotta)/12 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="w-3.5 h-3.5 text-(--color-accent-text)">
        <path d="M4.5 10.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function BinCleaning() {
  return (
    <section id="bins" className="py-24 md:py-32 px-6 bg-(--color-cream)">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-center">
        <Reveal>
          <p className="eyebrow">Bin Cleaning</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-(--color-ink) mb-6 max-w-md">
            Bins so clean you won’t mind lifting the lid.
          </h2>
          <p className="text-(--color-muted) leading-relaxed mb-8 max-w-md">
            Garbage, recycling and organics bins build up residue, bacteria
            and smells fast — especially in summer. We wash them, sanitise
            them, and leave them fresh and ready for the curb.
          </p>

          <ul className="space-y-3.5 mb-10">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-(--color-body)">
                <CheckIcon />
                {point}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <SelectServiceLink
              service="Bin Cleaning"
              className="bg-(--color-terracotta) hover:bg-(--color-terracotta-dark) text-white font-semibold px-7 py-4 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Book a Bin Clean
            </SelectServiceLink>
            <span className="text-sm text-(--color-muted)">One-time or every 4–6 weeks</span>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <BeforeAfter
            before="/images/bins-before-dirty.jpg"
            after="/images/bins-after-clean.jpg"
            beforeAlt="Black and blue wheelie bins covered in grime streaks and dried stains"
            afterAlt="The same two wheelie bins after cleaning, clean and bright"
            aspectClass="aspect-4/3"
            sizes="(min-width: 1024px) 620px, 100vw"
            initialPosition={66} /* divider starts through the blue bin: half dirty, half clean */
          />
          {/* The "before" is an edited version of the "after" photo. */}
          <p className="mt-3 text-xs text-(--color-muted)">Illustrative example · drag to compare</p>
        </Reveal>
      </div>
    </section>
  );
}
