const LETTER_TO_INDEX = { A: 0, B: 1, C: 2, D: 3, E: 4 };

// Rješenja redom kako idu slike 01..10
const SOL_2_3B = "E D D D D B B D A E".split(" ");
const SOL_2_4B = "B D D C E D B A E D".split(" ");
const SOL_2_5B = "A C D E D D C C D D".split(" ");

function makeTasks({ grade, points, folder, prefix, count, solutions }) {
  return Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    const nn = String(n).padStart(2, "0"); // 01..10

    const letter = solutions?.[i]; // npr "E"
    const correctIndex = LETTER_TO_INDEX[letter] ?? 0;

    return {
      id: `${grade}-${points}-${nn}`,
      grade: String(grade),
      points,
      folder,
      image: `/tasks/${grade}/${folder}/${prefix}${nn}.png`,
      options: ["", "", "", "", ""], // samo da map napravi 5 gumba
      correctIndex,
      explanation: "",
    };
  });
}

export const TASKS = [
  // 2. razred — 10 zadataka po kategoriji + rješenja
  ...makeTasks({
    grade: 2,
    points: 3,
    folder: "zadatci_3b",
    prefix: "P3b",
    count: 10,
    solutions: SOL_2_3B,
  }),
  ...makeTasks({
    grade: 2,
    points: 4,
    folder: "zadatci_4b",
    prefix: "P4b",
    count: 10,
    solutions: SOL_2_4B,
  }),
  ...makeTasks({
    grade: 2,
    points: 5,
    folder: "zadatci_5b",
    prefix: "P5b",
    count: 10,
    solutions: SOL_2_5B,
  }),
];
