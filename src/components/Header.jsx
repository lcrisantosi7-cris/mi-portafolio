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
    { name: 'Proyectos', path: '/projects' },
    { name: 'Contacto', path: '/contact' }
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
                  ? 'bg-emerald-400 text-zinc-900' 
                  : 'text-gray-300 hover:text-emerald-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}