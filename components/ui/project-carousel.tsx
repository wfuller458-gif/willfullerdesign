import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TooltipSmall } from './tooltip-small';
import { useLoading } from '@/contexts/loading-context';

const INTRO_DELAY = 1800;
const STAGGER = 100;
const IMG_DUR = 0.4;

// Soft nav timings — carousel starts after "Real" finishes (~1.55s)
const SOFT_INTRO_DELAY = 1600;
const SOFT_STAGGER = 42;

export interface ProjectCarouselProps {
  images?: string[];
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = React.memo(({
  images = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const { animateIn } = useLoading();
  const hasStarted = React.useRef(false);
  // Capture whether animateIn was already true when this component mounted
  const isSoftNav = React.useRef(animateIn);

  useEffect(() => {
    if (!animateIn || hasStarted.current) return;
    hasStarted.current = true;

    const softNav = isSoftNav.current;
    const intro = softNav ? SOFT_INTRO_DELAY : INTRO_DELAY;
    const stagger = softNav ? SOFT_STAGGER : STAGGER;
    const count = images.length;

    // Lock scroll during carousel stagger on soft nav too
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    for (let i = 0; i < count; i++) {
      setTimeout(() => setVisibleCount(i + 1), intro + i * stagger);
    }
    setTimeout(() => {
      setScrolling(true);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }, intro + (count - 1) * stagger + IMG_DUR * 1000);
  }, [animateIn]); // eslint-disable-line react-hooks/exhaustive-deps

  // Detect if device is mobile/touch
  React.useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 1024;
      setIsMobile(isTouchDevice && isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getProjectData = useCallback((index: number): { name: string; images: [string, string, string]; href: string } => {
    const pattern = index % 5;
    if (pattern === 0) {
      return {
        name: 'Off-Road Controls',
        images: ['', '', ''] as [string, string, string],
        href: '/projects/defender'
      };
    }
    if (pattern === 1) {
      return {
        name: 'Feed It Back',
        images: ['', '', ''] as [string, string, string],
        href: '/projects/feed-it-back'
      };
    }
    if (pattern === 2) {
      return {
        name: 'Driver Displays',
        images: ['', '', ''] as [string, string, string],
        href: '/projects/range-rover'
      };
    }
    if (pattern === 3) {
      return {
        name: 'Training Platform',
        images: ['', '', ''] as [string, string, string],
        href: '/projects/avinya'
      };
    }
    return {
      name: 'Trick Trainer',
      images: ['', '', ''] as [string, string, string],
      href: '/projects/swipe-save'
    };
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <style>
        {`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .carousel-track {
            animation: scroll-left 50s linear infinite;
            height: 330px;
            will-change: transform;
            transform: translate3d(0, 0, 0);
          }

          @media (hover: hover) and (pointer: fine) {
            .carousel-track:hover {
              animation-play-state: paused;
            }
          }

          .carousel-item {
            width: 330px;
            height: 330px;
          }

          .carousel-item.hovered {
            width: 298px;
            height: 298px;
          }

          /* Tablet and below */
          @media (max-width: 1024px) {
            .carousel-track {
              height: 250px;
            }

            .carousel-item {
              width: 250px;
              height: 250px;
            }

            .carousel-item.hovered {
              width: 226px;
              height: 226px;
            }
          }

          /* Mobile */
          @media (max-width: 768px) {
            .carousel-track {
              height: 200px;
            }

            .carousel-item {
              width: 200px;
              height: 200px;
            }

            .carousel-item.hovered {
              width: 180px;
              height: 180px;
            }
          }

          /* Small mobile */
          @media (max-width: 480px) {
            .carousel-track {
              height: 180px;
            }

            .carousel-item {
              width: 180px;
              height: 180px;
            }

            .carousel-item.hovered {
              width: 162px;
              height: 162px;
            }
          }
        `}
      </style>

      <div
        className="carousel-track"
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        style={{
          display: 'flex',
          gap: isHovered && !isMobile ? '44px' : '8px',
          alignItems: 'center',
          width: 'fit-content',
          transition: 'gap 0.3s ease',
          animationPlayState: !scrolling || (isHovered && !isMobile) ? 'paused' : 'running',
        }}
      >
        {/* First set — right to left stagger */}
        {images.map((image, index) => (
          <motion.div
            key={`first-${index}`}
            className={`carousel-item ${isHovered && !isMobile ? 'hovered' : ''}`}
            onMouseEnter={() => !isMobile && setHoveredIndex(index)}
            onMouseLeave={() => !isMobile && setHoveredIndex(null)}
            initial={{ opacity: 0, y: 8 }}
            animate={visibleCount >= images.length - index
              ? { opacity: isHovered && !isMobile && hoveredIndex !== null && hoveredIndex !== index ? 0.5 : 1, y: 0 }
              : { opacity: 0, y: 8 }}
            transition={{ duration: IMG_DUR, ease: 'easeInOut' }}
            style={{
              flexShrink: 0,
              borderRadius: '4px',
              overflow: 'visible',
              transition: 'width 0.3s ease, height 0.3s ease',
              position: 'relative',
              zIndex: hoveredIndex === index ? 100 : 1
            }}
          >
            <img
              src={image}
              alt={`Project ${index + 1}`}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                borderRadius: '4px'
              }}
            />
            {hoveredIndex === index && !isMobile && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'auto',
                  zIndex: 1000
                }}
              >
                <TooltipSmall
                  title={getProjectData(index).name}
                  images={getProjectData(index).images}
                  href={getProjectData(index).href}
                />
              </div>
            )}
          </motion.div>
        ))}

        {/* Duplicate set — visible once scrolling starts */}
        {images.map((image, index) => {
          const duplicateIndex = index + images.length;
          return (
            <div
              key={`second-${index}`}
              className={`carousel-item ${isHovered && !isMobile ? 'hovered' : ''}`}
              onMouseEnter={() => !isMobile && setHoveredIndex(duplicateIndex)}
              onMouseLeave={() => !isMobile && setHoveredIndex(null)}
              style={{
                flexShrink: 0,
                borderRadius: '4px',
                overflow: 'visible',
                opacity: !scrolling ? 0 : isHovered && !isMobile && hoveredIndex !== null && hoveredIndex !== duplicateIndex ? 0.5 : 1,
                transition: 'width 0.3s ease, height 0.3s ease, opacity 0.3s ease',
                position: 'relative',
                zIndex: hoveredIndex === duplicateIndex ? 100 : 1
              }}
            >
              <img
                src={image}
                alt={`Project ${index + 1}`}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  borderRadius: '4px'
                }}
              />
              {hoveredIndex === duplicateIndex && !isMobile && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'auto',
                    zIndex: 1000
                  }}
                >
                  <TooltipSmall
                    title={getProjectData(index).name}
                    images={getProjectData(index).images}
                    href={getProjectData(index).href}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});
