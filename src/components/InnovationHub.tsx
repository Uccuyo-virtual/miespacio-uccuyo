import { motion } from "framer-motion"
import { Cpu, Globe, ShieldCheck, Zap, BarChart3, Binary, Rocket } from "lucide-react"
import { useState, useEffect } from "react"

export function InnovationHub() {
    const [pulseData, setPulseData] = useState<number[]>([])
    
    // Career Time Machine State
    const [isPredicting, setIsPredicting] = useState(false)
    const [predictedRole, setPredictedRole] = useState<{title: string, desc: string} | null>(null)
    
    const roles = [
        { title: "Arquitecto de Neuro-Espacios", desc: "Diseñarás entornos virtuales que optimizan la sinapsis cerebral para el aprendizaje profundo.", tags: ["Tech / IT", "Medicina"] },
        { title: "Consultor de Jurisprudencia Blockchain", desc: "Resolverás conflictos legales en DAOs y economías descentralizadas mediante smart contracts.", tags: ["Derecho", "Tech / IT"] },
        { title: "Curador de Educación Quántica", desc: "Gestionarás currículos personalizados mediante algoritmos que predicen el talento nato de cada alumno.", tags: ["Estudio Nocturno", "Tech / IT"] },
        { title: "Auditor de Ética en Algoritmos Bio-Genéticos", desc: "Asegurarás que la IA aplicada a la medicina respete la privacidad y dignidad humana en el 2030.", tags: ["Medicina", "Derecho"] },
        { title: "Estratega de Gamificación Urbana", desc: "Convertirás las ciudades en tableros de juego interactivos para fomentar la salud y el networking.", tags: ["Videojuegos", "Emprendedores"] }
    ]

    const handlePredict = () => {
        setIsPredicting(true)
        setPredictedRole(null)
        
        // Load interests from localStorage
        const userInterests = JSON.parse(localStorage.getItem('userInterests') || '[]')
        
        setTimeout(() => {
            // Priority: Find a role that matches at least one user interest
            let possibleRoles = roles.filter(role => 
                role.tags.some(tag => userInterests.includes(tag))
            )
            
            // Fallback: If no matches, use all roles
            if (possibleRoles.length === 0) possibleRoles = roles
            
            const randomRole = possibleRoles[Math.floor(Math.random() * possibleRoles.length)]
            setPredictedRole(randomRole)
            setIsPredicting(false)
        }, 2000)
    }

    // Blockchain Vault State
    const [selectedBadge, setSelectedBadge] = useState<number | null>(null)
    const badges = [
        { 
            id: 1, 
            name: "Líder Tech", 
            icon: <Zap className="w-8 h-8 text-accent drop-shadow-[0_0_15px_rgba(0,229,255,0.8)]" />, 
            idTag: "0x82...12",
            desc: "Otorgado por excelencia en proyectos de IA.",
            benefits: "Reconocido por empresas del Silicon Valley."
        },
        { 
            id: 2, 
            name: "Analista Pro", 
            icon: <BarChart3 className="w-8 h-8 text-primary drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />, 
            idTag: "CRED: #402",
            desc: "Certificación en Big Data y Data Science.",
            benefits: "Validación instantánea en bolsas de empleo."
        }
    ]
    
    const [syncLevel, setSyncLevel] = useState(0)
    const [trends, setTrends] = useState([
        { name: "LegalTech", weight: 85, color: "bg-accent" },
        { name: "BioGenomics", weight: 72, color: "bg-primary" },
        { name: "NeuroEducation", weight: 94, color: "bg-techPurple" },
        { name: "CryptoEconomy", weight: 68, color: "bg-orange-500" }
    ])

    const handleSync = () => {
        setSyncLevel(100)
        setTimeout(() => setSyncLevel(0), 1000)
    }
    
    useEffect(() => {
        const interval = setInterval(() => {
            setPulseData(prev => {
                const newData = [...prev, Math.random() * 100 + (syncLevel > 0 ? 50 : 0)]
                if (newData.length > 20) return newData.slice(1)
                return newData
            })
            
            // Fluctuating trends
            setTrends(prev => prev.map(t => ({
                ...t,
                weight: Math.min(100, Math.max(10, t.weight + (Math.random() - 0.5) * 5))
            })))
        }, 1500)
        return () => clearInterval(interval)
    }, [syncLevel])

    return (
        <section id="labs" className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-4"
                        >
                            <Cpu className="w-3 h-3" />
                            UCCuyo Labs: Experimental
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-black font-montserrat tracking-tighter text-white uppercase italic"
                        >
                            The <span className="text-gradient">Innovation</span> Hub
                        </motion.h2>
                    </div>
                    <div className="flex flex-col items-end" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* 1. Mi Cerebro Colectivo (Pulse visualization) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8 glass-card rounded-[2.5rem] p-8 overflow-hidden relative border-white/10"
                    >
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-6">
                                    <Globe className="w-8 h-8 text-accent animate-pulse" />
                                    <div>
                                        <h3 className="text-2xl font-bold font-montserrat text-white">Cerebro Colectivo</h3>
                                        <p className="text-sm text-gray-500">Pulso de aprendizaje en tiempo real</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-6">
                                    {trends.map((trend, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-xs font-bold text-gray-400 uppercase mb-2">
                                                <span>{trend.name}</span>
                                                <span className="text-white">{Math.round(trend.weight)}%</span>
                                            </div>
                                            <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                                <motion.div
                                                    animate={{ width: `${trend.weight}%` }}
                                                    transition={{ type: "spring", stiffness: 50 }}
                                                    className={`h-full ${trend.color} shadow-[0_0_10px_rgba(0,229,255,0.3)]`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    
                                    <button 
                                        onClick={handleSync}
                                        className="mt-4 w-full py-3 rounded-xl bg-accent/10 border border-accent/20 text-accent font-bold text-xs uppercase tracking-widest hover:bg-accent hover:text-background transition-all"
                                    >
                                        Sincronizar mi Aprendizaje
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 bg-background/50 rounded-2xl border border-white/5 p-4 flex flex-col justify-between items-center group relative overflow-hidden">
                                {syncLevel > 0 && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 1, 0] }}
                                        className="absolute inset-0 bg-accent/20 z-0 pointer-events-none"
                                    />
                                )}
                                <span className="text-[10px] font-bold text-accent uppercase tracking-tighter z-10">Neural Network Load</span>
                                <div className="flex items-end gap-1 h-32 w-full px-4 z-10">
                                    {pulseData.map((val, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${val}%` }}
                                            className="flex-1 bg-gradient-to-t from-primary/20 via-primary to-accent rounded-t-sm"
                                        />
                                    ))}
                                </div>
                                <div className="mt-4 flex items-center gap-4 z-10">
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-white">{syncLevel > 0 ? "8.4k" : "4.2k"}</div>
                                        <div className="text-[8px] text-gray-500 uppercase">Conexiones Activas</div>
                                    </div>
                                    <div className="w-px h-8 bg-white/10" />
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-accent">{syncLevel > 0 ? "99.9%" : "98.2%"}</div>
                                        <div className="text-[8px] text-gray-500 uppercase">Eficiencia IA</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Decorative circle */}
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />
                    </motion.div>

                    {/* 2. Simulador de Carrera 2030 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-4 glass-card rounded-[2.5rem] p-8 border-white/10 flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-14 h-14 bg-techPurple/20 rounded-2xl flex items-center justify-center mb-6 border border-techPurple/30">
                                <Binary className="w-8 h-8 text-techPurple" />
                            </div>
                            <h3 className="text-2xl font-bold font-montserrat text-white mb-4 leading-tight">Career Time Machine</h3>
                        </div>
                        <div className="flex-1 flex flex-col justify-center relative">
                            {isPredicting ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <div className="w-16 h-16 border-4 border-techPurple/20 border-t-techPurple rounded-full animate-spin mb-4" />
                                    <p className="text-[10px] font-black text-techPurple uppercase animate-pulse">Analizando Tendencias 2030...</p>
                                </div>
                            ) : predictedRole ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-techPurple/10 border border-techPurple/20 rounded-2xl p-6 mb-8 text-center"
                                >
                                    <h4 className="text-techPurple font-black text-lg mb-2 leading-tight uppercase tracking-tighter italic">
                                        {predictedRole.title}
                                    </h4>
                                    <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                                        {predictedRole.desc}
                                    </p>
                                </motion.div>
                            ) : (
                                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                    Nuestra IA proyecta tu título profesional al mercado laboral del 2030. Descubre qué roles aún no existen.
                                </p>
                            )}
                        </div>

                        <button 
                            onClick={handlePredict}
                            disabled={isPredicting}
                            className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-techPurple/50 hover:bg-techPurple/10 text-white font-bold transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
                        >
                            <Rocket className={`w-5 h-5 text-techPurple group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isPredicting ? 'animate-bounce' : ''}`} />
                            {predictedRole ? "Volver a Predecir" : "Predecir Futuro"}
                        </button>
                    </motion.div>

                    {/* 3. Blockchain Badge Vault */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 glass-card rounded-[2.5rem] p-8 border-white/10 relative overflow-hidden flex flex-col justify-center min-h-[400px]"
                    >
                        <div className="absolute top-0 right-0 p-8">
                            <ShieldCheck className="w-16 h-16 text-white/5 opacity-20" />
                        </div>
                        <h3 className="text-3xl font-black font-montserrat text-white mb-6 uppercase tracking-tighter relative z-10">Blockchain <br /><span className="text-primary italic">Verified Vault</span></h3>
                        
                        <div className="flex gap-4 relative z-10 mb-8">
                            {badges.map((badge, idx) => (
                                <motion.div 
                                    key={badge.id}
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    onClick={() => setSelectedBadge(selectedBadge === idx ? null : idx)}
                                    className={`w-20 h-24 rounded-xl border flex flex-col items-center justify-center shadow-2xl transition-all cursor-pointer group ${
                                        selectedBadge === idx ? 'bg-white/10 border-accent shadow-accent/20 scale-110' : 'bg-gradient-to-br from-gray-800 to-black border-white/10 transform rotate-3'
                                    }`}
                                >
                                    {badge.icon}
                                    <span className={`text-[8px] mt-2 font-bold transition-colors ${selectedBadge === idx ? 'text-accent' : 'text-gray-500 group-hover:text-white'}`}>
                                        {badge.idTag}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="relative z-10">
                            {selectedBadge !== null ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-accent/5 border border-accent/20 rounded-2xl p-4"
                                >
                                    <h4 className="text-accent font-black text-sm uppercase mb-1">{badges[selectedBadge].name}</h4>
                                    <p className="text-[10px] text-white leading-tight mb-2 font-medium">{badges[selectedBadge].desc}</p>
                                    <div className="flex items-center gap-2 text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                                        <div className="w-1 h-1 bg-accent rounded-full animate-ping" />
                                        Blockchain Verified: 100% Inmutable
                                    </div>
                                    <p className="text-[9px] text-accent/60 mt-2 italic font-medium">{badges[selectedBadge].benefits}</p>
                                </motion.div>
                            ) : (
                                <div className="space-y-4">
                                    <p className="text-xs text-gray-400 font-inte leading-relaxed">
                                        Tus logros son activos digitales permanentes. Al graduarte o completar hitos, recibes un <span className="text-primary font-bold italic">Credential Token</span>.
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                                            <div className="text-[10px] text-white font-black uppercase">Sin Fraude</div>
                                            <p className="text-[8px] text-gray-500">Imposible de falsificar.</p>
                                        </div>
                                        <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                                            <div className="text-[10px] text-white font-black uppercase">Global</div>
                                            <p className="text-[8px] text-gray-500">Válido en todo el mundo.</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-techPurple/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />
        </section>
    )
}
