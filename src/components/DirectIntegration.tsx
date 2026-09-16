import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { trackEvent } from "../lib/analytics"

export function DirectIntegration() {
    return (
        <section className="relative py-24 bg-background text-white overflow-hidden transition-colors duration-500">
            {/* Dynamic Background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary to-transparent opacity-50" />
                <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-techPurple to-transparent opacity-50" />
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-8 inline-flex items-center justify-center"
                >
                    <h2 className="text-4xl md:text-5xl font-black font-montserrat tracking-tight text-white">
                        ¿Listo para <span className="text-uccuyoGold">empezar?</span>
                    </h2>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="text-xl md:text-2xl font-inte max-w-3xl mx-auto mb-10 text-gray-300 leading-relaxed font-normal"
                >
                    Accede directamente a tu campus virtual <span className="text-white font-bold">UCCuyo</span> y experimenta
                    la evolución del aprendizaje a distancia desde hoy.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex justify-center"
                >
                    <a
                        href="https://virtual.uccuyo.edu.ar/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('click_campus_virtual', { location: 'bottom_cta' })}
                        className="group relative inline-flex items-center justify-center px-10 py-5 font-bold font-montserrat text-white bg-primary rounded-full shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent focus:ring-opacity-50 overflow-hidden"
                    >
                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-accent rounded-full group-hover:w-[150%] group-hover:h-[500%] group-hover:-translate-x-1/2 group-hover:translate-y-12"></span>

                        <span className="relative z-10 flex items-center gap-3 tracking-wide text-lg group-hover:text-background transition-colors">
                            Ingresar al Campus Virtual
                            <ExternalLink className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
