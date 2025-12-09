import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../UI/SectionTitle';
import Button from '../UI/Button';
import { features } from '../../data/features';
import LazyImage from '../UI/LazyImage';
import OptimizedImage from '../UI/OptimizedImage';

/**
 * Features Section Component
 * Displays feature cards in a grid layout
 */
const FeaturesSection = () => {
    const { t } = useTranslation();
    return (
        <section id="services" className="feature pb-155">
            <div className="container">
                <SectionTitle
                    subtitle={t('features.subtitle')}
                    className="feature-sec-title mb-45"
                >
                    <h2 className="title">
                        <span>
                            <OptimizedImage 
                                src="https://ik.imagekit.io/l1mhaygkv/ai-animation.webp" 
                                alt="AI Animation"
                                width={60}
                                height={60}
                            />
                        </span>
                        {t('features.title')}
                    </h2>
                    <div className="xb-heading-btn d-inline">
                        <Button>
                            {t('features.button')}
                        </Button>
                    </div>
                </SectionTitle>

                <div className="row mt-none-30">
                    {/* Large Feature - First */}
                    {features.filter(f => f.size === 'large').map((feature) => (
                        <div key={feature.id} className="col-lg-8 mt-30">
                            <div className="xb-feature-item-3 big-item wow fadeInUp" data-wow-delay={feature.animation.delay} data-wow-duration={feature.animation.duration}>
                                <div className="xb-item--inner xb-border">
                                    <div className="xb-img">
                                        <LazyImage src={feature.image} alt="image" disableSrcSet={true} />
                                        {feature.logo && (
                                            <span className="logo">
                                                <LazyImage src={feature.logo} alt="image" disableSrcSet={true} />
                                            </span>
                                        )}
                                    </div>
                                    <div className="xb-item--holder">
                                        <h2 className="xb-item--title">{t(feature.title)}</h2>
                                        <p className="xb-item--content">{t(feature.description)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Small Features */}
                    {features.filter(f => f.size === 'small').map((feature, index) => (
                        <div key={feature.id} className={`col-lg-4 col-md-6 mt-30 ${index === 0 ? 'order-lg-first' : ''}`}>
                            <div className="xb-feature-item-3 wow fadeInUp" data-wow-delay={feature.animation.delay} data-wow-duration={feature.animation.duration}>
                                <div className="xb-item--inner xb-border">
                                    <div className="xb-img">
                                        <LazyImage src={feature.image} alt="image" disableSrcSet={true} />
                                        {feature.scanImage && (
                                            <span className="scan-img updown-2">
                                                <LazyImage src={feature.scanImage} alt="image" disableSrcSet={true} />
                                            </span>
                                        )}
                                        {feature.circleImage && (
                                            <span className="circle">
                                                <LazyImage src={feature.circleImage} alt="image" disableSrcSet={true} />
                                            </span>
                                        )}
                                        {feature.securityImage && (
                                            <span className="security">
                                                <LazyImage src={feature.securityImage} alt="image" disableSrcSet={true} />
                                            </span>
                                        )}
                                        {feature.hasAnimatedDots && (
                                            <span className="animated-dot">
                                                <span className="dot">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </span>
                                            </span>
                                        )}
                                    </div>
                                    <div className="xb-item--holder">
                                        <h2 className="xb-item--title">{t(feature.title)}</h2>
                                        <p className="xb-item--content">{t(feature.description)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
