import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

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
    { name: 'Contacto', path: '/contact' },
    { name: 'Proyectos', path: '/projects' },
    { name: 'Habilidades', path: '/skills' },
    { name: 'Servicios', path: '/services' },
    
  ]

  return (
    <header className={`fixed top-0 w-full z-50 transition-all ${isScrolled ? 'bg-zinc-900/95 shadow-lg' : 'bg-zinc-900/80'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-emerald-400">LC</Link>
        
        <nav className="hidden md:flex gap-6">
          {navLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg transition ${
                location.pathname === link.path 
                  ? 'bg-sky-700 text-zinc-900' 
                  : 'text-gray-300 hover:text-sky-700'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800 absolute w-full left-0 shadow-xl animate-in fade-in slide-in-from-top-4">
          <nav className="flex flex-col p-4">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)} // Cierra el menú al hacer click
                className={`px-4 py-3 rounded-lg transition-all ${
                  location.pathname === link.path 
                    ? 'bg-sky-700 text-zinc-900 font-bold' 
                    : 'text-gray-300 hover:bg-zinc-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}