// app/prevencao-tratamento/page.tsx
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
  Users,
  Heart,
  CheckCircle,
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
          href="#prevencao"
          className="block pl-4 text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 hover:border-pink-500 border-l-2 border-transparent -ml-px"
        >
          Prevenção
        </Link>
      </li>
      <li>
        <Link
          href="#tratamento"
          className="block pl-4 text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 hover:border-pink-500 border-l-2 border-transparent -ml-px"
        >
          Tratamento
        </Link>
      </li>
      <li>
        <Link
          href="#estudos"
          className="block pl-4 text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 hover:border-pink-500 border-l-2 border-transparent -ml-px"
        >
          Estudos Atuais
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

// Componente para um parágrafo de conteúdo
const ContentParagraph = ({ children }: { children: React.ReactNode }) => (
  <div
    className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6"
    data-aos="fade-up"
    data-aos-delay="100"
  >
    {children}
  </div>
);

// Componente para um subtítulo dentro de uma secção
const ContentSubHeader = ({ children }: { children: React.ReactNode }) => (
  <h4
    className="text-2xl font-bold text-gray-800 dark:text-white mt-10 mb-4"
    data-aos="fade-up"
  >
    {children}
  </h4>
);

// Componente para um cartão de informação
const InfoCard = ({
  title,
  children,
  icon: Icon,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ElementType;
}) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
    <div className="flex items-start">
      <div className="flex-shrink-0">
        <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-pink-100 dark:bg-pink-900/30">
          <Icon className="h-6 w-6 text-pink-600 dark:text-pink-400" />
        </div>
      </div>
      <div className="ml-4">
        <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h5>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {children}
        </div>
      </div>
    </div>
  </div>
);

const StatCard = ({
  title,
  statistic,
  description,
}: {
  title: string;
  statistic: string;
  description: string;
}) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
    <p className="text-sm font-semibold text-pink-600 dark:text-pink-400">
      {title}
    </p>
    <p className="text-4xl font-bold text-gray-900 dark:text-white mt-2">
      {statistic}
    </p>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
      {description}
    </p>
  </div>
);

// Componente para um item de lista detalhado
const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start">
    <div className="flex-shrink-0">
      <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
    </div>
    <div className="ml-3">
      <p className="text-base text-gray-700 dark:text-gray-300">{children}</p>
    </div>
  </li>
);

