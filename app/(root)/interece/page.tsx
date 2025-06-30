// app/manifestacao-interesse/page.tsx
"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import Link from "next/link";
import { ArrowLeft, Mail, User, MessageSquare, Send, CheckCircle, Building, Briefcase } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5500/api/v1';

export default function ManifestacaoInteressePage() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        organizacao: '', // Novo campo
        cargo: '',       // Novo campo
        mensagem: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // A chamada à API agora está a funcionar e a apontar para o endpoint correto
            const response = await fetch(`${API_URL}/questionarios/email/interece`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Falha ao enviar a sua mensagem. Tente novamente.");
            }
            
            setSubmitted(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-pink-900/10 dark:via-gray-900 dark:to-blue-900/10 -z-10"></div>
            
            <div className="w-full max-w-2xl" data-aos="fade-up">
                <div className="mb-8">
                    <Link href="/" className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center hover:text-pink-500 transition-colors">
                        <ArrowLeft className="inline-block h-4 w-4 mr-2" />
                        Voltar à Página Principal
                    </Link>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-pink-200/50 dark:hover:shadow-pink-800/50">
                    {submitted ? (
                        <div className="p-12 text-center flex flex-col items-center justify-center h-96">
                            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Obrigado!</h1>
                            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                                A sua manifestação de interesse foi enviada com sucesso. Entraremos em contato consigo em breve.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manifeste o Seu Interesse</h1>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">
                                    Se é um profissional de saúde, gestor de uma clínica ou hospital, e tem interesse em usar as nossas aplicações, por favor, preencha o formulário abaixo.
                                </p>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="relative">
                                    <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                    <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none" placeholder="Seu Nome Completo" />
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none" placeholder="Seu Email de Contato" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="relative">
                                        <Building className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                        <input type="text" id="organizacao" name="organizacao" value={formData.organizacao} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none" placeholder="Organização (Opcional)" />
                                    </div>
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                        <input type="text" id="cargo" name="cargo" value={formData.cargo} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none" placeholder="Seu Cargo (Opcional)" />
                                    </div>
                                </div>
                                <div className="relative">
                                    <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                    <textarea id="mensagem" name="mensagem" value={formData.mensagem} onChange={handleChange} rows={4} className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none resize-none" placeholder="Deixe uma mensagem (opcional)..." />
                                </div>
                            </div>
                            
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            
                            <div>
                                <button type="submit" disabled={loading} className="w-full flex items-center justify-center bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:bg-pink-400 disabled:cursor-not-allowed">
                                    {loading ? (<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>) : (<><Send className="h-5 w-5 mr-2" /> Enviar Manifestação</>)}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
}
