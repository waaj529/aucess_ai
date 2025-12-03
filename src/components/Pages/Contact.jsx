import React from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import ContactHero from '../Sections/Contact/ContactHero';
import ContactInfo from '../Sections/Contact/ContactInfo';
import ContactForm from '../Sections/Contact/ContactForm';

const Contact = () => {
    return (
        <div className="body_wrap o-clip">
            <Header />
            <div className="body-overlay"></div>
            <main>
                <ContactHero />
                <ContactInfo />
                <ContactForm />
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
