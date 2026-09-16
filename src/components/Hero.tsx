import { motion } from "framer-motion"
import { ArrowRight, Brain, Zap, Coffee } from "lucide-react"

export function Hero() {
    return (
        <section className="relative py-12 md:py-20 flex items-center justify-center overflow-hidden bg-mesh transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">



                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black font-montserrat tracking-tight mb-6 max-w-5xl mx-auto leading-[1.1] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
                >
                    Revoluciona tu <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-uccuyoGold to-yellow-200 drop-shadow-[0_4px_16px_rgba(232,161,51,0.3)]">manera de estudiar.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-lg md:text-2xl text-blue-100/90 mb-8 max-w-3xl mx-auto leading-relaxed font-normal drop-shadow-sm"
                >
                    El equilibrio perfecto entre foco profundo y bienestar mental. Accede a herramientas inteligentes para dominar tu carrera sin estrés.
                </motion.p>

                {/* Interactive Tags */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="flex flex-wrap items-center justify-center gap-3 mb-12"
                >
                    <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-400/40 text-green-300 font-bold text-sm shadow-[0_0_20px_rgba(34,197,94,0.3)] backdrop-blur-md">
                        <Zap className="w-4 h-4" /> Temporizador de Estudio
                    </span>
                    <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-400/40 text-green-300 font-bold text-sm shadow-[0_0_20px_rgba(34,197,94,0.3)] backdrop-blur-md">
                        <Coffee className="w-4 h-4" /> Pausas Conscientes
                    </span>
                    <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-400/40 text-green-300 font-bold text-sm shadow-[0_0_20px_rgba(34,197,94,0.3)] backdrop-blur-md">
                        <Brain className="w-4 h-4" /> Enfoque Total
                    </span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-4xl mx-auto"
                >
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('open-focus-timer'))}
                        aria-label="Activar Modo Concentración"
                        className="group relative inline-flex items-center justify-center px-10 py-5 rounded-full bg-gradient-to-r from-amber-500 via-uccuyoGold to-yellow-400 text-slate-950 font-black text-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(232,161,51,0.6)] active:scale-95 w-full sm:w-auto shadow-[0_0_25px_rgba(232,161,51,0.4)]"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Modo Concentración
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 transition-transform duration-500 ease-out" />
                    </button>

                    <a
                        href="#juegos"
                        className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-white/15 border border-white/25 text-white font-extrabold text-xl hover:bg-white/25 hover:border-white/40 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uccuyoGold w-full sm:w-auto shadow-xl backdrop-blur-md"
                    >
                        Tomar un Respiro
                    </a>
                </motion.div>
            </div>

            {/* Decorative blurry blobs */}
            <div className="absolute top-1/2 left-1/4 w-[40rem] h-[40rem] bg-uccuyoGreen/30 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
            <div className="absolute bottom-0 right-1/4 w-[50rem] h-[50rem] bg-uccuyoGold/10 rounded-full blur-[150px] translate-x-1/2 translate-y-1/4 pointer-events-none opacity-40" />
        </section>
    )
}
