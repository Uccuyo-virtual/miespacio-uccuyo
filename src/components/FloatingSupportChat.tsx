import { useState } from "react"
import { MessageCircle, X, Send, Bot, FileText, Video, Link as LinkIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function FloatingSupportChat() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            type: "system",
            text: "¡Hola! Soy tu asistente técnico de plataforma. ¿En qué te ayudo hoy? Puedes consultarme sobre entrega de trabajos, bibliotecas virtuales o uso de Moodle."
        }
    ])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)

    // Quick resources
    const quickLinks = [
        { label: "Cómo subir un TP", icon: FileText, cmd: "tp" },
        { label: "Biblio Virtual", icon: LinkIcon, cmd: "biblio" },
        { label: "Tutorial Moodle", icon: Video, cmd: "moodle" }
    ]

    const handleSubmit = (e?: React.FormEvent, directCommand?: string) => {
        if (e) e.preventDefault()
        
        const userText = directCommand || input
        if (!userText.trim()) return

        setMessages(prev => [...prev, { type: "user", text: userText }])
        setInput("")
        setIsTyping(true)

        setTimeout(() => {
            let reply = "He registrado tu consulta técnica. Un operador de soporte Moodle verificará tu caso y te brindará una respuesta detallada por mail."
            const lowerQuery = userText.toLowerCase()
            
            if (lowerQuery.includes("tp") || lowerQuery.includes("trabajo")) {
                 reply = "Para subir tu Trabajo Práctico: Dirígete a la sección 'Evaluaciones' de tu materia, selecciona la Tarea 1 y haz clic en 'Añadir envío'. ¡Recuerda que el límite es 20MB!"
            } else if (lowerQuery.includes("biblio") || lowerQuery.includes("biblioteca")) {
                 reply = "Nuestra e-Biblioteca está disponible 24/7 en el campus virtual. Ingresa con tu DNI como usuario y contraseña. Tienes más de 50.000 títulos para descargar o leer online."
            } else if (lowerQuery.includes("moodle") || lowerQuery.includes("tutorial")) {
                 reply = "Puedes ver el tutorial completo de navegación del campus virtual en la sección de 'Inducción'. El módulo te mostrará cómo foros, chats y cuestionarios funcionan paso a paso."
            }

            setMessages(prev => [...prev, { type: "system", text: reply }])
            setIsTyping(false)
        }, 1200)
    }

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-16 right-0 w-[350px] bg-background rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col glass-panel"
                        style={{ height: '480px' }}
                    >
                        {/* Header */}
                        <div className="bg-uccuyoGreen text-white p-4 flex items-center justify-between shadow-md relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-uccuyoGold" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm tracking-wide">Soporte UCCuyo</h3>
                                    <p className="text-[10px] text-uccuyoGold flex items-center gap-1 font-bold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-uccuyoGold animate-pulse"></span>
                                        En línea
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} title="Cerrar chat" className="text-white/80 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div role="log" aria-live="polite" aria-relevant="additions text" className="flex-1 overflow-y-auto p-4 bg-background/50 flex flex-col gap-3 scrollbar-hide">
                            <div className="text-[10px] text-center text-gray-400 font-bold mb-2 uppercase tracking-widest">Hoy</div>
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 text-sm rounded-2xl ${
                                        m.type === 'user' 
                                            ? 'bg-uccuyoGreen text-white rounded-tr-sm shadow-lg' 
                                            : 'bg-white/10 text-white rounded-tl-sm shadow-sm border border-white/5 backdrop-blur-sm'
                                    }`}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 text-gray-400 rounded-2xl rounded-tl-sm p-3 shadow-sm border border-white/5 flex gap-1 items-center backdrop-blur-sm">
                                        <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></span>
                                        <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce animation-delay-15" />
                                        <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce animation-delay-30" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Resources */}
                        <div className="px-4 py-2 bg-background/80 flex gap-2 overflow-x-auto scrollbar-hide border-t border-white/5">
                            {quickLinks.map((link, i) => {
                                const Icon = link.icon
                                return (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => handleSubmit(undefined, link.cmd)}
                                        className="shrink-0 flex items-center gap-1 px-3 py-1.5 bg-uccuyoGold/10 hover:bg-uccuyoGold/20 text-uccuyoGold rounded-full text-xs font-bold transition-colors border border-uccuyoGold/20"
                                    >
                                        <Icon className="w-3 h-3" />
                                        {link.label}
                                    </button>
                                )
                            })}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={(e) => handleSubmit(e)} className="p-3 bg-background border-t border-white/10 flex items-center gap-2">
                            <input
                                type="text"
                                aria-label="Tu consulta para soporte"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Escribe tu consulta técnica..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-uccuyoGold/50 transition-all text-white placeholder-gray-500"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim()}
                                className="w-10 h-10 rounded-full bg-uccuyoGreen text-white flex items-center justify-center shrink-0 hover:bg-uccuyoGreen/80 transition-colors disabled:opacity-50 shadow-lg shadow-uccuyoGreen/20"
                            >
                                <Send className="w-4 h-4 ml-0.5" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all relative z-10 ${
                    isOpen ? 'bg-uccuyoGold text-background' : 'bg-uccuyoGreen text-white hover:bg-uccuyoGreen/90'
                }`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
                {!isOpen && (
                    <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-uccuyoGold border-2 border-background rounded-full"></span>
                )}
            </motion.button>
        </div>
    )
}
