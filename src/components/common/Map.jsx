import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';

/**
 * Composant de carte interactive avec les lieux de séances
 * Pattern: Presentation Component + Iframe Embedding
 */
export const Map = memo(({ className = '', height = '400px' }) => {
  const { t } = useI18n();

  // Lieux de séances avec leurs informations - Côte d'Azur
  const sessionLocations = [
    {
      id: 1,
      name: 'Coaching à domicile',
      address: 'Cannes et environs',
      type: 'Déplacement à domicile',
      features: ['Chez vous', 'Équipement fourni', 'Flexible'],
      icon: '🏠'
    },
    {
      id: 2,
      name: 'Plages de Cannes',
      address: 'Boulevard de la Croisette, Cannes',
      type: 'Entraînement en extérieur',
      features: ['Vue mer', 'Air pur', 'Sable fin', 'Lever de soleil'],
      icon: '🏖️'
    },
    {
      id: 3,
      name: 'Parc de la Croix des Gardes',
      address: 'Parc de la Croix des Gardes, Cannes',
      type: 'Entraînement nature',
      features: ['Parcours trail', 'Vue panoramique', 'Air pur', 'Exercices fonctionnels'],
      icon: '🌳'
    },
    {
      id: 4,
      name: 'Port de Cannes',
      address: 'Vieux Port, Cannes',
      type: 'Entraînement urbain',
      features: ['Quais aménagés', 'Course à pied', 'Stretching', 'Ambiance maritime'],
      icon: '⛵'
    }
  ];

  // URL Google Maps avec marqueurs multiples pour Cannes
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23277.826205949473!2d7.001640947265624!3d43.552847836840944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12ce812c78f12c2d%3A0x408ab2ae4bb21b0!2sCannes%2C%20France!5e0!3m2!1sfr!2sfr!4v1643900000000!5m2!1sfr!2sfr";

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Carte interactive */}
      <motion.div 
        className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ height }}
      >
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t('map.title', 'Lieux de séances')}
          className="dark:hue-rotate-180 dark:invert"
        ></iframe>
        
        {/* Overlay avec informations */}
        <div className="absolute top-4 left-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg p-3 max-w-xs border border-gray-200/50 dark:border-gray-700/50">
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
            {t('map.title', 'Lieux de séances')}
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {t('map.subtitle', 'Différents lieux d\'entraînement disponibles')}
          </p>
        </div>

        {/* Statistiques */}
        <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-primary-500">📍</span>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {sessionLocations.length} {t('map.locations_count', 'lieux disponibles')}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Liste des lieux avec détails */}
      <motion.div 
        className="grid md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {sessionLocations.map((location, index) => (
          <motion.div
            key={location.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{location.icon}</div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                {location.name}
              </h3>
              <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                {location.type}
              </p>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-start space-x-2">
                <span className="text-gray-500 dark:text-gray-400 mt-0.5">📍</span>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {location.address}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                {t('map.features', 'Caractéristiques')} :
              </h4>
              {Array.isArray(location.features) ? location.features.map((feature, idx) => (
                <div key={idx} className="flex items-center text-xs text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
                  {feature}
                </div>
              )) : (
                <div className="text-xs text-gray-700 dark:text-gray-300">
                  {location.features}
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button 
                className="w-full text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors duration-200"
                onClick={() => {
                  const query = encodeURIComponent(location.address);
                  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                }}
              >
                {t('map.directions', 'Obtenir l\'itinéraire')} →
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Information complémentaire */}
      <motion.div
        className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="flex items-start space-x-3">
          <span className="text-2xl">🚗</span>
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
              {t('map.travel.title', 'Zone de déplacement')}
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-400 mb-3">
              Je me déplace dans toute la Côte d'Azur pour les séances à domicile. Rayon de déplacement jusqu'à 30km autour de Cannes.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Cannes', 'Nice', 'Antibes', 'Juan-les-Pins', 'Mougins', 'Grasse'].map((city) => (
                <span key={city} className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                  {city}
                </span>
              ))}
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                + autres
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

Map.displayName = 'Map';