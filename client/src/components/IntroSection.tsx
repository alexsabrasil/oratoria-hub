import { AlertCircle } from 'lucide-react';

/**
 * Componente de Introdução - Contextualiza o problema e a solução
 * Design: Minimalismo corporativo com foco em clareza
 * Conteúdo: Neuropsicopedagogia e Psicopedagogia
 */

export function IntroSection() {
  return (
    <section className="py-16 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Problema */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">O Desafio da Comunicação</h3>
                <p className="text-gray-700 leading-relaxed">
                  Você é inteligente, preparado e competente. Mas na hora de falar em uma reunião importante, fazer uma apresentação ou se expor em público, algo muda. A ansiedade toma conta, as ideias desaparecem, e você se vê travado, perdendo autoridade antes mesmo de terminar o raciocínio. Este é um desafio comum que afeta muitos profissionais.
                </p>
              </div>
            </div>
          </div>

          {/* A Neurociência */}
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600 space-y-4">
            <h3 className="text-xl font-bold text-blue-900">A Perspectiva Neuropsicopedagógica</h3>
            <p className="text-gray-700 leading-relaxed">
              Não é falta de preparo ou confiança. É uma resposta neurobiológica. Quando você antecipa uma situação de julgamento, seu corpo ativa mecanismos de defesa que afetam sua capacidade cognitiva. O sistema límbico se hiperativa, interferindo na comunicação clara e estruturada que o córtex pré-frontal deveria coordenar.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Como neuropsicopedagoga e psicopedagoga, compreendo que essas dificuldades não são deficiências, mas respostas adaptativas que podem ser ressignificadas através de técnicas de autorregulação e estruturação do pensamento.
            </p>
          </div>

          {/* A Solução */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-900">A Solução: Os Quatro Pilares</h3>
            <p className="text-gray-700 leading-relaxed">
              Este espaço oferece um método baseado em neuropsicopedagogia que trabalha os processos cognitivos e emocionais envolvidos na comunicação. Através dos quatro pilares abaixo, você aprenderá a:
            </p>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">1.</span>
                <span className="text-gray-700"><strong>Organizar</strong> seu pensamento de forma estruturada para comunicar com clareza</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">2.</span>
                <span className="text-gray-700"><strong>Conectar</strong> emocionalmente através de narrativas autênticas e significativas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">3.</span>
                <span className="text-gray-700"><strong>Regular</strong> suas emoções e transformar a ansiedade em energia focada</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">4.</span>
                <span className="text-gray-700"><strong>Comunicar</strong> com assertividade e segurança em qualquer contexto</span>
              </li>
            </ul>
          </div>

          {/* Resultado */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg border border-amber-200 space-y-4">
            <h3 className="text-xl font-bold text-blue-900">O Resultado</h3>
            <p className="text-gray-700 leading-relaxed">
              Você não aprenderá a ser quem você não é. Este método simplesmente remove as barreiras neurobiológicas e cognitivas para que você possa ser exatamente quem você já é: um profissional competente, cheio de ideias, e finalmente com a voz que merece. Desenvolvido a partir de minha experiência pessoal como neuropsicopedagoga e psicopedagoga, este espaço é um convite para transformar sua relação com a comunicação.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
