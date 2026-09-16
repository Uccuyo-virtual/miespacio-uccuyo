import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Wind, Droplets, Volume2, Music, Coffee } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { trackEvent } from '../lib/analytics'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const TRACKS = [
    { id: 'lofi', label: 'Estudio Lo-Fi', icon: Music, color: 'text-indigo-400', bg: 'bg-indigo-500/20', url: 'https://stream.chillhop.com/mp3/9476' },
    { id: 'rain', label: 'Lluvia Zen', icon: Droplets, color: 'text-blue-400', bg: 'bg-blue-500/20', url: 'https://raw.githubusercontent.com/karthiknvd/noctune/main/sounds/rain.mp3' },
    { id: 'cafe', label: 'Cafetería', icon: Coffee, color: 'text-amber-400', bg: 'bg-amber-500/20', url: 'https://raw.githubusercontent.com/karthiknvd/noctune/main/sounds/campfire.mp3' },
    { id: 'wind', label: 'Viento Blanco', icon: Wind, color: 'text-cyan-400', bg: 'bg-cyan-500/20', url: 'https://raw.githubusercontent.com/karthiknvd/noctune/main/sounds/wind.mp3' },
]

export function DeepFocusPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [volumes, setVolumes] = useState<Record<string, number>>({
        lofi: 0.4,
        rain: 0,
        cafe: 0,
        wind: 0,
    })
    
    const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({})

    useEffect(() => {
        Object.keys(volumes).forEach(id => {
            const audio = audioRefs.current[id]
            if (audio) {
                audio.volume = volumes[id]
                if (isPlaying && volumes[id] > 0) {
                    audio.play().catch(() => {})
                } else if (!isPlaying || volumes[id] === 0) {
                    audio.pause()
                }
            }
        })
    }, [volumes, isPlaying])

    const togglePlay = () => {
        const nextState = !isPlaying
        setIsPlaying(nextState)
        trackEvent('use_sonidos_estudio', { action: nextState ? 'play' : 'pause' })
    }

    const handleVolumeChange = (id: string, value: number) => {
        setVolumes(prev => ({ ...prev, [id]: value }))
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 rounded-[2rem] border-white/5 h-full flex flex-col group relative overflow-hidden"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/20 rounded-lg group-hover:scale-110 transition-transform">
                        <Volume2 className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold font-montserrat text-white uppercase tracking-normal">Sonidos de Estudio</h3>
                </div>
                <button 
                    onClick={togglePlay}
                    className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-background hover:scale-110 transition-transform shadow-lg shadow-accent/20"
                >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-1" />}
                </button>
            </div>

            <div className="flex-1 flex flex-col gap-4">
                {TRACKS.map((track) => (
                    <div key={track.id} className="bg-white/5 rounded-xl p-3 border border-white/5 shadow-inner flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <div className={cn("p-1.5 rounded-md", track.bg, track.color)}>
                                <track.icon className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-bold font-montserrat flex-1 text-white">{track.label}</span>
                            <AnimatePresence>
                                {isPlaying && volumes[track.id] > 0 && (
                                    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex items-center gap-1 h-3">
                                        {[1, 2, 3].map((i) => (
                                           <motion.div key={i} animate={{ height: [2, 8, 3, 10, 2] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} className={cn("w-1 rounded-full bg-current", track.color)} />
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <input 
                            type="range" min="0" max="1" step="0.01" 
                            value={volumes[track.id]}
                            onChange={(e) => handleVolumeChange(track.id, parseFloat(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-full appearance-none accent-[#e8a133] cursor-pointer"
                        />
                        <audio 
                            ref={el => { audioRefs.current[track.id] = el }}
                            src={track.url} 
                            loop 
                        />
                    </div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#e8a133]/60">
                <div className="w-1 h-1 rounded-full bg-[#e8a133]/60 animate-pulse" />
                <span>Estudio Inmersivo</span>
            </div>
        </motion.div>
    )
}
