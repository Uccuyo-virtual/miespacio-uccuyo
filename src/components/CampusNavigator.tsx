import { useState } from 'react'
import { ExternalLink, GraduationCap, Mail, Library, UserCheck, Globe, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackEvent } from '../lib/analytics'

const NAV_LINKS = [
    { id: 'moodle', label: 'Campus Moodle', icon: GraduationCap, href: 'https://virtual.uccuyo.edu.ar/', desc: 'Aulas virtuales y material de estudio' },
    { id: 'mail', label: 'Correo', icon: Mail, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=uccuyovirtual@uccuyo.edu.ar', desc: 'Redactar correo a uccuyovirtual@uccuyo.edu.ar' },
    { id: 'library', label: 'Biblioteca Digital', icon: Library, href: 'https://elibro.net/es/lc/uccuyo/login_usuario/?next=%2Fes%2Flc%2Fuccuyo%2Fbusqueda_filtrada%3Fprev%3Dfshttp%3A%2F%2Fpergamo.uccuyo.edu.ar%2Fopac.php', desc: 'Acceso a journals y libros online' },
    { id: 'gestión', label: 'Autogestión Alumno', icon: UserCheck, href: 'https://gestion.uccuyo.edu.ar/uccuyo/acceso', desc: 'Inscripciones y certificados' },
]

export function CampusNavigator() {
    const [copiedEmail, setCopiedEmail] = useState(false)

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof NAV_LINKS[0]) => {
        trackEvent('click_campus_access', { access_id: link.id, access_name: link.label })
        if (link.id === 'mail') {
            // Copiar la dirección al portapapeles por comodidad
            navigator.clipboard?.writeText('uccuyovirtual@uccuyo.edu.ar').catch(() => {})
            setCopiedEmail(true)
            setTimeout(() => setCopiedEmail(false), 3000)

            // En móviles usamos mailto: para invocar la app de correo del celular (Gmail/Mail)
            const isMobile = typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            if (isMobile) {
                e.preventDefault()
                window.location.href = 'mailto:uccuyovirtual@uccuyo.edu.ar'
            }
            // En computadoras de escritorio el enlace href abre directamente la pantalla de redacción de Gmail
        }
    }

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass-panel p-6 rounded-[2rem] border-white/5 h-full flex flex-col group relative overflow-hidden"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-accent/20 rounded-lg group-hover:rotate-[360deg] transition-all duration-700">
                    <Globe className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-xl font-bold font-montserrat text-white uppercase tracking-normal">Accesos del Campus</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1">
                {NAV_LINKS.map((link) => (
                    <a
                        key={link.id}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => handleLinkClick(e, link)}
                        className="group/link flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/40 hover:bg-accent/5 transition-all text-center relative"
                        title={link.desc}
                    >
                        <div className="mb-2 p-2 bg-white/5 rounded-lg group-hover/link:bg-accent/20 group-hover/link:scale-110 transition-all">
                            <link.icon className="w-5 h-5 text-accent" />
                        </div>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">{link.label}</span>
                        
                        <div className="absolute top-2 right-2 opacity-0 group-hover/link:opacity-100 transition-opacity">
                            <ExternalLink className="w-3 h-3 text-accent" />
                        </div>
                    </a>
                ))}
            </div>

            {/* Aviso flotante de confirmación cuando se hace clic en Correo */}
            <AnimatePresence>
                {copiedEmail && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-2 py-1.5 px-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-medium flex items-center justify-center gap-1.5 shadow-lg"
                    >
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Destinatario: <strong>uccuyovirtual@uccuyo.edu.ar</strong></span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#e8a133]/60">
                <div className="w-1 h-1 rounded-full bg-[#e8a133]/60 animate-pulse" />
                <span>Recursos Rápidos UCCuyo</span>
            </div>
        </motion.div>
    )
}
