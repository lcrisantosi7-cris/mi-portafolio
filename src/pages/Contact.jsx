import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, Phone, MapPin, Send, Linkedin, Github, 
  CheckCircle2, Loader2, ArrowRight, Copy, Terminal 
} from 'lucide-react'

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [focusedField, setFocusedField] = useState(null)
  const [copied, setCopied] = useState(false)

  const contactInfo = [
    {
      id: 'email',
      icon: Mail,
      label: 'Email',
      value: 'luiscrisantosi7@gmail.com',
      action: 'copy', // Special action for email
      link: 'mailto:luiscrisantosi7@gmail.com'
    },
    {
      id: 'phone',
      icon: Phone,
      label: 'WhatsApp',
      value: '+51 943 759 634',
      action: 'link',
      link: 'https://wa.me/51943759634'
    },
    {
      id: 'location',
      icon: MapPin,
      label: 'Base de Operaciones',
      value: 'Piura, Perú (Remote Available)',
      action: 'none',
      link: '#'
    }
  ]

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/luis-crisanto-silupú' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/lcrisantosi7-cris/' }
  ]

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('loading')

    // Simulación de API call
    setTimeout(() => {
      setStatus('success')
      setFormState({ name: '', email: '', message: '' })
      
      setTimeout(() => {
        setStatus('idle')
      }, 4000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-24 px-6 relative overflow-hidden flex items-center justify-center">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[10%] w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: Info & Context */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-500 text-xs font-mono font-bold uppercase tracking-widest">
                  Status: Disponible
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                Iniciemos una <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                  Colaboración
                </span>
              </h1>
              
              <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                ¿Tienes un desafío técnico complejo? Estoy listo para aportar arquitectura sólida y código limpio a tu próximo gran proyecto.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4 mb-12">
              {contactInfo.map((info) => (
                <div 
                  key={info.id}
                  className="group relative bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl flex items-center gap-5 transition-all hover:border-emerald-500/30 hover:bg-zinc-900/80"
                >
                  <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:border-emerald-500/50 transition-all">
                    <info.icon className="text-zinc-400 group-hover:text-emerald-500 transition-colors" size={20} />
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">{info.label}</p>
                    <p className="text-white font-medium truncate">{info.value}</p>
                  </div>

                  {info.action === 'copy' && (
                    <button 
                      onClick={() => copyToClipboard(info.value)}
                      className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors relative"
                    >
                      {copied ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                      {copied && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-emerald-500 text-zinc-950 font-bold px-2 py-1 rounded">
                          Copiado!
                        </span>
                      )}
                    </button>
                  )}
                  
                  {info.action === 'link' && (
                    <a 
                      href={info.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                      <ArrowRight size={18} />
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 hover:text-white hover:border-emerald-500 hover:bg-emerald-500/10 hover:-translate-y-1 transition-all duration-300"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: The Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Terminal/Window Decoration */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-2xl"></div>
            
            <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
              
              {/* Form Header */}
              <div className="flex items-center gap-3 mb-8 pb-8 border-b border-zinc-800">
                <Terminal className="text-emerald-500" size={24} />
                <h3 className="text-xl font-bold text-white">Enviar Mensaje</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="relative group">
                  <label 
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'name' || formState.name 
                        ? '-top-2.5 bg-zinc-900 px-2 text-xs text-emerald-500 font-bold' 
                        : 'top-3.5 text-zinc-500'
                    }`}
                  >
                    Tu Nombre
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                  />
                </div>

                {/* Email Input */}
                <div className="relative group">
                  <label 
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'email' || formState.email 
                        ? '-top-2.5 bg-zinc-900 px-2 text-xs text-emerald-500 font-bold' 
                        : 'top-3.5 text-zinc-500'
                    }`}
                  >
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                  />
                </div>

                {/* Message Input */}
                <div className="relative group">
                  <label 
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'message' || formState.message 
                        ? '-top-2.5 bg-zinc-900 px-2 text-xs text-emerald-500 font-bold' 
                        : 'top-3.5 text-zinc-500'
                    }`}
                  >
                    Detalles del Proyecto
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                    status === 'success' 
                      ? 'bg-emerald-500 text-zinc-950 cursor-default' 
                      : 'bg-white text-zinc-950 hover:bg-zinc-200'
                  }`}
                >
                  {status === 'loading' && (
                    <Loader2 className="animate-spin" />
                  )}
                  {status === 'success' && (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Mensaje Enviado
                    </>
                  )}
                  {status === 'idle' && (
                    <>
                      Enviar Propuesta
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Success Message Overlay (Optional Visual Flair) */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-zinc-900/90 backdrop-blur-sm flex flex-col items-center justify-center z-20"
                  >
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                    >
                      <CheckCircle2 size={40} className="text-zinc-900" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">¡Recibido!</h3>
                    <p className="text-zinc-400 text-center max-w-xs">
                      Analizaré tu propuesta y te responderé en breve.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default Contact