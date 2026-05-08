'use client';

export interface ProjectSummaryBullet {
  text: string;
  icon?: string;
}

export interface ProjectSummaryProps {
  paragraph: string;
  bullets: ProjectSummaryBullet[];
  imageLeft?: string;
  imageRight?: string;
  leftFlex?: number;
  rightFlex?: number;
  imageHeight?: number;
}

export function ProjectSummary({
  paragraph,
  bullets,
  imageLeft = '',
  imageRight = '',
  leftFlex = 361,
  rightFlex = 804,
  imageHeight = 533,
}: ProjectSummaryProps) {
  return (
    <>
      <style>{`
        .ps-wrap {
          margin-top: 150px;
        }

        .ps-summary {
          display: grid;
          grid-template-columns: 220px 1fr 1fr;
          column-gap: 100px;
          row-gap: 40px;
          padding: 0 25px;
        }

        .ps-title {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 32px;
          color: #BBB7B4;
          margin: 0;
          line-height: 1.2;
        }

        .ps-para {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 16px;
          line-height: 1.6;
          color: var(--brand-black);
          margin: 0;
          max-width: 400px;
        }

        .ps-bullets {
          max-width: 436px;
          margin-left: auto;
        }

        .ps-bullet {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding-top: 16px;
        }

        .ps-bullet + .ps-bullet {
          border-top: 0.5px solid #9C9C9C;
          margin-top: 16px;
        }

        .ps-bullet-icon {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          border: 1px solid #9C9C9C;
          border-radius: 2px;
        }

        .ps-bullet-text {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 12px;
          line-height: 1.5;
          color: var(--brand-black);
        }

        .ps-images {
          display: flex;
          gap: 8px;
          margin-top: 100px;
          margin-right: 25px;
          margin-left: auto;
          width: 90%;
        }

        .ps-img-left {
          border-radius: 4px;
          background-color: #D9D9D9;
        }

        .ps-img-right {
          border-radius: 4px;
          background-color: #D9D9D9;
        }

        @media (max-width: 1024px) {
          .ps-summary { grid-template-columns: 1fr 1fr; }
          .ps-title { grid-column: 1 / -1; }
          .ps-images { width: 95%; }
        }

        @media (max-width: 768px) {
          .ps-wrap { margin-top: 80px; }
          .ps-summary { grid-template-columns: 1fr; gap: 32px; }
          .ps-images { width: 100%; margin-right: 0; margin-top: 60px; }
        }
      `}</style>

      <div className="ps-wrap">
        {/* Summary grid */}
        <div className="ps-summary">
          <h2 className="ps-title">Summary</h2>

          <p className="ps-para">{paragraph}</p>

          <div className="ps-bullets">
            {bullets.map((b, i) => (
              <div key={i} className="ps-bullet">
                {b.icon
                  ? <img src={b.icon} alt="" className="ps-bullet-icon" style={{ border: 'none' }} />
                  : <div className="ps-bullet-icon" />
                }
                <span className="ps-bullet-text">{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="ps-images" style={{ height: imageHeight }}>
          <div
            className="ps-img-left"
            style={{ flex: leftFlex, backgroundImage: imageLeft ? `url(${imageLeft})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
          <div
            className="ps-img-right"
            style={{ flex: rightFlex, backgroundImage: imageRight ? `url(${imageRight})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
        </div>
      </div>
    </>
  );
}
