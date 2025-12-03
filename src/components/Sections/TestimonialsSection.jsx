import React from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { testimonials } from '../../data/testimonials';
import SectionTitle from '../UI/SectionTitle';
import LazyImage from '../UI/LazyImage';

/**
 * Testimonials Section Component
 * Displays customer testimonials in a slider
 */
const TestimonialsSection = () => {
    const { t } = useTranslation();
    return (
        <section id="work" className="testimonial pt-145 bg_img" data-background="/assets/img/bg/testimonial-bg02.webp" style={{ backgroundImage: 'url(/assets/img/bg/testimonial-bg02.webp)' }}>
            <div className="container">
                <SectionTitle
                    subtitle={t('testimonials.subtitle')}
                    subtitleIcon="/assets/img/icon/sub_left-_white_icon.png"
                    rightIcon="/assets/img/icon/sub_right-_white_icon.png"
                    className="tes-sec-title mb-50"
                >
                    <h2 className="title wow fadeInUp" data-wow-delay="150ms" data-wow-duration="600ms">
                        {t('testimonials.title_part1')}
                        <img src="/assets/img/icon/animated-gif03.gif" alt="shape" />
                        {t('testimonials.title_part2')}
                    </h2>
                </SectionTitle>
            </div>

            <div className="testimonial-wrapper">
                <div className="ac-testimonial-slider pb-150">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        speed={1000}
                        breakpoints={{
                            576: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <div className="ac-testimonial-item ul_li xb-border">
                                    <div className="xb-item--avatar">
                                        <LazyImage src={testimonial.avatar} alt="image" />
                                    </div>
                                    <div className="xb-item--holder">
                                        <p className="xb-item--content">{t(testimonial.content)}</p>
                                        <div className="xb-item--author">
                                            <h5 className="xb-item--name">{t(testimonial.author)}</h5>
                                            <p className="xb-item--desig">{t(testimonial.position)}</p>
                                        </div>
                                    </div>
                                    <div className="xb-item--quote">
                                        <LazyImage src={testimonial.quote} alt="image" />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
