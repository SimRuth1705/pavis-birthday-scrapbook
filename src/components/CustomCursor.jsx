import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for zero-gravity floating trail
  const springConfig = { damping: 28, stiffness: 280, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device matches desktop/mouse pointer
    const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasMouse) return;

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      // Offset slightly to align pointing tip
      mouseX.set(e.clientX - 2);
      mouseY.set(e.clientY - 2);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target) {
        // Detect if hovered element is a clickable control
        const isClickable = target.closest('button, a, [role="button"], input, select, textarea, .cursor-pointer, [onclick]');
        setIsHovering(!!isClickable);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-7 h-7 pointer-events-none z-[9999] select-none"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      <motion.img
        key={isHovering ? 'hover' : 'default'}
        src={isHovering ? '/Pink_Cutecore_pointer.png' : '/Pink_Cutecore_cursor.png'}
        alt="Custom   sor"
        className="w-full h-full object-contain"
        animate={{
          scale: isClicked ? 0.78 : 1,
          rotate: isClicked ? -10 : 0,
        }}
        transition={{ type: 'spring', stiffness: 550, damping: 14 }}
      />
    </motion.div>
  );
}
