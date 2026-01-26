import QuizByDifficulty from "@/components/QuizByDifficulty";
import { getQuizByDifficulty } from "@/data/getQuizByDifficulty";
import { mapPitanjeToTask } from "@/data/mapPitanjeToTask";

export default async function QuizByDifficultyStartPage({ searchParams }) {
  const params = await searchParams;

  // uzima grade i difficulty iz query-a
  const grade = params.grade ?? "2";
  const difficulty = params.difficulty ?? "3";
  
  // dohvat pitanja iz baze
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
