export const GOOGLE_ADS_CONVERSION_ID = 'AW-18303925044/7zuMCPrFg-ccELT2_pdE';

export const trackConversion = (url?: string) => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'conversion', {
            send_to: GOOGLE_ADS_CONVERSION_ID,
            event_callback: url ? () => { window.location.href = url; } : undefined,
        });
    }
};
