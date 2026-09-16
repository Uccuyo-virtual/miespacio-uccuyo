export function MagicVisuals() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] bg-transparent transition-colors duration-1000">
            <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] bg-techPurple/10 rounded-full blur-[80px] animate-float-15s opacity-50 will-change-transform" />
            <div className="absolute top-[60%] -right-[10%] w-[50vw] h-[50vw] bg-accent/10 rounded-full blur-[80px] animate-float-20s opacity-50 will-change-transform" />
            <div className="absolute top-[20%] left-[40%] w-[40vw] h-[40vw] bg-uccuyoGreen/10 rounded-full blur-[80px] animate-float-18s opacity-50 will-change-transform" />
            <div className="absolute inset-0 opacity-[0.03] background-grid" />
        </div>
    )
}
