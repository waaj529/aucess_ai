import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../UI/Button';
import LazyImage from '../UI/LazyImage';

/**
 * CTA Section Component
 * Call-to-action section before the footer
 */
const CTASection = () => {
    const { t } = useTranslation();
    return (
        <section className="cta pb-150 bg_img" data-background="/assets/img/bg/cta-bg.jpg" style={{ backgroundImage: 'url(/assets/img/bg/cta-bg.jpg)' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="sec-title sec-title--two process-title">
                            <span className="sub-title d-block mb-25 wow fadeInUp" data-wow-duration="600ms">
                                <LazyImage src="/assets/img/icon/sub-left-icon.png" alt="icon" style={{ width: 'auto', height: 'auto', display: 'inline-block', marginRight: '10px' }} />
                                {t('cta.subtitle')}{' '}
                                <LazyImage src="/assets/img/icon/sub-right-icon.png" alt="icon" style={{ width: 'auto', height: 'auto', display: 'inline-block', marginLeft: '10px' }} />
                            </span>
                            <h2 className="title wow fadeInUp" data-wow-delay="150ms" data-wow-duration="600ms">
                                {t('cta.title')}
                            </h2>
                        </div>
                        <div className="cta-btn mt-40 wow fadeInUp" data-wow-duration="600ms">
                            <Button>{t('cta.button')}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
