import QuizByDifficulty from "@/components/QuizByDifficulty";
import { use } from "react";

export default function QuizByDifficultyStartPage({ searchParams }) {
  // Unwrap Promise
  const params = use(searchParams);
  const grade = params.grade || "2";
  const difficulty = params.difficulty || "3";

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-white to-stone-100">
      <QuizByDifficulty grade={grade} difficulty={difficulty} />
    </main>
  );
}