import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, Plus, Trash2 } from 'lucide-react'
import { trackEvent } from '../lib/analytics'

type Task = { id: string; content: string; column: 'todo' | 'doing' | 'done' }

export function KanbanBoard() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTaskText, setNewTaskText] = useState('')
    const [activeCol, setActiveCol] = useState<'todo' | 'doing' | 'done'>('todo')

    useEffect(() => {
        const saved = localStorage.getItem('kanban-tasks')
        if (saved) {
            setTasks(JSON.parse(saved))
        } else {
            setTasks([
                { id: '1', content: 'Leer capítulo 4', column: 'todo' },
                { id: '2', content: 'Terminar ensayo', column: 'doing' },
                { id: '3', content: 'Foro de debate', column: 'done' },
            ])
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('kanban-tasks', JSON.stringify(tasks))
    }, [tasks])

    const addTask = () => {
        if (!newTaskText.trim()) return
        setTasks([...tasks, { id: Date.now().toString(), content: newTaskText, column: 'todo' }])
        setNewTaskText('')
        trackEvent('use_tablero_tareas', { action: 'add_task' })
    }

    const moveTask = (id: string, col: 'todo' | 'doing' | 'done') => {
        setTasks(tasks.map(t => t.id === id ? { ...t, column: col } : t))
        trackEvent('use_tablero_tareas', { action: 'move_task', to_column: col })
    }

    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const cols = [
        { id: 'todo', label: 'Pendiente', color: 'text-gray-400' },
        { id: 'doing', label: 'En Progreso', color: 'text-accent' },
        { id: 'done', label: 'Terminado', color: 'text-primary' },
    ] as const

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 rounded-[2rem] border-white/5 h-full flex flex-col relative overflow-hidden"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent/20 rounded-lg">
                    <LayoutDashboard className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-xl font-bold font-montserrat text-white uppercase tracking-normal">Tablero de Tareas</h3>
            </div>

            <div className="flex bg-white/5 p-1 rounded-xl mb-4">
                {cols.map(c => (
                    <button 
                        key={c.id} 
                        onClick={() => setActiveCol(c.id)}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${activeCol === c.id ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        {c.label}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-2">
                <AnimatePresence>
                    {tasks.filter(t => t.column === activeCol).map(task => (
                        <motion.div 
                            key={task.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white/5 border border-white/10 rounded-xl p-3 flex justify-between items-center group"
                        >
                            <span className="text-sm text-gray-200">{task.content}</span>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {activeCol !== 'todo' && <button onClick={() => moveTask(task.id, 'todo')} className="text-xs text-gray-400 hover:text-white p-1">←</button>}
                                {activeCol === 'todo' && <button onClick={() => moveTask(task.id, 'doing')} className="text-xs text-gray-400 hover:text-accent p-1">→</button>}
                                {activeCol === 'doing' && <button onClick={() => moveTask(task.id, 'done')} className="text-xs text-gray-400 hover:text-primary p-1">✓</button>}
                                <button onClick={() => removeTask(task.id)} className="text-xs text-red-400/50 hover:text-red-400 p-1"><Trash2 className="w-3 h-3"/></button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="mt-4 flex gap-2">
                <input 
                    type="text" 
                    value={newTaskText} 
                    onChange={e => setNewTaskText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addTask()}
                    placeholder="Nueva tarea..." 
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
                />
                <button onClick={addTask} className="bg-accent text-black p-2 rounded-xl hover:bg-white transition-colors">
                    <Plus className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
    )
}
