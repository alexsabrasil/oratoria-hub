import { useState, useEffect } from 'react';

interface ProgressState {
  structure: number;
  storytelling: number;
  emotion: number;
  persuasion: number;
}

interface ExerciseData {
  completedExercises: string[];
  lastUpdated: string;
}

const STORAGE_KEY = 'oratoria_progress';

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>({
    structure: 0,
    storytelling: 0,
    emotion: 0,
    persuasion: 0,
  });

  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  // Carregar progresso do localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data: ExerciseData = JSON.parse(saved);
        setCompletedExercises(data.completedExercises);
        
        // Calcular progresso baseado em exercícios completados
        const exerciseProgress = calculateProgress(data.completedExercises);
        setProgress(exerciseProgress);
      } catch (error) {
        console.error('Erro ao carregar progresso:', error);
      }
    }
  }, []);

  // Salvar progresso no localStorage
  const saveProgress = (exercises: string[]) => {
    const data: ExerciseData = {
      completedExercises: exercises,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  // Calcular progresso baseado em exercícios completados
  const calculateProgress = (exercises: string[]): ProgressState => {
    const exerciseMap: Record<string, keyof ProgressState> = {
      'box-breathing': 'emotion',
      'structure-outline': 'structure',
      'story-model': 'storytelling',
      'persuasion-triggers': 'persuasion',
    };

    const newProgress: ProgressState = {
      structure: 0,
      storytelling: 0,
      emotion: 0,
      persuasion: 0,
    };

    exercises.forEach((exercise) => {
      const pillar = exerciseMap[exercise];
      if (pillar) {
        newProgress[pillar] = Math.min(100, newProgress[pillar] + 25);
      }
    });

    return newProgress;
  };

  const completeExercise = (exerciseId: string) => {
    if (!completedExercises.includes(exerciseId)) {
      const updated = [...completedExercises, exerciseId];
      setCompletedExercises(updated);
      
      const newProgress = calculateProgress(updated);
      setProgress(newProgress);
      
      saveProgress(updated);
    }
  };

  const resetProgress = () => {
    setProgress({
      structure: 0,
      storytelling: 0,
      emotion: 0,
      persuasion: 0,
    });
    setCompletedExercises([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getTotalProgress = () => {
    const total = Object.values(progress).reduce((a, b) => a + b, 0);
    return Math.round(total / 4);
  };

  return {
    progress,
    completedExercises,
    completeExercise,
    resetProgress,
    getTotalProgress,
  };
}
