import portadaWeb2 from "../assets/images/portada-web2.png"
import { trackEvent } from "../lib/analytics"

export function InstitutionalBanner() {
    return (
        <header className="w-full overflow-hidden relative z-30 bg-[#133319]" aria-label="Banner Institucional UCCuyo">
            <a
                href="https://virtual.uccuyo.edu.ar/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_campus_virtual', { location: 'top_banner' })}
                className="block w-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-uccuyoGold"
                title="Ir a UCCuyo A Distancia - Campus Virtual"
            >
                <img
                    src={portadaWeb2}
                    alt="UCCuyo A Distancia - Universidad Católica de Cuyo. Banner oficial."
                    width={1920}
                    height={600}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-auto aspect-[1920/600] sm:aspect-auto sm:h-[180px] md:h-[220px] lg:h-[250px] object-contain sm:object-cover object-center block"
                />
            </a>
            {/* Subtle transition gradient to seamlessly blend with page background */}
            <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-b from-transparent to-[#133319] pointer-events-none opacity-70" />
        </header>
    )
}
