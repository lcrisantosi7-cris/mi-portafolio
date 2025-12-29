import React from 'react'
import { GraduationCap, Code, Database, Cloud, Server } from 'lucide-react'

const About = () => {
  const skills = [
    'Node.js & Spring Boot',
    'MySQL, MariaDB & SQL Server',
    'React & Vue.js (en aprendizaje)',
    'AWS Cloud (en aprendizaje)',
    'PHP & Backend Development',
    'Arquitectura de Sistemas (en aprendizaje)'
  ]

  const stats = [
    { label: 'Ciclo Actual', value: '7mo', icon: GraduationCap },
    { label: 'Universidad', value: 'UCV', icon: GraduationCap },
    { label: 'Especialidad', value: 'Full Stack', icon: Code },
    { label: 'Enfoque', value: 'Backend', icon: Server }
  ]

  return (
    <div className="min-h-screen bg-zinc-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-24 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-400/10 border border-emerald-400/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-400 font-medium text-xs uppercase tracking-widest">
              Disponible para trabajar
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Sobre Mí
          </h1>
          <div className="h-1 w-24 bg-linear-to-r from-emerald-400 to-transparent mx-auto" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center hover:border-emerald-400/50 transition-all group"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-emerald-400 group-hover:scale-110 transition-transform" />
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Description */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Desarrollador Full Stack en Formación
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Estudiante de <span className="text-emerald-400 font-semibold">7mo ciclo de Ingeniería de Sistemas y Computación</span> en la Universidad César Vallejo.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                Me especializo en el desarrollo backend con <span className="text-emerald-400">Node.js</span> y <span className="text-emerald-400">Spring Boot</span>, 
                creando arquitecturas de sistemas escalables y soluciones eficientes en la nube con <span className="text-emerald-400">AWS</span>.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Apasionado por crear aplicaciones robustas, mantener código limpio y seguir las mejores prácticas de desarrollo. 
                Actualmente expandiendo mis conocimientos en <span className="text-emerald-400">React</span> y <span className="text-emerald-400">Vue.js</span> para el desarrollo frontend.
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-emerald-400" />
                Tecnologías Principales
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full group-hover:scale-150 transition-transform" />
                    <span className="text-sm text-gray-400 group-hover:text-emerald-400 transition-colors">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="/contact">
                <button className="group relative px-8 py-3 bg-emerald-400 text-zinc-900 font-bold text-sm uppercase tracking-wider rounded-lg overflow-hidden">
                  <span className="relative z-10">Hablemos</span>
                  <div className="absolute inset-0 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <button className="group relative px-8 py-3 border-2 border-zinc-700 text-gray-300 hover:border-emerald-400 hover:text-emerald-400 font-bold text-sm uppercase tracking-wider rounded-lg transition-all">
                  <span className="relative z-10">Ver CV</span>
                </button>
              </a>
            </div>
          </div>

          {/* Right Column - Experience Card */}
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-24 h-24 border-4 border-emerald-400/20 rounded-full" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border-4 border-emerald-400/20 rounded-full" />
            
            <div className="relative bg-linear-to-br from-zinc-800 to-zinc-900 p-8 rounded-2xl border border-zinc-700/50 shadow-2xl">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-400/10 to-transparent rounded-2xl" />
              
              <div className="relative z-10 space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Trayectoria Académica
                </h3>

                {/* Education Timeline */}
                <div className="space-y-4">
                  <div className="border-l-2 border-emerald-400 pl-4">
                    <p className="text-emerald-400 font-semibold">2022 - 2025</p>
                    <p className="text-white font-medium">Ingeniería de Sistemas</p>
                    <p className="text-gray-400 text-sm">Universidad César Vallejo</p>
                    <p className="text-gray-500 text-xs mt-2">Ciclo 7/10 - En curso</p>
                  </div>

                  <div className="border-l-2 border-zinc-600 pl-4">
                    <p className="text-gray-400 font-semibold">Cursos Relevantes</p>
                    <ul className="text-gray-500 text-sm mt-2 space-y-1">
                      <li>• Ingeniería Web</li>
                      <li>• Arquitectura de Sistemas</li>
                      <li>• Gestión de Datos II</li>
                      <li>• Networking & Communications II</li>
                      <li>• Gerencia de TI</li>
                    </ul>
                  </div>
                </div>

                {/* Quote */}
                <div className="bg-zinc-900/50 rounded-lg p-4 border-l-4 border-emerald-400">
                  <p className="text-gray-300 italic text-sm">
                    "Construyendo soluciones tecnológicas que impacten positivamente en la sociedad"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About