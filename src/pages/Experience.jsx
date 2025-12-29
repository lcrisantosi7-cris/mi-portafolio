import React from 'react'
import { Calendar, GraduationCap, BookOpen, Award } from 'lucide-react'

const Experience = () => {
  const cycles = [
    {
      cycle: 'Ciclo I',
      courses: ['Introducción a la Ingeniería de Sistemas', 'Fundamentos de Programación', 'Matemática I'],
      icon: '🎯'
    },
    {
      cycle: 'Ciclo II',
      courses: ['Metodologías de Programación', 'Sistémica', 'Matemática II'],
      icon: '💻'
    },
    {
      cycle: 'Ciclo III',
      courses: ['Estructura de Datos', 'Electrónica y Circuitos Digitales', 'Matemática III'],
      icon: '⚡'
    },
    {
      cycle: 'Ciclo IV',
      courses: ['Programación Orientada a Objetos', 'Análisis y Diseño de Sistemas', 'Gestión de Datos e Información I', 'Fundamentos de Tecnologías de Información'],
      icon: '🚀'
    },
    {
      cycle: 'Ciclo V',
      courses: ['Ingeniería de Software', 'Arquitectura de Sistemas de Información', 'Gestión de Datos e Información II', 'Redes y Comunicaciones I'],
      icon: '🏗️'
    },
    {
      cycle: 'Ciclo VI',
      courses: ['Ingeniería Web', 'Networking and Communications II', 'Fundamentos de Modelado y Animación', 'Gerencia de la Tecnología de la Información'],
      icon: '🌐',
      current: true
    }
  ]

  const achievements = [
    {
      title: 'Proyectos Completados',
      value: '8+',
      icon: Award,
      color: 'emerald'
    },
    {
      title: 'Cursos Aprobados',
      value: '20+',
      icon: BookOpen,
      color: 'blue'
    },
    {
      title: 'Ciclos Completados',
      value: '6/10',
      icon: GraduationCap,
      color: 'purple'
    }
  ]

  return (
    <div className="min-h-screen bg-zinc-900 py-24 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-400/10 border border-emerald-400/30 rounded-full mb-6">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium text-xs uppercase tracking-widest">
              Trayectoria Académica
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Mi Experiencia
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Recorrido académico en Ingeniería de Sistemas y Computación
          </p>
          <div className="h-1 w-24 bg-linear-to-r from-emerald-400 to-transparent mx-auto mt-6" />
        </div>

        {/* Achievements */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center hover:border-emerald-400/50 transition-all group"
            >
              <achievement.icon className="w-12 h-12 mx-auto mb-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <p className="text-3xl font-bold text-white mb-2">{achievement.value}</p>
              <p className="text-gray-400">{achievement.title}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-zinc-700" />

          <div className="space-y-12">
            {cycles.map((item, index) => (
              <div 
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-zinc-900 border-4 border-emerald-400 rounded-full items-center justify-center text-2xl z-10">
                  {item.icon}
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'}`}>
                  <div className={`bg-linear-to-br from-zinc-800 to-zinc-900 p-6 rounded-xl border ${
                    item.current ? 'border-emerald-400' : 'border-zinc-700'
                  } hover:border-emerald-400/50 transition-all group`}>
                    {item.current && (
                      <span className="inline-block px-3 py-1 bg-emerald-400 text-zinc-900 text-xs font-bold rounded-full mb-3">
                        ACTUAL
                      </span>
                    )}
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 justify-start md:justify-end">
                      <span className="text-3xl">{item.icon}</span>
                      {item.cycle}
                    </h3>
                    <div className="space-y-2">
                      {item.courses.map((course, idx) => (
                        <div 
                          key={idx}
                          className="flex items-start gap-2 text-gray-400 text-sm group-hover:text-emerald-400 transition-colors"
                        >
                          <span className="text-emerald-400 mt-1">•</span>
                          <span>{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">¿Quieres saber más sobre mi trabajo?</p>
          <a href="/projects">
            <button className="px-8 py-3 bg-emerald-400 text-zinc-900 font-bold rounded-lg hover:bg-emerald-500 transition">
              Ver mis Proyectos
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Experience