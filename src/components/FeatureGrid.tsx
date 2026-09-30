import { motion, type Variants } from "framer-motion"
import { GraduationCap, Sparkles, Car, Clock, Battery, BatteryMedium, BatteryFull, Bus, Bike, Coins } from "lucide-react"
import { useState } from "react"
import { trackEvent } from "../lib/analytics"

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    }
}

export function FeatureGrid() {
    // 1. Calculadora de Ahorro y Tiempo
    const [distance, setDistance] = useState<number>(15)
    const [transportMode, setTransportMode] = useState<'car' | 'bike' | 'bus'>('car')
    
    // Estimación: 20 días al mes de traslados evitados
    const getSavings = () => {
        let dailyTravel = 0
        let dailyFixed = 0
        let dailyMins = 0
        
        switch(transportMode) {
            case 'car': 
                dailyTravel = distance * 300; // Combustible y mantenimiento
                dailyFixed = 2000; // Estacionamiento
                dailyMins = distance * 3; // 3 min por km
                break;
            case 'bus': {
                const ida = distance / 2;
                const ticketBase = ida <= 3 ? 300 : ida <= 6 ? 350 : ida <= 12 ? 400 : 450;
                dailyTravel = 0; 
                dailyFixed = ticketBase * 2; // Ida y vuelta
                dailyMins = distance * 4 + 15; // Traslado y espera
                break;
            }
            case 'bike': 
                dailyTravel = 0; 
                dailyFixed = 0; 
                dailyMins = distance * 4; 
                break;
        }
        
        const monthlyCost = (dailyTravel + dailyFixed) * 20;
        const monthlyHours = Math.round((dailyMins * 20) / 60);

        return {
            monthlyCost,
            monthlyHours,
        }
    }

    const savings = getSavings()

    const getSavingsTip = () => {
        switch (transportMode) {
            case 'car':
                return `Ahorrás en combustible y estacionamiento. Recuperás ${savings.monthlyHours} hs al mes para estudiar o descansar sin el estrés del tráfico.`;
            case 'bus':
                return `Evitás esperas y viajes en hora pico. Ganás ${savings.monthlyHours} hs mensuales libres para avanzar cómodo desde tu casa.`;
            case 'bike':
                return `Ganás ${savings.monthlyHours} hs al mes sin desgaste de viaje, pudiendo organizar tus materias a tus propios horarios.`;
        }
    }

    // 2. Planificador Semanal Simplificado y Fluido
    const [studyHours, setStudyHours] = useState<number>(6)

    const getStudyRecommendation = (hours: number) => {
        if (hours <= 3) {
            return {
                label: "Ritmo Flexible",
                icon: Battery,
                color: "text-amber-400",
                bg: "bg-amber-500/10",
                border: "border-amber-500/20",
                subjects: "1 materia",
                daily: `~${Math.round((hours * 60) / 7)} min/día`,
                tip: "Ideal si trabajás jornada completa. Cursás una materia a la vez, a tu ritmo y sin sobrecargas."
            }
        }
        if (hours <= 7) {
            return {
                label: "Ritmo Laboral",
                icon: BatteryMedium,
                color: "text-emerald-400",
                bg: "bg-emerald-500/10",
                border: "border-emerald-500/20",
                subjects: "2 materias",
                daily: `~${(hours / 7).toFixed(1)} hs/día`,
                tip: "Equilibrio óptimo para trabajar y avanzar dos materias por cuatrimestre con clases grabadas."
            }
        }
        if (hours <= 15) {
            return {
                label: "Ritmo Regular",
                icon: BatteryFull,
                color: "text-green-400",
                bg: "bg-green-500/10",
                border: "border-green-500/20",
                subjects: "3 a 4 materias",
                daily: `~${(hours / 7).toFixed(1)} hs/día`,
                tip: "Avanzás firme en tu plan de estudios con tiempo para repasar y entregar trabajos con calma."
            }
        }
        return {
            label: "Dedicación Completa",
            icon: Sparkles,
            color: "text-teal-300",
            bg: "bg-teal-500/10",
            border: "border-teal-500/20",
            subjects: "5 materias",
            daily: `~${(hours / 7).toFixed(1)} hs/día`,
            tip: "Máximo rendimiento académico para avanzar rápido y alcanzar tu título en tiempo récord."
        }
    }

    const plan = getStudyRecommendation(studyHours)

    return (
        <section id="herramientas" className="py-24 bg-background relative overflow-hidden transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tighter"
                    >
                        Herramientas inteligentes para <span className="text-uccuyoGold">tu rendimiento</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Soluciones diseñadas para estudiantes que buscan claridad, organización y progreso real desde el primer día.
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]"
                >
                    {/* Row 1: Tu Ahorro Real, Gestor Flex, Perks */}
                    
                    {/* Calculadora de Ahorro y Libertad */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, zIndex: 10 }}
                        className="glass-card rounded-3xl p-6 flex flex-col justify-between border-white/10 group overflow-hidden relative"
                    >
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-white">
                                    <Coins className="w-5 h-5 text-accent animate-pulse" />
                                    <h3 className="text-lg font-bold font-montserrat tracking-normal uppercase">Ahorro Virtual</h3>
                                </div>
                                <div className="px-2.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-[9px] font-bold text-green-400 uppercase tracking-wider">
                                    100% Desde Casa
                                </div>
                            </div>

                            {/* Selector de Transporte */}
                            <div className="flex gap-2 mb-4">
                                {[
                                    { id: 'car', icon: Car, label: 'Auto' },
                                    { id: 'bus', icon: Bus, label: 'Colectivo' },
                                    { id: 'bike', icon: Bike, label: 'Bici' }
                                ].map(mode => (
                                    <button
                                        key={mode.id}
                                        title={`Seleccionar ${mode.label}`}
                                        onClick={() => {
                                            setTransportMode(mode.id as any)
                                            trackEvent('use_ahorro_virtual', { transport_mode: mode.id, distance })
                                        }}
                                        className={`flex-1 py-2 px-1 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                                            transportMode === mode.id 
                                                ? 'border-green-500 bg-green-500/20 text-white shadow-lg shadow-green-500/10' 
                                                : 'border-white/5 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        <mode.icon className="w-4 h-4" />
                                        <span className="text-[10px] font-bold">{mode.label}</span>
                                    </button>
                                ))}
                            </div>
                            
                            {/* Deslizador de Distancia ultra fluido (5 a 80 km) */}
                            <div className="mb-4">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">Viaje Diario (Ida y Vuelta)</span>
                                    <span className="text-2xl font-black text-white italic tracking-tighter font-montserrat">
                                        {distance} <span className="text-xs font-bold text-green-400 not-italic">km</span>
                                    </span>
                                </div>

                                <div className="relative h-3 bg-white/10 rounded-full my-2">
                                    <div 
                                        style={{ width: `${((distance - 5) / (80 - 5)) * 100}%` }}
                                        className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-none pointer-events-none"
                                    />
                                    <div 
                                        style={{ left: `${((distance - 5) / (80 - 5)) * 100}%` }}
                                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-emerald-500 shadow-md pointer-events-none transition-none"
                                    />
                                    <input 
                                        type="range" 
                                        title="Ajustar distancia diaria de traslado"
                                        min="5" 
                                        max="80" 
                                        step="5"
                                        value={distance} 
                                        onChange={(e) => setDistance(Number(e.target.value))}
                                        onPointerUp={() => trackEvent('use_ahorro_virtual', { transport_mode: transportMode, distance })}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30 touch-pan-x"
                                    />
                                </div>
                                <div className="flex justify-between text-[10px] text-gray-400 font-bold px-0.5">
                                    <span>5 km</span>
                                    <span>40 km</span>
                                    <span>80 km</span>
                                </div>
                            </div>
                        </div>

                        {/* Métricas Claras y Directas de Ahorro */}
                        <div className="space-y-3 relative z-10">
                            <div className="grid grid-cols-2 gap-2.5">
                                <div className="p-3 bg-white/5 rounded-2xl border border-white/5 text-center">
                                    <div className="text-xl font-black text-white italic font-montserrat">
                                        {savings.monthlyCost > 0 ? (
                                            <>
                                                <span className="text-green-400 font-bold text-base mr-0.5">$</span>
                                                {savings.monthlyCost.toLocaleString('es-AR')}
                                            </>
                                        ) : (
                                            <span className="text-green-400 text-sm uppercase font-bold">100% Sin Nafta</span>
                                        )}
                                    </div>
                                    <div className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-1">Ahorro Mensual</div>
                                </div>
                                <div className="p-3 bg-white/5 rounded-2xl border border-white/5 text-center">
                                    <div className="text-xl font-black text-green-400 italic font-montserrat">
                                        {savings.monthlyHours} <span className="text-xs text-green-300 font-bold">hs</span>
                                    </div>
                                    <div className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-1">Tiempo Ganado / Mes</div>
                                </div>
                            </div>

                            {/* Tarjeta de Consejo Práctico */}
                            <div className="p-3.5 rounded-2xl border bg-emerald-500/10 border-emerald-500/20 flex items-start gap-3">
                                <div className="p-2 rounded-xl bg-white/10 text-emerald-400 shrink-0 mt-0.5">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-xs font-black uppercase tracking-tight text-emerald-400">
                                        Impacto Real en tu Rutina
                                    </div>
                                    <p className="text-[11px] text-slate-300 font-medium leading-tight mt-1">
                                        {getSavingsTip()}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-[60px] rounded-full -translate-y-16 translate-x-16" />
                    </motion.div>

                    {/* Arquitecto de Tiempo / Planificador Flex */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, zIndex: 10 }}
                        className="glass-card rounded-3xl p-6 flex flex-col justify-between border-white/10 relative overflow-hidden group"
                    >
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-white">
                                    <Clock className="w-5 h-5 text-accent animate-pulse" />
                                    <h3 className="text-lg font-bold font-montserrat tracking-normal uppercase">Planificador Semanal</h3>
                                </div>
                                <div className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400 uppercase tracking-wider">UCCuyo Flex</div>
                            </div>

                            <div className="mb-5">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">Dedicación Semanal</span>
                                    <span className="text-2xl font-black text-white italic tracking-tighter font-montserrat">
                                        {studyHours} <span className="text-xs font-bold text-uccuyoGold not-italic">hs/sem</span>
                                    </span>
                                </div>

                                {/* Slider ultra fluido con respuesta instantánea de 1 a 30 hs */}
                                <div className="relative h-3 bg-white/10 rounded-full my-2">
                                    <div 
                                        style={{ width: `${((studyHours - 1) / (30 - 1)) * 100}%` }}
                                        className="h-full bg-gradient-to-r from-emerald-500 to-uccuyoGold rounded-full transition-none pointer-events-none"
                                    />
                                    <div 
                                        style={{ left: `${((studyHours - 1) / (30 - 1)) * 100}%` }}
                                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-emerald-500 shadow-md pointer-events-none transition-none"
                                    />
                                    <input 
                                        type="range" 
                                        title="Ajustar horas semanales de estudio"
                                        min="1" 
                                        max="30" 
                                        step="1"
                                        value={studyHours} 
                                        onChange={(e) => setStudyHours(Number(e.target.value))}
                                        onPointerUp={() => trackEvent('use_planificador_semanal', { hours: studyHours, subjects: plan.subjects })}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30 touch-pan-x"
                                    />
                                </div>
                                <div className="flex justify-between text-[10px] text-gray-400 font-bold px-0.5">
                                    <span>1 hora</span>
                                    <span>15 hs</span>
                                    <span>30 hs</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 relative z-10">
                            {/* Métricas Claras y Directas */}
                            <div className="grid grid-cols-2 gap-2.5">
                                <div className="p-3 bg-white/5 rounded-2xl border border-white/5 text-center">
                                    <div className="text-xl font-black text-white italic font-montserrat">{plan.subjects}</div>
                                    <div className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-1">Materias Sugeridas</div>
                                </div>
                                <div className="p-3 bg-white/5 rounded-2xl border border-white/5 text-center">
                                    <div className="text-xl font-black text-uccuyoGold italic font-montserrat">{plan.daily}</div>
                                    <div className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-1">Dedicación Diaria</div>
                                </div>
                            </div>

                            {/* Tarjeta de Ritmo y Consejo Práctico */}
                            <div className={`p-3.5 rounded-2xl border ${plan.bg} ${plan.border} flex items-start gap-3`}>
                                <div className={`p-2 rounded-xl bg-white/10 ${plan.color} shrink-0 mt-0.5`}>
                                    <plan.icon className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className={`text-xs font-black uppercase tracking-tight ${plan.color}`}>
                                        {plan.label}
                                    </div>
                                    <p className="text-[11px] text-slate-300 font-medium leading-tight mt-1">
                                        {plan.tip}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-green-500/5 blur-[60px] rounded-full" />
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-[50px] rounded-full -translate-y-8 translate-x-8" />
                    </motion.div>

                    {/* Beneficios UCCuyo (Institucionales y Académicos - Próximamente Habilitado) */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, zIndex: 10 }}
                        className="glass-card rounded-3xl p-6 flex flex-col justify-between border-white/10 relative overflow-hidden group"
                    >
                        <div className="w-full mb-4 relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-white">
                                    <GraduationCap className="w-5 h-5 text-accent animate-pulse" />
                                    <h3 className="text-lg font-bold font-montserrat tracking-normal uppercase">Beneficios</h3>
                                </div>
                                <div className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[9px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                                    <Clock className="w-3 h-3 text-amber-400 animate-pulse" />
                                    <span>Próximamente</span>
                                </div>
                            </div>
                            
                            {/* Preview Tags */}
                            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar [&::-webkit-scrollbar]:hidden">
                                {["Deportes", "Tecnología", "Académico", "Descuentos"].map(cat => (
                                    <span
                                        key={cat}
                                        className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest whitespace-nowrap bg-white/5 border border-white/10 text-gray-400"
                                    >
                                        {cat}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Tarjeta Central Informativa - Próximamente Habilitado */}
                        <div className="relative w-full space-y-3 z-10 my-auto">
                            <div className="relative w-full rounded-2xl p-4 sm:p-5 shadow-xl text-white flex flex-col justify-between overflow-hidden border border-amber-500/20 bg-gradient-to-br from-amber-950/40 via-stone-900/60 to-slate-950/80">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <span className="text-amber-400/80 text-[8px] font-black uppercase tracking-widest block">
                                            Comunidad UCCuyo
                                        </span>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded-md text-[10px] font-bold text-amber-300 backdrop-blur-sm mt-1">
                                            <Sparkles className="w-3 h-3 text-amber-400" />
                                            <span>Próximamente Habilitado</span>
                                        </span>
                                    </div>
                                    <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                </div>

                                <h4 className="text-lg font-black tracking-tight text-white mb-1.5">
                                    Club de Convenios y Beneficios
                                </h4>

                                <p className="text-[11px] text-slate-300 font-medium leading-relaxed mb-3">
                                    Estamos gestionando nuevos acuerdos y beneficios institucionales exclusivos para la comunidad de alumnos. Próximamente podrás acceder a todos los descuentos y servicios desde aquí.
                                </p>

                                <div className="space-y-1.5 pt-2 border-t border-white/10 text-[10px] font-medium text-slate-300">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                        <span>Campo de Deportes y Recreación</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                        <span>Software y Licencias Oficiales</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                        <span>Aranceles preferenciales en cursos</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Aviso Institucional para Alumnos */}
                        <div className="p-3.5 rounded-2xl border bg-amber-500/10 border-amber-500/20 flex items-start gap-3 relative z-10 mt-3">
                            <div className="p-2 rounded-xl bg-white/10 text-amber-400 shrink-0 mt-0.5">
                                <Clock className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-xs font-black uppercase tracking-tight text-amber-400">
                                    En Gestión Institucional
                                </div>
                                <p className="text-[11px] text-slate-300 font-medium leading-tight mt-1">
                                    Sección en desarrollo. Los convenios se activarán progresivamente durante el ciclo lectivo.
                                </p>
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[60px] rounded-full -translate-y-16 translate-x-16" />
                        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-yellow-500/5 blur-[50px] rounded-full" />
                    </motion.div>

                </motion.div>
            </div>
        </section>
    )
}
