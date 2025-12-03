import React from 'react';
import { Link } from 'react-router-dom';

const ContactHero = () => {
    return (
        <section className="breadcrumb bg_img" data-background="/assets/img/bg/bootcamp-bg.png" style={{ backgroundImage: 'url(/assets/img/bg/bootcamp-bg.png)' }}>
            <div className="container">
                <div className="breadcrumb__content">
                    <ul className="breadcrumb__list clearfix list-unstyled">
                        <li className="breadcrumb-item"><Link to="/">home</Link></li>
                        <li className="breadcrumb-item">Contact us</li>
                    </ul>
                    <h2 className="breadcrumb__title">Contact us</h2>
                </div>
            </div>
        </section>
    );
};

export default ContactHero;
