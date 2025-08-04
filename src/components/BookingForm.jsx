import React from 'react';
import { motion } from 'framer-motion';

/**
 * Composant de réservation avec intégration Fillout
 * Pattern: Iframe Embed + Modern UI
 */
export default function BookingForm() {
  return (
    <section
      id="booking"
      className="min-h-screen bg-gradient-to-br from-azure-50 via-ocean-50 to-mediterranean-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-4 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Réservez votre
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-azure-600 to-ocean-600 ml-3">
              Séance
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choisissez votre créneau et type de séance. Première séance découverte gratuite !
          </p>
        </motion.div>

        {/* Services Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-3 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Coaching Individuel */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              <div className="text-4xl mb-4">🏋️‍♂️</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Coaching Individuel
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Séance personnalisée 1h
              </p>
              <div className="text-2xl font-bold text-azure-600 dark:text-azure-400">
                70€
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                60€/5 séances • 50€/10 séances
              </p>
            </div>
          </div>

          {/* Coaching Collectif */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Coaching Collectif
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Séance en groupe (max 5)
              </p>
              <div className="text-2xl font-bold text-ocean-600 dark:text-ocean-400">
                25€
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Par personne
              </p>
            </div>
          </div>

          {/* Séance Découverte */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 shadow-lg border-2 border-green-200 dark:border-green-700 hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Séance Découverte
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Première séance d'évaluation
              </p>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                GRATUITE
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Offre limitée
              </p>
            </div>
          </div>
        </motion.div>

        {/* Fillout Booking Form - Full Screen */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-azure-500 to-ocean-500 p-4 text-white">
            <h3 className="text-xl font-bold mb-1">
              📅 Planifiez votre séance
            </h3>
            <p className="text-azure-100 text-sm">
              Sélectionnez vos préférences et trouvez le créneau parfait
            </p>
          </div>
          
          {/* Fillout booking form - No padding for full width */}
          <div className="relative">
            <iframe
              src="https://forms.fillout.com/t/c24LK1RZ97us"
              className="w-full h-[1200px] border-0"
              frameBorder="0"
              title="Réservation de séance avec Gilson Mendes - Coach Sportif Côte d'Azur"
              allowFullScreen
              loading="lazy"
              style={{ 
                minHeight: '1200px',
                overflow: 'hidden'
              }}
            />
          </div>
        </motion.div>

        {/* Contact rapide */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Une question ? Contactez-moi directement :
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/33617043599?text=Bonjour, je souhaite réserver une séance"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              <span className="mr-2">📱</span>
              WhatsApp
            </a>
            <a
              href="tel:+33617043599"
              className="inline-flex items-center px-6 py-3 bg-azure-500 hover:bg-azure-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              <span className="mr-2">📞</span>
              06 17 04 35 99
            </a>
            <a
              href="mailto:gilson.mendes.coach@gmail.com"
              className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              <span className="mr-2">✉️</span>
              Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}