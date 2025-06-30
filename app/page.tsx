// app/page.tsx
"use client";

import React, { useEffect, useState, useRef, useMemo } from 'react';
import Link from "next/link";
import Image from "next/image";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Heart, Stethoscope, Users, BrainCircuit, Menu, X, BarChart3, PieChart, LineChart, Target, BookOpen, ArrowRight, PencilLine } from 'lucide-react';

import { 
    ResponsiveContainer, 
    BarChart, 
    CartesianGrid, 
    XAxis, 
    YAxis, 
    Tooltip, 
    Legend, 
    Bar, 
    PieChart as RechartsPieChart, 
    Pie, 
    Cell,
    LineChart as RechartsLineChart,
    Line
} from 'recharts';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5500/api/v1';



const dadosGlobais = [
  { name: "Mulheres com Fístula", valor: 2000000 },
  { name: "Novos Casos/Ano", valor: 75000 },
];
const dadosDistribuicaoContinental = [
  { name: "África Subsariana", value: 65 },
  { name: "Ásia", value: 30 },
  { name: "Outras Regiões", value: 5 },
];
const dadosImpactoAngola = [
  { ano: "2020", casosNovos: 500 },
  { ano: "2022", casosNovos: 480 },
  { ano: "2024", casosNovos: 450 },
  { ano: "2026 (Proj.)", casosNovos: 350 },
  { ano: "2030 (Meta)", casosNovos: 150 },
];
const CORES_GRAFICO = ['#ec4899', '#f472b6', '#f9a8d4', '#fbcfe8'];


// --- Componentes ---
const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: React.ElementType, title: string, description: string, delay: string }) => (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transform transition-transform duration-300 hover:-translate-y-2" data-aos="fade-up" data-aos-delay={delay}>
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-pink-100 dark:bg-pink-900/30 mb-5">
            <Icon className="h-8 w-8 text-pink-600 dark:text-pink-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
);

const AnimatedStatCard = ({ icon: Icon, value, label, suffix = '', duration = 2000 }: {
    icon: React.ElementType,
    value: number,
    label: string,
    suffix?: string,
    duration?: number
}) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 } as any );

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            if (start === end) return;

            const totalFrames = duration / (1000 / 60); // Assumindo 60fps
            const increment = end / totalFrames;
            
            const timer = () => {
                start += increment;
                if (start < end) {
                    setCount(Math.ceil(start));
                    requestAnimationFrame(timer);
                } else {
                    setCount(end);
                }
            };
            requestAnimationFrame(timer);
        }
    }, [isInView, value, duration]);

    return (
        <div ref={ref} className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-xl text-center" data-aos="zoom-in">
            <Icon className="h-10 w-10 text-pink-500 mx-auto mb-3" />
            <p className="text-4xl md:text-5xl font-extrabold text-pink-600 dark:text-pink-400">
                {count.toLocaleString('pt-PT')}{suffix}
            </p>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-1">{label}</p>
        </div>
    );
};

// Hook auxiliar para verificar se o elemento está visível (para iniciar a animação)
const useInView = (ref: React.RefObject<Element>, options?: IntersectionObserverInit) => {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(entry.target);
                }
            },
            options
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                observer.disconnect();
            }
        };
    }, [ref, options]);

    return isInView;
};

const OfficialStatCard = ({ title, statistic, description, delay }: { title: string, statistic: string, description: string, delay: string }) => (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700" data-aos="fade-up" data-aos-delay={delay}>
        <h3 className="text-lg font-bold text-pink-500 uppercase tracking-wider">{title}</h3>
        <p className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white my-4">{statistic}</p>
        <p className="text-base text-gray-600 dark:text-gray-300">{description}</p>
    </div>
);

// --- Interfaces de Dados da API ---
interface StatResponse {
    totalSubmissoes?: number;
    distribuicaoJaOuviuFalar?: { name: string; value: number }[];
    distribuicaoTratavel?: { name: string; value: number }[];
    contagemCausas?: { name: string; value: number }[];
}

