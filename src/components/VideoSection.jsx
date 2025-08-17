import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import SlideShowIcon from '@mui/icons-material/Slideshow';
import StarsIcon from '@mui/icons-material/Stars';

/**
 * Section vidéos avec présentation du coach et témoignages clients
 * Pattern: Grid Layout + YouTube Embeds + Playlists
 */
export default function VideoSection() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Playlist de présentation du coach
  const presentationPlaylist = {
    id: 'presentation-playlist',
    title: 'Découvrez Gilson Mendes',
    description: 'Playlist de présentation de votre coach sportif sur la Côte d\'Azur',
    youtubePlaylistId: 'PLCsnVIhUDxqpjTUP96HZMHvw94zwVOn7S',
    category: 'Présentation'
  };

  // Playlist de témoignages clients
  const testimonialsPlaylist = {
    id: 'testimonials-playlist',
    title: 'Témoignages de mes clients',
    description: 'Découvrez les témoignages authentiques de mes clients transformés',
    youtubePlaylistId: 'PLCsnVIhUDxqoaBTgaPuF6PJD4wmbRbuYz',
    category: 'Témoignages'
  };

  const getYouTubePlaylistEmbedUrl = (playlistId) => {
    return `https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1&showinfo=0`;
  };

  return (
    <section
      id="videos"
      className="min-h-screen bg-gradient-to-br from-azure-50 via-ocean-50 to-mediterranean-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 flex items-center justify-center gap-4">
            <PlayCircleOutlineIcon className="text-5xl text-azure-600" />
            Découvrez mon{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-azure-600 to-ocean-600">
              Approche
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explorez mes playlists complètes : présentation de ma méthode holistique et témoignages authentiques de mes clients transformés.
          </p>
        </motion.div>

        {/* Playlists principales */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Playlist de présentation */}
          {presentationPlaylist.youtubePlaylistId && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 h-full">
                <div className="bg-gradient-to-r from-azure-500 to-ocean-500 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
                    <SlideShowIcon className="text-3xl" />
                    {presentationPlaylist.title}
                  </h3>
                  <p className="text-azure-100">
                    {presentationPlaylist.description}
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <iframe
                      src={getYouTubePlaylistEmbedUrl(presentationPlaylist.youtubePlaylistId)}
                      title={presentationPlaylist.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Playlist de témoignages */}
          {testimonialsPlaylist.youtubePlaylistId && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 h-full">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
                    <StarsIcon className="text-3xl" />
                    {testimonialsPlaylist.title}
                  </h3>
                  <p className="text-green-100">
                    {testimonialsPlaylist.description}
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <iframe
                      src={getYouTubePlaylistEmbedUrl(testimonialsPlaylist.youtubePlaylistId)}
                      title={testimonialsPlaylist.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Section d'information supplémentaire */}
        <motion.div
          className="text-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
            <EmojiObjectsIcon className="text-3xl text-azure-600" />
            Ma méthode en action
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
            Chaque vidéo reflète mon approche personnalisée alliant corps et esprit. Découvrez comment j'accompagne mes clients vers leurs objectifs avec bienveillance et expertise.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="mb-3 flex justify-center">
                <SlideShowIcon className="text-4xl text-azure-600" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Présentation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Découvrez mon parcours et ma philosophie holistique</p>
            </div>
            <div className="text-center">
              <div className="mb-3 flex justify-center">
                <StarsIcon className="text-4xl text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Témoignages</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Transformations réelles et authentiques de mes clients</p>
            </div>
          </div>
        </motion.div>

        {/* Call to action final */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Envie de plus de contenu ? Découvrez ma chaîne YouTube complète !
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.youtube.com/@Gilson.Mendes-Fitness/featured"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Ma chaîne YouTube
            </a>
            <a
              href="#booking"
              className="bg-azure-600 hover:bg-azure-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Réserver une séance
            </a>
            <a
              href="#contact"
              className="border border-azure-600 text-azure-600 hover:bg-azure-50 dark:hover:bg-azure-900 px-8 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Me contacter
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}