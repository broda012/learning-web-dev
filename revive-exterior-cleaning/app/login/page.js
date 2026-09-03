"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-(--color-cream) px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm border border-(--color-border) p-10 w-full max-w-sm flex flex-col gap-5"
      >
        <div className="text-center mb-2">
          <p className="font-[family-name:var(--font-mono)] text-(--color-terracotta) text-xs uppercase tracking-[0.2em] mb-2">
            Driveway &amp; Bin Cleaning
          </p>
          <h1 className="text-2xl font-bold text-(--color-ink)">Owner Login</h1>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-(--color-border) rounded-lg px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-(--color-terracotta)"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-(--color-muted) mb-2">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-(--color-border) rounded-lg px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-(--color-terracotta)"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-(--color-terracotta) hover:bg-(--color-terracotta-dark) transition-colors text-white font-semibold py-2.5 rounded-lg disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </main>
  );
}
