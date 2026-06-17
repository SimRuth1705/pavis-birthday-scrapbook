import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Hand-drawn botanical branches in SVG
const BranchLeft = () => (
  <svg viewBox="0 0 120 240" className="w-28 h-56 stroke-[#4e583d]/30 stroke-2 fill-none select-none pointer-events-none absolute left-2 top-[10%]">
    <path d="M 30,220 C 45,180 30,120 60,60 C 65,50 70,30 68,10" strokeLinecap="round" />
    <path d="M 44,170 C 30,165 22,175 22,185 C 22,192 32,190 44,170 Z M 44,170 C 58,162 66,170 66,180 C 66,187 56,185 44,170 Z" fill="#4e583d/10" />
    <path d="M 38,130 C 20,120 15,135 15,142 C 15,148 28,142 38,130 Z M 38,130 C 52,118 62,125 62,135 C 62,141 50,138 38,130 Z" fill="#4e583d/10" />
    <path d="M 45,90 C 30,78 28,90 28,98 C 28,105 38,98 45,90 Z M 45,90 C 58,80 68,85 68,95 C 68,100 58,98 45,90 Z" fill="#4e583d/10" />
    <path d="M 58,45 C 48,32 45,45 45,52 C 45,58 52,52 58,45 Z M 58,45 C 68,38 78,42 78,50 C 78,55 68,52 58,45 Z" fill="#4e583d/10" />
  </svg>
);

const BranchRight = () => (
  <svg viewBox="0 0 120 240" className="w-28 h-56 stroke-[#4e583d]/30 stroke-2 fill-none select-none pointer-events-none absolute right-2 top-[35%]">
    <path d="M 90,220 C 75,180 90,120 60,60 C 55,50 50,30 52,10" strokeLinecap="round" />
    <path d="M 76,170 C 62,162 54,170 54,180 C 54,187 64,185 76,170 Z M 76,170 C 90,165 98,175 98,185 C 98,192 88,190 76,170 Z" fill="#4e583d/10" />
    <path d="M 82,130 C 68,118 58,125 58,135 C 58,141 70,138 82,130 Z M 82,130 C 100,120 105,135 105,142 C 105,148 92,142 82,130 Z" fill="#4e583d/10" />
    <path d="M 75,90 C 62,80 52,85 52,95 C 52,100 62,98 75,90 Z M 75,90 C 90,78 92,90 92,98 C 92,105 82,98 75,90 Z" fill="#4e583d/10" />
  </svg>
);

// Polaroid Frame Component (Now clean rounded card without border/tape effect)
const Polaroid = ({ src, rotation, style, aspectClass = 'aspect-square', sizeClass = 'w-[250px] md:w-[310px]' }) => {
  return (
    <motion.div
      className={`absolute rounded-2xl overflow-hidden shadow-2xl border border-white/20 select-none pointer-events-auto ${sizeClass} ${aspectClass}`}
      style={style}
      initial={{ rotate: rotation }}
    >
      <img src={src} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/15 pointer-events-none" />
    </motion.div>
  );
};

