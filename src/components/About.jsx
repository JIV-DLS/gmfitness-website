import { motion } from "framer-motion";
import { useI18n } from '@/hooks/useI18n';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const About = () => {
  const { t } = useI18n();

  const achievements = [
    { 
      Icon: EmojiEventsIcon,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      titleKey: "about.achievements.certifications.title",
      itemsKeys: [
        "about.achievements.certifications.items.0",
        "about.achievements.certifications.items.1", 
        "about.achievements.certifications.items.2"
      ]
    },
    { 
      Icon: TrackChangesIcon,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      titleKey: "about.achievements.specializations.title",
      itemsKeys: [
        "about.achievements.specializations.items.0",
        "about.achievements.specializations.items.1",
        "about.achievements.specializations.items.2",
        "about.achievements.specializations.items.3"
      ]
    },
    { 
      Icon: FitnessCenterIcon,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      titleKey: "about.achievements.philosophy.title",
      itemsKeys: [
        "about.achievements.philosophy.items.0",
        "about.achievements.philosophy.items.1",
        "about.achievements.philosophy.items.2"
      ]
    }
  ];

  return (
    <section 
      id="about" 
      className="section-padding py-20 relative overflow-hidden"
      style={{
        backgroundImage: "url('/coach_gilson_photo_de_cote.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay pour la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/60 dark:from-gray-900/95 dark:via-gray-900/85 dark:to-gray-900/60"></div>
      
      <div className="container-max relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('about.title', 'À Propos de')} <span className="text-primary-600 dark:text-primary-400">
                {t('about.titleHighlight', 'Moi')}
              </span>
            </h2>
            
            {/* Photo du coach en médaillon */}
            <motion.div
              className="mb-8 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative w-32 h-32 mx-auto lg:mx-0 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700">
                <img
                  src="/coach_gilson_photo_de_face.png"
                  alt="Gilson Mendes - Coach Sportif"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                {t('about.bio.p1', 'Coach sportif diplômé, basé sur la Côte d\'Azur. Ancien sportif de haut niveau, je vous accompagne avec une approche holistique.')}
              </p>
              
              <p>
                {t('about.bio.p2', 'Coach sportif diplômé, passionné par la transformation physique et le bien-être. Ancien sportif de haut niveau, animé par la discipline, le goût de l\'effort et la recherche de progression, j\'ai choisi de mettre mon expérience et mes compétences au service de celles et ceux qui veulent se sentir mieux dans leur corps.')}
              </p>
              
              <p>
                {t('about.bio.p3', 'Mon approche : holistique et personnalisée, elle combine renforcement musculaire, gestion des émotions et coaching mental pour une transformation durable. Chaque personne est unique et mérite un accompagnement sur mesure. Que vous souhaitiez perdre du poids, gagner en muscle ou simplement retrouver un meilleur équilibre physique, nous définirons ensemble la méthode qui vous correspond.')}
              </p>
            </div>

            <motion.div
              className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {t('about.name', 'Gilson Mendes')}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('about.role', 'Coach Sportif')}
                </div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {t('about.location', 'Côte d\'Azur')}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('about.location_full', 'Côte d\'Azur & Alentours')}
                </div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {t('about.availability', '7j/7')}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('about.hours', 'Sur RDV')}
                </div>
              </div>
            </motion.div>

            <motion.a
              href="#contact"
              className="btn-primary inline-block mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {t('about.cta', 'Commençons Ensemble')}
            </motion.a>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid gap-6">
              {achievements.map((achievement, index) => {
                const { Icon } = achievement;
                return (
                  <motion.div
                    key={index}
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-full ${achievement.bgColor}`}>
                        <Icon className={`text-2xl ${achievement.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          {t(achievement.titleKey)}
                        </h3>
                        <ul className="space-y-2">
                          {achievement.itemsKeys.map((itemKey, idx) => (
                            <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                              <span className="text-primary-500 dark:text-primary-400 mr-2 text-sm">✓</span>
                              <span className="text-sm">{t(itemKey)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;