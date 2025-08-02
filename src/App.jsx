import React, { Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppProvider } from '@/context/AppContext';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { commonVariants } from '@/utils/animations';
import { WhatsAppFloat } from '@/components/common/SocialIcons';

// Lazy loading des composants pour améliorer les performances
const Header = React.lazy(() => import('./components/Header'));
const Hero = React.lazy(() => import('./components/Hero'));
const Services = React.lazy(() => import('./components/Services'));
const About = React.lazy(() => import('./components/About'));
const TestimonialsSection = React.lazy(() => import('./components/testimonials/TestimonialsSection'));
const ColorThemePreview = React.lazy(() => import('./components/demo/ColorThemePreview'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));

/**
 * Composant principal de l'application
 * Pattern: Container Component + Error Boundary + Lazy Loading
 */
function App() {
  // Preload des composants critiques
  useEffect(() => {
    // Preload les composants les plus importants
    import('./components/Header');
    import('./components/Hero');
  }, []);

  return (
    <AppProvider>
      <ErrorBoundary>
        <motion.div
          className="min-h-screen bg-white dark:bg-gray-900"
          variants={commonVariants.pageTransition}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Suspense fallback={
            <div className="fixed top-0 left-0 w-full h-20 bg-white dark:bg-gray-900 z-50 flex items-center justify-center">
              <LoadingSpinner size="sm" message="Chargement..." />
            </div>
          }>
            <Header />
          </Suspense>

          <main>
            <ErrorBoundary>
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <LoadingSpinner size="lg" message="Chargement de la page..." />
                </div>
              }>
                <Hero />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={
                <div className="section-padding flex items-center justify-center">
                  <LoadingSpinner message="Chargement des services..." />
                </div>
              }>
                <Services />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={
                <div className="section-padding flex items-center justify-center">
                  <LoadingSpinner message="Chargement des informations..." />
                </div>
              }>
                <About />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={
                <div className="section-padding flex items-center justify-center">
                  <LoadingSpinner message="Chargement des témoignages..." />
                </div>
              }>
                <TestimonialsSection />
              </Suspense>
            </ErrorBoundary>

            {/* Demo: Comparateur de thèmes couleurs */}
            <ErrorBoundary>
              <Suspense fallback={
                <div className="section-padding flex items-center justify-center">
                  <LoadingSpinner message="Chargement du comparateur..." />
                </div>
              }>
                <div className="section-padding bg-white dark:bg-gray-900">
                  <ColorThemePreview />
                </div>
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={
                <div className="section-padding flex items-center justify-center">
                  <LoadingSpinner message="Chargement du formulaire..." />
                </div>
              }>
                <Contact />
              </Suspense>
            </ErrorBoundary>
          </main>

          <ErrorBoundary>
            <Suspense fallback={
              <div className="bg-gray-900 dark:bg-gray-800 text-white p-8 text-center">
                <LoadingSpinner color="white" size="sm" />
              </div>
            }>
              <Footer />
            </Suspense>
                          </ErrorBoundary>

                {/* WhatsApp flottant */}
                <WhatsAppFloat message="Bonjour, je souhaite avoir des informations sur vos services de coaching sportif" />
              </motion.div>
            </ErrorBoundary>
          </AppProvider>
        );
      }

      export default App;