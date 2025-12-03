import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon, Icons } from '../../utils/icons';

/**
 * Back to Top Button Component
 * Shows scroll-to-top button when user scrolls down
 */
const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className={`xb-backtotop ${isVisible ? 'active' : ''}`}>
            <a href="#" className="scroll" onClick={(e) => { e.preventDefault(); scrollToTop(); }} aria-label="Scroll to top">
                <FontAwesomeIcon icon={Icons.ArrowUp} />
            </a>
        </div>
    );
};

export default BackToTop;
