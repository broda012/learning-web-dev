const pairs = [
  { label: "Driveway Pressure Wash" },
  { label: "Walkway Cleaning" },
  { label: "Bin Restoration" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-slate-50 px-6 py-20">
      <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-extrabold text-center mb-4">
        See The Difference
      </h2>
      <p className="text-center text-slate-600 mb-12">
        Real results from recent jobs across the GTA.
      </p>

      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        {pairs.map((pair) => (
          <div key={pair.label}>
            <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-lg mb-4">
              {pair.label}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-4/3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-100 flex items-center justify-center text-slate-400 font-medium transition-transform hover:scale-105">
                Before Photo
                <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Before
                </span>
              </div>
              <div className="relative aspect-4/3 rounded-xl border-2 border-teal-200 bg-teal-50 flex items-center justify-center text-teal-600 font-medium transition-transform hover:scale-105">
                After Photo
                <span className="absolute top-3 left-3 bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  After
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
