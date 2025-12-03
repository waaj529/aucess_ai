import React from 'react';

const ContactInfo = () => {
    return (
        <section className="contact pb-150">
            <div className="container">
                <div className="row mt-none-30">
                    <div className="col-lg-4 col-md-6 mt-30">
                        <div className="xb-contact-items img-hove-effect xb-border">
                            <div className="xb-item--inner">
                                <div className="xb-img">
                                    <a href="#" onClick={(e) => e.preventDefault()}><img src="/assets/img/contact/img01.png" alt="image" /></a>
                                    <a href="#" onClick={(e) => e.preventDefault()}><img src="/assets/img/contact/img01.png" alt="image" /></a>
                                    <a href="#" onClick={(e) => e.preventDefault()}><img src="/assets/img/contact/img01.png" alt="image" /></a>
                                    <a href="#" onClick={(e) => e.preventDefault()}><img src="/assets/img/contact/img01.png" alt="image" /></a>
                                </div>
                                <div className="xb-item--holder">
                                    <p className="xb-item--location">San Francisco, USA</p>
                                    <span className="xb-item--contact_info">+(1) 561 555 7689</span>
                                    <span className="xb-item--contact_info">contact@aucess.tech</span>
                                    <a href="#" onClick={(e) => e.preventDefault()} className="thm-btn form-btn mt-45">
                                        VIEW LOCATION
                                        <span className="xb-icon">
                                            <img src="/assets/img/icon/rotate-arrow-white02.svg" alt="icon" />
                                            <img src="/assets/img/icon/rotate-arrow-black03.svg" alt="icon" />
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mt-30">
                        <div className="xb-contact-items img-hove-effect xb-border">
                            <div className="xb-item--inner">
                                <div className="xb-img">
                                    <a href="#" onClick={(e) => e.preventDefault()}><img src="/assets/img/contact/img02.png" alt="image" /></a>
                                    <a href="#" onClick={(e) => e.preventDefault()}><img src="/assets/img/contact/img02.png" alt="image" /></a>
                                    <a href="#" onClick={(e) => e.preventDefault()}><img src="/assets/img/contact/img02.png" alt="image" /></a>
                                    <a href="#" onClick={(e) => e.preventDefault()}><img src="/assets/img/contact/img02.png" alt="image" /></a>
                                </div>
                                <div className="xb-item--holder">
                                    <p className="xb-item--location">Rome, Italy</p>
                                    <span className="xb-item--contact_info">+39 06 1234 5678</span>
                                    <span className="xb-item--contact_info">contact@aucess.tech</span>
                                    <a href="#" onClick={(e) => e.preventDefault()} className="thm-btn form-btn mt-45">
                                        VIEW LOCATION
                                        <span className="xb-icon">
                                            <img src="/assets/img/icon/rotate-arrow-white02.svg" alt="icon" />
                                            <img src="/assets/img/icon/rotate-arrow-black03.svg" alt="icon" />
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mt-30">
                        <div className="xb-contact-items img-hove-effect xb-border">
                            <div className="xb-item--inner">
                                <div className="xb-img">
                                    <a href="#" onClick={(e) => e.preventDefault()}><img src="/assets/img/contact/img03.png" alt="image" /></a>
                                    <a href="#" onClick={(e) => e.preventDefault()}><img src="/assets/img/contact/img03.png" alt="image" /></a>
                                    <a href="#" onClick={(e) => e.preventDefault()}><img src="/assets/img/contact/img03.png" alt="image" /></a>
                                    <a href="#" onClick={(e) => e.preventDefault()}><img src="/assets/img/contact/img03.png" alt="image" /></a>
                                </div>
                                <div className="xb-item--holder">
                                    <p className="xb-item--location">Islamabad, Pakistan</p>
                                    <span className="xb-item--contact_info">+92 51 123 4567</span>
                                    <span className="xb-item--contact_info">contact@aucess.tech</span>
                                    <a href="#" onClick={(e) => e.preventDefault()} className="thm-btn form-btn mt-45">
                                        VIEW LOCATION
                                        <span className="xb-icon">
                                            <img src="/assets/img/icon/rotate-arrow-white02.svg" alt="icon" />
                                            <img src="/assets/img/icon/rotate-arrow-black03.svg" alt="icon" />
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactInfo;
