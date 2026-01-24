import React from 'react'
import { Github, Linkedin, Cpu } from 'lucide-react'

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0f172a] overflow-hidden">
      {/* Línea divisoria con gradiente neón */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#39C5BB] to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-8">
          
          {/* Iconos Sociales con efecto Glow */}
          <div className="flex justify-center gap-8">
            <a 
              href="https://github.com/lcrisantosi7-cris/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative p-3 rounded-full bg-white/5 border border-white/10 transition-all duration-300 hover:border-[#39C5BB] hover:shadow-[0_0_20px_rgba(57,197,187,0.3)]"
            >
              <Github size={24} className="text-gray-400 group-hover:text-[#39C5BB] transition-colors" />
            </a>
            
            <a 
              href="https://www.linkedin.com/in/luis-crisanto-silupú" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative p-3 rounded-full bg-white/5 border border-white/10 transition-all duration-300 hover:border-[#8B5CF6] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              <Linkedin size={24} className="text-gray-400 group-hover:text-[#8B5CF6] transition-colors" />
            </a>
          </div>

          {/* Texto y Branding */}
          <div className="text-center space-y-2">
            <p className="flex items-center justify-center gap-2 text-gray-300 font-bold tracking-wider uppercase text-xs">
              <Cpu size={14} className="text-[#FF007F] animate-pulse" />
              Ingeniería de Sistemas & Software
            </p>
            
            <p className="text-gray-500 text-sm font-medium">
              © {currentYear} <span className="bg-gradient-to-r from-[#39C5BB] to-[#8B5CF6] bg-clip-text text-transparent font-black">Luis Crisanto</span>. 
              Built with React & Passion.
            </p>
          </div>
        </div>
      </div>

      {/* Decoración de fondo sutil */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#39C5BB]/5 blur-[100px] rounded-full pointer-events-none"></div>
    </footer>
  )
}