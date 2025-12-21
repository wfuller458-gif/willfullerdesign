import React, { useState, useEffect } from 'react';
import { ProjectCarousel } from './project-carousel';
import { Button } from './button';

export interface HeroSectionProps {
  tagline?: string;
  heading?: string;
  buttonText?: string;
  location?: string;
  country?: string;
  onContactClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  tagline = 'Bespoke websites for all things Automotive.',
  heading = 'Digital solutions as refined as the machines you love.',
  buttonText = 'Get In Touch',
  location = 'Stratford-Upon-Avon',
  country = 'United Kingdom',
  onContactClick
}) => {
  const [ukTime, setUkTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const ukTimeString = now.toLocaleTimeString('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      setUkTime(ukTimeString);
    };

    // Set initial time
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className="hero-section"
      style={{
        width: '100%',
        minHeight: 'calc(100vh - 150px)',
        backgroundColor: 'var(--brand-off-white-100)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <style>
        {`
          .hero-content {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 24px;
            padding-top: 128px;
            padding-bottom: 128px;
            padding-left: 90px;
            padding-right: 90px;
            min-height: calc(100vh - 150px - 330px);
          }

          .hero-tagline {
            font-family: Inter, sans-serif;
            font-weight: 400;
            font-size: 20px;
            line-height: 100%;
            color: var(--brand-black);
            text-align: center;
            margin: 0;
          }

          .hero-heading {
            font-family: DM Sans, sans-serif;
            font-weight: 300;
            font-size: 84px;
            line-height: 90px;
            color: var(--brand-black);
            text-align: center;
            margin: 0;
            max-width: 1100px;
          }

          .hero-carousel-wrapper {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            width: 3040px;
            height: 330px;
          }

          /* Tablet and below */
          @media (max-width: 1024px) {
            .hero-content {
              padding-left: 40px;
              padding-right: 40px;
              padding-top: 80px;
              padding-bottom: 80px;
              min-height: calc(100vh - 150px - 250px);
            }

            .hero-tagline {
              font-size: 18px;
            }

            .hero-heading {
              font-size: 56px;
              line-height: 60px;
              max-width: 700px;
            }

            .hero-carousel-wrapper {
              height: 250px;
            }
          }

          /* Mobile */
          @media (max-width: 768px) {
            .hero-content {
              padding-left: 24px;
              padding-right: 24px;
              padding-top: 60px;
              padding-bottom: 60px;
              gap: 16px;
              min-height: calc(100vh - 150px - 200px);
            }

            .hero-tagline {
              font-size: 16px;
            }

            .hero-heading {
              font-size: 36px;
              line-height: 42px;
              max-width: 100%;
            }

            .hero-carousel-wrapper {
              height: 200px;
            }
          }

          /* Small mobile */
          @media (max-width: 480px) {
            .hero-content {
              padding-left: 16px;
              padding-right: 16px;
              padding-top: 40px;
              padding-bottom: 40px;
              min-height: calc(100vh - 150px - 180px);
            }

            .hero-tagline {
              font-size: 16px;
            }

            .hero-heading {
              font-size: 40px;
              line-height: 46px;
            }

            .hero-carousel-wrapper {
              height: 180px;
            }
          }
        `}
      </style>
      {/* Main content - centered */}
      <div className="hero-content">
        {/* Tagline */}
        <p className="hero-tagline">
          Bespoke websites for all things <strong style={{ fontWeight: 700 }}>Automotive.</strong>
        </p>

        {/* Main heading with mixed fonts */}
        <h1 className="hero-heading">
          Digital solutions as refined as the <em style={{ fontFamily: 'PT Serif, serif', fontWeight: 700, fontStyle: 'italic' }}>machines</em> you love.
        </h1>

        {/* CTA Button */}
        <Button variant="primary-black" onClick={onContactClick}>
          {buttonText}
        </Button>
      </div>

      {/* Location and time - above carousel */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingBottom: '16px'
        }}
      >
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
            fontSize: '12px',
            lineHeight: '100%',
            color: 'var(--brand-black)',
            margin: 0
          }}
        >
          {location}
        </p>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
            fontSize: '12px',
            lineHeight: '100%',
            color: 'var(--brand-black)',
            margin: 0
          }}
        >
          {country} {ukTime}
        </p>
      </div>

      {/* Carousel at bottom - extends beyond container */}
      <div className="hero-carousel-wrapper">
        <ProjectCarousel />
      </div>
    </div>
  );
};
