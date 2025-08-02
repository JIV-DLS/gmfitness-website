import React, { memo, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TestimonialCard } from './TestimonialCard';
import { VideoPlayer } from './VideoPlayer';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { useTestimonials } from '@/hooks/useTestimonials';
import { useI18n } from '@/hooks/useI18n';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Testimonial } from '@/types/testimonials';
import { AnimationFactory } from '@/utils/animations';

// Props for TestimonialsSection component

/**
 * Section complète des témoignages avec filtres et stats
 * Pattern: Container Component + State Management
 */
export const TestimonialsSection = memo(({
  className = '',
  showStats = true,
  maxTestimonials = 12
}) => {
  const { t } = useI18n();
  const {
    testimonials,
    featuredTestimonials,
    stats,
    loading,
    error,
    getTestimonialsByType,
    getTestimonialsByRating,
    getVideoTestimonials,
    getBeforeAfterTestimonials,
    getPopularTags
  } = useTestimonials();

  const [activeFilter, setActiveFilter] = useState('featured');
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  // Filtres disponibles
  const filters = [
    { id: 'featured', label: 'Coup de cœur', icon: '⭐', count: featuredTestimonials.length },
    { id: 'all', label: 'Tous', icon: '📝', count: testimonials.length },
    { id: 'video', label: 'Vidéos', icon: '🎥', count: getVideoTestimonials().length },
    { id: 'before_after', label: 'Avant/Après', icon: '📸', count: getBeforeAfterTestimonials().length },
    { id: '5_stars', label: '5 étoiles', icon: '⭐', count: getTestimonialsByRating(5).length }
  ];

  // Témoignages filtrés
  const filteredTestimonials = useMemo(() => {
    let filtered = [];

    switch (activeFilter) {
      case 'featured':
        filtered = featuredTestimonials;
        break;
      case 'video':
        filtered = getVideoTestimonials();
        break;
      case 'before_after':
        filtered = getBeforeAfterTestimonials();
        break;
      case '5_stars':
        filtered = getTestimonialsByRating(5);
        break;
      default:
        filtered = testimonials;
        break;
    }

    return filtered.slice(0, maxTestimonials);
  }, [activeFilter, testimonials, featuredTestimonials, getVideoTestimonials, getBeforeAfterTestimonials, getTestimonialsByRating, maxTestimonials]);

  const popularTags = getPopularTags(6);

  if (loading && testimonials.length === 0) {
    return (
      <section className={`section-padding bg-gray-50 dark:bg-gray-800 ${className}`}>
        <div className="container-max">
          <div className="flex items-center justify-center min-h-[400px]">
            <LoadingSpinner size="lg" message={t('testimonials.loading', 'Chargement des témoignages...')} />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`section-padding bg-gray-50 dark:bg-gray-800 ${className}`}>
        <div className="container-max">
          <div className="text-center py-16">
            <div className="text-4xl mb-4">😔</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Erreur de chargement
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className={`section-padding bg-gray-50 dark:bg-gray-800 ${className}`}>
      <div className="container-max">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('testimonials.title', 'Témoignages')} <span className="text-primary-600 dark:text-primary-400">Clients</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            {t('testimonials.subtitle', 'Découvrez les transformations inspirantes de mes clients et leurs retours sur mon accompagnement.')}
          </p>

          {/* Statistiques */}
          {showStats && stats && (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
              variants={AnimationFactory.stagger(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className="text-center"
                variants={AnimationFactory.staggerItem('up')}
              >
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {stats.total}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Témoignages</div>
              </motion.div>
              
              <motion.div
                className="text-center"
                variants={AnimationFactory.staggerItem('up')}
              >
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {stats.averageRating.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Note moyenne</div>
              </motion.div>
              
              <motion.div
                className="text-center"
                variants={AnimationFactory.staggerItem('up')}
              >
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {stats.videoCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Vidéos</div>
              </motion.div>
              
              <motion.div
                className="text-center"
                variants={AnimationFactory.staggerItem('up')}
              >
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {stats.beforeAfterCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avant/Après</div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Filtres */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
                              onClick={() => setActiveFilter(filter.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300
                ${activeFilter === filter.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{filter.icon}</span>
              <span>{filter.label}</span>
              <span className={`
                px-2 py-0.5 rounded-full text-xs
                ${activeFilter === filter.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                }
              `}>
                {filter.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Tags populaires */}
        {popularTags.length > 0 && (
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Tags populaires :</span>
            {popularTags.map(({ tag, count }) => (
              <motion.span
                key={tag}
                className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-800/50 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                #{tag} ({count})
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* Grille des témoignages */}
        {filteredTestimonials.length > 0 ? (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={AnimationFactory.stagger(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={AnimationFactory.staggerItem('up')}
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  variant={testimonial.featured && index === 0 ? 'featured' : 'default'}
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Aucun témoignage trouvé
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Essayez un autre filtre ou revenez plus tard.
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Prêt à rejoindre mes clients satisfaits ?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Commencez votre transformation dès aujourd'hui avec un accompagnement personnalisé 
            et des résultats prouvés.
          </p>
          <motion.a
            href="#contact"
            className="btn-primary inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Commencer mon parcours
          </motion.a>
        </motion.div>
      </div>

      {/* Modal de témoignage détaillé */}
      {selectedTestimonial && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedTestimonial(null)}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Témoignage détaillé
                </h3>
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  ✕
                </button>
              </div>
              
              <TestimonialCard
                testimonial={selectedTestimonial}
                variant="featured"
                showFullContent
                className="border-0 shadow-none"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';