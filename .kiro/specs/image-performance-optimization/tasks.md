# Implementation Plan

- [x] 1. Create ImageKit URL Transformer utility
  - [x] 1.1 Create `src/utils/imagekit-transformer.js` with core transformation functions
    - Implement `isImageKitUrl(url)` function to detect ImageKit URLs
    - Implement `transform(url, options)` function with quality, format, and progressive parameters
    - Implement `generateLQIP(url)` function for low-quality placeholder URLs
    - Implement `generateSrcSet(url, breakpoints)` function for responsive images
    - Export default breakpoints constant `[320, 640, 960, 1280, 1920]`
    - _Requirements: 1.2, 2.3, 3.4, 4.1, 4.3, 8.3_

  - [x] 1.2 Write property test for CDN URL detection
    - **Property 7: CDN URL Detection**
    - **Validates: Requirements 6.1**

  - [x] 1.3 Write property test for URL transformation completeness
    - **Property 1: URL Transformation Completeness**
    - **Validates: Requirements 1.2, 3.4, 8.3**

  - [x] 1.4 Write property test for LQIP URL generation
    - **Property 2: LQIP URL Generation**
    - **Validates: Requirements 2.3**

  - [x] 1.5 Write property test for srcset generation
    - **Property 4: Srcset Generation Completeness**
    - **Validates: Requirements 4.1**

  - [x] 1.6 Write property test for width transformation parameter
    - **Property 10: Width Transformation Parameter**
    - **Validates: Requirements 4.3**

- [x] 2. Create PreloadManager utility
  - [x] 2.1 Create `src/utils/preload-manager.js` with preload link management
    - Implement `preload(config)` function to inject link tags into document head
    - Implement `isPreloaded(src)` function to check preload registry
    - Implement `preloadBatch(configs)` function for multiple images
    - Maintain singleton registry of preloaded URLs
    - _Requirements: 1.1, 1.4, 7.1, 7.2, 7.3_

  - [x] 2.2 Write property test for preload link attributes
    - **Property 9: Preload Link Attributes**
    - **Validates: Requirements 1.4, 7.2, 7.3**

- [x] 3. Create DPR and aspect ratio calculation utilities
  - [x] 3.1 Create `src/utils/image-calculations.js` with calculation helpers
    - Implement `calculateDPRWidth(displayWidth, dpr)` function
    - Implement `calculateAspectRatio(width, height)` function
    - Implement `getDevicePixelRatio()` function with fallback to 1
    - _Requirements: 2.4, 4.4, 6.3_

  - [x] 3.2 Write property test for DPR-aware size calculation
    - **Property 5: DPR-Aware Size Calculation**
    - **Validates: Requirements 4.4**

  - [x] 3.3 Write property test for aspect ratio preservation
    - **Property 3: Aspect Ratio Preservation**
    - **Validates: Requirements 2.4, 6.3**

- [x] 4. Checkpoint - Ensure all utility tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Create OptimizedImage component
  - [x] 5.1 Create `src/components/UI/OptimizedImage.jsx` component
    - Accept props: src, alt, width, height, priority, quality, placeholder, sizes, className, style, onLoad, onError
    - Use ImageKit transformer for CDN images, pass through for local images
    - Implement LQIP placeholder with blur effect and fade transition
    - Generate responsive srcset and sizes attributes
    - Reserve aspect ratio space to prevent CLS
    - _Requirements: 6.1, 6.3, 6.4_

  - [x] 5.2 Implement priority image handling in OptimizedImage
    - When priority=true, call PreloadManager.preload() on mount
    - When priority=true, omit loading="lazy" attribute
    - When priority=false (default), add loading="lazy" attribute
    - _Requirements: 5.2, 6.2_

  - [x] 5.3 Write property test for lazy loading attribute
    - **Property 6: Lazy Loading Attribute**
    - **Validates: Requirements 5.2**

  - [x] 5.4 Write property test for priority image handling
    - **Property 8: Priority Image Handling**
    - **Validates: Requirements 6.2**

- [x] 6. Create useImageLoader hook
  - [x] 6.1 Create `src/hooks/useImageLoader.js` custom hook
    - Manage loading states: idle, loading, loaded, error
    - Handle placeholder and full image loading sequence
    - Implement Intersection Observer with 200px rootMargin for lazy loading
    - Provide isLoaded, error, and placeholderUrl state
    - _Requirements: 2.1, 5.1, 5.3_

- [x] 7. Checkpoint - Ensure OptimizedImage component works
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Integrate OptimizedImage into existing components
  - [x] 8.1 Update HeroSection to use OptimizedImage with priority
    - Replace hero main image `<img>` with `<OptimizedImage priority={true}>`
    - Add width/height attributes to prevent CLS
    - Keep existing LazyImage for non-critical floating card images
    - _Requirements: 1.1, 1.3, 7.1_

  - [x] 8.2 Update FeaturesSection to use OptimizedImage
    - Replace CDN image in section title with `<OptimizedImage>`
    - Update feature card images to use OptimizedImage with lazy loading
    - _Requirements: 5.1, 5.4_

  - [x] 8.3 Update IntegrationSection images
    - Update integration logo images to use OptimizedImage
    - These are below-the-fold, use default lazy loading
    - _Requirements: 5.1, 5.2_

  - [x] 8.4 Update TestimonialsSection images
    - Update avatar and quote images to use OptimizedImage
    - These are below-the-fold, use default lazy loading
    - _Requirements: 5.1, 5.2_

- [x] 9. Add critical image preloading to index.html
  - [x] 9.1 Add preload links for hero images in index.html
    - Add `<link rel="preload">` for hero background image
    - Add `<link rel="preload">` for hero main SVG with fetchpriority="high"
    - Include imagesrcset for responsive preloading
    - _Requirements: 1.1, 1.4, 7.1, 7.2_

- [x] 10. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
