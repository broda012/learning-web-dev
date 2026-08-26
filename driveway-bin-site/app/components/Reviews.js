const reviews = [
  {
    quote:
      "Our driveway looks brand new. Booked the recurring plan and it's one less thing to think about.",
    name: "Priya, Markham",
  },
  {
    quote:
      "Bins used to smell awful in summer. Now they're spotless every two weeks.",
    name: "Dave, Etobicoke",
  },
  {
    quote:
      "Showed up on time, worked fast, and the pricing was exactly what was quoted.",
    name: "Linda, Vaughan",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="bg-slate-50 px-6 py-20">
      <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-extrabold text-center mb-12">
        What Our Customers Say
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="bg-white rounded-xl p-6 border border-slate-200 transition-transform hover:-translate-y-1"
          >
            <p className="text-amber-500 mb-3">★★★★★</p>
            <p className="text-slate-600 mb-4">"{review.quote}"</p>
            <p className="font-semibold">— {review.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
