import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import socaloWeb2 from "../assets/images/socalo-web2.png"

export function InstitutionalZocalo() {
    const [modalType, setModalType] = useState<'terms' | 'privacy' | 'support' | null>(null)

    return (
        <footer className="w-full overflow-hidden relative z-20 m-0 p-0 bg-slate-950" aria-label="Zócalo Institucional UCCuyo">
            <div className="relative w-full">
                <img
                    src={socaloWeb2}
                    alt="Universidad Católica de Cuyo - UCCuyo A Distancia"
                    width={1920}
                    height={402}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto aspect-[1920/402] sm:aspect-auto sm:h-[150px] md:h-[180px] lg:h-[200px] object-contain sm:object-cover object-center block"
                />

                {/* Barra de texto legal y enlaces dentro de la imagen al final de la web */}
                <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-6 pb-2.5 px-4 sm:px-8">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-[11px] sm:text-xs text-gray-400 font-inte gap-2">
                        <p className="text-center sm:text-left text-gray-400 font-normal">
                            © 2026 Universidad Católica de Cuyo. Todos los derechos reservados.
                        </p>
                        <div className="flex items-center gap-4 sm:gap-6 font-medium text-gray-400">
                            <button 
                                onClick={() => setModalType('terms')} 
                                className="text-gray-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 outline-none text-[11px] sm:text-xs"
                            >
                                Términos de Uso
                            </button>
                            <button 
                                onClick={() => setModalType('privacy')} 
                                className="text-gray-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 outline-none text-[11px] sm:text-xs"
                            >
                                Privacidad
                            </button>
                            <button 
                                onClick={() => setModalType('support')} 
                                className="text-gray-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 outline-none text-[11px] sm:text-xs"
                            >
                                Soporte IA
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modales informativos */}
            <AnimatePresence>
                {modalType && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="relative max-w-lg w-full bg-background border border-white/10 rounded-3xl p-8 text-left shadow-2xl glass-panel text-white"
                        >
                            <button
                                onClick={() => setModalType(null)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                                aria-label="Cerrar modal"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {modalType === 'terms' && (
                                <>
                                    <h3 className="text-2xl font-black font-montserrat mb-4 text-uccuyoGold">
                                        Términos de Uso
                                    </h3>
                                    <p className="text-gray-300 font-inte leading-relaxed mb-4">
                                        Bienvenido a la plataforma de Estudio Inmersivo de la UCCuyo. Esta herramienta está diseñada para potenciar tu concentración, bienestar y rendimiento académico a través de paisajes sonoros y utilidades interactivas.
                                    </p>
                                    <p className="text-gray-300 font-inte leading-relaxed">
                                        Al utilizar este sitio web, te comprometes a usar los recursos de manera ética, respetuosa y exclusivamente para fines académicos y de desarrollo personal.
                                    </p>
                                </>
                            )}

                            {modalType === 'privacy' && (
                                <>
                                    <h3 className="text-2xl font-black font-montserrat mb-4 text-uccuyoGold">
                                        Privacidad
                                    </h3>
                                    <p className="text-gray-300 font-inte leading-relaxed mb-4">
                                        Tu privacidad es nuestra prioridad absoluta. Toda tu actividad, incluyendo tus notas personales en la plataforma, se almacena exclusivamente de forma local en tu navegador (LocalStorage).
                                    </p>
                                    <p className="text-gray-300 font-inte leading-relaxed">
                                        No recolectamos, rastreamos ni compartimos información personal ni métricas de uso con servidores externos ni terceros. Tu estudio está bajo tu propio control.
                                    </p>
                                </>
                            )}

                            {modalType === 'support' && (
                                <>
                                    <h3 className="text-2xl font-black font-montserrat mb-4 text-uccuyoGold">
                                        Soporte IA
                                    </h3>
                                    <p className="text-gray-300 font-inte leading-relaxed mb-4">
                                        El Soporte IA de nuestra plataforma está concebido para asistirte como copiloto de aprendizaje, facilitando la organización de tus horarios y el enfoque en tus materias.
                                    </p>
                                    <p className="text-gray-300 font-inte leading-relaxed">
                                        Si tienes sugerencias o consultas técnicas, el equipo de UCCuyo Virtual está a tu entera disposición a través de los canales institucionales.
                                    </p>
                                </>
                            )}

                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={() => setModalType(null)}
                                    className="px-6 py-2.5 font-bold font-montserrat text-sm text-black bg-uccuyoGold hover:bg-white rounded-full transition-colors"
                                >
                                    Entendido
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </footer>
    )
}
