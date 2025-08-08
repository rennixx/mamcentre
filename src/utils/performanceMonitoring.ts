// Core Web Vitals tracking and performance monitoring

interface PerformanceMetrics {
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  fcp: number | null; // First Contentful Paint
  ttfb: number | null; // Time to First Byte
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null
  };

  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeTracking();
  }

  private initializeTracking() {
    // Track Largest Contentful Paint (LCP)
    this.trackLCP();
    
    // Track First Input Delay (FID)
    this.trackFID();
    
    // Track Cumulative Layout Shift (CLS)
    this.trackCLS();
    
    // Track First Contentful Paint (FCP)
    this.trackFCP();
    
    // Track Time to First Byte (TTFB)
    this.trackTTFB();
    
    // Track resource loading performance
    this.trackResourcePerformance();
    
    // Send metrics when page is hidden/unloaded
    this.setupReporting();
  }

  private trackLCP() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        
        this.metrics.lcp = lastEntry.startTime;
        this.logMetric('LCP', lastEntry.startTime);
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('LCP tracking not supported:', error);
    }
  }

  private trackFID() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.metrics.fid = entry.processingStart - entry.startTime;
          this.logMetric('FID', this.metrics.fid);
        });
      });

      observer.observe({ entryTypes: ['first-input'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('FID tracking not supported:', error);
    }
  }

  private trackCLS() {
    try {
      let clsValue = 0;
      let sessionValue = 0;
      let sessionEntries: any[] = [];

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

            if (sessionValue && 
                entry.startTime - lastSessionEntry.startTime < 1000 &&
                entry.startTime - firstSessionEntry.startTime < 5000) {
              sessionValue += entry.value;
              sessionEntries.push(entry);
            } else {
              sessionValue = entry.value;
              sessionEntries = [entry];
            }

            if (sessionValue > clsValue) {
              clsValue = sessionValue;
              this.metrics.cls = clsValue;
              this.logMetric('CLS', clsValue);
            }
          }
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('CLS tracking not supported:', error);
    }
  }

  private trackFCP() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
            this.logMetric('FCP', entry.startTime);
          }
        });
      });

      observer.observe({ entryTypes: ['paint'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('FCP tracking not supported:', error);
    }
  }

  private trackTTFB() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.entryType === 'navigation') {
            this.metrics.ttfb = entry.responseStart - entry.requestStart;
            this.logMetric('TTFB', this.metrics.ttfb);
          }
        });
      });

      observer.observe({ entryTypes: ['navigation'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('TTFB tracking not supported:', error);
    }
  }

  private trackResourcePerformance() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.duration > 1000) { // Resources taking more than 1s
            console.warn('Slow resource detected:', {
              name: entry.name,
              duration: entry.duration,
              size: entry.transferSize || 'unknown'
            });
          }
        });
      });

      observer.observe({ entryTypes: ['resource'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('Resource tracking not supported:', error);
    }
  }

  private logMetric(name: string, value: number) {
    const status = this.getMetricStatus(name, value);
    const color = status === 'good' ? 'green' : status === 'needs-improvement' ? 'orange' : 'red';
    
    console.log(
      `%c${name}: ${value.toFixed(2)}ms (${status})`,
      `color: ${color}; font-weight: bold;`
    );
  }

  private getMetricStatus(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      FCP: { good: 1800, poor: 3000 },
      TTFB: { good: 800, poor: 1800 }
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  private setupReporting() {
    const sendMetrics = () => {
      const metricsToSend = { ...this.metrics };
      
      // Filter out null values
      const filteredMetrics = Object.entries(metricsToSend)
        .filter(([_, value]) => value !== null)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

      if (Object.keys(filteredMetrics).length > 0) {
        this.reportMetrics(filteredMetrics);
      }
    };

    // Send metrics when page is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        sendMetrics();
      }
    });

    // Send metrics on page unload
    window.addEventListener('beforeunload', sendMetrics);

    // Send metrics after 10 seconds (for long-running sessions)
    setTimeout(sendMetrics, 10000);
  }

  private async reportMetrics(metrics: Record<string, number>) {
    try {
      // In a real application, you would send this to your analytics service
      console.log('Performance Metrics Report:', metrics);
      
      // Example: Send to analytics endpoint
      // await fetch('/api/analytics/performance', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     metrics,
      //     timestamp: Date.now(),
      //     url: window.location.href,
      //     userAgent: navigator.userAgent
      //   })
      // });
      
      // Store in localStorage for debugging
      localStorage.setItem('mam-center-performance', JSON.stringify({
        metrics,
        timestamp: Date.now(),
        url: window.location.href
      }));
    } catch (error) {
      console.warn('Failed to report metrics:', error);
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public generateReport(): string {
    const metrics = this.getMetrics();
    let report = '\n=== Performance Report ===\n';
    
    Object.entries(metrics).forEach(([key, value]) => {
      if (value !== null) {
        const status = this.getMetricStatus(key.toUpperCase(), value);
        report += `${key.toUpperCase()}: ${value.toFixed(2)}ms (${status})\n`;
      }
    });
    
    report += '\n=== Recommendations ===\n';
    
    if (metrics.lcp && metrics.lcp > 2500) {
      report += '• Optimize largest contentful paint by reducing image sizes\n';
    }
    
    if (metrics.fid && metrics.fid > 100) {
      report += '• Reduce first input delay by optimizing JavaScript\n';
    }
    
    if (metrics.cls && metrics.cls > 0.1) {
      report += '• Improve layout stability by setting image dimensions\n';
    }
    
    return report;
  }

  public destroy() {
    this.observers.forEach(observer => {
      try {
        observer.disconnect();
      } catch (error) {
        console.warn('Error disconnecting observer:', error);
      }
    });
    this.observers = [];
  }
}

// Initialize performance monitoring
let performanceMonitor: PerformanceMonitor | null = null;

export const initializePerformanceMonitoring = (): PerformanceMonitor => {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
  }
  return performanceMonitor;
};

export const getPerformanceReport = (): string => {
  if (performanceMonitor) {
    return performanceMonitor.generateReport();
  }
  return 'Performance monitoring not initialized';
};

export const destroyPerformanceMonitoring = (): void => {
  if (performanceMonitor) {
    performanceMonitor.destroy();
    performanceMonitor = null;
  }
};

// Auto-initialize in browser environment
if (typeof window !== 'undefined') {
  // Wait for page load before starting monitoring
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => initializePerformanceMonitoring(), 100);
    });
  } else {
    setTimeout(() => initializePerformanceMonitoring(), 100);
  }
}
