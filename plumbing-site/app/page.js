export default function Home() {
  return (
    <main>
      <section className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white text-center px-6">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Toronto Plumbing Co.
        </h1>
        <p className="text-lg text-slate-300 max-w-xl mb-8">
          Fast, reliable plumbing repairs across the Greater Toronto Area.
          Available 24/7 for emergencies.
        </p>
        <a
          href="tel:1234567890"
          className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold px-8 py-4 rounded-lg text-lg"
        >
          Call Now: (123) 456-7890
        </a>
      </section>

      <section id="services" className="bg-white text-slate-900 px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Emergency Plumbing</h3>
            <p className="text-slate-600">
              Burst pipes, major leaks, or sudden clogs — we respond fast,
              day or night, to stop the damage before it spreads.
            </p>
          </div>
          <div className="border border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Drain Cleaning</h3>
            <p className="text-slate-600">
              Slow or blocked drains cleared quickly using professional-grade
              equipment, without damaging your pipes.
            </p>
          </div>
          <div className="border border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">
              Water Heater Repair
            </h3>
            <p className="text-slate-600">
              No hot water or a failing tank? We diagnose and repair most
              water heater issues in a single visit.
            </p>
          </div>
          <div className="border border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">
              Pipe Installation &amp; Repair
            </h3>
            <p className="text-slate-600">
              From small repairs to full repipes, we install and fix pipework
              to code, built to last.
            </p>
          </div>
        </div>
      </section>

      <section id="areas" className="bg-slate-50 text-slate-900 px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">
          Areas We Serve
        </h2>
        <p className="text-center text-slate-600 mb-12">
          Proudly serving homeowners and businesses across the Greater
          Toronto Area.
        </p>
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white border border-slate-200 rounded-lg py-4">
            North York
          </div>
          <div className="bg-white border border-slate-200 rounded-lg py-4">
            Scarborough
          </div>
          <div className="bg-white border border-slate-200 rounded-lg py-4">
            Etobicoke
          </div>
          <div className="bg-white border border-slate-200 rounded-lg py-4">
            Downtown Toronto
          </div>
          <div className="bg-white border border-slate-200 rounded-lg py-4">
            Mississauga
          </div>
          <div className="bg-white border border-slate-200 rounded-lg py-4">
            Vaughan
          </div>
          <div className="bg-white border border-slate-200 rounded-lg py-4">
            Markham
          </div>
          <div className="bg-white border border-slate-200 rounded-lg py-4">
            Richmond Hill
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-white text-slate-900 px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-slate-200 rounded-lg p-6">
            <p className="text-amber-500 mb-2">★★★★★</p>
            <p className="text-slate-600 mb-4">
              "Fixed our burst pipe at 11pm on a Sunday. Fast, professional,
              and fair pricing. Highly recommend."
            </p>
            <p className="font-semibold">— James, North York</p>
          </div>
          <div className="border border-slate-200 rounded-lg p-6">
            <p className="text-amber-500 mb-2">★★★★★</p>
            <p className="text-slate-600 mb-4">
              "Cleared a drain that two other companies couldn't fix.
              Explained everything clearly before starting."
            </p>
            <p className="font-semibold">— Sarah, Etobicoke</p>
          </div>
          <div className="border border-slate-200 rounded-lg p-6">
            <p className="text-amber-500 mb-2">★★★★★</p>
            <p className="text-slate-600 mb-4">
              "Replaced our water heater same-day. Clean work and showed up
              exactly on time."
            </p>
            <p className="font-semibold">— Thomas, Scarborough</p>
          </div>
        </div>
      </section>
    </main>
  );
}