export default function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [stats, setStats] = useState<StatResponse | null>(null);
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 800, once: true, disable: 'phone' });

        const fetchStats = async () => {
            try {
                setLoadingStats(true);
                const response = await fetch(`${API_URL}/questionarios/stats`);
                if (!response.ok) throw new Error("Falha ao buscar estatísticas");
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Erro ao buscar estatísticas:", error);
                setStats(null);
            } finally {
                setLoadingStats(false);
            }
        };
        fetchStats();
    }, []);

    

    const percentagemConhecimento = useMemo(() => {
        if (!stats?.distribuicaoJaOuviuFalar) return 0;
        const total = stats.distribuicaoJaOuviuFalar.reduce((sum, item) => sum + item.value, 0);
        const sim = stats.distribuicaoJaOuviuFalar.find(item => item.name === 'sim')?.value || 0;
        return total > 0 ? Math.round((sim / total) * 100) : 0;
    }, [stats]);

    const percentagemCausaCorreta = useMemo(() => {
        if (!stats?.contagemCausas) return 0;
        const totalRespostasCausas = stats.contagemCausas.reduce((sum, item) => sum + item.value, 0);
        const causaCorreta = stats.contagemCausas.find(item => item.name === 'parto_prolongado')?.value || 0;
        return totalRespostasCausas > 0 ? Math.round((causaCorreta / totalRespostasCausas) * 100) : 0;
    }, [stats]);


    return (
        <main className="flex min-h-screen flex-col items-center">
            {/* Header */}
            <header className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
                <div className="container mx-auto flex items-center justify-between p-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src="/img/logo.png" alt="Logo Meu Bebê e Eu" width={40} height={40} className=' rounded-full' />
                        <span className="font-bold text-xl text-gray-800 dark:text-white">Meu Bebê e Eu</span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-8">
                                                <Link href="sobre-a-fistula" onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm text-gray-600 dark:text-gray-300">O Que é Fístula</Link>
                        <Link href="nossa-solucao" onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm text-gray-600 dark:text-gray-300">Nossa Solução</Link>
                        <Link href="prevencao-tratamento" onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm text-gray-600 dark:text-gray-300">Prevenção e tratamento</Link>
                    </nav>
                    <div className="hidden md:flex">
                        <Link href="/" className="bg-pink-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 shadow-md">
                            Portal do Profissional
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
                 {isMenuOpen && (
                    <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white dark:bg-gray-800">
                        <Link href="sobre-a-fistula" onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm text-gray-600 dark:text-gray-300">O Que é Fístula</Link>
                        <Link href="nossa-solucao" onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm text-gray-600 dark:text-gray-300">Nossa Solução</Link>
                        <Link href="prevencao-tratamento" onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm text-gray-600 dark:text-gray-300">Prevenção e tratamento</Link>
                        <Link href="/" className="block w-full text-center bg-pink-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold mt-2">
                           Portal do Profissional
                        </Link>
                    </div>
                )}
            </header>

            {/* Secção Hero */}
            <section className="relative w-full text-center py-24 md:py-36 bg-pink-50 dark:bg-gray-900 overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-b from-white via-pink-50 to-white dark:from-gray-900 dark:via-gray-800/10 dark:to-gray-900 opacity-80"></div>
                 <div className="container mx-auto px-4 relative z-10">
                    <h1 data-aos="fade-up" className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gray-900 dark:text-white">
                        Restaurando a Dignidade, <span className="text-pink-500">Uma Vida de Cada Vez.</span>
                    </h1>
                    <p data-aos="fade-up" data-aos-delay="200" className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                        Uma plataforma inovadora para o diagnóstico, tratamento e monitoramento da fístula obstétrica em Angola, com o apoio da Inteligência Artificial.
                    </p>
                    <div data-aos="fade-up" data-aos-delay="400" className="mt-10 flex justify-center gap-4">
                        <Link href="#solucao" className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-pink-700 transition-transform hover:scale-105 shadow-lg">
                            Conheça a Solução
                        </Link>
                    </div>
                </div>
            </section>

            {/* Secção: O Que é Fístula Obstétrica */}
            <section id="o-que-e" className="w-full py-20 md:py-28">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <div data-aos="fade-right">
                        <Image src="/img/fistula1.jpg" alt="Médica a analisar um exame" width={600} height={400} className="rounded-2xl shadow-2xl"/>
                    </div>
                    <div data-aos="fade-left">
                        <span className="text-sm font-bold uppercase text-pink-500 tracking-wider">O Problema</span>
                        <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-gray-900 dark:text-white">O que é a Fístula Obstétrica?</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            A fístula obstétrica é uma das lesões mais graves e trágicas que podem ocorrer durante o parto. É uma abertura anormal entre o canal de parto e a bexiga ou o reto, resultante de um trabalho de parto prolongado e obstruído, sem acesso a uma cesariana de emergência.
                        </p>
                        <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                            As mulheres que sobrevivem a esta provação ficam com incontinência crónica, o que frequentemente leva ao isolamento social, estigma e problemas de saúde mental. É uma condição tratável, mas a falta de acesso a cuidados de qualidade impede que muitas mulheres recuperem as suas vidas.
                        </p>
                    </div>
                </div>
            </section>

             <section id="estatisticas-oficiais" className="w-full py-20 md:py-24 bg-pink-600">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
                        <span className="text-sm font-bold uppercase text-pink-200 tracking-wider">A Realidade em Números</span>
                        <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-white">Uma Crise Global Silenciosa</h2>
                        <p className="mt-4 text-lg text-pink-100">
                            Dados da Organização Mundial da Saúde (OMS) e do Fundo de População das Nações Unidas (UNFPA) revelam a escala do problema da fístula obstétrica.
                        </p>
                    </div>
                    <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <OfficialStatCard 
                            title="Globalmente"
                            statistic="2 Milhões+"
                            description="É o número estimado de mulheres que vivem atualmente com fístula obstétrica não tratada, a maioria em África e na Ásia."
                            delay="100"
                        />
                        <OfficialStatCard 
                            title="Em África"
                            statistic="90%"
                            description="Cerca de 90% de todos os casos de fístula ocorrem no continente africano e no sul da Ásia, destacando a desigualdade no acesso a cuidados de saúde."
                            delay="200"
                        />
                        <OfficialStatCard 
                            title="Em Angola"
                            statistic="Crítica"
                            description="Com uma das mais altas taxas de mortalidade materna, Angola é um dos países onde a prevenção e o tratamento da fístula são mais urgentes."
                            delay="300"
                        />
                    </div>
                </div>
            </section>
            
            {/* Secção: Nossa Solução */}
            <section id="solucao" className="w-full py-20 md:py-28 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
                        <span className="text-sm font-bold uppercase text-pink-500 tracking-wider">Nossa Solução</span>
                        <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-gray-900 dark:text-white">Uma Plataforma Digital Integrada com IA</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            Em parceria com o Centro Evangélico de Medicina do Lubango (CEML), desenvolvemos um ecossistema de software para enfrentar este desafio, capacitando tanto as pacientes como os profissionais de saúde.
                        </p>
                    </div>
                    <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard 
                            icon={Heart} 
                            title="Apoio à Paciente" 
                            description="Um aplicativo mobile que guia a gestante, permitindo o registo de sintomas e a comunicação direta com os seus médicos."
                            delay="100"
                        />
                        <FeatureCard 
                            icon={Stethoscope} 
                            title="Dashboard Médico" 
                            description="Uma plataforma web para os profissionais de saúde gerirem o histórico clínico, acompanharem gravidezes e monitorarem casos de fístula."
                            delay="200"
                        />
                        <FeatureCard 
                            icon={BrainCircuit} 
                            title="Diagnóstico com IA" 
                            description="Um modelo de Inteligência Artificial treinado para analisar dados e fornecer uma segunda opinião no diagnóstico da fístula."
                            delay="300"
                        />
                        <FeatureCard 
                            icon={Users} 
                            title="Monitoramento Contínuo" 
                            description="Ferramentas para registar tratamentos e o seguimento pós-operatório, garantindo um cuidado completo e a longo prazo."
                            delay="400"
                        />
                    </div>
                </div>
            </section>

   <section id="questionario-cta" className="w-full py-20 md:py-24 bg-pink-600">
                <div className="container mx-auto px-4 text-center" data-aos="zoom-in">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/20 mb-4">
                         <PencilLine className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white">Ajude-nos a Mapear o Conhecimento</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-pink-100">
                        A sua opinião é fundamental. Responda ao nosso questionário anónimo para nos ajudar a compreender melhor a perceção pública sobre a fístula obstétrica e a direcionar os nossos esforços de sensibilização.
                    </p>
                    <div className="mt-10">
                        <Link href="/questionario" className="bg-white text-pink-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-pink-50 transition-transform hover:scale-105 shadow-lg inline-flex items-center">
                            Responder ao Questionário
                            <ArrowRight className="h-5 w-5 ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            
            {/* Secção de Estatísticas Dinâmicas */}
            <section id="estatisticas" className="w-full py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
                        <span className="text-sm font-bold uppercase text-pink-500 tracking-wider">Dados em Tempo Real</span>
                        <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-gray-900 dark:text-white">Perceção Pública Sobre a Fístula</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            Resultados agregados e anónimos das respostas ao nosso questionário, mostrando o nível de conhecimento da comunidade.
                        </p>
                    </div>
                     <div className="mt-16 grid md:grid-cols-3 gap-8">
                        {loadingStats ? (
                            <div className="text-center col-span-3"><p>A carregar estatísticas...</p></div>
                        ) : stats && stats.totalSubmissoes ? (
                            <>
                                <AnimatedStatCard icon={Users} value={stats.totalSubmissoes} label="Total de Respostas Recebidas" />
                                <AnimatedStatCard icon={BookOpen} value={percentagemConhecimento} suffix="%" label="Já ouviram falar sobre Fístula" />
                                <AnimatedStatCard icon={Target} value={percentagemCausaCorreta} suffix="%" label="Identificam a causa principal corretamente" />
                            </>
                        ) : (
                             <div className="text-center col-span-3"><p className="text-red-500">Não foi possível carregar as estatísticas no momento.</p></div>
                        )}
                    </div>
                </div>
            </section>
            
            {/* Secção de Contato/CTA Final */}
            <section id="contato" className="w-full py-20 md:py-28 bg-white dark:bg-gray-800">
                 <div className="container mx-auto px-4 text-center" data-aos="zoom-in">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Junte-se à Nossa Missão</h2>
                    <p className="mt-4 max-w-xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                        Se é um profissional de saúde, investigador ou uma organização interessada em colaborar, entre em contato ou aceda ao portal.
                    </p>
                     <div className="mt-10">
                        <Link href="/interece" className="bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-pink-700 transition-transform hover:scale-105 shadow-lg">
                            Mostrar intrerece 
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full border-t border-gray-200 dark:border-gray-700 py-8 bg-gray-100 dark:bg-gray-800">
                <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Meu Bebê e Eu. Todos os direitos reservados.</p>
                    <p className="mt-1">Um projeto de monografia de Jefte Felino Quintion Sambango.</p>
                </div>
            </footer>
        </main>
    );
}
