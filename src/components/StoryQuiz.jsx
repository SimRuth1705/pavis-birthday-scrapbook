import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS = [
  "What is the last thing you bought online?",
  "Name a fictional villain or annoying character.",
  "What is your absolute least favorite vegetable?",
  "What is a slang word or phrase you use too much?",
  "Name a place you completely avoid going to.",
  "What is the weirdest app currently on your phone?",
  "What is a movie you think is completely overrated?",
  "Name a musical instrument you have no idea how to play.",
  "What is your favorite comfort food when you're lazy?",
  "What is a minor inconvenience that ruins your entire day?",
  "Name a historical figure or famous scientist.",
  "Look at your phone: what hour is it right now?"
];

export default function StoryQuiz({ onCompleteQuiz, onCancelQuiz }) {
  const [step, setStep] = useState(0); // 0 to 11 are questions, 12 is final story, 13 is card
  const [answers, setAnswers] = useState(Array(12).fill(""));
  const [currentInput, setCurrentInput] = useState("");
  const [showInterlude, setShowInterlude] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isRidingAway, setIsRidingAway] = useState(false);

  const handleBack = () => {
    setDirection(-1);
    if (step === 0) {
      if (onCancelQuiz) onCancelQuiz();
    } else {
      setStep(step - 1);
      setCurrentInput(answers[step - 1] || "");
    }
  };

  const handleNext = () => {
    if (!currentInput.trim()) return;
    setDirection(1);

    const newAnswers = [...answers];
    newAnswers[step] = currentInput.trim();
    setAnswers(newAnswers);
    setCurrentInput("");

    if (step === 3 || step === 7) {
      // Show interlude after Q4 (index 3) and Q8 (index 7)
      setShowInterlude(true);
    } else {
      setStep(step + 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

  const continueFromInterlude = () => {
    setShowInterlude(false);
    setStep(step + 1);
  };

  if (showInterlude) {
    const isFirstInterlude = step === 3;
    const imgSrc = isFirstInterlude ? "/friend_photo_10.png" : "/friend_photo_11.png";
    return (
      <motion.div 
        key="interlude"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="w-full min-h-screen bg-[#eab4ab] flex flex-col items-center justify-center p-6 text-[#601920] z-[9999] absolute inset-0"
      >
        <h2 className="text-3xl md:text-5xl mb-8 font-black tracking-widest text-center" style={{ fontFamily: "'Playfair Display', serif", textShadow: '1px 2px 5px rgba(0,0,0,0.1)' }}>
          {isFirstInterlude ? "HOLD UP." : "WAIT A MINUTE."}
        </h2>
        
        {/* Normal, straight image */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8 rounded-xl overflow-hidden border-8 border-white shadow-xl">
          <img src={imgSrc} alt="Interlude Break" className="w-full h-full object-cover" />
        </div>

        <p className="text-xl md:text-2xl mb-12 text-center font-medium opacity-80" style={{ fontFamily: "'Inter', sans-serif" }}>
          Just making sure you're still paying attention...
        </p>

        <button 
          onClick={continueFromInterlude}
          className="px-10 py-4 bg-[#c42d3c] hover:bg-[#a22330] text-white font-bold rounded-full shadow-lg transition-colors uppercase tracking-widest text-lg"
        >
          Carry On
        </button>
      </motion.div>
    );
  }

  if (step === 12) {
    return (
      <motion.div 
        key="story"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-screen bg-[#f5efe2] flex flex-col items-center justify-center p-4 z-[9999] absolute inset-0 overflow-hidden"
      >
        <div className="w-full max-w-4xl max-h-full bg-white p-6 md:p-10 rounded-xl shadow-2xl border-t-8 border-[#c42d3c] flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-4xl font-black mb-1 text-[#601920] uppercase tracking-widest border-b-2 border-stone-200 pb-2 text-center flex-shrink-0" style={{ fontFamily: "'Playfair Display', serif" }}>
            Official Incident Report
          </h1>
          <p className="text-xs md:text-sm text-stone-500 mb-4 md:mb-6 text-center uppercase tracking-widest font-bold flex-shrink-0">
            Confidential Document #80085
          </p>
          
          <div className="flex-1 overflow-y-auto flex flex-col justify-center">
            <p className="text-base md:text-xl leading-relaxed text-stone-800 text-justify" style={{ fontFamily: "'Inter', sans-serif" }}>
              An internet security report confirms that a package containing <strong className="text-[#c42d3c] uppercase underline decoration-wavy decoration-[#c42d3c]/30">{answers[0]}</strong> was stolen by someone disguised as <strong className="text-[#c42d3c] uppercase underline decoration-wavy decoration-[#c42d3c]/30">{answers[1]}</strong>. Police discovered the suspect hiding behind a giant pile of <strong className="text-[#c42d3c] uppercase underline decoration-wavy decoration-[#c42d3c]/30">{answers[2]}</strong>, repeatedly yelling "<strong className="text-[#c42d3c] uppercase underline decoration-wavy decoration-[#c42d3c]/30">{answers[3]}</strong>!" to evade capture. 
              <br/><br/>
              The suspect fled toward <strong className="text-[#c42d3c] uppercase underline decoration-wavy decoration-[#c42d3c]/30">{answers[4]}</strong>, using <strong className="text-[#c42d3c] uppercase underline decoration-wavy decoration-[#c42d3c]/30">{answers[5]}</strong> to navigate the streets. During interrogation, she confessed that her ultimate evil master plan was to force the entire world to watch <strong className="text-[#c42d3c] uppercase underline decoration-wavy decoration-[#c42d3c]/30">{answers[6]}</strong> while she aggressively played <strong className="text-[#c42d3c] uppercase underline decoration-wavy decoration-[#c42d3c]/30">{answers[7]}</strong>. 
              <br/><br/>
              To make amends for her digital crimes, she was sentenced to survive solely on <strong className="text-[#c42d3c] uppercase underline decoration-wavy decoration-[#c42d3c]/30">{answers[8]}</strong> while dealing with eternal <strong className="text-[#c42d3c] uppercase underline decoration-wavy decoration-[#c42d3c]/30">{answers[9]}</strong>. She claims she was possessed by the ghost of <strong className="text-[#c42d3c] uppercase underline decoration-wavy decoration-[#c42d3c]/30">{answers[10]}</strong>, but court adjourned because it was already <strong className="text-[#c42d3c] uppercase underline decoration-wavy decoration-[#c42d3c]/30">{answers[11]}</strong> and everyone wanted to log off.
            </p>
          </div>

          <div className="mt-6 md:mt-8 flex justify-center flex-shrink-0">
            <button 
              onClick={() => setStep(13)}
              className="px-8 py-3 md:px-10 md:py-4 bg-[#c42d3c] hover:bg-[#a22330] text-white font-bold rounded-full shadow-lg transition-colors uppercase tracking-widest text-sm md:text-lg"
            >
              Open Your Card
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (step === 13) {
    return (
      <motion.div 
        key="birthday-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full min-h-screen bg-[#faf7f0] flex flex-col items-center justify-center p-6 z-[9999] absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`
        }}
      >
        <div className="relative w-full max-w-2xl bg-[#fffcfb] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-[3px] border-[#f28b8b] flex flex-col overflow-hidden">
          
          {/* Top Header - Pink Strip like Malaysian License */}
          <div className="w-full bg-[#f28b8b] py-3 px-6 flex justify-between items-center text-white">
            <h1 className="text-xl md:text-2xl font-black tracking-widest uppercase shadow-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              Lesen Hari Jadi Malaysia
            </h1>
            <span className="text-xl font-black bg-white/20 px-2 py-1 rounded">JPJ</span>
          </div>

          {/* Card Body */}
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start relative">
             {/* Security pattern background */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg, #c42d3c 0, #c42d3c 1px, transparent 1px, transparent 10px)" }}></div>

             {/* Photo on Left */}
             <div className="w-40 h-56 md:w-56 md:h-72 border-[6px] border-white shadow-lg bg-stone-100 flex-shrink-0 z-10 overflow-hidden rounded-lg relative transform -rotate-2">
                <img src="/friend_photo_12.png" alt="Pavi" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 w-full bg-white/90 py-1 text-center">
                   <span className="text-[10px] font-black tracking-widest text-[#c42d3c] uppercase">Kelas: B-DAY</span>
                </div>
             </div>

             {/* Details on Right */}
             <div className="flex flex-col flex-1 z-10 w-full">
               <div className="mb-4 border-b-2 border-stone-100 pb-2">
                 <label className="text-[10px] uppercase font-bold tracking-widest text-[#f28b8b]">Nama / Name</label>
                 <p className="text-2xl md:text-3xl font-black text-[#601920] uppercase leading-none mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                   Pavi
                 </p>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-4">
                 <div className="border-b-2 border-stone-100 pb-2">
                   <label className="text-[10px] uppercase font-bold tracking-widest text-[#f28b8b]">No. Kad Pengenalan</label>
                   <p className="text-lg font-bold text-stone-700 font-mono mt-1">BFF-100%</p>
                 </div>
                 <div className="border-b-2 border-stone-100 pb-2">
                   <label className="text-[10px] uppercase font-bold tracking-widest text-[#f28b8b]">Sah Sehingga</label>
                   <p className="text-lg font-bold text-stone-700 mt-1 uppercase">Selamanya</p>
                 </div>
               </div>

               <p className="text-stone-600 text-sm md:text-base leading-relaxed italic mt-2" style={{ fontFamily: "'Caveat', cursive" }}>
                 Happy Birthday! You are an absolutely incredible friend. Here is to many more adventures, laughs, and making amazing memories together.
               </p>

               <div className="mt-8 flex justify-end">
                 <button 
                   onClick={() => setIsRidingAway(true)}
                   className="px-6 py-2 bg-[#f5efe2] hover:bg-[#eab4ab] text-[#601920] font-bold rounded-full shadow-sm transition-colors uppercase tracking-widest text-xs border border-[#eab4ab]/50"
                 >
                   Thank You
                 </button>
               </div>
             </div>
          </div>
        </div>

        {/* Bike riding away animation */}
        {isRidingAway && (
          <motion.div 
            className="absolute inset-0 z-[10000] pointer-events-none flex items-center whitespace-nowrap"
            initial={{ backgroundColor: 'rgba(250, 247, 240, 0)' }}
            animate={{ backgroundColor: 'rgba(250, 247, 240, 0.9)' }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ x: '100vw' }}
              animate={{ x: '-250vw' }}
              transition={{ duration: 2.5, ease: "linear" }}
              onAnimationComplete={() => {
                setStep(14);
                setIsRidingAway(false);
              }}
              className="absolute top-1/2 -translate-y-1/2 flex items-center whitespace-nowrap will-change-transform"
            >
              <img 
                src="/bike.png" 
                alt="Bike" 
                className="w-48 md:w-64 lg:w-80 object-contain z-50 relative drop-shadow-sm" 
                style={{ transform: 'scaleX(-3.5) scaleY(3.5)' }}
              />
              <span className="text-[#c42d3c] font-black text-5xl md:text-7xl lg:text-[120px] italic tracking-widest relative z-40 ml-12 drop-shadow-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                Majaaaaaaaaaaaaaaaaaaaaa
              </span>
            </motion.div>
          </motion.div>
        )}

      </motion.div>
    );
  }

  if (step === 14) {
    return (
      <motion.div 
        key="final-message"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full bg-[#faf7f0] flex flex-col items-center justify-center relative overflow-hidden"
      >
        {/* Floating cute aesthetic elements */}
        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[20%] w-32 h-32 bg-[#f4a2a2] rounded-full blur-[40px] opacity-40 pointer-events-none"
        />
        <motion.div
          animate={{ y: [15, -15, 15], rotate: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[20%] w-48 h-48 bg-[#eab4ab] rounded-full blur-[60px] opacity-40 pointer-events-none"
        />

        <div className="z-10 flex flex-col items-center justify-center text-center px-4">
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", type: "spring", bounce: 0.5 }}
            className="text-7xl md:text-9xl text-[#c42d3c] mb-4"
            style={{ fontFamily: "'Alex Brush', cursive", textShadow: "2px 4px 15px rgba(196, 45, 60, 0.15)" }}
          >
            mama is mine
          </motion.h1>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-16 h-[2px] bg-[#eab4ab]/50 rounded-full" />
            <p className="text-stone-500 font-bold text-xs md:text-sm tracking-[0.3em] uppercase mt-4">
              Forever and Always
            </p>
          </motion.div>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          onClick={onCompleteQuiz}
          className="absolute bottom-10 px-8 py-3 bg-transparent text-stone-400 hover:text-[#c42d3c] font-bold text-[10px] uppercase tracking-widest rounded-full transition-colors z-20"
        >
          Return to Scrapbook
        </motion.button>
      </motion.div>
    );
  }

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 })
  };

  return (
    <div className="w-full min-h-screen bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-6 z-[9999] absolute inset-0 overflow-hidden">
      
      {/* Static Progress Bar */}
      <div className="absolute top-8 left-0 w-full px-8 md:px-24 z-20">
        <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#c42d3c] transition-all duration-500 ease-out" 
            style={{ width: `${(step / 12) * 100}%` }} 
          />
        </div>
        <p className="text-right text-stone-400 font-bold mt-2 text-sm uppercase tracking-widest">
          Question {step + 1} of 12
        </p>
      </div>

      <AnimatePresence initial={false} custom={direction}>
        <motion.div 
          key={`question-${step}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full max-w-2xl flex flex-col items-center absolute px-6"
        >
          <h2 
            className="text-3xl md:text-5xl text-center text-[#f5efe2] font-bold leading-tight mb-12" 
            style={{ fontFamily: "'Playfair Display', serif", textShadow: '1px 2px 5px rgba(0,0,0,0.3)' }}
          >
            {QUESTIONS[step]}
          </h2>

          <input 
            type="text"
            autoFocus
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer..."
            className="w-full bg-transparent border-b-4 border-[#eab4ab] focus:border-[#f28b8b] text-2xl md:text-4xl text-center text-white placeholder-white/50 outline-none pb-4 transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />

          <div className="flex gap-4 mt-12 w-full max-w-sm justify-center">
            <button 
              onClick={handleBack}
              className="flex-1 px-4 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full shadow-lg transition-colors uppercase tracking-widest text-lg border border-white/30"
            >
              Back
            </button>
            <button 
              onClick={handleNext}
              disabled={!currentInput.trim()}
              className="flex-1 px-4 py-4 bg-[#f28b8b] disabled:bg-white/10 disabled:text-white/30 disabled:border-transparent disabled:cursor-not-allowed hover:bg-[#eab4ab] text-[#601920] font-bold rounded-full shadow-xl transition-colors uppercase tracking-widest text-lg"
            >
              Next
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
