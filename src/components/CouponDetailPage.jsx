import React from 'react';
import { motion } from 'framer-motion';

export default function CouponDetailPage({ coupon, onBackClick, onMoveOn }) {
  if (!coupon) return null;

  return (
    <motion.div
      className="relative w-full min-h-screen bg-[#601920] flex flex-col items-center justify-center p-8 overflow-hidden z-[9999]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`
      }}
    >
      <h1
        className="text-[#f5efe2] text-3xl md:text-5xl font-black text-center mb-6 tracking-widest uppercase z-10"
        style={{ fontFamily: "'Playfair Display', serif", textShadow: '2px 4px 10px rgba(0,0,0,0.3)' }}
      >
        {coupon.title === "Custom Dare" ? "The Creator must now complete:" : "You Selected:"}
      </h1>

      <p
        className="text-[#f28b8b] text-4xl md:text-7xl text-center max-w-4xl leading-tight font-black italic z-10 mb-12"
        style={{ fontFamily: "'Inter', sans-serif", textShadow: '2px 4px 8px rgba(0,0,0,0.4)' }}
      >
        "{coupon.description}"
      </p>

      <p className="text-white/50 text-xs md:text-sm mt-12 mb-12 text-center z-10 max-w-lg uppercase tracking-widest font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>
        (Anyways, This was just created to rage bait you.)
      </p>

      <motion.button
        onClick={onMoveOn}
        className="px-10 py-4 bg-[#f28b8b] hover:bg-[#eab4ab] text-[#601920] font-black text-lg md:text-xl rounded-full shadow-xl transition-colors uppercase tracking-widest z-10"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        Let's move on
      </motion.button>

      <button
        onClick={onBackClick}
        className="absolute top-6 left-6 text-white/50 hover:text-white font-bold tracking-widest transition-colors z-50 uppercase text-sm"
      >
        Back
      </button>
    </motion.div>
  );
}
