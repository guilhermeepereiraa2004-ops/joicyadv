import React, { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    Settings,
    LogOut,
    Menu,
    X,
    Scale,
    Bell
} from 'lucide-react';

interface DashboardProps {
    onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: DashboardProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-[#070707] flex text-zinc-300 font-sans">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#0d0d0d] border-r border-zinc-800 transition-all duration-300 flex flex-col z-50`}>
                <div className="p-6 flex items-center gap-4">
                    <div className="w-8 h-8 bg-white flex items-center justify-center shrink-0">
                        <Scale className="w-5 h-5 text-black" />
                    </div>
                    {isSidebarOpen && (
                        <div className="flex flex-col">
                            <span className="font-serif text-white font-bold text-sm tracking-wider">JOICY SANTOS</span>
                            <span className="text-[8px] text-zinc-500 uppercase tracking-widest">Admin</span>
                        </div>
                    )}
                </div>

                <nav className="flex-1 px-4 py-8 space-y-2">
                    <NavItem icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" active isOpen={isSidebarOpen} />
                    <NavItem icon={<Users className="w-5 h-5" />} label="Clientes" isOpen={isSidebarOpen} />
                    <NavItem icon={<Briefcase className="w-5 h-5" />} label="Processos" isOpen={isSidebarOpen} />
                    <NavItem icon={<Settings className="w-5 h-5" />} label="Configurações" isOpen={isSidebarOpen} />
                </nav>

                <div className="p-4 border-t border-zinc-800">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-4 px-4 py-3 text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all group"
                    >
                        <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        {isSidebarOpen && <span className="text-sm font-medium">Sair</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-[#0d0d0d]/50 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-8">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-zinc-800 text-zinc-400 transition-colors"
                    >
                        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-zinc-500 rounded-full border-2 border-[#0d0d0d]"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-6 border-l border-zinc-800">
                            <div className="text-right">
                                <p className="text-sm text-white font-medium">Dra. Joicy Santos</p>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Administrador</p>
                            </div>
                            <div className="w-10 h-10 bg-zinc-800 border border-zinc-700 flex items-center justify-center font-serif text-white italic">JS</div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Area */}
                <div className="p-10 overflow-auto">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="font-serif text-4xl text-white mb-2">Seja bem-vinda, Dra. Joicy.</h1>
                        <p className="text-zinc-500 text-sm mb-12">Aqui está o resumo do seu escritório para hoje.</p>

                        {/* Empty State placeholder for future modules */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <DashboardCard title="Clientes Totais" value="0" />
                            <DashboardCard title="Processos Ativos" value="0" />
                            <DashboardCard title="Novas Mensagens" value="0" />
                        </div>

                        <div className="bg-[#0d0d0d] border border-zinc-800 p-20 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
                                <LayoutDashboard className="w-8 h-8 text-zinc-700" />
                            </div>
                            <h3 className="text-white font-serif text-xl mb-4 italic">Módulos em Desenvolvimento</h3>
                            <p className="text-zinc-500 max-w-sm text-sm leading-relaxed">
                                Este espaço está reservado para as suas ferramentas administrativas. Os módulos serão adicionados em breve conforme as suas necessidades.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon, label, active = false, isOpen = true }: { icon: React.ReactNode, label: string, active?: boolean, isOpen?: boolean }) {
    return (
        <button className={`w-full flex items-center gap-4 px-4 py-3 transition-all group ${active ? 'bg-white text-black' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}`}>
            <span className={`${active ? 'text-black' : 'text-zinc-500 group-hover:text-white'} transition-colors`}>{icon}</span>
            {isOpen && <span className="text-sm font-medium">{label}</span>}
        </button>
    );
}

function DashboardCard({ title, value }: { title: string, value: string }) {
    return (
        <div className="bg-[#0d0d0d] border border-zinc-800 p-8 hover:border-zinc-700 transition-colors">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-4 font-bold">{title}</p>
            <p className="text-4xl text-white font-serif">{value}</p>
        </div>
    );
}
