import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Performance-optimized animation hooks
export const usePerformantScroll = () => {
  useEffect(() => {
    // Optimize scroll performance
    gsap.config({
      force3D: true,
      nullTargetWarn: false,
    });

    // Reduce motion for users who prefer it
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(0.1);
    }

    // Throttle scroll events
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);
};

export const useOptimizedReveal = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px',
      }
    );

    observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, inView };
};

export const useThrottledScroll = (callback: () => void, delay: number = 16) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const throttledCallback = useCallback(() => {
    if (timeoutRef.current) return;
    
    timeoutRef.current = setTimeout(() => {
      callback();
      timeoutRef.current = null;
    }, delay);
  }, [callback, delay]);

  return throttledCallback;
};

// Optimized parallax with transform3d
export const useOptimizedParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;
      
      gsap.set(element, {
        transform: `translate3d(0, ${rate}px, 0)`,
        force3D: true,
      });
    };

    const throttledUpdate = gsap.ticker.add(updateParallax);
    
    return () => {
      gsap.ticker.remove(throttledUpdate);
    };
  }, [speed]);

  return ref;
};

export const useMemoizedAnimation = (
  animationFn: () => void,
  dependencies: any[]
) => {
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!hasAnimated.current) {
      animationFn();
      hasAnimated.current = true;
    }
  }, dependencies);

  return hasAnimated.current;
};
