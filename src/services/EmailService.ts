import { ContactFormData } from '@/types/forms';
import { ApiResponse } from '@/types/common';

/**
 * Service d'envoi d'emails utilisant le pattern Strategy
 * Permet de changer facilement le provider (EmailJS, Netlify, API custom)
 */
export interface EmailProvider {
  sendEmail(data: ContactFormData): Promise<ApiResponse>;
}

/**
 * Provider pour EmailJS
 */
export class EmailJSProvider implements EmailProvider {
  private serviceId: string;
  private templateId: string;
  private publicKey: string;

  constructor(serviceId: string, templateId: string, publicKey: string) {
    this.serviceId = serviceId;
    this.templateId = templateId;
    this.publicKey = publicKey;
  }

  async sendEmail(data: ContactFormData): Promise<ApiResponse> {
    try {
      // Simulation EmailJS - remplacer par vraie implémentation
      console.log('Envoi via EmailJS:', data);
      
      // Simule un délai réseau
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simule succès/échec aléatoire pour demo
      const success = Math.random() > 0.2; // 80% de succès
      
      if (success) {
        return {
          success: true,
          message: 'Email envoyé avec succès via EmailJS'
        };
      } else {
        throw new Error('Erreur simulation EmailJS');
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }
}

/**
 * Provider pour Netlify Forms
 */
export class NetlifyFormsProvider implements EmailProvider {
  async sendEmail(data: ContactFormData): Promise<ApiResponse> {
    try {
      const formData = new FormData();
      formData.append('form-name', 'contact');
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Message envoyé avec succès'
        };
      } else {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur d\'envoi'
      };
    }
  }
}

/**
 * Provider pour API custom
 */
export class CustomApiProvider implements EmailProvider {
  private apiEndpoint: string;

  constructor(apiEndpoint: string) {
    this.apiEndpoint = apiEndpoint;
  }

  async sendEmail(data: ContactFormData): Promise<ApiResponse> {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          data: result,
          message: 'Message envoyé avec succès'
        };
      } else {
        throw new Error(result.message || 'Erreur serveur');
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur de connexion'
      };
    }
  }
}

/**
 * Service principal d'email utilisant le pattern Strategy
 */
export class EmailService {
  private static instance: EmailService;
  private provider: EmailProvider;

  private constructor(provider: EmailProvider) {
    this.provider = provider;
  }

  public static getInstance(provider?: EmailProvider): EmailService {
    if (!EmailService.instance) {
      if (!provider) {
        // Provider par défaut - simulation
        provider = new EmailJSProvider('', '', '');
      }
      EmailService.instance = new EmailService(provider);
    }
    return EmailService.instance;
  }

  /**
   * Change le provider d'email (Strategy pattern)
   */
  public setProvider(provider: EmailProvider): void {
    this.provider = provider;
  }

  /**
   * Envoie un email via le provider configuré
   */
  public async sendContactEmail(data: ContactFormData): Promise<ApiResponse> {
    try {
      return await this.provider.sendEmail(data);
    } catch (error) {
      return {
        success: false,
        error: 'Service d\'email temporairement indisponible'
      };
    }
  }

  /**
   * Envoie un email de newsletter
   */
  public async sendNewsletterSubscription(email: string, name?: string): Promise<ApiResponse> {
    const newsletterData: ContactFormData = {
      name: name || 'Nouvel abonné',
      email,
      phone: '',
      service: '',
      message: 'Inscription à la newsletter'
    };

    return this.sendContactEmail(newsletterData);
  }
}