import { prisma } from "./prisma";
import { mapGradeToRazina } from "./helper";

// ova funkcija pomiješa kopiju niza, ne mijenja originalni niz
function shuffle(arr) {
  const a = [...arr]; // stvaranje kopije niza
  // idemo od kraja prema početku i svaki put zamijenimo element s random pozicijom
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function getQuizByDifficulty({ grade, difficulty }) {
  const razina = mapGradeToRazina(grade); // pretvaramo razred u razinu, npr. 2. razred -> Pcelice

  // dohvaćamo sva pitanja koja odgovaraju razini i težini
  const pitanja = await prisma.pitanje.findMany({
    where: {
      razina,
      tezina: Number(difficulty), 
    },
    include: {
      objasnjenje: true, // povlačimo i objašnjenja uz pitanja
    },
  });

  return shuffle(pitanja).slice(0, 10); // pomiješamo i uzmemo prvih 10 pitanja
}