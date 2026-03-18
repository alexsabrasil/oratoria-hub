import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

/**
 * Componente de Testemunho Pessoal - Minha história de transformação
 * Design: Card com reflexão pessoal e jornada
 */

export function TestimonialSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Minha Jornada</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Por que criei este espaço
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="p-8 border-0 shadow-lg bg-white">
            <div className="space-y-6">
              {/* Introdução */}
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Alê Tavares</h3>
                <p className="text-sm text-amber-600 font-semibold mb-4">Neuropsicopedagoga e Psicopedagoga</p>
                <p className="text-gray-700 leading-relaxed">
                  Como neuropsicopedagoga e psicopedagoga, passei anos estudando como o cérebro aprende e se comunica. Mas havia uma lacuna em minha própria vida: eu mesma enfrentava dificuldades significativas para apresentar minhas ideias, falar em público e me comunicar com segurança.
                </p>
              </div>

              {/* O Desafio */}
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                <h4 className="text-lg font-bold text-blue-900 mb-3">O Desafio Pessoal</h4>
                <p className="text-gray-700 leading-relaxed">
                  Apesar de toda minha formação e conhecimento técnico, eu travava nas apresentações. Minha voz tremia, meus pensamentos se desorganizavam, e eu perdia a autoridade que deveria ter. Era frustrante saber exatamente o que estava acontecendo no meu cérebro e ainda assim não conseguir contornar a situação sozinha. Isso me motivou a buscar soluções práticas e integradoras.
                </p>
              </div>

              {/* A Transformação */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-blue-900">A Transformação</h4>
                <p className="text-gray-700 leading-relaxed">
                  Ao combinar meu conhecimento em neuropsicopedagogia com técnicas de autorregulação, estruturação do pensamento e comunicação assertiva, consegui transformar minha relação com a comunicação. Não foi mágica, foi trabalho consistente e baseado em evidências.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Hoje, consigo apresentar minhas ideias com clareza, segurança e autoridade. E mais importante: consigo ajudar outras pessoas que enfrentam os mesmos desafios que eu enfrentei.
                </p>
              </div>

              {/* Por que este espaço */}
              <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
                <h4 className="text-lg font-bold text-blue-900 mb-3">Por que criei este espaço</h4>
                <p className="text-gray-700 leading-relaxed">
                  Criei este espaço como um convite para você explorar sua própria capacidade de comunicação. Não é uma escola formal, mas um espaço de prática, aprendizagem e transformação. Aqui, você encontrará exercícios baseados em neuropsicopedagogia, técnicas de autorregulação e ferramentas práticas para melhorar sua comunicação.
                </p>
              </div>

              {/* Chamada */}
              <div className="text-center pt-6">
                <p className="text-gray-700 italic">
                  "Se você está aqui, é porque sente que há algo a transformar em sua comunicação. Saiba que você não está sozinho, e que essa transformação é possível."
                </p>
                <p className="text-blue-900 font-semibold mt-4">— Alê Tavares</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
