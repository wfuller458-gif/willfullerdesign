import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ProjectCarousel } from './project-carousel';
import { Button } from './button';
import { useLoading } from '@/contexts/loading-context';
import { useSound } from '@/contexts/sound-context';

const TAGLINES = [
  'Product design',
  'User centred design',
  'User experience design',
  'Interaction design',
];

export interface HeroSectionProps {
  tagline?: string;
  heading?: string;
  buttonText?: string;
  location?: string;
  country?: string;
  onContactClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  tagline = 'UX / Product Designer.',
  heading = 'Helping businesses turn ideas into usable, scalable products',
  buttonText = 'Get in touch',
  location = 'Stratford-Upon-Avon',
  country = 'United Kingdom',
  onContactClick
}) => {
  const [ukTime, setUkTime] = useState('');
  const [taglineIndex, setTaglineIndex] = useState(0);
  const { animateIn } = useLoading();
  const { playHover } = useSound();

  const fadeUp = (delay: number) => ({
    initial: animateIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    animate: animateIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  });

  useEffect(() => {
    if (!animateIn) return;
    const cycle = setInterval(() => {
      setTaglineIndex(i => (i + 1) % TAGLINES.length);
    }, 4200);
    return () => clearInterval(cycle);
  }, [animateIn]);

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
        backgroundColor: 'var(--brand-off-white-100)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <style>
        {`
          .hero-upper {
            height: 80vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .hero-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 90px;
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
            font-weight: 400;
            font-size: 96px;
            line-height: 1;
            color: var(--brand-black);
            text-align: center;
            margin-top: 32px;
            margin-bottom: 48px;
            max-width: 1100px;
          }

          .hero-carousel-wrapper {
            height: 330px;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            width: 3040px;
          }

          @media (max-width: 1024px) {
            .hero-upper {
              height: 80vh;
            }
            .hero-carousel-wrapper {
              height: 250px;
            }
            .hero-content {
              padding: 40px;
            }
            .hero-heading {
              font-size: 72px;
              line-height: 1;
              margin-top: 24px;
              margin-bottom: 36px;
              max-width: 800px;
            }
            .hero-tagline {
              font-size: 18px;
            }
          }

          @media (max-width: 768px) {
            .hero-upper {
              height: 80vh;
            }
            .hero-carousel-wrapper {
              height: 200px;
            }
            .hero-content {
              padding: 32px 24px;
            }
            .hero-heading {
              font-size: 48px;
              line-height: 1;
              margin-top: 20px;
              margin-bottom: 28px;
              max-width: 100%;
            }
            .hero-tagline {
              font-size: 16px;
            }
          }

          @media (max-width: 480px) {
            .hero-upper {
              height: 80vh;
            }
            .hero-carousel-wrapper {
              height: 180px;
            }
            .hero-content {
              padding: 24px 16px;
            }
            .hero-heading {
              font-size: 36px;
              line-height: 1;
              margin-top: 16px;
              margin-bottom: 20px;
            }
          }
        `}
      </style>

      {/* Upper 80vh: content + location bar */}
      <div className="hero-upper">
        {/* Centered content */}
        <div className="hero-content">
          <motion.div {...fadeUp(1.3)}>
            <AnimatePresence mode="wait">
              <motion.p
                key={taglineIndex}
                className="hero-tagline"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {TAGLINES[taglineIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <h1 className="hero-heading">
            {['Making', 'Ideas', 'Real'].map((word, i) => (
              <span key={word} style={{ display: 'inline-block', marginRight: i < 2 ? '0.22em' : 0 }}>
                <motion.span
                  initial={animateIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  animate={animateIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ delay: i * 0.45, duration: 0.65, ease: 'easeInOut' }}
                  style={{ display: 'inline-block' }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div {...fadeUp(1.6)}>
            <Button variant="primary-black" onClick={onContactClick} onMouseEnter={playHover}>
              {buttonText}
            </Button>
          </motion.div>
        </div>

        {/* Location and availability — pinned to bottom of 80vh */}
        <motion.div
          {...fadeUp(1.8)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
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
            Stratford-Upon-Avon, UK
          </p>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: '#E0EADB',
              borderRadius: '4px',
              paddingTop: '4px',
              paddingBottom: '4px',
              paddingLeft: '8px',
              paddingRight: '8px'
            }}
          >
            <span style={{ color: '#008E24', fontSize: '8px', lineHeight: 1 }}>●</span>
            <span
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 500,
                fontSize: '12px',
                lineHeight: '100%',
                color: '#008E24'
              }}
            >
              Available for work
            </span>
          </div>
        </motion.div>
      </div>

      {/* Carousel — always 20vh */}
      <div className="hero-carousel-wrapper">
        <ProjectCarousel />
      </div>
    </div>
  );
};
