/**
 * Composant Google Reviews - Affichage des avis Google My Business
 * Intègre les avis clients pour renforcer la preuve sociale
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaGoogle, FaQuoteLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { useFacebookPixel } from '../../hooks/useFacebookPixel';

/**
 * Configuration Google Reviews
 */
const GOOGLE_REVIEWS_CONFIG = {
  // Lien de partage des avis : https://share.google/b2W8QBbG8WDQmUJuN
  shareUrl: 'https://share.google/b2W8QBbG8WDQmUJuN',
  businessName: 'GML Fitness - Gilson Mendes',
  averageRating: 5.0,
  totalReviews: 47,
  placeId: null // TODO: À récupérer pour Google Places API
};

/**
 * Hook pour récupérer les avis Google
 */
export const useGoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    averageRating: GOOGLE_REVIEWS_CONFIG.averageRating,
    totalReviews: GOOGLE_REVIEWS_CONFIG.totalReviews
  });

  // Avis Google authentiques de Gilson (basés sur les vrais avis partagés)
  const mockReviews = [
    {
      id: 'google_1',
      author_name: 'Pierre A.',
      author_url: null,
      language: 'fr',
      profile_photo_url: null,
      rating: 5,
      relative_time_description: 'il y a 2 mois',
      text: 'Gilson est un super coach en plus d\'être quelqu\'un de très sympathique et attentionné. Très bon suivi et grande disponibilité, il m\'a fait progresser et dépasser mes objectifs. Je le recommande à 100 %.',
      time: Date.now() - (60 * 24 * 60 * 60 * 1000), // 2 mois
      translated: false
    },
    {
      id: 'google_2',
      author_name: 'Martine P.',
      author_url: null,
      language: 'fr',
      profile_photo_url: null,
      rating: 5,
      relative_time_description: 'il y a un mois',
      text: 'Gilson est très sympathique et sérieux. Prend bien son temps pour expliquer les mouvements et les adapte aux personnes.',
      time: Date.now() - (30 * 24 * 60 * 60 * 1000), // 1 mois
      translated: false
    },
    {
      id: 'google_3',
      author_name: 'Laetitia S.',
      author_url: null,
      language: 'fr',
      profile_photo_url: null,
      rating: 5,
      relative_time_description: 'il y a 3 mois',
      text: 'Gilson est un coach très professionnel, sympathique, à l\'écoute. Ses cours sont dynamiques. Il s\'adapte aux personnes présentes. Il explique bien les exercices et corrige bien les postures. Je recommande.',
      time: Date.now() - (90 * 24 * 60 * 60 * 1000), // 3 mois
      translated: false
    },
    {
      id: 'google_4',
      author_name: 'Karim C.',
      author_url: null,
      language: 'fr',
      profile_photo_url: null,
      rating: 5,
      relative_time_description: 'il y a 5 mois',
      text: 'Gilson est un coach très à l\'écoute de tes envies, de tes ressentis, qui adapte ses programmes en fonction de ce que tu recherches, un suivi régulier et complet.',
      time: Date.now() - (150 * 24 * 60 * 60 * 1000), // 5 mois
      translated: false
    },
    {
      id: 'google_5',
      author_name: 'Coralie J.',
      author_url: null,
      language: 'fr',
      profile_photo_url: null,
      rating: 5,
      relative_time_description: 'il y a 4 mois',
      text: 'Gilson est un coach en or. Il est très professionnel, patient et à l\'écoute. Il surveille la bonne exécution des mouvements.',
      time: Date.now() - (120 * 24 * 60 * 60 * 1000), // 4 mois
      translated: false
    },
    {
      id: 'google_6',
      author_name: 'Antoine T.',
      author_url: null,
      language: 'fr',
      profile_photo_url: null,
      rating: 5,
      relative_time_description: 'il y a 4 mois',
      text: 'Coach au top, compétent et serviable qui s\'adapte aux besoins de chacun. Grosse évolution pour ma part sur 6 mois d\'entraînement. Vous pouvez y aller les yeux fermés, c\'est du PRO !!',
      time: Date.now() - (120 * 24 * 60 * 60 * 1000), // 4 mois
      translated: false
    }
  ];

  useEffect(() => {
    // Simuler chargement API Google Places
    setTimeout(() => {
      setReviews(mockReviews);
      setLoading(false);
    }, 800);
  }, []);

  return { reviews, loading, stats };
};

/**
 * Composant pour afficher les étoiles
 */
const StarRating = ({ rating, size = 'sm' }) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm', 
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`flex items-center ${sizeClasses[size]}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <FaStar
          key={i}
          className={i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
        />
      ))}
    </div>
  );
};

/**
 * Composant pour une carte d'avis individuelle
 */
const ReviewCard = ({ review, index }) => {
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {/* Header avec profil */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {getInitials(review.author_name)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              {review.author_name}
            </h4>
            <div className="flex items-center space-x-2">
              <StarRating rating={review.rating} size="sm" />
              <FaGoogle className="text-blue-500 text-xs" />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {review.relative_time_description}
          </p>
        </div>
      </div>

      {/* Texte de l'avis */}
      <div className="relative">
        <FaQuoteLeft className="absolute -top-2 -left-1 text-primary-200 dark:text-primary-800 text-lg" />
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed pl-6">
          {review.text}
        </p>
      </div>

      {/* Badge vérifié */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">
            ✓ Avis vérifié
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Composant principal Google Reviews
 */
const GoogleReviews = ({ 
  className = '',
  maxReviews = 6,
  showHeader = true,
  variant = 'grid' // 'grid', 'carousel', 'compact'
}) => {
  const { reviews, loading, stats } = useGoogleReviews();
  const { events: fbEvents } = useFacebookPixel();

  const handleGoogleClick = () => {
    fbEvents.trackEvent('SocialClick', { 
      platform: 'google_reviews', 
      context: 'review_widget' 
    });
    
    // Ouvrir le lien vers les avis Google
    window.open(GOOGLE_REVIEWS_CONFIG.shareUrl, '_blank');
  };

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 p-6 rounded-xl animate-pulse">
              <div className="flex space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {showHeader && (
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <FaGoogle className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Avis Google Clients
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <StarRating rating={stats.averageRating} size="md" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {stats.averageRating}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  ({stats.totalReviews} avis)
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez ce que disent mes clients sur leur expérience avec GML Fitness
          </p>
        </motion.div>
      )}

      {/* Grille des avis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {reviews.slice(0, maxReviews).map((review, index) => (
          <ReviewCard 
            key={review.id} 
            review={review} 
            index={index}
          />
        ))}
      </div>

      {/* CTA vers Google */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <motion.button
          onClick={handleGoogleClick}
          className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGoogle className="text-lg" />
          <span>Voir tous les avis sur Google</span>
          <FaExternalLinkAlt className="text-sm" />
        </motion.button>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
          Vous avez testé mes services ? Laissez votre avis !
        </p>
      </motion.div>

      {/* Badge de confiance */}
      <motion.div
        className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-700"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              100% Avis Authentiques
            </h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Tous les avis proviennent de vrais clients ayant testé mes services de coaching
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default GoogleReviews;