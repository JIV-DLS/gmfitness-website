/**
 * Composant de partage social optimisé
 * Permet partage de contenu avec templates pré-remplis
 */

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaWhatsapp,
  FaLinkedinIn,
  FaShare
} from 'react-icons/fa';
import { useFacebookPixel } from '../../hooks/useFacebookPixel';

/**
 * Hook pour génération d'URLs de partage
 */
export const useShareUrls = () => {
  const baseUrl = 'https://jonasvihoaleaniglo.github.io/gmfitness-website';
  
  const generateShareUrl = (platform, options = {}) => {
    const {
      url = baseUrl,
      title = 'GML Fitness - Coach Sportif Côte d\'Azur',
      text = 'Découvrez Gilson Mendes, coach sportif professionnel sur la Côte d\'Azur ! Coaching individuel, collectif et programmes en ligne. 💪',
      hashtags = ['GMLFitness', 'CoachSportif', 'CotedAzur', 'Fitness', 'Transformation'],
      via = 'gilsonmendes_coach'
    } = options;

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedText = encodeURIComponent(text);
    const hashtagsStr = hashtags.map(tag => `#${tag}`).join(' ');

    switch (platform) {
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
      
      case 'twitter':
        return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}&hashtags=${hashtags.join(',')}&via=${via}`;
      
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedText}`;
      
      case 'whatsapp':
        return `https://wa.me/?text=${encodedText} ${encodedUrl}`;
      
      case 'telegram':
        return `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
      
      case 'email':
        const subject = encodeURIComponent(`🏋️ ${title}`);
        const body = encodeURIComponent(`${text}\n\n👉 ${url}\n\n${hashtagsStr}`);
        return `mailto:?subject=${subject}&body=${body}`;
      
      case 'copy':
        return url;
      
      default:
        return url;
    }
  };

  // Templates spécialisés pour différents contenus
  const templates = {
    // Partage général du site
    general: (platform) => generateShareUrl(platform),
    
    // Partage transformation client
    transformation: (platform, clientName = 'un client') => generateShareUrl(platform, {
      title: `🔥 Transformation réussie avec GML Fitness !`,
      text: `💪 Félicitations à ${clientName} pour sa transformation incroyable avec Gilson Mendes ! Un coach exceptionnel sur la Côte d'Azur qui obtient de vrais résultats.`,
      hashtags: ['Transformation', 'GMLFitness', 'ResultatsProuves', 'CoachSportif', 'Success']
    }),
    
    // Partage service spécifique
    service: (platform, serviceName = 'Coaching Individuel') => generateShareUrl(platform, {
      title: `🎯 ${serviceName} - GML Fitness`,
      text: `Découvrez le ${serviceName} avec Gilson Mendes ! Approche holistique et résultats garantis sur la Côte d'Azur.`,
      hashtags: ['CoachingPersonnalise', 'GMLFitness', 'CotedAzur', 'Fitness']
    }),
    
    // Partage offre spéciale
    offer: (platform, offerText = 'Séance découverte gratuite') => generateShareUrl(platform, {
      title: `🎁 ${offerText} - GML Fitness`,
      text: `🔥 Offre spéciale : ${offerText} avec Gilson Mendes ! Ne ratez pas cette opportunité de découvrir un coaching de qualité sur la Côte d'Azur.`,
      hashtags: ['OffreSpeciale', 'GMLFitness', 'SeanceGratuite', 'CoachSportif']
    }),
    
    // Partage témoignage
    testimonial: (platform, rating = 5) => generateShareUrl(platform, {
      title: `⭐ Avis ${rating}/5 étoiles - GML Fitness`,
      text: `${Array(rating).fill('⭐').join('')} Un coach exceptionnel ! Gilson Mendes m'a aidé à atteindre mes objectifs. Je recommande vivement !`,
      hashtags: ['Avis5Etoiles', 'GMLFitness', 'Recommande', 'CoachExceptionnel']
    }),

    // Partage vidéo YouTube
    video: (platform, videoTitle = 'Séance de coaching') => generateShareUrl(platform, {
      title: `🎥 ${videoTitle} - GML Fitness`,
      text: `🎥 Découvrez cette vidéo : "${videoTitle}" avec Gilson Mendes ! Des conseils de pro pour votre forme physique.`,
      hashtags: ['VideoFitness', 'GMLFitness', 'ConseilsPro', 'CoachSportif']
    })
  };

  return { generateShareUrl, templates };
};

