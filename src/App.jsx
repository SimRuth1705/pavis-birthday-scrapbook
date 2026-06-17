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
        {!isLoaded && (
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
