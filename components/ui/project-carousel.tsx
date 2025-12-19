import React, { useState } from 'react';
import { TooltipSmall } from './tooltip-small';

export interface ProjectCarouselProps {
  images?: string[];
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  images = [
    '/images/carousel/1.png',
    '/images/carousel/2.png',
    '/images/carousel/3.png',
    '/images/carousel/4.png',
    '/images/carousel/5.png',
    '/images/carousel/6.png',
    '/images/carousel/7.png',
    '/images/carousel/8.png',
    '/images/carousel/9.png',
  ]
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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

  // Map images to project names and images based on the pattern: RR 1, Avinya 1, DEF 1, RR 2, Avinya 2, DEF 2, RR 3, Avinya 3, DEF 3
  const getProjectData = (index: number): { name: string; images: [string, string, string]; href: string } => {
    const pattern = index % 3;
    if (pattern === 0) {
      return {
        name: 'Range Rover',
        images: [images[0], images[3], images[6]] as [string, string, string],
        href: '/projects/range-rover'
      };
    }
    if (pattern === 1) {
      return {
        name: 'Avinya',
        images: [images[1], images[4], images[7]] as [string, string, string],
        href: '/projects/avinya'
      };
    }
    return {
      name: 'Defender',
      images: [images[2], images[5], images[8]] as [string, string, string],
      href: '/projects/defender'
    };
  };

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
            animation: scroll-left 40s linear infinite;
            height: 330px;
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
          transition: 'gap 0.3s ease'
        }}
      >
        {/* First set of images */}
        {images.map((image, index) => (
          <div
            key={`first-${index}`}
            className={`carousel-item ${isHovered && !isMobile ? 'hovered' : ''}`}
            onMouseEnter={() => !isMobile && setHoveredIndex(index)}
            onMouseLeave={() => !isMobile && setHoveredIndex(null)}
            style={{
              flexShrink: 0,
              borderRadius: '4px',
              overflow: 'visible',
              opacity: isHovered && !isMobile && hoveredIndex !== null && hoveredIndex !== index ? 0.5 : 1,
              transition: 'width 0.3s ease, height 0.3s ease, opacity 0.3s ease',
              position: 'relative',
              zIndex: hoveredIndex === index ? 100 : 1
            }}
          >
            <img
              src={image}
              alt={`Project ${index + 1}`}
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
          </div>
        ))}

        {/* Duplicate set for seamless loop */}
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
                opacity: isHovered && !isMobile && hoveredIndex !== null && hoveredIndex !== duplicateIndex ? 0.5 : 1,
                transition: 'width 0.3s ease, height 0.3s ease, opacity 0.3s ease',
                position: 'relative',
                zIndex: hoveredIndex === duplicateIndex ? 100 : 1
              }}
            >
              <img
                src={image}
                alt={`Project ${index + 1}`}
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
};
