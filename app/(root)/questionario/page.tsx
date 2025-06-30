// app/questionario/page.tsx
"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle, PencilLine, User, Map, Heart } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5500/api/v1';

// --- Componentes do Formulário ---
const RadioGroup = ({ name, options, selectedValue, onChange, required=false }: any) => (
    <div className="space-y-3">
        {options.map((option: any) => (
            <label key={option.value} className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-2 border-transparent has-[:checked]:border-pink-500 has-[:checked]:bg-pink-50 dark:has-[:checked]:bg-pink-900/20 cursor-pointer transition-all">
                <input type="radio" name={name} value={option.value} checked={selectedValue === option.value} onChange={onChange} className="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300" required={required} />
                <span className="ml-4 text-base text-gray-700 dark:text-gray-200">{option.label}</span>
            </label>
        ))}
    </div>
);

const CheckboxGroup = ({ name, options, selectedValues, onChange }: any) => (
    <div className="space-y-3">
        {options.map((option: any) => (
            <label key={option.value} className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-2 border-transparent has-[:checked]:border-pink-500 has-[:checked]:bg-pink-50 dark:has-[:checked]:bg-pink-900/20 cursor-pointer transition-all">
                <input type="checkbox" name={name} value={option.value} checked={selectedValues.includes(option.value)} onChange={onChange} className="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"/>
                <span className="ml-4 text-base text-gray-700 dark:text-gray-200">{option.label}</span>
            </label>
        ))}
    </div>
);

const FormSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="py-8" data-aos="fade-up">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
        {children}
    </div>
);

const FormField = ({ label, children, icon: Icon }: { label: string, children: React.ReactNode, icon?: React.ElementType}) => (
    <div>
        <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {Icon && <Icon className="h-4 w-4 mr-2 text-gray-400" />}
            {label}
        </label>
        {children}
    </div>
);


export default function QuestionnairePage() {
    const [formData, setFormData] = useState({
        faixaEtaria: '', genero: '', provincia: '',
        jaOuviuFalar: '', definicao: '', causas: [] as string[],
        sintomas: [] as string[], tratavel: '', prevencao: [] as string[],
        informacaoAdicional: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name, checked } = e.target;
        const currentValues = formData[name as keyof typeof formData] as string[];
        if (checked) {
            setFormData(prev => ({ ...prev, [name]: [...currentValues, value] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: currentValues.filter(item => item !== value) }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_URL}/questionarios`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Falha ao enviar a sua resposta.");
            setSubmitted(true);
        } catch (err: any) {
            setError(err.message || "Ocorreu um erro. Por favor, tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6 text-center">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Obrigado!</h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                    A sua resposta foi submetida com sucesso e irá ajudar-nos a compreender melhor o nível de conhecimento sobre a fístula obstétrica.
                </p>
                <Link href="/" className="mt-8 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                    Voltar à Página Principal
                </Link>
            </div>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center bg-gray-100 dark:bg-gray-900">
            <header className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
                <div className="container mx-auto flex items-center justify-between p-4">
                    <Link href="/" className="text-lg font-medium text-gray-800 dark:text-white flex items-center hover:text-pink-600 transition-colors">
                        <ArrowLeft className="inline-block h-5 w-5 mr-2" /> Voltar
                    </Link>
                </div>
            </header>

            <div className="container mx-auto px-6 py-16 md:py-24 max-w-3xl">
                <div className="text-center mb-12" data-aos="fade-down">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-pink-100 dark:bg-pink-900/30 mb-4"><PencilLine className="h-8 w-8 text-pink-600 dark:text-pink-400" /></div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">Questionário de Conhecimento</h1>
                    <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Ajude-nos a avaliar a perceção pública sobre a Fístula Obstétrica. As suas respostas são anónimas.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-10 divide-y divide-gray-200 dark:divide-gray-700">
                    <FormSection title="Informações Demográficas (Opcional)">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* CORREÇÃO: Passando o componente (User) em vez do elemento (<User />) */}
                            <FormField label="Faixa Etária" icon={User}><select name="faixaEtaria" value={formData.faixaEtaria} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600"><option value="">Prefiro não dizer</option><option value="<18">&lt; 18 anos</option><option value="18-25">18-25 anos</option><option value="26-35">26-35 anos</option><option value="36-50">36-50 anos</option><option value=">50">&gt; 50 anos</option></select></FormField>
                            <FormField label="Gênero" icon={Heart}><select name="genero" value={formData.genero} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600"><option value="">Prefiro não dizer</option><option value="Feminino">Feminino</option><option value="Masculino">Masculino</option><option value="Outro">Outro</option></select></FormField>
                            <div className="sm:col-span-2">
                                <FormField label="Província (Angola)" icon={Map}><input type="text" name="provincia" value={formData.provincia} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600" placeholder="Ex: Huíla" /></FormField>
                            </div>
                        </div>
                    </FormSection>

                    <FormSection title="1. Já ouviu falar sobre Fístula Obstétrica?*">
                        <RadioGroup name="jaOuviuFalar" options={[{value: 'sim', label: 'Sim'}, {value: 'nao', label: 'Não'}]} selectedValue={formData.jaOuviuFalar} onChange={handleChange} required={true} />
                    </FormSection>

                    <FormSection title="2. Na sua opinião, o que é a fístula obstétrica?*">
                        <RadioGroup name="definicao" required={true} selectedValue={formData.definicao} onChange={handleChange} options={[
                            {value: 'infeccao', label: 'Uma infecção sexualmente transmissível.'},
                            {value: 'abertura', label: 'Uma abertura anormal entre o canal de parto e a bexiga ou o reto.'},
                            {value: 'complicacao_genetica', label: 'Uma complicação genética herdada.'},
                            {value: 'nao_sabe', label: 'Não sei / Não tenho a certeza.'}
                        ]}/>
                    </FormSection>
                    
                    <FormSection title="3. Quais acredita que são as principais causas? (Pode selecionar várias)">
                        <CheckboxGroup name="causas" selectedValues={formData.causas} onChange={handleCheckboxChange} options={[
                            {value: 'parto_prolongado', label: 'Trabalho de parto prolongado e sem assistência'},
                            {value: 'falta_higiene', label: 'Falta de higiene pessoal'},
                            {value: 'esforco_fisico', label: 'Levantar objetos pesados durante a gravidez'},
                            {value: 'cirurgia_mal_sucedida', label: 'Complicações de uma cesariana ou outra cirurgia'}
                        ]} />
                    </FormSection>

                    <FormSection title="4. Na sua opinião, a fístula obstétrica tem tratamento?*">
                        <RadioGroup name="tratavel" required={true} selectedValue={formData.tratavel} onChange={handleChange} options={[
                            {value: 'sim', label: 'Sim, através de cirurgia'},
                            {value: 'nao', label: 'Não, é uma condição permanente'},
                            {value: 'nao_sei', label: 'Não sei / Não tenho a certeza'}
                        ]} />
                    </FormSection>
                    
                    <div className="pt-8">
                        <button type="submit" disabled={loading} className="w-full flex items-center justify-center bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:bg-pink-400 disabled:cursor-not-allowed">
                            {loading ? <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : <><Send className="h-5 w-5 mr-2" /> Enviar Respostas</>}
                        </button>
                        {error && <p className="text-sm text-red-500 text-center mt-4">{error}</p>}
                    </div>
                </form>
            </div>
        </main>
    );
}
