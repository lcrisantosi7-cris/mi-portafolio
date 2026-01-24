import React from 'react'
import { Link } from 'react-router-dom'
import { Rocket, ChevronRight } from 'lucide-react'

const Home = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#39C5BB]/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#8B5CF6]/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 text-center max-w-5xl">
        {/* Badge Tech */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#39C5BB]/30 bg-[#39C5BB]/5 text-[#39C5BB] text-xs font-bold tracking-widest uppercase mb-8 animate-bounce">
          <Rocket size={14} /> Available for New Projects
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black mb-8 leading-none tracking-tighter">
          <span className="block text-white">LUIS ANGEL</span>
          <span className="block bg-gradient-to-r from-[#39C5BB] via-[#8B5CF6] to-[#FF007F] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
            CRISANTO
          </span>
        </h1>
        
        <div className="space-y-6 mb-12">
          <p className="text-xl md:text-3xl text-[#39C5BB] font-mono tracking-tighter">
            &gt; Software Engineer // Full Stack Developer_
          </p>
          
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Especializado en <span className="text-white font-semibold">Arquitectura Cloud</span> y soluciones escalables. 
            Actualmente cursando el 7mo ciclo en la UCV, transformando lógica compleja en experiencias digitales excepcionales.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link 
            to="/contact" 
            className="group relative w-full sm:w-auto px-10 py-4 bg-[#39C5BB] text-[#0f172a] font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(57,197,187,0.4)]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              TRABAJEMOS JUNTOS <ChevronRight size={18} />
            </span>
          </Link>
          
          <Link 
            to="/projects" 
            className="w-full sm:w-auto px-10 py-4 border-2 border-white/10 text-white font-black rounded-2xl hover:bg-white/5 hover:border-[#39C5BB]/50 transition-all"
          >
            VER PORTAFOLIO
          </Link>
        </div>
      </div>

      {/* Marca de agua lateral */}
      <div className="absolute hidden lg:block -rotate-90 left-[-150px] top-1/2 text-white/5 font-black text-9xl pointer-events-none select-none">
        EST. 2024
      </div>
    </div>
  )
}

export default Home