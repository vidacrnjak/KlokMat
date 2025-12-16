import Quiz from "@/components/Quiz";
import { use } from "react";

export default function QuizStartPage({ searchParams }) {
  const params = use(searchParams);
  const grade = params.grade || "2";

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-white to-stone-100">
      <Quiz grade={grade} />
    </main>
  );
}