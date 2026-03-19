import { Card } from "@/components/ui/card";

/**
 * Seção Minha Jornada
 * Com imagem, narrativa pessoal e transição para tecnologia
 */

export function TestimonialSection() {
  return (
    <section id="minha-jornada" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Minha Jornada</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            O caminho que me trouxe até aqui
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="p-8 md:p-10 border-0 shadow-lg bg-white rounded-3xl">
            <div className="grid md:grid-cols-[320px_1fr] gap-10 items-start">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-slate-100">
                  <img
                    src="https://i.ibb.co/R4hnRkWb/ale-blazer-red.jpg"
                    alt="Alê Tavares"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                  <h3 className="text-2xl font-bold text-blue-900 mb-1">Alê Tavares</h3>
                  <p className="text-sm text-amber-600 font-semibold mb-3">
                    Educação, comunicação e transição para tecnologia
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Unindo aprendizagem, regulação emocional, tecnologia e prática de comunicação.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    Minha trajetória começou na área da educação, com estudos em
                    neuropsicopedagogia e psicopedagogia. Essas formações me ajudaram
                    a compreender melhor como as pessoas aprendem, se organizam cognitivamente
                    e desenvolvem confiança para comunicar ideias. Ao mesmo tempo, também vivi
                    minhas próprias dificuldades com apresentações, fala em público e organização
                    do pensamento sob pressão.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-600">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">O Desafio Pessoal</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Apesar de estudar aprendizagem, desenvolvimento e comunicação, eu mesma travava
                    em momentos decisivos. Minha voz acelerava, meus pensamentos se embaralhavam e
                    eu sentia que não conseguia expressar com firmeza aquilo que realmente sabia.
                    Essa experiência me mostrou que compreender o problema teoricamente não era o
                    suficiente. Eu precisava transformar conhecimento em prática.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-blue-900">A Transformação</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Aos poucos, comecei a combinar técnicas de autorregulação emocional, estruturação
                    do pensamento, prática de fala e organização de narrativa. Esse processo me ajudou
                    a desenvolver mais clareza, segurança e consistência para me comunicar.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Paralelamente, iniciei minha transição para a área de tecnologia, com estudos
                    autodidatas em programação, formação em Engenharia de Software, Segurança da
                    Informação e participação em cursos e práticas em cibersegurança. Foi nessa nova
                    fase que percebi ainda mais como comunicar bem também é essencial em contextos
                    técnicos, projetos, entrevistas, bancas e apresentações profissionais.
                  </p>
                </div>

                <div className="bg-amber-50 p-6 rounded-2xl border-l-4 border-amber-500">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">Por que criei este espaço</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Criei este espaço para unir essas duas dimensões da minha trajetória: a compreensão
                    sobre aprendizagem e regulação emocional, e a vivência prática de construir uma nova
                    carreira em tecnologia. Aqui, compartilho exercícios, métodos e ferramentas que ajudam
                    a fortalecer a comunicação de forma realista, aplicada e possível.
                  </p>
                </div>

                <div className="text-center pt-4">
                  <p className="text-gray-700 italic leading-relaxed">
                    "Se você sente que tem potencial, conhecimento e vontade de crescer, mas ainda encontra
                    barreiras na hora de se expressar, saiba que isso pode ser trabalhado com prática,
                    consciência e método."
                  </p>
                  <p className="text-blue-900 font-semibold mt-4">— Alê Tavares</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}