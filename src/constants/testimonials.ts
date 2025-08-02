import { Testimonial, CoachingVideo } from '@/types/testimonials';

/**
 * Données d'exemple pour les témoignages
 * À remplacer par les vraies données Firebase
 */
export const SAMPLE_TESTIMONIALS: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    clientName: 'Sarah Martin',
    clientAge: 28,
    clientLocation: 'Paris',
    rating: 5,
    title: 'Une transformation incroyable en 3 mois !',
    content: 'J\'ai toujours eu du mal avec le sport, mais Guillaume a su adapter son approche à ma personnalité. Ses conseils en nutrition ont été un game-changer. Je me sens enfin bien dans mon corps et j\'ai retrouvé confiance en moi. Les séances sont variées et jamais ennuyeuses !',
    type: 'before_after',
    isVerified: true,
    isPublic: true,
    featured: true,
    tags: ['perte de poids', 'confiance en soi', 'nutrition', 'motivation'],
    serviceType: 'Coaching Personnel',
    duration: '3 mois',
    testimonialDate: new Date('2024-01-15'),
    publishedAt: new Date('2024-01-20'),
    beforeAfterImages: {
      before: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
      after: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=600&fit=crop',
      caption: 'Transformation impressionnante de Sarah',
      timeBetween: '3 mois d\'écart'
    },
    results: {
      weightLoss: 12,
      bodyFatReduction: 8,
      fitnessGoals: ['Perte de poids', 'Tonification', 'Endurance'],
      personalAchievements: ['Premier 10km', 'Confiance retrouvée', 'Nouvelles habitudes alimentaires'],
      measurements: {
        waist: { before: 85, after: 75 },
        hips: { before: 102, after: 95 }
      }
    }
  },
  
  {
    clientName: 'Thomas Dubois',
    clientAge: 35,
    clientLocation: 'Boulogne',
    rating: 5,
    title: 'Un suivi exceptionnel pour ma préparation marathon',
    content: 'Guillaume m\'a accompagné dans ma préparation pour le marathon de Paris. Son expertise en préparation physique et ses conseils personnalisés m\'ont permis de battre mon record personnel de plus de 10 minutes ! Approche professionnelle et résultats au rendez-vous.',
    type: 'video',
    isVerified: true,
    isPublic: true,
    featured: true,
    tags: ['marathon', 'préparation physique', 'performance', 'endurance'],
    serviceType: 'Coaching Personnel',
    duration: '4 mois',
    testimonialDate: new Date('2024-02-10'),
    publishedAt: new Date('2024-02-12'),
    videoTestimonial: {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=320&h=180&fit=crop',
      duration: 120,
      platform: 'firebase',
      videoId: 'thomas-marathon-testimonial',
      transcript: 'Salut ! Je m\'appelle Thomas et j\'ai travaillé avec Guillaume pour préparer le marathon de Paris. Grâce à son programme personnalisé et ses conseils nutritionnels, j\'ai réussi à améliorer mon temps de plus de 10 minutes. Je recommande vivement !'
    },
    results: {
      personalAchievements: ['Marathon en 3h42', 'Record personnel battu', 'Zéro blessure'],
      fitnessGoals: ['Endurance', 'Vitesse', 'Récupération']
    }
  },
  
  {
    clientName: 'Marie Lefebvre',
    clientAge: 42,
    clientLocation: 'Versailles',
    rating: 5,
    title: 'Retrouver la forme après 40 ans, c\'est possible !',
    content: 'Après deux grossesses et des années sédentaires, je pensais qu\'il était trop tard pour me remettre en forme. Guillaume m\'a prouvé le contraire ! Son approche bienveillante et progressive m\'a permis de retrouver une condition physique que je n\'avais plus depuis mes 20 ans.',
    type: 'mixed',
    isVerified: true,
    isPublic: true,
    featured: false,
    tags: ['remise en forme', 'post-grossesse', 'motivation', 'progression'],
    serviceType: 'Coaching Collectif',
    duration: '6 mois',
    testimonialDate: new Date('2024-01-25'),
    publishedAt: new Date('2024-01-28'),
    clientPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    beforeAfterImages: {
      before: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
      after: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=600&fit=crop',
      caption: 'Marie a retrouvé sa forme d\'avant',
      timeBetween: '6 mois de travail régulier'
    },
    results: {
      weightLoss: 8,
      muscleGain: 2,
      fitnessGoals: ['Remise en forme', 'Tonus musculaire', 'Bien-être'],
      personalAchievements: ['Première course 5km', 'Énergie retrouvée', 'Meilleur sommeil']
    }
  },
  
  {
    clientName: 'Kevin Moreau',
    clientAge: 24,
    clientLocation: 'Neuilly',
    rating: 4,
    title: 'Prise de masse réussie avec des conseils sur-mesure',
    content: 'J\'étais très maigre et je n\'arrivais pas à prendre du muscle malgré mes efforts. Guillaume a analysé mon cas et créé un programme nutrition + training parfaitement adapté. En 5 mois j\'ai pris 8kg de muscle de qualité !',
    type: 'text',
    isVerified: true,
    isPublic: true,
    featured: false,
    tags: ['prise de masse', 'nutrition', 'musculation', 'gains'],
    serviceType: 'Coaching en Ligne',
    duration: '5 mois',
    testimonialDate: new Date('2024-02-20'),
    results: {
      muscleGain: 8,
      fitnessGoals: ['Prise de masse', 'Force', 'Définition'],
      personalAchievements: ['Objectif poids atteint', 'Nouvelle garde-robe', 'Confiance au gym'],
      measurements: {
        chest: { before: 92, after: 104 },
        arms: { before: 28, after: 34 }
      }
    }
  },
  
  {
    clientName: 'Isabelle Garnier',
    clientAge: 38,
    clientLocation: 'Saint-Cloud',
    rating: 5,
    title: 'Un coaching nutrition qui a changé ma vie',
    content: 'Je ne savais plus quoi manger pour perdre du poids sainement. Guillaume m\'a appris à comprendre mon corps et à adopter une alimentation équilibrée sans frustration. J\'ai perdu 15kg en douceur et surtout, j\'ai acquis de bonnes habitudes pour la vie.',
    type: 'text',
    isVerified: true,
    isPublic: true,
    featured: false,
    tags: ['nutrition', 'perte de poids', 'habitudes saines', 'équilibre'],
    serviceType: 'Coaching Nutrition',
    duration: '4 mois',
    testimonialDate: new Date('2024-01-08'),
    clientPhoto: 'https://images.unsplash.com/photo-1494790108755-2616c3584210?w=100&h=100&fit=crop&crop=face',
    results: {
      weightLoss: 15,
      bodyFatReduction: 12,
      fitnessGoals: ['Perte de poids durable', 'Éducation nutritionnelle', 'Bien-être'],
      personalAchievements: ['Objectif atteint', 'Stabilité du poids', 'Nouvelle relation à la nourriture']
    }
  },
  
  {
    clientName: 'Alexandre Chen',
    clientAge: 29,
    clientLocation: 'La Défense',
    rating: 5,
    title: 'Coaching en ligne efficace malgré la distance',
    content: 'Travaillant en déplacement constant, j\'avais besoin d\'un coaching flexible. Le programme en ligne de Guillaume s\'adapte parfaitement à mon rythme. Suivi régulier par vidéo, programmes adaptés selon les équipements disponibles. Résultats visibles en quelques semaines !',
    type: 'video',
    isVerified: true,
    isPublic: true,
    featured: false,
    tags: ['coaching en ligne', 'flexibilité', 'professionnel', 'adaptation'],
    serviceType: 'Coaching en Ligne',
    duration: '3 mois',
    testimonialDate: new Date('2024-02-15'),
    videoTestimonial: {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=320&h=180&fit=crop&crop=face',
      duration: 90,
      platform: 'firebase',
      videoId: 'alexandre-online-coaching'
    },
    results: {
      weightLoss: 6,
      muscleGain: 3,
      fitnessGoals: ['Flexibilité', 'Forme physique', 'Endurance'],
      personalAchievements: ['Routine stable', 'Meilleure énergie', 'Gestion du stress']
    }
  }
];

