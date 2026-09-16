import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, Book, Coffee, Sparkles, Lightbulb, 
  Rocket, Zap, Cloud, Hexagon, Trophy, RotateCcw 
} from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const ICONS = [
  { icon: Brain, color: 'text-purple-400' },
  { icon: Book, color: 'text-blue-400' },
  { icon: Coffee, color: 'text-orange-400' },
  { icon: Sparkles, color: 'text-yellow-400' },
  { icon: Lightbulb, color: 'text-cyan-400' },
  { icon: Rocket, color: 'text-rose-400' },
  { icon: Zap, color: 'text-amber-400' },
  { icon: Cloud, color: 'text-sky-400' },
]

interface Card {
  id: number
  icon: typeof Brain
  color: string
  isFlipped: boolean
  isMatched: boolean
}

export function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedIndices, setFlippedIndices] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [isWon, setIsWon] = useState(false)

  const initializeGame = () => {
    const freshCards: Card[] = [...ICONS, ...ICONS]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        icon: item.icon,
        color: item.color,
        isFlipped: false,
        isMatched: false,
      }))
    setCards(freshCards)
    setFlippedIndices([])
    setMoves(0)
    setIsWon(false)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) return

    const newCards = [...cards]
    newCards[index].isFlipped = true
    setCards(newCards)

    const newFlipped = [...flippedIndices, index]
    setFlippedIndices(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1)
      const [first, second] = newFlipped
      
      if (cards[first].icon === cards[second].icon) {
        setTimeout(() => {
          const matchedCards = [...cards]
          matchedCards[first].isMatched = true
          matchedCards[second].isMatched = true
          setCards(matchedCards)
          setFlippedIndices([])
          
          if (matchedCards.every(c => c.isMatched)) {
            setIsWon(true)
          }
        }, 600)
      } else {
        setTimeout(() => {
          const resetCards = [...cards]
          resetCards[first].isFlipped = false
          resetCards[second].isFlipped = false
          setCards(resetCards)
          setFlippedIndices([])
        }, 1500)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-700">
      <div className="flex justify-between items-center w-full max-w-sm glass-panel p-4 rounded-2xl border-white/5 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/20 rounded-lg">
            <Hexagon className="w-5 h-5 text-accent animate-pulse" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Movimientos</p>
            <p className="text-xl font-black font-montserrat text-white">{moves}</p>
          </div>
        </div>
        
        <button 
          onClick={initializeGame}
          className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
          title="Reiniciar"
        >
          <RotateCcw className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 p-4 glass-panel rounded-3xl relative w-full max-w-md">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            layout
            className="aspect-square relative cursor-pointer group"
            onClick={() => handleCardClick(index)}
          >
            <AnimatePresence initial={false} mode='wait'>
              {!card.isFlipped && !card.isMatched ? (
                <motion.div
                  key="back"
                  initial={{ rotateY: 180, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -180, opacity: 0 }}
                  className="absolute inset-0 glass-card rounded-xl flex items-center justify-center border-white/5 group-hover:border-accent/30 transition-all duration-300"
                >
                  <Sparkles className="w-6 h-6 text-muted-foreground/30 group-hover:text-accent/50 transition-colors" />
                </motion.div>
              ) : (
                <motion.div
                  key="front"
                  initial={{ rotateY: 180, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -180, opacity: 0 }}
                  className={cn(
                    "absolute inset-0 glass-card rounded-xl flex items-center justify-center border-white/20",
                    card.isMatched && "bg-accent/10 border-accent/20 shadow-[0_0_20px_rgba(232,161,51,0.2)]"
                  )}
                >
                  <card.icon className={cn("w-8 h-8 md:w-10 md:h-10", card.color)} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        <AnimatePresence>
          {isWon && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-4 glass-panel rounded-2xl z-50 flex flex-col items-center justify-center text-center bg-black/80 backdrop-blur-3xl border-accent/40"
            >
              <Trophy className="w-16 h-16 text-accent mb-4 animate-bounce" />
              <h3 className="text-2xl font-black mb-1 text-white italic uppercase tracking-tighter">¡MENTE CLARA!</h3>
              <p className="text-xs text-muted-foreground mb-6 px-8 leading-tight">
                Has completado el desafío en {moves} movimientos.
              </p>
              <button 
                onClick={initializeGame}
                className="px-6 py-2 bg-accent text-background font-black rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 uppercase text-xs tracking-widest"
              >
                Volver a Jugar
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
