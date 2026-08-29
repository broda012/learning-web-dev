import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { addCustomer, addAppointment, updateAppointmentStatus } from "./actions";

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

  const { data: appointments, error: appointmentsError } = await supabase
    .from("appointments")
    .select("*, Customers(name)")
    .order("appointment_date", { ascending: true });

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

      <h2 className="text-xl font-semibold mb-4 mt-10">Add Appointment</h2>

      <form
        action={addAppointment}
        className="bg-white rounded-lg shadow p-6 mb-8 flex flex-wrap gap-4 items-end"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Customer</label>
          <select
            name="customer_id"
            required
            className="border border-slate-300 rounded-md px-3 py-2"
          >
            {customers?.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date &amp; Time</label>
          <input
            type="datetime-local"
            name="appointment_date"
            required
            className="border border-slate-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <input
            name="notes"
            className="border border-slate-300 rounded-md px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-slate-900 hover:bg-slate-800 transition-colors text-white font-semibold px-5 py-2 rounded-md"
        >
          Add Appointment
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Appointments</h2>

      {appointmentsError && (
        <p className="text-red-600 mb-4">
          Error loading appointments: {appointmentsError.message}
        </p>
      )}

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-slate-600 text-sm">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.map((appointment) => (
              <tr key={appointment.id} className="border-t border-slate-100">
                <td className="px-4 py-3">{appointment.Customers?.name}</td>
                <td className="px-4 py-3">
                  {new Date(appointment.appointment_date).toLocaleString()}
                </td>
                <td className="px-4 py-3">{appointment.notes}</td>
                <td className="px-4 py-3">
                  <form
                    action={updateAppointmentStatus.bind(null, appointment.id)}
                    className="flex gap-2"
                  >
                    <select
                      name="status"
                      defaultValue={appointment.status}
                      className="border border-slate-300 rounded-md px-2 py-1 text-sm"
                    >
                      <option value="scheduled">scheduled</option>
                      <option value="completed">completed</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                    <button
                      type="submit"
                      className="bg-slate-200 hover:bg-slate-300 transition-colors text-sm px-3 py-1 rounded-md"
                    >
                      Update
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {appointments?.length === 0 && (
          <p className="text-slate-500 p-4">No appointments yet.</p>
        )}
      </div>
    </main>
  );
}
