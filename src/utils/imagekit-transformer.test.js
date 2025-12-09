import { describe, it } from 'vitest';
import * as fc from 'fast-check';
import {
  isImageKitUrl,
  transform,
  generateLQIP,
  generateSrcSet,
  DEFAULT_BREAKPOINTS
} from './imagekit-transformer';

/**
 * Property-based tests for ImageKit URL Transformer
 * Using fast-check library with minimum 100 iterations per property
 */

describe('ImageKit Transformer', () => {
  /**
   * **Feature: image-performance-optimization, Property 7: CDN URL Detection**
   * *For any* URL string, the `isImageKitUrl` function SHALL return true 
   * if and only if the URL matches the ImageKit domain pattern.
   * **Validates: Requirements 6.1**
   */
  describe('Property 7: CDN URL Detection', () => {
    it('should return true for any valid ImageKit URL', () => {
      // Arbitrary for ImageKit URL paths
      const imagekitPathArb = fc.stringMatching(/^[a-zA-Z0-9_\-/]+\.(jpg|png|webp|svg|gif)$/);
      const imagekitIdArb = fc.stringMatching(/^[a-zA-Z0-9_]+$/);

      fc.assert(
        fc.property(
          imagekitIdArb,
          imagekitPathArb,
          (id, path) => {
            const url = `https://ik.imagekit.io/${id}/${path}`;
            return isImageKitUrl(url) === true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return false for any non-ImageKit URL', () => {
      // Generate random domains that are NOT imagekit.io
      const nonImagekitDomains = fc.constantFrom(
        'example.com',
        'cloudinary.com',
        'amazonaws.com',
        'cdn.example.org',
        'images.unsplash.com'
      );

      fc.assert(
        fc.property(
          nonImagekitDomains,
          fc.webPath(),
          (domain, path) => {
            const url = `https://${domain}${path}`;
            return isImageKitUrl(url) === false;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return false for invalid inputs', () => {
      fc.assert(
        fc.property(
          fc.oneof(
            fc.constant(null),
            fc.constant(undefined),
            fc.constant(''),
            fc.integer(),
            fc.boolean(),
            fc.array(fc.string())
          ),
          (input) => {
            return isImageKitUrl(input) === false;
          }
        ),
        { numRuns: 100 }
      );
    });
  });


  /**
   * **Feature: image-performance-optimization, Property 1: URL Transformation Completeness**
   * *For any* valid ImageKit URL and transformation options, the transformed URL 
   * SHALL contain all required optimization parameters including quality, format, and progressive.
   * **Validates: Requirements 1.2, 3.4, 8.3**
   */
  describe('Property 1: URL Transformation Completeness', () => {
    it('should include quality, format, and progressive parameters for any valid ImageKit URL', () => {
      const imagekitUrlArb = fc.constantFrom(
        'https://ik.imagekit.io/demo/image.jpg',
        'https://ik.imagekit.io/test123/photos/hero.png',
        'https://ik.imagekit.io/mysite/assets/logo.webp'
      );

      const qualityArb = fc.integer({ min: 1, max: 100 });

      fc.assert(
        fc.property(
          imagekitUrlArb,
          qualityArb,
          (url, quality) => {
            const result = transform(url, { quality });
            
            // Should contain quality parameter
            const hasQuality = result.includes(`q-${quality}`);
            // Should contain format auto by default
            const hasFormat = result.includes('f-auto');
            // Should contain progressive by default
            const hasProgressive = result.includes('pr-true');
            
            return hasQuality && hasFormat && hasProgressive;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should preserve the original URL for non-ImageKit URLs', () => {
      const nonImagekitUrls = fc.constantFrom(
        'https://example.com/image.jpg',
        '/assets/img/local.png',
        'https://cdn.other.com/photo.webp'
      );

      fc.assert(
        fc.property(
          nonImagekitUrls,
          (url) => {
            const result = transform(url, { quality: 80 });
            return result === url;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * **Feature: image-performance-optimization, Property 2: LQIP URL Generation**
   * *For any* valid ImageKit URL, the generated LQIP URL SHALL contain 
   * width parameter (w_20 or smaller) and blur parameter (bl_).
   * **Validates: Requirements 2.3**
   */
  describe('Property 2: LQIP URL Generation', () => {
    it('should generate LQIP with small width and blur for any ImageKit URL', () => {
      const imagekitUrlArb = fc.constantFrom(
        'https://ik.imagekit.io/demo/image.jpg',
        'https://ik.imagekit.io/test/photo.png',
        'https://ik.imagekit.io/site/hero.webp'
      );

      fc.assert(
        fc.property(
          imagekitUrlArb,
          (url) => {
            const lqipUrl = generateLQIP(url);
            
            // Should contain small width (20px)
            const hasSmallWidth = lqipUrl.includes('w-20');
            // Should contain blur parameter
            const hasBlur = lqipUrl.includes('bl-');
            
            return hasSmallWidth && hasBlur;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return original URL for non-ImageKit URLs', () => {
      const nonImagekitUrls = fc.constantFrom(
        'https://example.com/image.jpg',
        '/local/image.png',
        'data:image/png;base64,abc'
      );

      fc.assert(
        fc.property(
          nonImagekitUrls,
          (url) => {
            return generateLQIP(url) === url;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * **Feature: image-performance-optimization, Property 4: Srcset Generation Completeness**
   * *For any* image URL and array of breakpoints, the generated srcset string 
   * SHALL contain exactly one entry per breakpoint with correct width descriptor.
   * **Validates: Requirements 4.1**
   */
  describe('Property 4: Srcset Generation Completeness', () => {
    it('should generate srcset with entry for each breakpoint', () => {
      const imagekitUrlArb = fc.constantFrom(
        'https://ik.imagekit.io/demo/image.jpg',
        'https://ik.imagekit.io/test/photo.png'
      );

      // Generate arrays of unique positive breakpoints
      const breakpointsArb = fc.uniqueArray(
        fc.integer({ min: 100, max: 2000 }),
        { minLength: 1, maxLength: 5 }
      );

      fc.assert(
        fc.property(
          imagekitUrlArb,
          breakpointsArb,
          (url, breakpoints) => {
            const srcset = generateSrcSet(url, breakpoints);
            
            // Should have entry for each breakpoint
            const entries = srcset.split(', ');
            
            // Each breakpoint should have a corresponding entry with width descriptor
            return breakpoints.every(bp => 
              entries.some(entry => entry.includes(`${bp}w`))
            );
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should use default breakpoints when none provided', () => {
      const imagekitUrlArb = fc.constantFrom(
        'https://ik.imagekit.io/demo/image.jpg'
      );

      fc.assert(
        fc.property(
          imagekitUrlArb,
          (url) => {
            const srcset = generateSrcSet(url);
            
            // Should have entries for all default breakpoints
            return DEFAULT_BREAKPOINTS.every(bp =>
              srcset.includes(`${bp}w`)
            );
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * **Feature: image-performance-optimization, Property 10: Width Transformation Parameter**
   * *For any* breakpoint value in srcset generation, the corresponding URL 
   * SHALL contain the width transformation parameter w_{breakpoint}.
   * **Validates: Requirements 4.3**
   */
  describe('Property 10: Width Transformation Parameter', () => {
    it('should include width parameter for each breakpoint in srcset', () => {
      const imagekitUrlArb = fc.constantFrom(
        'https://ik.imagekit.io/demo/image.jpg'
      );

      const breakpointArb = fc.integer({ min: 100, max: 2000 });

      fc.assert(
        fc.property(
          imagekitUrlArb,
          breakpointArb,
          (url, breakpoint) => {
            const srcset = generateSrcSet(url, [breakpoint]);
            
            // The URL in srcset should contain w-{breakpoint}
            return srcset.includes(`w-${breakpoint}`);
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
