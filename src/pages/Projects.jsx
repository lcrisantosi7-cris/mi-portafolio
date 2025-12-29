import React, { useState } from 'react'
import { Github, ExternalLink, Code, Database, Server, Filter } from 'lucide-react'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', name: 'Todos' },
    { id: 'backend', name: 'Backend' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'academic', name: 'Académicos' }
  ]

  const projects = [
    {
      title: 'Sistema de Gestión Universitaria',
      description: 'Plataforma completa para la gestión de estudiantes, cursos y calificaciones con arquitectura MVC.',
      image: '🎓',
      tags: ['Spring Boot', 'MySQL', 'Thymeleaf', 'Bootstrap'],
      category: 'fullstack',
      type: 'academic',
      github: '#',
      demo: '#',
      status: 'Completado'
    },
    {
      title: 'API REST de E-Commerce',
      description: 'API RESTful para sistema de comercio electrónico con autenticación JWT y gestión de productos.',
      image: '🛒',
      tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      category: 'backend',
      type: 'personal',
      github: '#',
      status: 'En desarrollo'
    },
    {
      title: 'Sistema de Inventario',
      description: 'Aplicación para control de inventario con reportes en tiempo real y análisis de stock.',
      image: '📦',
      tags: ['PHP', 'MySQL', 'JavaScript', 'Chart.js'],
      category: 'fullstack',
      type: 'academic',
      github: '#',
      demo: '#',
      status: 'Completado'
    },
    {
      title: 'Microservicios de Pagos',
      description: 'Arquitectura de microservicios para procesamiento de pagos con diferentes pasarelas.',
      image: '💳',
      tags: ['Spring Boot', 'RabbitMQ', 'Docker', 'PostgreSQL'],
      category: 'backend',
      type: 'personal',
      github: '#',
      status: 'En desarrollo'
    },
    {
      title: 'Dashboard Analytics',
      description: 'Panel de control con métricas y visualizaciones en tiempo real para análisis de datos.',
      image: '📊',
      tags: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
      category: 'fullstack',
      type: 'personal',
      github: '#',
      demo: '#',
      status: 'En desarrollo'
    },
    {
      title: 'Sistema de Reservas',
      description: 'Plataforma de reservas online con calendario interactivo y notificaciones por email.',
      image: '📅',
      tags: ['Node.js', 'Vue.js', 'MySQL', 'AWS SES'],
      category: 'fullstack',
      type: 'academic',
      github: '#',
      demo: '#',
      status: 'En desarrollo'
    },
    {
      title: 'API de Geolocalización',
      description: 'Servicio REST para gestión de ubicaciones y cálculo de distancias con mapas interactivos.',
      image: '🗺️',
      tags: ['Spring Boot', 'PostgreSQL', 'Redis', 'Docker'],
      category: 'backend',
      type: 'personal',
      github: '#',
      status: 'En desarrollo'
    },
    {
      title: 'Chat en Tiempo Real',
      description: 'Aplicación de mensajería instantánea con WebSockets y rooms múltiples.',
      image: '💬',
      tags: ['Node.js', 'Socket.io', 'React', 'MongoDB'],
      category: 'fullstack',
      type: 'personal',
      github: '#',
      demo: '#',
      status: 'En desarrollo'
    }
  ]

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter || p.type === activeFilter)

  return (
    <div className="min-h-screen bg-zinc-900 py-24 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-400/10 border border-emerald-400/30 rounded-full mb-6">
            <Code className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium text-xs uppercase tracking-widest">
              Portafolio
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Mis Proyectos
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Colección de proyectos académicos y personales que he desarrollado
          </p>
          <div className="h-1 w-24 bg-linear-to-r from-emerald-400 to-transparent mx-auto mt-6" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700 text-center">
            <p className="text-3xl font-bold text-emerald-400 mb-1">{projects.length}</p>
            <p className="text-gray-400 text-sm">Proyectos</p>
          </div>
          <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700 text-center">
            <p className="text-3xl font-bold text-emerald-400 mb-1">
              {projects.filter(p => p.status === 'Completado').length}
            </p>
            <p className="text-gray-400 text-sm">Completados</p>
          </div>
          <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700 text-center">
            <p className="text-3xl font-bold text-emerald-400 mb-1">
              {projects.filter(p => p.category === 'backend').length}
            </p>
            <p className="text-gray-400 text-sm">Backend</p>
          </div>
          <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700 text-center">
            <p className="text-3xl font-bold text-emerald-400 mb-1">
              {projects.filter(p => p.category === 'fullstack').length}
            </p>
            <p className="text-gray-400 text-sm">Full Stack</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <Filter className="w-5 h-5 text-gray-400" />
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-emerald-400 text-zinc-900'
                  : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700 hover:text-emerald-400'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-linear-to-br from-zinc-800 to-zinc-900 rounded-xl border border-zinc-700 hover:border-emerald-400/50 transition-all group overflow-hidden"
            >
              {/* Project Icon/Image */}
              <div className="bg-zinc-900 p-12 flex items-center justify-center border-b border-zinc-700 group-hover:bg-emerald-400/5 transition-colors">
                <span className="text-7xl">{project.image}</span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'Completado'
                      ? 'bg-emerald-400/10 text-emerald-400'
                      : 'bg-yellow-400/10 text-yellow-400'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-zinc-900 text-gray-400 text-xs rounded-full border border-zinc-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-gray-400 hover:text-emerald-400 rounded-lg transition-all border border-zinc-700 hover:border-emerald-400/50"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm font-medium">Código</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-400 hover:bg-emerald-500 text-zinc-900 rounded-lg transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">¿Tienes un proyecto en mente?</p>
          <a href="/contact">
            <button className="px-8 py-3 bg-emerald-400 text-zinc-900 font-bold rounded-lg hover:bg-emerald-500 transition">
              Trabajemos Juntos
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Projects