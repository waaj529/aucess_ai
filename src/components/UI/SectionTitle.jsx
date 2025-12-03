import React from 'react';

/**
 * Section Title Component
 * Reusable component for section headings throughout the site
 */
const SectionTitle = ({
    subtitle,
    title,
    className = '',
    subtitleIcon = '/assets/img/icon/sub-left-icon.png',
    rightIcon = null,
    animatedGif = null,
    children
}) => {
    return (
        <div className={`sec-title sec-title--two custom-sec-title ${className}`}>
            {subtitle && (
                <span className="sub-title">
                    {subtitleIcon && <img src={subtitleIcon} alt="icon" />}
                    {' '}{subtitle}{' '}
                    {rightIcon && <img src={rightIcon} alt="icon" />}
                </span>
            )}
            {title && (
                <h2 className="title">
                    {animatedGif && <span><img src={animatedGif} alt="image" /></span>}
                    {title}
                </h2>
            )}
            {children}
        </div>
    );
};

export default SectionTitle;
