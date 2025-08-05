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
              className="w-full h-[1300px] border-0"
              frameBorder="0"
              title="Réservation de séance avec Gilson Mendes - Coach Sportif Côte d'Azur"
              allowFullScreen
              loading="lazy"
              style={{ 
                minHeight: '1300px',
                overflow: 'hidden'
              }}
            />
          </div>
        </motion.div>

        {/* Questions fréquentes */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Questions fréquentes ? Contactez-moi en 1 clic ! 💬
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Cliquez sur votre question pour m'envoyer un message pré-rédigé via WhatsApp ou Email
            </p>
          </div>

          {/* Questions grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {/* Tarifs */}
            <motion.a
              href="https://wa.me/33617043599?text=Bonjour Gilson ! J'aimerais connaître vos tarifs pour les séances de coaching individuel. Avez-vous des forfaits avantageux ? Merci !"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-400 transition-all duration-300 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">💰</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    Quels sont vos tarifs ?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Tarifs séances individuelles, forfaits, réductions...
                  </p>
                </div>
              </div>
            </motion.a>

            {/* Disponibilités */}
            <motion.a
              href="https://wa.me/33617043599?text=Bonjour ! J'aimerais connaître vos créneaux disponibles pour des séances de coaching. Je suis plutôt libre le matin/midi/soir. Merci !"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-400 transition-all duration-300 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📅</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    Quelles sont vos disponibilités ?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Créneaux libres, horaires, planning...
                  </p>
                </div>
              </div>
            </motion.a>

            {/* Séances à domicile */}
            <motion.a
              href="https://wa.me/33617043599?text=Bonjour ! Je souhaiterais des séances de coaching à mon domicile. Vous déplacez-vous dans ma zone ? Je suis à [votre ville]. Merci !"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-400 transition-all duration-300 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🏠</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    Séances à domicile possibles ?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Zone de déplacement, équipements, tarifs...
                  </p>
                </div>
              </div>
            </motion.a>

            {/* Programme personnalisé */}
            <motion.a
              href="mailto:gilson.mendes@gmail.com?subject=Demande de programme personnalisé&body=Bonjour Gilson,%0D%0A%0D%0AJe souhaiterais obtenir plus d'informations sur vos programmes personnalisés de coaching.%0D%0A%0D%0AMes objectifs : [perte de poids / prise de muscle / remise en forme / autre]%0D%0AMon niveau actuel : [débutant / intermédiaire / confirmé]%0D%0AMa disponibilité : [nombre de séances par semaine souhaitées]%0D%0A%0D%0APourriez-vous me proposer un programme adapté ?%0D%0A%0D%0AMerci !%0D%0A"
              className="p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📋</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Programme personnalisé ?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Objectifs, durée, fréquence des séances...
                  </p>
                </div>
              </div>
            </motion.a>

            {/* Première séance */}
            <motion.a
              href="https://wa.me/33617043599?text=Bonjour ! Je suis intéressé(e) par votre séance découverte GRATUITE. Comment ça se passe concrètement ? Quand pourrait-on faire ça ? 😊"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-400 transition-all duration-300 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🎁</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    Comment marche la séance gratuite ?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Déroulement, durée, lieu, à apporter...
                  </p>
                </div>
              </div>
            </motion.a>

            {/* Équipements */}
            <motion.a
              href="mailto:gilson.mendes@gmail.com?subject=Question sur les équipements&body=Bonjour Gilson,%0D%0A%0D%0AJ'ai une question concernant les équipements pour les séances de coaching :%0D%0A%0D%0A- Fournissez-vous tout le matériel nécessaire ?%0D%0A- Que dois-je prévoir de mon côté ?%0D%0A- Pour les séances à domicile, amenez-vous tout ?%0D%0A%0D%0AMerci pour ces précisions !%0D%0A"
              className="p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🏋️</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Équipements fournis ?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Matériel inclus, à prévoir, transport...
                  </p>
                </div>
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* Contact rapide */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Ou contactez-moi directement :
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
              href="mailto:gilson.mendes@gmail.com"
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