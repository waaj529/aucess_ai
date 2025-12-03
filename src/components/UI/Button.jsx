import React from 'react';

/**
 * Custom Chatbot Button Component
 * Replicates the thm-btn chatbot-btn styling from the original HTML
 */
// Background gradient SVG
const BackgroundGradient = () => (
    <span className="btn-bg">
        <svg width="800" height="60" viewBox="0 0 800 60" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="800" height="60" fill="url(#paint0_radial_btn)" />
            <defs>
                <radialGradient id="paint0_radial_btn" cx="0" cy="0" r="1" gradientTransform="matrix(-667.5 -25 0.582116 -49.7476 497 39)" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#00FF97" />
                    <stop offset="1" stopColor="#00020F" stopOpacity="0" />
                </radialGradient>
            </defs>
        </svg>
    </span>
);

const Button = ({ children, href = '#', className = '', ...props }) => {

    return (
        <a href={href} className={`thm-btn chatbot-btn ${className}`} {...props}>
            <span className="text">
                {children}
            </span>
            <BackgroundGradient />
        </a>
    );
};

export default Button;
