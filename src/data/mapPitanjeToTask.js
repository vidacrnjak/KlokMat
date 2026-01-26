export function mapPitanjeToTask(p) {
  return {
    id: p.idPitanje,

    image: p.photoURL ? `/${p.photoURL}` : null,

    explanationImage: p.objasnjenje?.photoURL
      ? `/${p.objasnjenje.photoURL}`
      : null,

    explanation: p.objasnjenje?.text ?? null,

    options: ["A", "B", "C", "D", "E"],

    correctIndex: Number(p.correctAnswer) - 1,

    points: p.tezina,
    grade: p.razina,
  };
}
