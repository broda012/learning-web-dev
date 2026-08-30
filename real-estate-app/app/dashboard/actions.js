"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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
