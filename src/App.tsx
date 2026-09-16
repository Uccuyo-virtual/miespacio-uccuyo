import { useState, useEffect } from "react"
import { Navigation } from "./components/Navigation"
import { Hero } from "./components/Hero"
import { InstitutionalBanner } from "./components/InstitutionalBanner"
import { FeatureGrid } from "./components/FeatureGrid"
import { AdvantageSlider } from "./components/AdvantageSlider"
import { DirectIntegration } from "./components/DirectIntegration"
import { InstitutionalZocalo } from "./components/InstitutionalZocalo"
import { FocusTimerWidget } from "./components/FocusTimerWidget"
import { WhatsAppButton } from "./components/WhatsAppButton"
import { ZenPlayZone } from "./components/ZenPlayZone"
import { StudentToolbox } from "./components/StudentToolbox"
import CyberneticGridShader from "./components/CyberneticGridShader"
import { BackgroundSelector } from "./components/BackgroundSelector"

function App() {
    const [bgMode, setBgMode] = useState<string>(() => {
        return localStorage.getItem("study-bg-mode") || "zen"
    })

    useEffect(() => {
        localStorage.setItem("study-bg-mode", bgMode)
        if (bgMode === "light") {
            document.documentElement.classList.add("light")
            document.documentElement.classList.remove("dark")
        } else {
            document.documentElement.classList.add("dark")
            document.documentElement.classList.remove("light")
        }
    }, [bgMode])

    return (
        <>
            <main id="page-main" className="relative font-inte bg-mesh min-h-screen">
                <a href="#page-main" className="skip-link">Saltar al contenido</a>
                
                {/* Renderizado condicional del fondo seleccionado */}
                {bgMode === "cyber" && <CyberneticGridShader />}
                {/* "zen" y "light" utilizan sus fondos CSS optimizados sin recargo de canvas */}
                
                {/* 1. Banner superior ocupando todo el ancho de la pantalla */}
                <InstitutionalBanner />

                {/* 2. Barra / Botón desplegable Campus Virtual abajo del banner */}
                <Navigation />

                {/* 3. Secciones principales */}
                <Hero />
                <FeatureGrid />
                <StudentToolbox />
                <ZenPlayZone />
                <AdvantageSlider />
                <DirectIntegration />

                {/* 4. Footer institucional abajo de todo ocupando todo el ancho */}
                <InstitutionalZocalo />
                <FocusTimerWidget />
                <WhatsAppButton />
                
                {/* Selector flotante de ambiente de estudio */}
                <BackgroundSelector currentMode={bgMode} onChangeMode={setBgMode} />
            </main>
        </>
    )
}

export default App
