import Link from "next/link";

export default function CancelledPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="bg-white rounded-lg shadow p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">Payment cancelled</h1>
        <p className="text-slate-600 mb-6">
          No charge was made. You can try requesting an appointment again
          whenever you&apos;re ready.
        </p>
        <Link
          href="/request"
          className="inline-block bg-slate-900 text-white font-semibold px-6 py-3 rounded-md"
        >
          Back to Request Form
        </Link>
      </div>
    </main>
  );
}
