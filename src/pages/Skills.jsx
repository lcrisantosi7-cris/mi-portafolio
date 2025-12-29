import React, { useState } from 'react'
import { Code, Database, Cloud, Server, Layers, Zap, Settings } from 'lucide-react'

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Todas', icon: Layers },
    { id: 'backend', name: 'Backend', icon: Server },
    { id: 'frontend', name: 'Frontend', icon: Code },
    { id: 'database', name: 'Bases de Datos', icon: Database },
    { id: 'cloud', name: 'Cloud & DevOps', icon: Cloud },
    { id: 'tools', name: 'Herramientas', icon: Settings }
  ]

  const skills = [
    // Backend
    {
      name: 'Node.js',
      category: 'backend',
      level: 75,
      icon: '🟢',
      color: 'emerald'
    },
    {
      name: 'Spring Boot',
      category: 'backend',
      level: 70,
      icon: '🍃',
      color: 'green'
    },
    {
      name: 'PHP',
      category: 'backend',
      level: 80,
      icon: '🐘',
      color: 'purple'
    },

    
    // Frontend
    {
      name: 'React',
      category: 'frontend',
      level: 70,
      icon: '⚛️',
      color: 'blue'
    },
    {
      name: 'HTML/CSS',
      category: 'frontend',
      level: 90,
      icon: '🎨',
      color: 'orange'
    },
    {
      name: 'JavaScript',
      category: 'frontend',
      level: 85,
      icon: '🟨',
      color: 'yellow'
    },
    {
      name: 'Tailwind CSS',
      category: 'frontend',
      level: 80,
      icon: '🎐',
      color: 'cyan'
    },
    
    // Databases
    {
      name: 'MySQL',
      category: 'database',
      level: 85,
      icon: '🐬',
      color: 'blue'
    },
    {
      name: 'MariaDB',
      category: 'database',
      level: 85,
      icon: '🦭',
      color: 'teal'
    },
    {
      name: 'SQL Server',
      category: 'database',
      level: 80,
      icon: '🗄️',
      color: 'red'
    },

    
    // Cloud & DevOps
    {
      name: 'AWS',
      category: 'cloud',
      level: 75,
      icon: '☁️',
      color: 'orange'
    },
    {
      name: 'Docker',
      category: 'cloud',
      level: 65,
      icon: '🐳',
      color: 'blue'
    },

    
    // Tools
    {
      name: 'VS Code',
      category: 'tools',
      level: 90,
      icon: '💻',
      color: 'blue'
    },
    {
      name: 'Postman',
      category: 'tools',
      level: 70,
      icon: '📮',
      color: 'orange'
    },
    {
      name: 'GitHub',
      category: 'tools',
      level: 65,
      icon: '🐙',
      color: 'gray'
    },
    {
      name: 'Maven',
      category: 'tools',
      level: 60,
      icon: '🔧',
      color: 'red'
    }
  ]

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory)

  const learningSkills = [
    { name: 'Vue.js', icon: '💚', status: 'En progreso' },
    { name: 'GraphQL', icon: '🔷', status: 'Próximamente' },
    { name: 'Kubernetes', icon: '☸️', status: 'Próximamente' },
    { name: 'Next.js', icon: '▲', status: 'En progreso' }
  ]

  return (
    <div className="min-h-screen bg-zinc-900 py-24 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-400/10 border border-emerald-400/30 rounded-full mb-6">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium text-xs uppercase tracking-widest">
              Stack Tecnológico
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Mis Habilidades
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Tecnologías y herramientas con las que trabajo
          </p>
          <div className="h-1 w-24 bg-linear-to-r from-emerald-400 to-transparent mx-auto mt-6" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-emerald-400 text-zinc-900 shadow-lg shadow-emerald-400/25'
                  : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700 hover:text-emerald-400'
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-linear-to-br from-zinc-800 to-zinc-900 p-6 rounded-xl border border-zinc-700 hover:border-emerald-400/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{skill.icon}</span>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {skill.name}
                  </h3>
                </div>
                <span className="text-emerald-400 font-bold text-lg">
                  {skill.level}%
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="relative h-3 bg-zinc-700 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-linear-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Learning Section */}
        <div className="bg-linear-to-br from-zinc-800 to-zinc-900 p-8 rounded-2xl border border-zinc-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-emerald-400/10 rounded-xl flex items-center justify-center">
              <Layers className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Aprendiendo Actualmente</h2>
              <p className="text-gray-400 text-sm">Tecnologías en las que estoy expandiendo mis conocimientos</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {learningSkills.map((skill, index) => (
              <div
                key={index}
                className="bg-zinc-900 p-4 rounded-xl border border-zinc-700 hover:border-emerald-400/50 transition-all group"
              >
                <span className="text-4xl mb-3 block">{skill.icon}</span>
                <h3 className="text-white font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
                  {skill.name}
                </h3>
                <span className="inline-block px-3 py-1 bg-emerald-400/10 text-emerald-400 text-xs rounded-full">
                  {skill.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700 text-center">
            <div className="text-4xl mb-3">🎓</div>
            <h3 className="text-xl font-bold text-white mb-2">Aprendizaje Continuo</h3>
            <p className="text-gray-400 text-sm">Siempre explorando nuevas tecnologías</p>
          </div>
          
          <div className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700 text-center">
            <div className="text-4xl mb-3">💼</div>
            <h3 className="text-xl font-bold text-white mb-2">Experiencia Práctica</h3>
            <p className="text-gray-400 text-sm">Proyectos reales y académicos</p>
          </div>
          
          <div className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700 text-center">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="text-xl font-bold text-white mb-2">Enfoque Backend</h3>
            <p className="text-gray-400 text-sm">Especialización en arquitecturas robustas</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills