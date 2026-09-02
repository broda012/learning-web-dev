import { siteConfig } from "../../lib/site";

export const metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Privacy policy for ${siteConfig.name}.`,
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-36 pb-24">
      <h1 className="text-3xl md:text-4xl font-extrabold text-(--color-ink) mb-4">
        Privacy Policy
      </h1>
      <p className="text-sm text-(--color-muted) mb-10">Last updated: {new Date().getFullYear()}</p>

      <div className="space-y-8 text-(--color-body) leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-(--color-ink) mb-2">Information We Collect</h2>
          <p>
            When you request a quote or book a service through this website,
            we collect the information you provide directly — such as your
            name, phone number, email address, service address, and any
            details or photos you choose to share about the job.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-(--color-ink) mb-2">How We Use Your Information</h2>
          <p>
            We use this information solely to prepare quotes, schedule and
            carry out cleaning services, and communicate with you about your
            booking. We do not sell your personal information to third
            parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-(--color-ink) mb-2">Third-Party Services</h2>
          <p>
            Quote requests are processed through a third-party automation
            service to help us respond faster. This service only receives the
            information you submit through our quote form and is used solely
            to route your request to us.
          </p>
        </section>

        <section id="cookies">
          <h2 className="text-xl font-bold text-(--color-ink) mb-2">Cookies</h2>
          <p>
            This website does not use tracking or advertising cookies. Any
            data stored in your browser is limited to what's needed for the
            site to function correctly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-(--color-ink) mb-2">Contact Us</h2>
          <p>
            If you have questions about this policy or would like your
            information removed from our records, contact us at{" "}
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
