// app/nossa-solucao/page.tsx
"use client";

import React, { useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Smartphone, LayoutDashboard, BrainCircuit, DatabaseZap, Stethoscope, Heart } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Componente para um cabeçalho de secção
const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="text-center mb-16" data-aos="fade-up">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-2 tracking-tight">
            {title}
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            {subtitle}
        </p>
    </div>
);

// Componente para um cartão de componente da solução
const SolutionComponentCard = ({ 
    icon: Icon, 
    title, 
    description, 
    mediaContent, // Pode ser uma imagem ou um vídeo
    reverse = false 
}: { 
    icon: React.ElementType, 
    title: string, 
    description: React.ReactNode,
    mediaContent: React.ReactNode,
    reverse?: boolean
}) => (
    <div className={`grid md:grid-cols-2 gap-12 items-center`}>
        <div className={`w-full h-80 relative rounded-2xl shadow-2xl overflow-hidden ${reverse ? 'md:order-last' : ''}`} data-aos={reverse ? "fade-left" : "fade-right"}>
            {mediaContent}
        </div>
        <div className={`${reverse ? 'md:order-first' : ''}`} data-aos={reverse ? "fade-right" : "fade-left"}>
            <div className="inline-flex items-center gap-3 mb-4">
                <Icon className="h-8 w-8 text-pink-500" />
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{title}</h3>
            </div>
            <div className="space-y-4 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {description}
            </div>
        </div>
    </div>
);

