import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../UI/Button';
import { integrationLogos, integrationFeatures, comparisonData } from '../../data/integrations';
import OptimizedImage from '../UI/OptimizedImage';

/**
 * CheckIcon component for feature lists
 */
const CheckIcon = () => (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.1" d="M21 10.5C21 11.396 19.8993 12.1345 19.6787 12.9605C19.4513 13.8145 20.027 15.0045 19.5947 15.7517C19.1555 16.5112 17.8342 16.6022 17.2183 17.2183C16.6022 17.8342 16.5112 19.1555 15.7517 19.5947C15.0045 20.027 13.8145 19.4513 12.9605 19.6787C12.1345 19.8993 11.396 21 10.5 21C9.604 21 8.8655 19.8993 8.0395 19.6787C7.1855 19.4513 5.9955 20.027 5.24825 19.5947C4.48875 19.1555 4.39775 17.8342 3.78175 17.2183C3.16575 16.6022 1.8445 16.5112 1.40525 15.7517C0.973 15.0045 1.54875 13.8145 1.32125 12.9605C1.10075 12.1345 0 11.396 0 10.5C0 9.604 1.10075 8.8655 1.32125 8.0395C1.54875 7.1855 0.973 5.9955 1.40525 5.24825C1.8445 4.48875 3.16575 4.39775 3.78175 3.78175C4.39775 3.16575 4.48875 1.8445 5.24825 1.40525C5.9955 0.973 7.1855 1.54875 8.0395 1.32125C8.8655 1.10075 9.604 0 10.5 0C11.396 0 12.1345 1.10075 12.9605 1.32125C13.8145 1.54875 15.0045 0.973 15.7517 1.40525C16.5112 1.8445 16.6022 3.16575 17.2183 3.78175C17.8342 4.39775 19.1555 4.48875 19.5947 5.24825C20.027 5.9955 19.4513 7.1855 19.6787 8.0395C19.8993 8.8655 21 9.604 21 10.5Z" fill="#00FF97" />
        <path d="M13.5336 7.3707L9.53661 11.3677L7.46461 9.29745C7.01486 8.8477 6.28511 8.8477 5.83536 9.29745C5.38561 9.7472 5.38561 10.4769 5.83536 10.9267L8.74211 13.8334C9.17961 14.2709 9.89011 14.2709 10.3276 13.8334L15.1611 8.99995C15.6109 8.5502 15.6109 7.82045 15.1611 7.3707C14.7114 6.92095 13.9834 6.92095 13.5336 7.3707Z" fill="#00FF97" />
    </svg>
);

/**
 * CloseIcon component for comparison list
 */
const CloseIcon = () => (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.1" d="M21 10.5C21 11.396 19.8993 12.1345 19.6787 12.9605C19.4513 13.8145 20.027 15.0045 19.5947 15.7517C19.1555 16.5112 17.8342 16.6022 17.2183 17.2183C16.6022 17.8342 16.5112 19.1555 15.7517 19.5947C15.0045 20.027 13.8145 19.4513 12.9605 19.6787C12.1345 19.8993 11.396 21 10.5 21C9.604 21 8.8655 19.8993 8.0395 19.6787C7.1855 19.4513 5.9955 20.027 5.24825 19.5947C4.48875 19.1555 4.39775 17.8342 3.78175 17.2183C3.16575 16.6022 1.8445 16.5112 1.40525 15.7517C0.973 15.0045 1.54875 13.8145 1.32125 12.9605C1.10075 12.1345 0 11.396 0 10.5C0 9.604 1.10075 8.8655 1.32125 8.0395C1.54875 7.1855 0.973 5.9955 1.40525 5.24825C1.8445 4.48875 3.16575 4.39775 3.78175 3.78175C4.39775 3.16575 4.48875 1.8445 5.24825 1.40525C5.9955 0.973 7.1855 1.54875 8.0395 1.32125C8.8655 1.10075 9.604 0 10.5 0C11.396 0 12.1345 1.10075 12.9605 1.32125C13.8145 1.54875 15.0045 0.973 15.7517 1.40525C16.5112 1.8445 16.6022 3.16575 17.2183 3.78175C17.8342 4.39775 19.1555 4.48875 19.5947 5.24825C20.027 5.9955 19.4513 7.1855 19.6787 8.0395C19.8993 8.8655 21 9.604 21 10.5Z" fill="#00FF97" />
        <path d="M14.8747 7.01301L11.7781 10.11L14.8747 13.2068C15.3353 13.6676 15.3353 14.414 14.8747 14.8748C14.6446 15.1049 14.3428 15.2201 14.0412 15.2201C13.7392 15.2201 13.4374 15.1051 13.2074 14.8748L10.1101 11.7776L7.01301 14.8748C6.78289 15.1049 6.48113 15.2201 6.17928 15.2201C5.87751 15.2201 5.57595 15.1051 5.34563 14.8748C4.88502 14.4142 4.88502 13.6677 5.34563 13.2068L8.4422 10.11L5.34546 7.01301C4.88485 6.5524 4.88485 5.80581 5.34546 5.34519C5.80598 4.88494 6.55213 4.88494 7.01283 5.34519L10.1101 8.44217L13.2071 5.34519C13.6679 4.88494 14.4141 4.88494 14.8745 5.34519C15.3353 5.80581 15.3353 6.5524 14.8747 7.01301Z" fill="#00FF97" />
    </svg>
);

