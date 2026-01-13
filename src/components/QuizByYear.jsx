"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TASKS } from "@/data/tasks";

export default function QuizByYear({ grade = "2", year = "2024" }) {
  const router = useRouter();

  // Broj zadataka i vrijeme ovisno o razredu
  const quizConfig = useMemo(() => {
    if (grade === "2" || grade === "3") {
      return {
        taskCount: { 3: 4, 4: 4, 5: 4 }, // 12 zadataka
        duration: 60 * 60, // 60 minuta u sekundama
      };
    }
    return {
      taskCount: { 3: 8, 4: 8, 5: 8 }, // 24 zadatka
      duration: 75 * 60, // 75 minuta
    };
  }, [grade]);

  // Odabir zadataka
  const quizTasks = useMemo(() => {
    const byGrade = TASKS.filter((t) => t.grade === String(grade));
    
    const t3 = byGrade.filter((t) => t.points === 3).slice(0, quizConfig.taskCount[3]);
    const t4 = byGrade.filter((t) => t.points === 4).slice(0, quizConfig.taskCount[4]);
    const t5 = byGrade.filter((t) => t.points === 5).slice(0, quizConfig.taskCount[5]);

    return [...t3, ...t4, ...t5];
  }, [grade, quizConfig]);

  // State
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // {taskIndex: selectedOption}
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quizConfig.duration);
  const [isFinished, setIsFinished] = useState(false);

  const currentTask = quizTasks[currentTaskIndex];
  const totalTasks = quizTasks.length;

  // Timer
  useEffect(() => {
    if (isFinished) return;

    if (timeLeft <= 0) {
      handleFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);

  // Format vrijeme MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Navigacija
  const goToNext = () => {
    if (currentTaskIndex < totalTasks - 1) {
      setCurrentTaskIndex((prev) => prev + 1);
      setShowExplanation(false);
    }
  };

  const goToPrevious = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex((prev) => prev - 1);
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
    quizTasks.forEach((task, index) => {
      if (userAnswers[index] === task.correctIndex) {
        points += task.points;
      }
    });
    return points;
  };

  const maxScore = useMemo(
    () => quizTasks.reduce((sum, t) => sum + t.points, 0),
    [quizTasks]
  );

  // Završi ispit
  const handleFinish = () => {
    setIsFinished(true);
    const totalPoints = calculateTotalPoints();
    router.push(`/quiz-by-year/results?points=${totalPoints}&max=${maxScore}&grade=${grade}&year=${year}`);
  };

  // Provjeri ima li zadataka
  if (quizTasks.length === 0) {
    return (
      <div className="rounded-3xl border-2 border-[var(--klokmat-red)]/20 bg-white/80 p-8 text-center">
        <h2 className="text-xl font-semibold text-[var(--klokmat-text)]">
          Nema zadataka
        </h2>
        <p className="mt-2 text-base text-slate-700">
          Za razred {grade} i godinu {year} još nisu dodani zadaci.
        </p>
        <button
          onClick={() => router.push("/quiz-by-year")}
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
      {/* Header s timerom */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-base text-slate-700">
          <span className="font-semibold text-[var(--klokmat-text)]">
            Razred: {grade}
          </span>
          {" • "}
          <span className="font-semibold text-[var(--klokmat-text)]">
            Godina: {year}
          </span>
        </div>
        
        <div className={`text-xl font-bold ${timeLeft < 300 ? 'text-[var(--klokmat-red)]' : 'text-[var(--klokmat-text)]'}`}>
          ⏱️ {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress info */}
      <div className="flex items-center justify-between text-base text-slate-700 mb-6">
        <span>
          Zadatak <b className="text-[var(--klokmat-text)]">{currentTaskIndex + 1}</b> / {totalTasks}
        </span>
        <span>
          Bodovi: <b className="text-[var(--klokmat-red)]">{currentTask.points}</b>
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
          const isWrongSelected = showExplanation && isSelected && idx !== currentTask.correctIndex;

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
    
    {/* NOVO - slika objašnjenja */}
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

      {/* Navigacijski gumbi */}
      <div className="flex gap-3">
        <button
          onClick={goToPrevious}
          disabled={currentTaskIndex === 0}
          className="flex-1 rounded-2xl border-2 border-[var(--klokmat-yellow)]/50 bg-white p-3 text-base font-semibold text-[var(--klokmat-text)] hover:bg-[var(--klokmat-yellow)]/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          ← Prethodni
        </button>

        {currentTaskIndex === totalTasks - 1 ? (
          <button
            onClick={handleFinish}
            className="flex-1 rounded-2xl bg-[var(--klokmat-red)] p-3 text-base font-semibold text-white hover:bg-[var(--klokmat-red-dark)] transition"
          >
            Završi ispit
          </button>
        ) : (
          <button
            onClick={goToNext}
            className="flex-1 rounded-2xl border-2 border-[var(--klokmat-yellow)]/50 bg-white p-3 text-base font-semibold text-[var(--klokmat-text)] hover:bg-[var(--klokmat-yellow)]/10 transition"
          >
            Sljedeći →
          </button>
        )}
      </div>

      {/* Trenutni bodovi */}
      <p className="mt-6 text-center text-base text-slate-600">
        Trenutni bodovi:{" "}
        <b className="text-[var(--klokmat-red)]">{calculateTotalPoints()}</b> / {maxScore}
      </p>
    </div>
  );
}