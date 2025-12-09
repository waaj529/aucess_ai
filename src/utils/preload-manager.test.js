import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import {
  preload,
  isPreloaded,
  preloadBatch,
  clearRegistry,
  getPreloadedCount
} from './preload-manager';

/**
 * Property-based tests for Preload Manager
 * Using fast-check library with minimum 100 iterations per property
 */

describe('Preload Manager', () => {
  // Clean up after each test
  beforeEach(() => {
    clearRegistry();
    // Remove any preload links added during tests
    document.querySelectorAll('link[rel="preload"]').forEach(link => link.remove());
  });

  afterEach(() => {
    clearRegistry();
    document.querySelectorAll('link[rel="preload"]').forEach(link => link.remove());
  });

  /**
   * **Feature: image-performance-optimization, Property 9: Preload Link Attributes**
   * *For any* preload configuration, the generated link element SHALL include 
   * `rel="preload"`, `as="image"`, and for the highest priority image, `fetchpriority="high"`.
   * **Validates: Requirements 1.4, 7.2, 7.3**
   */
  describe('Property 9: Preload Link Attributes', () => {
    it('should create link with rel="preload" and as="image" for any valid config', () => {
      // Generate 100 unique URLs and test each one
      const testUrls = Array.from({ length: 100 }, (_, i) => 
        `https://example.com/image-${i}-${Date.now()}.jpg`
      );
      
      testUrls.forEach((url) => {
        const result = preload({ src: url, as: 'image' });
        
        // Should successfully preload
        expect(result).toBe(true);
        
        // Verify it's tracked in registry
        expect(isPreloaded(url)).toBe(true);
        
        // Find the link - jsdom may normalize the URL
        const link = document.querySelector(`link[rel="preload"][href="${url}"]`);
        
        expect(link).toBeTruthy();
        expect(link.rel).toBe('preload');
        expect(link.as).toBe('image');
      });
    });

    it('should set fetchpriority="high" for first image in batch', () => {
      const urlsArb = fc.uniqueArray(
        fc.constantFrom(
          'https://example.com/img1.jpg',
          'https://example.com/img2.jpg',
          'https://example.com/img3.jpg',
          'https://example.com/img4.jpg',
          'https://example.com/img5.jpg'
        ),
        { minLength: 2, maxLength: 5 }
      );

      fc.assert(
        fc.property(
          urlsArb,
          (urls) => {
            clearRegistry();
            document.querySelectorAll('link[rel="preload"]').forEach(l => l.remove());
            
            const configs = urls.map(url => ({ src: url, as: 'image' }));
            preloadBatch(configs);
            
            // First image should have high priority
            const firstLink = document.querySelector(`link[href="${urls[0]}"]`);
            const hasHighPriority = firstLink?.getAttribute('fetchpriority') === 'high';
            
            return hasHighPriority;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should include crossorigin for CDN URLs', () => {
      const cdnUrls = fc.constantFrom(
        'https://ik.imagekit.io/demo/image.jpg',
        'https://cdn.example.com/photo.png',
        'https://images.unsplash.com/photo.webp'
      );

      fc.assert(
        fc.property(
          cdnUrls,
          (url) => {
            clearRegistry();
            document.querySelectorAll('link[rel="preload"]').forEach(l => l.remove());
            
            preload({ src: url, as: 'image' });
            
            const link = document.querySelector(`link[href="${url}"]`);
            const hasCrossOrigin = link?.getAttribute('crossorigin') === 'anonymous';
            
            return hasCrossOrigin;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should not duplicate preload links for same URL', () => {
      const urlArb = fc.constantFrom(
        'https://example.com/image.jpg',
        'https://cdn.test.com/photo.png'
      );

      fc.assert(
        fc.property(
          urlArb,
          fc.integer({ min: 2, max: 10 }),
          (url, attempts) => {
            clearRegistry();
            document.querySelectorAll('link[rel="preload"]').forEach(l => l.remove());
            
            // Try to preload same URL multiple times
            for (let i = 0; i < attempts; i++) {
              preload({ src: url, as: 'image' });
            }
            
            // Should only have one link
            const links = document.querySelectorAll(`link[href="${url}"]`);
            return links.length === 1;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should track preloaded URLs correctly', () => {
      const urlsArb = fc.uniqueArray(
        fc.constantFrom(
          'https://example.com/a.jpg',
          'https://example.com/b.jpg',
          'https://example.com/c.jpg',
          'https://example.com/d.jpg'
        ),
        { minLength: 1, maxLength: 4 }
      );

      fc.assert(
        fc.property(
          urlsArb,
          (urls) => {
            clearRegistry();
            document.querySelectorAll('link[rel="preload"]').forEach(l => l.remove());
            
            urls.forEach(url => preload({ src: url, as: 'image' }));
            
            // All URLs should be marked as preloaded
            const allPreloaded = urls.every(url => isPreloaded(url));
            // Count should match
            const countMatches = getPreloadedCount() === urls.length;
            
            return allPreloaded && countMatches;
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
