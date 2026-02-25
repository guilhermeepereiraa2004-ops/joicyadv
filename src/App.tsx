import React, { useState, useEffect, useRef } from 'react';
import {
  Scale,
  ShieldAlert,
  Phone,
  Clock,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  ChevronRight,
  Menu,
  X,
  Gavel,
  Lock
} from 'lucide-react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

// --- UTILITÁRIOS DE ANIMAÇÃO ---
const useElementOnScreen = (options: IntersectionObserverInit) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible] as const;
};

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }: FadeInProps) => {
  const [ref, isVisible] = useElementOnScreen({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  const getDirectionClasses = () => {
    switch (direction) {
      case 'up': return 'translate-y-12';
      case 'down': return '-translate-y-12';
      case 'left': return 'translate-x-12';
      case 'right': return '-translate-x-12';
      default: return 'translate-y-12';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${getDirectionClasses()}`
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Estado para controle do Admin
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Atalho secreto para admin: Alt + A
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'a') {
        setIsAdminMode(prev => !prev);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Se estiver em modo admin
  if (isAdminMode) {
    if (!isLoggedIn) {
      return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
    }
    return <AdminDashboard onLogout={() => {
      setIsLoggedIn(false);
      setIsAdminMode(false);
    }} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-zinc-100 selection:text-black">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-display { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        .bg-hero-pattern {
          background-image: url('/foto-1.jpg');
          background-size: cover;
          background-position: center bottom;
          background-repeat: no-repeat;
          background-color: #0a0a0a;
        }

        .reveal-wrapper {
          position: relative;
          z-index: 10;
          background-color: #0a0a0a;
          margin-bottom: 100vh;
        }
        @media (min-width: 768px) {
          .reveal-wrapper {
            margin-bottom: 500px;
          }
        }
        .reveal-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 0;
          height: 100vh;
        }
        @media (min-width: 768px) {
          .reveal-footer {
            height: 500px;
          }
        }
      `}} />

      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md py-4 border-b border-zinc-800/50' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <span className="font-serif text-2xl text-white font-bold tracking-wider">JOICY SANTOS</span>
            <span className="text-[10px] tracking-[0.3em] text-zinc-400 uppercase">Advocacia Criminal</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {['Atuação', 'Sobre', 'Diferenciais'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm tracking-widest uppercase text-zinc-400 hover:text-white transition-colors duration-300"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => setIsAdminMode(true)}
              className="text-sm tracking-widest uppercase text-zinc-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
            >
              Admin
            </button>
            <a
              href="https://wa.me/557382138219"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-2.5 bg-white text-black text-sm uppercase tracking-widest font-semibold overflow-hidden flex items-center gap-2"
            >
              <div className="absolute inset-0 w-0 bg-zinc-200 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              <span className="relative z-10">Entre em contato conosco</span>
              <ShieldAlert className="w-4 h-4 relative z-10" />
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className={`md:hidden absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-zinc-800 transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96 py-6' : 'max-h-0 py-0 border-transparent'}`}>
          <div className="flex flex-col items-center space-y-6">
            {['Atuação', 'Sobre', 'Diferenciais'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm tracking-widest uppercase text-zinc-400 hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminMode(true);
              }}
              className="text-sm tracking-widest uppercase text-zinc-400 hover:text-white transition-colors"
            >
              Admin
            </button>
            <a
              href="https://wa.me/557382138219"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-black text-sm uppercase tracking-widest font-semibold flex items-center gap-2"
            >
              Entre em contato conosco <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      <main className="reveal-wrapper shadow-[0_20px_50px_rgba(0,0,0,1)]">
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern blur-[4px] scale-105"></div>
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <FadeIn delay={100}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-[1px] w-12 bg-zinc-500"></div>
                  <span className="text-zinc-400 uppercase tracking-[0.2em] text-xs">Defesa Técnica e Implacável</span>
                </div>
              </FadeIn>

              <FadeIn delay={300}>
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-8">
                  A sua liberdade<br />
                  <span className="text-zinc-400 italic">é a nossa</span><br />
                  prioridade.
                </h1>
              </FadeIn>

              <FadeIn delay={500}>
                <p className="text-lg md:text-xl text-white max-w-xl mb-12 font-medium leading-relaxed">
                  Atuação especializada em Direito Penal. Estratégia, descrição e agilidade nos momentos em que você mais precisa de segurança.
                </p>
              </FadeIn>

              <FadeIn delay={700}>
                <div className="flex flex-col sm:flex-row gap-6">
                  <a
                    href="https://wa.me/557382138219"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-8 py-4 bg-white text-black overflow-hidden flex items-center justify-center gap-3"
                  >
                    <div className="absolute inset-0 w-0 bg-zinc-200 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                    <Phone className="w-5 h-5 relative z-10" />
                    <span className="relative z-10 uppercase tracking-widest text-sm font-semibold">Nosso WhatsApp</span>
                  </a>
                  <button
                    onClick={() => scrollToSection('atuação')}
                    className="px-8 py-4 border border-zinc-700 text-white hover:bg-zinc-900 transition-colors uppercase tracking-widest text-sm flex items-center justify-center gap-3"
                  >
                    Áreas de Atuação
                  </button>
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-[10px] tracking-widest uppercase text-zinc-500 mb-2">Scroll</span>
            <div className="w-[1px] h-8 bg-zinc-700 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[scrollLine_2s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </section>

        <section id="sobre" className="py-32 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-zinc-200 z-0"></div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-zinc-200 z-0"></div>

                  <div className="relative z-10 transition-all duration-1000">
                    <img
                      src="/foto-doutora.jpg"
                      alt="Dra. Joicy Santos"
                      className="w-full h-[600px] object-cover object-top shadow-xl"
                    />
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="left" delay={200}>
                <div className="flex flex-col gap-4 mb-10">
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-12 bg-zinc-400"></div>
                    <span className="text-zinc-500 uppercase tracking-[0.4em] text-[10px] font-bold">Trajetória e Defesa</span>
                  </div>
                  <h2 className="font-serif text-5xl md:text-7xl text-black leading-[1.05] font-semibold tracking-tight">
                    Sobre a <br />
                    <span className="text-zinc-500">Dra. Joicy Santos</span>
                  </h2>
                </div>
                <div className="font-sans text-lg text-zinc-600 mb-8 border-l-2 border-zinc-200 pl-6 py-2">
                  Dedicação exclusiva e incansável à defesa dos seus direitos fundamentais.
                </div>
                <div className="space-y-6 text-zinc-700 font-light leading-relaxed">
                  <p>
                    A <strong>Dra. Joicy Santos</strong> é uma advogada criminalista com uma trajetória pautada pela garantia do processo legal e pela defesa intransigente das liberdades individuais. Sua atuação é reconhecida pela combatividade, rigor técnico e dedicação extrema aos clientes.
                  </p>
                  <p>
                    Compreendendo que a defesa criminal exige mais do que apenas conhecimento da lei, a Dra. Joicy alia sua expertise a uma postura humana e empática. Sua missão é guiar e proteger o cliente com estratégias impecáveis nos momentos mais complexos e vulneráveis de sua vida.
                  </p>
                  <p>
                    Com vasta experiência prática, atua de forma combativa desde a fase de inquérito policial e flagrantes até as sustentações orais nas instâncias superiores (STJ e STF), assegurando que todo indivíduo tenha uma defesa justa, energética e sob o sigilo mais absoluto.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="bg-white pb-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
              <FadeIn delay={100} className="py-12 flex flex-col items-center text-center px-6 h-full">
                <div className="h-20 flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-black stroke-1" />
                </div>
                <h3 className="font-serif text-xl text-black mb-4 min-h-[3rem] flex items-center justify-center">Sigilo Absoluto</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">Privacidade total garantida do início ao fim do seu caso.</p>
              </FadeIn>
              <FadeIn delay={300} className="py-12 flex flex-col items-center text-center px-6 h-full">
                <div className="h-20 flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-black stroke-1" />
                </div>
                <h3 className="font-serif text-xl text-black mb-4 min-h-[3rem] flex items-center justify-center">Atendimento 24 horas por dia, 7 dias por semana.</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">Plantão criminal especializado para acompanhamento em flagrante.</p>
              </FadeIn>
              <FadeIn delay={500} className="py-12 flex flex-col items-center text-center px-6 h-full">
                <div className="h-20 flex items-center justify-center mb-4">
                  <Scale className="w-8 h-8 text-black stroke-1" />
                </div>
                <h3 className="font-serif text-xl text-black mb-4 min-h-[3rem] flex items-center justify-center">Atuação Estratégica</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">Análise minuciosa e defesa técnica personalizada em tribunais.</p>
              </FadeIn>
            </div>
          </div>
        </section>

        <section id="atuação" className="py-32 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <FadeIn className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Áreas de Atuação</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
                Foco exclusivo em Direito Penal, oferecendo especialização especializada em todas as fases do processo e em diversas complexidades.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Plantão Criminal 24h', desc: 'Atendimento emergencial em delegacias, acompanhamento de prisões em flagrante e audiências de custódia.' },
                { title: 'Tribunal do Júri', desc: 'Defesa técnica e combativa em crimes dolorosos contra a vida, com atuação estratégica em plenário.' },
                { title: 'Habeas Corpus', desc: 'A impetração de medidas urgentes transfere a garantia da liberdade de locomoção em todas as instâncias.' },
                { title: 'Crimes Econômicos', desc: 'Defesa especializada em crimes contra a ordem tributária, lavagem de dinheiro e corrupção.' },
                { title: 'Direito Penal Médico', desc: 'Atuação na defesa dos profissionais da saúde em casos de supostos erros médicos e negligência.' },
                { title: 'Crimes Cibernéticos', desc: 'Defesa focada em fraudes digitais, invasão de dispositivos e outros crimes cometidos no ambiente virtual.' },
              ].map((service, idx) => (
                <FadeIn key={idx} delay={idx * 100}>
                  <div className="group relative p-10 border border-zinc-900 bg-[#0d0d0d] hover:border-zinc-700 transition-all duration-500 h-full flex flex-col">
                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full"></div>
                    <Gavel className="w-10 h-10 text-white mb-8 stroke-[1px] transition-transform duration-500 group-hover:scale-110" />
                    <h3 className="font-serif text-2xl text-white mb-4 leading-tight">{service.title}</h3>
                    <div className="h-[1px] w-12 bg-zinc-800 mb-6 transition-all duration-500 group-hover:w-20 group-hover:bg-zinc-500"></div>
                    <p className="text-zinc-500 text-sm font-light leading-relaxed mb-4">{service.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section id="diferenciais" className="relative py-40 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <div className="flex justify-center items-center gap-6 mb-10">
                  <div className="h-[1px] w-16 bg-zinc-200"></div>
                  <span className="font-serif text-lg md:text-xl text-zinc-900 italic tracking-wider font-medium">Urgência e Defesa Técnica</span>
                  <div className="h-[1px] w-16 bg-zinc-200"></div>
                </div>

                <h2 className="font-display text-4xl md:text-6xl text-black mb-10 leading-tight">
                  Não enfrente a justiça <br />
                  <span className="italic text-zinc-500">sem uma defesa forte.</span>
                </h2>

                <p className="text-zinc-600 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                  Se você ou um familiar está enfrentando problemas criminais, o tempo é o fator mais crítico. Nossa equipe está pronta para intervir agora.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <a
                    href="https://wa.me/557382138219"
                    className="group relative px-10 py-5 bg-black text-white overflow-hidden flex items-center justify-center gap-3 transition-transform duration-300 hover:scale-105"
                  >
                    <div className="absolute inset-0 w-0 bg-zinc-800 transition-all duration-[300ms] ease-out group-hover:w-full"></div>
                    <span className="relative z-10 uppercase tracking-[0.2em] text-xs font-bold">Falar com Advogada Agora</span>
                    <ChevronRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      <footer className="reveal-footer bg-zinc-950 flex flex-col justify-between pt-20 pb-10 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <span className="font-serif text-3xl text-white font-bold tracking-wider block mb-2">JOICY SANTOS</span>
              <span className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase block mb-8">Advocacia Criminal</span>
              <p className="text-zinc-500 text-sm max-w-sm">
                Defesa técnica, estratégica e implacável. Atendimento com sigilo absoluto e disponibilidade 24 horas para urgências criminais.
              </p>
            </div>

            <div>
              <h4 className="text-white uppercase tracking-widest text-xs font-semibold mb-6">Contato Direto</h4>
              <ul className="space-y-4">
                <li>
                  <a href="https://wa.me/557382138219" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4" /> (73) 8213-8219
                  </a>
                </li>
                <li>
                  <a href="#" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4" /> contato@joicysantos.adv.br
                  </a>
                </li>
                <li>
                  <div className="text-zinc-400 flex items-start gap-3 text-sm">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>Uruçuca - Bahia</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white uppercase tracking-widest text-xs font-semibold mb-6">Redes Sociais</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-600 text-xs text-center md:text-left">
              &copy; {new Date().getFullYear()} Joicy Santos Advocacia. Todos os direitos reservados.
            </p>
            <p className="text-zinc-600 text-xs">
              OAB/SP 123.456
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
