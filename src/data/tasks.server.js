import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function getTasksFromDB({ grade, points }) {
  const razina =
    grade === "2"
      ? "Pcelice"
      : grade === "3"
      ? "Leptirici"
      : grade === "4-5"
      ? "Ecolier"
      : "Benjamin";

  const pitanja = await prisma.pitanje.findMany({
    where: {
      razina,
      ...(points ? { tezina: points } : {}),
    },
    include: {
      objasnjenje: true,
    },
  });

  return pitanja.map((p) => ({
    id: p.idPitanje,

    // u bazi je CIJELA RUTA
    image: p.photoURL ? `/${p.photoURL}` : null,
    explanationImage: p.objasnjenje?.photoURL
      ? `/${p.objasnjenje.photoURL}`
      : null,

    explanation: p.objasnjenje?.text ?? null,

    options: [
      p.answerA,
      p.answerB,
      p.answerC,
      p.answerD,
      p.answerE,
    ].filter(Boolean),

    correctIndex: (p.correctAnswer ?? 1) - 1,
    points: p.tezina,
    grade,
  }));
}