/**
 * Integration Section Component
 * Displays integrations, comparison, and features
 */
const IntegrationSection = () => {
    const { t } = useTranslation();
    return (
        <section id="partners" className="integration-conparison pt-40 pb-150 bg_img" data-background="/assets/img/bg/integrations-bg.png" style={{ backgroundImage: 'url(/assets/img/bg/integrations-bg.png)' }}>
            <div className="container">
                {/* Integration Content */}
                <div className="integration-container">
                    <div className="row mt-none-30 align-items-center">
                        <div className="col-lg-6 mt-30">
                            <div className="integration-content">
                                <div className="sec-title sec-title--two process-title mb-10">
                                    <span className="sub-title wow fadeInUp d-block mb-30" data-wow-duration="600ms">
                                        <img src="/assets/img/icon/sub-left-icon.png" alt="icon" />
                                        {' '}{t('integrations.subtitle')}{' '}
                                        <img src="/assets/img/icon/sub-right-icon.png" alt="icon" />
                                    </span>
                                    <h2 className="title wow fadeInUp" data-wow-delay="150ms" data-wow-duration="600ms" style={{ fontSize: '36px', lineHeight: '1.2', marginBottom: '15px' }}>
                                        {t('integrations.title')}
                                    </h2>
                                    <p className="wow fadeInUp" data-wow-delay="150ms" data-wow-duration="600ms" style={{ marginTop: '10px', color: '#b1b4ba', marginBottom: '25px' }}>
                                        {t('integrations.description')}
                                    </p>
                                </div>
                                <ul className="integration-list list-unstyled wow fadeInUp" data-wow-duration="600ms">
                                    {integrationFeatures.map((feature, index) => (
                                        <li key={index} style={{ marginBottom: '10px' }}>
                                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                                <span style={{ marginTop: '2px', marginRight: '10px' }}><CheckIcon /></span>
                                                <div>
                                                    <span style={{ display: 'block', color: '#fff', fontSize: '15px', fontWeight: '500', marginBottom: '1px' }}>{t(feature.title)}</span>
                                                    <span style={{ fontSize: '13px', color: '#b1b4ba', lineHeight: '1.3' }}>{t(feature.context)}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="integration-btn mt-45 wow fadeInUp" data-wow-delay="150ms" data-wow-duration="600ms">
                                    <Button>{t('integrations.button')}</Button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mt-30">
                            <div className="integration-logo-wrap ul_li">
                                {/* Row 1 */}
                                <div className="integration-logo-inner marquee-first">
                                    {[...integrationLogos.row1, ...integrationLogos.row1].map((logo, index) => (
                                        <div key={`row1-${index}`} className="integration-logo">
                                            <OptimizedImage src={logo.image} alt={logo.name} width={60} height={60} placeholder="empty" />
                                        </div>
                                    ))}
                                </div>
                                {/* Row 2 */}
                                <div className="integration-logo-inner marquee2">
                                    {[...integrationLogos.row2, ...integrationLogos.row2].map((logo, index) => (
                                        <div key={`row2-${index}`} className="integration-logo">
                                            <OptimizedImage src={logo.image} alt={logo.name} width={60} height={60} placeholder="empty" />
                                        </div>
                                    ))}
                                </div>
                                {/* Row 3 */}
                                <div className="integration-logo-inner marquee-first">
                                    {[...integrationLogos.row3, ...integrationLogos.row3].map((logo, index) => (
                                        <div key={`row3-${index}`} className="integration-logo">
                                            <OptimizedImage src={logo.image} alt={logo.name} width={60} height={60} placeholder="empty" />
                                        </div>
                                    ))}
                                </div>
                                {/* Row 4 */}
                                <div className="integration-logo-inner marquee2">
                                    {[...integrationLogos.row4, ...integrationLogos.row4].map((logo, index) => (
                                        <div key={`row4-${index}`} className="integration-logo">
                                            <OptimizedImage src={logo.image} alt={logo.name} width={60} height={60} placeholder="empty" />
                                        </div>
                                    ))}
                                </div>
                                <div className="xb-shape">
                                    <div className="shape shape--1"></div>
                                    <div className="shape shape--2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comparison Section */}
                <div className="comparison-container">
                    <div className="row mt-none-30">
                        <div className="col-lg-6 mt-30">
                            <div className="comparison-list xb-border bg_img wow fadeInUp" data-wow-duration="600ms" data-background="/assets/img/bg/comparison-bg.png" style={{ backgroundImage: 'url(/assets/img/bg/comparison-bg.png)' }}>
                                <h3 className="xb-item--title">{t('integrations.comparison.without_title')}</h3>
                                <ul className="xb-item--list list-unstyled">
                                    {comparisonData.without.map((item, index) => (
                                        <li key={index}>
                                            <span><CloseIcon /></span>
                                            {t(item)}
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                        <div className="col-lg-6 mt-30">
                            <div className="comparison-list xb-border bg_img wow fadeInUp" data-wow-duration="600ms" data-background="/assets/img/bg/comparison-bg.png" style={{ backgroundImage: 'url(/assets/img/bg/comparison-bg.png)' }}>
                                <h3 className="xb-item--title">{t('integrations.comparison.with_title')}</h3>
                                <ul className="xb-item--list list-unstyled">
                                    {comparisonData.with.map((item, index) => (
                                        <li key={index}>
                                            <span><CheckIcon /></span>
                                            {t(item)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IntegrationSection;
