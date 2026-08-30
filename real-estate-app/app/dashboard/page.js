import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  signOut,
  addContact,
  updateContactStage,
  addListing,
  addAppointment,
  updateAppointmentStatus,
} from "./actions";
import AITools from "./AITools";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: contacts } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: appointments } = await supabase
    .from("appointments")
    .select("*, contacts(name), listings(address)")
    .order("appointment_date", { ascending: true });

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Agent Dashboard</h1>
          <p className="text-slate-600">Logged in as {user.email}</p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="bg-white border border-slate-300 hover:bg-slate-100 transition-colors px-4 py-2 rounded-md text-sm font-medium"
          >
            Log Out
          </button>
        </form>
      </div>

      {/* Contacts */}
      <h2 className="text-xl font-semibold mb-4">Add Contact</h2>
      <form
        action={addContact}
        className="bg-white rounded-lg shadow p-6 mb-8 flex flex-wrap gap-4 items-end"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input name="name" required className="border border-slate-300 rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input name="phone" className="border border-slate-300 rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input name="email" type="email" className="border border-slate-300 rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Source</label>
          <input name="source" placeholder="e.g. Website" className="border border-slate-300 rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stage</label>
          <select name="stage" className="border border-slate-300 rounded-md px-3 py-2">
            <option value="new">new</option>
            <option value="contacted">contacted</option>
            <option value="qualified">qualified</option>
            <option value="client">client</option>
            <option value="lost">lost</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Follow-up Date</label>
          <input name="follow_up_date" type="date" className="border border-slate-300 rounded-md px-3 py-2" />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium mb-1">Notes</label>
          <input name="notes" className="border border-slate-300 rounded-md px-3 py-2 w-full" />
        </div>
        <button
          type="submit"
          className="bg-slate-900 hover:bg-slate-800 transition-colors text-white font-semibold px-5 py-2 rounded-md"
        >
          Add Contact
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Contacts (Leads &amp; Clients)</h2>
      <div className="bg-white rounded-lg shadow overflow-x-auto mb-10">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-slate-600 text-sm">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Follow-up</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3">Stage</th>
            </tr>
          </thead>
          <tbody>
            {contacts?.map((contact) => (
              <tr key={contact.id} className="border-t border-slate-100">
                <td className="px-4 py-3">{contact.name}</td>
                <td className="px-4 py-3">{contact.phone}</td>
                <td className="px-4 py-3">{contact.source}</td>
                <td className="px-4 py-3">{contact.follow_up_date}</td>
                <td className="px-4 py-3">{contact.notes}</td>
                <td className="px-4 py-3">
                  <form
                    action={updateContactStage.bind(null, contact.id)}
                    className="flex gap-2"
                  >
                    <select
                      name="stage"
                      defaultValue={contact.stage}
                      className="border border-slate-300 rounded-md px-2 py-1 text-sm"
                    >
                      <option value="new">new</option>
                      <option value="contacted">contacted</option>
                      <option value="qualified">qualified</option>
                      <option value="client">client</option>
                      <option value="lost">lost</option>
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
        {contacts?.length === 0 && (
          <p className="text-slate-500 p-4">No contacts yet.</p>
        )}
      </div>

      {/* Listings */}
      <h2 className="text-xl font-semibold mb-4">Add Listing</h2>
      <form
        action={addListing}
        className="bg-white rounded-lg shadow p-6 mb-8 flex flex-wrap gap-4 items-end"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input name="address" required className="border border-slate-300 rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input name="price" type="number" required className="border border-slate-300 rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bedrooms</label>
          <input name="bedrooms" type="number" className="border border-slate-300 rounded-md px-3 py-2 w-24" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bathrooms</label>
          <input name="bathrooms" type="number" step="0.5" className="border border-slate-300 rounded-md px-3 py-2 w-24" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select name="status" className="border border-slate-300 rounded-md px-3 py-2">
            <option value="active">active</option>
            <option value="pending">pending</option>
            <option value="sold">sold</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium mb-1">Description</label>
          <input name="description" className="border border-slate-300 rounded-md px-3 py-2 w-full" />
        </div>
        <button
          type="submit"
          className="bg-slate-900 hover:bg-slate-800 transition-colors text-white font-semibold px-5 py-2 rounded-md"
        >
          Add Listing
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Property Listings</h2>
      <div className="bg-white rounded-lg shadow overflow-x-auto mb-10">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-slate-600 text-sm">
            <tr>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Bed/Bath</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {listings?.map((listing) => (
              <tr key={listing.id} className="border-t border-slate-100">
                <td className="px-4 py-3">{listing.address}</td>
                <td className="px-4 py-3">${Number(listing.price).toLocaleString()}</td>
                <td className="px-4 py-3">{listing.bedrooms} / {listing.bathrooms}</td>
                <td className="px-4 py-3">{listing.description}</td>
                <td className="px-4 py-3">{listing.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {listings?.length === 0 && (
          <p className="text-slate-500 p-4">No listings yet.</p>
        )}
      </div>

      {/* Appointments */}
      <h2 className="text-xl font-semibold mb-4">Add Appointment</h2>
      <form
        action={addAppointment}
        className="bg-white rounded-lg shadow p-6 mb-8 flex flex-wrap gap-4 items-end"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Contact</label>
          <select name="contact_id" required className="border border-slate-300 rounded-md px-3 py-2">
            {contacts?.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Listing</label>
          <select name="listing_id" className="border border-slate-300 rounded-md px-3 py-2">
            <option value="">(none)</option>
            {listings?.map((l) => (
              <option key={l.id} value={l.id}>{l.address}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date &amp; Time</label>
          <input name="appointment_date" type="datetime-local" required className="border border-slate-300 rounded-md px-3 py-2" />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium mb-1">Notes</label>
          <input name="notes" className="border border-slate-300 rounded-md px-3 py-2 w-full" />
        </div>
        <button
          type="submit"
          className="bg-slate-900 hover:bg-slate-800 transition-colors text-white font-semibold px-5 py-2 rounded-md"
        >
          Add Appointment
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Appointments</h2>
      <div className="bg-white rounded-lg shadow overflow-x-auto mb-10">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-slate-600 text-sm">
            <tr>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Listing</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.map((appt) => (
              <tr key={appt.id} className="border-t border-slate-100">
                <td className="px-4 py-3">{appt.contacts?.name}</td>
                <td className="px-4 py-3">{appt.listings?.address ?? "—"}</td>
                <td className="px-4 py-3">
                  {new Date(appt.appointment_date).toLocaleString()}
                </td>
                <td className="px-4 py-3">{appt.notes}</td>
                <td className="px-4 py-3">
                  <form
                    action={updateAppointmentStatus.bind(null, appt.id)}
                    className="flex gap-2"
                  >
                    <select
                      name="status"
                      defaultValue={appt.status}
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

      {/* AI Tools */}
      <h2 className="text-xl font-semibold mb-4">AI Assistant</h2>
      <AITools contacts={contacts || []} />
    </main>
  );
}
