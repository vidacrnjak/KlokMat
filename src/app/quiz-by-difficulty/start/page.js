import QuizByDifficulty from "@/components/QuizByDifficulty";
import { getQuizByDifficulty } from "@/data/getQuizByDifficulty";
import { mapPitanjeToTask } from "@/data/mapPitanjeToTask";

export default async function QuizByDifficultyStartPage({ searchParams }) {
  // ✅ OVO JE BITNO
  const params = await searchParams;

  const grade = params.grade ?? "2";
  const difficulty = params.difficulty ?? "3";

  const pitanja = await getQuizByDifficulty({
    grade,
    difficulty,
  });

  const tasks = pitanja.map(mapPitanjeToTask);

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[var(--klokmat-yellow-light)] via-[var(--klokmat-cream)] to-white">
      <QuizByDifficulty
        grade={grade}
        difficulty={difficulty}
        tasks={tasks}
      />
    </main>
  );
}
