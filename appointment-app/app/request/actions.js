"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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

  const { error: appointmentError } = await supabase.from("appointments").insert({
    customer_id: customer.id,
    appointment_date,
    notes,
    status: "requested",
  });

  if (appointmentError) {
    throw new Error(appointmentError.message);
  }

  redirect("/request/thank-you");
}
