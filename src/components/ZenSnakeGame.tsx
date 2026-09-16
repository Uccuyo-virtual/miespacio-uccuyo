import { useState, useRef, useCallback, useEffect } from 'react'
import { RotateCcw, Zap } from 'lucide-react'

const GRID_SIZE = 20
const INITIAL_SNAKE = [[5, 5], [4, 5], [3, 5]]
const INITIAL_DIRECTION = [1, 0] // [dx, dy]

export default function ZenSnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [snake, setSnake] = useState<number[][]>(INITIAL_SNAKE)
  const [food, setFood] = useState<number[]>([10, 10])
  const [direction, setDirection] = useState<number[]>(INITIAL_DIRECTION)
  const [score, setScore] = useState(0)

  const moveSnake = useCallback(() => {
    const head = [
      (snake[0][0] + direction[0] + GRID_SIZE) % GRID_SIZE,
      (snake[0][1] + direction[1] + GRID_SIZE) % GRID_SIZE
    ]

    const newSnake = [head, ...snake]
    
    if (head[0] === food[0] && head[1] === food[1]) {
      setScore(prev => prev + 10)
      setFood([
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE)
      ])
    } else {
      newSnake.pop()
    }

    setSnake(newSnake)
  }, [snake, direction, food])

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d')
    if (!context) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
      }
      switch (e.key) {
        case 'ArrowUp': if (direction[1] !== 1) setDirection([0, -1]); break
        case 'ArrowDown': if (direction[1] !== -1) setDirection([0, 1]); break
        case 'ArrowLeft': if (direction[0] !== 1) setDirection([-1, 0]); break
        case 'ArrowRight': if (direction[0] !== -1) setDirection([1, 0]); break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    const interval = setInterval(moveSnake, 120)

    // Drawing
    const cellSize = (canvasRef.current?.width || 400) / GRID_SIZE
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    
    // Draw trail
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.shadowBlur = 20
    context.shadowColor = '#e8a133'
    
    context.beginPath()
    context.strokeStyle = '#e8a133'
    context.lineWidth = 14
    snake.forEach((part, index) => {
      const x = part[0] * cellSize + cellSize / 2
      const y = part[1] * cellSize + cellSize / 2
      if (index === 0) context.moveTo(x, y)
      else context.lineTo(x, y)
    })
    context.stroke()

    // Draw knowledge orb (food)
    context.beginPath()
    context.fillStyle = '#023825'
    context.strokeStyle = '#e8a133'
    context.lineWidth = 2
    context.arc(
      food[0] * cellSize + cellSize / 2,
      food[1] * cellSize + cellSize / 2,
      cellSize / 3,
      0, 2 * Math.PI
    )
    context.fill()
    context.stroke()

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      clearInterval(interval)
    }
  }, [snake, direction, food, moveSnake])

  const reset = () => {
    setSnake(INITIAL_SNAKE)
    setFood([10, 10])
    setScore(0)
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center w-full max-w-md glass-panel p-4 rounded-2xl border-white/5 mb-4">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-accent animate-pulse" />
          <div className="text-left">
            <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest">Aprendizaje Acumulado</p>
            <p className="text-xl font-black font-montserrat text-white">{score} pts</p>
          </div>
        </div>
        <button 
          onClick={reset}
          className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10"
        >
          <RotateCcw className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="relative glass-panel p-2 rounded-[2rem] border-white/10 overflow-hidden group">
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={400}
          className="bg-background/40 backdrop-blur-xl rounded-2xl w-full max-w-[400px] h-full max-h-[400px]"
        />
        
        {/* Mobile controls overlay (hidden on desktop) */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 lg:hidden pointer-events-none">
           <button onClick={() => setDirection([0, -1])} className="col-start-2 pointer-events-auto" />
           <button onClick={() => setDirection([-1, 0])} className="row-start-2 pointer-events-auto" />
           <button onClick={() => setDirection([1, 0])} className="row-start-2 col-start-3 pointer-events-auto" />
           <button onClick={() => setDirection([0, 1])} className="row-start-3 col-start-2 pointer-events-auto" />
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground italic uppercase tracking-widest opacity-40">
        Usa las flechas del teclado para recolectar conceptos.
      </p>
    </div>
  )
}
