import React, { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';

/**
 * Composant de réservation de séances
 * Version JavaScript simplifiée
 */
export const BookingCalendar = memo(({
  className = '',
  coachId = 'coach-gm',
  onBookingSuccess
}) => {
  const { t } = useI18n();
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, success, error

  // Services disponibles
  const services = [
    {
      id: 'personal',
      name: 'Coaching Personnel',
      duration: 60,
      price: 80,
      description: 'Séance individuelle personnalisée'
    },
    {
      id: 'duo',
      name: 'Coaching Duo',
      duration: 60,
      price: 120,
      description: 'Séance pour 2 personnes'
    },
    {
      id: 'group',
      name: 'Coaching Collectif',
      duration: 45,
      price: 25,
      description: 'Séance en petit groupe (3-6 personnes)'
    },
    {
      id: 'online',
      name: 'Coaching en Ligne',
      duration: 45,
      price: 60,
      description: 'Séance virtuelle via visioconférence'
    },
    {
      id: 'evaluation',
      name: 'Séance d\'Évaluation',
      duration: 90,
      price: 0,
      description: '🎁 Première séance gratuite pour nouveaux clients'
    }
  ];

  // Créneaux disponibles (simulation)
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00'
  ];

  // Générer les dates disponibles (7 prochains jours, en excluant dimanche)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    let currentDate = new Date(today);
    currentDate.setDate(currentDate.getDate() + 1); // Commencer demain

    while (dates.length < 7) {
      if (currentDate.getDay() !== 0) { // Exclure dimanche
        dates.push({
          value: currentDate.toISOString().split('T')[0],
          label: currentDate.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          })
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const [availableDates] = useState(generateAvailableDates());

  const handleInputChange = (e) => {
    setClientInfo({
      ...clientInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation simple
    if (!selectedDate || !selectedTime || !selectedService || !clientInfo.name || !clientInfo.email || !clientInfo.phone) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 2000));

      const selectedServiceInfo = services.find(s => s.id === selectedService);
      const bookingData = {
        date: selectedDate,
        time: selectedTime,
        service: selectedServiceInfo,
        client: clientInfo,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      console.log('Réservation créée:', bookingData);
      
      setSubmitStatus('success');
      
      // Reset form
      setTimeout(() => {
        setSelectedDate('');
        setSelectedTime('');
        setSelectedService('');
        setClientInfo({
          name: '',
          email: '',
          phone: '',
          notes: ''
        });
        setSubmitStatus('idle');
        onBookingSuccess?.(bookingData);
      }, 3000);

    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      setSubmitStatus('error');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedServiceInfo = services.find(s => s.id === selectedService);

  return (
    <section id="reservations" className={`section-padding bg-white dark:bg-gray-900 ${className}`}>
      <div className="container-max">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Réserver une <span className="text-primary-600 dark:text-primary-400">Séance</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choisissez votre créneau et commencez votre transformation dès aujourd'hui !
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Formulaire de réservation */}
          <motion.div
            className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              📅 Prendre rendez-vous
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sélection du service */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Type de séance *
                </label>
                <div className="grid gap-3">
                  {services.map((service) => (
                    <label
                      key={service.id}
                      className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedService === service.id
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={service.id}
                        checked={selectedService === service.id}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {service.name}
                          </h4>
                          <span className={`font-bold ${service.price === 0 ? 'text-green-600' : 'text-primary-600'}`}>
                            {service.price === 0 ? 'GRATUIT' : `${service.price}€`}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {service.description} • {service.duration} min
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sélection de la date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date *
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Choisir une date</option>
                  {availableDates.map((date) => (
                    <option key={date.value} value={date.value}>
                      {date.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sélection de l'heure */}
              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Heure *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          selectedTime === time
                            ? 'border-primary-500 bg-primary-600 text-white'
                            : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Informations client */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Vos informations
                </h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={clientInfo.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={clientInfo.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={clientInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes (optionnel)
                  </label>
                  <textarea
                    name="notes"
                    value={clientInfo.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                    placeholder="Objectifs, contraintes, questions..."
                  />
                </div>
              </div>

              {/* Bouton de soumission */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : submitStatus === 'success'
                    ? 'bg-green-600 hover:bg-green-700'
                    : submitStatus === 'error'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-lg'
                }`}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting && '⏳ Réservation en cours...'}
                {submitStatus === 'success' && '✅ Réservation confirmée !'}
                {submitStatus === 'error' && '❌ Erreur - Réessayer'}
                {submitStatus === 'idle' && !isSubmitting && '📅 Confirmer la réservation'}
              </motion.button>
            </form>
          </motion.div>

          {/* Récapitulatif et informations */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Récapitulatif */}
            {(selectedDate || selectedTime || selectedService) && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  📋 Récapitulatif
                </h4>
                
                {selectedServiceInfo && (
                  <div className="mb-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <h5 className="font-semibold text-primary-800 dark:text-primary-300">
                      {selectedServiceInfo.name}
                    </h5>
                    <p className="text-sm text-primary-600 dark:text-primary-400">
                      {selectedServiceInfo.description}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-primary-600 dark:text-primary-400">
                        Durée: {selectedServiceInfo.duration} minutes
                      </span>
                      <span className={`font-bold ${selectedServiceInfo.price === 0 ? 'text-green-600' : 'text-primary-600'}`}>
                        {selectedServiceInfo.price === 0 ? 'GRATUIT' : `${selectedServiceInfo.price}€`}
                      </span>
                    </div>
                  </div>
                )}

                {selectedDate && (
                  <div className="flex items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-400 w-16">📅 Date:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {availableDates.find(d => d.value === selectedDate)?.label}
                    </span>
                  </div>
                )}

                {selectedTime && (
                  <div className="flex items-center">
                    <span className="text-gray-600 dark:text-gray-400 w-16">⏰ Heure:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {selectedTime}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Informations pratiques */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
              <h4 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-4">
                ℹ️ Informations pratiques
              </h4>
              <ul className="space-y-2 text-blue-700 dark:text-blue-400">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Confirmation par email sous 2h</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Annulation gratuite jusqu'à 24h avant</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Séance d'évaluation gratuite pour nouveaux clients</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Matériel fourni sur place</span>
                </li>
              </ul>
            </div>

            {/* Contact rapide */}
            <div className="bg-gray-900 dark:bg-gray-700 rounded-2xl p-6 text-white">
              <h4 className="text-xl font-bold mb-4">📞 Besoin d'aide ?</h4>
              <p className="text-gray-300 mb-4">
                Une question sur nos services ou besoin d'aide pour réserver ?
              </p>
              <div className="space-y-2">
                <a
                  href="tel:+33600000000"
                  className="flex items-center text-primary-400 hover:text-primary-300"
                >
                  📞 +33 6 XX XX XX XX
                </a>
                <a
                  href="mailto:contact@gmfitness.fr"
                  className="flex items-center text-primary-400 hover:text-primary-300"
                >
                  ✉️ contact@gmfitness.fr
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

BookingCalendar.displayName = 'BookingCalendar';

export default BookingCalendar;