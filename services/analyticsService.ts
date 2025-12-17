// src/services/analyticsService.ts

/**
 * Initializes Google Analytics. This should be called once when the app starts.
 */
export const initGA = () => {
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (gaMeasurementId && process.env.NODE_ENV === 'production') {
    // Inject the GTM Script dynamically
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
    document.head.appendChild(script);

    // Config
    // @ts-ignore
    window.gtag('config', gaMeasurementId, {
      send_page_view: false // SPA behavior
    });
  }
};

/**
 * Sends a pageview event to Google Analytics.
 * @param path - The path of the page to track (e.g., '/dashboard').
 */
export const sendPageview = (path: string) => {
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (process.env.NODE_ENV === 'production' && gaMeasurementId) {
    // @ts-ignore
    window.gtag('event', 'page_view', {
      page_path: path,
    });
  }
};

/**
 * Sends a custom event to Google Analytics.
 * @param eventName - The name of the event (e.g., 'login').
 * @param eventParams - Optional parameters for the event.
 */
export const sendEvent = (eventName: string, eventParams?: { [key: string]: any }) => {
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (process.env.NODE_ENV === 'production' && gaMeasurementId) {
    // @ts-ignore
    window.gtag('event', eventName, eventParams);
  }
};
