import React from 'react'
import { Server, Code, Database, Cloud, Layers, Zap, CheckCircle, ArrowRight } from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: Server,
      title: 'Desarrollo Backend',
      description: 'Creación de APIs RESTful robustas y escalables con Node.js, Spring Boot y PHP.',
      features: [
        'APIs RESTful seguras',
        'Arquitectura de microservicios',
        'Autenticación JWT y OAuth2',
        'Integración con servicios externos',
        'Documentación API con Swagger'
      ],
      technologies: ['Node.js', 'Spring Boot', 'PHP'],
      color: 'emerald',
      //price: 'Desde $500'
    },
    {
      icon: Database,
      title: 'Gestión de Bases de Datos',
      description: 'Diseño, optimización e implementación de bases de datos relacionales y NoSQL.',
      features: [
        'Modelado de datos eficiente',
        'Optimización de queries',
        'Migraciones y backups',
        'Implementación de índices',
        'Consultas complejas SQL'
      ],
      technologies: ['MySQL', 'SQL Server'],
      color: 'blue',
      //price: 'Desde $300'
    },
    {
      icon: Code,
      title: 'Desarrollo Full Stack',
      description: 'Aplicaciones web completas desde el frontend hasta el backend con tecnologías modernas.',
      features: [
        'Interfaces responsive',
        'SPAs con React/Vue',
        'Backend escalable',
        'Integración frontend-backend',
        'Despliegue en producción'
      ],
      technologies: ['React', 'Vue.js', 'Node.js', 'Tailwind CSS'],
      color: 'purple',
      //price: 'Desde $800'
    },
    {
      icon: Cloud,
      title: 'Implementación Cloud',
      description: 'Despliegue y configuración de aplicaciones en servicios cloud como AWS.',
      features: [
        'Configuración de servidores',
        'CI/CD pipelines',
        'Contenedorización con Docker',
        'Monitoreo y logs',
        'Escalabilidad automática'
      ],
      technologies: ['AWS', 'Docker', 'Nginx'],
      color: 'orange',
      //price: 'Desde $400'
    },
    {
      icon: Layers,
      title: 'Arquitectura de Sistemas',
      description: 'Diseño de arquitecturas escalables y mantenibles para proyectos complejos.',
      features: [
        'Análisis de requerimientos',
        'Diseño de arquitectura',
        'Patrones de diseño',
        'Documentación técnica',
        'Mejores prácticas'
      ],
      technologies: ['UML', 'Microservicios', 'MVC', 'Clean Architecture'],
      color: 'teal',
      //price: 'Desde $600'
    },
    {
      icon: Zap,
      title: 'Optimización & Performance',
      description: 'Mejora del rendimiento de aplicaciones existentes y optimización de código.',
      features: [
        'Análisis de performance',
        'Optimización de queries',
        'Refactorización de código',
        'Implementación de cache',
        'Reducción de tiempo de carga'
      ],
      technologies: ['Redis', 'Performance Testing', 'Code Review'],
      color: 'yellow',
      //price: 'Desde $350'
    }
  ]

  const process = [
    {
      step: '01',
      title: 'Consulta Inicial',
      description: 'Conversamos sobre tu proyecto, objetivos y necesidades específicas.',
      icon: '💬'
    },
    {
      step: '02',
      title: 'Propuesta & Cotización',
      description: 'Elaboro una propuesta detallada con tiempos, costos y tecnologías.',
      icon: '📋'
    },
    {
      step: '03',
      title: 'Desarrollo',
      description: 'Trabajo en tu proyecto con actualizaciones constantes y comunicación fluida.',
      icon: '⚙️'
    },
    {
      step: '04',
      title: 'Entrega & Soporte',
      description: 'Entrego el proyecto completo con documentación y soporte post-entrega.',
      icon: '✅'
    }
  ]

  const whyChooseMe = [
    {
      title: 'Código Limpio',
      description: 'Escribo código mantenible siguiendo las mejores prácticas',
      icon: '🎯'
    },
    {
      title: 'Comunicación Constante',
      description: 'Mantente al tanto del progreso en todo momento',
      icon: '💬'
    },
    {
      title: 'Entregas Puntuales',
      description: 'Respeto los plazos acordados y entrego a tiempo',
      icon: '⏰'
    },
    {
      title: 'Soporte Continuo',
      description: 'Asistencia después de la entrega del proyecto',
      icon: '🛠️'
    }
  ]

  return (
    <div className="min-h-screen bg-zinc-900 py-24 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-400/10 border border-emerald-400/30 rounded-full mb-6">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium text-xs uppercase tracking-widest">
              Servicios Profesionales
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            ¿En qué puedo ayudarte?
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ofrezco servicios de desarrollo web enfocados en backend, bases de datos y arquitectura de sistemas
          </p>
          <div className="h-1 w-24 bg-linear-to-r from-emerald-400 to-transparent mx-auto mt-6" />
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-linear-to-br from-zinc-800 to-zinc-900 p-6 rounded-xl border border-zinc-700 hover:border-emerald-400/50 transition-all group"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-emerald-400/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-400/20 transition-colors">
                <service.icon className="w-7 h-7 text-emerald-400" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-400 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {service.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-zinc-900 text-gray-400 text-xs rounded border border-zinc-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Price */}
              <div className="pt-4 border-t border-zinc-700">
                <p className="text-emerald-400 font-bold text-lg">{service.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Mi Proceso de Trabajo
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-zinc-700 -z-10">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="w-5 h-5 text-zinc-600" />
                    </div>
                  </div>
                )}
                
                <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 hover:border-emerald-400/50 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl">{item.icon}</span>
                    <span className="text-5xl font-bold text-emerald-400/20">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Me */}
        <div className="bg-linear-to-br from-zinc-800 to-zinc-900 p-8 rounded-2xl border border-zinc-700 mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            ¿Por qué trabajar conmigo?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseMe.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-linear-to-r from-emerald-400 to-emerald-500 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            ¿Listo para iniciar tu proyecto?
          </h2>
          <p className="text-zinc-800 text-lg mb-8 max-w-2xl mx-auto">
            Conversemos sobre tu idea y cómo puedo ayudarte a hacerla realidad
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/contact">
              <button className="px-8 py-4 bg-zinc-900 text-white font-bold rounded-lg hover:bg-zinc-800 transition flex items-center gap-2">
                Contactar Ahora
                <ArrowRight className="w-5 h-5" />
              </button>
            </a>
            <a href="https://wa.me/51943759634" target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-4 bg-white text-zinc-900 font-bold rounded-lg hover:bg-gray-100 transition flex items-center gap-2">
                WhatsApp
                <span>💬</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services