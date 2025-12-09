import { describe, it } from 'vitest';
import * as fc from 'fast-check';
import {
  calculateDPRWidth,
  calculateAspectRatio,
  generateAspectRatioCSS,
  getAspectRatioStyle
} from './image-calculations';

/**
 * Property-based tests for Image Calculations
 * Using fast-check library with minimum 100 iterations per property
 */

describe('Image Calculations', () => {
  /**
   * **Feature: image-performance-optimization, Property 5: DPR-Aware Size Calculation**
   * *For any* display width and device pixel ratio (DPR) where both are positive numbers,
   * the calculated image width SHALL equal display width multiplied by DPR.
   * **Validates: Requirements 4.4**
   */
  describe('Property 5: DPR-Aware Size Calculation', () => {
    it('should calculate width as displayWidth * DPR for any positive values', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 4000 }),  // displayWidth
          fc.double({ min: 1, max: 4, noNaN: true }), // DPR (1x to 4x)
          (displayWidth, dpr) => {
            const result = calculateDPRWidth(displayWidth, dpr);
            const expected = Math.round(displayWidth * dpr);
            
            return result === expected;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return 0 for invalid display width', () => {
      fc.assert(
        fc.property(
          fc.oneof(
            fc.constant(0),
            fc.constant(-1),
            fc.integer({ min: -1000, max: 0 })
          ),
          fc.double({ min: 1, max: 4, noNaN: true }),
          (invalidWidth, dpr) => {
            return calculateDPRWidth(invalidWidth, dpr) === 0;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should use default DPR of 1 when not provided', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 4000 }),
          (displayWidth) => {
            // In jsdom, window.devicePixelRatio defaults to 1
            const result = calculateDPRWidth(displayWidth);
            return result === displayWidth;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * **Feature: image-performance-optimization, Property 3: Aspect Ratio Preservation**
   * *For any* width and height pair where both values are positive numbers,
   * the calculated aspect ratio SHALL equal width divided by height.
   * **Validates: Requirements 2.4, 6.3**
   */
  describe('Property 3: Aspect Ratio Preservation', () => {
    it('should calculate aspect ratio as width / height for any positive values', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 10000 }),  // width
          fc.integer({ min: 1, max: 10000 }),  // height
          (width, height) => {
            const result = calculateAspectRatio(width, height);
            const expected = width / height;
            
            // Use approximate equality for floating point
            return Math.abs(result - expected) < 0.0001;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return 0 for invalid dimensions', () => {
      fc.assert(
        fc.property(
          fc.oneof(
            fc.constant(0),
            fc.constant(-1),
            fc.integer({ min: -1000, max: 0 })
          ),
          fc.integer({ min: 1, max: 1000 }),
          (invalidDim, validDim) => {
            // Test with invalid width
            const result1 = calculateAspectRatio(invalidDim, validDim);
            // Test with invalid height
            const result2 = calculateAspectRatio(validDim, invalidDim);
            
            return result1 === 0 && result2 === 0;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should generate correct CSS aspect ratio string', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 10000 }),
          fc.integer({ min: 1, max: 10000 }),
          (width, height) => {
            const result = generateAspectRatioCSS(width, height);
            const expected = `${width} / ${height}`;
            
            return result === expected;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should generate style object with correct aspectRatio', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 10000 }),
          fc.integer({ min: 1, max: 10000 }),
          (width, height) => {
            const style = getAspectRatioStyle(width, height);
            const expectedRatio = `${width} / ${height}`;
            
            return style.aspectRatio === expectedRatio;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return empty style for invalid dimensions', () => {
      fc.assert(
        fc.property(
          fc.oneof(
            fc.constant(0),
            fc.constant(-1)
          ),
          fc.integer({ min: 1, max: 1000 }),
          (invalidDim, validDim) => {
            const style1 = getAspectRatioStyle(invalidDim, validDim);
            const style2 = getAspectRatioStyle(validDim, invalidDim);
            
            return Object.keys(style1).length === 0 && Object.keys(style2).length === 0;
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
