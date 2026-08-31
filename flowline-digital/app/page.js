import ContactForm from "./components/ContactForm";

const caseStudies = [
  {
    name: "Toronto Plumbing Co.",
    type: "Marketing Site + AI Assistant",
    description:
      "A premium marketing site with a Claude-powered chat assistant that answers service-area and pricing questions in real time, grounded in the business's actual data.",
    tags: ["Next.js", "Claude AI", "Tool Calling"],
    url: "https://learning-web-dev-xi.vercel.app",
  },
  {
    name: "SparkleClean",
    type: "Marketing Site + Automation",
    description:
      "A driveway & bin cleaning site with live pricing toggles, connected to an n8n workflow that automatically qualifies leads with AI and emails the owner instantly.",
    tags: ["Next.js", "n8n", "Automation"],
    url: "https://driveway-bin-site.vercel.app",
  },
  {
    name: "Appointment Manager",
    type: "SaaS Booking Platform",
    description:
      "A full booking system with secure authentication, an admin dashboard, and Stripe-powered deposit payments collected directly from the public booking form.",
    tags: ["Supabase Auth", "Stripe", "Row-Level Security"],
    url: "https://appointment-app-flax.vercel.app",
  },
  {
    name: "Real Estate AI Platform",
    type: "CRM + AI + Payments",
    description:
      "A full agent CRM — leads, listings, appointments — paired with 4 AI tools for lead qualification and follow-ups, Stripe payment links, and live revenue analytics.",
    tags: ["AI Tools", "Stripe", "Analytics"],
    url: "https://real-estate-app-beta-one.vercel.app",
  },
];

const packages = [
  {
    name: "Website",
    price: "From $1,500",
    description: "A professional, mobile-friendly website for your business.",
    features: ["Custom design", "Mobile optimized", "Contact form", "Fast hosting & deployment"],
  },
  {
    name: "Website + Lead System",
    price: "From $3,000",
    description: "Everything in Website, plus a real backend to capture and manage leads.",
    features: ["Everything in Website", "Database-backed lead capture", "Admin dashboard", "Booking/request forms"],
    featured: true,
  },
  {
    name: "Website + AI Automation",
    price: "From $5,000",
    description: "A complete system that qualifies leads and notifies you automatically.",
    features: ["Everything in Lead System", "AI lead qualification", "Automated email/CRM workflows", "Custom AI chat assistant"],
  },
  {
    name: "Maintenance & Automation",
    price: "$200–$1,000/mo",
    description: "Ongoing support, updates, and automation improvements.",
    features: ["Monthly updates & fixes", "Automation monitoring", "Priority support", "Scope depends on system size"],
  },
];

export default function Home() {
  return (
    <main>
      <section className="bg-slate-900 text-white px-6 py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl font-bold mb-6">
            Websites and AI automation for local businesses.
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            We design and build real, working systems — not just websites —
            that capture leads, qualify them with AI, and save you hours
            every week.
          </p>
          <a
            href="#contact"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold px-8 py-4 rounded-full text-lg"
          >
            Get a Free Quote
          </a>
        </div>
      </section>

      <section id="work" className="bg-white px-6 py-20">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-center mb-4">
          Recent Work
        </h2>
        <p className="text-center text-slate-600 mb-12">
          Real, live systems built for real businesses.
        </p>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="block border border-slate-200 rounded-xl p-6 transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-indigo-600 text-sm font-semibold mb-1">
                {project.type}
              </p>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold mb-2">
                {project.name}
              </h3>
              <p className="text-slate-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="services" className="bg-slate-50 px-6 py-20">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-center mb-4">
          Services &amp; Pricing
        </h2>
        <p className="text-center text-slate-600 mb-12">
          Straightforward packages. Final scope depends on your business.
        </p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`bg-white rounded-xl p-6 border transition-transform hover:-translate-y-1 ${
                pkg.featured
                  ? "border-indigo-500 shadow-lg shadow-indigo-100"
                  : "border-slate-200"
              }`}
            >
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-1">
                {pkg.name}
              </h3>
              <p className="text-indigo-600 font-bold mb-3">{pkg.price}</p>
              <p className="text-slate-600 text-sm mb-4">{pkg.description}</p>
              <ul className="text-sm text-slate-600 flex flex-col gap-2">
                {pkg.features.map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-slate-900 text-white px-6 py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold mb-4">
              Let&apos;s talk about your project
            </h2>
            <p className="text-slate-300">
              Tell us a bit about your business and what you need — we&apos;ll
              get back to you with next steps.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
