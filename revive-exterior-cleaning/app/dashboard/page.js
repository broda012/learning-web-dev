import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut, updateLeadStatus } from "./actions";

const statusOptions = ["new", "contacted", "booked", "archived"];

export default async function DashboardPage({ searchParams }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { status } = await searchParams;

  let leadsQuery = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) {
    leadsQuery = leadsQuery.eq("status", status);
  }

  const { data: leads, error } = await leadsQuery;

  return (
    <main className="min-h-screen bg-(--color-cream) p-6 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-(--color-terracotta) text-xs uppercase tracking-[0.2em] mb-2">
            Driveway &amp; Bin Cleaning
          </p>
          <h1 className="text-2xl font-bold text-(--color-ink)">Leads Dashboard</h1>
          <p className="text-(--color-muted) text-sm mt-1">Logged in as {user.email}</p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="bg-white border border-(--color-border) hover:border-(--color-ink) transition-colors px-4 py-2 rounded-lg text-sm font-medium"
          >
            Log Out
          </button>
        </form>
      </div>

      <form className="flex flex-wrap items-center gap-2 mb-6">
        <select
          name="status"
          defaultValue={status || ""}
          className="border border-(--color-border) rounded-lg px-3 py-2 text-sm bg-white"
        >
          <option value="">All statuses</option>
          {statusOptions.map((s) => (
            <option key={s} value={s} className="capitalize">
              {s}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-(--color-ink) text-white text-sm px-4 py-2 rounded-lg font-medium"
        >
          Filter
        </button>
        {status && (
          <a href="/dashboard" className="text-sm text-(--color-muted) hover:underline">
            Clear
          </a>
        )}
      </form>

      {error && (
        <p className="text-red-600 mb-4">Error loading leads: {error.message}</p>
      )}

      <div className="bg-white rounded-2xl border border-(--color-border) overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-(--color-cream) text-(--color-muted) uppercase text-xs tracking-wide">
            <tr>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Job</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3 min-w-[260px]">AI Summary</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads?.map((lead) => (
              <tr key={lead.id} className="border-t border-(--color-border) align-top">
                <td className="px-4 py-3 whitespace-nowrap text-(--color-muted)">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-(--color-ink)">{lead.name}</p>
                  <p className="text-(--color-muted)">{lead.phone}</p>
                  <p className="text-(--color-muted)">{lead.email}</p>
                  <p className="text-(--color-muted)">{lead.address}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-(--color-ink)">{lead.service}</p>
                  <p className="text-(--color-muted)">
                    {lead.bins ? `${lead.bins} bins` : lead.size || "—"}
                  </p>
                  <p className="text-(--color-muted) capitalize">{lead.frequency}</p>
                  <p className="text-(--color-muted)">{lead.preferred_date}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                      lead.priority === "HIGH PRIORITY"
                        ? "bg-(--color-terracotta)/15 text-(--color-terracotta-dark)"
                        : "bg-(--color-border)/60 text-(--color-muted)"
                    }`}
                  >
                    {lead.priority || "—"}
                  </span>
                </td>
                <td className="px-4 py-3 text-(--color-muted)">{lead.ai_summary || "—"}</td>
                <td className="px-4 py-3">
                  <form
                    action={updateLeadStatus.bind(null, lead.id)}
                    className="flex flex-col gap-2"
                  >
                    <select
                      name="status"
                      defaultValue={lead.status}
                      className="border border-(--color-border) rounded-md px-2 py-1 text-xs capitalize"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s} className="capitalize">
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="bg-(--color-cream) hover:bg-(--color-border) transition-colors text-xs px-3 py-1 rounded-md"
                    >
                      Update
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads?.length === 0 && (
          <p className="text-(--color-muted) p-6 text-center">No leads yet.</p>
        )}
      </div>
    </main>
  );
}
