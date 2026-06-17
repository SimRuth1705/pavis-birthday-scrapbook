import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scissors } from 'lucide-react';

const PhotoDecal = ({ src, rotation, top, left, right, bottom }) => (
  <div 
    className="absolute rounded-2xl overflow-hidden shadow-2xl border border-white/20 select-none pointer-events-none z-0 opacity-100 w-[160px] md:w-[220px] lg:w-[260px] aspect-square"
    style={{ top, left, right, bottom, transform: `rotate(${rotation}deg)` }}
  >
    <img src={src} className="w-full h-full object-cover" alt="" />
    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none" />
  </div>
);

const Coupon = ({ mysteryTitle, isLast, onClick, disabled }) => {
  const [cutPhase, setCutPhase] = useState('idle'); // 'idle' | 'cutting' | 'split'

  const handleStartCut = () => {
    if (disabled || cutPhase !== 'idle') return;
    setCutPhase('cutting');

    // Phase 1: Scissors cut down the seam (takes 800ms)
    setTimeout(() => {
      setCutPhase('split');
      
      // Phase 2: Parts split and slide apart (takes 600ms)
      setTimeout(() => {
        onClick();
      }, 500);
    }, 800);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto mb-6">
      {/* Dashed cutting line and scissors icon above the coupon */}
      {!isLast && (
        <div className="absolute -bottom-8 left-0 w-full flex items-center z-10 pointer-events-none opacity-40">
          <Scissors size={18} className="text-stone-850 -rotate-90 ml-[-10px]" />
          <div className="w-full border-b-[2px] border-dashed border-stone-850 ml-1"></div>
        </div>
      )}

      {/* Main Ticket Layout */}
      <div 
        onClick={handleStartCut}
        className={`relative flex w-full h-[80px] md:h-[100px] bg-transparent select-none ${
          disabled || cutPhase !== 'idle' ? 'pointer-events-none' : 'cursor-pointer'
        }`}
      >
        {/* Left Part (Body) */}
        <motion.div
          animate={cutPhase === 'split' ? { x: -400, opacity: 0, rotate: -8 } : { x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="relative flex-1 flex items-center justify-between px-4 md:px-8 h-full bg-[#f28b8b] rounded-l-2xl border-r-[2.5px] border-dashed border-[#b64b4b]/40 shadow-md"
          style={{ transformOrigin: 'bottom left' }}
        >
          {/* Left Semi-circle cutout */}
          <div className="absolute top-1/2 -left-4 w-6 h-6 md:w-8 md:h-8 bg-[#eab4ab] rounded-full transform -translate-y-1/2 shadow-inner" style={{ boxShadow: 'inset -3px 0px 4px -2px rgba(0,0,0,0.1)' }} />

          {/* Content */}
          <div className="flex flex-col items-center justify-center flex-1 pr-2 py-1 pointer-events-none">
            <h2 
              className="text-lg md:text-2xl text-[#c42d3c] font-black mb-1 text-center tracking-widest uppercase" 
              style={{ fontFamily: "'Playfair Display', serif", textShadow: '1px 1px 0px rgba(255,255,255,0.3)' }}
            >
              {mysteryTitle}
            </h2>
            <p 
              className="text-xs md:text-sm text-stone-800 text-center leading-tight font-bold italic" 
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Dare to select to reveal your fate...
            </p>
          </div>

        </motion.div>

        {/* Right Part (Stub) */}
        <motion.div
          animate={cutPhase === 'split' ? { x: 400, opacity: 0, rotate: 8 } : { x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="relative w-20 md:w-28 flex items-center justify-center h-full bg-[#f28b8b] rounded-r-2xl shadow-md flex-shrink-0"
          style={{ transformOrigin: 'bottom right' }}
        >
          {/* Right Semi-circle cutout */}
          <div className="absolute top-1/2 -right-4 w-6 h-6 md:w-8 md:h-8 bg-[#eab4ab] rounded-full transform -translate-y-1/2 shadow-inner" style={{ boxShadow: 'inset 3px 0px 4px -2px rgba(0,0,0,0.1)' }} />

          {/* Perforation small cutouts */}
          <div className="absolute -top-2 left-[-8px] w-4 h-4 bg-[#eab4ab] rounded-full" />
          <div className="absolute -bottom-2 left-[-8px] w-4 h-4 bg-[#eab4ab] rounded-full" />

          {/* Stub text */}
          <div 
            className="transform -rotate-90 text-[#601920] text-[9px] md:text-[10px] tracking-widest pointer-events-none w-[70px] md:w-[80px] text-center leading-tight font-black uppercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Top Secret
          </div>
        </motion.div>

        {/* Scissors cutting animation */}
        {cutPhase === 'cutting' && (
          <motion.div
            initial={{ top: '105%', rotate: -90 }}
            animate={{ 
              top: -20,
              rotate: [-90, -70, -90, -70, -90]
            }}
            transition={{ 
              top: { duration: 0.8, ease: "easeInOut" },
              rotate: { duration: 0.2, repeat: 4, ease: "easeInOut" }
            }}
            className="absolute right-[80px] md:right-[112px] -translate-x-[12px] z-50 pointer-events-none will-change-transform"
            style={{ y: '-50%' }}
          >
            <Scissors size={24} className="text-stone-900 drop-shadow-sm animate-pulse" />
          </motion.div>
        )}
      </div>
    </div>
  );
};

const COUPONS = [
  { 
    title: "Truth: The Music Expose", 
    description: "Share the last 3 songs you listened to. No hiding your guilty pleasures!", 
    validity: "Valid for one shared music moment."
  },
  { 
    title: "Dare: The Emoji Story", 
    description: "Describe how your day went using exactly 5 emojis, and I have to guess what happened.", 
    validity: "Valid for one fun guessing game."
  },
  { 
    title: "Truth: The Food Confession", 
    description: "What is the weirdest food combination you secretly enjoy eating?", 
    validity: "Valid for one judgment-free confession."
  },
  { 
    title: "Dare: The Ugly Selfie", 
    description: "Take a selfie right now making a funny face and send it. No filters allowed!", 
    validity: "Valid for one digital masterpiece."
  }
];

export default function CouponsPage({ isActive, onBackClick, onSelectCoupon }) {
  const [isAnyCutting, setIsAnyCutting] = useState(false);

  React.useEffect(() => {
    if (isActive) {
      setIsAnyCutting(false);
    }
  }, [isActive]);

  // Generate a cluster of balloons that sit at the top of the page
  const colors = ['bg-red-400', 'bg-pink-400', 'bg-rose-500', 'bg-fuchsia-400', 'bg-pink-300'];
  const balloons = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    top: `${-20 + Math.random() * 60}px`,
    size: 50 + Math.random() * 50,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  const handleSelectCoupon = (coupon) => {
    setIsAnyCutting(true);
    onSelectCoupon(coupon);
  };

  return (
    <motion.div 
      className="relative w-full min-h-screen bg-[#eab4ab] py-6 px-4 overflow-y-auto overflow-x-hidden"
    >
      {/* Background Scattered Photos (No frame effect) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block z-0">
        <PhotoDecal src="/friend_photo_6.png" rotation={-12} top="5%" left="2%" />
        <PhotoDecal src="/friend_photo_7.png" rotation={8} top="35%" right="1%" />
        <PhotoDecal src="/friend_photo_8.png" rotation={-5} bottom="15%" left="4%" />
        <PhotoDecal src="/friend_photo_9.png" rotation={15} bottom="5%" right="8%" />
      </div>

      {/* Secret Input Field for Custom Question */}
      <input 
        type="text" 
        placeholder="..."
        className="absolute top-2 right-2 w-12 focus:w-48 bg-transparent text-[#601920] border-b border-transparent focus:border-[#601920]/20 outline-none text-xs opacity-10 focus:opacity-100 transition-all z-50 placeholder-[#601920]/30"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value.trim()) {
            const customCoupon = {
              title: "Custom Dare",
              description: e.target.value.trim(),
              validity: "Valid for one daring challenge."
            };
            handleSelectCoupon(customCoupon);
          }
        }}
      />

      {/* Balloon Cluster lifting the page */}
      <div className="relative w-full max-w-4xl mx-auto h-24 md:h-28 mb-4 pointer-events-none">
        {balloons.map((b) => (
          <motion.div
            key={b.id}
            className={`absolute rounded-[50%] opacity-90 shadow-sm ${b.color} z-10 will-change-transform`}
            style={{ 
              width: b.size, 
              height: b.size * 1.25, 
              left: b.left,
              top: b.top,
            }}
            animate={{
              y: [-10, 10, -10],
              rotate: [-3, 3, -3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Balloon string stretching down */}
            <div className="absolute top-[98%] left-1/2 w-[1.5px] bg-stone-100/60 -translate-x-1/2" style={{ height: '120px' }} />
            {/* Balloon knot */}
            <div className="absolute -bottom-1 left-1/2 w-3 h-2 bg-inherit -translate-x-1/2 rounded-full" />
            {/* Balloon shine */}
            <div className="absolute top-[15%] left-[20%] w-[15%] h-[25%] bg-white/40 rounded-full rotate-[-45deg]" />
          </motion.div>
        ))}
      </div>

      <div className="relative w-full max-w-4xl mx-auto z-20 mb-8 px-4 text-center mt-4">
        <h2 
          className="text-3xl md:text-5xl font-black text-[#601920] uppercase tracking-widest drop-shadow-sm"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Choose One
        </h2>
        <p className="text-[#601920]/70 font-bold uppercase tracking-widest mt-2 text-xs md:text-sm">
          (And choose wisely...)
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto flex flex-col gap-3 md:gap-4 z-20">
        {COUPONS.map((c, idx) => (
          <Coupon 
            key={idx} 
            mysteryTitle={`Mystery Ticket ${idx + 1}`}
            isLast={idx === COUPONS.length - 1} 
            onClick={() => handleSelectCoupon(c)}
            disabled={isAnyCutting}
          />
        ))}
      </div>

      {onBackClick && (
        <button 
          onClick={onBackClick}
          className="fixed bottom-6 right-6 bg-[#c42d3c] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-[#a22330] transition-colors z-50"
        >
          Back
        </button>
      )}
    </motion.div>
  );
}
