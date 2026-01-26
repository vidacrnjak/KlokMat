import QuizByYear from "@/components/QuizByYear";
import { getQuizByYear } from "@/data/getQuizByYear";
import { mapPitanjeToTask } from "@/data/mapPitanjeToTask";

export default async function QuizStartPage({ searchParams }) {
  const params = await searchParams;

  const grade = params.grade ?? "2";
  const year = params.year ?? "2024";

  const pitanja = await getQuizByYear({
    grade,
    year,
  });

  const tasks = pitanja.map(mapPitanjeToTask);

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[var(--klokmat-yellow-light)] via-[var(--klokmat-cream)] to-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--klokmat-yellow)]/30 blur-3xl" />
        <div className="absolute left-1/3 top-2/3 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--klokmat-red)]/20 blur-3xl" />
      </div>
      
      <QuizByYear grade={grade} year={year} tasks={tasks} />
    </main>
  );
}