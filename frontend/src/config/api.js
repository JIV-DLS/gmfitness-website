/**
 * Configuration API pour GML Fitness
 * URLs et endpoints du backend
 */

// URL du backend Vercel (version fonctionnelle avec Google Reviews)
export const BACKEND_URL = 'https://gml-fitness-backend-17wu3wi87-jonas-vihoale-aniglos-projects.vercel.app';

// Endpoints API
export const API_ENDPOINTS = {
  instagram: `${BACKEND_URL}/api/instagram`,
  reviews: `${BACKEND_URL}/api/reviews`
};

// Configuration pour les requêtes
export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  // Timeout en millisecondes
  timeout: 10000
};

/**
 * Fonction helper pour faire des requêtes API
 */
export const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...API_CONFIG,
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

/**
 * API Services
 */
export const apiServices = {
  // Service Instagram
  instagram: {
    /**
     * Récupérer les posts Instagram
     */
    getPosts: async () => {
      try {
        const data = await apiRequest(API_ENDPOINTS.instagram);
        return data;
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
        // Fallback vers données mockées en cas d'erreur
        return {
          success: false,
          error: error.message,
          data: []
        };
      }
    }
  },

  // Service Google Reviews
  reviews: {
    /**
     * Récupérer les avis Google
     */
    getReviews: async () => {
      try {
        const data = await apiRequest(API_ENDPOINTS.reviews);
        return data;
      } catch (error) {
        console.error('Error fetching Google reviews:', error);
        // Fallback vers données mockées en cas d'erreur
        return {
          success: false,
          error: error.message,
          data: [],
          stats: {
            averageRating: 5.0,
            totalReviews: 47,
            businessName: 'GML Fitness'
          }
        };
      }
    }
  }
};

export default apiServices;