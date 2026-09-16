/**
 * Google Analytics 4 Event Tracker
 * Permite registrar las interacciones de los alumnos con cada módulo
 * para que las autoridades puedan ver qué herramientas son las más utilizadas.
 */

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        dataLayer?: any[];
    }
}

export function trackEvent(eventName: string, params: Record<string, any> = {}) {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', eventName, {
            ...params,
            timestamp: new Date().toISOString()
        });
    }
}
