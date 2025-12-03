import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { faqData } from '../../data/faq';
import { FontAwesomeIcon, Icons } from '../../utils/icons';

/**
 * FAQ Section Component
 * Displays frequently asked questions with accordion functionality
 */
const FAQSection = () => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    return (
        <section id="faq" className="faq pos-rel pt-145 pb-150 bg_img" data-background="/assets/img/bg/faq-bg.png" style={{ backgroundImage: 'url(/assets/img/bg/faq-bg.png)' }}>
            <div className="container">
                <div className="sec-title sec-title--two pricing-sec-title text-center mb-50">
                    <span className="sub-title mb-25 wow fadeInUp" data-wow-duration="600ms">
                        <img src="/assets/img/icon/sub-left-icon.png" alt="icon" />
                        {' '}{t('faq.subtitle')}{' '}
                        <img src="/assets/img/icon/sub-right-icon.png" alt="icon" />
                    </span>
                    <h2 className="title wow fadeInUp" data-wow-delay="150ms" data-wow-duration="600ms">
                        {t('faq.title')}
                    </h2>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="xb-faq wow fadeInUp" data-wow-duration="600ms">
                            <ul className="accordion_box clearfix list-unstyled">
                                {faqData.map((faq, index) => (
                                    <li
                                        key={faq.id}
                                        className={`accordion block ${activeIndex === index ? 'active-block' : ''}`}
                                    >
                                        <div
                                            className={`acc-btn ${activeIndex === index ? 'active' : ''}`}
                                            onClick={() => toggleAccordion(index)}
                                        >
                                            <span className="number">{String(faq.id).padStart(2, '0')}</span>_
                                            {t(faq.question)}
                                            <span className="arrow">
                                                <span></span>
                                            </span>
                                        </div>
                                        <div className={`acc_body ${activeIndex === index ? 'current' : ''}`}>
                                            <div className="content">
                                                <p>{t(faq.answer)}</p>
                                                <ul className="list-unstyled">
                                                    {faq.points.map((point, idx) => (
                                                        <li key={idx}>
                                                            <FontAwesomeIcon icon={Icons.Check} />
                                                            {t(point)}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <span className="faq-linear-shape"></span>
        </section>
    );
};

export default FAQSection;
