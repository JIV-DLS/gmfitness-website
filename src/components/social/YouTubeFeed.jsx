/**
 * Composant YouTube Feed Automatique
 * Récupère les dernières vidéos via YouTube Data API v3
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaYoutube, FaPlay, FaEye, FaClock } from 'react-icons/fa';
import { useFacebookPixel } from '@/hooks/useFacebookPixel';

/**
 * Configuration YouTube API
 */
const YOUTUBE_CONFIG = {
  apiKey: import.meta.env.VITE_YOUTUBE_API_KEY || null,
  channelId: 'UCGilsonMendesFitness', // TODO: Remplacer par le vrai Channel ID
  maxResults: 6,
  // Channel de Gilson: https://youtube.com/@Gilson.Mendes-Fitness
  channelHandle: '@Gilson.Mendes-Fitness'
};

/**
 * Hook pour récupérer les vidéos YouTube
 */
export const useYouTubeVideos = (channelId = YOUTUBE_CONFIG.channelId, maxResults = 6) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Vidéos statiques en attendant l'API (basées sur les vidéos réelles de Gilson)
  const mockVideos = [
    {
      id: { videoId: 'NdcT_AjbnGM' },
      snippet: {
        title: 'Présentation Gilson Mendes - Coach Sportif',
        description: 'Découvrez mon approche holistique du coaching sportif sur la Côte d\'Azur',
        thumbnails: {
          medium: { url: 'https://img.youtube.com/vi/NdcT_AjbnGM/mqdefault.jpg' },
          high: { url: 'https://img.youtube.com/vi/NdcT_AjbnGM/hqdefault.jpg' }
        },
        publishedAt: '2024-01-15T10:00:00Z',
        channelTitle: 'Gilson Mendes Fitness'
      },
      statistics: {
        viewCount: '1250',
        likeCount: '89'
      },
      contentDetails: {
        duration: 'PT2M30S' // 2:30
      }
    },
    {
      id: { videoId: '02ic0w-QWfs' },
      snippet: {
        title: '20 minutes de Pilates pour un ventre plat - Pilates 100% abdo',
        description: 'Séance complète de Pilates ciblée abdominaux',
        thumbnails: {
          medium: { url: 'https://img.youtube.com/vi/02ic0w-QWfs/mqdefault.jpg' },
          high: { url: 'https://img.youtube.com/vi/02ic0w-QWfs/hqdefault.jpg' }
        },
        publishedAt: '2024-01-12T09:00:00Z',
        channelTitle: 'Gilson Mendes Fitness'
      },
      statistics: {
        viewCount: '3420',
        likeCount: '156'
      },
      contentDetails: {
        duration: 'PT20M15S' // 20:15
      }
    },
    {
      id: { videoId: '_hlpJcbWl48' },
      snippet: {
        title: 'YOGA FLOW - 25 MIN - Parfaite routine',
        description: 'Routine de yoga flow de 25 minutes pour tous niveaux',
        thumbnails: {
          medium: { url: 'https://img.youtube.com/vi/_hlpJcbWl48/mqdefault.jpg' },
          high: { url: 'https://img.youtube.com/vi/_hlpJcbWl48/hqdefault.jpg' }
        },
        publishedAt: '2024-01-10T08:00:00Z',
        channelTitle: 'Gilson Mendes Fitness'
      },
      statistics: {
        viewCount: '2890',
        likeCount: '134'
      },
      contentDetails: {
        duration: 'PT25M42S' // 25:42
      }
    },
    {
      id: { videoId: 'BBqzBUFQRKg' },
      snippet: {
        title: '20 Minutes Étirement - Stretching corps complet',
        description: 'Séance complète d\'étirements pour tout le corps',
        thumbnails: {
          medium: { url: 'https://img.youtube.com/vi/BBqzBUFQRKg/mqdefault.jpg' },
          high: { url: 'https://img.youtube.com/vi/BBqzBUFQRKg/hqdefault.jpg' }
        },
        publishedAt: '2024-01-08T07:30:00Z',
        channelTitle: 'Gilson Mendes Fitness'
      },
      statistics: {
        viewCount: '4520',
        likeCount: '198'
      },
      contentDetails: {
        duration: 'PT20M8S' // 20:08
      }
    }
  ];

  const fetchVideos = async () => {
    if (!YOUTUBE_CONFIG.apiKey) {
      console.log('🎥 Mode développement : utilisation des vidéos statiques');
      setVideos(mockVideos.slice(0, maxResults));
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Appel API YouTube Data v3
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?` +
        `key=${YOUTUBE_CONFIG.apiKey}&` +
        `channelId=${channelId}&` +
        `part=snippet&` +
        `order=date&` +
        `maxResults=${maxResults}&` +
        `type=video`
      );

      if (!response.ok) {
        throw new Error(`YouTube API Error: ${response.status}`);
      }

      const data = await response.json();

      // Récupérer les statistiques et durées
      const videoIds = data.items.map(item => item.id.videoId).join(',');
      const statsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?` +
        `key=${YOUTUBE_CONFIG.apiKey}&` +
        `id=${videoIds}&` +
        `part=statistics,contentDetails`
      );

      const statsData = await statsResponse.json();

      // Merger les données
      const videosWithStats = data.items.map(video => {
        const stats = statsData.items.find(stat => stat.id === video.id.videoId);
        return {
          ...video,
          statistics: stats?.statistics || {},
          contentDetails: stats?.contentDetails || {}
        };
      });

      setVideos(videosWithStats);
    } catch (err) {
      console.error('Erreur YouTube API:', err);
      setError(err.message);
      // Fallback vers vidéos statiques
      setVideos(mockVideos.slice(0, maxResults));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [channelId, maxResults]);

  const refetch = () => fetchVideos();

  return { videos, loading, error, refetch };
};

