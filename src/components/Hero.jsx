import { motion } from "framer-motion";
import { useI18n } from '@/hooks/useI18n';

const Hero = () => {
  const { t } = useI18n();

  return (
    <section 
      id="accueil" 
      className="section-padding pt-32 relative overflow-hidden"
      style={{
        backgroundImage: "url('/coach_gilson_photo_yoga.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay léger pour améliorer la lisibilité sans cacher le coach */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40 dark:from-black/60 dark:via-black/30 dark:to-black/60"></div>
      <div className="container-max relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl lg:text-6xl font-bold text-white mb-6"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {t('hero.title', 'Transformez Votre')}{" "}
              <span className="text-azure-300">
                {t('hero.titleHighlight', 'Corps')}
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-white mb-8 leading-relaxed"
              style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t('hero.subtitle', 'Coach sportif professionnel avec 8+ ans d\'expérience. Coaching personnalisé, programmes sur-mesure et suivi nutritionnel pour atteindre vos objectifs rapidement.')}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.a
                href="#contact"
                className="btn-primary text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.cta.primary', 'Commencer Maintenant')}
              </motion.a>
              
              <motion.a
                href="#services"
                className="btn-secondary text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.cta.secondary', 'Découvrir les Services')}
              </motion.a>
            </motion.div>


          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative z-10">
              <motion.div
                className="bg-primary-600/80 dark:bg-primary-500/80 backdrop-blur-md rounded-xl p-6 text-white shadow-lg border border-white/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-3">
                  {t('hero.freeSession.title', 'Séance Découverte Gratuite')}
                </h3>
                <p className="mb-4 text-sm">
                  {t('hero.freeSession.description', 'Évaluation complète, plan d\'entraînement personnalisé et conseils nutrition.')}
                </p>
                <motion.a
                  href="#contact"
                  className="bg-white/90 dark:bg-gray-100/90 text-primary-600 dark:text-primary-700 font-semibold py-2 px-4 rounded-lg hover:bg-white dark:hover:bg-gray-100 transition-colors block text-center text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('hero.freeSession.cta', 'Réserver Maintenant')}
                </motion.a>
              </motion.div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-300 dark:from-primary-800 dark:to-primary-700 rounded-2xl transform rotate-3 scale-105 opacity-20"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;