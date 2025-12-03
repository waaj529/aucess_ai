import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Preloader from './components/Layout/Preloader';
import BackToTop from './components/Layout/BackToTop';
// Lazy load page components for better performance
const Home = React.lazy(() => import('./components/Pages/Home'));
const Contact = React.lazy(() => import('./components/Pages/Contact'));
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import CSS files
import './assets/css/bootstrap.min.css';
// import './assets/css/fontawesome.css'; // Removed in favor of tree-shakeable icons
import './assets/css/animate.css';
import './assets/css/swiper.min.css';
import './assets/css/mousecursor.css';
import './assets/css/custom-fonts.css';
import './assets/css/layout-shift-fixes.css';
import './assets/css/main.css';
import './assets/css/responsive.css';
import './assets/css/custom-animations.css';

function App() {
  const location = useLocation();

  // Initialize animations after component mounts
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-out',
    });
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    // Prevent browser from restoring scroll position on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <BackToTop />
      <Preloader />

      <React.Suspense fallback={<Preloader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </React.Suspense>
    </>
  );
}

export default App;
