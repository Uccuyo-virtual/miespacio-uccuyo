import { motion } from "framer-motion"
import { ShieldCheck, Star } from "lucide-react"

const testimonials = [
    {
        id: 1,
        name: "Mariana R.",
        career: "Licenciatura en Marketing",
        text: "La plataforma Moodle de la Universidad nunca me falló. Los simuladores de IA me prepararon para entrevistas reales. Es un antes y un después en educación.",
        avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
        id: 2,
        name: "Carlos T.",
        career: "Tecnicatura en Programación",
        text: "El networking global me permitió contactar con devs de España. La biblioteca y las herramientas siempre están ahí, sin excusas ni cortes.",
        avatar: "https://i.pravatar.cc/150?img=11"
    },
    {
        id: 3,
        name: "Sofía G.",
        career: "Derecho (Modalidad Virtual)",
        text: "Pensé que online sería frío, pero la comunidad y la robustez de las herramientas de UCCuyo hicieron que la carrera sea mucho más rica y dinámica.",
        avatar: "https://i.pravatar.cc/150?img=9"
    }
]

export function SocialProof() {
    return (
        <section id="comunidad" className="py-24 bg-background relative overflow-hidden transition-colors duration-500">
            {/* Decorative backdrop */}
            <div className="absolute top-0 right-0 -mt-20 w-1/2 h-full bg-techPurple/10 blur-[120px] pointer-events-none rounded-full" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Robustness Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 shadow-2xl transition-all"
                >
                    <div className="flex bg-primary p-3 rounded-xl shadow-lg shadow-primary/20">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center sm:text-left">
                        <h4 className="font-montserrat font-bold text-lg text-white leading-tight">Plataforma Moodle Nivel Enterprise</h4>
                        <p className="text-sm text-gray-400 font-inte">Infraestructura garantizada con 99.9% de uptime para tu cursado.</p>
                    </div>
                </motion.div>

                {/* Testimonials */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold font-montserrat tracking-tight mb-4 text-white"
                    >
                        Voces de nuestra <span className="text-gradient">Comunidad</span>
                    </motion.h2>
                    <p className="text-gray-400">Alumnos que ya lideran el futuro gracias a la educación virtual.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testi, i) => (
                        <motion.div
                            key={testi.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: i * 0.2 }}
                            className="glass-card rounded-3xl p-8 shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, idx) => (
                                    <Star key={idx} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            <p className="text-gray-300 italic mb-8 font-inte relative z-10">"{testi.text}"</p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className="relative">
                                    <img
                                        src={testi.avatar}
                                        alt={testi.name}
                                        className="w-12 h-12 rounded-full ring-2 ring-electricCyan/50 relative z-10"
                                    />
                                    <div className="absolute inset-0 bg-electricCyan rounded-full animate-ping opacity-20 group-hover:opacity-40 transition-opacity" />
                                </div>
                                <div>
                                    <h4 className="font-bold font-montserrat text-white">{testi.name}</h4>
                                    <p className="text-xs text-accent font-semibold uppercase tracking-wider">{testi.career}</p>
                                </div>
                            </div>

                            <div className="absolute bottom-[-20%] right-[-10%] opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                                <ShieldCheck className="w-40 h-40 text-institutionalBlue" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