/**
 * Vidéos de coaching d'exemple
 */
export const SAMPLE_COACHING_VIDEOS: Omit<CoachingVideo, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes'>[] = [
  {
    title: 'Échauffement dynamique 10 minutes',
    description: 'Routine d\'échauffement complète pour préparer votre corps à l\'entraînement. Parfait avant toute séance de sport.',
    category: 'workout',
    tags: ['échauffement', 'préparation', 'mobilité', 'activation'],
    video: {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=320&h=180&fit=crop',
      duration: 600, // 10 minutes
      platform: 'firebase',
      videoId: 'echauffement-dynamique-10min'
    },
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=320&h=180&fit=crop',
    difficulty: 'beginner',
    duration: 10,
    equipment: ['Aucun équipement nécessaire'],
    targetMuscles: ['Corps entier', 'Mobilité articulaire'],
    isPublic: true,
    isPremium: false,
    publishedAt: new Date('2024-01-10')
  },
  
  {
    title: 'HIIT Brûle-graisse 20 minutes',
    description: 'Entraînement HIIT intense pour brûler un maximum de calories en un minimum de temps. Idéal pour perdre du poids efficacement.',
    category: 'workout',
    tags: ['HIIT', 'cardio', 'brûle-graisse', 'haute intensité'],
    video: {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=320&h=180&fit=crop',
      duration: 1200, // 20 minutes
      platform: 'firebase',
      videoId: 'hiit-brule-graisse-20min'
    },
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=320&h=180&fit=crop',
    difficulty: 'intermediate',
    duration: 20,
    equipment: ['Tapis de sol'],
    targetMuscles: ['Corps entier', 'Cardio'],
    isPublic: true,
    isPremium: false,
    publishedAt: new Date('2024-01-15')
  },
  
  {
    title: 'Les 5 erreurs nutrition les plus communes',
    description: 'Découvrez les erreurs nutritionnelles que font 90% des personnes qui veulent perdre du poids et comment les éviter.',
    category: 'nutrition',
    tags: ['nutrition', 'erreurs', 'conseils', 'perte de poids'],
    video: {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=320&h=180&fit=crop',
      duration: 900, // 15 minutes
      platform: 'firebase',
      videoId: 'erreurs-nutrition-communes'
    },
    thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=320&h=180&fit=crop',
    difficulty: 'beginner',
    duration: 15,
    isPublic: true,
    isPremium: false,
    publishedAt: new Date('2024-01-20')
  },
  
  {
    title: 'Motivation : Comment rester constant ?',
    description: 'Les secrets psychologiques pour maintenir sa motivation sur le long terme et atteindre ses objectifs fitness.',
    category: 'motivation',
    tags: ['motivation', 'psychologie', 'habitudes', 'constance'],
    video: {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=320&h=180&fit=crop',
      duration: 1080, // 18 minutes
      platform: 'firebase',
      videoId: 'motivation-rester-constant'
    },
    thumbnail: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=320&h=180&fit=crop',
    difficulty: 'beginner',
    duration: 18,
    isPublic: true,
    isPremium: false,
    publishedAt: new Date('2024-01-25')
  }
];

/**
 * Tags les plus populaires pour l'autocomplete
 */
export const POPULAR_TAGS = [
  'perte de poids',
  'prise de masse',
  'nutrition',
  'motivation',
  'musculation',
  'cardio',
  'endurance',
  'force',
  'flexibilité',
  'bien-être',
  'confiance en soi',
  'habitudes saines',
  'transformation',
  'résultats',
  'coaching personnalisé'
];

/**
 * Types de services disponibles
 */
export const SERVICE_TYPES = [
  'Coaching Personnel',
  'Coaching Collectif',
  'Coaching en Ligne',
  'Coaching Nutrition',
  'Préparation Physique',
  'Rééducation Sportive'
];