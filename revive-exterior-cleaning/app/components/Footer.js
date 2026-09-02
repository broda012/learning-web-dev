import { siteConfig, services } from "../lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-(--color-ink-dark) text-white/70 px-6 pt-20 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div>
            <p className="font-[family-name:var(--font-wordmark)] font-extrabold uppercase text-white mb-4 leading-tight">
              Driveway <span className="text-(--color-clay)">&amp;</span> Bin
              <br />
              Cleaning
            </p>
            <p className="text-sm leading-relaxed max-w-xs">
              Professional driveway, patio, walkway, and wheelie bin cleaning
              — local, reliable, and affordable.
            </p>
          </div>

          <div>
            <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              Services
            </p>
            <ul className="flex flex-col gap-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <a href="#services" className="hover:text-white transition-colors">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              Service Areas
            </p>
            <ul className="flex flex-wrap gap-x-3 gap-y-2 text-sm">
              {siteConfig.serviceAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              Contact
            </p>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <a href={siteConfig.phoneHref} className="hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.hours}</li>
              <li className="flex gap-4 pt-2">
                <a href={siteConfig.socials.facebook} className="hover:text-white transition-colors">
                  Facebook
                </a>
                <a href={siteConfig.socials.instagram} className="hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
            <a
              href="#quote"
              className="inline-block mt-5 bg-(--color-terracotta) hover:bg-(--color-terracotta-dark) text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Get a Free Quote
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/50">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="/privacy" className="hover:text-white/80 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white/80 transition-colors">
              Terms &amp; Conditions
            </a>
            <a href="/privacy#cookies" className="hover:text-white/80 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
