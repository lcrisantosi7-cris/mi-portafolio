// src/pages/NotFound.jsx (Versión con easter egg)
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, Coffee, Code } from 'lucide-react'

const NotFound = () => {
  const navigate = useNavigate()
  const [clicks, setClicks] = useState(0)
  
  const messages = [
    "🤔 Mmm... esta página no existe",
    "🔍 Sigo buscando...",
    "😅 Nada por aquí",
    "🎯 ¡Casi! (mentira)",
    "🎉 ¡Encontraste el easter egg! 🎊"
  ]

  const handleClick = () => {
    if (clicks < 4) {
      setClicks(clicks + 1)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <div 
          onClick={handleClick}
          className="cursor-pointer select-none mb-8 transition-transform hover:scale-110"
        >
          <h1 className="text-[180px] md:text-[250px] font-black text-emerald-400 leading-none">
            404
          </h1>
        </div>
        
        <div className="mb-8">
          {clicks < 4 ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {messages[clicks]}
              </h2>
              <p className="text-gray-400">
                (Psst... intenta hacer click en el número 404 👆)
              </p>
            </>
          ) : (
            <div className="animate-bounce">
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-4">
                {messages[4]}
              </h2>
              <p className="text-gray-400 mb-4">
                ¡Eres persistente! Toma un café virtual ☕
              </p>
              <Coffee className="w-16 h-16 mx-auto text-emerald-400 animate-pulse" />
            </div>
          )}
        </div>
        
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-8 py-3 bg-emerald-400 text-zinc-900 rounded-lg hover:bg-emerald-500 font-bold transition mx-auto"
        >
          <Home className="w-5 h-5" />
          Ir al Inicio
        </button>
      </div>
    </div>
  )
}

export default NotFound