/**
 * Composant bouton de partage simple
 */
export const ShareButton = ({ 
  platform = 'facebook',
  template = 'general',
  templateData = {},
  variant = 'default', // 'default', 'minimal', 'text'
  size = 'md', // 'sm', 'md', 'lg'
  className = '',
  children
}) => {
  const { templates } = useShareUrls();
  const { events: fbEvents } = useFacebookPixel();

  const platformConfig = {
    facebook: { icon: FaFacebookF, color: 'bg-blue-600 hover:bg-blue-700', label: 'Facebook' },
    twitter: { icon: FaTwitter, color: 'bg-blue-400 hover:bg-blue-500', label: 'Twitter' },
    linkedin: { icon: FaLinkedinIn, color: 'bg-blue-700 hover:bg-blue-800', label: 'LinkedIn' },
    whatsapp: { icon: FaWhatsapp, color: 'bg-green-500 hover:bg-green-600', label: 'WhatsApp' },
    email: { icon: FaShare, color: 'bg-gray-600 hover:bg-gray-700', label: 'Email' },
    copy: { icon: FaShare, color: 'bg-gray-500 hover:bg-gray-600', label: 'Copier' }
  };

  const config = platformConfig[platform] || platformConfig.facebook;
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base', 
    lg: 'w-12 h-12 text-lg'
  };

  const handleShare = () => {
    const shareUrl = templates[template](platform, templateData);
    
    // Track partage social
    fbEvents.trackEvent('SocialShare', {
      platform: platform,
      template: template,
      content_name: templateData.serviceName || templateData.videoTitle || 'General'
    });

    if (platform === 'copy') {
      // Copier dans le presse-papier
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl);
        // TODO: Afficher notification "Lien copié"
        console.log('🔗 Lien copié dans le presse-papier');
      }
    } else {
      // Ouvrir popup de partage
      const popup = window.open(
        shareUrl,
        'share',
        'width=600,height=400,scrollbars=yes,resizable=yes'
      );
      
      // Focus sur la popup
      if (popup) popup.focus();
    }
  };

  if (variant === 'minimal') {
    return (
      <motion.button
        onClick={handleShare}
        className={`${sizeClasses[size]} ${config.color} text-white rounded-full flex items-center justify-center transition-colors duration-200 ${className}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={`Partager sur ${config.label}`}
      >
        <IconComponent />
      </motion.button>
    );
  }

  if (variant === 'text') {
    return (
      <motion.button
        onClick={handleShare}
        className={`px-4 py-2 ${config.color} text-white rounded-lg flex items-center space-x-2 transition-colors duration-200 ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <IconComponent className="text-sm" />
        <span>{children || `Partager sur ${config.label}`}</span>
      </motion.button>
    );
  }

  // Variant par défaut
  return (
    <motion.button
      onClick={handleShare}
      className={`${sizeClasses[size]} ${config.color} text-white rounded-lg flex items-center justify-center transition-colors duration-200 shadow-md hover:shadow-lg ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={`Partager sur ${config.label}`}
    >
      <IconComponent />
    </motion.button>
  );
};

/**
 * Composant barre de partage complète
 */
export const ShareBar = ({ 
  template = 'general',
  templateData = {},
  platforms = ['facebook', 'whatsapp', 'twitter', 'copy'],
  title = "Partager",
  variant = 'default',
  className = ''
}) => {
  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      {title && (
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {title}
        </h4>
      )}
      <div className="flex space-x-2">
        {platforms.map((platform) => (
          <ShareButton
            key={platform}
            platform={platform}
            template={template}
            templateData={templateData}
            variant={variant}
            size="md"
          />
        ))}
      </div>
    </div>
  );
};

export default ShareButton;