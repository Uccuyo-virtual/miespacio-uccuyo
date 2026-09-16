import { motion, AnimatePresence } from "framer-motion"
import { Clock, TrendingDown, Target, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const advantages = [
    {
        id: 1,
        title: "Flexibilidad Horaria",
        description: "Estudia a tu propio ritmo. El campus virtual se adapta a tu horario laboral o familiar, no al revés.",
        icon: <Clock className="w-8 h-8 text-white" />,
        color: "bg-primary",
        gradient: "from-primary/10 to-transparent"
    },
    {
        id: 2,
        title: "Ahorro de Costos y Tiempo",
        description: "Elimina los tiempos de traslado y costos asociados. Optimiza tu inversión directamente en tu educación.",
        icon: <TrendingDown className="w-8 h-8 text-white" />,
        color: "bg-techPurple",
        gradient: "from-techPurple/10 to-transparent"
    },
    {
        id: 3,
        title: "Autogestión del Aprendizaje",
        description: "Toma el control absoluto de tus metas académicas con tableros interactivos y métricas de progreso personalizadas.",
        icon: <Target className="w-8 h-8 text-white" />,
        color: "bg-accent",
        gradient: "from-accent/10 to-transparent"
    }
]

export function AdvantageSlider() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === advantages.length - 1 ? 0 : prev + 1))
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? advantages.length - 1 : prev - 1))
    }

    return (
        <section id="beneficios" className="py-24 bg-background transition-colors duration-500 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-12 items-center">

                    <div className="md:w-1/3">
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight"
                        >
                            Ventajas del <span className="text-uccuyoGold">Campus Virtual</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="text-gray-400 mb-8"
                        >
                            UCCuyo Virtual transforma la forma en que aprendes. Descubre por qué la virtualidad es tu aliado estratégico más fuerte.
                        </motion.p>
                        
                        {/* Controles del Carrusel (Botones) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            className="flex items-center gap-4 mt-8"
                        >
                            <button 
                                onClick={prevSlide}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent hover:bg-white/5 transition-all shadow-sm group"
                                aria-label="Anterior ventaja"
                            >
                                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                            </button>
                            <button 
                                onClick={nextSlide}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent hover:bg-white/5 transition-all shadow-sm group"
                                aria-label="Siguiente ventaja"
                            >
                                <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </motion.div>
                    </div>

                    <div className="md:w-2/3 relative w-full h-[320px] sm:h-[280px] md:h-[350px]">
                        {/* Tarjeta Animada del Carrusel */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className={`absolute inset-0 glass-card p-8 sm:p-10 rounded-[2rem] border border-white/10 flex flex-col justify-center bg-gradient-to-br ${advantages[currentIndex].gradient} backdrop-blur-md shadow-2xl overflow-hidden`}
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${advantages[currentIndex].color} bg-opacity-90`}>
                                    {advantages[currentIndex].icon}
                                </div>
                                <h3 className="text-2xl font-bold font-montserrat mb-4 text-white uppercase tracking-wider">{advantages[currentIndex].title}</h3>
                                <p className="text-gray-300 leading-relaxed font-inte text-lg">{advantages[currentIndex].description}</p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Indicadores / Dots del Carrusel */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
                            {advantages.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    aria-label={`Ir a la tarjeta ${i + 1}`}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        i === currentIndex 
                                            ? 'w-8 bg-accent shadow-[0_0_15px_rgba(0,229,255,0.4)]' 
                                            : 'w-2 bg-gray-700 hover:bg-gray-600'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
