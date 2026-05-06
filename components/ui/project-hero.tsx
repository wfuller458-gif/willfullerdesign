'use client';

import React from 'react';

export interface ProjectHeroProps {
  title: string;
  year: string;
  brand: string;
  industry: string;
  directors: string[];
  deliverables: string[];
  heroImage: string;
}

export function ProjectHero({
  title,
  year,
  brand,
  industry,
  directors,
  deliverables,
  heroImage,
}: ProjectHeroProps) {
  const meta = [
    { label: 'Brand', values: [brand] },
    { label: 'Industry', values: [industry] },
    { label: 'Directors', values: directors },
    { label: 'Deliverables', values: deliverables },
  ];

  return (
    <>
      <style>{`
        .ph-wrap {
          background-color: var(--brand-off-white-100);
          padding: 60px 25px 40px;
        }

        .ph-title {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 80px;
          line-height: 1.05;
          color: var(--brand-black);
          margin: 0 0 32px 0;
        }

        .ph-rule {
          border: none;
          border-top: 0.5px solid #9C9C9C;
          margin: 0 0 32px 0;
        }

        .ph-meta {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
        }

        .ph-meta-cols {
          display: flex;
          flex-direction: row;
          gap: 100px;
          align-items: flex-start;
        }

        .ph-year {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 50px;
          line-height: 1;
          color: #BBB7B4;
          margin: 0;
        }

        .ph-meta-label {
          font-family: DM Sans, sans-serif;
          font-weight: 500;
          font-size: 12px;
          color: #9C9C9C;
          margin: 0 0 8px 0;
        }

        .ph-meta-value {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 14px;
          color: var(--brand-black);
          margin: 0 0 4px 0;
          line-height: 1.4;
        }

        .ph-image {
          width: 100%;
          aspect-ratio: 16 / 9;
          display: block;
          object-fit: cover;
        }

        @media (max-width: 1024px) {
          .ph-title { font-size: 60px; }
          .ph-meta-cols { gap: 60px; }
        }

        @media (max-width: 768px) {
          .ph-wrap { padding: 40px 25px 32px; }
          .ph-title { font-size: 42px; }
          .ph-meta { flex-direction: column; gap: 24px; }
          .ph-meta-cols { gap: 40px; flex-wrap: wrap; }
        }

        @media (max-width: 480px) {
          .ph-title { font-size: 32px; }
          .ph-meta-cols { gap: 28px; }
        }
      `}</style>

      {/* Info section */}
      <div className="ph-wrap">
        <h1 className="ph-title">{title}</h1>
        <hr className="ph-rule" />
        <div className="ph-meta">
          <div className="ph-year-col">
            <p className="ph-year">{year}</p>
          </div>
          <div className="ph-meta-cols">
            {meta.map(({ label, values }) => (
              <div key={label}>
                <p className="ph-meta-label">{label}</p>
                {values.map((v, i) => (
                  <p key={i} className="ph-meta-value">{v}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-width 16:9 hero image */}
      <img src={heroImage} alt={title} className="ph-image" />
    </>
  );
}
