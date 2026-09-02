import { siteConfig } from "../lib/site";

export const metadata = {
  title: `Terms & Conditions | ${siteConfig.name}`,
  description: `Terms and conditions for ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-36 pb-24">
      <h1 className="text-3xl md:text-4xl font-extrabold text-(--color-ink) mb-4">
        Terms &amp; Conditions
      </h1>
      <p className="text-sm text-(--color-muted) mb-10">Last updated: {new Date().getFullYear()}</p>

      <div className="space-y-8 text-(--color-body) leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-(--color-ink) mb-2">Quotes & Pricing</h2>
          <p>
            Quotes provided through this website are estimates based on the
            information supplied. Final pricing is confirmed before any work
            begins and may vary if the actual condition or size of the area
            differs from what was described.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-(--color-ink) mb-2">Scheduling</h2>
          <p>
            Appointment times are arranged directly with you after your quote
            request. We'll notify you as early as possible if a job needs to
            be rescheduled, including for weather that isn't suitable for the
            work.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-(--color-ink) mb-2">Property Access</h2>
          <p>
            You're responsible for ensuring we have safe access to the areas
            being cleaned, including any outdoor water supply if agreed in
            advance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-(--color-ink) mb-2">Cancellations</h2>
          <p>
            You can cancel or reschedule a booking by contacting us directly.
            We ask for as much notice as possible so we can offer the slot to
            another customer.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-(--color-ink) mb-2">Contact Us</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-(--color-terracotta) font-medium">
              {siteConfig.email}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
