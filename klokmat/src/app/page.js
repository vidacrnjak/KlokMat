"use client"; // ovo nam treba jer koristimo useState i useRouter

import { useState } from "react"; // pamtimo vrijednost koju korisnik odabere (razred/kategoriju)
import { useRouter } from "next/navigation"; // nakon odabira odnsono kada korisnik pritisne kreni ga preusmjeravamo na drugu rutu

export default function HomePage() {
  const router = useRouter();
  const [grade, setGrade] = useState("2"); // defaultna vrijednost je 2.razred dok se ne odabere drugo

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-white to-stone-100">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-slate-200/40 blur-3xl" />
        <div className="absolute left-1/3 top-2/3 h-72 w-72 -translate-x-1/2 rounded-full bg-stone-200/40 blur-3xl" />
      </div>

      <section className="w-full max-w-md rounded-3xl border border-black/5 bg-white/70 backdrop-blur-xl p-8 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.25)]">
        <h1 className="text-center text-3xl font-semibold tracking-tight text-slate-900">
          Dobrodošli na{" "}
          <span className="font-extrabold tracking-wider">KLOKMAT</span>
        </h1>

        <p className="mt-3 text-center text-sm leading-relaxed text-slate-600">
          Odaberite razred i krenite rješavati zadatke.
        </p>

        <div className="mt-8 space-y-3">
          <label className="block text-sm font-medium text-slate-800">
            Razred
          </label>

          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}  // kad se promjeni razred se sprema nova vrijednost
            className="w-full rounded-2xl border border-slate-200 bg-white/90 p-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-200"
          >
            <option value="2">2. razred</option>
            <option value="3">3. razred</option>
            <option value="4-5">4. i 5. razred</option>
            <option value="6-7">6. i 7. razred</option>
          </select>

          <button
            onClick={() => router.push(`/quiz?grade=${encodeURIComponent(grade)}`)} // odemo na /quiz i pošaljemo za koji razred kroz URL
            className="mt-4 w-full rounded-2xl bg-slate-900 p-3 font-medium text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]"
          >
            Kreni
          </button>
        </div>
      </section>
    </main>
  );
}
