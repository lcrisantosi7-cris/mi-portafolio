import React from 'react'
import { Github, Linkedin } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 py-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://github.com/lcrisantosi7-cris/" target="_blank" className="text-gray-400 hover:text-emerald-400">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/luis-crisanto-silupú" target="_blank" className="text-gray-400 hover:text-emerald-400">
            <Linkedin size={24} />
          </a>
        </div>
        <p className="text-gray-400 text-sm">© 2024 Luis Crisanto. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}