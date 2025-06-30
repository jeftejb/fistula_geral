// app/sobre-fistula/page.tsx ou um caminho similar
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  BookOpen,
  Globe,
  MapPin,
  Target,
  ShieldCheck,
  Stethoscope,
  Microscope,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Componente para o menu de navegação lateral
const SideMenu = () => (
  <nav className="sticky top-28 w-64 hidden lg:block" data-aos="fade-left">
    <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
      Nesta Página
    </h3>
    <ul className="space-y-2 border-l-2 border-gray-200 dark:border-gray-700">
      <li>
        <Link
          href="#geral"
          className="block pl-4 text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 hover:border-pink-500 border-l-2 border-transparent -ml-px transition-colors"
        >
          Perspetiva Global
        </Link>
      </li>
      <li>
        <Link
          href="#africa"
          className="block pl-4 text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 hover:border-pink-500 border-l-2 border-transparent -ml-px transition-colors"
        >
          A Fístula em África
        </Link>
      </li>
      <li>
        <Link
          href="#angola"
          className="block pl-4 text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 hover:border-pink-500 border-l-2 border-transparent -ml-px transition-colors"
        >
          A Realidade em Angola
        </Link>
      </li>
      <li>
        <Link
          href="#prevencao"
          className="block pl-4 text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 hover:border-pink-500 border-l-2 border-transparent -ml-px transition-colors"
        >
          Prevenção
        </Link>
      </li>
      <li>
        <Link
          href="#tratamento"
          className="block pl-4 text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 hover:border-pink-500 border-l-2 border-transparent -ml-px transition-colors"
        >
          Tratamento
        </Link>
      </li>
    </ul>
  </nav>
);

// Componente para um cabeçalho de secção
const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}) => (
  <div className="text-center mb-12" data-aos="fade-up">
    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-pink-100 dark:bg-pink-900/30 mb-4">
      <Icon className="h-8 w-8 text-pink-600 dark:text-pink-400" />
    </div>
    <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white">
      {title}
    </h2>
    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
      {subtitle}
    </p>
  </div>
);

const ContentParagraph = ({ children }: { children: React.ReactNode }) => (
  <p
    className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6"
    data-aos="fade-up"
    data-aos-delay="100"
  >
    {children}
  </p>
);

const ContentSubHeader = ({ children }: { children: React.ReactNode }) => (
  <h4
    className="text-2xl font-bold text-gray-800 dark:text-white mt-10 mb-4"
    data-aos="fade-up"
  >
    {children}
  </h4>
);

