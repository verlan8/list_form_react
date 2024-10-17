import React, { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { IconButton } from '@mui/material';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // behavior: 'smooth' doesn't work on edge
  const smoothScroll = () => {
    const scrollToTop = (duration) => {
      const start = window.scrollY;
      const end = 0;
      const change = end - start;
      const increment = 20;
  
      let currentTime = 0;
  
      const animateScroll = () => {
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start, change, duration);
        window.scrollTo(0, val);
        if (currentTime < duration) {
          requestAnimationFrame(animateScroll);
        }
      };
  
      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };
  
      animateScroll();
    };
  
    scrollToTop(600); // длительность анимации 600 мс
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

//scroll-to-top classes: fixed, bottom:0, right:0
  return (
    <div className="scroll-to-top">
      {isVisible && (
        <IconButton onClick={smoothScroll}>
            <FaChevronUp />
        </IconButton>
      )}
    </div>
  );
}