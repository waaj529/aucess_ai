import React, { useState, useEffect, useRef } from 'react';

/**
 * LazyImage Component
 * Loads images only when they enter the viewport.
 * Supports WebP/AVIF with fallback to original format.
 * Includes blur-up placeholder effect.
 */
const LazyImage = ({ src, alt, className, width, height, style = {}, disableSrcSet = true, ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef(null);

    // Generate sources for picture element
    // Only generate if src is a local asset (starts with /assets) and disableSrcSet is false
    const isLocalAsset = !disableSrcSet && src && src.startsWith('/assets');
    const basePath = isLocalAsset ? src.substring(0, src.lastIndexOf('.')) : null;
    const webpSrc = isLocalAsset ? `${basePath}.webp` : null;
    const avifSrc = isLocalAsset ? `${basePath}.avif` : null;

    useEffect(() => {
        const img = imgRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: '50px', // Load slightly before it comes into view
                threshold: 0.01
            }
        );

        if (img) {
            observer.observe(img);
        }

        return () => {
            if (img) {
                observer.unobserve(img);
            }
        };
    }, []);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    // Base styles for the container to prevent layout shift
    const containerStyle = {
        position: 'relative',
        overflow: 'hidden',
        ...style
    };

    // If width/height provided, enforce aspect ratio to prevent CLS
    if (width && height) {
        containerStyle.aspectRatio = `${width} / ${height}`;
    }

    return (
        <div
            ref={imgRef}
            className={`lazy-image-container ${className || ''}`}
            style={containerStyle}
            {...props}
        >
            {isInView && (
                <picture>
                    {isLocalAsset && (
                        <>
                            <source srcSet={avifSrc} type="image/avif" />
                            <source srcSet={webpSrc} type="image/webp" />
                        </>
                    )}
                    <img
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        onLoad={handleLoad}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: isLoaded ? 1 : 0,
                            transition: 'opacity 0.5s ease-in-out',
                            ...style
                        }}
                    />
                </picture>
            )}

            {/* Placeholder / Skeleton */}
            {!isLoaded && (
                <div
                    className="image-placeholder"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#1a1a2e', // Dark placeholder matching site theme
                        opacity: 0.5,
                        zIndex: -1
                    }}
                />
            )}
        </div>
    );
};

export default LazyImage;
