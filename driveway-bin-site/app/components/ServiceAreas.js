const areas = [
  "North York",
  "Scarborough",
  "Etobicoke",
  "Downtown Toronto",
  "Mississauga",
  "Vaughan",
  "Markham",
  "Richmond Hill",
];

export default function ServiceAreas() {
  return (
    <section id="areas" className="bg-white px-6 py-20">
      <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-extrabold text-center mb-4">
        Where We Work
      </h2>
      <p className="text-center text-slate-600 mb-10">
        Proudly serving homes and businesses across the Greater Toronto Area.
      </p>
      <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-3">
        {areas.map((area) => (
          <span
            key={area}
            className="bg-teal-50 border border-teal-200 text-teal-700 font-medium px-5 py-2 rounded-full"
          >
            ✓ {area}
          </span>
        ))}
      </div>
    </section>
  );
}
