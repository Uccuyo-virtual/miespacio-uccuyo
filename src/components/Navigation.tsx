import { useState, useRef, useEffect } from 'react'
import { motion, useSpring, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { trackEvent } from '../lib/analytics'

interface NavItem {
  label: string
  id: string
  href: string
  target?: string
}

export function Navigation() {
  const [expanded, setExpanded] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const navItems: NavItem[] = [
    { label: 'Beneficios',     id: 'beneficios',   href: '#beneficios' },
    { label: 'Herramientas',   id: 'herramientas', href: '#herramientas' },
    { label: 'Bienestar',      id: 'juegos',       href: '#juegos' },
    { label: 'Campus Virtual', id: 'campus',       href: 'https://virtual.uccuyo.edu.ar/', target: '_blank' },
  ]

  // Collapsed width fits "Campus Virtual" text; expanded fits all items
  const pillWidth = useSpring(210, { stiffness: 220, damping: 25, mass: 1 })

  useEffect(() => {
    if (hovering) {
      setExpanded(true)
      pillWidth.set(720)
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setExpanded(false)
        pillWidth.set(210)
      }, 500)
    }
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    }
  }, [hovering, pillWidth])

  const handleMouseEnter = () => setHovering(true)
  const handleMouseLeave = () => setHovering(false)

  const handleItemClick = (item?: NavItem) => {
    setHovering(false)
    if (item?.id === 'campus') {
      trackEvent('click_campus_virtual', { location: 'header_expanded_menu' })
    } else if (item?.id) {
      trackEvent('nav_click_section', { section: item.id })
    }
  }

  // Option A: Deep UCCuyo green translucent pill with gold/emerald accents
  const darkBg = 'rgba(4, 46, 30, 0.90)'
  const darkBgExpanded = 'rgba(2, 40, 26, 0.95)'

  return (
    <motion.nav
      aria-label="Navegación principal"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative left-0 right-0 z-30 pointer-events-none w-full mt-11 sm:mt-12 mb-3 sm:mb-4"
    >
      {/* Container */}
      <div className="flex items-start justify-center pointer-events-none">

        {/* ─── Centered Institutional Green Pill ─── */}
        <div className="hidden md:flex pointer-events-auto">
          <motion.div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative rounded-full cursor-pointer"
            style={{
              width: pillWidth,
              height: '60px',
              background: expanded ? darkBgExpanded : darkBg,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(232, 161, 51, 0.40)',
              boxShadow: expanded
                ? `0 4px 20px rgba(0, 0, 0, 0.4),
                   0 12px 30px rgba(2, 56, 37, 0.55),
                   0 0 25px rgba(232, 161, 51, 0.25),
                   inset 0 1px 0 rgba(255, 255, 255, 0.2)`
                : `0 4px 15px rgba(0, 0, 0, 0.35),
                   0 8px 22px rgba(2, 56, 37, 0.45),
                   0 0 15px rgba(232, 161, 51, 0.18),
                   inset 0 1px 0 rgba(255, 255, 255, 0.15)`,
              overflow: 'hidden',
              transition: 'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
            }}
          >
            {/* Subtle top highlight line with golden & white shine */}
            <div
              className="absolute inset-x-0 top-0 rounded-t-full pointer-events-none"
              style={{
                height: '1.5px',
                background: 'linear-gradient(90deg, rgba(232,161,51,0) 0%, rgba(232,161,51,0.5) 25%, rgba(255,255,255,0.8) 50%, rgba(232,161,51,0.5) 75%, rgba(232,161,51,0) 100%)',
              }}
            />

            {/* ── Content ── */}
            <div
              ref={containerRef}
              className="relative z-10 h-full flex items-center justify-center px-6"
            >
              {/* Collapsed: always "Campus Virtual" */}
              {!expanded && (
                <motion.a
                  href="https://virtual.uccuyo.edu.ar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    fontFamily: "'Montserrat', sans-serif",
                    color: '#ffffff',
                    letterSpacing: '0.4px',
                    whiteSpace: 'nowrap',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    trackEvent('click_campus_virtual', { location: 'header_pill_desktop' })
                  }}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '9999px',
                      backgroundColor: '#e8a133',
                      boxShadow: '0 0 10px rgba(232, 161, 51, 0.85)',
                    }}
                  />
                  Campus Virtual
                </motion.a>
              )}

              {/* Expanded: all nav items */}
              {expanded && (
                <div className="flex items-center justify-evenly w-full">
                  <AnimatePresence>
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.id}
                        href={item.href}
                        target={item.target}
                        rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ delay: index * 0.06, duration: 0.2, ease: 'easeOut' }}
                        onClick={() => handleItemClick(item)}
                        className="relative cursor-pointer transition-all duration-200"
                        style={{
                          fontSize: '15.5px',
                          fontWeight: item.id === 'campus' ? 700 : 500,
                          fontFamily: item.id === 'campus'
                            ? "'Montserrat', sans-serif"
                            : "'Inter', sans-serif",
                          color: item.id === 'campus' ? '#ffffff' : 'rgba(255,255,255,0.65)',
                          textDecoration: 'none',
                          letterSpacing: '0.35px',
                          padding: '8px 14px',
                          whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#ffffff'
                          e.currentTarget.style.transform = 'translateY(-1px)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = item.id === 'campus'
                            ? '#ffffff'
                            : 'rgba(255,255,255,0.65)'
                          e.currentTarget.style.transform = 'translateY(0)'
                        }}
                      >
                        {item.label}
                      </motion.a>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* ─── Mobile: Centered Pill with Campus Virtual Button + Menu Toggle ─── */}
        <div className="flex md:hidden items-center justify-center w-full px-3 pointer-events-auto">
          <div
            className="flex items-center justify-between rounded-full px-4 py-2 gap-3"
            style={{
              background: 'rgba(4, 46, 30, 0.94)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(232, 161, 51, 0.40)',
              boxShadow: '0 4px 18px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(2, 56, 37, 0.55), 0 0 15px rgba(232, 161, 51, 0.2)',
            }}
          >
            {/* Direct Link to Campus Virtual with Golden Dot */}
            <a
              href="https://virtual.uccuyo.edu.ar/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('click_campus_virtual', { location: 'header_pill_mobile' })}
              className="inline-flex items-center gap-2 text-white font-montserrat font-bold text-sm tracking-wide active:scale-95 transition-transform"
              style={{ textDecoration: 'none' }}
              title="Ingresar a Campus Virtual UCCuyo"
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '9999px',
                  backgroundColor: '#e8a133',
                  boxShadow: '0 0 10px rgba(232, 161, 51, 0.9)',
                }}
              />
              <span>Campus Virtual</span>
            </a>

            {/* Subtle Divider */}
            <div className="w-[1px] h-4 bg-white/20" />

            {/* Menu Toggle Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú de navegación"}
              className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-bold px-2.5 py-1 rounded-full bg-white/10 active:scale-95 transition-all"
            >
              <span>{mobileOpen ? 'Cerrar' : 'Menú'}</span>
              {mobileOpen ? <X className="w-3.5 h-3.5 text-white" /> : <Menu className="w-3.5 h-3.5 text-white" />}
            </button>
          </div>
        </div>

        {/* ─── Mobile dropdown ─── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-14 left-4 right-4 rounded-2xl overflow-hidden pointer-events-auto shadow-2xl z-50"
              style={{
                background: 'rgba(3, 38, 24, 0.98)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(232, 161, 51, 0.35)',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(2, 56, 37, 0.5)',
              }}
            >
              {navItems.map((item, i) => (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.target}
                  rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                  onClick={() => { setMobileOpen(false); handleItemClick(item) }}
                  className="block px-6 py-4 hover:bg-white/5 transition-colors"
                  style={{
                    fontFamily: item.id === 'campus' ? "'Montserrat', sans-serif" : "'Inter', sans-serif",
                    fontWeight: item.id === 'campus' ? 700 : 400,
                    color: item.id === 'campus' ? '#fff' : 'rgba(255,255,255,0.70)',
                    borderBottom: i < navItems.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.nav>
  )
}
