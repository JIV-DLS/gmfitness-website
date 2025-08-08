/**
 * Hook pour gestion Facebook Pixel
 * Permet tracking d'événements personnalisés pour retargeting
 */

import { useEffect } from 'react';

// Configuration Facebook Pixel
const FB_PIXEL_CONFIG = {
  pixelId: import.meta.env.VITE_FACEBOOK_PIXEL_ID || null, // À configurer dans .env.local
  enabled: import.meta.env.PROD && typeof window !== 'undefined'
};

/**
 * Hook principal Facebook Pixel
 */
export const useFacebookPixel = () => {
  
  // Fonction pour tracker un événement custom
  const trackEvent = (eventName, parameters = {}) => {
    if (!FB_PIXEL_CONFIG.enabled || !window.fbq) {
      console.log(`🎯 [DEV] Facebook Pixel Event: ${eventName}`, parameters);
      return;
    }

    try {
      window.fbq('track', eventName, parameters);
      console.log(`🎯 Facebook Pixel tracked: ${eventName}`, parameters);
    } catch (error) {
      console.error('Facebook Pixel error:', error);
    }
  };

  // Événements prédéfinis pour le business de Gilson
  const events = {
    // Contact form submitted
    submitContactForm: (formData) => trackEvent('Lead', {
      content_name: 'Contact Form',
      content_category: 'Lead Generation',
      value: 50, // Valeur estimée d'un lead
      currency: 'EUR',
      lead_type: formData.service || 'General'
    }),

    // Booking form submitted  
    submitBookingForm: (bookingData) => trackEvent('Schedule', {
      content_name: 'Booking Form',
      content_category: 'Appointment',
      value: 70, // Prix séance
      currency: 'EUR',
      service_type: bookingData.service || 'Personal Training'
    }),

    // Newsletter signup
    subscribeNewsletter: () => trackEvent('Subscribe', {
      content_name: 'Newsletter',
      content_category: 'Email Marketing'
    }),

    // View specific service page/section
    viewService: (serviceName) => trackEvent('ViewContent', {
      content_name: serviceName,
      content_category: 'Service',
      content_type: 'service_page'
    }),

    // Click on WhatsApp
    clickWhatsApp: (context = 'general') => trackEvent('Contact', {
      content_name: 'WhatsApp Click',
      content_category: 'Communication',
      communication_type: 'whatsapp',
      context: context
    }),

    // Click on phone number
    clickPhone: (context = 'general') => trackEvent('Contact', {
      content_name: 'Phone Click', 
      content_category: 'Communication',
      communication_type: 'phone',
      context: context
    }),

    // Download lead magnet (future)
    downloadLeadMagnet: (magnetName) => trackEvent('Lead', {
      content_name: magnetName,
      content_category: 'Lead Magnet',
      value: 30,
      currency: 'EUR'
    }),

    // Watch video (YouTube)
    watchVideo: (videoTitle) => trackEvent('ViewContent', {
      content_name: videoTitle,
      content_category: 'Video',
      content_type: 'video'
    })
  };

  return {
    trackEvent,
    events,
    isEnabled: FB_PIXEL_CONFIG.enabled
  };
};

/**
 * Hook pour tracking automatique des pages vues
 */
export const usePageViewTracking = () => {
  const { trackEvent, isEnabled } = useFacebookPixel();

  useEffect(() => {
    if (isEnabled && window.fbq) {
      // Track page view automatique
      window.fbq('track', 'PageView');
      console.log('🎯 Facebook Pixel: PageView tracked');
    }
  }, [isEnabled]);
};

/**
 * Hook pour tracking scroll depth (engagement)
 */
export const useScrollTracking = () => {
  const { trackEvent } = useFacebookPixel();

  useEffect(() => {
    let scrollDepth25 = false;
    let scrollDepth50 = false;
    let scrollDepth75 = false;
    let scrollDepth100 = false;

    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercentage >= 25 && !scrollDepth25) {
        scrollDepth25 = true;
        trackEvent('CustomEvent', { event_name: 'Scroll_25' });
      }
      if (scrollPercentage >= 50 && !scrollDepth50) {
        scrollDepth50 = true;
        trackEvent('CustomEvent', { event_name: 'Scroll_50' });
      }
      if (scrollPercentage >= 75 && !scrollDepth75) {
        scrollDepth75 = true;
        trackEvent('CustomEvent', { event_name: 'Scroll_75' });
      }
      if (scrollPercentage >= 100 && !scrollDepth100) {
        scrollDepth100 = true;
        trackEvent('CustomEvent', { event_name: 'Scroll_100' });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackEvent]);
};

export default useFacebookPixel;