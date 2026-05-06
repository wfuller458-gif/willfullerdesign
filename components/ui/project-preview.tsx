'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export interface Bullet {
  icon?: string;
  text: string;
}

export interface ProjectPreviewProps {
  title: string;
  description: string;
  bullets: Bullet[];
  mainImage: string;
  secondaryImage: string;
  projectLink?: string;
}

export function ProjectPreview({
  title,
  description,
  bullets,
  mainImage,
  secondaryImage,
  projectLink = '#',
}: ProjectPreviewProps) {
  const router = useRouter();

  return (
    <>
      <style>{`
        .pp-wrap {
          width: 100%;
          padding: 0 25px 25px 25px;
          box-sizing: border-box;
          background-color: var(--brand-off-white-100);
          cursor: pointer;
        }

        .pp-rule {
          border: none;
          border-top: 0.5px solid #9C9C9C;
          margin: 0 0 25px 0;
        }

        .pp-text-row {
          display: grid;
          grid-template-columns: 843fr 379fr;
          column-gap: 8px;
          align-items: end;
        }

        .pp-left {
          min-width: 0;
        }

        .pp-title {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 64px;
          line-height: 1.05;
          color: var(--brand-black);
          margin: 0 0 16px 0;
        }

        .pp-description {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 16px;
          line-height: 1.5;
          color: var(--brand-black);
          margin: 0;
          max-width: 600px;
        }

        .pp-bullets {
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-width: 0;
        }

        .pp-bullet {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .pp-bullet-icon {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pp-bullet-icon-placeholder {
          width: 24px;
          height: 24px;
          border: 1px solid #9C9C9C;
          border-radius: 2px;
          flex-shrink: 0;
        }

        .pp-bullet-text {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 12px;
          line-height: 1.5;
          color: var(--brand-black);
        }

        .pp-images {
          margin-top: 50px;
          display: flex;
          gap: 8px;
          height: 559px;
        }

        .pp-image-main {
          flex: 843;
          border-radius: 4px;
          overflow: hidden;
          background-color: #d9d9d9;
          height: 100%;
        }

        .pp-image-secondary {
          flex: 379;
          border-radius: 4px;
          overflow: hidden;
          background-color: #d9d9d9;
          height: 100%;
        }

        .pp-image-main img,
        .pp-image-secondary img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 1024px) {
          .pp-title { font-size: 48px; }
          .pp-images { height: 420px; }
        }

        @media (max-width: 1024px) {
          .pp-text-row { grid-template-columns: 1fr; gap: 32px; align-items: start; }
          .pp-title { font-size: 36px; }
          .pp-images { height: 300px; }
        }

        @media (max-width: 480px) {
          .pp-wrap { padding: 20px 16px; }
          .pp-title { font-size: 28px; }
          .pp-images { height: 220px; }
        }
      `}</style>

      <div className="pp-wrap" onClick={() => router.push(projectLink)}>

        <hr className="pp-rule" />

        {/* Text row */}
        <div className="pp-text-row">
          {/* Left: title + description */}
          <div className="pp-left">
            <h2 className="pp-title">{title}</h2>
            <p className="pp-description">{description}</p>
          </div>

          {/* Right: bullets */}
          <div className="pp-bullets">
            {bullets.map((bullet, i) => (
              <div key={i} className="pp-bullet">
                {bullet.icon
                  ? <img src={bullet.icon} alt="" className="pp-bullet-icon" style={{ width: 24, height: 24 }} />
                  : <div className="pp-bullet-icon-placeholder" />
                }
                <span className="pp-bullet-text">{bullet.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="pp-images">
          <div className="pp-image-main">
            <img src={mainImage} alt={title} />
          </div>
          <div className="pp-image-secondary">
            <img src={secondaryImage} alt={title} />
          </div>
        </div>

      </div>
    </>
  );
}
