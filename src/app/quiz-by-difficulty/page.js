"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuizByDifficultyPage() {
  const router = useRouter();
  const [grade, setGrade] = useState("2");
  const [difficulty, setDifficulty] = useState("3"); // 3, 4, ili 5 bodova

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[var(--klokmat-yellow-light)] via-[var(--klokmat-cream)] to-white">
      {/* Dekorativni blur elementi */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--klokmat-yellow)]/30 blur-3xl" />
        <div className="absolute left-1/3 top-2/3 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--klokmat-red)]/20 blur-3xl" />
      </div>

      <section className="w-full max-w-xl rounded-3xl border-2 border-[var(--klokmat-red)]/20 bg-white/80 backdrop-blur-xl p-10 shadow-[0_20px_60px_-20px_rgba(199,74,60,0.3)]">
        {/* Gumb za povratak */}
        <button
          onClick={() => router.push("/")}
          className="mb-8 flex items-center gap-2 text-base text-[var(--klokmat-red)] hover:text-[var(--klokmat-red-dark)] transition"
        >
          <svg
            className="h-5 w-5"
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

        <h1 className="text-center text-4xl font-semibold tracking-tight text-[var(--klokmat-text)]">
          Vježbaj po{" "}
          <span className="font-extrabold tracking-wider text-[var(--klokmat-red)]">TEŽINI</span>
        </h1>

        <p className="mt-4 text-center text-base leading-relaxed text-slate-700">
          Odaberite razred i kategoriju bodova za vježbanje.
        </p>

        <div className="mt-10 space-y-6">
          {/* Odabir razreda */}
          <div>
            <label className="block text-base font-semibold text-[var(--klokmat-text)] mb-3">
              Razred
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full rounded-2xl border-2 border-[var(--klokmat-yellow)]/50 bg-white/90 p-4 text-lg text-[var(--klokmat-text)] shadow-sm outline-none transition focus:border-[var(--klokmat-red)]/50 focus:ring-4 focus:ring-[var(--klokmat-yellow)]/20"
            >
              <option value="2">2. razred</option>
              <option value="3">3. razred</option>
              <option value="4-5">4. i 5. razred</option>
              <option value="6-7">6. i 7. razred</option>
            </select>
          </div>

          {/* Odabir težine */}
          <div>
            <label className="block text-base font-semibold text-[var(--klokmat-text)] mb-3">
              Težina (bodovi)
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setDifficulty("3")}
                className={[
                  "rounded-2xl border-2 p-5 text-center transition active:scale-[0.98]",
                  difficulty === "3"
                    ? "border-[var(--klokmat-red)] bg-[var(--klokmat-red)] text-white shadow-md"
                    : "border-[var(--klokmat-yellow)]/50 bg-white/90 text-[var(--klokmat-text)] hover:border-[var(--klokmat-red)]/50 hover:bg-[var(--klokmat-yellow)]/10",
                ].join(" ")}
              >
                <div className="text-3xl font-bold">3</div>
                <div className="mt-1 text-sm">boda</div>
              </button>

              <button
                onClick={() => setDifficulty("4")}
                className={[
                  "rounded-2xl border-2 p-5 text-center transition active:scale-[0.98]",
                  difficulty === "4"
                    ? "border-[var(--klokmat-red)] bg-[var(--klokmat-red)] text-white shadow-md"
                    : "border-[var(--klokmat-yellow)]/50 bg-white/90 text-[var(--klokmat-text)] hover:border-[var(--klokmat-red)]/50 hover:bg-[var(--klokmat-yellow)]/10",
                ].join(" ")}
              >
                <div className="text-3xl font-bold">4</div>
                <div className="mt-1 text-sm">boda</div>
              </button>

              <button
                onClick={() => setDifficulty("5")}
                className={[
                  "rounded-2xl border-2 p-5 text-center transition active:scale-[0.98]",
                  difficulty === "5"
                    ? "border-[var(--klokmat-red)] bg-[var(--klokmat-red)] text-white shadow-md"
                    : "border-[var(--klokmat-yellow)]/50 bg-white/90 text-[var(--klokmat-text)] hover:border-[var(--klokmat-red)]/50 hover:bg-[var(--klokmat-yellow)]/10",
                ].join(" ")}
              >
                <div className="text-3xl font-bold">5</div>
                <div className="mt-1 text-sm">bodova</div>
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
            className="mt-8 w-full rounded-2xl bg-[var(--klokmat-red)] p-4 text-lg font-semibold text-white shadow-md transition hover:bg-[var(--klokmat-red-dark)] active:scale-[0.98]"
          >
            Kreni
          </button>
        </div>
      </section>
    </main>
  );
}