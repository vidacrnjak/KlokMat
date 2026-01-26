"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// vraća pomiješanu kopiju niza
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizByDifficulty({
  grade = "2", // default razred ako nije proslijeđen
  difficulty = "3", // default težina
  tasks = [], // lista pitanja za kviz
}) {
  const router = useRouter();

  const quizTasks = useMemo(() => shuffle(tasks), [tasks]);

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0); // index trenutno prikazanog zadatka
  const [picked, setPicked] = useState(null); // odabrani odgovor
  const [checked, setChecked] = useState(false); // provjera odgovora

  // statistika kviza
  const [correctCount, setCorrectCount] = useState(0);
  const [points, setPoints] = useState(0);

  // trenutno pitanje i pomoćne varijable
  const currentTask = quizTasks[currentTaskIndex];
  const totalTasks = quizTasks.length;
  const isLastTask = currentTaskIndex === totalTasks - 1;

  // ako nema zadataka, prikaži poruku
  if (!currentTask) {
    return (
      <div className="rounded-3xl border-2 border-[var(--klokmat-red)]/20 bg-white/80 p-8 text-center">
        <h2 className="text-xl font-semibold text-[var(--klokmat-text)]">
          Nema zadataka
        </h2>
      </div>
    );
  }

  // provjera je li odgovor točan
  const checkAnswer = () => {
    if (picked === null) return;
    if (picked === currentTask.correctIndex) {
      setCorrectCount((c) => c + 1);
      setPoints((p) => p + currentTask.points);
    }

    setChecked(true);
  };

  // prelazak na sljedeće pitanje
  const next = () => {
    setPicked(null);
    setChecked(false);
    setCurrentTaskIndex((i) => i + 1);
  };

  // kraj kviza
  const finishQuiz = () => {
    router.push(
      `/quiz-by-difficulty/results?points=${points}&correct=${correctCount}&total=${totalTasks}&grade=${grade}&difficulty=${difficulty}`
    );
  };

  return (
    <div className="w-full max-w-3xl rounded-3xl border-2 border-[var(--klokmat-red)]/20 bg-white/80 backdrop-blur p-8 shadow-[0_20px_60px_-20px_rgba(199,74,60,0.3)]">
      <div className="flex items-center justify-between mb-6">
        <div className="text-base text-slate-700">
          <span className="font-semibold text-[var(--klokmat-text)]">
            Razred: {grade}
          </span>
          {" • "}
          <span className="font-semibold text-[var(--klokmat-text)]">
            Težina: {difficulty} boda
          </span>
        </div>

        <button
          onClick={() => router.push("/")}
          className="rounded-xl bg-[var(--klokmat-yellow)] px-4 py-2 text-sm font-semibold text-[var(--klokmat-text)] hover:bg-[var(--klokmat-yellow-dark)] transition"
        >
          Prekini
        </button>
      </div>

      <div className="flex items-center justify-between text-base text-slate-700 mb-6">
        <span>
          Zadatak{" "}
          <b className="text-[var(--klokmat-text)]">
            {currentTaskIndex + 1}
          </b>{" "}
          / {totalTasks}
        </span>
        <span>
          Bodovi:{" "}
          <b className="text-[var(--klokmat-red)]">
            {currentTask.points}
          </b>
        </span>
      </div>

      {currentTask.image && (
        <div className="mb-6 overflow-hidden rounded-2xl border-2 border-[var(--klokmat-yellow)]/30 bg-white">
          <img
            src={currentTask.image}
            alt="Zadatak"
            className="w-full h-auto"
          />
        </div>
      )}

      <div className="space-y-3 mb-6">
        {currentTask.options.map((label, idx) => {
          const isPicked = picked === idx;
          const isCorrect = checked && idx === currentTask.correctIndex;
          const isWrong =
            checked && isPicked && idx !== currentTask.correctIndex;

          return (
            <button
              key={idx}
              onClick={() => !checked && setPicked(idx)}
              className={[
                "w-full rounded-2xl border-2 p-4 text-left text-lg transition active:scale-[0.99]",
                isPicked && !checked
                  ? "border-[var(--klokmat-red)] bg-[var(--klokmat-yellow)]/10"
                  : "border-[var(--klokmat-yellow)]/40 bg-white/90",
                !checked && "hover:border-[var(--klokmat-red)]/50",
                isCorrect && "bg-green-50 border-green-400",
                isWrong && "bg-red-50 border-red-400",
                checked && "cursor-default",
              ].join(" ")}
            >
              <span className="font-semibold text-[var(--klokmat-text)]">
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {!checked && (
        <button
          onClick={checkAnswer}
          disabled={picked === null}
          className="w-full rounded-2xl bg-[var(--klokmat-red)] p-4 text-lg font-semibold text-white hover:bg-[var(--klokmat-red-dark)] disabled:opacity-50 transition"
        >
          Provjeri
        </button>
      )}

      {checked &&
        picked !== currentTask.correctIndex &&
        currentTask.explanationImage && (
          <div className="mt-6 rounded-2xl border-2 border-[var(--klokmat-yellow)] bg-white p-5">
            <p className="mb-3 text-lg font-semibold text-[var(--klokmat-text)]">
              ❌ Netočno – pogledaj rješenje
            </p>

            <img
              src={currentTask.explanationImage}
              alt="Rješenje zadatka"
              className="w-full h-auto rounded-xl"
            />
          </div>
        )}

      {checked && (
        <button
          onClick={isLastTask ? finishQuiz : next}
          className="mt-6 w-full rounded-2xl border-2 border-[var(--klokmat-yellow)]/50 bg-white p-4 text-lg font-semibold text-[var(--klokmat-text)] hover:bg-[var(--klokmat-yellow)]/10 transition"
        >
          {isLastTask ? "Završi" : "Sljedeći zadatak →"}
        </button>
      )}
    </div>
  );
}
