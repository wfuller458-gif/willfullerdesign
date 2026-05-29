'use client';
import { useState, useEffect } from 'react';

export interface ProjectSectionAutoSliderProps {
  title: string;
  paragraphs: string[];
  images?: string[];
  interval?: number;
  showDots?: boolean;
  cycle?: boolean;
}

export function ProjectSectionAutoSlider({
  title,
  paragraphs,
  images = ['', ''],
  interval = 4000,
  showDots = true,
  cycle = true,
}: ProjectSectionAutoSliderProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!cycle || images.length <= 1) return;
    const t = setInterval(() => setActive(p => (p + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [interval, cycle, images.length]);

  return (
    <>
      <style>{`
        .psas-wrap {
          margin-top: 150px;
        }

        .psas-grid {
          display: grid;
          grid-template-columns: 260px 1fr;
          column-gap: 100px;
          row-gap: 40px;
          padding: 0 25px;
        }

        .psas-title {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 32px;
          color: #BBB7B4;
          margin: 0;
          line-height: 1.2;
        }

        .psas-paragraphs {
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 600px;
        }

        .psas-para {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 16px;
          line-height: 1.6;
          color: var(--brand-black);
          margin: 0;
        }

        .psas-image-wrap {
          margin-top: 100px;
          padding: 0 25px;
        }

        .psas-image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 4px;
          overflow: hidden;
          background-color: #D9D9D9;
        }

        .psas-slide {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.9s ease;
        }

        .psas-dots {
          position: absolute;
          bottom: 18px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 7px;
          z-index: 10;
        }

        .psas-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.2);
          transition: background 0.4s ease;
        }

        .psas-dot-active {
          background: rgba(0, 0, 0, 0.5);
        }

        @media (max-width: 1024px) {
          .psas-wrap { margin-top: 100px; }
          .psas-grid { grid-template-columns: 1fr; }
          .psas-image-wrap { margin-top: 60px; }
        }

        @media (max-width: 768px) {
          .psas-wrap { margin-top: 60px; }
          .psas-grid { grid-template-columns: 1fr; gap: 32px; }
          .psas-image-wrap { margin-top: 40px; padding: 0 16px; }
        }

        @media (max-width: 480px) {
          .psas-wrap { margin-top: 40px; }
          .psas-grid { padding-left: 16px; padding-right: 16px; }
        }
      `}</style>

      <div className="psas-wrap">
        <div className="psas-grid">
          <h2 className="psas-title">{title}</h2>
          <div className="psas-paragraphs">
            {paragraphs.map((p, i) => (
              <p key={i} className="psas-para">{p}</p>
            ))}
          </div>
        </div>

        <div className="psas-image-wrap">
          <div className="psas-image-container">
            {images.map((src, i) =>
              src
                ? <img key={i} src={src} alt="" className="psas-slide" style={{ opacity: active === i ? 1 : 0 }} />
                : <div key={i} className="psas-slide" style={{ opacity: active === i ? 1 : 0, backgroundColor: i === 0 ? '#D9D9D9' : '#CECECE' }} />
            )}
            {showDots && images.length > 1 && (
              <div className="psas-dots">
                {images.map((_, i) => (
                  <div key={i} className={`psas-dot${active === i ? ' psas-dot-active' : ''}`} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
