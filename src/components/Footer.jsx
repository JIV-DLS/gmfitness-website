import { motion } from "framer-motion";
import { useI18n } from '@/hooks/useI18n';
import { SocialIcons } from '@/components/common/SocialIcons';

const Footer = () => {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Coaching Personnel", href: "#services" },
      { name: "Coaching Collectif", href: "#services" },
      { name: "Coaching en Ligne", href: "#services" },
      { name: "Coaching Nutrition", href: "#services" }
    ],
    company: [
      { name: "À Propos", href: "#about" },
      { name: "Services", href: "#services" },
      { name: "Contact", href: "#contact" },
      { name: "Témoignages", href: "#" }
    ],
    legal: [
      { name: "Mentions Légales", href: "#" },
      { name: "Conditions Générales", href: "#" },
      { name: "Politique de Confidentialité", href: "#" },
      { name: "Cookies", href: "#" }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-azure-900 via-ocean-900 to-azure-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-primary-400 mb-4">
                  GM FITNESS
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Votre coach sportif professionnel pour une transformation durable. 
                  Ensemble, atteignons vos objectifs de forme et de bien-être.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="mr-3 text-primary-400">📍</span>
                  <span>Cannes & Côte d'Azur</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="mr-3 text-primary-400">📞</span>
                  <span>+33 6 XX XX XX XX</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="mr-3 text-primary-400">✉️</span>
                  <span>contact@gmfitness.fr</span>
                </div>
              </div>
            </motion.div>

            {/* Services Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold mb-6 text-white">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors text-sm"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold mb-6 text-white">Navigation</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors text-sm"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter & Social */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-4 lg:col-span-1"
            >
              <h4 className="text-lg font-semibold mb-6 text-white">Restez Connecté</h4>
              
              <div className="mb-6">
                <p className="text-gray-300 mb-4 text-sm">
                  Recevez mes conseils fitness et nutrition chaque semaine
                </p>
                <div className="flex max-w-xs w-full">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-primary-500 text-sm min-w-0"
                  />
                  <motion.button
                    className="bg-primary-600 hover:bg-primary-700 px-3 py-2 rounded-r-lg transition-colors text-sm font-medium flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    OK
                  </motion.button>
                </div>
              </div>

                              <div>
                <p className="text-gray-300 mb-4 text-sm">Suivez-nous</p>
                <SocialIcons 
                  platforms={['facebook', 'instagram', 'twitter', 'whatsapp', 'youtube']}
                  variant="footer"
                  showLabels={false}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Footer */}
        <motion.div
          className="border-t border-azure-700/30 py-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="text-sm text-gray-300">
              © {currentYear} GM Fitness. Tous droits réservés.
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {footerLinks.legal.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="text-gray-300 hover:text-primary-400 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <motion.a
              href="#accueil"
              className="inline-flex items-center text-primary-500 hover:text-primary-400 transition-colors"
              whileHover={{ y: -5 }}
            >
              <span className="mr-2">↑</span>
              Retour en haut
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;