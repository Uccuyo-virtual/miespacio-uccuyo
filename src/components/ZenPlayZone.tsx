import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Search, Sparkles, Wand2 } from 'lucide-react'
import { MemoryGame } from './MemoryGame'
import WordSearchGame from './WordSearchGame'
import ZenSnakeGame from './ZenSnakeGame'
import StellarConnectGame from './StellarConnectGame'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { trackEvent } from '../lib/analytics'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const TABS = [
  { id: 'memory', label: 'Memoria', icon: Brain, component: MemoryGame },
  { id: 'search', label: 'Sopa de Letras', icon: Search, component: WordSearchGame },
  { id: 'snake', label: 'Víbora Zen', icon: Sparkles, component: ZenSnakeGame },
  { id: 'stellar', label: 'Conexiones', icon: Wand2, component: StellarConnectGame },
]

export function ZenPlayZone() {
  const [activeTab, setActiveTab] = useState('memory')

  const handleTabChange = (tab: typeof TABS[0]) => {
    setActiveTab(tab.id)
    trackEvent('use_juegos_zen', { game_id: tab.id, game_name: tab.label })
  }

  return (
    <section className="py-24 relative overflow-hidden bg-mesh" id="juegos">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-4 text-white font-montserrat"
          >
            Pausa <span className="text-uccuyoGold">Consciente</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Elige una experiencia para resetear tu mente. Sin estrés, sin cronómetros, solo fluidez académica.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Tab Switcher */}
          <div role="tablist" aria-label="Seleccionar juego" className="flex flex-wrap justify-center gap-3 mb-12 p-2 glass-panel rounded-[2rem] border-white/5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={activeTab === tab.id ? 'true' : 'false'}
                aria-controls={`panel-${tab.id}`}
                onClick={() => handleTabChange(tab)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uccuyoGold",
                  activeTab === tab.id 
                    ? "bg-accent text-background shadow-[0_0_20px_rgba(232,161,51,0.3)] scale-105" 
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Game Window */}
          <div className="relative min-h-[600px] glass-panel rounded-[3rem] p-8 border-white/5 shadow-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                role="tabpanel"
                id={`panel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
                tabIndex={0}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-full"
              >
                {TABS.find(t => t.id === activeTab)?.component && 
                  React.createElement(TABS.find(t => t.id === activeTab)!.component)}
              </motion.div>
            </AnimatePresence>
            
            {/* Background Branding for Zen Zone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none">
                <img src="https://virtual.uccuyo.edu.ar/logo.png" alt="" className="w-96 grayscale" onError={(e) => e.currentTarget.style.display='none'} />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
    </section>
  )
}
