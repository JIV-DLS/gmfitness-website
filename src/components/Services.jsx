import { motion } from "framer-motion";
import { useI18n } from '@/hooks/useI18n';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import StarIcon from '@mui/icons-material/Star';

const Services = () => {
  const { t } = useI18n();

  const services = [
    {
      Icon: FitnessCenterIcon,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      titleKey: "services.items.personal.title",
      descriptionKey: "services.items.personal.description",
      featuresKeys: [
        "services.items.personal.features.custom",
        "services.items.personal.features.psychology",
        "services.items.personal.features.mobility",
        "services.items.personal.features.mindfulness"
      ],
      priceKey: "services.items.personal.price",
      pricesKeys: [
        "services.items.personal.prices.single",
        "services.items.personal.prices.pack5",
        "services.items.personal.prices.pack10"
      ]
    },
    {
      Icon: GroupIcon,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      titleKey: "services.items.group.title",
      descriptionKey: "services.items.group.description",
      featuresKeys: [
        "services.items.group.features.small",
        "services.items.group.features.quality",
        "services.items.group.features.affordable",
        "services.items.group.features.motivation"
      ],
      priceKey: "services.items.group.price"
    },
    {
      Icon: HomeIcon,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      titleKey: "services.items.online.title",
      descriptionKey: "services.items.online.description",
      featuresKeys: [
        "services.items.online.features.videos",
        "services.items.online.features.plans",
        "services.items.online.features.support",
        "services.items.online.features.flexible"
      ],
      priceKey: "services.items.online.price"
    },
    {
      Icon: BusinessIcon,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      titleKey: "services.items.corporate.title",
      descriptionKey: "services.items.corporate.description",
      featuresKeys: [
        "services.items.corporate.features.corporate",
        "services.items.corporate.features.associations",
        "services.items.corporate.features.seniors",
        "services.items.corporate.features.wellbeing"
      ],
      priceKey: "services.items.corporate.price"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="services" className="section-padding bg-white/90 dark:bg-azure-900/90 backdrop-blur-sm">
      <div className="container-max">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('services.title', 'Mes')} <span className="text-primary-600 dark:text-primary-400">
              {t('services.titleHighlight', 'Services')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('services.subtitle', 'Des solutions adaptées à tous les besoins et tous les budgets pour vous accompagner vers vos objectifs de forme et de bien-être.')}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const { Icon } = service;
            return (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-center mb-6">
                  <div className={`mb-4 flex justify-center p-4 rounded-full ${service.bgColor} w-fit mx-auto`}>
                    <Icon className={`text-4xl ${service.color}`} />
                  </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {t(service.titleKey)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t(service.descriptionKey)}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {service.featuresKeys.map((featureKey, idx) => (
                  <div key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="text-green-500 dark:text-green-400 mr-3">✓</span>
                    <span className="text-sm">{t(featureKey)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-600 pt-6 text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                  {t(service.priceKey)}
                </div>
                {service.pricesKeys && (
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-4 space-y-1">
                    {service.pricesKeys.map((priceTierKey, idx) => (
                      <div key={idx}>{t(priceTierKey)}</div>
                    ))}
                  </div>
                )}
                <motion.button
                  className="btn-primary w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('services.choose', 'Choisir ce service')}
                </motion.button>
              </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Galerie d'images d'entraînement collectif */}
        <motion.div
          className="mt-16 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
            <StarIcon className="text-4xl text-yellow-500" />
            L'esprit d'équipe avant tout
          </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Découvrez l'ambiance de mes séances collectives : bienveillance, motivation et dépassement de soi dans un cadre exceptionnel.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              className="relative rounded-xl overflow-hidden shadow-lg group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/entrainement_collectif_assis_en_cercle_rond_face_a_la_plage.png"
                alt="Séance collective en cercle face à la plage"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Séances en plein air</p>
                  <p className="text-sm opacity-90">Ambiance unique face à la mer</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative rounded-xl overflow-hidden shadow-lg group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/entrainement_collectif_femme_tirant_sur_un_elastic.png"
                alt="Entraînement avec élastiques"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Entraînement fonctionnel</p>
                  <p className="text-sm opacity-90">Équipements variés et adaptés</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative rounded-xl overflow-hidden shadow-lg group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/phto_du_coach_discutant_avec_un_client_temoignant.png"
                alt="Discussion coach-client"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Accompagnement personnalisé</p>
                  <p className="text-sm opacity-90">Écoute et conseils adaptés</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 text-center bg-gray-50 dark:bg-gray-700 rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('services.unsure.title', 'Pas sûr du service qui vous convient ?')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t('services.unsure.subtitle', 'Discutons de vos objectifs lors d\'un appel gratuit de 15 minutes')}
          </p>
          <motion.a
            href="#contact"
            className="btn-secondary inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('services.unsure.cta', 'Appel Gratuit')}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;