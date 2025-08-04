import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';

/**
 * Simple BookingCalendar component - no dependencies
 */
const BookingCalendar = memo(() => {
  const { t } = useI18n();
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const services = [
    { id: 'personal', name: t('booking.services.personal'), price: 70, duration: 60 },
    { id: 'duo', name: t('booking.services.duo'), price: 120, duration: 60 },
    { id: 'group', name: t('booking.services.group'), price: 25, duration: 45 }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  // Suggestions pour les notes
  const notesSuggestions = [
    "🎯 Objectif de remise en forme",
    "🏃‍♀️ Préparation d'un événement",
    "💪 Gain de masse musculaire",
    "⚖️ Perte de poids",
    "🏃 Préparation marathon/course",
    "🤕 Rééducation post-blessure",
    "🧘 Amélioration souplesse",
    "👥 Séance en couple/famille",
    "🏋️ Découverte musculation",
    "🍎 Conseils nutrition inclus"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Réservation soumise:', {
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      client: clientInfo
    });
    alert(t('booking.success'));
  };

  return (
    <section id="reservations" className="section-padding bg-gradient-to-br from-mediterranean-50/70 to-azure-100/70 dark:from-mediterranean-900/70 dark:to-azure-800/70 backdrop-blur-sm">
      <div className="container-max">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('booking.title')} <span className="text-primary-600 dark:text-primary-400">{t('booking.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('booking.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 space-y-6">
            
            {/* Service Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                {t('booking.services.title')} *
              </label>
              <div className="grid gap-4 md:grid-cols-3">
                {services.map((service) => (
                  <label
                    key={service.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
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
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {service.name}
                      </h4>
                      <p className="text-primary-600 dark:text-primary-400 font-bold">
                        {service.price}€
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {service.duration} min
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Heure *
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Choisir une heure</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Client Info */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('booking.client.name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={clientInfo.name}
                  onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('booking.client.email')} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={clientInfo.email}
                  onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('booking.client.phone')} *
              </label>
              <input
                type="tel"
                name="phone"
                value={clientInfo.phone}
                onChange={(e) => setClientInfo({...clientInfo, phone: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('booking.client.notes')}
              </label>
              
              {/* Suggestions rapides */}
              <div className="mb-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{t('booking.client.suggestions')}</p>
                <div className="flex flex-wrap gap-2">
                  {notesSuggestions && notesSuggestions.length > 0 && notesSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        const currentNotes = clientInfo.notes;
                        const suggestionText = suggestion.replace(/^[🎯🏃‍♀️💪⚖️🏃🤕🧘👥🏋️🍎]\s/, '');
                        if (!currentNotes.includes(suggestionText)) {
                          setClientInfo({
                            ...clientInfo,
                            notes: currentNotes ? `${currentNotes}, ${suggestionText}` : suggestionText
                          });
                        }
                      }}
                      className="text-xs px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors border border-primary-200 dark:border-primary-700"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                name="notes"
                value={clientInfo.notes}
                onChange={(e) => setClientInfo({...clientInfo, notes: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder={t('booking.client.notesPlaceholder')}
              />
            </div>

            <motion.button
              type="submit"
              className="w-full btn-primary py-4 text-lg font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('booking.submit')}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
});

BookingCalendar.displayName = 'BookingCalendar';

export default BookingCalendar;