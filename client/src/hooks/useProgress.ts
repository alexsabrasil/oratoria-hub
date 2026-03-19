import { useEffect, useMemo, useState } from "react";

type ProgressState = {
  structure: number;
  storytelling: number;
  emotion: number;
  persuasion: number;
};

const STORAGE_KEYS = {
  progress: "oratoria.progress",
  completedExercises: "oratoria.completedExercises",
};

const INITIAL_PROGRESS: ProgressState = {
  structure: 0,
  storytelling: 0,
  emotion: 0,
  persuasion: 0,
};

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() =>
    loadFromStorage(STORAGE_KEYS.progress, INITIAL_PROGRESS)
  );

  const [completedExercises, setCompletedExercises] = useState<string[]>(() =>
    loadFromStorage(STORAGE_KEYS.completedExercises, [])
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.completedExercises, JSON.stringify(completedExercises));
  }, [completedExercises]);

  function completeExercise(exerciseId: string) {
    if (completedExercises.includes(exerciseId)) return;

    const updatedCompleted = [...completedExercises, exerciseId];
    setCompletedExercises(updatedCompleted);

    setProgress((prev) => {
      const next = { ...prev };

      if (exerciseId === "box-breathing" || exerciseId === "emotion-regulation") {
        next.emotion = Math.min(100, prev.emotion + 50);
      }

      if (exerciseId === "structure-outline") {
        next.structure = Math.min(100, prev.structure + 100);
      }

      if (exerciseId === "story-model") {
        next.storytelling = Math.min(100, prev.storytelling + 100);
      }

      if (exerciseId === "assertive-communication") {
        next.persuasion = Math.min(100, prev.persuasion + 100);
      }

      return next;
    });
  }

  function resetProgress() {
    setProgress(INITIAL_PROGRESS);
    setCompletedExercises([]);

    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.progress);
      localStorage.removeItem(STORAGE_KEYS.completedExercises);
    }
  }

  const getTotalProgress = useMemo(() => {
    return () => {
      const values = Object.values(progress);
      const total = values.reduce((acc, value) => acc + value, 0);
      return Math.round(total / values.length);
    };
  }, [progress]);

  return {
    progress,
    completedExercises,
    completeExercise,
    getTotalProgress,
    resetProgress,
  };
}
