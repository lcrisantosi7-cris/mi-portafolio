import React from 'react'
import { Link } from 'react-router-dom'
import { Rocket, ChevronRight } from 'lucide-react'

const Home = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-brand-dark">
      {/* Elementos decorativos de fondo con tus nuevas clases de marca */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-miku/10 blur-[120px] rounded-full animate-float"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-vite/10 blur-[120px] rounded-full animate-float" style={{ animationDelay: '-5s' }}></div>

      <div className="relative z-10 text-center max-w-5xl">
        {/* Badge Tech - Ahora con animación de entrada */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-miku/30 bg-brand-miku/5 text-brand-miku text-xs font-bold tracking-widest uppercase mb-8 animate-fade-in">
          <Rocket size={14} className="animate-bounce" /> Available for New Projects
        </div>

        {/* Título Principal con Gradiente Semántico */}
        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black mb-8 leading-none tracking-tighter animate-fade-in">
          <span className="block text-white opacity-90">LUIS ANGEL</span>
          <span className="block bg-gradient-to-r from-brand-miku via-brand-vite to-brand-pink bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
            CRISANTO
          </span>
        </h1>
        
        <div className="space-y-6 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-xl md:text-3xl text-brand-miku font-mono tracking-tighter">
            &gt; Software Engineer // Full Stack Developer_
          </p>
          
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Especializado en <span className="text-white font-semibold">Arquitectura Cloud</span> y soluciones escalables. 
            Actualmente cursando el 7mo ciclo en la UCV, transformando lógica compleja en experiencias digitales excepcionales.
          </p>
        </div>

        {/* Botones de Acción con Sombras de Marca */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Link 
            to="/contact" 
            className="group relative w-full sm:w-auto px-10 py-4 bg-brand-miku text-brand-dark font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(57,197,187,0.3)] hover:shadow-[0_0_50px_rgba(57,197,187,0.5)]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              TRABAJEMOS JUNTOS <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          
          <Link 
            to="/projects" 
            className="w-full sm:w-auto px-10 py-4 border-2 border-white/10 text-white font-black rounded-2xl hover:bg-white/5 hover:border-brand-miku/50 transition-all backdrop-blur-sm"
          >
            VER PORTAFOLIO
          </Link>
        </div>
      </div>

      {/* Marca de agua lateral - Estilo minimalista */}
      <div className="absolute hidden lg:block -rotate-90 left-[-150px] top-1/2 text-white/5 font-black text-9xl pointer-events-none select-none tracking-[2rem]">
        EST. 2024
      </div>
    </div>
  )
}

export default Home