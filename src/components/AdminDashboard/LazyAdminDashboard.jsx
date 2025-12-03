import React, { useState, useEffect, useRef, Suspense } from 'react';

// Dynamic import for the heavy component
const AdminDashboard = React.lazy(() => import('./AdminDashboard'));

const LazyAdminDashboard = () => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                // Load when element is within 200px of viewport
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '200px',
                threshold: 0.1
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <div ref={containerRef} style={{ minHeight: '600px', width: '100%', position: 'relative' }}>
            {isVisible ? (
                <Suspense fallback={
                    <div className="admin-dashboard-loading" style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(26, 29, 41, 0.8)',
                        borderRadius: '20px',
                        color: '#00FF97'
                    }}>
                        <div className="loading-spinner">Loading Dashboard...</div>
                    </div>
                }>
                    <AdminDashboard />
                </Suspense>
            ) : (
                <div className="admin-dashboard-placeholder" style={{ height: '100%', width: '100%' }} />
            )}
        </div>
    );
};

export default LazyAdminDashboard;
