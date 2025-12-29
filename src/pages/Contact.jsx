import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, Linkedin, Github, CheckCircle, AlertCircle } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  })

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'luiscrisantosi7@gmail.com',
      link: 'mailto:luiscrisantosi7@gmail.com',
      color: 'emerald'
    },
    {
      icon: Phone,
      title: 'Teléfono / WhatsApp',
      value: '+51 943 759 634',
      link: 'https://wa.me/51943759634',
      color: 'blue'
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      value: 'Piura, Perú',
      //link: '#',
      color: 'purple'
    }
  ]

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/luis-crisanto-silupú',
      color: 'blue'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/lcrisantosi7-cris/',
      color: 'gray'
    }
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Simulación de envío (aquí integrarías con tu backend o servicio de email)
    setFormStatus({
      submitted: true,
      success: false,
      message: 'Enviando mensaje...'
    })

    // Simular delay de envío
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: '¡Mensaje enviado con éxito! Te responderé pronto.'
      })
      
      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })

      // Limpiar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ''
        })
      }, 5000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-zinc-900 py-24 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-400/10 border border-emerald-400/30 rounded-full mb-6">
            <Send className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium text-xs uppercase tracking-widest">
              Hablemos
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Ponte en Contacto
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? Estoy disponible para nuevas oportunidades y colaboraciones
          </p>
          <div className="h-1 w-24 bg-linear-to-r from-emerald-400 to-transparent mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Información de Contacto
              </h2>
              <p className="text-gray-400 mb-8">
                No dudes en contactarme por cualquiera de estos medios. Respondo en menos de 24 horas.
              </p>

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-linear-to-br from-zinc-800 to-zinc-900 p-6 rounded-xl border border-zinc-700 hover:border-emerald-400/50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-400/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-400/20 transition-colors">
                        <info.icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">{info.title}</p>
                        <p className="text-white font-semibold group-hover:text-emerald-400 transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Redes Sociales</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-zinc-800 rounded-lg border border-zinc-700 hover:border-emerald-400/50 flex items-center justify-center text-gray-400 hover:text-emerald-400 transition-all group"
                    aria-label={social.name}
                  >
                    <social.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Card */}
            <div className="bg-linear-to-br from-emerald-400/10 to-emerald-500/5 p-6 rounded-xl border border-emerald-400/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <h3 className="text-lg font-bold text-white">Disponible para proyectos</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Actualmente disponible para proyectos freelance y oportunidades laborales. 
                Tiempo de respuesta promedio: 24 horas.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-linear-to-br from-zinc-800 to-zinc-900 p-8 rounded-2xl border border-zinc-700">
            <h2 className="text-2xl font-bold text-white mb-6">Envíame un Mensaje</h2>
            
            {/* Form Status Messages */}
            {formStatus.submitted && (
              <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                formStatus.success 
                  ? 'bg-emerald-400/10 border border-emerald-400/30' 
                  : 'bg-yellow-400/10 border border-yellow-400/30'
              }`}>
                {formStatus.success ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0" />
                )}
                <p className={formStatus.success ? 'text-emerald-400' : 'text-yellow-400'}>
                  {formStatus.message}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-gray-400 text-sm font-medium mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  placeholder="Tu nombre"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-400 text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-gray-400 text-sm font-medium mb-2">
                  Asunto *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  placeholder="¿En qué puedo ayudarte?"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-gray-400 text-sm font-medium mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                  placeholder="Cuéntame sobre tu proyecto..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formStatus.submitted && !formStatus.success}
                className="w-full py-4 bg-emerald-400 text-zinc-900 font-bold rounded-lg hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus.submitted && !formStatus.success ? (
                  <>
                    <div className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Mensaje
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact