import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const form = useRef();
    const [status, setStatus] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('sending');

        // REPLACE THESE WITH YOUR ACTUAL EMAILJS KEYS
        const SERVICE_ID = 'service_dzbowjh';
        const TEMPLATE_ID = 'template_ex9jg89';
        const PUBLIC_KEY = 'oNqEi91BAi5MpB1oR';

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then(() => {
                setStatus('success');
                form.current.reset();
            }, () => {
                setStatus('error');
            });
    };

    return (
        <section className="contact">
            <div className="container">
                <div className="xb-contact-wrap xb-border bg_img" data-background="/assets/img/bg/contact-bg02.png" style={{ backgroundImage: 'url(/assets/img/bg/contact-bg02.png)' }}>
                    <div className="xb-contact-form xb-main-contact xb-border">
                        <div className="form-heading text-center mb-30">
                            <h3 className="title">Ready to collaborate with us?</h3>
                            <p className="sub-title clr-white">Who knows where a single message might lead you.</p>
                        </div>
                        <form ref={form} onSubmit={sendEmail} className="xb-contact-input-form main-contact-input-form">
                            <div className="row mt-none-20">
                                <div className="col-lg-6 col-md-6 mt-20">
                                    <div className="xb-input-field">
                                        <input id="author-name" type="text" name="name" required />
                                        <label htmlFor="author-name">Your Name*</label>
                                        <img src="/assets/img/icon/user-balck-icon.svg" alt="icon" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 mt-20">
                                    <div className="xb-input-field">
                                        <input id="author-email" type="email" name="email" required />
                                        <label htmlFor="author-email">Email Address*</label>
                                        <img src="/assets/img/icon/sms-balck-icon.svg" alt="icon" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 mt-20">
                                    <div className="xb-input-field">
                                        <input id="author-phone" type="text" name="user_phone" required />
                                        <label htmlFor="author-phone">Contact No*</label>
                                        <img src="/assets/img/icon/call-icon02.svg" alt="icon" />
                                    </div>

                                </div>
                                <div className="col-lg-6 col-md-6 mt-20">
                                    <div className="xb-input-field xb-select-file">
                                        <input type="file" /> {/* name="attachment" removed to prevent 50KB limit error */}
                                        <img src="/assets/img/icon/upload-icon.svg" alt="icon" />
                                        <span>Attach file...</span>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 mt-20">
                                    <div className="xb-input-field xb-select-field">
                                        <select className="nice-select" name="service_type">
                                            <option value="Select Service">Select Service*</option>
                                            <option value="AI - marketing">AI - Solutions</option>
                                            <option value="AI consulting">AI Development</option>
                                            <option value="AI chatbot virtual">AI chatbot virtual</option>
                                        </select>
                                        <img src="/assets/img/icon/list-icon.svg" alt="icon" />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 mt-20">
                                    <div className="xb-input-field xb-massage-field">
                                        <textarea id="massage" name="message" required></textarea>
                                        <label htmlFor="massage">Your Message..</label>
                                        <img src="/assets/img/icon/messages-icon.svg" alt="icon" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-submit-btn mt-35">
                                <button type="submit" className="thm-btn form-btn" disabled={status === 'sending'}>
                                    {status === 'sending' ? 'Sending...' : 'send a message'}
                                    <span className="xb-icon">
                                        <img src="/assets/img/icon/rotate-arrow-black02.svg" alt="icon" />
                                        <img src="/assets/img/icon/rotate-arrow-black02.svg" alt="icon" />
                                    </span>
                                </button>
                                {status === 'success' && <p className="mt-3 text-success" style={{ color: '#00FF97' }}>Message sent successfully!</p>}
                                {status === 'error' && <p className="mt-3 text-danger" style={{ color: 'red' }}>Failed to send message. Please try again.</p>}
                            </div>
                        </form>
                    </div>
                    <div className="google-map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212645.32758092346!2d72.92699136976658!3d33.61611625407069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6059515c3bdb02b6!2sIslamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1689616000000!5m2!1sen!2s" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
