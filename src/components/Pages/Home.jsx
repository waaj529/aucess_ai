import React from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import HeroSection from '../Sections/HeroSection';
import VideoSection from '../Sections/VideoSection';
import FeaturesSection from '../Sections/FeaturesSection';
import BrandMarquee from '../Sections/BrandMarquee';
// Lazy load below-the-fold sections for better performance
const ProcessSection = React.lazy(() => import('../Sections/ProcessSection'));
const TestimonialsSection = React.lazy(() => import('../Sections/TestimonialsSection'));
const IntegrationSection = React.lazy(() => import('../Sections/IntegrationSection'));
const PricingSection = React.lazy(() => import('../Sections/PricingSection'));
const FAQSection = React.lazy(() => import('../Sections/FAQSection'));
const CTASection = React.lazy(() => import('../Sections/CTASection'));

const Home = () => {
    return (
        <div className="body_wrap o-clip">
            <Header />

            <div className="body-overlay"></div>

            <main>
                <HeroSection />

                <VideoSection />

                <div className="bg_img" data-background="/assets/img/bg/custom-bg.jpg" style={{ backgroundImage: 'url(/assets/img/bg/custom-bg.jpg)' }}>
                    <FeaturesSection />
                    <BrandMarquee />
                </div>

                <React.Suspense fallback={<div className="loading-section" style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span>Loading...</span></div>}>
                    <ProcessSection />

                    <TestimonialsSection />

                    <IntegrationSection />

                    <PricingSection />

                    <FAQSection />

                    <CTASection />
                </React.Suspense>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
