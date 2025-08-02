import { Coach } from '@/types/coach';

/**
 * Données du coach - Pattern Singleton/Configuration
 * Centralise toutes les informations du coach
 */
export const COACH_DATA: Coach = {
  id: 'gm-fitness-coach',
  personalInfo: {
    firstName: 'Guillaume',
    lastName: 'Martin',
    displayName: 'Guillaume Martin',
    bio: 'Coach sportif passionné avec plus de 8 ans d\'expérience dans la transformation physique et mentale. Spécialisé dans l\'accompagnement personnalisé et les résultats durables.',
    philosophy: 'Chaque personne est unique et mérite un accompagnement sur-mesure. Mon approche holistique combine exercice, nutrition et bien-être mental pour des transformations durables.'
  },
  professionalInfo: {
    experience: 8,
    certifications: [
      {
        name: 'BPJEPS AGFF',
        issuedBy: 'Ministère des Sports',
        issuedDate: new Date('2016-06-15'),
        credentialId: 'BPJEPS-2016-GM'
      },
      {
        name: 'CrossFit Level 1',
        issuedBy: 'CrossFit Inc.',
        issuedDate: new Date('2018-03-20'),
        expirationDate: new Date('2026-03-20'),
        credentialId: 'CF-L1-2018-GM'
      },
      {
        name: 'Nutrition Sportive',
        issuedBy: 'CNAM',
        issuedDate: new Date('2019-09-10'),
        credentialId: 'NS-2019-GM'
      }
    ],
    specializations: [
      {
        name: 'Perte de poids',
        description: 'Programmes personnalisés pour une perte de poids saine et durable',
        icon: '⚖️'
      },
      {
        name: 'Prise de masse',
        description: 'Développement musculaire ciblé avec nutrition adaptée',
        icon: '💪'
      },
      {
        name: 'Préparation physique',
        description: 'Entraînement spécialisé pour athlètes et compétiteurs',
        icon: '🏃‍♂️'
      },
      {
        name: 'Rééducation',
        description: 'Accompagnement post-blessure et renforcement préventif',
        icon: '🏥'
      }
    ],
    achievements: [
      {
        title: '200+ clients transformés',
        description: 'Plus de 200 personnes accompagnées vers leurs objectifs',
        date: new Date('2024-01-01'),
        category: 'milestone'
      },
      {
        title: 'Taux de réussite 95%',
        description: '95% de mes clients atteignent leurs objectifs',
        date: new Date('2023-12-31'),
        category: 'milestone'
      },
      {
        title: 'Coach de l\'année 2023',
        description: 'Élu meilleur coach de la région parisienne',
        date: new Date('2023-12-15'),
        category: 'award'
      }
    ]
  },
  contact: {
    phone: '+33 6 XX XX XX XX',
    email: 'contact@gmfitness.fr',
    location: 'Paris & Région Parisienne',
    availability: 'Lundi-Dimanche : 6h-21h'
  },
  socialMedia: {
    instagram: 'https://instagram.com/gmfitness',
    facebook: 'https://facebook.com/gmfitness',
    youtube: 'https://youtube.com/@gmfitness'
  },
  statistics: {
    clientsTransformed: 200,
    yearsExperience: 8,
    successRate: 95,
    sessionsCompleted: 2500
  }
};