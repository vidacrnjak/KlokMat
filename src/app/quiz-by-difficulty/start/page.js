import QuizByDifficulty from "@/components/QuizByDifficulty";
import { use } from "react";

export default function QuizByDifficultyStartPage({ searchParams }) {
  // Unwrap Promise
  const params = use(searchParams);
  const grade = params.grade || "2";
  const difficulty = params.difficulty || "3";

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[var(--klokmat-yellow-light)] via-[var(--klokmat-cream)] to-white">
      {/* Dekorativni blur elementi */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--klokmat-yellow)]/30 blur-3xl" />
        <div className="absolute left-1/3 top-2/3 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--klokmat-red)]/20 blur-3xl" />
      </div>
      
      <QuizByDifficulty grade={grade} difficulty={difficulty} />
    </main>
  );
}