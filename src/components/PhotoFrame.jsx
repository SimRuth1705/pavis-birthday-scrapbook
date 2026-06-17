import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHOTOS = [
  { src: '/friend_photo_1.png', label: 'US FOREVER 💖', tape: '⭐ Bday Bestie ⭐', rotate: -3 },
  { src: '/friend_photo_2.png', label: 'PLAYFUL TIMES 📸', tape: '✨ Cuties ✨', rotate: 2 },
  { src: '/friend_photo_3.png', label: 'SWEET MOMENTS 🧁', tape: '🎈 Make a Wish 🎈', rotate: -1 }
];

export default function PhotoFrame() {
  const [photos, setPhotos] = useState(PHOTOS);
  const [exitDirection, setExitDirection] = useState(1); // 1 = right, -1 = left

  const handleCardClick = (e) => {
    e.stopPropagation();
    // Alternate exit directions for variety
    setExitDirection(Math.random() > 0.5 ? 1 : -1);
    
    // Move top card (first element) to the bottom of the list
    setPhotos((prev) => {
      const copy = [...prev];
      const top = copy.shift();
      copy.push(top);
      return copy;
    });
  };

  return (
    <div className="relative w-full h-[260px] flex items-center justify-center cursor-pointer select-none">
      <AnimatePresence mode="popLayout">
        {photos.map((photo, index) => {
          // In React list rendering, index 0 is top, index 2 is bottom.
          // Render from bottom to top for correct DOM overlapping.
          const depth = photos.length - 1 - index;
          const isTop = index === 0;

          // Don't render the bottommost if it is currently animating/exiting
          return (
            <motion.div
              key={photo.src}
              className="absolute p-3 bg-white rounded-2xl shadow-clay border border-white/40 w-full max-w-[200px]"
              style={{ zIndex: depth }}
              layout // Smooth layout changes when items shift
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                scale: isTop ? 1 : 0.94 - index * 0.03,
                y: isTop ? [0, -6, 0] : index * 8,
                rotate: isTop ? photo.rotate : photo.rotate + index * 4,
                opacity: 1 - index * 0.15,
              }}
              exit={{
                x: exitDirection * 150,
                rotate: exitDirection * 45,
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.4, ease: 'easeOut' }
              }}
              transition={{
                y: isTop ? {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                } : { duration: 0.3 },
                scale: { duration: 0.3 },
                rotate: { duration: 0.3 },
                opacity: { duration: 0.3 }
              }}
              whileHover={isTop ? { 
                scale: 1.05, 
                rotate: photo.rotate + 3,
                transition: { type: 'spring', stiffness: 450, damping: 15 }
              } : {}}
              onClick={handleCardClick}
            >
              <div className="relative aspect-square rounded-lg overflow-hidden bg-pink-50 border border-pink-100 pointer-events-none">
                <img
                  src={photo.src}
                  alt={photo.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/30" />
              </div>
              
              <div className="mt-2 text-center pointer-events-none">
                <span className="font-rounded font-bold text-pink-500/80 text-[10px] tracking-widest">
                  {photo.label}
                </span>
              </div>

              {/* Cute semi-transparent washi tape */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4.5 bg-yellow-100/80 backdrop-blur-[1px] -rotate-2 border border-yellow-200/50 flex items-center justify-center text-[8px] text-yellow-600/70 font-semibold select-none pointer-events-none rounded shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                {photo.tape}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Touch indicator */}
      <div className="absolute bottom-[-15px] bg-white/70 border border-white/50 text-[9px] font-bold text-indigo-500 px-3 py-0.5 rounded-full shadow-sm backdrop-blur-sm pointer-events-none animate-pulse">
        ✨ Tap photos to flip!
      </div>
    </div>
  );
}
