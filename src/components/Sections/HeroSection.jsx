import { useTranslation } from 'react-i18next';
import LazyImage from '../UI/LazyImage';
import OptimizedImage from '../UI/OptimizedImage';

const HeroSection = () => {
    const { t } = useTranslation();
    return (
        <section className="hero hero-style hero-style--two pos-rel bg_img" style={{ backgroundImage: 'url(/assets/img/bg/hero_bg02.jpg)' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="hero-content hero-content--two">
                            <h1 className="title" data-aos="fade-up" data-aos-duration="600">
                                {t('hero.title')}
                            </h1>
                            <p className="sub-title" data-aos="fade-up" data-aos-duration="600" data-aos-delay="150">
                                {t('hero.description')}
                            </p>
                            <div className="hero-btn" data-aos="fade-up" data-aos-duration="600" data-aos-delay="300">
                                <a className="thm-btn chatbot-btn" href="/contact">
                                    {t('hero.getFreeConsultation')}
                                    <span className="arrow-icon">
                                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="5.06592" y="19.9785" width="20.5712" height="2.61221" transform="rotate(-40.2798 5.06592 19.9785)" fill="white" />
                                            <rect x="7.97095" y="7.24463" width="2.61221" height="2.61221" transform="rotate(-40.2798 7.97095 7.24463)" fill="white" />
                                            <rect x="11.6523" y="7.54834" width="2.61221" height="2.61221" transform="rotate(-40.2798 11.6523 7.54834)" fill="white" />
                                            <rect x="15.334" y="7.85205" width="2.61221" height="2.61221" transform="rotate(-40.2798 15.334 7.85205)" fill="white" />
                                            <rect x="18.7119" y="11.8374" width="2.61221" height="2.61221" transform="rotate(-40.2798 18.7119 11.8374)" fill="white" />
                                            <rect x="18.4084" y="15.52" width="2.61221" height="2.61221" transform="rotate(-40.2798 18.4084 15.52)" fill="white" />
                                            <rect x="18.104" y="19.2012" width="2.61221" height="2.61221" transform="rotate(-40.2798 18.104 19.2012)" fill="white" />
                                        </svg>
                                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="5.06592" y="19.9785" width="20.5712" height="2.61221" transform="rotate(-40.2798 5.06592 19.9785)" fill="white" />
                                            <rect x="7.97095" y="7.24463" width="2.61221" height="2.61221" transform="rotate(-40.2798 7.97095 7.24463)" fill="white" />
                                            <rect x="11.6523" y="7.54834" width="2.61221" height="2.61221" transform="rotate(-40.2798 11.6523 7.54834)" fill="white" />
                                            <rect x="15.334" y="7.85205" width="2.61221" height="2.61221" transform="rotate(-40.2798 15.334 7.85205)" fill="white" />
                                            <rect x="18.7119" y="11.8374" width="2.61221" height="2.61221" transform="rotate(-40.2798 18.7119 11.8374)" fill="white" />
                                            <rect x="18.4084" y="15.52" width="2.61221" height="2.61221" transform="rotate(-40.2798 18.4084 15.52)" fill="white" />
                                            <rect x="18.104" y="19.2012" width="2.61221" height="2.61221" transform="rotate(-40.2798 18.104 19.2012)" fill="white" />
                                        </svg>
                                    </span>
                                    <span className="btn-bg">
                                        <svg width="484" height="60" viewBox="0 0 484 60" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="484" height="60" fill="url(#paint0_radial_2224_3384)" />
                                            <defs>
                                                <radialGradient id="paint0_radial_2224_3384" cx="0" cy="0" r="1" gradientTransform="matrix(-667.5 -25 0.582116 -49.7476 497 39)" gradientUnits="userSpaceOnUse">
                                                    <stop offset="0" stopColor="#00FF97" />
                                                    <stop offset="1" stopColor="#00020F" stopOpacity="0" />
                                                </radialGradient>
                                            </defs>
                                        </svg>
                                    </span>
                                </a>
                                <a className="thm-btn--secondary ml-30" href="/#work">
                                    {t('hero.viewCaseStudies')}
                                </a>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="hero-img-container">
                            <div className="xb-img xb-floating hero-main-img" data-aos="fade-left" data-aos-duration="800">
                                <OptimizedImage 
                                    src="https://ik.imagekit.io/l1mhaygkv/Untitled%20design%20(20).svg?updatedAt=1764358961002" 
                                    alt="AI Automation Hero" 
                                    width={600} 
                                    height={600}
                                    priority={true}
                                    quality={90}
                                />
                            </div>

                            {/* Floating Cards */}
                            <div className="hero-floating-cards">
                                {/* Top Left Card - Agentic AI */}
                                <div className="glass-card glass-card--agentic">
                                    <div className="glass-card__icon">
                                        <LazyImage src="/assets/img/icon/brain_3d.png" alt="Brain" width="40" height="40" />
                                    </div>
                                    <div className="glass-card__content">
                                        <span className="glass-card__title">{t('hero.agenticAI')}</span>
                                        <span className="glass-card__subtitle">{t('hero.autoActions')}</span>
                                    </div>
                                    <div className="glass-card__stat glass-card__stat--green">
                                        {t('hero.booking')}
                                    </div>
                                </div>

                                {/* Bottom Right Card - WP Integration */}
                                <div className="glass-card glass-card--wp">
                                    <div className="glass-card__icon">
                                        <LazyImage src="/assets/img/icon/wordpress.svg" alt="WordPress" width="40" height="40" />
                                    </div>
                                    <div className="glass-card__content">
                                        <span className="glass-card__title">{t('hero.wpIntegration')}</span>
                                        <span className="glass-card__subtitle">{t('hero.plugins')}</span>
                                    </div>
                                    <div className="glass-card__stat glass-card__stat--red">
                                        {t('hero.setup')}
                                    </div>
                                </div>

                                {/* Bottom Left Card - Multilingual */}
                                <div className="glass-card glass-card--multilingual">
                                    <div className="glass-card__icon">
                                        <LazyImage src="/assets/img/icon/globe_3d.png" alt="Globe" width="40" height="40" />
                                    </div>
                                    <div className="glass-card__content">
                                        <span className="glass-card__title">{t('hero.multilingual')}</span>
                                        <span className="glass-card__subtitle">{t('hero.fiftyPlusLang')}</span>
                                    </div>
                                    <div className="glass-card__stat glass-card__stat--green">
                                        {t('hero.zeroLatency')}
                                    </div>
                                </div>

                                {/* Central Call to Action Card */}
                                <a href="/contact" className="glass-card glass-card--cta">
                                    <div className="glass-card__content">
                                        <span className="glass-card__title">{t('hero.bookStrategyCall')}</span>
                                        <span className="glass-card__subtitle">{t('hero.seeLiveDemo')}</span>
                                    </div>
                                </a>
                            </div>

                            {/* Bottom System Performance Bar */}
                            <div className="hero-system-stats">
                                <div className="stat-item">
                                    <span className="stat-value">150+</span>
                                    <span className="stat-unit">{t('hero.businessesAutomated')}</span>
                                </div>
                                <div className="stat-divider"></div>
                                <div className="stat-item">
                                    <span className="stat-value">10k+</span>
                                    <span className="stat-unit">{t('hero.hoursSaved')}</span>
                                </div>
                                <div className="stat-divider"></div>
                                <div className="stat-item">
                                    <span className="stat-value">$500k+</span>
                                    <span className="stat-unit">{t('hero.clientRevenueGenerated')}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="hero-linear"></div>
        </section>
    );
};

export default HeroSection;
