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
          <p className="font-[family-name:var(--font-mono)] text-(--color-terracotta) text-sm uppercase tracking-[0.2em] mb-4">
            How It Works
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-(--color-ink) mb-20 max-w-lg">
            From first message to finished job.
          </h2>
        </Reveal>

        <div className="relative grid md:grid-cols-4 gap-10 md:gap-6">
          <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-(--color-border)" />

          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 100}>
              <div className={`relative ${i % 2 === 1 ? "md:mt-14" : ""}`}>
                <div className="w-12 h-12 rounded-full bg-(--color-ink) text-white flex items-center justify-center font-[family-name:var(--font-mono)] font-medium mb-6 relative z-10">
                  {i + 1}
                </div>
                <h3 className="font-bold text-lg text-(--color-ink) mb-2">{step.title}</h3>
                <p className="text-(--color-muted) text-sm leading-relaxed max-w-[22ch]">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
