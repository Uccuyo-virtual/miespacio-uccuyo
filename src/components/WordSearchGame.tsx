import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, RotateCcw } from 'lucide-react'
import { cn } from '../lib/utils'

const WORDS = ['INNOVACIÓN', 'SABIDURÍA', 'ÉTICA', 'PASIÓN', 'UCCUYO', 'LIDERAZGO']
const GRID_SIZE = 10

interface Letter {
  char: string
  row: number
  col: number
  isFound: boolean
}

export default function WordSearchGame() {
  const [grid, setGrid] = useState<Letter[][]>([])
  const [foundWords, setFoundWords] = useState<string[]>([])
  const [selection, setSelection] = useState<Letter[]>([])
  const [isWon, setIsWon] = useState(false)

  const initializeGrid = () => {
    const newGrid: Letter[][] = Array(GRID_SIZE).fill(null).map((_, r) => 
      Array(GRID_SIZE).fill(null).map((_, c) => ({
        char: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
        row: r, col: c, isFound: false
      }))
    )

    WORDS.forEach(word => {
      let placed = false
      while (!placed) {
        const direction = Math.random() > 0.5 ? 'H' : 'V'
        const row = Math.floor(Math.random() * (GRID_SIZE - (direction === 'V' ? word.length : 0)))
        const col = Math.floor(Math.random() * (GRID_SIZE - (direction === 'H' ? word.length : 0)))
        
        let fits = true
        for (let i = 0; i < word.length; i++) {
          const r = direction === 'V' ? row + i : row
          const c = direction === 'H' ? col + i : col
          if (newGrid[r][c].char.length > 1 && newGrid[r][c].char !== word[i]) {
            fits = false
            break
          }
        }

        if (fits) {
          for (let i = 0; i < word.length; i++) {
            const r = direction === 'V' ? row + i : row
            const c = direction === 'H' ? col + i : col
            newGrid[r][c].char = word[i]
          }
          placed = true
        }
      }
    })

    setGrid(newGrid)
    setFoundWords([])
    setSelection([])
    setIsWon(false)
  }

  useEffect(() => {
    initializeGrid()
  }, [])

  const handleLetterClick = (letter: Letter) => {
    if (foundWords.length === WORDS.length) return

    const newSelection = [...selection, letter]
    setSelection(newSelection)

    const selectedWord = newSelection.map(l => l.char).join('')
    const reversedWord = selectedWord.split('').reverse().join('')

    if (WORDS.includes(selectedWord) || WORDS.includes(reversedWord)) {
      const actualWord = WORDS.includes(selectedWord) ? selectedWord : reversedWord
      if (!foundWords.includes(actualWord)) {
        const updatedFound = [...foundWords, actualWord]
        setFoundWords(updatedFound)
        
        const updatedGrid = [...grid]
        newSelection.forEach(l => {
          updatedGrid[l.row][l.col].isFound = true
        })
        setGrid(updatedGrid)
        setSelection([])

        if (updatedFound.length === WORDS.length) {
          setIsWon(true)
        }
      }
    } else if (newSelection.length > 10) {
      setSelection([])
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="w-full lg:w-[450px]">
        <div className="grid grid-cols-10 gap-1 bg-white/5 p-2 rounded-2xl border border-white/5">
          {grid.map((row, rIdx) => 
            row.map((letter, cIdx) => (
              <motion.button
                key={`${rIdx}-${cIdx}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleLetterClick(letter)}
                className={cn(
                  "aspect-square flex items-center justify-center text-[10px] md:text-sm font-bold rounded-md transition-all duration-300",
                  letter.isFound ? "bg-accent text-background border-none shadow-[0_0_15px_rgba(232,161,51,0.4)]" : 
                  selection.includes(letter) ? "bg-accent/20 text-accent" : "text-muted-foreground hover:bg-white/10"
                )}
              >
                {letter.char}
              </motion.button>
            ))
          )}
        </div>
      </div>

      <div className="flex-1 space-y-6 w-full">
        <div className="glass-panel p-6 rounded-2xl border-white/5 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-xl font-bold font-montserrat text-white uppercase tracking-widest italic">Sopa de Letras</h3>
               <button 
                  onClick={initializeGrid}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors border border-white/5"
                >
                  <RotateCcw className="w-4 h-4 text-muted-foreground" />
               </button>
            </div>
            
            <div className="space-y-3">
              {WORDS.map(word => (
                <div 
                  key={word}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all duration-500",
                    foundWords.includes(word) 
                      ? "bg-accent/10 border-accent/20 text-accent line-through opacity-50" 
                      : "bg-white/5 border-white/5 text-muted-foreground"
                  )}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground mt-8 text-center uppercase tracking-tighter opacity-50">
            Haz clic en las letras en orden para formar las palabras.
          </p>
        </div>
      </div>

      {isWon && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-4 glass-panel rounded-[2rem] z-50 flex flex-col items-center justify-center text-center bg-black/80 backdrop-blur-3xl border-accent/40"
        >
          <Trophy className="w-20 h-20 text-accent mb-6 animate-bounce" />
          <h3 className="text-3xl font-black mb-2 text-white italic uppercase tracking-tighter">¡MENTE CLARA!</h3>
          <p className="text-muted-foreground mb-8 px-8 max-w-sm">
            Felicidades, has encontrado todos los conceptos para un aprendizaje con propósito.
          </p>
          <button 
            onClick={initializeGrid}
            className="px-8 py-3 bg-accent text-background font-black rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 uppercase text-xs tracking-widest"
          >
            Siguiente Ronda
          </button>
        </motion.div>
      )}
    </div>
  )
}