export default function SobreFistulaPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 dark:bg-gray-900">
      <header className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link
            href="/"
            className="text-lg font-medium text-gray-800 dark:text-white flex items-center hover:text-pink-600 transition-colors"
          >
            <ArrowLeft className="inline-block h-5 w-5 mr-2" />
            Voltar à Página Principal
          </Link>
          <Link
            href="/"
            className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-pink-700 transition-colors"
          >
            Portal do Profissional
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-16" data-aos="fade-down">
          <span className="text-sm font-bold uppercase text-pink-500 tracking-wider">
            Compreender para Curar
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
            Fístula Obstétrica: A Lesão Silenciosa
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-16">
          <article className="w-full lg:w-3/4">
            <section id="geral">
              <SectionHeader
                icon={Globe}
                title="Perspetiva Global"
                subtitle="Definição, causas e consequências da fístula obstétrica, segundo a OMS e o UNFPA."
              />
              <ContentSubHeader>O que é a Fístula Obstétrica?</ContentSubHeader>
              <ContentParagraph>
                A fístula obstétrica é uma abertura anormal entre o canal de
                parto e a bexiga (vesicovaginal) ou o reto (retovaginal),
                resultante de um trabalho de parto prolongado e obstruído. Esta
                condição leva a uma incontinência crónica, destruindo a vida
                social e económica da mulher.
              </ContentParagraph>
              <div className="my-12" data-aos="fade-up">
                <div className="aspect-w-16 h-96 rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.youtube.com/embed/WTSkQnBsXg0"
                    title="Vídeo do UNFPA sobre a Fístula Obstétrica"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <p className="text-xs text-center text-gray-500 mt-2">
                  Vídeo: Campanha "End Fistula" do Fundo de População das Nações
                  Unidas (UNFPA).
                </p>
              </div>
            </section>

            <section id="africa" className="mt-20">
              <SectionHeader
                icon={MapPin}
                title="A Fístula em África"
                subtitle="O epicentro da crise, com desafios únicos e uma necessidade urgente de ação."
              />
              <ContentParagraph>
                A OMS estima que mais de **2 milhões de mulheres**,
                principalmente na África Subsariana, vivem com fístula não
                tratada, com 50.000 a 100.000 novos casos a cada ano. Os
                principais desafios incluem a carência de cirurgiões treinados,
                o difícil acesso geográfico a hospitais e as barreiras
                económicas e sociais que impedem as mulheres de procurar ajuda.
              </ContentParagraph>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div data-aos="zoom-in">
                  <Image
                    src="/img/fistula2.jpg"
                    alt="Profissional de saúde a cuidar de uma mãe"
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-lg object-cover w-full h-full"
                  />
                </div>
                <div data-aos="zoom-in" data-aos-delay="100">
                  <Image
                    src="/img/fistula3.jpg"
                    alt="Médico a conversar com uma paciente"
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-lg object-cover w-full h-full"
                  />
                </div>
              </div>
            </section>

            <section id="angola" className="mt-20">
              <SectionHeader
                icon={Target}
                title="A Realidade em Angola"
                subtitle="O contexto nacional e o papel de centros de referência como o CEML."
              />
              <ContentParagraph>
                Angola enfrenta desafios significativos. A alta taxa de
                mortalidade materna está diretamente ligada às causas da
                fístula. Centros como o **Centro Evangélico de Medicina do
                Lubango (CEML)** são cruciais, tendo já tratado centenas de
                mulheres e tornando-se uma luz de esperança na região. O nosso
                projeto visa apoiar diretamente este trabalho.
              </ContentParagraph>
            </section>

            <section id="prevencao" className="mt-20">
              <SectionHeader
                icon={ShieldCheck}
                title="Prevenção: A Chave para Erradicar a Fístula"
                subtitle="A fístula obstétrica é quase inteiramente evitável através de estratégias de saúde pública e empoderamento."
              />
              <ContentParagraph>
                A prevenção é a arma mais poderosa. Envolve garantir que cada
                mulher tenha acesso a cuidados pré-natais de qualidade, a
                assistência de um profissional qualificado durante o parto, e a
                capacidade de chegar a um centro cirúrgico a tempo, caso surjam
                complicações.
              </ContentParagraph>
            </section>

            <section id="tratamento" className="mt-20">
              <SectionHeader
                icon={Stethoscope}
                title="Tratamento e Reabilitação"
                subtitle="A cirurgia reparadora, combinada com apoio psicossocial, oferece uma nova oportunidade de vida."
              />
              <ContentParagraph>
                Para as mulheres que já sofrem com a condição, o tratamento
                principal é a cirurgia reparadora, que tem uma taxa de sucesso
                superior a 90% para casos simples. A reabilitação holística,
                incluindo fisioterapia e apoio psicossocial, é fundamental para
                a recuperação completa e a reintegração da mulher na sua
                comunidade.
              </ContentParagraph>
            </section>

            <section id="estudos" className="mt-20">
              <SectionHeader
                icon={Microscope}
                title="Estudos Atuais e Inovação"
                subtitle="A tecnologia e a pesquisa contínua são cruciais para melhorar os resultados."
              />
              <ContentParagraph>
                A utilização de sistemas de IA, como o desenvolvido neste
                projeto, representa uma nova fronteira. A IA pode analisar dados
                para auxiliar no diagnóstico, sugerir tratamentos com base em
                casos anteriores e otimizar o monitoramento, capacitando os
                profissionais de saúde e melhorando os resultados para cada
                mulher.
              </ContentParagraph>
            </section>
          </article>

          <aside className="w-full lg:w-1/4 mt-12 lg:mt-0">
            <SideMenu />
          </aside>
        </div>
      </div>

      <footer className="w-full border-t border-gray-200 dark:border-gray-700 py-6 mt-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Meu Bebê e Eu. Todos os direitos
            reservados.
          </p>
          <p className="mt-1">
            Um projeto de monografia de Jefte Felino Quintion Sambango.
          </p>
        </div>
      </footer>
    </main>
  );
}