const SectionHeaderList = ({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) => (
  <div className="flex items-center mt-12 mb-6" data-aos="fade-right">
    <Icon className="h-8 w-8 text-pink-500" />
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white ml-4">
      {title}
    </h2>
  </div>
);

export default function PreventionAndTreatmentPage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 dark:bg-gray-900">
      {/* Cabeçalho Fixo */}
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
        {/* Título Principal da Página */}
        <div className="text-center mb-16" data-aos="fade-down">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
            Prevenção, Tratamento e Pesquisa
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            A fístula obstétrica é evitável e tratável. Conheça as estratégias e
            os avanços que trazem esperança a milhões de mulheres.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-16">
          {/* Conteúdo Principal */}
          <article className="w-full lg:w-3/4">
            {/* --- Secção 1: Prevenção --- */}
            <section id="prevencao">
              <SectionHeader
                icon={ShieldCheck}
                title="Prevenção: A Chave para Erradicar a Fístula"
                subtitle="A fístula obstétrica é quase inteiramente evitável. A prevenção é o pilar mais importante no combate a esta condição."
              />

              <ContentParagraph>
                A estratégia mais eficaz contra a fístula obstétrica não é o
                tratamento, mas sim a prevenção. Isto envolve uma abordagem
                multifacetada que aborda tanto as causas médicas diretas como as
                raízes sociais e económicas do problema.
              </ContentParagraph>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <InfoCard
                  title="Cuidados Pré-Natais de Qualidade"
                  icon={Stethoscope}
                >
                  <p>
                    O acompanhamento regular durante a gravidez permite
                    identificar fatores de risco, como uma pélvis estreita ou um
                    bebé grande, e planear um parto seguro.
                  </p>
                </InfoCard>
                <InfoCard title="Acesso a Partos Assistidos" icon={Users}>
                  <p>
                    Garantir que cada parto seja assistido por um profissional
                    de saúde qualificado (médico, enfermeiro ou parteira) é
                    fundamental para identificar e gerir um trabalho de parto
                    obstruído.
                  </p>
                </InfoCard>
                <InfoCard title="Cesarianas de Emergência" icon={Heart}>
                  <p>
                    O acesso rápido a uma cesariana quando o parto não progride
                    é a intervenção que salva tanto a vida da mãe como a do
                    bebé, e que previne a fístula.
                  </p>
                </InfoCard>
                <InfoCard title="Educação e Empoderamento" icon={BookOpen}>
                  <p>
                    Adiar a primeira gravidez, garantir a educação das raparigas
                    e o planeamento familiar são passos cruciais para reduzir o
                    risco de partos obstruídos em corpos que ainda não estão
                    totalmente desenvolvidos.
                  </p>
                </InfoCard>
              </div>
            </section>

            {/* --- Secção 2: Tratamento --- */}
            <section id="tratamento" className="mt-20">
              <SectionHeader
                icon={Stethoscope}
                title="Tratamento e Reabilitação"
                subtitle="A cirurgia reparadora oferece uma nova oportunidade de vida para as mulheres afetadas."
              />
              <div className="my-8" data-aos="zoom-in">
                <Image
                  src="/img/fistula2.jpg"
                  alt="Equipa cirúrgica a realizar uma operação"
                  width={800}
                  height={500}
                  className="rounded-2xl shadow-2xl object-cover w-full"
                />
              </div>
              <ContentSubHeader>Cirurgia Reparadora</ContentSubHeader>
              <ContentParagraph>
                O tratamento principal para a fístula obstétrica é a cirurgia
                reparadora. Realizada por um cirurgião especializado, o
                procedimento consiste em fechar a abertura anormal. Para
                fístulas simples, a taxa de sucesso pode ultrapassar os 90%.
                Casos mais complexos, que envolvem tecido cicatricial extenso ou
                danos significativos, podem exigir múltiplas cirurgias ou
                técnicas mais avançadas, como o uso de enxertos de tecido.
              </ContentParagraph>

              <ContentSubHeader>Abordagens Cirúrgicas</ContentSubHeader>
              <ContentParagraph>
                Existem duas abordagens principais: a **via vaginal**, que é a
                mais comum e menos invasiva, e a **via abdominal**
                (laparotomia), reservada para fístulas muito altas, complexas ou
                quando as tentativas anteriores falharam. A escolha da técnica
                depende da localização, tamanho e complexidade da fístula, bem
                como da experiência do cirurgião.
              </ContentParagraph>

              <ContentSubHeader>Reabilitação e Reintegração</ContentSubHeader>
              <ContentParagraph>
                A cura da fístula vai para além da cirurgia. O tratamento
                holístico inclui **fisioterapia pélvica** para recuperar a
                função muscular, **aconselhamento psicológico** para lidar com o
                trauma e a depressão, e **apoio à reintegração social e
                económica** para ajudar as mulheres a reconstruírem as suas
                vidas, livres do estigma e do isolamento.
              </ContentParagraph>
            </section>

            {/* --- Secção 3: Estudos Atuais e Inovação --- */}
            <section id="estudos" className="mt-20">
              <SectionHeader
                icon={Microscope}
                title="Estudos Atuais e o Futuro"
                subtitle="A inovação e a pesquisa contínua são cruciais para melhorar os resultados e erradicar a fístula."
              />
              <div className="my-12" data-aos="fade-up">
                <div className="aspect-w-16 h-96 rounded-xl overflow-hidden shadow-lg">
                  {/* Vídeo sobre Inovação em Saúde Global */}
                  <iframe
                    src="https://youtube.com/embed/xszHGTXhD00"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <p className="text-xs text-center text-gray-500 mt-2">
                  Vídeo: Playlist da OMS sobre inovação na saúde.
                </p>
              </div>
              <ContentSubHeader>
                Novas Técnicas Cirúrgicas e Materiais
              </ContentSubHeader>
              <ContentParagraph>
                A pesquisa continua a explorar novas técnicas cirúrgicas
                minimamente invasivas, como a laparoscopia, e o uso de
                biomateriais (como enxertos e selantes de fibrina) para melhorar
                as taxas de sucesso em casos complexos e reduzir as taxas de
                recidiva.
              </ContentParagraph>

              <ContentSubHeader>
                Relatório Oficial: Estudos e Avanços sobre a Fístula Obstétrica
                em Angola (2024–2025)
              </ContentSubHeader>
              <ContentParagraph>
                <div className="container mx-auto px-6 py-16 md:py-24 max-w-4xl">
                  {/* Título Principal */}
                  <div className="text-center mb-16" data-aos="fade-down">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                      A Luta Contra a Fístula Obstétrica em Angola
                    </h1>
                    <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                      Um relatório sobre a prevalência, os esforços de
                      tratamento e as perspetivas futuras no país.
                    </p>
                  </div>

                  {/* Introdução */}
                  <p
                    className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                    data-aos="fade-up"
                  >
                    A fístula obstétrica é uma lesão devastadora, mas os
                    esforços em Angola, liderados pelo Governo em parceria com
                    instituições como o CEML e o UNFPA, estão a trazer nova
                    esperança. Este relatório compila os dados e as iniciativas
                    mais recentes.
                  </p>

                  {/* Prevalência */}
                  <SectionHeaderList
                    icon={Users}
                    title="Prevalência em Angola"
                  />
                  <div data-aos="zoom-in">
                    <StatCard
                      title="Estimativa de Mulheres a Viver com Fístula"
                      statistic="10.000+"
                      description="Segundo dados do Ministério da Saúde (Maio 2025), este número reflete o resultado de décadas de partos sem a assistência adequada, especialmente em zonas rurais."
                    />
                  </div>

                  {/* Campanhas Cirúrgicas */}
                  <SectionHeaderList
                    icon={Heart}
                    title="Campanhas Cirúrgicas Recentes"
                  />
                  <div className="space-y-6">
                    <div
                      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                      data-aos="fade-left"
                    >
                      <h3 className="font-bold text-gray-800 dark:text-white">
                        Hospital Azancot de Menezes – Bié (Maio/Junho 2025)
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Meta de operar mais de 200 mulheres, devolvendo-lhes a
                        dignidade.
                      </p>
                    </div>
                    <div
                      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                      data-aos="fade-left"
                      data-aos-delay="100"
                    >
                      <h3 className="font-bold text-gray-800 dark:text-white">
                        Campanhas no Bié (2024)
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Em Janeiro, 81 cirurgias foram realizadas. Em Maio, a
                        11ª campanha previu operar mais 203 mulheres.
                      </p>
                    </div>
                    <div
                      className="p-6 bg-pink-50 dark:bg-pink-900/20 rounded-lg shadow-md"
                      data-aos="fade-left"
                      data-aos-delay="200"
                    >
                      <h3 className="font-bold text-pink-700 dark:text-pink-300">
                        Resultado Acumulado
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Cerca de 1.000 cirurgias reparadoras já foram realizadas
                        desde o início das campanhas nacionais.
                      </p>
                    </div>
                  </div>

                  {/* Pesquisas Científicas */}
                  <SectionHeaderList
                    icon={Microscope}
                    title="Pesquisas Científicas e Resultados"
                  />
                  <div
                    className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
                    data-aos="fade-up"
                  >
                    <p className="italic text-gray-600 dark:text-gray-300 mb-4">
                      "Um estudo conduzido no CEML entre 2011 e 2016 analisou
                      407 procedimentos em 243 mulheres, revelando fatores
                      críticos para o sucesso..."
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <StatCard
                        title="Taxa de Sucesso Geral"
                        statistic="42%"
                        description="Na primeira tentativa cirúrgica."
                      />
                      <StatCard
                        title="Chance de Cura em Reoperações"
                        statistic="5x Maior"
                        description="Mulheres que passaram por cirurgias subsequentes tiveram 5 vezes mais chances de cura."
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                      Este estudo destaca a importância do acompanhamento
                      contínuo e da especialização dos profissionais.
                    </p>
                  </div>

                  {/* Apoio e Desafios */}
                  <SectionHeaderList
                    icon={ShieldCheck}
                    title="Apoio, Desafios e o Futuro"
                  />
                  <ContentParagraph>
                    O apoio de parceiros internacionais como o **UNFPA** e a
                    **Fistula Foundation** tem sido vital, fornecendo
                    equipamento, formação e apoio institucional. No entanto,
                    Angola ainda enfrenta desafios como a carência de centros
                    especializados em todas as províncias e o estigma que impede
                    muitas mulheres de procurar tratamento.
                  </ContentParagraph>
                  
                </div>
              </ContentParagraph>
            
                   <div
                    className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg"
                    data-aos="fade-up"
                  >
                    <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">
                      Recomendações Futuras
                    </h4>
                    <ul className="space-y-2">
                      <ListItem>
                        Aumentar o número de campanhas cirúrgicas por província.
                      </ListItem>
                      <ListItem>
                        Investir na formação contínua de profissionais de saúde.
                      </ListItem>
                      <ListItem>
                        Fortalecer programas de prevenção através da educação.
                      </ListItem>
                      <ListItem>
                        Reforçar parcerias para apoio técnico e financeiro.
                      </ListItem>
                    </ul>
                  </div>
            </section>
            
          </article>

          {/* Menu Lateral */}
          <aside className="w-full lg:w-1/4 mt-12 lg:mt-0">
            <SideMenu />
          </aside>
        </div>
      </div>

      {/* Footer */}
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
