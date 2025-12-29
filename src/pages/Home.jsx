import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold text-emerald-400 mb-6">
          Luis Angel Crisanto Silupú
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-4">
          Desarrollador Full Stack en Formación
        </p>
        <p className="text-gray-500 mb-8">
          Estudiante de 7mo ciclo de Ingeniería de Sistemas en la UCV
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/contact" className="px-8 py-3 bg-emerald-400 text-zinc-900 font-bold rounded-lg hover:bg-emerald-500 transition">
            Contáctame
          </a>
          <a href="/projects" className="px-8 py-3 border-2 border-emerald-400 text-emerald-400 font-bold rounded-lg hover:bg-emerald-400/10 transition">
            Ver Proyectos
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home