'use client';

import { useCallback, useEffect } from 'react';

import { usePathname } from 'next/navigation';

interface MetricEvent {
  type: string;
  value?: number;
  labels?: Record<string, string>;
}

export function useMetrics() {
  const pathname = usePathname();

  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const duration = performance.now() - startTime;
      sendMetric({
        type: 'page_render_time',
        value: duration,
        labels: { page: pathname },
      });
    };
  }, [pathname]);

  const trackEvent = useCallback(async (event: MetricEvent) => {
    return sendMetric(event);
  }, []);

  const trackProductView = useCallback(async (productId: string, category?: string) => {
    return sendMetric({
      type: 'product_view',
      labels: { product_id: productId, category: category || 'unknown' },
    });
  }, []);

  const trackCartOperation = useCallback(async (operation: 'add' | 'remove' | 'clear') => {
    return sendMetric({
      type: 'cart_operation',
      labels: { operation },
    });
  }, []);

  const trackOrder = useCallback(async (status: string, value?: number) => {
    return sendMetric({
      type: 'order',
      value,
      labels: { status },
    });
  }, []);

  return {
    trackEvent,
    trackProductView,
    trackCartOperation,
    trackOrder,
  };
}

async function sendMetric(event: MetricEvent) {
  try {
    await fetch('/api/metrics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
      keepalive: true,
    }).catch(() => {});
  } catch (error) {
    console.debug('Metrics tracking failed:', error);
  }
}

export function useWebVitals() {
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          sendMetric({
            type: 'web_vital_lcp',
            value: lastEntry.startTime,
            labels: { page: window.location.pathname },
          });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            sendMetric({
              type: 'web_vital_fid',
              value: entry.processingStart - entry.startTime,
              labels: { page: window.location.pathname },
            });
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        const sendCLS = () => {
          sendMetric({
            type: 'web_vital_cls',
            value: clsValue,
            labels: { page: window.location.pathname },
          });
        };
        window.addEventListener('pagehide', sendCLS);

        return () => {
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
          window.removeEventListener('pagehide', sendCLS);
        };
      } catch (e) {
        console.debug('Web Vitals tracking failed:', e);
      }
    }
  }, []);
}
