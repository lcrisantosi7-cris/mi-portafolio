import React from 'react'
import { Link } from 'react-router-dom' // Usamos Link para no recargar la página

const Home = () => {
  return (
    <div className="min-h-[calc(100-80px)] flex items-center justify-center px-4 py-12 md:px-6">
      <div className="text-center max-w-4xl">
        {/* Tamaño de texto ajustado para móviles (text-4xl) y escalado en tablets (md:text-7xl) */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-emerald-400 mb-6 leading-tight">
          Luis Angel Crisanto Silupú
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-400 mb-4 font-medium">
          Desarrollador Full Stack en Formación
        </p>
        
        <p className="text-sm md:text-base text-gray-500 mb-10 max-w-2xl mx-auto">
          Estudiante de 7mo ciclo de Ingeniería de Sistemas en la UCV especializado en arquitectura de sistemas y soluciones cloud.
        </p>

        {/* Cambiamos a flex-col en móviles para que los botones se apilen, y flex-row en pantallas grandes */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/contact" 
            className="w-full sm:w-auto px-8 py-4 bg-emerald-400 text-zinc-900 font-bold rounded-xl hover:bg-emerald-500 transition-all text-center shadow-lg shadow-emerald-400/10"
          >
            Contáctame
          </Link>
          
          <Link 
            to="/projects" 
            className="w-full sm:w-auto px-8 py-4 border-2 border-emerald-400 text-emerald-400 font-bold rounded-xl hover:bg-emerald-400/10 transition-all text-center"
          >
            Ver Proyectos
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home