import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function SuccessPage({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <p className="text-red-600">Missing payment session.</p>
      </main>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.payment_status === "paid") {
    const supabase = createAdminClient();
    await supabase
      .from("appointments")
      .update({ payment_status: "paid" })
      .eq("id", session.client_reference_id);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="bg-white rounded-lg shadow p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">Deposit received!</h1>
        <p className="text-slate-600">
          Your $50 deposit has been received and your appointment request is
          confirmed. We&apos;ll be in touch shortly.
        </p>
      </div>
    </main>
  );
}
