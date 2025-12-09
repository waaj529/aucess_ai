/**
 * ImageKit URL Transformer
 * Utility for generating optimized ImageKit CDN URLs with transformations
 * 
 * @module imagekit-transformer
 */

// ImageKit URL pattern for detection
const IMAGEKIT_PATTERN = /^https:\/\/ik\.imagekit\.io\//;

// Default breakpoints for responsive images (in pixels)
export const DEFAULT_BREAKPOINTS = [320, 640, 960, 1280, 1920];

// Quality presets
export const QUALITY_PRESETS = {
  lqip: 20,      // For low-quality image placeholders
  low: 40,       // For thumbnails
  medium: 70,    // For mobile
  high: 85,      // For desktop
  max: 100       // For high-DPI displays
};

/**
 * Check if a URL is an ImageKit CDN URL
 * @param {string} url - The URL to check
 * @returns {boolean} True if the URL is an ImageKit URL
 */
export function isImageKitUrl(url) {
  if (!url || typeof url !== 'string') {
    return false;
  }
  return IMAGEKIT_PATTERN.test(url);
}

/**
 * Parse an ImageKit URL into its components
 * @param {string} url - The ImageKit URL to parse
 * @returns {{ baseUrl: string, path: string, existingTransforms: string }} Parsed URL components
 */
function parseImageKitUrl(url) {
  if (!isImageKitUrl(url)) {
    return { baseUrl: url, path: '', existingTransforms: '' };
  }

  // ImageKit URL format: https://ik.imagekit.io/{id}/tr:{transforms}/{path}
  // or: https://ik.imagekit.io/{id}/{path}?tr={transforms}
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  
  // Check for tr: in path
  const trMatch = pathname.match(/\/tr:([^/]+)\//);
  if (trMatch) {
    const transforms = trMatch[1];
    const pathAfterTransform = pathname.substring(pathname.indexOf(trMatch[0]) + trMatch[0].length);
    const baseUrl = url.substring(0, url.indexOf('/tr:'));
    return {
      baseUrl,
      path: pathAfterTransform,
      existingTransforms: transforms
    };
  }

  // No existing transforms
  return {
    baseUrl: urlObj.origin + pathname.substring(0, pathname.lastIndexOf('/') + 1),
    path: pathname.substring(pathname.lastIndexOf('/') + 1),
    existingTransforms: ''
  };
}


/**
 * Build ImageKit transformation string from options
 * @param {Object} options - Transformation options
 * @param {number} [options.width] - Target width
 * @param {number} [options.height] - Target height
 * @param {number} [options.quality] - Image quality (1-100)
 * @param {'auto'|'webp'|'avif'|'jpg'|'png'} [options.format] - Output format
 * @param {number} [options.blur] - Blur radius for LQIP
 * @param {boolean} [options.progressive] - Enable progressive loading
 * @returns {string} Transformation string
 */
function buildTransformString(options = {}) {
  const transforms = [];

  // Width transformation
  if (options.width && options.width > 0) {
    transforms.push(`w-${Math.round(options.width)}`);
  }

  // Height transformation
  if (options.height && options.height > 0) {
    transforms.push(`h-${Math.round(options.height)}`);
  }

  // Quality transformation
  if (options.quality && options.quality > 0 && options.quality <= 100) {
    transforms.push(`q-${Math.round(options.quality)}`);
  }

  // Format transformation (auto for automatic format selection)
  if (options.format) {
    transforms.push(`f-${options.format}`);
  }

  // Blur transformation for LQIP
  if (options.blur && options.blur > 0) {
    transforms.push(`bl-${Math.round(options.blur)}`);
  }

  // Progressive JPEG
  if (options.progressive) {
    transforms.push('pr-true');
  }

  return transforms.join(',');
}

/**
 * Transform an ImageKit URL with optimization parameters
 * @param {string} url - The original ImageKit URL
 * @param {Object} options - Transformation options
 * @param {number} [options.width] - Target width
 * @param {number} [options.height] - Target height
 * @param {number} [options.quality=80] - Image quality (1-100)
 * @param {'auto'|'webp'|'avif'|'jpg'|'png'} [options.format='auto'] - Output format
 * @param {number} [options.blur] - Blur radius
 * @param {boolean} [options.progressive=true] - Enable progressive loading
 * @returns {string} Transformed URL with optimization parameters
 */
export function transform(url, options = {}) {
  if (!url || typeof url !== 'string') {
    return url;
  }

  // If not an ImageKit URL, return as-is
  if (!isImageKitUrl(url)) {
    return url;
  }

  // Default options
  const opts = {
    quality: options.quality ?? 80,
    format: options.format ?? 'auto',
    progressive: options.progressive ?? true,
    ...options
  };

  const transformString = buildTransformString(opts);
  
  if (!transformString) {
    return url;
  }

  // Parse the URL and rebuild with transforms
  const { baseUrl, path } = parseImageKitUrl(url);
  
  // Build new URL with tr: prefix
  return `${baseUrl}/tr:${transformString}/${path}`;
}

/**
 * Generate a Low Quality Image Placeholder (LQIP) URL
 * Creates a tiny, blurred version of the image for fast loading
 * @param {string} url - The original ImageKit URL
 * @returns {string} LQIP URL with blur and small size transformations
 */
export function generateLQIP(url) {
  if (!url || typeof url !== 'string') {
    return url;
  }

  if (!isImageKitUrl(url)) {
    return url;
  }

  return transform(url, {
    width: 20,
    quality: QUALITY_PRESETS.lqip,
    blur: 10,
    format: 'auto',
    progressive: false // Small images don't benefit from progressive
  });
}

/**
 * Generate srcset string for responsive images
 * @param {string} url - The original ImageKit URL
 * @param {number[]} [breakpoints] - Array of width breakpoints
 * @returns {string} srcset string with multiple size variants
 */
export function generateSrcSet(url, breakpoints = DEFAULT_BREAKPOINTS) {
  if (!url || typeof url !== 'string') {
    return '';
  }

  if (!isImageKitUrl(url)) {
    // For non-ImageKit URLs, return single source
    return url;
  }

  if (!Array.isArray(breakpoints) || breakpoints.length === 0) {
    breakpoints = DEFAULT_BREAKPOINTS;
  }

  const srcsetEntries = breakpoints.map(width => {
    const transformedUrl = transform(url, {
      width,
      quality: 80,
      format: 'auto',
      progressive: true
    });
    return `${transformedUrl} ${width}w`;
  });

  return srcsetEntries.join(', ');
}

/**
 * Generate sizes attribute for responsive images
 * @param {Object} [config] - Sizes configuration
 * @param {string} [config.mobile] - Size for mobile (< 640px)
 * @param {string} [config.tablet] - Size for tablet (< 1024px)
 * @param {string} [config.desktop] - Size for desktop
 * @returns {string} sizes attribute string
 */
export function generateSizes(config = {}) {
  const {
    mobile = '100vw',
    tablet = '50vw',
    desktop = '33vw'
  } = config;

  return `(max-width: 640px) ${mobile}, (max-width: 1024px) ${tablet}, ${desktop}`;
}

// Default export with all functions
export default {
  isImageKitUrl,
  transform,
  generateLQIP,
  generateSrcSet,
  generateSizes,
  DEFAULT_BREAKPOINTS,
  QUALITY_PRESETS
};
