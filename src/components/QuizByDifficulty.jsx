"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TASKS } from "@/data/tasks";

export default function QuizByDifficulty({ grade = "2", difficulty = "3" }) {
   console.log("Grade:", grade, "Difficulty:", difficulty);
  const router = useRouter();

  // Filtriraj zadatke po razredu i težini
  const quizTasks = useMemo(() => {
    return TASKS.filter(
      (t) => t.grade === String(grade) && t.points === Number(difficulty)
    );
  }, [grade, difficulty]);

  const maxScore = useMemo(
    () => quizTasks.reduce((sum, t) => sum + t.points, 0),
    [quizTasks]
  );

  const [i, setI] = useState(0);
  const [seeResult, setSeeResult] = useState(false);
  const [picked, setPicked] = useState(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  const task = quizTasks[i];

  function checkAnswer() {
    if (picked === null) return;
    if (!checked) {
      if (picked === task.correctIndex) setScore((s) => s + task.points);
      setChecked(true);
    }
  }

  function next() {
    setPicked(null);
    setChecked(false);

    if (i + 1 >= quizTasks.length) {
      setSeeResult(true);
    } else {
      setI((x) => x + 1);
    }
  }

  function restart() {
    setI(0);
    setScore(0);
    setPicked(null);
    setChecked(false);
    setSeeResult(false);
  }

  // Ako nema zadataka za taj razred/težinu
  if (quizTasks.length === 0) {
    return (
      <div className="w-full max-w-xl rounded-3xl border bg-white/70 backdrop-blur p-8 text-center">
        <h2 className="text-xl font-semibold text-slate-900">Nema zadataka</h2>
        <p className="mt-2 text-sm text-slate-600">
          Za razred {grade} i {difficulty} bodova još nisu dodani zadaci.
        </p>
        <button
          onClick={() => router.push("/quiz-by-difficulty")}
          className="mt-6 w-full rounded-2xl border p-3 font-medium hover:bg-slate-50"
        >
          Natrag na odabir
        </button>
      </div>
    );
  }

  // Prikaz rezultata
  if (seeResult) {
    return (
      <div className="w-full max-w-xl rounded-3xl border bg-white/70 backdrop-blur p-8 shadow-sm text-center">
        <h2 className="text-2xl font-semibold text-slate-900">Rezultat</h2>
        <p className="mt-3 text-slate-700">
          Osvojili ste <b>{score}</b> / {maxScore} bodova
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Riješili ste {quizTasks.length} zadataka po {difficulty} boda
        </p>

        <button
          onClick={restart}
          className="mt-6 w-full rounded-2xl bg-slate-900 p-3 font-medium text-white hover:bg-slate-800"
        >
          Ponovi
        </button>

        <button
          onClick={() => router.push("/quiz-by-difficulty")}
          className="mt-3 w-full rounded-2xl border p-3 font-medium hover:bg-slate-50"
        >
          Promijeni postavke
        </button>
      </div>
    );
  }

  // Glavni quiz
  return (
    <div className="w-full max-w-xl rounded-3xl border border-black/5 bg-white/70 backdrop-blur p-8 shadow-sm">
      {/* Header info */}
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>
          Razred: <b className="text-slate-900">{grade}</b>
        </span>
        <span>
          Pitanje <b className="text-slate-900">{i + 1}</b> / {quizTasks.length}
        </span>
      </div>

      <div className="mt-2 text-xs text-slate-500">
        Težina: <b className="text-slate-900">{difficulty} bodova</b>
      </div>

      {/* Slika zadatka */}
      {task.image && (
        <div className="mt-6 overflow-hidden rounded-2xl border bg-white">
          <img src={task.image} alt="Zadatak" className="w-full h-auto" />
        </div>
      )}

      {/* Odgovori (A-E) */}
      <div className="mt-6 space-y-3">
        {task.options.map((_, idx) => {
          const isPicked = picked === idx;
          const isCorrect = checked && idx === task.correctIndex;
          const isWrongPicked = checked && isPicked && idx !== task.correctIndex;

          return (
            <button
              key={idx}
              onClick={() => !checked && setPicked(idx)}
              className={[
                "w-full rounded-2xl border p-3 text-left transition",
                isPicked ? "border-slate-400" : "border-slate-200",
                checked ? "cursor-default" : "hover:bg-slate-50",
                isCorrect ? "bg-green-50 border-green-200" : "",
                isWrongPicked ? "bg-red-50 border-red-200" : "",
              ].join(" ")}
            >
              <span className="font-semibold">{String.fromCharCode(65 + idx)}</span>
            </button>
          );
        })}
      </div>

      {/* Gumb Provjeri */}
      {!checked ? (
        <button
          onClick={checkAnswer}
          className="mt-6 w-full rounded-2xl bg-slate-900 p-3 font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          disabled={picked === null}
        >
          Provjeri
        </button>
      ) : (
        <div className="mt-6 rounded-2xl border bg-white p-4">
          <p className="font-medium">
            {picked === task.correctIndex ? "✅ Točno!" : "❌ Netočno."}
          </p>
          <p className="mt-2 text-sm text-slate-700">
            Točan odgovor:{" "}
            <b>{String.fromCharCode(65 + task.correctIndex)}</b>
          </p>

          {task.explanation && (
            <p className="mt-2 text-sm text-slate-600">{task.explanation}</p>
          )}

          <button
            onClick={next}
            className="mt-4 w-full rounded-2xl border p-3 font-medium hover:bg-slate-50"
          >
            {i + 1 === quizTasks.length ? "Završi" : "Sljedeće"}
          </button>
        </div>
      )}

      {/* Trenutni bodovi */}
      <p className="mt-4 text-center text-xs text-slate-500">
        Trenutni bodovi: <b className="text-slate-900">{score}</b>
      </p>
    </div>
  );
}