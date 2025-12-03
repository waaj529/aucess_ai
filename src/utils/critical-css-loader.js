/**
 * Load non-critical CSS asynchronously
 * This prevents CSS from blocking initial render
 */
export const loadNonCriticalCSS = () => {
    const stylesheets = [
        '/assets/css/bootstrap.min.css',
        '/assets/css/fontawesome.css',
        '/assets/css/animate.css',
        '/assets/css/swiper.min.css',
        '/assets/css/responsive.css',
        '/assets/css/custom-animations.css',
    ];

    stylesheets.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        // Load as print stylesheet first, then switch to all
        link.media = 'print';
        link.onload = () => {
            link.media = 'all';
        };
        // Fallback for browsers that don't support onload
        link.onerror = () => {
            link.media = 'all';
        };
        document.head.appendChild(link);
    });
};

/**
 * Preload critical resources
 */
export const preloadCriticalResources = () => {
    // Preconnect to Google Fonts
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect2);
};
