import { prisma } from "./prisma";
import { mapGradeToRazina } from "./helper";

export async function getQuizByYear({ grade, year }) {
  const razina = mapGradeToRazina(grade);

  const pitanja = await prisma.pitanje.findMany({
    where: {
      razina,
      godina: Number(year),
    },
    include: {
      objasnjenje: true,
    },
    orderBy: [
      { tezina: "asc" },    // Prvo po težini (3, 4, 5)
      { idPitanje: "asc" }, // Onda po ID-u unutar svake težine
    ],
  });

  return pitanja;
}