import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Play, Pause, RotateCcw, Volume2, VolumeX, X } from "lucide-react"
import { trackEvent } from "../lib/analytics"

export function FocusTimerWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [timeLeft, setTimeLeft] = useState(25 * 60)
    const [isActive, setIsActive] = useState(false)
    const [isBreak, setIsBreak] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const radioAudioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        if (!radioAudioRef.current) {
            radioAudioRef.current = new Audio("https://stream.chillhop.com/mp3/8448")
            radioAudioRef.current.loop = true
        }

        if (!isMuted) {
            radioAudioRef.current.play().catch(e => {
                console.log("Radio autoplay blocked:", e)
            })
        } else {
            radioAudioRef.current.pause()
        }

        return () => {
            if (radioAudioRef.current) {
                radioAudioRef.current.pause()
            }
        }
    }, [isMuted])

    useEffect(() => {
        const handleOpenTimer = () => setIsOpen(true);
        window.addEventListener('open-focus-timer', handleOpenTimer);
        return () => window.removeEventListener('open-focus-timer', handleOpenTimer);
    }, []);

    useEffect(() => {
        window.dispatchEvent(new CustomEvent('focus-timer-state', { detail: { isOpen } }))
    }, [isOpen])

    useEffect(() => {
        let interval: number | null = null

        if (isActive && timeLeft > 0) {
            interval = window.setInterval(() => setTimeLeft(prev => prev - 1), 1000)
        } else if (timeLeft === 0) {
            if (isActive) {
                if (!isBreak) {
                    // Confetti and sound on focus finish
                    import('canvas-confetti').then((confetti) => {
                        confetti.default({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 },
                            zIndex: 9999
                        })
                    })
                    const audio = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=success-1-6297.mp3')
                    audio.play().catch(() => {})

                    // Save stats
                    try {
                        const stats = JSON.parse(localStorage.getItem('study-stats') || '{"pomodoros": 0, "streak": 0, "lastDate": null}')
                        const today = new Date().toDateString()
                        
                        if (stats.lastDate !== today) {
                            const yesterday = new Date(Date.now() - 86400000).toDateString()
                            if (stats.lastDate === yesterday) {
                                stats.streak += 1
                            } else {
                                stats.streak = 1
                            }
                            stats.lastDate = today
                        }
                        stats.pomodoros += 1
                        localStorage.setItem('study-stats', JSON.stringify(stats))
                        window.dispatchEvent(new Event('study-stats-updated'))
                    } catch (e) {
                        console.error('Failed to save stats', e)
                    }
                }

                const nextIsBreak = !isBreak
                setIsBreak(nextIsBreak)
                setTimeLeft(nextIsBreak ? 5 * 60 : 25 * 60)
                setIsActive(false)
            }
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isActive, timeLeft, isBreak])

    const toggleTimer = () => {
        const nextActive = !isActive
        setIsActive(nextActive)
        if (nextActive) {
            trackEvent('use_cronometro_pomodoro', { action: 'start', mode: isBreak ? 'descanso' : 'concentracion' })
        } else {
            trackEvent('use_cronometro_pomodoro', { action: 'pause', mode: isBreak ? 'descanso' : 'concentracion' })
        }
    }
    const resetTimer = () => {
        setIsActive(false)
        setTimeLeft(isBreak ? 5 * 60 : 25 * 60)
    }

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }

    const progress = 1 - (timeLeft / (isBreak ? 5 * 60 : 25 * 60))

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-background border border-white/10 shadow-2xl rounded-2xl w-72 overflow-hidden flex flex-col mb-4 glass-panel"
                    >
                        {/* Header */}
                        <div className="bg-primary text-white p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-accent" />
                                <span className="font-montserrat font-bold text-sm tracking-wider uppercase">Cronómetro de Estudio</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} title="Cerrar" className="hover:bg-white/20 p-1 rounded-full transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Lo-Fi Player Header */}
                        <div className="px-4 py-3 bg-white/5 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-3 w-3">
                                  {!isMuted && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-techPurple opacity-75"></span>}
                                  <span className={`relative inline-flex rounded-full h-3 w-3 ${isMuted ? 'bg-gray-400' : 'bg-techPurple'}`}></span>
                                </span>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Música de Concentración</span>
                                    <span className="text-xs font-medium text-gray-400">Radio ambiental relajante</span>
                                </div>
                            </div>
                            <button onClick={() => setIsMuted(!isMuted)} title={isMuted ? "Activar audio" : "Silenciar audio"} className="text-gray-400 hover:text-accent transition-colors">
                                {isMuted ? <VolumeX className="w-4 h-4"/> : <Volume2 className="w-4 h-4"/>}
                            </button>
                        </div>

                        {/* Pomodoro Timer */}
                        <div className="p-6 flex flex-col items-center">
                            
                            <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-lg border border-white/5">
                                <button 
                                    onClick={() => { setIsBreak(false); setIsActive(false); setTimeLeft(25 * 60) }}
                                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${!isBreak ? 'bg-primary shadow-lg text-white' : 'text-gray-400 hover:text-white'}`}
                                >
                                    Estudio (25 min)
                                </button>
                                <button 
                                    onClick={() => { setIsBreak(true); setIsActive(false); setTimeLeft(5 * 60) }}
                                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${isBreak ? 'bg-accent shadow-lg text-black' : 'text-gray-400 hover:text-white'}`}
                                >
                                    Descanso (5 min)
                                </button>
                            </div>

                            {/* Circular progress simulated with conic gradient */}
                            <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                                    <circle cx="64" cy="64" r="60" fill="none" strokeWidth="8" className="stroke-white/5" />
                                    <circle 
                                        cx="64" cy="64" r="60" fill="none" strokeWidth="8" 
                                        className={`transition-all duration-1000 ease-linear ${isBreak ? 'stroke-accent' : 'stroke-primary'}`} 
                                        strokeDasharray={377} 
                                        strokeDashoffset={377 * (1 - progress)} 
                                        strokeLinecap="round" 
                                    />
                                </svg>
                                <span className={`text-4xl font-montserrat font-black tracking-tighter text-white drop-shadow-sm`}>
                                    {formatTime(timeLeft)}
                                </span>
                            </div>

                            <div className="flex gap-4">
                                <button 
                                    onClick={toggleTimer}
                                    title={isActive ? "Pausar cronómetro" : "Iniciar cronómetro"}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl transition-all hover:scale-110 active:scale-95 ${isActive ? 'bg-primary' : 'bg-accent text-black hover:bg-white'}`}
                                >
                                    {isActive ? <Pause className="w-5 h-5" fill="currentColor" /> : <Play className="w-5 h-5 ml-1" fill="currentColor" />}
                                </button>
                                <button 
                                    onClick={resetTimer}
                                    title="Reiniciar cronómetro"
                                    className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors shadow-sm cursor-pointer border border-white/10"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            {!isOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    title="Abrir cronómetro de estudio"
                    aria-label="Abrir cronómetro de estudio"
                    className="w-14 h-14 bg-background rounded-full shadow-2xl flex items-center justify-center border-2 border-white/10 text-accent group glass-panel"
                >
                    <Clock className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    {isActive && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-accent border-2 border-background rounded-full animate-pulse"></span>}
                </motion.button>
            )}
        </div>
    )
}
