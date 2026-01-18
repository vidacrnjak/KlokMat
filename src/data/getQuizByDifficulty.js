import { prisma } from "./prisma";
import { mapGradeToRazina } from "./helper";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function getQuizByDifficulty({ grade, difficulty }) {
  const razina = mapGradeToRazina(grade);

  const pitanja = await prisma.pitanje.findMany({
    where: {
      razina,
      tezina: Number(difficulty),
    },
    include: {
      objasnjenje: true,
    },
  });

  return shuffle(pitanja).slice(0, 10);
}
