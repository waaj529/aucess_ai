import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import PurgeCSS from 'vite-plugin-purgecss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // PurgeCSS - Remove unused CSS from Bootstrap, FontAwesome, Animate.css
    PurgeCSS({
      content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
      ],
      // Safelist patterns to keep dynamic classes
      safelist: {
        standard: [/^aos-/, /^swiper-/, /^animate__/, /^fa-/, /^modal/, /^dropdown/, /^collapse/],
        deep: [/^btn/, /^form/, /^input/, /^header/, /^footer/],
        greedy: [/^data-aos/],
      },
      // Don't purge critical CSS files
      rejected: false,
      variables: true,
    }),
    // Gzip compression
    viteCompression({
      algorithm: 'gzip',
      threshold: 10240, // Only compress files larger than 10KB
      ext: '.gz'
    }),
    // Brotli compression (better compression than gzip)
    viteCompression({
      algorithm: 'brotliCompress',
      threshold: 10240,
      ext: '.br'
    }),
    // Optimize images during build
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
    }),
  ],
  build: {
    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React libraries into separate chunk
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Split Three.js libraries (heavy) into separate chunk
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          // Split animation libraries into separate chunk
          'animation-vendor': ['framer-motion', 'aos'],
          // Split UI libraries into separate chunk
          'ui-vendor': ['bootstrap', 'swiper', 'react-scroll'],
        },
        // CSS code splitting
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // Chunk size warning limit (in KB) - increased for Three.js vendor bundle
    // Three.js is legitimately large (~780KB), but other chunks should stay under 300KB
    chunkSizeWarningLimit: 500,
    // Use terser for better minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    // Enable CSS minification
    cssMinify: true,
    // Source maps for production debugging (optional, disable if not needed)
    sourcemap: false,
  },
})
