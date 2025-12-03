import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { navigationItems } from '../../data/navigation';
import LanguageDropdown from '../UI/LanguageDropdown';
import { FontAwesomeIcon, Icons } from '../../utils/icons';

/**
 * Header Component
 * Main navigation header with sticky behavior
 */
const Header = () => {
    const { t } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Handle scroll to section if hash is present in URL
    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    const handleNavigation = (e, href) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);

        if (href.startsWith('/#')) {
            const hash = href.substring(1);
            if (location.pathname === '/') {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                navigate('/' + hash);
            }
        } else {
            navigate(href);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header id="xb-header-area" className={`header-area header-style--two header-transparent ${isSticky ? 'is-sticky' : ''}`}>
            <div className={`xb-header ${isSticky ? 'stricky-fixed' : ''}`}>
                <div className="container">
                    <div className="header__wrap xb-border ul_li_between">
                        <div className="xb-header-logo">
                            <Link to="/" className="logo1"><img src="/assets/img/logo/ucess.svg" alt="" width="148" height="40" /></Link>
                        </div>
                        <div className="main-menu__wrap navbar navbar-expand-lg p-0">
                            <nav className="main-menu collapse navbar-collapse">
                                <ul>
                                    {navigationItems.map((item) => (
                                        <li key={item.id} className={location.hash === item.href.substring(1) ? 'active' : ''}>
                                            <a
                                                className={item.href.startsWith('/#') ? 'scrollspy-btn' : ''}
                                                href={item.href}
                                                onClick={(e) => handleNavigation(e, item.href)}
                                            >
                                                <span>{t(`nav.${item.id}`)}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                        <div className="header-right ul_li">
                            <LanguageDropdown />
                            <div className="header-btn">
                                <Link className="thm-btn chatbot-btn free-consultation-btn" to="/contact">
                                    {t('nav.bookDemo')}
                                    <span className="rotate-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 4H17V3C17 2.45 16.55 2 16 2C15.45 2 15 2.45 15 3V4H9V3C9 2.45 8.55 2 8 2C7.45 2 7 2.45 7 3V4H5C3.89 4 3 4.9 3 6V20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z" fill="white" />
                                            <circle cx="12" cy="15" r="1.5" fill="white" />
                                        </svg>
                                    </span>
                                    <span className="btn-bg">
                                        <svg width="484" height="60" viewBox="0 0 484 60" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="484" height="60" fill="url(#paint0_radial_2224_3383)" />
                                            <defs>
                                                <radialGradient id="paint0_radial_2224_3383" cx="0" cy="0" r="1" gradientTransform="matrix(-667.5 -25 0.582116 -49.7476 497 39)" gradientUnits="userSpaceOnUse">
                                                    <stop offset="0" stopColor="#00FF97" />
                                                    <stop offset="1" stopColor="#00020F" stopOpacity="0" />
                                                </radialGradient>
                                            </defs>
                                        </svg>
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="header-bar-mobile side-menu d-lg-none">
                            <a className="xb-nav-mobile" href="#!" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
                                <FontAwesomeIcon icon={Icons.Bars} />
                            </a>
                        </div>
                    </div>
                    <div className={`xb-header-wrap ${isMobileMenuOpen ? 'active' : ''}`}>
                        <div className={`xb-header-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                            <div className="xb-header-menu-scroll">
                                <div className="xb-menu-close xb-hide-xl xb-close" onClick={closeMobileMenu}></div>
                                <div className="xb-logo-mobile xb-hide-xl">
                                    <Link to="/" rel="home"><img src="/assets/img/logo/logo.svg" alt="" /></Link>
                                </div>
                                <nav className="xb-header-nav">
                                    <ul className="xb-menu-primary clearfix">
                                        {navigationItems.map((item) => (
                                            <li key={item.id} className="menu-item">
                                                <a
                                                    className={item.href.startsWith('#') ? 'scrollspy-btn' : ''}
                                                    href={item.href}
                                                    onClick={(e) => item.href.startsWith('#') && handleNavigation(e, item.href)}
                                                >
                                                    <span>{item.label}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className={`xb-header-menu-backdrop ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
