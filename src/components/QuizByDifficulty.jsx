"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TASKS } from "@/data/tasks";

// Shuffle funkcija
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizByDifficulty({ grade = "2", difficulty = "3" }) {
  const router = useRouter();

  // Odabir zadataka - random shuffle
  const quizTasks = useMemo(() => {
    const filtered = TASKS.filter(
      (t) => t.grade === String(grade) && t.points === parseInt(difficulty)
    );
    return shuffle(filtered);
  }, [grade, difficulty]);

  // State
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // {taskIndex: selectedOption}
  const [showExplanation, setShowExplanation] = useState(false);

  const currentTask = quizTasks[currentTaskIndex];
  const totalTasks = quizTasks.length;
  const isLastTask = currentTaskIndex === totalTasks - 1;

  // Navigacija
  const goToNext = () => {
    if (currentTaskIndex < totalTasks - 1) {
      setCurrentTaskIndex((prev) => prev + 1);
      setShowExplanation(false);
    }
  };

  // Odabir odgovora
  const selectAnswer = (optionIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentTaskIndex]: optionIndex,
    }));
  };

  // Izračun bodova
  const calculateTotalPoints = () => {
    let points = 0;
    let correct = 0;
    quizTasks.forEach((task, index) => {
      if (userAnswers[index] === task.correctIndex) {
        points += task.points;
        correct++;
      }
    });
    return { points, correct };
  };

  const answeredCount = Object.keys(userAnswers).length;

  // Završi vježbu
  const handleFinish = () => {
    const { points, correct } = calculateTotalPoints();
    router.push(
      `/quiz-by-difficulty/results?points=${points}&correct=${correct}&total=${answeredCount}&grade=${grade}&difficulty=${difficulty}`
    );
  };

  // Provjeri ima li zadataka
  if (quizTasks.length === 0) {
    return (
      <div className="rounded-3xl border-2 border-[var(--klokmat-red)]/20 bg-white/80 p-8 text-center">
        <h2 className="text-xl font-semibold text-[var(--klokmat-text)]">
          Nema zadataka
        </h2>
        <p className="mt-2 text-base text-slate-700">
          Za razred {grade} i težinu {difficulty} bodova još nisu dodani zadaci.
        </p>
        <button
          onClick={() => router.push("/quiz-by-difficulty")}
          className="mt-6 rounded-2xl bg-[var(--klokmat-red)] px-6 py-3 text-white hover:bg-[var(--klokmat-red-dark)]"
        >
          Natrag
        </button>
      </div>
    );
  }

  const selectedAnswer = userAnswers[currentTaskIndex];
  const isAnswered = selectedAnswer !== undefined;

  return (
    <div className="w-full max-w-3xl rounded-3xl border-2 border-[var(--klokmat-red)]/20 bg-white/80 backdrop-blur p-8 shadow-[0_20px_60px_-20px_rgba(199,74,60,0.3)]">
      {/* Header */}
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
          onClick={handleFinish}
          className="rounded-xl bg-[var(--klokmat-yellow)] px-4 py-2 text-sm font-semibold text-[var(--klokmat-text)] hover:bg-[var(--klokmat-yellow-dark)] transition"
        >
          Završi vježbu
        </button>
      </div>

      {/* Progress info */}
      <div className="flex items-center justify-between text-base text-slate-700 mb-6">
        <span>
          Zadatak <b className="text-[var(--klokmat-text)]">{currentTaskIndex + 1}</b> / {totalTasks}
        </span>
        <span>
          Riješeno:{" "}
          <b className="text-[var(--klokmat-red)]">{answeredCount}</b> / {totalTasks}
        </span>
      </div>

      {/* Slika zadatka */}
      {currentTask.image && (
        <div className="mb-6 overflow-hidden rounded-2xl border-2 border-[var(--klokmat-yellow)]/30 bg-white">
          <img
            src={currentTask.image}
            alt={`Zadatak ${currentTaskIndex + 1}`}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Odgovori */}
      <div className="space-y-3 mb-6">
        {currentTask.options.map((_, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrect = showExplanation && idx === currentTask.correctIndex;
          const isWrongSelected =
            showExplanation && isSelected && idx !== currentTask.correctIndex;

          return (
            <button
              key={idx}
              onClick={() => !showExplanation && selectAnswer(idx)}
              className={[
                "w-full rounded-2xl border-2 p-4 text-left text-lg transition active:scale-[0.99]",
                isSelected && !showExplanation
                  ? "border-[var(--klokmat-red)] bg-[var(--klokmat-yellow)]/10"
                  : "border-[var(--klokmat-yellow)]/40 bg-white/90",
                !showExplanation && "hover:border-[var(--klokmat-red)]/50",
                isCorrect && "bg-green-50 border-green-400",
                isWrongSelected && "bg-red-50 border-red-400",
                showExplanation && "cursor-default",
              ].join(" ")}
              disabled={showExplanation}
            >
              <span className="font-semibold text-[var(--klokmat-text)]">
                {String.fromCharCode(65 + idx)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Gumb za objašnjenje */}
      {isAnswered && !showExplanation && (
        <button
          onClick={() => setShowExplanation(true)}
          className="w-full mb-4 rounded-2xl border-2 border-[var(--klokmat-yellow)] bg-[var(--klokmat-yellow)]/20 p-3 text-base font-semibold text-[var(--klokmat-text)] hover:bg-[var(--klokmat-yellow)]/30 transition"
        >
          Prikaži objašnjenje
        </button>
      )}

      {/* Objašnjenje */}
      {showExplanation && (
        <div className="mb-6 rounded-2xl border-2 border-[var(--klokmat-yellow)] bg-white p-5">
          <p className="font-semibold text-lg text-[var(--klokmat-text)]">
            {selectedAnswer === currentTask.correctIndex ? "✅ Točno!" : "❌ Netočno"}
          </p>
          <p className="mt-2 text-base text-slate-700">
            Točan odgovor:{" "}
            <b className="text-[var(--klokmat-red)]">
              {String.fromCharCode(65 + currentTask.correctIndex)}
            </b>
          </p>

          {/* Slika objašnjenja */}
          {currentTask.explanationImage && (
            <div className="mt-4 overflow-hidden rounded-xl border border-[var(--klokmat-yellow)]/30">
              <img
                src={currentTask.explanationImage}
                alt="Objašnjenje zadatka"
                className="w-full h-auto"
              />
            </div>
          )}

          {currentTask.explanation && (
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              {currentTask.explanation}
            </p>
          )}
        </div>
      )}

      {/* Gumb sljedeći */}
      {!isLastTask && (
        <button
          onClick={goToNext}
          className="w-full rounded-2xl bg-[var(--klokmat-red)] p-4 text-lg font-semibold text-white hover:bg-[var(--klokmat-red-dark)] transition"
        >
          Sljedeći zadatak →
        </button>
      )}

      {/* Ako je zadnji zadatak */}
      {isLastTask && (
        <button
          onClick={handleFinish}
          className="w-full rounded-2xl bg-[var(--klokmat-red)] p-4 text-lg font-semibold text-white hover:bg-[var(--klokmat-red-dark)] transition"
        >
          Završi i pogledaj rezultat
        </button>
      )}

      {/* Trenutni bodovi */}
      <p className="mt-6 text-center text-base text-slate-600">
        Trenutni bodovi:{" "}
        <b className="text-[var(--klokmat-red)]">{calculateTotalPoints().points}</b>
      </p>
    </div>
  );
}