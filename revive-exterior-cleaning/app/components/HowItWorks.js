import Reveal from "./Reveal";

const steps = [
  {
    title: "Request a Quote",
    text: "Tell us what needs cleaning and we'll get back to you with a price.",
  },
  {
    title: "Choose a Time",
    text: "We'll arrange a convenient appointment that fits your schedule.",
  },
  {
    title: "We Clean",
    text: "Our equipment and process do the hard work while you carry on with your day.",
  },
  {
    title: "Enjoy the Results",
    text: "Your driveway, bins, patio, or walkway looks fresh again.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32 px-6 bg-(--color-cream) overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow">
            How It Works
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-(--color-ink) mb-16 md:mb-20 max-w-lg">
            From first message to finished job.
          </h2>
        </Reveal>

        <ol className="grid md:grid-cols-4 md:gap-8">
          {steps.map((step, i) => {
            const last = i === steps.length - 1;
            return (
              <li key={step.title} className="relative pb-10 md:pb-0">
                {/* Dashed connector to the next step: vertical on phones, horizontal on desktop. */}
                {!last && (
                  <>
                    <span aria-hidden="true" className="md:hidden absolute left-6 top-14 bottom-2 border-l border-dashed border-(--color-clay)/50" />
                    <span aria-hidden="true" className="hidden md:block absolute top-6 left-[3.75rem] -right-5 border-t border-dashed border-(--color-clay)/50" />
                  </>
                )}
                <Reveal delay={i * 100} className="flex md:block gap-5">
                  <div
                    className={`w-12 h-12 shrink-0 rounded-full text-white flex items-center justify-center font-[family-name:var(--font-mono)] text-sm font-medium ${
                      last ? "bg-(--color-terracotta)" : "bg-(--color-ink)"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="pt-2.5 md:pt-0 md:mt-6">
                    <h3 className="font-bold text-lg text-(--color-ink) mb-2">{step.title}</h3>
                    <p className="text-(--color-muted) text-base leading-relaxed md:max-w-[24ch]">
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
