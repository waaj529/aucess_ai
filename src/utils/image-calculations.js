/**
 * Image Calculations Utility
 * Helper functions for DPR-aware sizing and aspect ratio calculations
 * 
 * @module image-calculations
 */

/**
 * Get the device pixel ratio with fallback
 * @returns {number} Device pixel ratio (minimum 1)
 */
export function getDevicePixelRatio() {
  if (typeof window === 'undefined') {
    return 1;
  }
  return Math.max(1, window.devicePixelRatio || 1);
}

/**
 * Calculate DPR-aware image width
 * Multiplies display width by device pixel ratio for crisp images on high-DPI displays
 * @param {number} displayWidth - The display width in CSS pixels
 * @param {number} [dpr] - Device pixel ratio (defaults to current device DPR)
 * @returns {number} The calculated image width accounting for DPR
 */
export function calculateDPRWidth(displayWidth, dpr) {
  if (typeof displayWidth !== 'number' || displayWidth <= 0) {
    return 0;
  }
  
  const devicePixelRatio = typeof dpr === 'number' && dpr > 0 
    ? dpr 
    : getDevicePixelRatio();
  
  return Math.round(displayWidth * devicePixelRatio);
}

/**
 * Calculate aspect ratio from width and height
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {number} Aspect ratio (width / height)
 */
export function calculateAspectRatio(width, height) {
  if (typeof width !== 'number' || typeof height !== 'number') {
    return 0;
  }
  
  if (width <= 0 || height <= 0) {
    return 0;
  }
  
  return width / height;
}

/**
 * Generate CSS aspect ratio string
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {string} CSS aspect-ratio value (e.g., "16 / 9")
 */
export function generateAspectRatioCSS(width, height) {
  if (typeof width !== 'number' || typeof height !== 'number') {
    return '';
  }
  
  if (width <= 0 || height <= 0) {
    return '';
  }
  
  return `${width} / ${height}`;
}

/**
 * Calculate container style with aspect ratio to prevent CLS
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {Object} Style object with aspectRatio property
 */
export function getAspectRatioStyle(width, height) {
  const aspectRatioCSS = generateAspectRatioCSS(width, height);
  
  if (!aspectRatioCSS) {
    return {};
  }
  
  return {
    aspectRatio: aspectRatioCSS
  };
}

/**
 * Select the best breakpoint for a given display width
 * @param {number} displayWidth - The display width in CSS pixels
 * @param {number[]} breakpoints - Available breakpoints
 * @param {number} [dpr] - Device pixel ratio
 * @returns {number} The best matching breakpoint
 */
export function selectBreakpoint(displayWidth, breakpoints, dpr) {
  if (!Array.isArray(breakpoints) || breakpoints.length === 0) {
    return displayWidth;
  }
  
  const targetWidth = calculateDPRWidth(displayWidth, dpr);
  
  // Sort breakpoints ascending
  const sortedBreakpoints = [...breakpoints].sort((a, b) => a - b);
  
  // Find the smallest breakpoint that's >= target width
  for (const bp of sortedBreakpoints) {
    if (bp >= targetWidth) {
      return bp;
    }
  }
  
  // If no breakpoint is large enough, return the largest one
  return sortedBreakpoints[sortedBreakpoints.length - 1];
}

// Default export with all functions
export default {
  getDevicePixelRatio,
  calculateDPRWidth,
  calculateAspectRatio,
  generateAspectRatioCSS,
  getAspectRatioStyle,
  selectBreakpoint
};