export default function ScrapbookLanding({ onDeeperClick }) {
  const [fontToggle, setFontToggle] = useState(false);

  // Alternate font every 0.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFontToggle((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#faf7f0] bg-grid flex flex-col justify-between overflow-hidden select-none">
      
      {/* Decorative top-left background layer */}
      <div className="absolute top-0 left-0 w-[45%] h-36 bg-[#f5efe2] opacity-70 pointer-events-none z-0 rounded-br-[60px] border-b border-r border-[#e6dbbd]/40" />
      
      <BranchLeft />
      <BranchRight />

      {/* Color Palette Dots */}
      <div className="absolute right-[12%] top-[35%] flex flex-row gap-3 opacity-80 z-10 hidden md:flex">
        <div className="w-6 h-6 rounded-full bg-[#2c3524] shadow-sm" />
        <div className="w-6 h-6 rounded-full bg-[#4e583d] shadow-sm" />
        <div className="w-6 h-6 rounded-full bg-[#7b8b60] shadow-sm" />
        <div className="w-6 h-6 rounded-full bg-[#c59b7b] shadow-sm" />
      </div>

      {/* Main Title Block */}
      <div className="w-full max-w-[1200px] mx-auto px-6 pt-10 md:pt-14 flex flex-col items-start z-10 pointer-events-none">
        <h1 
          className="font-normal leading-none tracking-normal text-6xl md:text-8xl select-none transition-all duration-300 h-24"
          style={{ 
            fontFamily: fontToggle ? "'Alex Brush', cursive" : "'Caveat', cursive",
            color: '#4e583d'
          }}
        >
          Happy Birthday!
        </h1>
      </div>

      {/* Scattered Photos Container */}
      <div className="relative w-full max-w-[1200px] mx-auto flex-grow h-[720px] md:h-[820px] px-6 py-4 z-20">
        
        {/* Photo 1: Top Right */}
        <Polaroid 
          src="/friend_photo_2.png" 
          rotation={5} 
          style={{ top: '-6%', right: '5%', zIndex: 10 }}
        />

        {/* Photo 2: Center Left */}
        <Polaroid 
          src="/friend_photo_1.png" 
          rotation={-2} 
          style={{ top: '12%', left: '14%', zIndex: 25 }}
        />

        {/* Photo 3: Bottom Left */}
        <Polaroid 
          src="/friend_photo_4.png" 
          rotation={-12} 
          style={{ top: '38%', left: '-8%', zIndex: 15 }}
        />

        {/* Photo 4: Center (Main friend photo) */}
        <Polaroid 
          src="/friend_photo_3.png" 
          rotation={2} 
          style={{ top: '5%', left: '34%', zIndex: 30 }}
          aspectClass="aspect-[3/4]"
          sizeClass="w-[270px] md:w-[330px]"
        />

        {/* Photo 5: Bottom Right */}
        <Polaroid 
          src="/friend_photo_5.png" 
          rotation={4} 
          style={{ top: '30%', right: '15%', zIndex: 20 }}
        />

      </div>

      {/* Bottom bar with torn paper divider */}
      <div className="relative w-full bg-[#2d3625] text-white py-8 px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-6 z-30">
        {/* Torn paper edge SVG overlay */}
        <svg 
          viewBox="0 0 1440 40" 
          className="absolute top-0 left-0 w-full h-8 -translate-y-[98%] fill-[#2d3625] preserve-aspect-ratio-none select-none pointer-events-none"
          style={{ height: '32px' }}
        >
          <path d="M0,40 L1440,40 L1440,20 C1380,18 1320,25 1260,21 C1200,17 1140,8 1080,12 C1020,16 960,27 900,23 C840,19 780,10 720,12 C660,14 600,24 540,21 C480,18 420,7 360,11 C300,15 240,25 180,21 C120,17 60,8 0,14 Z" />
        </svg>

        {/* Text Details */}
        <div className="flex flex-col items-start pointer-events-none select-none">
          <span 
            className="text-5xl md:text-7xl font-normal text-[#eab4ab]" 
            style={{ fontFamily: "'Caveat', cursive", transform: 'rotate(-2deg)' }}
          >
            Dear Pavi,
          </span>
          <p className="text-[#f5efe2] font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase mt-1 opacity-80" style={{ fontFamily: "'Inter', sans-serif" }}>
            Hope your day is filled with fun and happiness
          </p>
        </div>

        <motion.button
          onClick={onDeeperClick}
          className="relative group pointer-events-auto flex flex-col items-center justify-end self-start md:self-center cursor-pointer pb-2 mt-4 md:mt-0"
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Candles */}
          <div className="flex gap-4 mb-[-2px] z-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Flame */}
                <motion.div 
                  className="w-2 h-3 bg-yellow-400 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] mb-1 origin-bottom shadow-[0_0_8px_rgba(250,204,21,0.8)]"
                  animate={{ scale: [1, 1.1, 1], rotate: [-3, 3, -3] }}
                  transition={{ duration: 0.3 + i*0.1, repeat: Infinity }}
                />
                {/* Candle body */}
                <div className="w-2 h-6 bg-white rounded-sm overflow-hidden relative border border-gray-200">
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,#fca5a5_3px,#fca5a5_6px)]" />
                </div>
              </div>
            ))}
          </div>

          {/* Cake Top Tier */}
          <div className="w-28 h-8 bg-[#f4a2a2] rounded-t-lg border-b-4 border-[#d65a6c] relative z-20 overflow-hidden shadow-[inset_0_4px_10px_rgba(255,255,255,0.4)]" />

          {/* Cake Bottom Tier (Contains Text) */}
          <div className="w-44 h-12 bg-[#f28b8b] rounded-b-lg shadow-xl flex items-center justify-center border-b-4 border-[#b64b4b] relative z-20 overflow-hidden">
             {/* Drip effect from top tier */}
             <div className="absolute top-0 left-0 w-full flex">
                <div className="w-6 h-4 bg-[#f4a2a2] rounded-b-full shadow-sm" />
                <div className="w-8 h-3 bg-[#f4a2a2] rounded-b-full shadow-sm" />
                <div className="w-5 h-5 bg-[#f4a2a2] rounded-b-full shadow-sm" />
                <div className="w-10 h-2 bg-[#f4a2a2] rounded-b-full shadow-sm" />
                <div className="w-7 h-4 bg-[#f4a2a2] rounded-b-full shadow-sm" />
                <div className="w-8 h-2 bg-[#f4a2a2] rounded-b-full shadow-sm" />
             </div>
             
             {/* Button Text */}
             <span className="text-white font-black text-xs uppercase tracking-widest relative z-30 drop-shadow-md mt-2">
               Goooo deeper!
             </span>
          </div>
          
          {/* Plate */}
          <div className="w-52 h-3 bg-stone-200 rounded-full mt-[-4px] shadow-[0_8px_15px_rgba(0,0,0,0.2)] z-10 border-b border-stone-300" />
        </motion.button>

      </div>

    </div>
  );
}
