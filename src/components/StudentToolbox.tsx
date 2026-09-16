import { GlowNotes } from './GlowNotes'
import { DeepFocusPlayer } from './DeepFocusPlayer'
import { CampusNavigator } from './CampusNavigator'
import { KanbanBoard } from './KanbanBoard'

export function StudentToolbox() {
    return (
        <section className="py-24 relative overflow-hidden bg-background">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent shadow-[0_0_20px_rgba(232,161,51,0.2)]" />
            
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">
                        Panel del <span className="text-uccuyoGold">Estudiante</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl text-lg font-medium leading-relaxed">
                        Espacios de trabajo digitales pensados para organizar el estudio, mejorar la concentración y mantener el foco académico.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    <div className="lg:col-span-1 h-[450px]">
                        <GlowNotes />
                    </div>
                    <div className="lg:col-span-1 h-[450px]">
                        <DeepFocusPlayer />
                    </div>
                    <div className="lg:col-span-1 h-[450px]">
                        <KanbanBoard />
                    </div>
                    <div className="lg:col-span-1 h-[450px]">
                        <CampusNavigator />
                    </div>
                </div>
            </div>
            
            {/* Decorative bottom element */}
             <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
        </section>
    )
}
