import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { addCustomer } from "./actions";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: customers, error } = await supabase
    .from("Customers")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-slate-600 mb-8">Logged in as {user.email}</p>

      <h2 className="text-xl font-semibold mb-4">Add Customer</h2>

      <form
        action={addCustomer}
        className="bg-white rounded-lg shadow p-6 mb-8 flex flex-wrap gap-4 items-end"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            required
            className="border border-slate-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            name="phone"
            required
            className="border border-slate-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            required
            className="border border-slate-300 rounded-md px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-slate-900 hover:bg-slate-800 transition-colors text-white font-semibold px-5 py-2 rounded-md"
        >
          Add Customer
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Customers</h2>

      {error && (
        <p className="text-red-600 mb-4">
          Error loading customers: {error.message}
        </p>
      )}

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-slate-600 text-sm">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((customer) => (
              <tr key={customer.id} className="border-t border-slate-100">
                <td className="px-4 py-3">{customer.name}</td>
                <td className="px-4 py-3">{customer.phone}</td>
                <td className="px-4 py-3">{customer.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers?.length === 0 && (
          <p className="text-slate-500 p-4">No customers yet.</p>
        )}
      </div>
    </main>
  );
}
