"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TASKS } from "@/data/tasks";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Quiz({ grade = "2" }) {
  const router = useRouter();

  // seed koristimo da "natjeramo" useMemo da opet izabere random set
  const [seed, setSeed] = useState(0);

  const quizTasks = useMemo(() => {
    const byGrade = TASKS.filter((t) => t.grade === String(grade));
    const pick = (arr, n) => shuffle(arr).slice(0, n);

    const t3 = pick(byGrade.filter((t) => t.points === 3), 4);
    const t4 = pick(byGrade.filter((t) => t.points === 4), 4);
    const t5 = pick(byGrade.filter((t) => t.points === 5), 4);

    // prvo 3b pa 4b pa 5b
    return [...t3, ...t4, ...t5];
  }, [grade, seed]);

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
    // reset stanja kviza
    setI(0);
    setScore(0);
    setPicked(null);
    setChecked(false);
    setSeeResult(false);

    // generiraj novi random set za isti grade
    setSeed((s) => s + 1);
  }

  if (quizTasks.length === 0) {
    return (
      <div className="rounded-3xl border bg-white/70 p-8 text-center">
        <h2 className="text-xl font-semibold">Nema zadataka</h2>
        <p className="mt-2 text-sm text-slate-600">
          Za razred {grade} još nisu dodani zadaci.
        </p>
      </div>
    );
  }

  if (seeResult) {
    return (
      <div className="w-full max-w-xl rounded-3xl border bg-white/70 backdrop-blur p-8 shadow-sm text-center">
        <h2 className="text-2xl font-semibold text-slate-900">Rezultat</h2>
        <p className="mt-3 text-slate-700">
          Osvojili ste <b>{score}</b> / {maxScore} bodova
        </p>

        <button
          onClick={restart}
          className="mt-6 w-full rounded-2xl bg-slate-900 p-3 font-medium text-white hover:bg-slate-800"
        >
          Ponovi kviz
        </button>

        <button
          onClick={() => router.push("/")}
          className="mt-3 w-full rounded-2xl border p-3 font-medium hover:bg-slate-50"
        >
          Promijeni razred
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl rounded-3xl border border-black/5 bg-white/70 backdrop-blur p-8 shadow-sm">
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>
          Razred: <b className="text-slate-900">{grade}</b>
        </span>
        <span>
          Pitanje <b className="text-slate-900">{i + 1}</b> / {quizTasks.length}
        </span>
      </div>

      <div className="mt-2 text-xs text-slate-500">
        Vrijednost: <b className="text-slate-900">{task.points}</b> bodova
      </div>

      {task.image && (
        <div className="mt-6 overflow-hidden rounded-2xl border bg-white">
          <img src={task.image} alt="Zadatak" className="w-full h-auto" />
        </div>
      )}

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

      <p className="mt-4 text-center text-xs text-slate-500">
        Trenutni bodovi: <b className="text-slate-900">{score}</b>
      </p>
    </div>
  );
}
