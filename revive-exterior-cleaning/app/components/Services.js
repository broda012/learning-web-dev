import Image from "next/image";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import { services } from "../lib/site";

function ServiceCard({ service, big = false }) {
  return (
    <TiltCard
      href="#quote"
      className={`group relative block overflow-hidden rounded-2xl md:h-full ${
        big ? "min-h-[420px]" : "min-h-[220px]"
      }`}
    >
      <Image
        src={service.image}
        alt={service.name}
        fill
        sizes={big ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink-dark)/95 via-(--color-ink-dark)/40 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col p-5 md:p-6">
        <h3
          className={`text-white font-bold mb-1.5 ${
            big ? "text-2xl md:text-3xl" : "text-lg"
          }`}
        >
          {service.name}
        </h3>
        <p className={`text-white/75 mb-3 ${big ? "text-base max-w-sm" : "text-sm"}`}>
          {service.short}
        </p>
        {big && (
          <ul className="flex flex-wrap gap-2 mb-4">
            {service.benefits.map((b) => (
              <li
                key={b}
                className="text-xs text-white bg-white/10 border border-white/15 rounded-full px-3 py-1"
              >
                {b}
              </li>
            ))}
          </ul>
        )}
        <span className="inline-flex items-center gap-1.5 text-(--color-clay) font-semibold text-sm">
          Get a Quote
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </TiltCard>
  );
}

export default function Services() {
  const [featured, ...rest] = services;

  return (
    <section id="services" className="py-24 md:py-32 px-6 bg-(--color-cream)">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="font-[family-name:var(--font-mono)] text-(--color-terracotta) text-sm uppercase tracking-[0.2em] mb-4">
            What We Do
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-(--color-ink) max-w-xl mb-16">
            Exterior cleaning, done properly.
          </h2>
        </Reveal>

        <Reveal>
          <div className="grid md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[560px]">
            <div className="md:col-span-2 md:row-span-2">
              <ServiceCard service={featured} big />
            </div>
            {rest.map((service) => (
              <div key={service.slug} className="md:col-span-1 md:row-span-1">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
