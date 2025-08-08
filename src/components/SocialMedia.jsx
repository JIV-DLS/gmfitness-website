/**
 * Section Social Media - Intégration complète des réseaux sociaux
 * Combine Instagram Feed, YouTube Feed et partage social optimisé
 */

import React from 'react';
import { motion } from 'framer-motion';
import InstagramFeed from '@/components/social/InstagramFeed';
import YouTubeFeed from '@/components/social/YouTubeFeed';
import { ShareBar } from '@/components/common/ShareButton';
import { useI18n } from '@/hooks/useI18n';
import { usePageViewTracking } from '@/hooks/useFacebookPixel';

const SocialMedia = () => {
  const { t } = useI18n();
  
  // Track page view automatiquement
  usePageViewTracking();

  return (
    <section id="social" className="section-padding bg-gradient-to-br from-azure-50/40 to-ocean-100/40 dark:from-azure-900/40 dark:to-ocean-800/40">
      <div className="container-max">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('social.title', 'Suivez Mon')} {' '}
            <span className="text-primary-600 dark:text-primary-400">
              {t('social.titleHighlight', 'Actualité')}
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {t('social.subtitle', 'Découvrez mes séances avec les clients, conseils fitness quotidiens, et transformations inspirantes sur mes réseaux sociaux.')}
          </motion.p>

          {/* Share Bar */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <ShareBar
              template="general"
              title="Partager GML Fitness"
              platforms={['facebook', 'whatsapp', 'twitter', 'linkedin', 'copy']}
              variant="minimal"
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            />
          </motion.div>
        </motion.div>

        {/* Instagram Feed Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {t('social.instagram.title', '📸 Séances en Direct')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('social.instagram.description', 'Découvrez mes séances avec mes clients et leurs transformations inspirantes sur Instagram.')}
              </p>
            </div>
            
            <InstagramFeed 
              maxPosts={6}
              showHeader={true}
            />
          </div>
        </motion.div>

        {/* YouTube Feed Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {t('social.youtube.title', '🎥 Vidéos & Conseils')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('social.youtube.description', 'Profitez de mes vidéos gratuites : séances complètes, conseils techniques et programmes d\'entraînement.')}
              </p>
            </div>
            
            <YouTubeFeed 
              maxVideos={4}
              showHeader={true}
            />
          </div>
        </motion.div>

        {/* Social Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { 
              icon: '📱', 
              number: '2.3K+', 
              label: t('social.stats.instagram', 'Followers Instagram'),
              color: 'from-purple-500 to-pink-500'
            },
            { 
              icon: '🎥', 
              number: '156+', 
              label: t('social.stats.youtube', 'Abonnés YouTube'),
              color: 'from-red-500 to-red-600'
            },
            { 
              icon: '⭐', 
              number: '47+', 
              label: t('social.stats.reviews', 'Avis 5 étoiles'),
              color: 'from-yellow-400 to-orange-500'
            },
            { 
              icon: '🏆', 
              number: '150+', 
              label: t('social.stats.transformations', 'Transformations'),
              color: 'from-green-500 to-emerald-500'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">
            {t('social.cta.title', 'Rejoignez la Communauté GML Fitness !')}
          </h3>
          <p className="text-xl mb-8 opacity-90">
            {t('social.cta.description', 'Ne ratez aucun conseil, transformation ou séance. Suivez-moi sur tous mes réseaux sociaux !')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="https://www.instagram.com/gilsonmendes_coach/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>📸</span>
              <span>Instagram</span>
            </motion.a>
            
            <motion.a
              href="https://youtube.com/@Gilson.Mendes-Fitness"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>🎥</span>
              <span>YouTube</span>
            </motion.a>
            
            <motion.a
              href="https://www.facebook.com/Gilson.Coach.sportif"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>📘</span>
              <span>Facebook</span>
            </motion.a>
            
            <motion.a
              href="https://www.tiktok.com/@gilson.coach"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>🎵</span>
              <span>TikTok</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialMedia;