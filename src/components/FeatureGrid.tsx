import { motion, type Variants } from "framer-motion"
import { GraduationCap, Trophy, Sparkles, Dumbbell, Monitor, BookText, Car, Clock, Battery, BatteryMedium, BatteryFull, Bus, Bike, ChevronLeft, ChevronRight, Check, Coins } from "lucide-react"
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

    // 3. Beneficios UCCuyo (Institucionales y Académicos)
    const allPerks = [
        { 
            title: "Google Workspace", 
            icon: Monitor, 
            badge: "100% Bonificado", 
            category: "Tecnología",
            bg: "from-emerald-900/90 via-teal-950 to-emerald-950", 
            description: "Correo @uccuyo.edu.ar, Google Meet sin límite y almacenamiento en Drive para tus entregas.",
            access: "Automático con tu cuenta institucional"
        },
        { 
            title: "Microsoft 365", 
            icon: Monitor, 
            badge: "Licencia Oficial", 
            category: "Tecnología",
            bg: "from-blue-950/90 via-indigo-950 to-slate-950", 
            description: "Word, Excel, PowerPoint y Teams oficiales para descargar e instalar en PC, tablet y celular.",
            access: "Descarga directa con tu correo UCCuyo"
        },
        { 
            title: "Biblioteca Digital", 
            icon: BookText, 
            badge: "Acceso 24/7", 
            category: "Académico",
            bg: "from-teal-950/90 via-emerald-950 to-green-950", 
            description: "Más de 100.000 libros de texto, papers académicos y manuales completos para tus materias.",
            access: "Ingreso directo desde el Campus Virtual"
        },
        { 
            title: "Posgrados y Cursos", 
            icon: Trophy, 
            badge: "Hasta 30% OFF", 
            category: "Académico",
            bg: "from-amber-950/90 via-yellow-950 to-stone-950", 
            description: "Aranceles preferenciales en diplomaturas, especializaciones y cursos de extensión universitaria.",
            access: "Para alumnos regulares y egresados"
        },
        { 
            title: "Campo de Deportes", 
            icon: Dumbbell, 
            badge: "Tarifa Estudiante", 
            category: "Deportes",
            bg: "from-green-950/90 via-emerald-950 to-teal-950", 
            description: "Canchas, piscina y actividades deportivas recreativas en los predios de la universidad.",
            access: "Presentando tu credencial digital"
        }
    ]
    const [selectedCategory, setSelectedCategory] = useState("Todos")
    const filteredPerks = selectedCategory === "Todos" 
        ? allPerks 
        : allPerks.filter(p => p.category === selectedCategory)
    
    const [activePerk, setActivePerk] = useState(0)

    const handlePrevPerk = () => {
        setActivePerk(prev => (prev === 0 ? filteredPerks.length - 1 : prev - 1))
    }

    const handleNextPerk = () => {
        setActivePerk(prev => (prev === filteredPerks.length - 1 ? 0 : prev + 1))
    }
    
    const categories = ["Todos", "Tecnología", "Académico", "Deportes"]

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

                    {/* Beneficios UCCuyo (Institucionales y Académicos) */}
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
                                <div className="px-2.5 py-0.5 rounded-full bg-uccuyoGold/10 border border-uccuyoGold/20 text-[9px] font-bold text-uccuyoGold uppercase tracking-wider">
                                    Comunidad Alumnos
                                </div>
                            </div>
                            
                            {/* Filter Tags */}
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setSelectedCategory(cat);
                                            setActivePerk(0);
                                            trackEvent('filter_beneficios', { category: cat });
                                        }}
                                        className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border ${
                                            selectedCategory === cat 
                                                ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-600/20' 
                                                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {filteredPerks.length > 0 ? (
                            <div className="relative w-full space-y-3 z-10">
                                <motion.div 
                                    key={filteredPerks[activePerk].title}
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                    className="relative w-full rounded-2xl p-4 sm:p-5 shadow-xl text-white flex flex-col justify-between min-h-[185px] overflow-hidden border border-white/10"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${filteredPerks[activePerk].bg} opacity-95 z-0`} />
                                    
                                    {/* Encabezado del beneficio */}
                                    <div className="relative z-10 flex justify-between items-start">
                                        <div>
                                            <span className="text-white/70 text-[8px] font-black uppercase tracking-widest block">
                                                {filteredPerks[activePerk].category}
                                            </span>
                                            <span className="inline-block px-2 py-0.5 bg-white/15 border border-white/20 rounded-md text-[10px] font-bold text-white backdrop-blur-sm mt-1 shadow-sm">
                                                {filteredPerks[activePerk].badge}
                                            </span>
                                        </div>
                                        {(() => {
                                            const Icon = filteredPerks[activePerk].icon;
                                            return (
                                                <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                                                    <Icon className="w-5 h-5 text-white drop-shadow-md" />
                                                </div>
                                            );
                                        })()}
                                    </div>

                                    {/* Contenido central */}
                                    <div className="relative z-10 my-2">
                                        <h4 className="text-xl font-black italic tracking-tighter text-white">
                                            {filteredPerks[activePerk].title}
                                        </h4>
                                        <p className="text-[11px] text-slate-200/90 font-medium leading-relaxed mt-1">
                                            {filteredPerks[activePerk].description}
                                        </p>
                                    </div>

                                    {/* Pie de acceso */}
                                    <div className="relative z-10 pt-2 border-t border-white/10 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-300">
                                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                        <span className="truncate">{filteredPerks[activePerk].access}</span>
                                    </div>
                                </motion.div>

                                {/* Controles de Navegación Lateral y Paginación */}
                                <div className="flex items-center justify-between px-1 pt-1">
                                    <button
                                        onClick={handlePrevPerk}
                                        title="Beneficio anterior"
                                        className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-all active:scale-95"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>

                                    <div className="flex items-center gap-1.5">
                                        {filteredPerks.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActivePerk(i)}
                                                title={`Ir al beneficio ${i + 1}`}
                                                className={`h-1.5 rounded-full transition-all ${
                                                    i === activePerk ? 'bg-uccuyoGold w-4' : 'w-1.5 bg-white/20 hover:bg-white/40'
                                                }`}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        onClick={handleNextPerk}
                                        title="Beneficio siguiente"
                                        className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-all active:scale-95"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-gray-500 text-xs italic">
                                No hay beneficios en esta categoría
                            </div>
                        )}

                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[60px] rounded-full -translate-y-16 translate-x-16" />
                        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-teal-500/5 blur-[50px] rounded-full" />
                    </motion.div>

                </motion.div>
            </div>
        </section>
    )
}
