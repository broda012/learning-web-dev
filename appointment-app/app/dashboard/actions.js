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
