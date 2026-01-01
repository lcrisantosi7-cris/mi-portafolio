import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft, Search, Code, Zap } from 'lucide-react'

const NotFound = () => {
    const navigate = useNavigate()
    const [countdown, setCountdown] = useState(10)

    useEffect(() => {
        // Contador regresivo para redirección automática
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        } else {
            navigate('/')
        }
    }, [countdown, navigate])

    const quickLinks = [
        { name: 'Inicio', path: '/', icon: Home },
        { name: 'Sobre Mí', path: '/about', icon: Code },
        { name: 'Proyectos', path: '/projects', icon: Zap },
        { name: 'Contacto', path: '/contact', icon: Search }
    ]

    return (
        <div className="min-h-screen bg-zinc-900 relative overflow-hidden flex items-center justify-center px-6">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl animate-pulse" />

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 border-4 border-zinc-700 rounded-full animate-float opacity-20" />
            <div className="absolute bottom-20 right-10 w-32 h-32 border-4 border-zinc-700 rounded-lg animate-float-delayed opacity-20" />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Main Content */}
                <div className="mb-12">
                    {/* 404 Giant Number with Glitch Effect */}
                    <div className="relative inline-block mb-8">
                        <h1 className="text-[200px] md:text-[300px] font-black leading-none">
                            <span className="text-transparent bg-clip-text bg-linear-to-br from-red-500 via-emerald-400 to-blue-500 animate-gradient">
                                404
                            </span>
                        </h1>

                        {/* Glitch layers */}
                        <div className="absolute top-0 left-0 text-[200px] md:text-[300px] font-black leading-none text-red-500 opacity-20 animate-glitch-1">
                            404
                        </div>
                        <div className="absolute top-0 left-0 text-[200px] md:text-[300px] font-black leading-none text-emerald-400 opacity-20 animate-glitch-2">
                            404
                        </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-4 mb-8">
                        <h2 className="text-3xl md:text-5xl font-bold text-white">
                            ¡Oops! Página no encontrada
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            La página que buscas no existe o ha sido movida.
                            Pero no te preocupes, aquí hay algunos enlaces útiles.
                        </p>
                    </div>

                    {/* Countdown */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-zinc-800 border border-zinc-700 rounded-full mb-8">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-gray-300 text-sm">
                            Redirigiendo al inicio en{' '}
                            <span className="text-emerald-400 font-bold text-lg">{countdown}</span>s
                        </span>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {quickLinks.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => navigate(link.path)}
                                className="group bg-linear-to-br from-zinc-800 to-zinc-900 p-6 rounded-xl border border-zinc-700 hover:border-emerald-400/50 transition-all hover:transform hover:scale-105"
                            >
                                <link.icon className="w-8 h-8 text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                                <p className="text-white font-medium group-hover:text-emerald-400 transition">
                                    {link.name}
                                </p>
                            </button>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-8 py-3 bg-zinc-800 border-2 border-zinc-700 text-gray-300 rounded-lg hover:border-emerald-400 hover:text-emerald-400 font-bold transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Volver Atrás
                        </button>

                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 px-8 py-3 bg-emerald-400 text-zinc-900 rounded-lg hover:bg-emerald-500 font-bold transition-all transform hover:scale-105"
                        >
                            <Home className="w-5 h-5" />
                            Ir al Inicio
                        </button>
                    </div>
                </div>

                {/* Fun Message */}
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 max-w-2xl mx-auto">
                    <p className="text-gray-400 text-sm italic">
                        💡 <span className="text-emerald-400 font-semibold">Dato curioso:</span> El error 404
                        se llama así porque se originó en el cuarto 404 del CERN,
                        donde estaba el primer servidor web del mundo.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NotFound