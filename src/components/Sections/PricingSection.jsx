import React from 'react';
// import { useTranslation } from 'react-i18next';
import { pricingPlans } from '../../data/pricing';
import LazyImage from '../UI/LazyImage';

/**
 * CheckIcon component for pricing features
 */
const CheckIcon = () => (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.1" d="M21 10.5C21 11.396 19.8993 12.1345 19.6787 12.9605C19.4513 13.8145 20.027 15.0045 19.5947 15.7517C19.1555 16.5112 17.8342 16.6022 17.2183 17.2183C16.6022 17.8342 16.5112 19.1555 15.7517 19.5947C15.0045 20.027 13.8145 19.4513 12.9605 19.6787C12.1345 19.8993 11.396 21 10.5 21C9.604 21 8.8655 19.8993 8.0395 19.6787C7.1855 19.4513 5.9955 20.027 5.24825 19.5947C4.48875 19.1555 4.39775 17.8342 3.78175 17.2183C3.16575 16.6022 1.8445 16.5112 1.40525 15.7517C0.973 15.0045 1.54875 13.8145 1.32125 12.9605C1.10075 12.1345 0 11.396 0 10.5C0 9.604 1.10075 8.8655 1.32125 8.0395C1.54875 7.1855 0.973 5.9955 1.40525 5.24825C1.8445 4.48875 3.16575 4.39775 3.78175 3.78175C4.39775 3.16575 4.48875 1.8445 5.24825 1.40525C5.9955 0.973 7.1855 1.54875 8.0395 1.32125C8.8655 1.10075 9.604 0 10.5 0C11.396 0 12.1345 1.10075 12.9605 1.32125C13.8145 1.54875 15.0045 0.973 15.7517 1.40525C16.5112 1.8445 16.6022 3.16575 17.2183 3.78175C17.8342 4.39775 19.1555 4.48875 19.5947 5.24825C20.027 5.9955 19.4513 7.1855 19.6787 8.0395C19.8993 8.8655 21 9.604 21 10.5Z" fill="#00FF97" />
        <path d="M13.5336 7.37076L9.53661 11.3678L7.46461 9.29751C7.01486 8.84776 6.28511 8.84776 5.83536 9.29751C5.38561 9.74726 5.38561 10.477 5.83536 10.9268L8.74211 13.8335C9.17961 14.271 9.89011 14.271 10.3276 13.8335L15.1611 9.00001C15.6109 8.55026 15.6109 7.82051 15.1611 7.37076C14.7114 6.92101 13.9834 6.92101 13.5336 7.37076Z" fill="#00FF97" />
    </svg>
);

/**
 * Pricing Section Component
 * Displays pricing plans: Starter and Pro Agent
 */
