import React, { useState, useEffect, useRef, Suspense } from 'react';

// Dynamic import for the heavy component
const CyberpunkConsole = React.lazy(() => import('./CyberpunkConsole'));

const LazyCyberpunkConsole = () => {
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

        const currentContainer = containerRef.current;
        if (currentContainer) {
            observer.observe(currentContainer);
        }

        return () => {
            if (currentContainer) {
                observer.unobserve(currentContainer);
            }
        };
    }, []);

    return (
        <div ref={containerRef} style={{ minHeight: '600px', width: '100%', position: 'relative' }}>
            {isVisible ? (
                <Suspense fallback={
                    <div className="cyberpunk-console-loading" style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(10, 10, 20, 0.8)',
                        borderRadius: '20px',
                        color: '#00F5FF'
                    }}>
                        <div className="loading-spinner">Loading Console...</div>
                    </div>
                }>
                    <CyberpunkConsole />
                </Suspense>
            ) : (
                <div className="cyberpunk-console-placeholder" style={{ height: '100%', width: '100%' }} />
            )}
        </div>
    );
};

export default LazyCyberpunkConsole;
