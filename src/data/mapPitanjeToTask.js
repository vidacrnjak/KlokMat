export function mapPitanjeToTask(p) {
  return {
    id: p.idPitanje,

    image: p.photoURL ? `/${p.photoURL}` : null,

    explanationImage: p.objasnjenje?.photoURL
      ? `/${p.objasnjenje.photoURL}`
      : null,

    explanation: p.objasnjenje?.text ?? null,

    // ⬇️ OPCIJE SU UVIJEK A–E
    options: ["A", "B", "C", "D", "E"],

    // ⬇️ OVO JE KLJUČNO MJESTO
    // baza: 1–5  → frontend: 0–4
    correctIndex: Number(p.correctAnswer) - 1,

    points: p.tezina,
    grade: p.razina,
  };
}
