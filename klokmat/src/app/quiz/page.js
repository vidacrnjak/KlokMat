import Quiz from "@/components/Quiz";

export default function QuizPage({ searchParams = {} }) {
  const grade = searchParams.grade || "2";

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-white to-stone-100">
      <Quiz grade={grade} />
    </main>
  );
}
