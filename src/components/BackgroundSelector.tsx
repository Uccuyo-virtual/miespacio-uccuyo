import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Palette, Cpu, Sparkles, Sun } from "lucide-react"

interface BackgroundSelectorProps {
    currentMode: string
    onChangeMode: (mode: string) => void
}

const modes = [
    { id: "light", label: "☀️ Modo Diurno", desc: "Fondo claro y descansado", icon: Sun, color: "text-amber-400" },
    { id: "cyber", label: "Ciber-Espacio", desc: "Malla WebGL interactiva", icon: Cpu, color: "text-blue-400" },
    { id: "zen", label: "Modo Zen (Estático)", desc: "Fondo oscuro institucional", icon: Sparkles, color: "text-purple-400" }
]

export function BackgroundSelector({ currentMode, onChangeMode }: BackgroundSelectorProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isFocusOpen, setIsFocusOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Listen to focus timer open/close state
    useEffect(() => {
        const handleFocusState = (e: Event) => {
            const customEvent = e as CustomEvent<{ isOpen: boolean }>
            setIsFocusOpen(customEvent.detail.isOpen)
        }
        window.addEventListener("focus-timer-state", handleFocusState)
        return () => window.removeEventListener("focus-timer-state", handleFocusState)
    }, [])

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    if (isFocusOpen) return null

    return (
        <div ref={containerRef} className="fixed bottom-24 left-6 z-[9999] flex flex-col items-start gap-3">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="bg-neutral-950/85 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl w-64 flex flex-col gap-1.5"
                    >
                        <div className="px-2 py-1.5 border-b border-white/5 mb-1">
                            <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider block">Ambiente de Estudio</span>
                            <span className="text-[8px] text-gray-500 font-bold block mt-0.5">Elige el fondo que mejor se adapte a tu foco</span>
                        </div>
                        {modes.map(mode => {
                            const Icon = mode.icon
                            const isActive = currentMode === mode.id
                            return (
                                <button
                                    key={mode.id}
                                    onClick={() => {
                                        onChangeMode(mode.id)
                                        setIsOpen(false)
                                    }}
                                    className={`flex items-center gap-3 w-full p-2.5 rounded-xl border text-left transition-all ${
                                        isActive 
                                            ? "bg-accent/10 border-accent text-white" 
                                            : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    <div className={`p-2 rounded-lg ${isActive ? "bg-accent/20" : "bg-white/5"} shrink-0`}>
                                        <Icon className={`w-4 h-4 ${mode.color}`} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="text-xs font-bold font-montserrat truncate">{mode.label}</div>
                                        <div className="text-[8.5px] text-gray-500 font-medium truncate">{mode.desc}</div>
                                    </div>
                                    {isActive && (
                                        <div className="ml-auto w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_rgba(232,161,51,0.8)]" />
                                    )}
                                </button>
                            )
                        })}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Selector de ambiente de fondo"
                title="Cambiar Ambiente de Estudio"
                className={`relative w-12 h-12 rounded-full border flex items-center justify-center shadow-lg transition-all ${
                    isOpen 
                        ? "bg-accent border-accent text-background" 
                        : "bg-neutral-900/90 hover:bg-neutral-850/95 border-white/10 text-white"
                }`}
                style={{
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)"
                }}
            >
                <Palette className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-accent/40 border border-accent"></span>
                </span>
            </motion.button>
        </div>
    )
}
