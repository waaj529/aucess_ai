import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../UI/Button';
import LazyLogicMapper from '../LogicMapper/LazyLogicMapper';
import LazyCyberpunkConsole from '../CyberpunkConsole/LazyCyberpunkConsole';
import LazyAdminDashboard from '../AdminDashboard/LazyAdminDashboard';

/**
 * Process Section Component
 * Shows 3-step process to launch chatbot with Sticky Scrollspy
 */
const ProcessSection = () => {
    const { t } = useTranslation();
    const [activeStep, setActiveStep] = useState(1);
    const stepRefs = useRef([]);
    const observer = useRef(null);

    const steps = [
        {
            id: 1,
            number: '01',
            name: t('process.steps.discovery'),
            image: '/assets/img/process/img01.png',
            component: <LazyLogicMapper />
        },
        {
            id: 2,
            number: '02',
            name: t('process.steps.connect'),
            image: '/assets/img/process/img01.png',
            component: <LazyCyberpunkConsole />
        },
        {
            id: 3,
            number: '03',
            name: t('process.steps.analyze'),
            image: '/assets/img/process/img01.png',
            component: <LazyAdminDashboard />
        },
    ];

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        observer.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const stepId = Number(entry.target.dataset.id);
                    setActiveStep(stepId);
                }
            });
        }, options);

        stepRefs.current.forEach((step) => {
            if (step) observer.current.observe(step);
        });

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [t]);

    return (
        <section id="process" className="process-section z-1 pt-80 pb-100">
            <div className="container">
                <div className="row">
                    {/* Left Side: Sticky Navigation */}
                    <div className="col-lg-5">
                        <div className="xb-process-left-container sticky-sidebar" style={{ position: 'sticky', top: '120px', transition: 'top 0.3s' }}>
                            <div className="sec-title sec-title--two process-title mb-50">
                                <span className="sub-title d-block mb-25">
                                    <img src="/assets/img/icon/sub-left-icon.png" alt="icon" />
                                    {' '}{t('process.subtitle')}{' '}
                                    <img src="/assets/img/icon/sub-right-icon.png" alt="icon" />
                                </span>
                                <h2 className="title d-inline" style={{ fontSize: '2.5rem' }}>
                                    {t('process.title')}
                                </h2>
                                <div className="xb-heading-btn" style={{
                                    display: 'inline-block',
                                    marginTop: '1.5rem'
                                }}>
                                    <Button style={{
                                        background: 'linear-gradient(90deg, rgba(0, 245, 255, 0.15) 0%, rgba(0, 255, 136, 0.15) 100%)',
                                        border: '2px solid rgba(0, 245, 255, 0.4)',
                                        padding: '14px 28px',
                                        borderRadius: '50px',
                                        fontWeight: '600',
                                        fontSize: '0.95rem',
                                        letterSpacing: '0.5px',
                                        boxShadow: '0 4px 20px rgba(0, 245, 255, 0.2)',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        {t('process.button')}
                                    </Button>
                                </div>
                            </div>

                            <div className="process-steps-nav">
                                {steps.map((step) => (
                                    <div
                                        key={step.id}
                                        className={`xb-process-step xb-border mb-30 ${activeStep === step.id ? 'active' : ''}`}
                                        style={{ cursor: 'default' }}
                                    >
                                        <div className="xb-img">
                                            <img src={step.image} alt="image" />
                                            <h2 className="step-number">{step.number}</h2>
                                        </div>
                                        <h2 className="step-name">{step.name}</h2>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Scrollable Content */}
                    <div className="col-lg-7">
                        <div className="xb-process-right-container">
                            {steps.map((step, index) => (
                                <div
                                    key={step.id}
                                    data-id={step.id}
                                    ref={el => stepRefs.current[index] = el}
                                    className={`xb-process-item mb-100 ${activeStep === step.id ? 'active' : ''}`}
                                    style={{ minHeight: '600px' }}
                                >
                                    {step.component}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
