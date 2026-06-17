import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// List of all large assets to preload
const PRELOAD_IMAGES = [
  '/bike.png',
  '/clay_cake.png',
  '/clay_cloud.png',
  '/clay_gift.png',
  '/clay_heart.png',
  '/clay_star.png',
  '/friend_photo_1.png',
  '/friend_photo_2.png',
  '/friend_photo_3.png',
  '/friend_photo_4.png',
  '/friend_photo_5.png',
  '/friend_photo_6.png',
  '/friend_photo_7.png',
  '/friend_photo_8.png',
  '/friend_photo_9.png',
  '/friend_photo_10.png',
  '/friend_photo_11.png',
  '/friend_photo_12.png',
];

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = PRELOAD_IMAGES.length;

    // Fast-path if no images
    if (totalImages === 0) {
      setProgress(100);
      setTimeout(() => onLoadingComplete(), 500);
      return;
    }

    const handleImageLoad = () => {
      loadedCount++;
      setProgress(Math.round((loadedCount / totalImages) * 100));
      
      if (loadedCount === totalImages) {
        // Wait a small moment after 100% before triggering complete
        setTimeout(() => {
          onLoadingComplete();
        }, 800);
      }
    };

    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad; // Continue even if one fails
    });
  }, [onLoadingComplete]);

  return (
    <motion.div
      key="loading-screen"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="absolute inset-0 z-[150] bg-[#faf7f0] flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="flex flex-col items-center max-w-sm w-full">
        {/* Bouncing loading icon */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 mb-8 flex items-center justify-center bg-[#f28b8b] rounded-full shadow-lg"
        >
          <span className="text-white text-4xl">✨</span>
        </motion.div>

        <h2 
          className="text-[#c42d3c] text-3xl font-black mb-4 tracking-wider"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Gathering Memories...
        </h2>

        {/* Progress bar container */}
        <div className="w-full h-4 bg-[#eab4ab]/30 rounded-full overflow-hidden shadow-inner mb-2 relative">
          <motion.div 
            className="h-full bg-[#c42d3c] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          />
        </div>
        
        <p 
          className="text-stone-500 font-bold tracking-widest text-xs uppercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {progress}%
        </p>
      </div>

      {/* Hidden container to force physical DOM decoding and prevent pop-in */}
      <div className="absolute opacity-0 pointer-events-none w-1 h-1 overflow-hidden" aria-hidden="true">
        {PRELOAD_IMAGES.map((src) => (
          <img key={src} src={src} alt="preload" />
        ))}
      </div>
    </motion.div>
  );
}
