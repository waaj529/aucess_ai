import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { generateLQIP, isImageKitUrl } from '../utils/imagekit-transformer';

/**
 * Custom hook for managing image loading states
 * Handles placeholder and full image loading sequence with Intersection Observer
 * 
 * @param {Object} options
 * @param {string} options.src - Image source URL
 * @param {boolean} [options.priority=false] - If true, load immediately without lazy loading
 * @param {string} [options.placeholder='blur'] - Placeholder type ('blur' or 'empty')
 * @param {number} [options.rootMargin=200] - Intersection Observer root margin in pixels
 * @returns {Object} Loading state and handlers
 */
export function useImageLoader({
  src,
  priority = false,
  placeholder = 'blur',
  rootMargin = 200
}) {
  // Derive initial status from priority
  const getInitialStatus = useCallback(() => priority ? 'loading' : 'idle', [priority]);
  
  // Loading states
  const [status, setStatus] = useState(getInitialStatus);
  const [isInView, setIsInView] = useState(priority);
  const [error, setError] = useState(null);
  // Track current src for comparison
  const [currentSrc, setCurrentSrc] = useState(src);
  
  // Refs
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  // Generate LQIP URL for blur placeholder
  const placeholderUrl = useMemo(() => {
    return placeholder === 'blur' && isImageKitUrl(src)
      ? generateLQIP(src)
      : null;
  }, [placeholder, src]);

  // Handle src changes by comparing with tracked src
  // This runs during render but only updates state when src actually changes
  if (currentSrc !== src) {
    setCurrentSrc(src);
    setStatus(priority ? 'loading' : 'idle');
    setError(null);
    if (!priority) {
      setIsInView(false);
    }
  }

  // Intersection Observer setup for lazy loading
  useEffect(() => {
    // Skip if priority or already in view
    if (priority || isInView) return;

    const container = containerRef.current;
    if (!container) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setStatus('loading');
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: `${rootMargin}px`,
        threshold: 0.01
      }
    );

    observerRef.current.observe(container);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority, isInView, rootMargin]);

  // Handle successful image load
  const handleLoad = useCallback(() => {
    setStatus('loaded');
    setError(null);
  }, []);

  // Handle image load error
  const handleError = useCallback((e) => {
    setStatus('error');
    setError(e?.message || 'Failed to load image');
  }, []);

  // Reset function for external use
  const reset = useCallback(() => {
    setStatus(priority ? 'loading' : 'idle');
    setError(null);
    if (!priority) {
      setIsInView(false);
    }
  }, [priority]);

  return {
    // State
    status,
    isLoaded: status === 'loaded',
    isLoading: status === 'loading',
    isError: status === 'error',
    isInView,
    error,
    placeholderUrl,
    
    // Refs
    containerRef,
    
    // Handlers
    handleLoad,
    handleError,
    reset
  };
}

export default useImageLoader;
