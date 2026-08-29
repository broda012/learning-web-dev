import { submitRequest } from "./actions";

export default function RequestPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-12">
      <form
        action={submitRequest}
        className="bg-white rounded-lg shadow p-8 w-full max-w-md flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center mb-2">
          Request an Appointment
        </h1>

        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            required
            className="w-full border border-slate-300 rounded-md px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            name="phone"
            required
            className="w-full border border-slate-300 rounded-md px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border border-slate-300 rounded-md px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Preferred Date &amp; Time
          </label>
          <input
            type="datetime-local"
            name="appointment_date"
            required
            className="w-full border border-slate-300 rounded-md px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            What do you need done?
          </label>
          <textarea
            name="notes"
            rows={3}
            className="w-full border border-slate-300 rounded-md px-4 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-slate-900 hover:bg-slate-800 transition-colors text-white font-semibold py-3 rounded-md mt-2"
        >
          Submit Request
        </button>
      </form>
    </main>
  );
}
