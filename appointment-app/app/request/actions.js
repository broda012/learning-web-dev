"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function submitRequest(formData) {
  const supabase = await createClient();

  const name = formData.get("name");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const appointment_date = formData.get("appointment_date");
  const notes = formData.get("notes");

  const { data: customer, error: customerError } = await supabase
    .from("Customers")
    .insert({ name, phone, email })
    .select()
    .single();

  if (customerError) {
    throw new Error(customerError.message);
  }

  const { data: appointment, error: appointmentError } = await supabase
    .from("appointments")
    .insert({
      customer_id: customer.id,
      appointment_date,
      notes,
      status: "requested",
    })
    .select()
    .single();

  if (appointmentError) {
    throw new Error(appointmentError.message);
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3002";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Appointment Deposit",
            description: `Deposit to confirm booking for ${name}`,
          },
          unit_amount: 5000,
        },
        quantity: 1,
      },
    ],
    client_reference_id: String(appointment.id),
    success_url: `${origin}/request/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/request/cancelled`,
  });

  redirect(session.url);
}
