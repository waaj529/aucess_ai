/**
 * Preload Manager
 * Manages preload link injection for critical images
 * 
 * @module preload-manager
 */

// Singleton registry of preloaded URLs
const preloadedUrls = new Set();

/**
 * Preload configuration interface
 * @typedef {Object} PreloadConfig
 * @property {string} src - Image source URL
 * @property {'image'} as - Resource type (always 'image' for images)
 * @property {string} [type] - MIME type (e.g., 'image/webp')
 * @property {'high'|'low'|'auto'} [fetchpriority] - Fetch priority hint
 * @property {string} [media] - Media query for responsive preloading
 * @property {string} [imagesrcset] - Srcset for responsive images
 * @property {string} [imagesizes] - Sizes for responsive images
 */

/**
 * Create a preload link element with the given configuration
 * @param {PreloadConfig} config - Preload configuration
 * @returns {HTMLLinkElement} The created link element
 */
function createPreloadLink(config) {
  const link = document.createElement('link');
  
  // Required attributes
  link.rel = 'preload';
  link.as = config.as || 'image';
  link.href = config.src;
  
  // Optional attributes
  if (config.type) {
    link.type = config.type;
  }
  
  if (config.fetchpriority) {
    link.setAttribute('fetchpriority', config.fetchpriority);
  }
  
  if (config.media) {
    link.media = config.media;
  }
  
  if (config.imagesrcset) {
    link.setAttribute('imagesrcset', config.imagesrcset);
  }
  
  if (config.imagesizes) {
    link.setAttribute('imagesizes', config.imagesizes);
  }
  
  // Add crossorigin for CDN images
  if (config.src && config.src.startsWith('http')) {
    link.crossOrigin = 'anonymous';
  }
  
  return link;
}

/**
 * Preload a single image by injecting a link tag into document head
 * @param {PreloadConfig} config - Preload configuration
 * @returns {boolean} True if preload was added, false if already preloaded
 */
export function preload(config) {
  if (!config || !config.src) {
    return false;
  }
  
  // Check if already preloaded
  if (preloadedUrls.has(config.src)) {
    return false;
  }
  
  // Check if we're in a browser environment
  if (typeof document === 'undefined') {
    return false;
  }
  
  const link = createPreloadLink(config);
  document.head.appendChild(link);
  preloadedUrls.add(config.src);
  
  return true;
}

/**
 * Check if an image URL has already been preloaded
 * @param {string} src - Image source URL
 * @returns {boolean} True if the URL has been preloaded
 */
export function isPreloaded(src) {
  return preloadedUrls.has(src);
}

/**
 * Remove a preload link from the document
 * @param {string} src - Image source URL to remove
 * @returns {boolean} True if removed, false if not found
 */
export function remove(src) {
  if (!src || typeof document === 'undefined') {
    return false;
  }
  
  const link = document.head.querySelector(`link[rel="preload"][href="${src}"]`);
  if (link) {
    link.remove();
    preloadedUrls.delete(src);
    return true;
  }
  
  return false;
}

/**
 * Preload multiple images with priority ordering
 * The first image in the array gets fetchpriority="high"
 * @param {PreloadConfig[]} configs - Array of preload configurations
 * @returns {number} Number of images successfully preloaded
 */
export function preloadBatch(configs) {
  if (!Array.isArray(configs) || configs.length === 0) {
    return 0;
  }
  
  let preloadedCount = 0;
  
  configs.forEach((config, index) => {
    // First image gets high priority if not specified
    const configWithPriority = {
      ...config,
      fetchpriority: config.fetchpriority || (index === 0 ? 'high' : 'auto')
    };
    
    if (preload(configWithPriority)) {
      preloadedCount++;
    }
  });
  
  return preloadedCount;
}

/**
 * Clear all preloaded URLs from registry (useful for testing)
 */
export function clearRegistry() {
  preloadedUrls.clear();
}

/**
 * Get the current count of preloaded URLs
 * @returns {number} Number of preloaded URLs
 */
export function getPreloadedCount() {
  return preloadedUrls.size;
}

// Default export with all functions
export default {
  preload,
  isPreloaded,
  remove,
  preloadBatch,
  clearRegistry,
  getPreloadedCount
};
