"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-white to-stone-100">
      {/* Dekorativni blur elementi */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-slate-200/40 blur-3xl" />
        <div className="absolute left-1/3 top-2/3 h-72 w-72 -translate-x-1/2 rounded-full bg-stone-200/40 blur-3xl" />
      </div>

      <section className="w-full max-w-lg rounded-3xl border border-black/5 bg-white/70 backdrop-blur-xl p-10 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.25)]">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            Dobrodošli na{" "}
            <span className="font-extrabold tracking-wider text-slate-900">
              KLOKMAT
            </span>
          </h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vježbajte zadatke iz natjecanja Klokan bez granica.
            <br />
            Odaberite način vježbanja:
          </p>
        </div>

        {/* Gumbi */}
        <div className="mt-10 space-y-4">
          {/* Gumb 1: Po godini */}
          <button
            onClick={() => router.push("/quiz-by-year")}
            className="group w-full rounded-2xl border border-slate-200 bg-white/90 p-6 text-left shadow-sm transition hover:border-slate-300 hover:shadow-md active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Vježbaj rješavanje cijelog ispita
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Rješavajte cijeli ispit sa vremeskim ograničenjem
                </p>
              </div>
              <svg
                className="h-6 w-6 text-slate-400 transition group-hover:translate-x-1"
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
            className="group w-full rounded-2xl border border-slate-200 bg-white/90 p-6 text-left shadow-sm transition hover:border-slate-300 hover:shadow-md active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Vježbaj po težini zadatka
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Vježbajte zadatke po kategorijama bodova
                </p>
              </div>
              <svg
                className="h-6 w-6 text-slate-400 transition group-hover:translate-x-1"
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