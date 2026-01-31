import React from 'react'
import { ArrowRight, Code, Terminal, Cpu, Database, Cloud } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  }

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden flex items-center justify-center px-6 pt-20">
      
      {/* BACKGROUND DE INGENIERÍA */}
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: `linear-gradient(#3f3f46 1px, transparent 1px), linear-gradient(90deg, #3f3f46 1px, transparent 1px)`, border: 'none', backgroundSize: '40px 40px' }}>
      </div>
      
      {/* Luces de ambiente */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]" />

      {/* CONTENIDO PRINCIPAL */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-6xl mx-auto"
      >
        {/* Badge Pro */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-2 bg-zinc-900/50 border border-emerald-500/20 rounded-full mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-mono text-[10px] uppercase tracking-[0.2em]">
            Sistemas & Desarrollo Full Stack
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-[0.85] tracking-tighter">
          LUIS<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-emerald-500">
            CRISANTO
          </span>
        </motion.h1>

        {/* Subtitle & Description */}
        <motion.div variants={itemVariants} className="space-y-4 mb-12">
          <p className="text-xl md:text-2xl text-zinc-300 font-medium">
            Ingeniero de Sistemas en Formación <span className="text-emerald-500 text-sm font-mono border border-emerald-500/30 px-2 py-1 rounded ml-2">7mo Ciclo</span>
          </p>
          <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Especializado en el diseño de <span className="text-zinc-300">arquitecturas robustas</span> y el desarrollo 
            de soluciones escalables con <span className="text-emerald-400/80">Node.js, PHP y AWS.</span>
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <Link to="/contact" className="w-full sm:w-auto">
            <button className="w-full group relative px-8 py-4 bg-emerald-500 text-zinc-950 font-bold rounded-xl transition-all hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2">
              Iniciar Proyecto
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          
          <Link to="/projects" className="w-full sm:w-auto">
            <button className="w-full group px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-xl hover:border-emerald-500/50 transition-all flex items-center justify-center gap-2">
              Ver Portfolio
              <Terminal className="w-5 h-5 text-emerald-500" />
            </button>
          </Link>
        </motion.div>

        {/* STATS SECTION - Re-diseñado para impacto */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { label: 'Ciclo Académico', value: '07', icon: <Cpu size={20}/> },
            { label: 'Cursos Completados', value: '37+', icon: <Database size={20}/> },
            { label: 'Proyectos', value: '8+', icon: <Cloud size={20}/> }
          ].map((stat, i) => (
            <div key={i} className="group p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl hover:border-emerald-500/30 transition-all hover:-translate-y-1 backdrop-blur-sm">
              <div className="flex justify-center text-emerald-500 mb-3 group-hover:scale-100 transition-transform">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-1 font-mono">{stat.value}</div>
              <div className="text-zinc-500 text-xs uppercase tracking-widest font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* TECH STACK FLOATING PILLS */}
        <motion.div variants={itemVariants} className="mt-20 pt-10 border-t border-zinc-900">
          <p className="text-zinc-600 text-[13px] uppercase tracking-[0.3em] mb-8">Ecosistema Tecnológico</p>
          <div className="flex flex-wrap justify-center gap-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-700">
            {['React', 'Node.js', 'AWS', 'MySQL', 'Docker', 'Git'].map((tech) => (
              <span key={tech} className="px-4 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded-full text-zinc-400 text-xs font-mono margin-bottom: 4px hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </div>
  )
}

export default Home