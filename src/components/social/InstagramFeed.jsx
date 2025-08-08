/**
 * Composant Instagram Feed - Affichage des séances clients
 * Intègre les highlights et posts Instagram de Gilson
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaPlay, FaHeart, FaComment } from 'react-icons/fa';
import { useFacebookPixel } from '@/hooks/useFacebookPixel';

/**
 * Composant principal Instagram Feed
 */
const InstagramFeed = ({ 
  className = '',
  maxPosts = 6,
  showHeader = true 
}) => {
  const { events: fbEvents } = useFacebookPixel();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Posts statiques en attendant l'API Instagram
  // TODO: Remplacer par Instagram Basic Display API
  const mockPosts = [
    {
      id: '1',
      type: 'highlight',
      title: 'Séances Clients',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=face',
      url: 'https://www.instagram.com/stories/highlights/18077364847597199/',
      description: 'Découvrez mes séances avec mes clients !',
      isHighlight: true,
      stories_count: 12
    },
    {
      id: '2', 
      type: 'post',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      caption: 'Séance de renforcement avec Marie 💪 Objectif atteint !',
      likes: 156,
      comments: 23,
      url: 'https://www.instagram.com/p/example1/',
      date: '2024-01-15'
    },
    {
      id: '3',
      type: 'post', 
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop',
      caption: 'Transformation incroyable de Thomas en 3 mois ! 🔥',
      likes: 234,
      comments: 45,
      url: 'https://www.instagram.com/p/example2/',
      date: '2024-01-12'
    },
    {
      id: '4',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=400&h=400&fit=crop',
      caption: 'Technique parfaite pour les squats 🎯',
      likes: 189,
      comments: 31,
      url: 'https://www.instagram.com/p/example3/',
      duration: '0:45',
      date: '2024-01-10'
    },
    {
      id: '5',
      type: 'post',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      caption: 'Coaching collectif ce matin ! Énergie au top 🚀',
      likes: 142,
      comments: 18,
      url: 'https://www.instagram.com/p/example4/',
      date: '2024-01-08'
    },
    {
      id: '6',
      type: 'post',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=400&fit=crop',
      caption: 'Préparation marathon avec Julien 🏃‍♂️',
      likes: 98,
      comments: 12,
      url: 'https://www.instagram.com/p/example5/',
      date: '2024-01-05'
    }
  ];

  useEffect(() => {
    // Simuler chargement API
    setTimeout(() => {
      setPosts(mockPosts.slice(0, maxPosts));
      setLoading(false);
    }, 1000);
  }, [maxPosts]);

  const handlePostClick = (post) => {
    // Track interaction Instagram
    fbEvents.trackEvent('InstagramInteraction', {
      post_type: post.type,
      post_id: post.id,
      content_name: post.isHighlight ? 'Highlight Stories' : 'Instagram Post'
    });

    // Ouvrir Instagram
    window.open(post.url, '_blank');
  };

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          ))}
        </div>
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
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-400 via-pink-500 to-orange-500 rounded-full flex items-center justify-center">
              <FaInstagram className="text-white text-lg" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Séances en Direct
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                @gilsonmendes_coach
              </p>
            </div>
          </div>
          <motion.a
            href="https://www.instagram.com/gilsonmendes_coach/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fbEvents.trackEvent('SocialClick', { platform: 'instagram', context: 'feed_header' })}
          >
            Suivre
          </motion.a>
        </motion.div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
            onClick={() => handlePostClick(post)}
          >
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              {/* Image/Thumbnail */}
              <img
                src={post.isHighlight ? post.thumbnail : post.image || post.thumbnail}
                alt={post.caption || post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Type indicators */}
              {post.isHighlight && (
                <div className="absolute top-2 left-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Stories
                </div>
              )}
              
              {post.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                    <FaPlay className="text-white text-sm ml-1" />
                  </div>
                </div>
              )}

              {/* Stats overlay */}
              {!post.isHighlight && (
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <FaHeart className="text-xs" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaComment className="text-xs" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                    {post.duration && (
                      <span className="bg-black/50 px-2 py-1 rounded text-xs">
                        {post.duration}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Highlight stories count */}
              {post.isHighlight && (
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                  {post.stories_count} stories
                </div>
              )}
            </div>

            {/* Caption pour les highlights */}
            {post.isHighlight && (
              <div className="mt-2 text-center">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {post.description}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <motion.a
          href="https://www.instagram.com/gilsonmendes_coach/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => fbEvents.trackEvent('SocialClick', { platform: 'instagram', context: 'feed_cta' })}
        >
          <FaInstagram />
          <span>Voir plus sur Instagram</span>
        </motion.a>
      </motion.div>
    </div>
  );
};

export default InstagramFeed;