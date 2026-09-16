import { motion } from "framer-motion"
import { Monitor, Wifi, Zap, CheckCircle2, Shield } from "lucide-react"
import { useState } from "react"

export function CampusPreview() {
    const [speed, setSpeed] = useState(0)
    const [isTesting, setIsTesting] = useState(false)
    const [quality, setQuality] = useState("")

    const runTest = () => {
        setIsTesting(true)
        setSpeed(0)
        let count = 0
        const interval = setInterval(() => {
            setSpeed(Math.floor(Math.random() * 50) + 50)
            count++
            if (count > 20) {
                clearInterval(interval)
                setIsTesting(false)
                setQuality("Óptima para Clases en Vivo")
            }
        }, 100)
    }

    return (
        <section className="py-24 bg-background overflow-hidden transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left: Device Mockup */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative mx-auto border-gray-800 dark:border-gray-700 bg-gray-800 dark:bg-gray-700 border-[14px] rounded-[2.5rem] h-[454px] w-[341px] md:h-[600px] md:w-[100%] max-w-[800px] shadow-2xl">
                            <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-700 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
                            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-700 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-700 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                            <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-700 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-surface relative">
                                {/* Simulated Campus UI */}
                                <div className="absolute inset-0 bg-gradient-to-br from-institutionalBlue/5 to-techPurple/5">
                                    <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-institutionalBlue flex items-center justify-center">
                                                <Monitor className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="font-bold text-white">Campus Virtual</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="w-8 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                            <div className="w-4 h-4 rounded-full bg-gray-100 dark:bg-gray-700"></div>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded-full mb-6"></div>
                                        <div className="grid grid-cols-2 gap-4 mb-8">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className="aspect-video rounded-xl bg-card border border-border p-4 shadow-sm">
                                                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-600 rounded-full mb-2"></div>
                                                    <div className="h-2 w-2/3 bg-gray-50 dark:bg-gray-500 rounded-full"></div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-6 rounded-2xl bg-institutionalBlue/10 dark:bg-blue-900/20 border border-institutionalBlue/20">
                                            <div className="flex items-center gap-3 mb-4">
                                                <Zap className="w-5 h-5 text-institutionalBlue dark:text-blue-400" />
                                                <span className="font-semibold text-institutionalBlue dark:text-blue-400 text-sm">Clase en Vivo: Anatomía II</span>
                                            </div>
                                            <div className="h-32 rounded-xl bg-gray-900/10 dark:bg-black/20 flex items-center justify-center">
                                               <p className="text-xs text-gray-500 dark:text-gray-400">Streaming HD activado</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Status Floaties */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -top-6 -right-6 glass-panel p-4 rounded-2xl shadow-xl z-20"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500/20 rounded-lg">
                                    <Shield className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium">Estado del Server</p>
                                    <p className="text-sm font-bold text-white">Estable - 100%</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right: Connectivity Checker */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold font-montserrat tracking-tight mb-4 text-white">
                                Tu conexión, nuestra <span className="text-gradient">Prioridad</span>
                            </h2>
                            <p className="text-gray-400 mb-8 max-w-md">
                                Nuestra plataforma enterprise está optimizada incluso para conexiones de baja latencia. Prueba tu velocidad ahora.
                            </p>
                        </div>

                        <div className="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Wifi className="w-24 h-24 text-accent" />
                            </div>
                            
                            <div className="relative z-10">
                                <div className="text-center mb-10">
                                    <span className="text-6xl font-black font-montserrat text-accent">
                                        {speed}
                                    </span>
                                    <span className="text-xl font-medium text-gray-400 ml-2">Mbps</span>
                                    <p className="text-sm font-inte mt-2 text-gray-400">Latencia: 12ms</p>
                                </div>

                                <button 
                                    onClick={runTest}
                                    disabled={isTesting}
                                    className={`w-full py-4 rounded-xl font-bold text-white transition-all transform active:scale-95 ${
                                        isTesting 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-institutionalBlue hover:bg-techPurple shadow-lg'
                                    }`}
                                >
                                    {isTesting ? "Comprobando..." : "Test de Velocidad Virtual"}
                                </button>

                                {quality && !isTesting && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                                        <span className="text-sm font-semibold text-green-300">{quality}</span>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-card border border-border">
                                <p className="text-xs text-muted-foreground mb-1">Mínimo Requerido</p>
                                <p className="text-lg font-bold text-foreground">5 Mbps</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-card border border-border">
                                <p className="text-xs text-muted-foreground mb-1">Recomendado HD</p>
                                <p className="text-lg font-bold text-foreground">10 Mbps</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
