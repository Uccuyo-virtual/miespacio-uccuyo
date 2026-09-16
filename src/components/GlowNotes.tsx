import { useState, useEffect } from 'react'
import { StickyNote, Save, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { trackEvent } from '../lib/analytics'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function GlowNotes() {
    const [note, setNote] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        const savedNote = localStorage.getItem('uccuyo-glow-note')
        if (savedNote) setNote(savedNote)
    }, [])

    const handleSave = () => {
        setIsSaving(true)
        localStorage.setItem('uccuyo-glow-note', note)
        trackEvent('use_notas_rapidas', { action: 'save', characters: note.length })
        setTimeout(() => setIsSaving(false), 800)
    }

    const clearNote = () => {
        if (window.confirm('¿Borrar nota?')) {
            setNote('')
            localStorage.removeItem('uccuyo-glow-note')
        }
    }

    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass-panel p-6 rounded-[2rem] border-white/5 h-full flex flex-col group relative overflow-hidden"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/20 rounded-lg group-hover:scale-110 transition-transform">
                        <StickyNote className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold font-montserrat text-white uppercase tracking-normal">Notas Rápidas</h3>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={clearNote}
                        title="Borrar nota"
                        className="p-2 hover:bg-red-500/20 rounded-md transition-colors text-muted-foreground hover:text-red-400"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={handleSave}
                        title="Guardar nota"
                        className={cn(
                            "p-2 rounded-md transition-all",
                            isSaving ? "bg-green-500/20 text-green-400" : "bg-white/5 hover:bg-white/10 text-muted-foreground"
                        )}
                    >
                        <Save className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <textarea 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Escribe aquí tus ideas, fechas de examen o recordatorios..."
                className="w-full flex-1 bg-transparent border-none resize-none text-sm text-gray-400 focus:text-white transition-colors focus:ring-0 outline-none scrollbar-hide py-2"
            />

            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#e8a133]/60">
                <div className="w-1 h-1 rounded-full bg-[#e8a133]/60 animate-pulse" />
                <span>Guardado automático local</span>
            </div>
            
            {/* Background Glow */}
            <div className="absolute inset-x-0 -bottom-20 h-40 bg-accent/5 blur-[60px] pointer-events-none group-focus-within:bg-accent/10 transition-all" />
        </motion.div>
    )
}
