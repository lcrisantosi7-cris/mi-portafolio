import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Zap } from 'lucide-react'

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sobre Mí', path: '/about' },
    { name: 'Experiencia', path: '/experience' },
    { name: 'Proyectos', path: '/projects' },
    { name: 'Habilidades', path: '/skills' },
    { name: 'Servicios', path: '/services' },
    { name: 'Contacto', path: '/contact' },
  ]

  // Colores temáticos: Teal (Miku) y Purple (Vite)
  const activeStyle = "bg-gradient-to-r from-[#39C5BB]/20 to-[#8B5CF6]/20 text-[#39C5BB] border border-[#39C5BB]/30 shadow-[0_0_15px_rgba(57,197,187,0.2)]"
  const inactiveStyle = "text-gray-400 hover:text-[#39C5BB] hover:bg-white/5"

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-[#0f172a]/90 backdrop-blur-md py-3 border-b border-white/10 shadow-2xl' 
        : 'bg-transparent py-6 border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO CON ESTILO TECH */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Zap size={28} className="text-[#39C5BB] relative z-10 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-[#39C5BB] blur-lg opacity-40 group-hover:opacity-80 transition-opacity"></div>
          </div>
          <span className="text-2xl font-black tracking-tighter bg-linear-to-r from-[#39C5BB] via-[#8B5CF6] to-[#FF007F] bg-clip-text text-transparent">
            LUIS CRISANTO
          </span>
        </Link>
        
        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-1">|
          {navLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                location.pathname === link.path ? activeStyle : inactiveStyle
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* MOBILE TOGGLE */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-[#39C5BB] p-2 hover:bg-[#39C5BB]/10 rounded-full transition-colors"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU ANIMADO */}
      <div className={`lg:hidden absolute w-full left-0 transition-all duration-500 ease-in-out border-b border-white/10 ${
        isMobileMenuOpen 
          ? 'top-full opacity-100 visible bg-[#0f172a]/95 backdrop-blur-xl py-6' 
          : 'top-[120%] opacity-0 invisible'
      }`}>
        <nav className="flex flex-col px-6 gap-2">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-6 py-4 rounded-2xl transition-all text-lg font-bold ${
                location.pathname === link.path 
                  ? 'bg-[#39C5BB] text-[#0f172a]' 
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
