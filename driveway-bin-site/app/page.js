import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="relative min-h-screen flex items-center px-6">
        <Image
          src="https://picsum.photos/seed/driveway-hero/1600/1000"
          alt="Freshly cleaned driveway"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60" />

        <div className="relative max-w-2xl text-white">
          <h1 className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl font-extrabold mb-4">
            Driveways &amp; Bins, Sparkling Clean.
          </h1>
          <p className="text-lg text-slate-200 mb-8">
            Professional pressure washing and bin cleaning across the
            Greater Toronto Area. One-time or recurring — your choice.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="bg-teal-500 hover:bg-teal-600 transition-colors text-white font-semibold px-8 py-4 rounded-lg text-lg"
            >
              Book Now
            </a>
            <a
              href="#pricing"
              className="bg-white/10 hover:bg-white/20 transition-colors backdrop-blur text-white font-semibold px-8 py-4 rounded-lg text-lg border border-white/30"
            >
              See Pricing
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
