"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ResultsPage() {
  const router = useRouter();
  const params = useSearchParams();
  
  const points = parseInt(params.get("points")) || 0;
  const max = parseInt(params.get("max")) || 0;
  const grade = params.get("grade") || "2";
  const year = params.get("year") || "2024";

  const percentage = max > 0 ? Math.round((points / max) * 100) : 0;

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[var(--klokmat-yellow-light)] via-[var(--klokmat-cream)] to-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--klokmat-yellow)]/30 blur-3xl" />
        <div className="absolute left-1/3 top-2/3 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--klokmat-red)]/20 blur-3xl" />
      </div>

      <section className="w-full max-w-xl rounded-3xl border-2 border-[var(--klokmat-red)]/20 bg-white/80 backdrop-blur-xl p-12 shadow-[0_20px_60px_-20px_rgba(199,74,60,0.3)] text-center">
        <h1 className="text-4xl font-bold text-[var(--klokmat-text)]">
          🎉 Rezultat
        </h1>

        <div className="mt-8 rounded-2xl bg-[var(--klokmat-yellow)]/20 border-2 border-[var(--klokmat-yellow)] p-8">
          <p className="text-lg text-slate-700 mb-3">Osvojili ste</p>
          <p className="text-6xl font-bold text-[var(--klokmat-red)]">
            {points}
          </p>
          <p className="text-2xl text-slate-700 mt-2">
            od {max} bodova
          </p>
          <p className="text-lg text-slate-600 mt-4">
            ({percentage}%)
          </p>
        </div>

        <div className="mt-6 text-base text-slate-700">
          <p>
            Razred: <span className="font-semibold">{grade}</span>
          </p>
          <p>
            Godina: <span className="font-semibold">{year}</span>
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => router.push(`/quiz-by-year/start?grade=${grade}&year=${year}`)}
            className="w-full rounded-2xl bg-[var(--klokmat-red)] p-4 text-lg font-semibold text-white hover:bg-[var(--klokmat-red-dark)] transition"
          >
            Ponovi ispit
          </button>

          <button
            onClick={() => router.push("/quiz-by-year")}
            className="w-full rounded-2xl border-2 border-[var(--klokmat-yellow)]/50 bg-white p-4 text-lg font-semibold text-[var(--klokmat-text)] hover:bg-[var(--klokmat-yellow)]/10 transition"
          >
            Odaberi drugi ispit
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full rounded-2xl border-2 border-[var(--klokmat-yellow)]/50 bg-white p-4 text-lg font-semibold text-[var(--klokmat-text)] hover:bg-[var(--klokmat-yellow)]/10 transition"
          >
            Natrag na početnu
          </button>
        </div>
      </section>
    </main>
  );
}