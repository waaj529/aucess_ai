import React from 'react';
import { brands } from '../../data/brands';
import Marquee from 'react-fast-marquee';
import LazyImage from '../UI/LazyImage';

/**
 * Brand Marquee Component
 * Displays scrolling brand logos
 */
const BrandMarquee = () => {
    return (
        <section className="brand">
            <div className="container">
                <div className="sec-title sec-title--two custom-sec-title text-center mb-30">
                    <span className="sub-title">
                        <LazyImage src="/assets/img/icon/sub-left-icon.png" alt="icon" style={{ width: 'auto', height: 'auto', display: 'inline-block', marginRight: '10px' }} />
                        Trusted by 90+ AI Assistants created
                        <LazyImage src="/assets/img/icon/sub-right-icon.png" alt="icon" style={{ width: 'auto', height: 'auto', display: 'inline-block', marginLeft: '10px' }} />
                    </span>
                </div>
            </div>
            <div className="brand-marquee ac-brand-marquee">
                <Marquee speed={50} gradient={false} pauseOnHover={true}>
                    <div className="ac-brand-inner ul_li_between" style={{ display: 'flex', gap: '80px', paddingRight: '80px' }}>
                        {brands.map((brand) => (
                            <div key={brand.id} className="xb-brand-item">
                                <LazyImage src={brand.image} alt={brand.alt} />
                            </div>
                        ))}
                    </div>
                </Marquee>
            </div>
        </section>
    );
};

export default BrandMarquee;