export default function NossaSolucaoPage() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center bg-white dark:bg-gray-900">
            {/* Cabeçalho Fixo */}
            <header className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
                <div className="container mx-auto flex items-center justify-between p-4">
                    <Link href="/" className="text-lg font-medium text-gray-800 dark:text-white flex items-center hover:text-pink-600 transition-colors">
                        <ArrowLeft className="inline-block h-5 w-5 mr-2" />
                        Voltar à Página Principal
                    </Link>
                    <Link href="/" className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-pink-700 transition-colors">
                        Portal do Profissional
                    </Link>
                </div>
            </header>

            <div className="container mx-auto px-6 py-16 md:py-24">
                <SectionHeader 
                    title="A Nossa Solução Tecnológica"
                    subtitle="Um ecossistema digital integrado para transformar o cuidado da saúde materna e combater a fístula obstétrica em Angola."
                />
                
                <div className="space-y-24 md:space-y-32 mt-12">
                    {/* Componente 1: API Central */}
                    <SolutionComponentCard
                        icon={DatabaseZap}
                        title="API Central e Base de Dados"
                        description={
                            <>
                                <p>O coração do sistema é uma API RESTful robusta, construída com Node.js e Express.js. Ela centraliza toda a lógica de negócio e comunica-se com uma base de dados MongoDB, garantindo que os dados sejam consistentes, seguros e acessíveis por todas as nossas aplicações.</p>
                                <ul className="list-disc list-inside mt-4 space-y-2">
                                    <li><strong>Segurança:</strong> Autenticação baseada em JWT e encriptação de dados sensíveis.</li>
                                    <li><strong>Escalabilidade:</strong> Pronta para crescer à medida que mais pacientes e profissionais aderem.</li>
                                    <li><strong>Fonte Única de Verdade:</strong> Garante a integridade dos dados clínicos em todo o ecossistema.</li>
                                </ul>
                            </>
                        }
                        mediaContent={ <Image src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1934" alt="Ilustração de servidores e bases de dados" layout="fill" objectFit="cover" /> }
                    />
                    
                    {/* Componente 2: Aplicativo Mobile */}
                    <SolutionComponentCard
                        icon={Smartphone}
                        title="Aplicativo Mobile: Meu Bebê e Eu"
                        description={
                            <>
                                <p>Uma aplicação móvel para a gestante, focada no empoderamento e no acompanhamento ativo da sua saúde. Permite que a paciente seja uma parceira nos seus próprios cuidados.</p>
                                <ul className="list-disc list-inside mt-4 space-y-2">
                                    <li><strong>Diário de Saúde:</strong> Registo de sintomas, humor e notas importantes.</li>
                                    <li><strong>Comunicação Direta:</strong> Um canal seguro para conversar com o médico responsável.</li>
                                    <li><strong>Acompanhamento Interativo:</strong> Visualização da evolução do bebé e contagem de movimentos fetais.</li>
                                    <li><strong>Educação:</strong> Acesso a guias de cuidado e alertas informativos.</li>
                                </ul>
                            </>
                        }
                        mediaContent={ <Image src="/img/app.png" alt="Pessoa a utilizar um smartphone com foco em saúde" layout="fill" objectFit="contain" /> }
                        reverse={true}
                    />

                    {/* Componente 3: Dashboards Web */}
                     <SolutionComponentCard
                        icon={LayoutDashboard}
                        title="Dashboards Web para Profissionais"
                        description={
                            <>
                                <p>Duas plataformas web distintas para equipar os profissionais de saúde do CEML com as ferramentas necessárias para um cuidado mais eficiente e baseado em dados.</p>
                                <ul className="list-disc list-inside mt-4 space-y-2">
                                    <li><strong>Dashboard Geral:</strong> Para a gestão do dia-a-dia, acompanhamento pré-natal e comunicação com as pacientes.</li>
                                    <li><strong>Dashboard de Fístula:</strong> Uma ferramenta especializada para o registo detalhado de casos, gestão de tratamentos, monitoramento pós-operatório e, crucialmente, interação com os modelos de IA.</li>
                                </ul>
                            </>
                        }
                        mediaContent={ <Image src="/img/website.png" alt="Profissional de saúde a trabalhar num computador com gráficos e dados" layout="fill" objectFit="cover" /> }
                    />

                    {/* Componente 4: Inteligência Artificial */}
                     <SolutionComponentCard
                        icon={BrainCircuit}
                        title="O Poder da Inteligência Artificial"
                        description={
                            <>
                                <p>O componente mais inovador do projeto. Usamos modelos de Machine Learning, treinados com dados clínicos, para funcionar como um sistema de apoio à decisão para os médicos.</p>
                                <ul className="list-disc list-inside mt-4 space-y-2">
                                    <li><strong>Auxílio ao Diagnóstico:</strong> Analisa os dados de um novo caso e sugere um diagnóstico provável, ajudando a acelerar a triagem.</li>
                                    <li><strong>Sugestão de Tratamento:</strong> Com base no perfil completo do caso, o modelo recomenda a abordagem terapêutica com a maior probabilidade de sucesso.</li>
                                    <li><strong>Aprendizagem Contínua:</strong> O sistema está desenhado para que os modelos possam ser retreinados com novos dados, tornando-se cada vez mais precisos.</li>
                                </ul>
                            </>
                        }
                        mediaContent={ 
                            <Image src="/img/ia.png" alt="Profissional de saúde a trabalhar num computador com gráficos e dados" layout="fill" objectFit="cover" /> 
                         }
                      
                    />
                </div>
            </div>

            {/* Nova Secção: Testemunhos */}
            <section id="testemunhos" className="w-full py-20 md:py-28 bg-gray-100 dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">O Impacto na Prática Clínica</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                           A tecnologia ao serviço de quem cuida e de quem precisa de cuidado.
                        </p>
                    </div>
                    <div className="mt-16 grid md:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg" data-aos="fade-right">
                            <p className="text-gray-600 dark:text-gray-300 italic text-lg leading-relaxed">"Com esta ferramenta, temos uma visão completa do histórico da paciente num único local. A capacidade de receber uma sugestão da IA baseada em dados ajuda-nos a tomar decisões mais informadas e a otimizar o plano de tratamento para cada mulher. É um passo gigante para o cuidado da fístula em Angola."</p>
                            <div className="mt-6 flex items-center">
                                <Stethoscope className="h-10 w-10 text-pink-500"/>
                                <div className="ml-4">
                                    <p className="font-bold text-gray-900 dark:text-white">Dr. Exemplo</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Cirurgião de Fístula, CEML</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg" data-aos="fade-left" data-aos-delay="200">
                            <p className="text-gray-600 dark:text-gray-300 italic text-lg leading-relaxed">"Saber que posso enviar uma mensagem ao meu médico a qualquer momento e registar como me sinto no diário deu-me uma segurança que nunca tive antes. Acompanhar a evolução do meu bebé semana a semana trouxe muita alegria à minha gravidez. Senti-me verdadeiramente cuidada."</p>
                             <div className="mt-6 flex items-center">
                                <Heart className="h-10 w-10 text-pink-500"/>
                                <div className="ml-4">
                                    <p className="font-bold text-gray-900 dark:text-white">Maria (nome fictício)</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Paciente Acompanhada</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full border-t border-gray-200 dark:border-gray-700 py-6 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Meu Bebê e Eu. Todos os direitos reservados.</p>
                    <p className="mt-1">Um projeto de monografia de Jefte Felino Quintion Sambango.</p>
                </div>
            </footer>
        </main>
    );
}
