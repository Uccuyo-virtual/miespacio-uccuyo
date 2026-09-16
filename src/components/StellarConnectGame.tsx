import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Wand2, Stars, ChevronRight, Trophy } from 'lucide-react'
import { cn } from '../lib/utils'

interface Point {
  id: number;
  x: number;
  y: number;
}

interface Shape {
  name: string;
  points: Point[];
  description: string;
}

const SHAPES: Shape[] = [
  {
    name: "Círculo del Conocimiento",
    description: "La forma básica de la unidad y el flujo continuo.",
    points: [
      { id: 1, x: 200, y: 60 },
      { id: 2, x: 300, y: 120 },
      { id: 3, x: 320, y: 240 },
      { id: 4, x: 240, y: 320 },
      { id: 5, x: 100, y: 280 },
      { id: 6, x: 80, y: 140 },
      { id: 7, x: 200, y: 200 }, // Center
      { id: 8, x: 200, y: 60 },  // Close
    ]
  },
  {
    name: "Estrella de Guía",
    description: "El símbolo de la aspiración y los sueños elevados.",
    points: [
      { id: 1, x: 200, y: 40 },
      { id: 2, x: 240, y: 180 },
      { id: 3, x: 360, y: 185 },
      { id: 4, x: 270, y: 270 },
      { id: 5, x: 300, y: 360 },
      { id: 6, x: 200, y: 290 },
      { id: 7, x: 100, y: 360 },
      { id: 8, x: 130, y: 270 },
      { id: 9, x: 40, y: 185 },
      { id: 10, x: 160, y: 180 },
      { id: 11, x: 200, y: 40 },
    ]
  },
  {
    name: "Diamante de Foco",
    description: "La claridad mental necesaria para el estudio profundo.",
    points: [
      { id: 1, x: 200, y: 40 },
      { id: 2, x: 340, y: 200 },
      { id: 3, x: 200, y: 360 },
      { id: 4, x: 60, y: 200 },
      { id: 5, x: 200, y: 40 },
      { id: 6, x: 200, y: 360 }, // Internal vertical
      { id: 7, x: 60, y: 200 },  // Back to horizontal
      { id: 8, x: 340, y: 200 },
    ]
  },
  {
    name: "Triángulo de Equilibrio",
    description: "Cuerpo, mente y espíritu en perfecta armonía.",
    points: [
      { id: 1, x: 200, y: 60 },
      { id: 2, x: 340, y: 320 },
      { id: 3, x: 60, y: 320 },
      { id: 4, x: 200, y: 60 },
      { id: 5, x: 200, y: 180 }, // In center
      { id: 6, x: 140, y: 280 }, // Small inner triangle
      { id: 7, x: 260, y: 280 },
      { id: 8, x: 200, y: 180 },
    ]
  }
]

