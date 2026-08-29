"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addCustomer(formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name");
  const phone = formData.get("phone");
  const email = formData.get("email");

  const { error } = await supabase
    .from("Customers")
    .insert({ name, phone, email });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
}

export async function addAppointment(formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const customer_id = formData.get("customer_id");
  const appointment_date = formData.get("appointment_date");
  const notes = formData.get("notes");

  const { error } = await supabase.from("appointments").insert({
    customer_id,
    appointment_date,
    notes,
    status: "scheduled",
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
}

export async function updateAppointmentStatus(id, formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const status = formData.get("status");

  const { error } = await supabase
    .from("appointments")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
}
