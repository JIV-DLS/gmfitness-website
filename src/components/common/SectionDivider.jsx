import React from 'react';
import { motion } from 'framer-motion';

/**
 * Composant de séparateur entre sections
 * Pattern: Visual Separator + Animation
 */
export const SectionDivider = ({ 
  variant = 'wave', 
  className = '',
  color = 'primary',
  height = 'h-24'
}) => {
  const colorClasses = {
    primary: 'text-azure-600 dark:text-azure-400',
    secondary: 'text-ocean-600 dark:text-ocean-400',
    accent: 'text-mediterranean-600 dark:text-mediterranean-400',
    neutral: 'text-gray-400 dark:text-gray-600'
  };

  if (variant === 'wave') {
    return (
      <div className={`${height} relative overflow-hidden ${className}`}>
        <motion.svg 
          className={`absolute inset-0 w-full h-full ${colorClasses[color]}`}
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill="currentColor"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
          />
        </motion.svg>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`${height} flex items-center justify-center ${className}`}>
        <motion.div 
          className="flex space-x-2"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${colorClasses[color].replace('text-', 'bg-')}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div className={`${height} relative ${className}`}>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
      </div>
    );
  }

  // Default: line variant
  return (
    <div className={`${height} flex items-center justify-center ${className}`}>
      <motion.div 
        className={`h-px bg-gradient-to-r from-transparent via-current to-transparent w-full max-w-xs ${colorClasses[color]}`}
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      />
    </div>
  );
};

/**
 * Séparateur avec icône centrale
 */
export const SectionDividerWithIcon = ({ 
  Icon, 
  className = '',
  color = 'primary' 
}) => {
  const colorClasses = {
    primary: 'text-azure-600 dark:text-azure-400 bg-azure-50 dark:bg-azure-900/20',
    secondary: 'text-ocean-600 dark:text-ocean-400 bg-ocean-50 dark:bg-ocean-900/20',
    accent: 'text-mediterranean-600 dark:text-mediterranean-400 bg-mediterranean-50 dark:bg-mediterranean-900/20'
  };

  return (
    <div className={`h-24 flex items-center justify-center ${className}`}>
      <motion.div 
        className="flex items-center space-x-4 w-full max-w-xs"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className={`h-px bg-gradient-to-r from-transparent to-current flex-1 ${colorClasses[color].split(' ')[0]}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        />
        <motion.div 
          className={`p-3 rounded-full ${colorClasses[color]}`}
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Icon className="text-xl" />
        </motion.div>
        <motion.div 
          className={`h-px bg-gradient-to-l from-transparent to-current flex-1 ${colorClasses[color].split(' ')[0]}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        />
      </motion.div>
    </div>
  );
};

export default SectionDivider;
