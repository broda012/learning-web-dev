"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function addContact(formData) {
  const supabase = await createClient();

  await supabase.from("contacts").insert({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    source: formData.get("source"),
    stage: formData.get("stage") || "new",
    notes: formData.get("notes"),
    follow_up_date: formData.get("follow_up_date") || null,
  });

  revalidatePath("/dashboard");
}

export async function updateContactStage(contactId, formData) {
  const supabase = await createClient();

  await supabase
    .from("contacts")
    .update({ stage: formData.get("stage") })
    .eq("id", contactId);

  revalidatePath("/dashboard");
}

export async function addListing(formData) {
  const supabase = await createClient();

  await supabase.from("listings").insert({
    address: formData.get("address"),
    price: formData.get("price"),
    bedrooms: formData.get("bedrooms"),
    bathrooms: formData.get("bathrooms"),
    description: formData.get("description"),
    status: formData.get("status") || "active",
  });

  revalidatePath("/dashboard");
}

export async function addAppointment(formData) {
  const supabase = await createClient();

  await supabase.from("appointments").insert({
    contact_id: formData.get("contact_id"),
    listing_id: formData.get("listing_id") || null,
    appointment_date: formData.get("appointment_date"),
    notes: formData.get("notes"),
    status: "scheduled",
  });

  revalidatePath("/dashboard");
}

export async function updateAppointmentStatus(appointmentId, formData) {
  const supabase = await createClient();

  await supabase
    .from("appointments")
    .update({ status: formData.get("status") })
    .eq("id", appointmentId);

  revalidatePath("/dashboard");
}

export async function createPaymentLink(contactId, contactName, dealValue) {
  const supabase = await createClient();

  await supabase
    .from("contacts")
    .update({ deal_value: dealValue })
    .eq("id", contactId);

  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Real Estate Service Fee",
            description: `Payment for ${contactName}`,
          },
          unit_amount: Math.round(Number(dealValue) * 100),
        },
        quantity: 1,
      },
    ],
    client_reference_id: String(contactId),
    success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/dashboard`,
  });

  revalidatePath("/dashboard");
  return session.url;
}
