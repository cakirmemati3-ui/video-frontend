'use client';

import { motion } from 'framer-motion';
import type { LoadingSpinnerProps } from '@/types';

const LoadingSpinner = ({ size = 'md', text = 'Yükleniyor...' }: LoadingSpinnerProps) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      {/* Animated Spinner */}
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className={`${sizes[size]} rounded-full border-4 border-neon-blue/20`}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Inner spinning ring */}
        <motion.div
          className={`${sizes[size]} absolute inset-0 rounded-full border-4 border-transparent border-t-neon-blue border-r-neon-purple`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Pulse effect */}
        <motion.div
          className={`${sizes[size]} absolute inset-0 rounded-full bg-neon-blue/20`}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Loading Text */}
      <motion.p
        className="text-lg font-medium text-gray-400"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {text}
      </motion.p>

      {/* Loading Dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-neon-purple rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
