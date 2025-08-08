import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Luxury Scroll Hook with Premium Animations
export const useLuxuryScroll = () => {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const initSmoothScroll = async () => {
      const Lenis = (await import('lenis')).default;
      
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      
      requestAnimationFrame(raf);
      
      return () => {
        lenis.destroy();
      };
    };
    
    initSmoothScroll();
  }, []);
};

// Premium Reveal Animation Hook
export const usePremiumReveal = (threshold = 0.1) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  const animationVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      scale: 0.95,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: [0.23, 1, 0.32, 1],
        staggerChildren: 0.1
      }
    }
  };

  return { ref, inView, animationVariants };
};

// Luxury Stagger Animation
export const useLuxuryStagger = (delay = 0.1) => {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: 0.2
      }
    }
  };
};

// Premium Parallax Effect
export const useParallaxEffect = (speed = 0.5) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const parallaxAnimation = gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    return () => {
      parallaxAnimation.kill();
    };
  }, [speed]);

  return ref;
};

// Magnetic Mouse Effect Hook
export const useMagneticEffect = (strength = 1) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength * 0.1;
      const deltaY = (e.clientY - centerY) * strength * 0.1;
      
      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
};

// Luxury Text Animation Hook
export const useLuxuryTextReveal = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Animate each character
          const chars = element.textContent?.split('') || [];
          element.innerHTML = chars
            .map((char) => `<span style="display: inline-block; opacity: 0; transform: translateY(30px)">${char === ' ' ? '&nbsp;' : char}</span>`)
            .join('');

          const spans = element.querySelectorAll('span');
          
          gsap.to(spans, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "back.out(1.7)"
          });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// Floating Elements Animation
export const useFloatingAnimation = (duration = 3) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const animation = gsap.to(element, {
      y: "-20px",
      rotation: "2deg",
      duration,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

    return () => {
      animation.kill();
    };
  }, [duration]);

  return ref;
};

// Premium Page Transition
export const usePageTransition = () => {
  const transitionIn = () => {
    return gsap.fromTo(
      '.page-content',
      { 
        opacity: 0, 
        y: 100, 
        scale: 0.95,
        filter: 'blur(20px)'
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.5, 
        ease: "power3.out" 
      }
    );
  };

  const transitionOut = () => {
    return gsap.to('.page-content', {
      opacity: 0,
      y: -100,
      scale: 1.05,
      filter: 'blur(20px)',
      duration: 0.8,
      ease: "power3.in"
    });
  };

  return { transitionIn, transitionOut };
};

// Glass Morphism Hover Effect
export const useGlassMorphism = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => {
      gsap.to(element, {
        backdropFilter: 'blur(30px)',
        background: 'rgba(255, 255, 255, 0.15)',
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        backdropFilter: 'blur(20px)',
        background: 'rgba(255, 255, 255, 0.1)',
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return ref;
};
