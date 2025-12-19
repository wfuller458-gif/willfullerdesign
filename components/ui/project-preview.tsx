'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from "./button";

export interface ProjectPreviewProps {
  title: string;
  description: string;
  mainImage?: string;
  previewImage1?: string;
  previewImage2?: string;
  projectLink?: string;
}

export function ProjectPreview({
  title,
  description,
  mainImage,
  previewImage1,
  previewImage2,
  projectLink = "#",
}: ProjectPreviewProps) {
  const [imageTransform, setImageTransform] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only apply parallax on desktop
      if (!isMobile && rect.top < windowHeight && rect.bottom > 0) {
        const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const centerOffset = scrollProgress - 0.5;
        const parallaxOffset = centerOffset * 100;
        setImageTransform(parallaxOffset);
      } else if (isMobile) {
        // Reset transform on mobile
        setImageTransform(0);
      }

      // Trigger animations when content panel enters viewport
      if (contentRef.current) {
        const contentRect = contentRef.current.getBoundingClientRect();
        // Show animations when in viewport, hide when out
        if (contentRect.top < windowHeight * 0.9 && contentRect.bottom > windowHeight * 0.1) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);
  return (
    <>
      <style>
        {`
          .project-preview-container {
            display: flex;
            align-items: center;
            overflow: hidden;
          }

          .project-preview-content {
            width: 421px;
            flex-shrink: 0;
            align-self: stretch;
            padding: 16px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
          }

          .project-preview-title {
            font-size: 32px;
            line-height: 1.3;
          }

          .project-preview-description {
            font-size: 16px;
            line-height: 1.3;
          }

          .project-preview-images {
            gap: 8px;
            overflow: hidden;
            max-width: 100%;
          }

          .project-preview-image-wide {
            flex: 1;
            height: 150px;
            min-width: 0;
            max-width: calc(100% - 158px);
          }

          .project-preview-image-square {
            width: 150px;
            height: 150px;
            flex-shrink: 0;
          }

          .project-preview-button {
            margin-top: 16px;
          }

          /* Medium breakpoint - stack vertically */
          @media (max-width: 900px) {
            .project-preview-container {
              flex-direction: column;
            }

            .project-preview-content {
              width: 100%;
              max-width: 100%;
              padding: 24px;
              overflow: hidden;
            }

            .project-preview-title {
              font-size: 28px;
            }

            .project-preview-description {
              font-size: 15px;
            }

            .project-preview-image-wide {
              height: 120px;
              max-width: 240px;
              flex: 0 0 auto;
            }

            .project-preview-image-square {
              width: 120px;
              height: 120px;
              flex-shrink: 0;
            }

            .project-preview-button {
              margin-top: 24px;
            }
          }

          /* Small breakpoint */
          @media (max-width: 600px) {
            .project-preview-content {
              padding: 20px;
            }

            .project-preview-title {
              font-size: 24px;
            }

            .project-preview-description {
              font-size: 14px;
            }

            .project-preview-image-wide {
              height: 100px;
              max-width: 240px;
            }

            .project-preview-image-square {
              width: 100px;
              height: 100px;
              flex-shrink: 0;
            }
          }

          /* Mobile breakpoint */
          @media (max-width: 480px) {
            .project-preview-content {
              padding: 16px;
            }

            .project-preview-title {
              font-size: 20px;
            }

            .project-preview-image-wide {
              height: 80px;
              max-width: 190px;
            }

            .project-preview-image-square {
              width: 80px;
              height: 80px;
              flex-shrink: 0;
            }

            .project-preview-button {
              margin-top: 32px;
            }
          }
        `}
      </style>
      <div
        className="project-preview-container"
        style={{
          width: '100%',
          maxWidth: '100%',
          backgroundColor: 'var(--brand-off-white-100)',
          boxSizing: 'border-box',
        }}
      >
      {/* Left side - Main image */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          alignSelf: 'stretch',
          backgroundColor: '#d9d9d9',
          overflow: 'hidden',
        }}
      >
        {mainImage && (
          <img
            src={mainImage}
            alt=""
            style={{
              width: '100%',
              height: isMobile ? '100%' : '120%',
              objectFit: 'cover',
              transform: `translateY(${imageTransform}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          />
        )}
      </div>

      {/* Right side - Content */}
      <div
        ref={contentRef}
        className="project-preview-content"
      >
        {/* Top section - Title, description, preview images */}
        <div
          className="flex flex-col"
          style={{
            gap: '16px',
            width: '100%',
          }}
        >
          {/* Title */}
          <h2
            className="project-preview-title font-display font-light"
            style={{
              color: 'var(--brand-black)',
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 800ms ease-out',
            }}
          >
            {title}
          </h2>

          {/* Description */}
          <p
            className="project-preview-description font-display font-light"
            style={{
              color: 'var(--brand-black)',
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 800ms ease-out 100ms',
            }}
          >
            {description}
          </p>

          {/* Preview images */}
          <div
            className="project-preview-images flex"
            style={{
              width: '100%',
            }}
          >
            {/* Wide preview image */}
            <div
              className="project-preview-image-wide"
              style={{
                backgroundColor: '#d9d9d9',
                borderRadius: '4px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 800ms ease-out 200ms, transform 800ms ease-out 200ms',
              }}
            >
              {previewImage1 && (
                <img
                  src={previewImage1}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
              )}
            </div>

            {/* Square preview image */}
            <div
              className="project-preview-image-square"
              style={{
                backgroundColor: '#d9d9d9',
                borderRadius: '4px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 800ms ease-out 350ms, transform 800ms ease-out 350ms',
              }}
            >
              {previewImage2 && (
                <img
                  src={previewImage2}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Bottom section - View project button */}
        <div
          className="project-preview-button"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 800ms ease-out 150ms',
          }}
        >
          <Button variant="text-icon" asChild>
            <Link href={projectLink}>
              View project
            </Link>
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}
