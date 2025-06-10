'use client';

import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef = null,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom"
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    // Create a single ScrollTrigger instance
    const trigger = ScrollTrigger.create({
      trigger: el,
      scroller,
      start: 'top bottom-=10%',
      end: 'top center',
      scrub: 0.5,
      // For debugging
      // markers: true,
      onEnter: () => {
        // Animation for container rotation
        gsap.to(el, {
          rotate: 0,
          duration: 1.2,
          ease: 'power2.out',
        });

        // Animation for words
        const wordElements = el.querySelectorAll('.word');
        gsap.to(wordElements, {
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          ease: 'power2.out',
        });

        // Blur animation if enabled
        if (enableBlur) {
          gsap.to(wordElements, {
            filter: 'blur(0px)',
            duration: 1,
            stagger: 0.02,
            ease: 'power2.out',
          });
        }
      },
      onLeaveBack: () => {
        // Reset animations when scrolling back up
        gsap.to(el, {
          rotate: baseRotation,
          duration: 0.5,
        });

        const wordElements = el.querySelectorAll('.word');
        gsap.to(wordElements, {
          opacity: baseOpacity,
          duration: 0.5,
        });

        if (enableBlur) {
          gsap.to(wordElements, {
            filter: `blur(${blurStrength}px)`,
            duration: 0.5,
          });
        }
      }
    });

    // Set initial states
    gsap.set(el, { 
      transformOrigin: '0% 50%', 
      rotate: baseRotation 
    });
    
    const wordElements = el.querySelectorAll('.word');
    gsap.set(wordElements, { 
      opacity: baseOpacity,
      filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
      willChange: 'opacity, filter'
    });

    return () => {
      trigger.kill();
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </div>
  );
};

export default ScrollReveal; 