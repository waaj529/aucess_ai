import React, { useState, useEffect } from 'react';

/**
 * Preloader Component
 * Shows loading animation on page load
 */
const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Hide preloader after page loads
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = 'visible';
        }, 350);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'visible';
        };
    }, []);

    if (!isLoading) return null;

    return (
        <div id="preloader" className="preloader">
            <div className="loader-circle">
                <div className="loader-line-mask">
                    <div className="loader-line"></div>
                </div>
                <div className="loader-logo">
                    <img src="/assets/img/logo/ucess.svg" alt="Aucess - Chatbot Creation Agency" />
                </div>
            </div>
        </div>
    );
};

export default Preloader;
