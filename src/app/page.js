"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[var(--klokmat-yellow-light)] via-[var(--klokmat-cream)] to-white">
      {/* Dekorativni blur elementi */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--klokmat-yellow)]/30 blur-3xl" />
        <div className="absolute left-1/3 top-2/3 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--klokmat-red)]/20 blur-3xl" />
      </div>

      <section className="w-full max-w-2xl rounded-3xl border border-[var(--klokmat-red)]/20 bg-white/80 backdrop-blur-xl p-12 shadow-[0_20px_60px_-20px_rgba(199,74,60,0.3)]">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-[var(--klokmat-text)]">
            Dobrodošli na{" "}
            <span className="font-extrabold tracking-wider text-[var(--klokmat-red)]">
              KLOKMAT
            </span>
          </h1>
          <p className="mt-5 text-lg text-slate-700 leading-relaxed">
            Vježbajte zadatke iz natjecanja Klokan bez granica.
            <br />
            Odaberite način vježbanja:
          </p>
        </div>

        {/* Gumbi */}
        <div className="mt-12 space-y-5">
          {/* Gumb 1: Po godini */}
          <button
            onClick={() => router.push("/quiz-by-year")}
            className="group w-full rounded-2xl border-2 border-[var(--klokmat-red)]/30 bg-gradient-to-r from-[var(--klokmat-yellow)]/10 to-white hover:from-[var(--klokmat-yellow)]/20 hover:to-[var(--klokmat-yellow)]/10 p-7 text-left shadow-md transition hover:border-[var(--klokmat-red)]/50 hover:shadow-lg active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-[var(--klokmat-text)]">
                  Vježbaj rješavanje cijelog ispita
                </h3>
                <p className="mt-2 text-base text-slate-600">
                  Rješavajte cijeli ispit jedne godine sa vremeskim ograničenjem
                </p>
              </div>
              <svg
                className="h-7 w-7 text-[var(--klokmat-red)] transition group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>

          {/* Gumb 2: Po težini */}
          <button
            onClick={() => router.push("/quiz-by-difficulty")}
            className="group w-full rounded-2xl border-2 border-[var(--klokmat-red)]/30 bg-gradient-to-r from-[var(--klokmat-yellow)]/10 to-white hover:from-[var(--klokmat-yellow)]/20 hover:to-[var(--klokmat-yellow)]/10 p-7 text-left shadow-md transition hover:border-[var(--klokmat-red)]/50 hover:shadow-lg active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-[var(--klokmat-text)]">
                  Vježbaj po težini zadatka
                </h3>
                <p className="mt-2 text-base text-slate-600">
                  Vježbajte zadatke po kategorijama bodova
                </p>
              </div>
              <svg
                className="h-7 w-7 text-[var(--klokmat-red)] transition group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>
        </div>
      </section>
    </main>
  );
}