import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import LazyImage from '../UI/LazyImage';

/**
 * Video/Tab Section Component
 * Displays video showcase with tab navigation
 */
const tabs = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: '/assets/img/icon/dash_board_icon.svg',
        image: 'https://ik.imagekit.io/l1mhaygkv/Untitled%20design%20(21).svg'
    },
    {
        id: 'document',
        label: 'Document',
        icon: '/assets/img/icon/document_icon.svg',
        image: 'https://ik.imagekit.io/l1mhaygkv/img02.jpg'
    },
    {
        id: 'sheet',
        label: 'Sheet',
        icon: '/assets/img/icon/sheet_icon.svg',
        image: 'https://ik.imagekit.io/l1mhaygkv/img03.jpg'
    },
    {
        id: 'whiteboard',
        label: 'Whiteboard',
        icon: '/assets/img/icon/window-icon.svg',
        image: 'https://ik.imagekit.io/l1mhaygkv/img04.jpg'
    },
];

const VideoSection = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    useEffect(() => {
        const interval = setInterval(() => {
            const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
            const nextIndex = (currentIndex + 1) % tabs.length;
            setActiveTab(tabs[nextIndex].id);
        }, 3000);

        return () => clearInterval(interval);
    }, [activeTab]);

    return (
        <section className="video z-1 pt-25 pb-70 pos-rel">
            <div className="container">
                <div className="xb-video-frame pos-rel">
                    <div className="xb-img">
                        <picture>
                            <source srcSet="/assets/img/video/video-frame.webp" type="image/webp" />
                            <img src="/assets/img/video/video-frame.png" alt="image" />
                        </picture>
                    </div>
                    <div className="xb-video-wrap">
                        <ul className="xb-video-nav nav nav-pills mb-3" id="pills-tab" role="tablist">
                            {tabs.map((tab) => (
                                <li key={tab.id} className="nav-item xb-video-nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab.id)}
                                        type="button"
                                        role="tab"
                                    >
                                        <LazyImage src={tab.icon} alt="icon" disableSrcSet={true} style={{ width: '20px', height: '20px', marginRight: '10px', display: 'inline-block' }} />
                                        {tab.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            {tabs.map((tab) => (
                                <div
                                    key={tab.id}
                                    className={`tab-pane fade ${activeTab === tab.id ? 'show active' : ''}`}
                                    role="tabpanel"
                                >
                                    <div className="xb-tab-img">
                                        <LazyImage src={tab.image} alt="image" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="xb-video-shape">
                        <div className="shape shape--1">
                            <img src="https://ik.imagekit.io/l1mhaygkv/Blue%20and%20Purple%20Professional%20Gradient%20Modern%20Tech%20Company%20Logo%20(2).svg?updatedAt=1764436157760" alt="shape" />
                        </div>
                        <div className="shape shape--2">
                            <img src="/assets/img/shape/video-shape02.png" alt="shape" />
                        </div>
                        <div className="shape shape--3">
                            <img src="/assets/img/shape/video-shape03.png" alt="shape" />
                        </div>

                    </div>
                </div>
            </div>

            <div className="xb-linear-gradient">
                <span className="gradient gradient--1"></span>
                <span className="gradient gradient--2"></span>
                <span className="gradient gradient--3"></span>
                <span className="gradient gradient--4"></span>
                <span className="gradient gradient--dot-img">
                    <LazyImage src="/assets/img/shape/video-shape04.png" alt="dot-image" />
                </span>
            </div>

            <div className="xb-text-marquee-wrap" style={{ width: '100%' }}>
                <Marquee speed={50} gradient={false}>
                    <div className="xb-text-marquee-item">
                        <h2 className="title">24/7 instant support</h2>
                        <span className="img">
                            <img src="https://ik.imagekit.io/l1mhaygkv/Untitled%20design%20(20).svg" alt="image" style={{ height: '100px', width: 'auto' }} />
                        </span>
                        <h2 className="title">No-code chatbot builder</h2>
                        <span className="img">
                            <img src="https://ik.imagekit.io/l1mhaygkv/Untitled%20design%20(20).svg" alt="image" style={{ height: '100px', width: 'auto' }} />
                        </span>
                    </div>
                </Marquee>
            </div>
        </section>
    );
};

export default VideoSection;
