import React, { useState } from 'react';
import { Lock, Mail, ChevronRight, Scale } from 'lucide-react';

interface LoginProps {
    onLogin: () => void;
}

export default function AdminLogin({ onLogin }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulação de login conforme solicitado
        setTimeout(() => {
            if (email === 'joicy@gmail.com' && password === '123456') {
                onLogin();
            } else {
                setError('Credenciais inválidas. Verifique seu e-mail e senha.');
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full">
                {/* Logo/Icon */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-white flex items-center justify-center mb-4">
                        <Scale className="w-8 h-8 text-black stroke-[1.5px]" />
                    </div>
                    <h1 className="font-serif text-3xl text-white tracking-wider">JOICY SANTOS</h1>
                    <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mt-2">Painel Administrativo</p>
                </div>

                <div className="bg-[#0d0d0d] border border-zinc-800 p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                    {/* Decorative element */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-zinc-500 to-transparent opacity-50"></div>

                    <h2 className="text-xl text-white font-serif mb-8 text-center italic">Acesso Restrito</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 font-bold">E-mail</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black border border-zinc-800 py-3 pl-10 pr-4 text-white text-sm focus:border-zinc-500 transition-colors outline-none"
                                    placeholder="exemplo@gmail.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 font-bold">Senha</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black border border-zinc-800 py-3 pl-10 pr-4 text-white text-sm focus:border-zinc-500 transition-colors outline-none"
                                    placeholder="••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-500 text-xs mt-2 text-center animate-pulse">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full group relative px-8 py-4 bg-white text-black overflow-hidden flex items-center justify-center gap-3 transition-transform duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                        >
                            <div className="absolute inset-0 w-0 bg-zinc-200 transition-all duration-[300ms] ease-out group-hover:w-full"></div>
                            <span className="relative z-10 uppercase tracking-[0.2em] text-xs font-bold">
                                {isLoading ? 'Autenticando...' : 'Entrar no Sistema'}
                            </span>
                            {!isLoading && <ChevronRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-zinc-600 text-[10px] tracking-widest uppercase">
                    &copy; {new Date().getFullYear()} Joicy Santos Advocacia
                </p>
            </div>
        </div>
    );
}