const PricingSection = () => {
    // const { t } = useTranslation();

    return (
        <section id="pricing" className="pricing pt-145 pb-150 bg_img" data-background="/assets/img/bg/pricing-bg.webp" style={{ backgroundImage: 'url(/assets/img/bg/pricing-bg.webp)' }}>
            <div className="container">
                <div className="sec-title sec-title--two pricing-sec-title text-center mb-30">
                    <span className="sub-title wow fadeInUp" data-wow-duration="600ms">
                        <img src="/assets/img/icon/sub-left-icon.png" alt="icon" />
                        {' '}Pricing Plans{' '}
                        <img src="/assets/img/icon/sub-right-icon.png" alt="icon" />
                    </span>
                    <h2 className="title wow fadeInUp" data-wow-delay="150ms" data-wow-duration="600ms" style={{ fontSize: '36px', lineHeight: '1.2' }}>
                        Simple &{' '}
                        <img src="/assets/img/icon/money-animation.webp" alt="shape" />
                        {' '}flexible pricing
                    </h2>
                </div>
                <div className="row mt-none-30">
                    {/* Starter Plan */}
                    <div className="col-lg-5 mt-30">
                        <div className="pricing-item xb-border bg_img wow fadeInUp" data-wow-duration="600ms" data-background={pricingPlans.starter.bg} style={{ backgroundImage: `url(${pricingPlans.starter.bg})` }}>
                            <div className="xb-icon">
                                <img src={pricingPlans.starter.icon} alt="icon" />
                            </div>
                            <h2 className="xb-dollar">${pricingPlans.starter.price} <sub style={{ fontSize: '13px', color: '#aaa' }}>{pricingPlans.starter.period}</sub></h2>
                            <p className="mb-20" style={{ color: '#aaa', fontSize: '13px', marginTop: '-10px' }}>{pricingPlans.starter.note}</p>
                            <div className="pricing-btn mb-25">
                                <a className="thm-btn chatbot-btn" href="#">
                                    <span className="text">
                                        {pricingPlans.starter.buttonText}
                                    </span>
                                    <span className="btn-bg">
                                        <svg width="800" height="60" viewBox="0 0 800 60" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="800" height="60" fill="url(#paint0_radial_2224_3388)" />
                                            <defs>
                                                <radialGradient id="paint0_radial_2224_3388" cx="0" cy="0" r="1" gradientTransform="matrix(-667.5 -25 0.582116 -49.7476 497 39)" gradientUnits="userSpaceOnUse">
                                                    <stop offset="0" stopColor="#00FF97" />
                                                    <stop offset="1" stopColor="#00020F" stopOpacity="0" />
                                                </radialGradient>
                                            </defs>
                                        </svg>
                                    </span>
                                </a>
                            </div>
                            <ul className="pricing-list list-unstyled">
                                {pricingPlans.starter.features.map((feature, index) => (
                                    <li key={index}>
                                        <span><CheckIcon /></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <span className="xb-tag xb-border">{pricingPlans.starter.title}</span>
                        </div>
                    </div>

                    {/* Pro Agent Plan */}
                    <div className="col-lg-7 mt-30">
                        <div className="pricing-item xb-border bg_img wow fadeInUp" data-wow-duration="600ms" data-background={pricingPlans.proAgent.bg} style={{ backgroundImage: `url(${pricingPlans.proAgent.bg})` }}>
                            <div className="xb-icon">
                                <img src={pricingPlans.proAgent.icon} alt="icon" />
                            </div>
                            <div className="ul_li_between">
                                <h2 className="xb-dollar">
                                    ${pricingPlans.proAgent.price}
                                    <sub style={{ fontSize: '13px', color: '#aaa' }}>{pricingPlans.proAgent.period}</sub>
                                </h2>
                            </div>
                            <p className="mb-20" style={{ color: '#aaa', fontSize: '13px', marginTop: '-10px' }}>{pricingPlans.proAgent.note}</p>
                            <div className="pricing-btn mb-25">
                                <a className="thm-btn chatbot-btn" href="#">
                                    <span className="text">
                                        {pricingPlans.proAgent.buttonText}
                                    </span>
                                    <span className="btn-bg">
                                        <svg width="750" height="60" viewBox="0 0 750 60" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="750" height="60" fill="url(#paint0_radial_2224_3380)" />
                                            <defs>
                                                <radialGradient id="paint0_radial_2224_3380" cx="0" cy="0" r="1" gradientTransform="matrix(-667.5 -25 0.582116 -49.7476 497 39)" gradientUnits="userSpaceOnUse">
                                                    <stop offset="0" stopColor="#00FF97" />
                                                    <stop offset="1" stopColor="#00020F" stopOpacity="0" />
                                                </radialGradient>
                                            </defs>
                                        </svg>
                                    </span>
                                </a>
                            </div>
                            <div className="pricing-list-wrap ul_li_between align-items-start">
                                <ul className="pricing-list list-unstyled">
                                    {pricingPlans.proAgent.featuresLeft.map((feature, index) => (
                                        <li key={index}>
                                            <span><CheckIcon /></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <ul className="pricing-list pricing-list--right list-unstyled">
                                    {pricingPlans.proAgent.featuresRight.map((feature, index) => (
                                        <li key={index} className="align-items-start">
                                            <span><CheckIcon /></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <span className="xb-tag xb-border">{pricingPlans.proAgent.title}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
