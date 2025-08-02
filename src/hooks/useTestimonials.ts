import { useState, useEffect, useCallback } from 'react';
import { TestimonialService } from '@/services/TestimonialService';
import { 
  Testimonial, 
  TestimonialFilters, 
  TestimonialStats,
  CoachingVideo 
} from '@/types/testimonials';
import { ApiResponse } from '@/types/common';

/**
 * Hook personnalisé pour la gestion des témoignages
 * Pattern: Custom Hook + Repository + Cache
 */
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [featuredTestimonials, setFeaturedTestimonials] = useState<Testimonial[]>([]);
  const [stats, setStats] = useState<TestimonialStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testimonialService = TestimonialService.getInstance();

  /**
   * Charge tous les témoignages avec filtres
   */
  const loadTestimonials = useCallback(async (filters: TestimonialFilters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const result = await testimonialService.getTestimonials(filters);
      
      if (result.success && result.data) {
        setTestimonials(result.data);
      } else {
        setError(result.error || 'Erreur lors du chargement des témoignages');
      }
    } catch (error: any) {
      setError('Erreur inattendue lors du chargement');
    } finally {
      setLoading(false);
    }
  }, [testimonialService]);

  /**
   * Charge les témoignages mis en avant
   */
  const loadFeaturedTestimonials = useCallback(async () => {
    try {
      const result = await testimonialService.getFeaturedTestimonials();
      
      if (result.success && result.data) {
        setFeaturedTestimonials(result.data);
      }
    } catch (error: any) {
      console.warn('Failed to load featured testimonials:', error);
    }
  }, [testimonialService]);

  /**
   * Charge les statistiques
   */
  const loadStats = useCallback(async () => {
    try {
      const result = await testimonialService.getTestimonialStats();
      
      if (result.success && result.data) {
        setStats(result.data);
      }
    } catch (error: any) {
      console.warn('Failed to load testimonial stats:', error);
    }
  }, [testimonialService]);

  /**
   * Ajoute un nouveau témoignage
   */
  const addTestimonial = useCallback(async (
    testimonialData: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<Testimonial>> => {
    setLoading(true);
    setError(null);

    try {
      const result = await testimonialService.createTestimonial(testimonialData);

      if (result.success && result.data) {
        // Ajoute le nouveau témoignage à la liste
        setTestimonials(prev => [result.data!, ...prev]);
        
        // Recharge les featured si c'est un témoignage featured
        if (result.data.featured) {
          loadFeaturedTestimonials();
        }
      } else {
        setError(result.error || 'Erreur lors de l\'ajout du témoignage');
      }

      return result;
    } catch (error: any) {
      const errorMessage = 'Erreur inattendue lors de l\'ajout';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, [testimonialService, loadFeaturedTestimonials]);

  /**
   * Met à jour un témoignage
   */
  const updateTestimonial = useCallback(async (
    id: string,
    updates: Partial<Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<ApiResponse<Testimonial>> => {
    setLoading(true);
    setError(null);

    try {
      const result = await testimonialService.updateTestimonial(id, updates);

      if (result.success && result.data) {
        // Met à jour le témoignage dans la liste
        setTestimonials(prev =>
          prev.map(testimonial =>
            testimonial.id === id ? result.data! : testimonial
          )
        );
        
        // Recharge les featured si nécessaire
        if (updates.featured !== undefined) {
          loadFeaturedTestimonials();
        }
      } else {
        setError(result.error || 'Erreur lors de la mise à jour');
      }

      return result;
    } catch (error: any) {
      const errorMessage = 'Erreur inattendue lors de la mise à jour';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, [testimonialService, loadFeaturedTestimonials]);

  /**
   * Supprime un témoignage
   */
  const deleteTestimonial = useCallback(async (id: string): Promise<ApiResponse<boolean>> => {
    setLoading(true);
    setError(null);

    try {
      const result = await testimonialService.deleteTestimonial(id);

      if (result.success) {
        // Supprime le témoignage de la liste
        setTestimonials(prev =>
          prev.filter(testimonial => testimonial.id !== id)
        );
        
        // Supprime des featured aussi
        setFeaturedTestimonials(prev =>
          prev.filter(testimonial => testimonial.id !== id)
        );
      } else {
        setError(result.error || 'Erreur lors de la suppression');
      }

      return result;
    } catch (error: any) {
      const errorMessage = 'Erreur inattendue lors de la suppression';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, [testimonialService]);

  /**
   * Filtre les témoignages par type
   */
  const getTestimonialsByType = useCallback((type: Testimonial['type']) => {
    return testimonials.filter(testimonial => testimonial.type === type);
  }, [testimonials]);

  /**
   * Filtre les témoignages par service
   */
  const getTestimonialsByService = useCallback((serviceType: string) => {
    return testimonials.filter(testimonial => testimonial.serviceType === serviceType);
  }, [testimonials]);

  /**
   * Récupère les témoignages avec une note minimum
   */
  const getTestimonialsByRating = useCallback((minRating: number) => {
    return testimonials.filter(testimonial => testimonial.rating >= minRating);
  }, [testimonials]);

  /**
   * Récupère les témoignages avec vidéo
   */
  const getVideoTestimonials = useCallback(() => {
    return testimonials.filter(testimonial => !!testimonial.videoTestimonial);
  }, [testimonials]);

  /**
   * Récupère les témoignages avec avant/après
   */
  const getBeforeAfterTestimonials = useCallback(() => {
    return testimonials.filter(testimonial => !!testimonial.beforeAfterImages);
  }, [testimonials]);

  /**
   * Récupère les tags les plus populaires
   */
  const getPopularTags = useCallback((limit: number = 10) => {
    const tagCounts: Record<string, number> = {};
    
    testimonials.forEach(testimonial => {
      testimonial.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    return Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([tag, count]) => ({ tag, count }));
  }, [testimonials]);

  /**
   * Clear l'erreur actuelle
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Rafraîchit toutes les données
   */
  const refresh = useCallback(() => {
    loadTestimonials();
    loadFeaturedTestimonials();
    loadStats();
  }, [loadTestimonials, loadFeaturedTestimonials, loadStats]);

  // Charge les données au montage
  useEffect(() => {
    refresh();
  }, []);

  return {
    // État
    testimonials,
    featuredTestimonials,
    stats,
    loading,
    error,

    // Actions
    loadTestimonials,
    loadFeaturedTestimonials,
    loadStats,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    clearError,
    refresh,

    // Getters
    getTestimonialsByType,
    getTestimonialsByService,
    getTestimonialsByRating,
    getVideoTestimonials,
    getBeforeAfterTestimonials,
    getPopularTags,

    // Stats rapides
    totalTestimonials: testimonials.length,
    averageRating: stats?.averageRating || 0,
    videoTestimonialsCount: getVideoTestimonials().length,
    beforeAfterCount: getBeforeAfterTestimonials().length
  };
}

/**
 * Hook pour gérer les vidéos de coaching
 */
export function useCoachingVideos() {
  const [videos, setVideos] = useState<CoachingVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testimonialService = TestimonialService.getInstance();

  /**
   * Charge les vidéos de coaching
   */
  const loadVideos = useCallback(async (
    category?: CoachingVideo['category'],
    isPublic: boolean = true
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await testimonialService.getCoachingVideos(category, isPublic);
      
      if (result.success && result.data) {
        setVideos(result.data);
      } else {
        setError(result.error || 'Erreur lors du chargement des vidéos');
      }
    } catch (error: any) {
      setError('Erreur inattendue lors du chargement des vidéos');
    } finally {
      setLoading(false);
    }
  }, [testimonialService]);

  /**
   * Ajoute une nouvelle vidéo
   */
  const addVideo = useCallback(async (
    videoData: Omit<CoachingVideo, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes'>
  ): Promise<ApiResponse<CoachingVideo>> => {
    setLoading(true);
    setError(null);

    try {
      const result = await testimonialService.createCoachingVideo(videoData);

      if (result.success && result.data) {
        setVideos(prev => [result.data!, ...prev]);
      } else {
        setError(result.error || 'Erreur lors de l\'ajout de la vidéo');
      }

      return result;
    } catch (error: any) {
      const errorMessage = 'Erreur inattendue lors de l\'ajout de la vidéo';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, [testimonialService]);

  /**
   * Filtre les vidéos par catégorie
   */
  const getVideosByCategory = useCallback((category: CoachingVideo['category']) => {
    return videos.filter(video => video.category === category);
  }, [videos]);

  /**
   * Clear l'erreur
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Charge les vidéos au montage
  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  return {
    videos,
    loading,
    error,
    loadVideos,
    addVideo,
    getVideosByCategory,
    clearError,
    totalVideos: videos.length
  };
}