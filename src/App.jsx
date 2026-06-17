import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrapbookLanding from './components/ScrapbookLanding';
import CouponsPage from './components/CouponsPage';
import CouponDetailPage from './components/CouponDetailPage';
import StoryQuiz from './components/StoryQuiz';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [currentView, setCurrentView] = useState('scrapbook');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-black">
      <AnimatePresence>
        {isMobile && (
          <motion.div
            key="mobile-blocker"
            className="absolute inset-0 z-[200] bg-[#faf7f0] flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="bg-white p-10 rounded-3xl shadow-xl border-2 border-[#eab4ab]/30 flex flex-col items-center max-w-sm relative overflow-hidden">
               <h1 className="text-[#c42d3c] text-3xl font-black mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                 Hold up!
               </h1>
               <p className="text-stone-600 text-2xl leading-relaxed" style={{ fontFamily: "'Caveat', cursive" }}>
                 This scrapbook is way too cute and detailed for a tiny phone screen!
                 <br/><br/>
                 Please open this link on a PC or laptop for the full experience.
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isFullscreen && (
          <motion.div
            key="disclaimer"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-[100] bg-[#faf7f0] flex flex-col items-center justify-center p-8"
          >
            <div className="bg-white p-10 md:p-14 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border-2 border-[#eab4ab]/30 flex flex-col items-center max-w-2xl text-center relative overflow-hidden">
               {/* Cute pastel blobs */}
               <div className="absolute top-0 left-0 w-32 h-32 bg-[#eab4ab]/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
               <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#f28b8b]/10 rounded-full blur-2xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

               <h1 className="text-[#c42d3c] text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                 Oops! Full Screen Needed
               </h1>
               
               <p className="text-stone-600 text-lg md:text-2xl leading-relaxed mb-10" style={{ fontFamily: "'Caveat', cursive" }}>
                 To make sure everything looks absolutely perfect and cute, this page needs to be viewed in full screen! 
                 <br/><br/>
                 Please click the button below so we can get this party started!
               </p>
               
               <button
                 onClick={() => {
                   if (document.documentElement.requestFullscreen) {
                     document.documentElement.requestFullscreen().catch(() => {
                       setIsFullscreen(true);
                     });
                   } else {
                     setIsFullscreen(true);
                   }
                 }}
                 className="px-8 py-4 bg-[#f28b8b] hover:bg-[#eab4ab] text-white font-bold text-sm md:text-lg rounded-full tracking-widest uppercase transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
               >
                 Go Full Screen
               </button>
            </div>
          </motion.div>
        )}

        {isFullscreen && !isLoaded && (
          <LoadingScreen onLoadingComplete={() => setIsLoaded(true)} />
        )}
      </AnimatePresence>

      {isLoaded && (
        <>
          <div className="w-full h-full absolute inset-0 z-10">
            <ScrapbookLanding onDeeperClick={() => setCurrentView('coupons')} />
          </div>

      <AnimatePresence>
        {(currentView === 'coupons' || currentView === 'coupon-detail' || currentView === 'quiz') && (
          <motion.div
            key="coupons"
            initial={{ y: '100vh' }}
            animate={{ y: 0 }}
            exit={{ y: '100vh' }}
            transition={{ type: 'spring', damping: 20, stiffness: 30, duration: 2 }}
            className="w-full h-full absolute inset-0 z-20"
          >
            <CouponsPage 
              isActive={currentView === 'coupons'}
              onBackClick={() => setCurrentView('scrapbook')} 
              onSelectCoupon={(coupon) => {
                setSelectedCoupon(coupon);
                // Delay view switch slightly to let the split animation feel complete
                setTimeout(() => {
                  setCurrentView('coupon-detail');
                }, 200);
              }}
            />
          </motion.div>
        )}

        {currentView === 'coupon-detail' && (
          <motion.div
            key="coupon-detail"
            initial={{ clipPath: 'inset(0 50% 0 50%)' }}
            animate={{ clipPath: 'inset(0 0% 0 0%)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0 z-50"
          >
            <CouponDetailPage 
              coupon={selectedCoupon}
              onBackClick={() => setCurrentView('coupons')}
              onMoveOn={() => setCurrentView('quiz')}
            />
          </motion.div>
        )}

        {currentView === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full absolute inset-0 z-[60]"
          >
            <StoryQuiz 
              onCompleteQuiz={() => {
                setSelectedCoupon(null);
                setCurrentView('scrapbook');
              }} 
              onCancelQuiz={() => setCurrentView('coupon-detail')}
            />
          </motion.div>
        )}
      </AnimatePresence>
      </>
      )}
    </div>
  );
}

export default App;
