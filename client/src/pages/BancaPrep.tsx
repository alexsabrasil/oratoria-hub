import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  TimerReset,
  Trophy,
  ShieldCheck,
  Presentation,
  ArrowLeft,
  LockKeyhole,
} from "lucide-react";

type Section = {
  title: string;
  text: string;
  objective: string;
  seconds: number;
};

type Question = {
  question: string;
  answer: string;
};

const ACCESS_PASSWORD = "Ale2026Banca";
const ACCESS_STORAGE_KEY = "oratoria.banca.authorized";

export default function BancaPrep() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const sections: Section[] = [
    {
      title: "1. Abertura e contexto do risco",
      text: "Infraestruturas críticas como o PoP-MG conectam diversas instituições. Vulnerabilidades nesse ambiente podem gerar impacto sistêmico e afetar múltiplas organizações.",
      objective: "Iniciar com risco e impacto.",
      seconds: 40,
    },
    {
      title: "2. Diagnóstico do ambiente",
      text: "Durante as análises, foram identificados 26 ativos e 234 vulnerabilidades em diferentes níveis de criticidade.",
      objective: "Mostrar diagnóstico com dados concretos.",
      seconds: 45,
    },
    {
      title: "3. Problema identificado",
      text: "O ambiente possuía mecanismos de identificação técnica, mas precisava de um processo formal de gestão de vulnerabilidades com priorização, rastreabilidade e acompanhamento.",
      objective: "Explicar claramente o problema do processo.",
      seconds: 45,
    },
    {
      title: "4. Solução proposta",
      text: "O projeto estruturou o processo com BPMN, OpenVAS para identificação, DefectDojo para centralização dos achados, além de governança e SLA de remediação.",
      objective: "Mostrar a solução de forma executiva.",
      seconds: 60,
    },
    {
      title: "5. Resultado do projeto",
      text: "Foi criado um baseline estruturado de risco e um fluxo padronizado para identificação, classificação e tratamento das vulnerabilidades.",
      objective: "Destacar resultado e valor entregue.",
      seconds: 50,
    },
    {
      title: "6. Legado para o PoP-MG",
      text: "O principal legado é a implantação de um modelo contínuo de gestão de vulnerabilidades com rastreabilidade e suporte à decisão.",
      objective: "Mostrar o que fica para a instituição.",
      seconds: 40,
    },
    {
      title: "7. Roadmap de evolução",
      text: "Os próximos passos incluem implementação de scan autenticado e integração de indicadores ao acompanhamento gerencial.",
      objective: "Apresentar evolução futura.",
      seconds: 40,
    },
    {
      title: "8. Encerramento",
      text: "O projeto representa a primeira iteração de um ciclo contínuo de maturidade em segurança para o ambiente analisado.",
      objective: "Encerrar com firmeza e clareza.",
      seconds: 30,
    },
  ];

  const questions: Question[] = [
    {
      question: "Por que foi escolhida a varredura não autenticada?",
      answer:
        "A escolha inicial considerou o escopo definido com o PoP-MG, o impacto operacional na infraestrutura, a necessidade de alinhamento com a equipe e a execução no horário comercial. A varredura autenticada foi prevista como evolução do modelo.",
    },
    {
      question: "Qual a principal diferença entre scan autenticado e não autenticado?",
      answer:
        "O scan não autenticado avalia a superfície de exposição externa, simulando a visão de um atacante sem credenciais. Já o scan autenticado permite uma análise mais profunda, com acesso a configurações internas, pacotes instalados e versões de software.",
    },
    {
      question: "Como tratar falsos positivos?",
      answer:
        "Os achados do scanner passam por validação antes da remediação, com análise manual, consulta a referências como CVE/NVD e avaliação do contexto do ativo.",
    },
    {
      question: "Qual o principal legado do projeto?",
      answer:
        "A estruturação de um processo formal de gestão de vulnerabilidades com fluxo definido, priorização por criticidade e rastreabilidade dos achados.",
    },
    {
      question: "Por que o BPMN foi importante no projeto?",
      answer:
        "O BPMN foi importante para representar visualmente o fluxo do processo de gestão de vulnerabilidades, deixando claras as etapas, responsabilidades e pontos de decisão.",
    },
    {
      question: "Qual foi o principal resultado alcançado?",
      answer:
        "O principal resultado foi a criação de um baseline estruturado de risco, associado a um fluxo formal de identificação, classificação, priorização e tratamento das vulnerabilidades.",
    },
    {
      question: "O que você faria como próxima evolução do projeto?",
      answer:
        "Como evolução do modelo, eu ampliaria a maturidade do processo com varreduras autenticadas e integração de indicadores ao acompanhamento gerencial.",
    },
  ];

  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [checkNoRead, setCheckNoRead] = useState(false);
  const [checkCalm, setCheckCalm] = useState(false);
  const [checkObjective, setCheckObjective] = useState(false);

  const [simulatedQuestion, setSimulatedQuestion] = useState<Question | null>(null);
  const [showSimulatedAnswer, setShowSimulatedAnswer] = useState(false);
  const [simTimeLeft, setSimTimeLeft] = useState(45);
  const [simIsRunning, setSimIsRunning] = useState(false);

  const [mockQuestions, setMockQuestions] = useState<Question[]>([]);
  const [mockIndex, setMockIndex] = useState(0);
  const [mockStarted, setMockStarted] = useState(false);
  const [mockFinished, setMockFinished] = useState(false);
  const [mockShowAnswer, setMockShowAnswer] = useState(false);
  const [mockTimeLeft, setMockTimeLeft] = useState(45);
  const [mockIsRunning, setMockIsRunning] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(ACCESS_STORAGE_KEY);
    if (saved === "true") {
      setAuthorized(true);
    }
  }, []);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
  }, [timeLeft, isRunning]);

  useEffect(() => {
    if (!simIsRunning || simTimeLeft <= 0) return;
    const timer = setInterval(() => setSimTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [simIsRunning, simTimeLeft]);

  useEffect(() => {
    if (simTimeLeft === 0 && simIsRunning) {
      setSimIsRunning(false);
    }
  }, [simTimeLeft, simIsRunning]);

  useEffect(() => {
    if (!mockIsRunning || mockTimeLeft <= 0) return;
    const timer = setInterval(() => setMockTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [mockIsRunning, mockTimeLeft]);

  useEffect(() => {
    if (mockTimeLeft === 0 && mockIsRunning) {
      setMockIsRunning(false);
    }
  }, [mockTimeLeft, mockIsRunning]);

  function handleLogin() {
    if (password === ACCESS_PASSWORD) {
      setAuthorized(true);
      setLoginError("");
      localStorage.setItem(ACCESS_STORAGE_KEY, "true");
      return;
    }

    setLoginError("Senha incorreta. Tente novamente.");
  }

  function handleLogout() {
    setAuthorized(false);
    setPassword("");
    setLoginError("");
    localStorage.removeItem(ACCESS_STORAGE_KEY);
  }

  function startTraining(section: Section) {
    setSelectedSection(section);
    setTimeLeft(section.seconds);
    setIsRunning(false);
    setCheckNoRead(false);
    setCheckCalm(false);
    setCheckObjective(false);
  }

  function handleStartTimer() {
    if (selectedSection) {
      setTimeLeft(selectedSection.seconds);
      setIsRunning(true);
    }
  }

  function handleStopTimer() {
    setIsRunning(false);
  }

  function drawRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setSimulatedQuestion(questions[randomIndex]);
    setShowSimulatedAnswer(false);
    setSimTimeLeft(45);
    setSimIsRunning(false);
  }

  function nextSimulatedQuestion() {
    drawRandomQuestion();
  }

  function startSimTimer() {
    setSimTimeLeft(45);
    setSimIsRunning(true);
  }

  function pauseSimTimer() {
    setSimIsRunning(false);
  }

  function shuffleArray<T>(array: T[]) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function startMockSimulation() {
    const selected = shuffleArray(questions).slice(0, 3);
    setMockQuestions(selected);
    setMockIndex(0);
    setMockStarted(true);
    setMockFinished(false);
    setMockShowAnswer(false);
    setMockTimeLeft(45);
    setMockIsRunning(false);
  }

  function startMockTimer() {
    setMockTimeLeft(45);
    setMockIsRunning(true);
  }

  function pauseMockTimer() {
    setMockIsRunning(false);
  }

  function showMockAnswer() {
    setMockShowAnswer(true);
  }

  function nextMockQuestion() {
    if (mockIndex < mockQuestions.length - 1) {
      setMockIndex((prev) => prev + 1);
      setMockShowAnswer(false);
      setMockTimeLeft(45);
      setMockIsRunning(false);
    } else {
      setMockFinished(true);
      setMockStarted(false);
      setMockIsRunning(false);
    }
  }

  function resetMockSimulation() {
    setMockQuestions([]);
    setMockIndex(0);
    setMockStarted(false);
    setMockFinished(false);
    setMockShowAnswer(false);
    setMockTimeLeft(45);
    setMockIsRunning(false);
  }

  function formatTime(seconds: number) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  const completionPercent = Math.round((sections.length / 8) * 100);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Card className="border border-slate-200 shadow-2xl rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <LockKeyhole className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Acesso restrito</h1>
                  <p className="text-sm text-slate-200">Ambiente privado de preparação para banca</p>
                </div>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed">
                Esta área contém seu ambiente de treino estratégico, simulação de banca e preparação
                de apresentação. O acesso é reservado.
              </p>
            </div>

            <CardContent className="p-8 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Senha de acesso</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLogin();
                  }}
                  placeholder="Digite sua senha"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {loginError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {loginError}
                </div>
              )}

              <div className="flex gap-3">
                <Button onClick={handleLogin} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                  Entrar
                </Button>

                <Link href="/">
                  <Button variant="outline" className="flex-1">
                    Voltar
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-slate-500 text-center">
                Ambiente privado para treino de apresentação e respostas da banca.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-purple-50">
      <section className="border-b border-slate-200 bg-white/90 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center shadow-sm">
              <Presentation className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900">Modo Banca</h1>
              <p className="text-sm text-slate-500">Treino executivo para apresentação e respostas</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleLogout}>
              Sair
            </Button>

            <Link href="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Voltar para Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 space-y-8">
          <div className="grid lg:grid-cols-[1.4fr_0.8fr] gap-6 items-stretch">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-700 via-indigo-700 to-slate-900 text-white rounded-3xl">
              <CardContent className="p-8 md:p-10 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  Acesso privado e protegido
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                    Treine sua apresentação como em uma banca real
                  </h2>
                  <p className="text-purple-100 text-lg leading-relaxed max-w-2xl">
                    Organize sua fala, pratique respostas técnicas e simule pressão real com cronômetro,
                    perguntas aleatórias e sequência completa de defesa.
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 pt-2">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-sm text-purple-100">Blocos da apresentação</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-2xl font-bold">{questions.length}</p>
                    <p className="text-sm text-purple-100">Perguntas técnicas</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-purple-100">Perguntas por simulação</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 shadow-md rounded-3xl">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-slate-900">Estratégia executiva</h3>
                </div>

                <div className="space-y-3 text-sm text-slate-600">
                  <p>RISCO → IMPACTO → SOLUÇÃO → RESULTADO → LEGADO → FUTURO</p>
                  <Progress value={completionPercent} className="h-2" />
                  <p className="text-xs text-slate-500">
                    Estrutura recomendada para sua narrativa de apresentação.
                  </p>
                </div>

                <div className="grid gap-3">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <TimerReset className="w-4 h-4 text-indigo-600" />
                      <p className="font-medium text-slate-900">Treino por bloco</p>
                    </div>
                    <p className="text-sm text-slate-600">Foque seção por seção com objetivo e tempo sugerido.</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Brain className="w-4 h-4 text-indigo-600" />
                      <p className="font-medium text-slate-900">Perguntas aleatórias</p>
                    </div>
                    <p className="text-sm text-slate-600">Treine raciocínio rápido sem depender de leitura.</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy className="w-4 h-4 text-indigo-600" />
                      <p className="font-medium text-slate-900">Simulação completa</p>
                    </div>
                    <p className="text-sm text-slate-600">Reproduza o clima de banca com 3 perguntas seguidas.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-5">
            {sections.map((item) => (
              <Card key={item.title} className="border border-slate-200 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-slate-600">{item.text}</p>
                    </div>

                    <div className="rounded-xl bg-purple-50 text-purple-700 px-4 py-2 text-sm font-medium border border-purple-100">
                      {item.seconds}s
                    </div>
                  </div>

                  <Button variant="secondary" onClick={() => startTraining(item)}>
                    🎤 Treinar este bloco
                  </Button>

                  {selectedSection?.title === item.title && (
                    <div className="mt-4 border rounded-2xl p-5 space-y-4 bg-slate-50">
                      <div>
                        <p className="font-semibold text-slate-900">{selectedSection.title}</p>
                        <p className="text-sm text-slate-500 mt-1">
                          Objetivo: {selectedSection.objective}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl border bg-white space-y-2">
                        <p className="text-sm font-medium text-slate-900">Texto-base do bloco</p>
                        <p className="text-sm text-slate-600">{selectedSection.text}</p>
                      </div>

                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="text-2xl font-bold text-slate-900">{formatTime(timeLeft)}</div>

                        <Button onClick={handleStartTimer}>Iniciar treino</Button>

                        <Button variant="secondary" onClick={handleStopTimer}>
                          Pausar
                        </Button>

                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedSection(null);
                            setIsRunning(false);
                            setTimeLeft(0);
                          }}
                        >
                          Fechar treino
                        </Button>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-3">
                        <label className="flex items-center gap-2 text-sm border rounded-xl p-3 bg-white">
                          <input
                            type="checkbox"
                            checked={checkNoRead}
                            onChange={(e) => setCheckNoRead(e.target.checked)}
                          />
                          Falei sem ler
                        </label>

                        <label className="flex items-center gap-2 text-sm border rounded-xl p-3 bg-white">
                          <input
                            type="checkbox"
                            checked={checkCalm}
                            onChange={(e) => setCheckCalm(e.target.checked)}
                          />
                          Mantive a calma
                        </label>

                        <label className="flex items-center gap-2 text-sm border rounded-xl p-3 bg-white">
                          <input
                            type="checkbox"
                            checked={checkObjective}
                            onChange={(e) => setCheckObjective(e.target.checked)}
                          />
                          Fui objetiva e clara
                        </label>
                      </div>

                      {!isRunning && timeLeft === 0 && (
                        <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-800">
                          Tempo encerrado. Revise sua fala e repita o bloco se quiser melhorar ritmo e clareza.
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border border-slate-200 shadow-sm rounded-3xl">
              <CardHeader>
                <CardTitle>Modo simulado de banca</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-500">
                  Sorteie uma pergunta, responda em voz alta e só depois revele a resposta sugerida.
                </p>

                <div className="flex gap-3 flex-wrap">
                  <Button onClick={drawRandomQuestion}>🎲 Sortear pergunta</Button>

                  {simulatedQuestion && (
                    <Button variant="secondary" onClick={() => setShowSimulatedAnswer(true)}>
                      Mostrar resposta
                    </Button>
                  )}

                  {simulatedQuestion && (
                    <Button variant="outline" onClick={nextSimulatedQuestion}>
                      Próxima pergunta
                    </Button>
                  )}
                </div>

                {simulatedQuestion && (
                  <div className="border rounded-2xl p-5 space-y-4 bg-slate-50">
                    <p className="font-semibold text-slate-900">{simulatedQuestion.question}</p>

                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="text-2xl font-bold text-slate-900">{formatTime(simTimeLeft)}</div>

                      <Button onClick={startSimTimer}>Iniciar resposta</Button>

                      <Button variant="secondary" onClick={pauseSimTimer}>
                        Pausar
                      </Button>
                    </div>

                    {!showSimulatedAnswer && (
                      <p className="text-sm text-slate-500">
                        Tente responder primeiro sem consultar a resposta.
                      </p>
                    )}

                    {simTimeLeft === 0 && !showSimulatedAnswer && (
                      <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-200 text-sm text-yellow-800">
                        Tempo encerrado. Revele a resposta e compare com sua explicação.
                      </div>
                    )}

                    {showSimulatedAnswer && (
                      <div className="p-4 rounded-xl bg-white border">
                        <p className="text-sm text-slate-600">{simulatedQuestion.answer}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border border-slate-200 shadow-sm rounded-3xl">
              <CardHeader>
                <CardTitle>Simulação completa de banca</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-500">
                  Treine uma sequência com 3 perguntas, simulando pressão e encadeamento real.
                </p>

                {!mockStarted && !mockFinished && (
                  <Button onClick={startMockSimulation}>▶️ Iniciar simulação completa</Button>
                )}

                {mockStarted && mockQuestions.length > 0 && (
                  <div className="border rounded-2xl p-5 space-y-4 bg-slate-50">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <p className="font-semibold text-slate-900">
                        Pergunta {mockIndex + 1} de {mockQuestions.length}
                      </p>
                      <div className="text-2xl font-bold text-slate-900">{formatTime(mockTimeLeft)}</div>
                    </div>

                    <p className="font-medium text-slate-800">{mockQuestions[mockIndex].question}</p>

                    <div className="flex gap-3 flex-wrap">
                      <Button onClick={startMockTimer}>Iniciar resposta</Button>
                      <Button variant="secondary" onClick={pauseMockTimer}>
                        Pausar
                      </Button>
                      <Button variant="outline" onClick={showMockAnswer}>
                        Mostrar resposta
                      </Button>
                      <Button onClick={nextMockQuestion}>Próxima</Button>
                    </div>

                    {mockTimeLeft === 0 && !mockShowAnswer && (
                      <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-200 text-sm text-yellow-800">
                        Tempo encerrado. Revele a resposta e compare com sua fala.
                      </div>
                    )}

                    {mockShowAnswer && (
                      <div className="p-4 rounded-xl bg-white border">
                        <p className="text-sm text-slate-600">{mockQuestions[mockIndex].answer}</p>
                      </div>
                    )}
                  </div>
                )}

                {mockFinished && (
                  <div className="border rounded-2xl p-5 space-y-4 bg-slate-50">
                    <p className="font-semibold text-lg text-slate-900">Simulação concluída</p>
                    <p className="text-sm text-slate-500">
                      Revise agora sua segurança, clareza e objetividade antes de repetir.
                    </p>

                    <div className="grid gap-3">
                      <label className="flex items-center gap-2 text-sm border rounded-xl p-3 bg-white">
                        <input type="checkbox" />
                        Respondi com segurança
                      </label>
                      <label className="flex items-center gap-2 text-sm border rounded-xl p-3 bg-white">
                        <input type="checkbox" />
                        Evitei leitura excessiva
                      </label>
                      <label className="flex items-center gap-2 text-sm border rounded-xl p-3 bg-white">
                        <input type="checkbox" />
                        Mantive clareza e objetividade
                      </label>
                    </div>

                    <Button onClick={resetMockSimulation}>🔄 Reiniciar simulação</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="border border-slate-200 shadow-sm rounded-3xl">
            <CardHeader>
              <CardTitle>Perguntas prováveis da banca</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.map((q) => (
                <details key={q.question} className="border rounded-2xl p-4 bg-white">
                  <summary className="font-semibold cursor-pointer text-slate-900">
                    {q.question}
                  </summary>
                  <p className="text-sm text-slate-600 mt-3">{q.answer}</p>
                </details>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}