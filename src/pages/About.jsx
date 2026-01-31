import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Code, Server, Terminal, Cpu, Award, ChevronRight, Download } from 'lucide-react'
import { motion } from 'framer-motion'

const About = () => {
  const skills = [
    { name: 'Node.js', status: 'Mastering' },
    { name: 'MySQL & SQL Server', status: 'Expert' },
    { name: 'React & Vue.js', status: 'Learning' },
    { name: 'AWS Cloud', status: 'Learning' },
    { name: 'PHP & Backend', status: 'Expert' },
    { name: 'System Architecture', status: 'Learning' }
  ]

  const stats = [
    { label: 'Ciclo Actual', value: '7mo', icon: Cpu },
    { label: 'Universidad', value: 'UCV', icon: GraduationCap },
    { label: 'Especialidad', value: 'Full Stack', icon: Code },
    { label: 'Enfoque', value: 'Backend', icon: Server }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden pt-28 pb-20">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        {/* HEADER SECTION */}
        <motion.div variants={fadeInUp} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-12 bg-emerald-500" />
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-[0.3em]">Discovery Mode</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-emerald-400 tracking-tighter italic">
            SOBRE <span className="text-white outline-text">MÍ</span>
          </h1>
        </motion.div>

        {/* QUICK STATS GRID */}
        <motion.div variants={fadeInUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="relative group overflow-hidden bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl hover:border-emerald-500/40 transition-all">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-30 transition-opacity">
                <stat.icon size={40} className="text-emerald-400" />
              </div>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* MAIN CONTENT SPLIT */}
        <div className="grid lg:grid-cols-12 gap-12">

          {/* LEFT: BIO & SKILLS (8 Cols) */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div variants={fadeInUp} className="prose prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Terminal className="text-emerald-500" />
                _ejecutar_perfil.sh
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Como futuro <span className="text-white font-medium italic">Ingeniero de Sistemas</span>, mi enfoque va más allá de escribir código; se trata de diseñar arquitecturas que resuelvan problemas reales.
                Actualmente, estoy en el <span className="text-emerald-400">7mo ciclo</span>, perfeccionando mi capacidad para construir sistemas robustos y escalables.
              </p>
              <p className="text-zinc-500 leading-relaxed">
                Mi pasión reside en el <span className="text-zinc-300">Backend</span>, donde la lógica y la eficiencia dictan el éxito de una aplicación.
                Sin embargo, mi curiosidad me mantiene en constante evolución, explorando el ecosistema Cloud y el Frontend moderno para ser un profesional <span className="text-emerald-400">T-Shaped</span>.
              </p>
            </motion.div>

            {/* SKILLS BOX */}
            <motion.div variants={fadeInUp} className="bg-zinc-900/20 border border-zinc-800/50 p-8 rounded-3xl">
              <h3 className="text-white font-bold mb-8 flex items-center gap-2 uppercase text-sm tracking-widest">
                <Award size={18} className="text-emerald-500" /> Core Tech Stack
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 group hover:bg-emerald-500/5 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                      <span className="text-zinc-300 group-hover:text-white transition-colors">{skill.name}</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${skill.status === 'Learning'
                        ? 'border-yellow-500/30 text-yellow-500/70'
                        : 'border-emerald-500/30 text-emerald-500/70'
                      }`}>
                      {skill.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ACTION BUTTONS */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link to="/contact" className="px-8 py-4 bg-emerald-500 text-zinc-950 font-bold rounded-2xl hover:bg-emerald-400 transition-all flex items-center gap-2 group">
                ¿Trabajamos juntos?
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-2xl hover:border-zinc-600 transition-all flex items-center gap-2 group">
                Descargar CV
                <Download size={18} className="text-zinc-500 group-hover:text-emerald-400 transition-colors" />
              </button>
            </motion.div>
          </div>

          {/* RIGHT: TIMELINE / ACADEMIC (5 Cols) */}
          <motion.div variants={fadeInUp} className="lg:col-span-5 relative">
            <div className="sticky top-28 p-8 bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16" />

              <h3 className="text-2xl font-bold text-white mb-8">Trayectoria Académica</h3>

              <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-800">

                {/* Item 1 */}
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-zinc-950 border-2 border-emerald-500 z-10" />
                  <div>
                    <span className="text-emerald-500 font-mono text-sm">2022 — Presente</span>
                    <h4 className="text-white font-bold text-lg leading-tight mt-1">Ingeniería de Sistemas y Computación</h4>
                    <p className="text-zinc-500 text-sm italic">Universidad César Vallejo</p>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {['Top 10%', 'Sistemas Operativos', 'Estructura de Datos'].map(tag => (
                        <span key={tag} className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded-md">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Item 2 (Cursos) */}
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-zinc-950 border-2 border-zinc-700 z-10" />
                  <div>
                    <h4 className="text-zinc-300 font-bold text-lg leading-tight">Módulos de Especialidad</h4>
                    <ul className="mt-4 space-y-3">
                      {[
                        { title: 'Ingeniería Web', desc: 'Full Stack Development focus' },
                        { title: 'Arquitectura de Sistemas', desc: 'Design patterns & Clean Architecture' },
                        { title: 'Gestión de Datos II', desc: 'Advanced SQL & Data Modeling' }
                      ].map((course, i) => (
                        <li key={i} className="group">
                          <p className="text-zinc-300 text-sm font-medium group-hover:text-emerald-400 transition-colors tracking-tight">{course.title}</p>
                          <p className="text-zinc-600 text-[11px]">{course.desc}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Terminal Quote */}
              <div className="mt-10 p-4 bg-zinc-950 rounded-xl border border-zinc-800 font-mono text-[11px]">
                <p className="text-emerald-500/70 leading-relaxed">
                  <span className="text-zinc-600">$</span> locate motivation<br />
                  <span className="text-zinc-400">"Mi meta es automatizar el presente para diseñar el futuro."</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* CSS For Outline Text Effect */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .outline-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
        }
      `}} />
    </div>
  )
}

export default About