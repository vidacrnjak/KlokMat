"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuizByDifficultyPage() {
  const router = useRouter();
  const [grade, setGrade] = useState("2");
  const [difficulty, setDifficulty] = useState("3"); // 3, 4, ili 5 bodova

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-white to-stone-100">
      {/* Dekorativni blur elementi */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-slate-200/40 blur-3xl" />
        <div className="absolute left-1/3 top-2/3 h-72 w-72 -translate-x-1/2 rounded-full bg-stone-200/40 blur-3xl" />
      </div>

      <section className="w-full max-w-md rounded-3xl border border-black/5 bg-white/70 backdrop-blur-xl p-8 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.25)]">
        {/* Gumb za povratak */}
        <button
          onClick={() => router.push("/")}
          className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Natrag na početnu
        </button>

        <h1 className="text-center text-3xl font-semibold tracking-tight text-slate-900">
          Vježbaj po{" "}
          <span className="font-extrabold tracking-wider">TEŽINI</span>
        </h1>

        <p className="mt-3 text-center text-sm leading-relaxed text-slate-600">
          Odaberite razred i kategoriju bodova za vježbanje.
        </p>

        <div className="mt-8 space-y-5">
          {/* Odabir razreda */}
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Razred
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white/90 p-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-200"
            >
              <option value="2">2. razred</option>
              <option value="3">3. razred</option>
              <option value="4-5">4. i 5. razred</option>
              <option value="6-7">6. i 7. razred</option>
            </select>
          </div>

          {/* Odabir težine */}
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Težina (bodovi)
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setDifficulty("3")}
                className={[
                  "rounded-2xl border p-4 text-center transition",
                  difficulty === "3"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white/90 text-slate-900 hover:border-slate-300",
                ].join(" ")}
              >
                <div className="text-2xl font-bold">3</div>
                <div className="mt-1 text-xs">boda</div>
              </button>

              <button
                onClick={() => setDifficulty("4")}
                className={[
                  "rounded-2xl border p-4 text-center transition",
                  difficulty === "4"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white/90 text-slate-900 hover:border-slate-300",
                ].join(" ")}
              >
                <div className="text-2xl font-bold">4</div>
                <div className="mt-1 text-xs">boda</div>
              </button>

              <button
                onClick={() => setDifficulty("5")}
                className={[
                  "rounded-2xl border p-4 text-center transition",
                  difficulty === "5"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white/90 text-slate-900 hover:border-slate-300",
                ].join(" ")}
              >
                <div className="text-2xl font-bold">5</div>
                <div className="mt-1 text-xs">bodova</div>
              </button>
            </div>
          </div>

          {/* Gumb Kreni */}
          <button
            onClick={() =>
              router.push(
                `/quiz-by-difficulty/start?grade=${encodeURIComponent(
                  grade
                )}&difficulty=${difficulty}`
              )
            }
            className="mt-6 w-full rounded-2xl bg-slate-900 p-3 font-medium text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]"
          >
            Kreni
          </button>
        </div>
      </section>
    </main>
  );
}