/**
 * Fonction utilitaire pour formater la durée YouTube
 */
const formatDuration = (duration) => {
  if (!duration) return '';
  
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '';

  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Fonction utilitaire pour formater les vues
 */
const formatViews = (viewCount) => {
  if (!viewCount) return '0';
  const num = parseInt(viewCount);
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

/**
 * Composant principal YouTube Feed
 */
const YouTubeFeed = ({ 
  className = '',
  maxVideos = 4,
  showHeader = true,
  variant = 'grid' // 'grid', 'list', 'carousel'
}) => {
  const { videos, loading, error } = useYouTubeVideos(YOUTUBE_CONFIG.channelId, maxVideos);
  const { events: fbEvents } = useFacebookPixel();

  const handleVideoClick = (video) => {
    const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
    
    // Track video view
    fbEvents.watchVideo(video.snippet.title);
    
    // Ouvrir YouTube
    window.open(videoUrl, '_blank');
  };

  const handleChannelClick = () => {
    fbEvents.trackEvent('SocialClick', { 
      platform: 'youtube', 
      context: 'channel_link' 
    });
  };

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error && videos.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <FaYoutube className="mx-auto text-4xl text-red-500 mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          Erreur lors du chargement des vidéos YouTube
        </p>
        <p className="text-sm text-gray-500 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {showHeader && (
        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <FaYoutube className="text-white text-lg" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Dernières Vidéos
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {YOUTUBE_CONFIG.channelHandle}
              </p>
            </div>
          </div>
          <motion.a
            href="https://youtube.com/@Gilson.Mendes-Fitness"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleChannelClick}
          >
            S'abonner
          </motion.a>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video, index) => (
          <motion.div
            key={video.id.videoId}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
            onClick={() => handleVideoClick(video)}
          >
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              {/* Thumbnail */}
              <img
                src={video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url}
                alt={video.snippet.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center">
                  <FaPlay className="text-white text-lg ml-1" />
                </div>
              </div>

              {/* Duration */}
              {video.contentDetails?.duration && (
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {formatDuration(video.contentDetails.duration)}
                </div>
              )}

              {/* Views */}
              {video.statistics?.viewCount && (
                <div className="absolute top-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                  <FaEye className="text-xs" />
                  <span>{formatViews(video.statistics.viewCount)}</span>
                </div>
              )}
            </div>

            {/* Video info */}
            <div className="mt-3 space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                {video.snippet.title}
              </h4>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                {video.statistics?.viewCount && (
                  <div className="flex items-center space-x-1">
                    <FaEye className="text-xs" />
                    <span>{formatViews(video.statistics.viewCount)} vues</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-1">
                  <FaClock className="text-xs" />
                  <span>
                    {new Date(video.snippet.publishedAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>

              {video.snippet.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {video.snippet.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <motion.a
          href="https://youtube.com/@Gilson.Mendes-Fitness"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleChannelClick}
        >
          <FaYoutube />
          <span>Voir toutes les vidéos</span>
        </motion.a>
      </motion.div>
    </div>
  );
};

export default YouTubeFeed;