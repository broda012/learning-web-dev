import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function PaymentSuccessPage({ searchParams }) {
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
      .from("contacts")
      .update({ payment_status: "paid" })
      .eq("id", session.client_reference_id);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="bg-white rounded-lg shadow p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">Payment received!</h1>
        <p className="text-slate-600">
          Thank you — your payment has been processed successfully.
        </p>
      </div>
    </main>
  );
}
