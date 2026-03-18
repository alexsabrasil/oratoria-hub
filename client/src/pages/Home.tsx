import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, BookOpen, Heart, Zap, Brain, BarChart3 } from "lucide-react";
import { IntroSection } from "@/components/IntroSection";
import { useProgress } from "@/hooks/useProgress";
import { useMemo, useState, useEffect } from "react";

type BreathingPhase = "ready" | "inhale" | "hold1" | "exhale" | "hold2" | "done";

export default function Home() {
  const STORAGE_KEYS = {
    presentationForm: "oratoria.presentationForm",
    generatedPresentation: "oratoria.generatedPresentation",
    storyForm: "oratoria.storyForm",
    generatedStory: "oratoria.generatedStory",
    assertiveForm: "oratoria.assertiveForm",
    assertiveFeedback: "oratoria.assertiveFeedback",
    emotionForm: "oratoria.emotionForm",
    emotionPlan: "oratoria.emotionPlan",
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

  const { progress, completedExercises, completeExercise, getTotalProgress } = useProgress();

  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<BreathingPhase>("ready");
  const [breathingCycles, setBreathingCycles] = useState(0);
  const [breathingSecondsLeft, setBreathingSecondsLeft] = useState(120);

  const [presentationForm, setPresentationForm] = useState(() =>
    loadFromStorage(STORAGE_KEYS.presentationForm, {
      opening: "",
      problem: "",
      solution: "",
      result: "",
      closing: "",
    })
  );

  const [generatedPresentation, setGeneratedPresentation] = useState(() =>
    loadFromStorage(STORAGE_KEYS.generatedPresentation, "")
  );

  const [storyForm, setStoryForm] = useState(() =>
    loadFromStorage(STORAGE_KEYS.storyForm, {
      context: "",
      challenge: "",
      action: "",
      result: "",
      learning: "",
    })
  );

  const [generatedStory, setGeneratedStory] = useState(() =>
    loadFromStorage(STORAGE_KEYS.generatedStory, "")
  );

  const [assertiveForm, setAssertiveForm] = useState(() =>
    loadFromStorage(STORAGE_KEYS.assertiveForm, {
      original: "",
      assertive: "",
    })
  );

  const [assertiveFeedback, setAssertiveFeedback] = useState(() =>
    loadFromStorage(STORAGE_KEYS.assertiveFeedback, "")
  );

  const [emotionForm, setEmotionForm] = useState(() =>
    loadFromStorage(STORAGE_KEYS.emotionForm, {
      anxietyLevel: 3,
      bodySignal: "",
      calmingThought: "",
      preparationAction: "",
    })
  );

  const [emotionPlan, setEmotionPlan] = useState(() =>
    loadFromStorage(STORAGE_KEYS.emotionPlan, "")
  );

  const pillars = [
    {
      id: "structure",
      title: "Organização do Pensamento",
      description: "Estruture suas ideias de forma lógica e sequencial para comunicar com clareza e segurança.",
      icon: BookOpen,
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663103823333/b9s7hhcEoUwKsbM7Awfbqe/pillar-structure-women-UNJZR9LWLygxb9LsVpQzFS.webp",
      progress: progress.structure,
    },
    {
      id: "storytelling",
      title: "Narrativa e Conexão",
      description: "Transforme informações em histórias que conectam emocionalmente com seu público.",
      icon: Heart,
      image: "https://i.ibb.co/4nFQmxKy/Gemini-Generated.png",
      progress: progress.storytelling,
    },
    {
      id: "emotion",
      title: "Regulação Emocional",
      description: "Controle a ansiedade e transforme-a em foco através de técnicas de autorregulação.",
      icon: Brain,
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663103823333/b9s7hhcEoUwKsbM7Awfbqe/pillar-emotion-women-7BGdF6xbqwmygnch2uz4JA.webp",
      progress: progress.emotion,
    },
    {
      id: "persuasion",
      title: "Comunicação Assertiva",
      description: "Comunique com assertividade e guie seu público com clareza e autoridade.",
      icon: Zap,
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663103823333/b9s7hhcEoUwKsbM7Awfbqe/pillar-persuasion-women-EPUyooNPEL9Evg2TdtLpj3.webp",
      progress: progress.persuasion,
    },
  ];

  const exercises = [
    {
      id: "box-breathing",
      title: "Box Breathing - Respiração 4-4-4-4",
      description: "Técnica de autorregulação para acalmar o sistema nervoso antes de situações de pressão.",
      duration: "2 minutos",
      difficulty: "Iniciante",
    },
    {
      id: "structure-outline",
      title: "Estruturar uma Apresentação",
      description: "Monte uma fala clara com abertura, problema, solução, resultado e encerramento.",
      duration: "10 minutos",
      difficulty: "Intermediário",
    },
    {
      id: "story-model",
      title: "Modelo de Narrativa",
      description: "Transforme informações em uma narrativa com contexto, desafio, ação e aprendizado.",
      duration: "12 minutos",
      difficulty: "Intermediário",
    },
    {
      id: "emotion-regulation",
      title: "Regulação Emocional",
      description: "Crie um plano rápido para reduzir ansiedade e entrar em estado de foco antes de apresentar.",
      duration: "8 minutos",
      difficulty: "Iniciante",
    },
    {
      id: "assertive-communication",
      title: "Comunicação Assertiva",
      description: "Reescreva falas inseguras para respostas mais firmes, claras e profissionais.",
      duration: "10 minutos",
      difficulty: "Avançado",
    },
  ];

  const breathingVisual = useMemo(() => {
    switch (breathingPhase) {
      case "inhale":
        return {
          scale: "scale-110",
          ring: "from-sky-400 to-blue-600",
          label: "Inspire",
          helper: "Puxe o ar lentamente pelo nariz",
        };
      case "hold1":
        return {
          scale: "scale-[1.22]",
          ring: "from-indigo-500 to-blue-700",
          label: "Segure",
          helper: "Mantenha o ar com calma",
        };
      case "exhale":
        return {
          scale: "scale-90",
          ring: "from-violet-500 to-fuchsia-600",
          label: "Expire",
          helper: "Solte o ar devagar pela boca",
        };
      case "hold2":
        return {
          scale: "scale-100",
          ring: "from-slate-500 to-slate-700",
          label: "Segure",
          helper: "Pause antes do próximo ciclo",
        };
      case "done":
        return {
          scale: "scale-100",
          ring: "from-emerald-500 to-green-600",
          label: "Concluído",
          helper: "Respiração finalizada com sucesso",
        };
      default:
        return {
          scale: "scale-100",
          ring: "from-blue-500 to-cyan-500",
          label: "Começar",
          helper: "Prepare-se para iniciar o exercício",
        };
    }
  }, [breathingPhase]);

  useEffect(() => {
    let timer: number | undefined;

    if (breathingActive && breathingSecondsLeft > 0) {
      timer = window.setTimeout(() => {
        setBreathingSecondsLeft((prev) => prev - 1);
      }, 1000);
    }

    if (breathingActive && breathingSecondsLeft === 0) {
      setBreathingActive(false);
      setBreathingPhase("done");
      completeExercise("box-breathing");
    }

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [breathingActive, breathingSecondsLeft, completeExercise]);

  useEffect(() => {
    if (!breathingActive) return;

    const phaseIndex = (120 - breathingSecondsLeft) % 16;

    if (phaseIndex >= 0 && phaseIndex <= 3) {
      setBreathingPhase("inhale");
    } else if (phaseIndex >= 4 && phaseIndex <= 7) {
      setBreathingPhase("hold1");
    } else if (phaseIndex >= 8 && phaseIndex <= 11) {
      setBreathingPhase("exhale");
    } else {
      setBreathingPhase("hold2");
    }

    const completed = Math.floor((120 - breathingSecondsLeft) / 16);
    setBreathingCycles(completed);
  }, [breathingActive, breathingSecondsLeft]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.presentationForm, JSON.stringify(presentationForm));
  }, [presentationForm]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.generatedPresentation, JSON.stringify(generatedPresentation));
  }, [generatedPresentation]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.storyForm, JSON.stringify(storyForm));
  }, [storyForm]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.generatedStory, JSON.stringify(generatedStory));
  }, [generatedStory]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.assertiveForm, JSON.stringify(assertiveForm));
  }, [assertiveForm]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.assertiveFeedback, JSON.stringify(assertiveFeedback));
  }, [assertiveFeedback]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.emotionForm, JSON.stringify(emotionForm));
  }, [emotionForm]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.emotionPlan, JSON.stringify(emotionPlan));
  }, [emotionPlan]);

  const startBoxBreathing = () => {
    setBreathingActive(true);
    setBreathingPhase("inhale");
    setBreathingCycles(0);
    setBreathingSecondsLeft(120);
  };

  const stopBoxBreathing = () => {
    setBreathingActive(false);
    setBreathingPhase("ready");
    setBreathingCycles(0);
    setBreathingSecondsLeft(120);
  };

  const formatBreathingTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const handleGeneratePresentation = () => {
    const text = `Abertura: ${presentationForm.opening}

Problema: ${presentationForm.problem}

Solução: ${presentationForm.solution}

Resultado: ${presentationForm.result}

Encerramento: ${presentationForm.closing}`;
    setGeneratedPresentation(text);
    completeExercise("structure-outline");
  };

  const handleGenerateStory = () => {
    const text = `Contexto: ${storyForm.context}

Desafio: ${storyForm.challenge}

Ação: ${storyForm.action}

Resultado: ${storyForm.result}

Aprendizado: ${storyForm.learning}`;
    setGeneratedStory(text);
    completeExercise("story-model");
  };

  const handleAssertiveRewrite = () => {
    const hasOriginal = assertiveForm.original.trim().length > 0;
    const hasAssertive = assertiveForm.assertive.trim().length > 0;

    if (!hasOriginal || !hasAssertive) return;

    const originalLower = assertiveForm.original.toLowerCase();
    const assertiveLower = assertiveForm.assertive.toLowerCase();

    let feedback = "Boa reformulação. Sua nova frase está mais objetiva e profissional.";

    if (
      originalLower.includes("acho") ||
      originalLower.includes("talvez") ||
      originalLower.includes("não sei") ||
      originalLower.includes("desculpa")
    ) {
      feedback =
        "Ótimo avanço. Você saiu de uma fala insegura para uma resposta mais firme. Evite expressões como 'acho', 'talvez' e 'desculpa' quando quiser transmitir segurança.";
    }

    if (
      assertiveLower.includes("com base") ||
      assertiveLower.includes("o objetivo") ||
      assertiveLower.includes("foi definido") ||
      assertiveLower.includes("como próxima etapa")
    ) {
      feedback =
        "Excelente. Sua resposta está com linguagem mais executiva e técnica, o que transmite clareza, domínio e segurança.";
    }

    setAssertiveFeedback(feedback);
    completeExercise("assertive-communication");
  };

  const handleGenerateEmotionPlan = () => {
    const text = `Meu nível de ansiedade hoje é ${emotionForm.anxietyLevel}/5.

Sinal corporal percebido: ${emotionForm.bodySignal}

Pensamento de regulação: ${emotionForm.calmingThought}

Ação prática antes da apresentação: ${emotionForm.preparationAction}

Plano rápido:
1. Reconhecer o sinal corporal sem julgamento.
2. Respirar de forma ritmada por 1 a 2 minutos.
3. Repetir o pensamento de foco.
4. Entrar na apresentação com ritmo mais calmo e objetivo.`;

    setEmotionPlan(text);
    completeExercise("emotion-regulation");
  };

  const handleClearExercises = () => {
    if (typeof window === "undefined") return;

    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));

    setPresentationForm({
      opening: "",
      problem: "",
      solution: "",
      result: "",
      closing: "",
    });
    setGeneratedPresentation("");

    setStoryForm({
      context: "",
      challenge: "",
      action: "",
      result: "",
      learning: "",
    });
    setGeneratedStory("");

    setAssertiveForm({
      original: "",
      assertive: "",
    });
    setAssertiveFeedback("");

    setEmotionForm({
      anxietyLevel: 3,
      bodySignal: "",
      calmingThought: "",
      preparationAction: "",
    });
    setEmotionPlan("");

    stopBoxBreathing();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-sm">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-blue-900">Comunicação & Aprendizagem</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#pilares" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
              Pilares
            </a>
            <a href="#exercicios" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
              Exercícios
            </a>
            <a href="#progresso" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
              Progresso
            </a>

            <Link href="/banca">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-sm">
                Banca
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <IntroSection />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                Método prático para comunicação com clareza e segurança
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight">
                Domine a Arte de Comunicar com Segurança
              </h2>

              <p className="text-lg text-slate-600 leading-relaxed">
                Supere a ansiedade, organize suas ideias e comunique-se com clareza, segurança e autoridade.
                Uma abordagem prática para transformar sua comunicação.
              </p>

              <div className="flex gap-4 flex-wrap">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg transition-all hover:shadow-lg">
                  Começar Agora
                </Button>

                <Button
                  variant="outline"
                  className="px-8 py-6 text-lg border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Saiba Mais
                </Button>
              </div>
            </div>

            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663103823333/b9s7hhcEoUwKsbM7Awfbqe/hero-neuro-gU3rUjGZN86Q6AQ4rzsgvQ.webp"
                alt="Profissional apresentando com confiança"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="pilares" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-blue-900">Os Quatro Pilares</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Uma abordagem estruturada para transformar sua comunicação
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card
                  key={pillar.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-200 rounded-2xl"
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-blue-900 mb-2">{pillar.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{pillar.description}</p>
                      </div>
                      <Icon className="w-6 h-6 text-amber-500 flex-shrink-0" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Progresso</span>
                        <span className="font-semibold text-blue-600">{pillar.progress}%</span>
                      </div>
                      <Progress value={pillar.progress} className="h-2 bg-slate-200" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="exercicios" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-blue-900">Exercícios Práticos</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Pratique, monte respostas e teste sua evolução em tempo real
            </p>
          </div>

          <div className="flex justify-end mb-6">
            <Button variant="outline" onClick={handleClearExercises}>
              Limpar meus exercícios
            </Button>
          </div>

          <Tabs defaultValue="box-breathing" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 bg-white border border-slate-200">
              {exercises.map((exercise) => (
                <TabsTrigger
                  key={exercise.id}
                  value={exercise.id}
                  className="text-xs md:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  {exercise.title.split(" - ")[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            {exercises.map((exercise) => (
              <TabsContent key={exercise.id} value={exercise.id} className="space-y-6">
                <Card className="p-8 border border-slate-200 shadow-lg rounded-2xl">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-blue-900 mb-2">{exercise.title}</h3>
                      <p className="text-slate-600 text-lg mb-4">{exercise.description}</p>

                      <div className="flex gap-4 flex-wrap">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <BarChart3 className="w-4 h-4" />
                          <span>{exercise.difficulty}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <span>⏱️ {exercise.duration}</span>
                        </div>
                      </div>
                    </div>

                    {exercise.id === "box-breathing" && (
                      <div className="space-y-6 py-8">
                        <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 p-8 md:p-12 shadow-inner">
                          <div className="grid md:grid-cols-[1fr_0.9fr] gap-10 items-center">
                            <div className="space-y-5">
                              <div className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-blue-700 border border-blue-100">
                                Experiência guiada de respiração
                              </div>

                              <h4 className="text-2xl font-bold text-slate-900">
                                Regule seu ritmo antes de falar
                              </h4>

                              <p className="text-slate-600 leading-relaxed">
                                Use a respiração 4-4-4-4 para diminuir ativação física, reduzir tensão
                                e entrar em estado de foco antes de uma apresentação, entrevista ou banca.
                              </p>

                              <div className="grid sm:grid-cols-3 gap-3">
                                <div className="rounded-2xl border bg-white p-4">
                                  <p className="text-xs text-slate-500 mb-1">Fase atual</p>
                                  <p className="font-semibold text-slate-900">{breathingVisual.label}</p>
                                </div>

                                <div className="rounded-2xl border bg-white p-4">
                                  <p className="text-xs text-slate-500 mb-1">Tempo restante</p>
                                  <p className="font-semibold text-slate-900">{formatBreathingTime(breathingSecondsLeft)}</p>
                                </div>

                                <div className="rounded-2xl border bg-white p-4">
                                  <p className="text-xs text-slate-500 mb-1">Ciclos</p>
                                  <p className="font-semibold text-slate-900">{breathingCycles}</p>
                                </div>
                              </div>

                              <Progress value={((120 - breathingSecondsLeft) / 120) * 100} className="h-2" />

                              <div className="flex gap-3 flex-wrap">
                                <Button
                                  onClick={startBoxBreathing}
                                  disabled={breathingActive}
                                  className="bg-amber-500 hover:bg-amber-600 text-white"
                                >
                                  {breathingActive ? "Exercício em andamento" : "Iniciar Box Breathing"}
                                </Button>

                                <Button variant="outline" onClick={stopBoxBreathing}>
                                  Reiniciar
                                </Button>
                              </div>
                            </div>

                            <div className="flex flex-col items-center justify-center gap-6">
                              <div className="relative w-72 h-72 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full bg-blue-100 blur-2xl opacity-70" />
                                <div
                                  className={`relative w-44 h-44 md:w-48 md:h-48 rounded-full bg-gradient-to-br ${breathingVisual.ring} ${breathingVisual.scale} transition-all duration-1000 ease-in-out shadow-2xl flex items-center justify-center`}
                                >
                                  <div className="absolute inset-2 rounded-full border border-white/20" />
                                  <div className="text-center text-white px-6">
                                    <p className="text-2xl font-bold">{breathingVisual.label}</p>
                                    <p className="text-sm opacity-90 mt-2">
                                      {breathingActive ? "4 segundos" : "pronto para começar"}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="text-center space-y-2 max-w-sm">
                                <p className="text-lg font-semibold text-slate-900">{breathingVisual.helper}</p>
                                <p className="text-sm text-slate-500">
                                  Siga o ritmo visual. Não force a respiração. Mantenha fluidez e calma.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200">
                          <p className="text-slate-700 leading-relaxed">
                            <strong>Como funciona:</strong> inspire por 4 segundos, segure por 4 segundos,
                            expire por 4 segundos e segure novamente por 4 segundos. Essa sequência ajuda
                            a desacelerar o corpo e reduzir sinais físicos de ansiedade.
                          </p>
                        </div>
                      </div>
                    )}

                    {exercise.id === "structure-outline" && (
                      <div className="space-y-6 py-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <textarea
                            className="w-full min-h-[110px] rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Abertura: como você vai iniciar sua fala?"
                            value={presentationForm.opening}
                            onChange={(e) =>
                              setPresentationForm((prev) => ({ ...prev, opening: e.target.value }))
                            }
                          />
                          <textarea
                            className="w-full min-h-[110px] rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Problema: qual cenário, risco ou desafio você vai apresentar?"
                            value={presentationForm.problem}
                            onChange={(e) =>
                              setPresentationForm((prev) => ({ ...prev, problem: e.target.value }))
                            }
                          />
                          <textarea
                            className="w-full min-h-[110px] rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Solução: o que foi feito no projeto?"
                            value={presentationForm.solution}
                            onChange={(e) =>
                              setPresentationForm((prev) => ({ ...prev, solution: e.target.value }))
                            }
                          />
                          <textarea
                            className="w-full min-h-[110px] rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Resultado: qual foi a entrega ou valor gerado?"
                            value={presentationForm.result}
                            onChange={(e) =>
                              setPresentationForm((prev) => ({ ...prev, result: e.target.value }))
                            }
                          />
                        </div>

                        <textarea
                          className="w-full min-h-[110px] rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Encerramento: como você quer fechar sua apresentação?"
                          value={presentationForm.closing}
                          onChange={(e) =>
                            setPresentationForm((prev) => ({ ...prev, closing: e.target.value }))
                          }
                        />

                        <div className="flex gap-3 flex-wrap">
                          <Button onClick={handleGeneratePresentation}>Gerar meu roteiro</Button>
                        </div>

                        {generatedPresentation && (
                          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
                            <p className="font-semibold text-slate-900">Roteiro estruturado</p>
                            <pre className="whitespace-pre-wrap text-sm text-slate-600 font-sans">
                              {generatedPresentation}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}

                    {exercise.id === "story-model" && (
                      <div className="space-y-6 py-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <textarea
                            className="w-full min-h-[110px] rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Contexto: qual era o cenário?"
                            value={storyForm.context}
                            onChange={(e) =>
                              setStoryForm((prev) => ({ ...prev, context: e.target.value }))
                            }
                          />
                          <textarea
                            className="w-full min-h-[110px] rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Desafio: qual era o problema ou dificuldade?"
                            value={storyForm.challenge}
                            onChange={(e) =>
                              setStoryForm((prev) => ({ ...prev, challenge: e.target.value }))
                            }
                          />
                          <textarea
                            className="w-full min-h-[110px] rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ação: o que você fez?"
                            value={storyForm.action}
                            onChange={(e) =>
                              setStoryForm((prev) => ({ ...prev, action: e.target.value }))
                            }
                          />
                          <textarea
                            className="w-full min-h-[110px] rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Resultado: o que aconteceu depois?"
                            value={storyForm.result}
                            onChange={(e) =>
                              setStoryForm((prev) => ({ ...prev, result: e.target.value }))
                            }
                          />
                        </div>

                        <textarea
                          className="w-full min-h-[110px] rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Aprendizado: o que esse processo te ensinou?"
                          value={storyForm.learning}
                          onChange={(e) =>
                            setStoryForm((prev) => ({ ...prev, learning: e.target.value }))
                          }
                        />

                        <Button onClick={handleGenerateStory}>Montar narrativa</Button>

                        {generatedStory && (
                          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
                            <p className="font-semibold text-slate-900">Narrativa montada</p>
                            <pre className="whitespace-pre-wrap text-sm text-slate-600 font-sans">
                              {generatedStory}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}

                    {exercise.id === "emotion-regulation" && (
                      <div className="space-y-6 py-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
                            <label className="text-sm font-medium text-slate-700">
                              Nível de ansiedade hoje: {emotionForm.anxietyLevel}/5
                            </label>
                            <input
                              type="range"
                              min={1}
                              max={5}
                              value={emotionForm.anxietyLevel}
                              onChange={(e) =>
                                setEmotionForm((prev) => ({
                                  ...prev,
                                  anxietyLevel: Number(e.target.value),
                                }))
                              }
                              className="w-full"
                            />
                          </div>

                          <textarea
                            className="w-full min-h-[120px] rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Qual sinal corporal você percebe quando fica ansiosa? Ex.: mãos frias, voz acelerada, coração disparado."
                            value={emotionForm.bodySignal}
                            onChange={(e) =>
                              setEmotionForm((prev) => ({ ...prev, bodySignal: e.target.value }))
                            }
                          />

                          <textarea
                            className="w-full min-h-[120px] rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Qual pensamento pode te ajudar a retomar o foco? Ex.: eu posso responder com calma, não preciso correr."
                            value={emotionForm.calmingThought}
                            onChange={(e) =>
                              setEmotionForm((prev) => ({ ...prev, calmingThought: e.target.value }))
                            }
                          />

                          <textarea
                            className="w-full min-h-[120px] rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Qual ação prática você vai fazer antes da apresentação? Ex.: respirar por 2 minutos, falar mais devagar, revisar abertura."
                            value={emotionForm.preparationAction}
                            onChange={(e) =>
                              setEmotionForm((prev) => ({ ...prev, preparationAction: e.target.value }))
                            }
                          />
                        </div>

                        <Button onClick={handleGenerateEmotionPlan}>Gerar plano de regulação</Button>

                        {emotionPlan && (
                          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
                            <p className="font-semibold text-slate-900">Plano rápido de regulação emocional</p>
                            <pre className="whitespace-pre-wrap text-sm text-slate-600 font-sans">
                              {emotionPlan}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}

                    {exercise.id === "assertive-communication" && (
                      <div className="space-y-6 py-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <textarea
                            className="w-full min-h-[140px] rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Escreva uma frase insegura. Ex.: Acho que escolhemos esse tipo de scan porque parecia melhor."
                            value={assertiveForm.original}
                            onChange={(e) =>
                              setAssertiveForm((prev) => ({ ...prev, original: e.target.value }))
                            }
                          />

                          <textarea
                            className="w-full min-h-[140px] rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Reescreva de forma assertiva. Ex.: A escolha inicial considerou o escopo definido e o impacto operacional no ambiente."
                            value={assertiveForm.assertive}
                            onChange={(e) =>
                              setAssertiveForm((prev) => ({ ...prev, assertive: e.target.value }))
                            }
                          />
                        </div>

                        <Button onClick={handleAssertiveRewrite}>Analisar reformulação</Button>

                        {assertiveFeedback && (
                          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
                            <p className="font-semibold text-slate-900">Feedback de assertividade</p>
                            <p className="text-sm text-slate-600">{assertiveFeedback}</p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="pt-2">
                      {completedExercises.includes(exercise.id) && (
                        <div className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 px-4 py-2 text-sm font-medium text-green-700">
                          <CheckCircle2 className="w-4 h-4" />
                          Exercício concluído
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section id="progresso" className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-blue-900">Seu Progresso</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Acompanhe sua evolução nos quatro pilares
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar) => (
              <Card key={pillar.id} className="p-6 border border-slate-200 shadow-md rounded-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-blue-900">{pillar.title}</h3>
                    <span className="text-2xl font-bold text-amber-500">{pillar.progress}%</span>
                  </div>

                  <Progress value={pillar.progress} className="h-3 bg-slate-200" />

                  <p className="text-sm text-slate-600">
                    {pillar.progress === 0
                      ? "Comece agora"
                      : pillar.progress < 50
                        ? "Você está no caminho certo"
                        : pillar.progress < 100
                          ? "Quase lá"
                          : "Parabéns! Pilar completado"}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-blue-900">Exercícios Completados</h3>
              <p className="text-4xl font-bold text-amber-500">{completedExercises.length} / 5</p>

              <div className="mt-6 pt-6 border-t border-blue-200">
                <p className="text-lg font-semibold text-blue-900 mb-2">Progresso Geral</p>
                <Progress value={getTotalProgress()} className="h-3 bg-blue-200" />
                <p className="text-sm text-slate-600 mt-2">{getTotalProgress()}% concluído</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Pronto para evoluir sua comunicação?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Continue praticando com exercícios guiados e fortaleça sua segurança ao se comunicar.
          </p>

          <Button className="bg-amber-500 hover:bg-amber-600 text-blue-900 px-8 py-6 text-lg font-semibold rounded-lg transition-all hover:shadow-lg hover:scale-105">
            Acessar Todos os Recursos
          </Button>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CA</span>
                </div>
                <h4 className="text-white font-bold">Comunicação & Aprendizagem</h4>
              </div>
              <p className="text-sm text-slate-400">
                Transformando profissionais em comunicadores mais claros, seguros e assertivos.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Pilares</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#pilares" className="hover:text-white transition-colors">Organização do Pensamento</a></li>
                <li><a href="#pilares" className="hover:text-white transition-colors">Narrativa e Conexão</a></li>
                <li><a href="#pilares" className="hover:text-white transition-colors">Regulação Emocional</a></li>
                <li><a href="#pilares" className="hover:text-white transition-colors">Comunicação Assertiva</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#exercicios" className="hover:text-white transition-colors">Exercícios</a></li>
                <li><a href="#progresso" className="hover:text-white transition-colors">Progresso</a></li>
                <li>
                  <Link href="/banca" className="hover:text-white transition-colors">
                    Treino da banca
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>&copy; 2026 Alexsandra Tavares. Todos os direitos reservados.</p>
            <p className="text-xs text-slate-500 mt-2">
              Engenharia de Software • Segurança da Informação • Neuropsicopedagogia • Educação e Comunicação
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