export default function StellarConnectGame() {
  const [level, setLevel] = useState(0)
  const [activePoints, setActivePoints] = useState<number[]>([])
  const [isWon, setIsWon] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const currentShape = useMemo(() => SHAPES[level], [level])

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget
    const rect = svg.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 400
    const y = ((e.clientY - rect.top) / rect.height) * 400
    setMousePos({ x, y })
  }

  const handlePointClick = (id: number) => {
    if (isWon) return

    const expectedId = activePoints.length === 0 ? 1 : activePoints[activePoints.length - 1] + 1
    const isClosing = (id === currentShape.points.length && activePoints.length === currentShape.points.length - 1)

    if (id === expectedId || isClosing) {
      const newPoints = [...activePoints, id]
      setActivePoints(newPoints)
      if (newPoints.length === currentShape.points.length) {
        setIsWon(true)
      }
    } else {
      setErrorMsg(true)
      setTimeout(() => setErrorMsg(false), 500)
    }
  }

  const nextLevel = useCallback(() => {
    setLevel((prev) => (prev + 1) % SHAPES.length)
    setActivePoints([])
    setIsWon(false)
    setErrorMsg(false)
  }, [])

  const reset = useCallback(() => {
    setActivePoints([])
    setIsWon(false)
    setErrorMsg(false)
  }, [])

  const lastPoint = activePoints.length > 0 ? currentShape.points[activePoints.length - 1] : null

  return (
    <div className="flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in duration-700 relative h-full w-full max-w-md mx-auto">
      <div className="text-center relative z-10 w-full px-4">
         <div className="flex items-center justify-center gap-2 mb-1">
           <Stars className="w-5 h-5 text-accent animate-pulse" />
           <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em]">Nivel {level + 1}</span>
         </div>
         <h3 className="text-2xl font-black font-montserrat text-white uppercase tracking-tighter italic">
           {currentShape.name}
         </h3>
         <p className="text-xs text-muted-foreground mt-1 max-w-[280px] mx-auto leading-tight font-medium h-8">
           {currentShape.description}
         </p>
      </div>

      <div className={cn(
        "relative w-[340px] h-[340px] md:w-[400px] md:h-[400px] glass-panel rounded-full border-accent/10 bg-black/60 backdrop-blur-3xl p-4 transition-all duration-500",
        errorMsg && "ring-2 ring-red-500/50 scale-95 shadow-[0_0_50px_rgba(239,68,68,0.2)]",
        isWon && "ring-2 ring-accent/50 shadow-[0_0_80px_rgba(232,161,51,0.3)]"
      )}>
        <svg 
          className="w-full h-full drop-shadow-[0_0_20px_rgba(232,161,51,0.3)] touch-none" 
          viewBox="0 0 400 400"
          onMouseMove={handleMouseMove}
        >
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
               <stop offset="50%" stopColor="var(--accent)" />
               <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.8" />
            </linearGradient>

            <radialGradient id="starGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Lines */}
          <g>
            {activePoints.map((_, idx) => {
              if (idx === 0) return null
              const startPoint = currentShape.points[idx - 1]
              const endPoint = currentShape.points[idx]
              
              if (!startPoint || !endPoint) return null

              return (
                <motion.path
                  key={`line-${level}-${idx}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  d={`M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`}
                  stroke="#e8a133"
                  strokeWidth="6"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />
              )
            })}
          </g>

          {/* Cursor Line (Follower) */}
          {lastPoint && !isWon && (
            <motion.path
              d={`M ${lastPoint.x} ${lastPoint.y} L ${mousePos.x} ${mousePos.y}`}
              stroke="#e8a133"
              strokeWidth="2"
              strokeDasharray="6,6"
              className="opacity-60"
              strokeLinecap="round"
              animate={{
                strokeDashoffset: [0, -12],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          )}

          {/* Interaction Points */}
          {currentShape.points.map((point, idx) => {
            const isClosingPoint = idx === currentShape.points.length - 1
            const isShown = !isClosingPoint || activePoints.length === currentShape.points.length - 1
            
            if (!isShown) return null

            const isActive = activePoints.includes(point.id)
            const isNext = (activePoints.length + 1 === point.id) || (activePoints.length === 0 && point.id === 1)
            
            return (
              <g 
                key={`point-${level}-${point.id}-${idx}`} 
                onClick={() => handlePointClick(point.id)} 
                className="cursor-pointer group"
              >
                {/* Outer Glow */}
                <motion.circle
                  cx={point.x} cy={point.y} 
                  initial={{ r: 0 }}
                  animate={{ 
                    r: isActive ? 20 : isNext ? 16 : 10,
                    opacity: isNext ? [0.3, 0.6, 0.3] : 0.2
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  fill="#e8a133"
                />
                
                {/* Main Star */}
                <motion.circle
                  cx={point.x} cy={point.y} r={isActive ? 10 : 7}
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1, 
                    fill: isActive ? '#e8a133' : '#1a1a1a',
                    stroke: isNext ? '#e8a133' : 'rgba(255, 255, 255, 0.3)',
                    strokeWidth: isNext ? 4 : 2,
                  }}
                  whileHover={{ scale: 1.4 }}
                  className="transition-all duration-300"
                />

                {/* Number Indicator */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.text
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: 1, y: -22 }}
                      exit={{ opacity: 0, scale: 2 }}
                      x={point.x} y={point.y} 
                      textAnchor="middle" 
                      className={cn(
                        "text-[14px] font-black pointer-events-none select-none",
                        isNext ? "fill-[#e8a133] drop-shadow-[0_0_8px_rgba(232,161,51,0.6)]" : "fill-white/40"
                      )}
                    >
                      {idx + 1}
                    </motion.text>
                  )}
                </AnimatePresence>
              </g>
            )
          })}
        </svg>

        {/* Ambient Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent rounded-full opacity-10"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%"
              }}
              animate={{ 
                y: [null, "-100%"],
                opacity: [0, 0.2, 0]
              }}
              transition={{ 
                duration: 8 + Math.random() * 12, 
                repeat: Infinity, 
                delay: Math.random() * 5 
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-4 relative z-10 w-full justify-center">
        <button 
          onClick={reset}
          className="px-6 py-2.5 bg-white/[0.03] hover:bg-white/[0.08] active:scale-95 rounded-xl transition-all border border-white/5 flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reiniciar
        </button>
      </div>

      <AnimatePresence>
        {isWon && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-3xl rounded-[3rem] text-center p-8 overflow-hidden"
          >
             <motion.div
               animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
               }}
               transition={{ repeat: Infinity, duration: 3 }}
               className="relative mb-6"
             >
                <div className="absolute inset-0 bg-accent/30 blur-3xl rounded-full scale-150" />
                {level === SHAPES.length - 1 ? (
                  <Trophy className="w-24 h-24 text-accent relative z-10" />
                ) : (
                  <Wand2 className="w-24 h-24 text-accent relative z-10" />
                )}
             </motion.div>
             
             <h3 className="text-4xl font-black mb-2 text-white italic uppercase tracking-tighter leading-none">
               {level === SHAPES.length - 1 ? "¡MAESTRO ESTELAR!" : "¡FORMA REVELADA!"}
             </h3>
             <p className="text-muted-foreground mb-10 px-4 max-w-xs text-sm font-medium">
               {level === SHAPES.length - 1 
                 ? "Has completado todas las constelaciones de la sabiduría." 
                 : "Has alineado las estrellas correctamente. Continúa tu camino."}
             </p>
             <button 
                onClick={nextLevel}
                className="px-10 py-4 bg-accent text-background font-black rounded-2xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(232,161,51,0.4)] uppercase text-xs tracking-[0.2em] flex items-center gap-2"
              >
                {level === SHAPES.length - 1 ? "Reiniciar Viaje" : "Siguiente Nivel"}
                <ChevronRight className="w-4 h-4" />
              </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


