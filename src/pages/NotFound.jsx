// src/pages/NotFound.jsx (Versión minimalista)
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, Search } from 'lucide-react'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* Simple 404 */}
        <h1 className="text-[150px] md:text-[200px] font-black text-emerald-400 leading-none mb-4 opacity-20">
          404
        </h1>
        
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Página no encontrada
        </h2>
        
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-8 py-3 bg-emerald-400 text-zinc-900 rounded-lg hover:bg-emerald-500 font-bold transition"
          >
            <Home className="w-5 h-5" />
            Volver al Inicio
          </button>
          
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2 px-8 py-3 border-2 border-emerald-400 text-emerald-400 rounded-lg hover:bg-emerald-400/10 font-bold transition"
          >
            <Search className="w-5 h-5" />
            Ver Proyectos
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound