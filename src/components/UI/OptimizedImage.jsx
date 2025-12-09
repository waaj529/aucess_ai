import { useState, useEffect, useRef, useMemo } from "react";
import {
  isImageKitUrl,
  transform,
  generateLQIP,
  generateSrcSet,
  generateSizes,
  DEFAULT_BREAKPOINTS
} from "../../utils/imagekit-transformer";
import { preload } from "../../utils/preload-manager";
import { getAspectRatioStyle } from "../../utils/image-calculations";

const OptimizedImage = (props) => {
  const {
    src,
    alt,
    width,
    height,
    priority = false,
    quality = 80,
    placeholder = "blur",
    sizes,
    breakpoints = DEFAULT_BREAKPOINTS,
    className = "",
    style = {},
    objectFit = "cover",
    onLoad,
    onError,
    ...restProps
  } = props;

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  const isCDN = useMemo(() => isImageKitUrl(src), [src]);

  const optimizedSrc = useMemo(() => {
    if (!isCDN) return src;
    return transform(src, { quality, format: "auto", progressive: true });
  }, [src, isCDN, quality]);

  const lqipSrc = useMemo(() => {
    if (!isCDN || placeholder !== "blur") return null;
    return generateLQIP(src);
  }, [src, isCDN, placeholder]);

  const srcSet = useMemo(() => {
    if (!isCDN) return undefined;
    return generateSrcSet(src, breakpoints);
  }, [src, isCDN, breakpoints]);

  const sizesAttr = useMemo(() => {
    if (sizes) return sizes;
    if (!isCDN) return undefined;
    return generateSizes();
  }, [sizes, isCDN]);

  const aspectRatioStyle = useMemo(() => {
    return getAspectRatioStyle(width, height);
  }, [width, height]);

  useEffect(() => {
    if (priority && src) {
      preload({
        src: optimizedSrc,
        as: "image",
        fetchpriority: "high",
        imagesrcset: srcSet,
        imagesizes: sizesAttr
      });
    }
  }, [priority, src, optimizedSrc, srcSet, sizesAttr]);

  useEffect(() => {
    if (priority || isInView) return;
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px", threshold: 0.01 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = (e) => {
    setHasError(true);
    onError?.(e);
  };

  const containerStyle = {
    position: "relative",
    overflow: "hidden",
    ...aspectRatioStyle,
    ...style
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit,
    opacity: isLoaded ? 1 : 0,
    transition: "opacity 0.3s ease-in-out"
  };

  const placeholderStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit,
    filter: "blur(20px)",
    transform: "scale(1.1)",
    opacity: isLoaded ? 0 : 1,
    transition: "opacity 0.3s ease-in-out"
  };

  const emptyPlaceholderStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#1a1a2e",
    opacity: isLoaded ? 0 : 0.5,
    transition: "opacity 0.3s ease-in-out"
  };

  return (
    <div
      ref={containerRef}
      className={["optimized-image-container", className].filter(Boolean).join(" ")}
      style={containerStyle}
      {...restProps}
    >
      {placeholder === "blur" && lqipSrc && !isLoaded && (
        <img src={lqipSrc} alt="" aria-hidden="true" style={placeholderStyle} />
      )}
      {placeholder === "empty" && !isLoaded && (
        <div style={emptyPlaceholderStyle} />
      )}
      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={optimizedSrc}
          srcSet={srcSet}
          sizes={sizesAttr}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? undefined : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          style={imageStyle}
        />
      )}
      {hasError && (
        <div style={{ ...emptyPlaceholderStyle, opacity: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#666" }}>
          <span>Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
