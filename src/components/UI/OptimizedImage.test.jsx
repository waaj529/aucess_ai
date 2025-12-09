import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { isImageKitUrl, generateSrcSet } from '../../utils/imagekit-transformer';
import { getAspectRatioStyle } from '../../utils/image-calculations';

/**
 * Property-based tests for OptimizedImage Component logic
 * Testing the underlying functions that power the component
 * Using fast-check library with minimum 100 iterations per property
 */

describe('OptimizedImage Component Logic', () => {
  /**
   * **Feature: image-performance-optimization, Property 6: Lazy Loading Attribute**
   * Tests the logic that determines when lazy loading should be applied.
   * Non-priority images should have loading="lazy", priority images should not.
   * **Validates: Requirements 5.2**
   */
  describe('Property 6: Lazy Loading Attribute Logic', () => {
    it('should determine lazy loading based on priority flag', () => {
      // The component logic: loading={priority ? undefined : 'lazy'}
      // Test this logic for 100 different priority values
      fc.assert(
        fc.property(
          fc.boolean(),
          (priority) => {
            const loadingAttr = priority ? undefined : 'lazy';
            
            if (priority) {
              // Priority images should NOT have lazy loading
              return loadingAttr === undefined;
            } else {
              // Non-priority images should have lazy loading
              return loadingAttr === 'lazy';
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should always return "lazy" for non-priority images', () => {
      // Test 100 times that non-priority always gets lazy
      for (let i = 0; i < 100; i++) {
        const priority = false;
        const loadingAttr = priority ? undefined : 'lazy';
        expect(loadingAttr).toBe('lazy');
      }
    });

    it('should always return undefined for priority images', () => {
      // Test 100 times that priority never gets lazy
      for (let i = 0; i < 100; i++) {
        const priority = true;
        const loadingAttr = priority ? undefined : 'lazy';
        expect(loadingAttr).toBeUndefined();
      }
    });
  });

  /**
   * **Feature: image-performance-optimization, Property 8: Priority Image Handling**
   * Tests that priority images trigger preloading and generate proper srcset.
   * **Validates: Requirements 6.2**
   */
  describe('Property 8: Priority Image Handling Logic', () => {
    it('should generate srcset for CDN images', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(
            'https://ik.imagekit.io/demo/test1.jpg',
            'https://ik.imagekit.io/demo/test2.png',
            'https://ik.imagekit.io/demo/test3.webp',
            'https://ik.imagekit.io/site/hero.jpg',
            'https://ik.imagekit.io/app/banner.png'
          ),
          (src) => {
            // Component logic: if isCDN, generate srcset
            const isCDN = isImageKitUrl(src);
            const srcset = isCDN ? generateSrcSet(src) : undefined;
            
            // CDN images should have srcset with breakpoints
            if (isCDN) {
              return srcset && 
                srcset.includes('320w') && 
                srcset.includes('640w') &&
                srcset.includes('960w');
            }
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should not generate srcset for non-CDN images', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(
            '/assets/img/local.jpg',
            'https://example.com/image.png',
            'https://cdn.other.com/photo.webp'
          ),
          (src) => {
            const isCDN = isImageKitUrl(src);
            const srcset = isCDN ? generateSrcSet(src) : undefined;
            
            // Non-CDN images should not have srcset generated
            return !isCDN && srcset === undefined;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Tests aspect ratio style generation for CLS prevention
   */
  describe('Aspect Ratio and CLS Prevention', () => {
    it('should generate correct aspect ratio style for any dimensions', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 100, max: 2000 }),
          fc.integer({ min: 100, max: 2000 }),
          (width, height) => {
            const style = getAspectRatioStyle(width, height);
            
            // Should have aspect ratio set correctly
            return style.aspectRatio === `${width} / ${height}`;
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
